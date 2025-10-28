import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import * as d3 from 'd3'
import { GraphJSON, lineStyleToStrokeDasharray, applyZoom } from '../lib/d3Interop'

interface Props {
  dataUrl: string
  height?: number
  onLoaded?: (summary: { nodes: number; edges: number; layoutMs: number }) => void
  labelDistance?: number
  resetSignal?: number
}

export type GraphViewerHandle = {
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
}

const GraphViewer = forwardRef<GraphViewerHandle, Props>(({ dataUrl, height = 0.85 * window.innerHeight, onLoaded, labelDistance = 80, resetSignal }: Props, ref) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const zoomCtl = useRef<{ reset(): void; destroy(): void; scaleBy: (factor: number) => void } | null>(null)
  const [reloadTick, setReloadTick] = useState(0)
  // track theme changes to re-render with correct colors
  const [themeTick, setThemeTick] = useState(0)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const g = svg.select('g#graph') as d3.Selection<SVGGElement, unknown, null, undefined>
    if (zoomCtl.current) zoomCtl.current.destroy()
    zoomCtl.current = applyZoom(svg as any, g as any)
    return () => { zoomCtl.current?.destroy() }
  }, [])

  // re-render when theme class toggles on <html>
  useEffect(() => {
    const el = document.documentElement
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          setThemeTick((v) => v + 1)
          break
        }
      }
    })
    mo.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  useEffect(() => {
    if (resetSignal && zoomCtl.current) zoomCtl.current.reset()
  }, [resetSignal])

  useImperativeHandle(ref, () => ({
    zoomIn() { zoomCtl.current?.scaleBy(1.2) },
    zoomOut() { zoomCtl.current?.scaleBy(1 / 1.2) },
    reset() {
      // reset zoom and also rebuild graph to restore initial layout positions
      zoomCtl.current?.reset()
      setReloadTick((v) => v + 1)
    },
  }), [])

  useEffect(() => {
    let cancelled = false
    setError(null)
    const start = performance.now()

    fetch(dataUrl)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(async (data: GraphJSON) => {
        if (cancelled) return
        const layoutMs = await draw(data)
        if (onLoaded) onLoaded({ nodes: data.nodes.length, edges: data.edges.length, layoutMs })
      })
      .catch((e) => !cancelled && setError(String(e)))
    return () => { cancelled = true }

    async function draw(data: GraphJSON) {
  if (!svgRef.current) return 0
  const svg = d3.select(svgRef.current)
      const g = svg.select('g#graph')
      const isLight = document.documentElement.classList.contains('theme-light')

      // color palette based on theme
      const colors = {
        nodeFill: isLight ? '#ffffff' : '#111827',
        nodeStroke: isLight ? '#e5e7eb' : 'rgba(255,255,255,0.22)',
        rowDivider: isLight ? '#e5e7eb' : 'rgba(255,255,255,0.12)',
        rowTextDefault: isLight ? '#111827' : '#ffffff',
        rowTextClass: isLight ? '#0f766e' : '#4FD1C5', // teal-700 vs teal-300
        rowTextInterface: isLight ? '#0e7490' : '#8adade', // cyan-700 vs light-cyan
        edgeStroke: isLight ? '#94A3B8' : '#E2E8F0', // slate-400 vs gray-200
        edgeLabel: isLight ? '#475569' : '#E5E7EB', // slate-600 vs gray-200
        shadowOpacity: isLight ? 0.12 : 0.35,
      }
      // prepare defs: clear and add arrow marker + node shadow filter for better contrast
      const defs = svg.select('defs')
      defs.selectAll('*').remove()
      const marker = defs.append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 10)
        .attr('refY', 5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto-start-reverse')
      marker.append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', colors.edgeStroke)

      const filter = defs.append('filter').attr('id', 'nodeShadow')
      filter.append('feDropShadow')
        .attr('dx', 0)
        .attr('dy', 1)
        .attr('stdDeviation', 2)
        .attr('flood-color', '#000')
        .attr('flood-opacity', colors.shadowOpacity)
      g.selectAll('*').remove()

      // defs markers
      const meta = data.meta || {}
      const nodeDef = meta.nodeDefaults || { width: 180, rowHeight: 30, padding: 8 }
      const colGap = meta.layout?.colGap ?? 150
      const rowGap = meta.layout?.rowGap ?? 140
      const leftPad = 40
      const topPad = 40

      // compute nodes size (标准方法：最少一行高度；行高 rowH 均匀)
      const nodes = data.nodes.map((n) => {
        const rows = n.rows || []
        const rowH = nodeDef.rowHeight ?? 30
        const height = Math.max(rowH * rows.length, rowH)
        const width = nodeDef.width ?? 180
        return { ...n, width, height, rowH }
      }) as Array<any>

      // layout positions - 固定使用 Grid
      const t0 = performance.now()
      {
        const layers = Array.from(new Set(nodes.map((n) => n.layer))).sort((a, b) => a - b)
        const byLayer: Record<number, any[]> = {}
        for (const l of layers) {
          byLayer[l] = nodes.filter((n) => n.layer === l).sort((a, b) => a.order - b.order)
        }
        layers.forEach((l, li) => {
          byLayer[l].forEach((n, oi) => {
            n.x = leftPad + li * ((nodeDef.width ?? 180) + colGap)
            n.y = topPad + oi * rowGap
          })
        })
      }
      const layoutMs = performance.now() - t0

      // draw nodes
      const nodesG = g.append('g').attr('class', 'nodes')
      const nodeSel = nodesG.selectAll('g.node').data(nodes, (d: any) => d.id).join('g').attr('class', 'node')
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
        .style('cursor', 'grab')

      nodeSel.append('rect')
        .attr('width', (d: any) => d.width)
        .attr('height', (d: any) => d.height)
        .attr('rx', 12)
        .attr('ry', 12)
        .attr('fill', colors.nodeFill)
        .attr('stroke', colors.nodeStroke)
        .attr('filter', 'url(#nodeShadow)')

      ;(nodeSel as any).each(function(this: any, d: any) {
        const group = d3.select(this)
        const rowH = d.rowH
        const rows = d.rows || []
        rows.forEach((row: any, i: number) => {
          // row background (optional subtle line)
          group.append('line')
            .attr('x1', 0).attr('x2', d.width).attr('y1', i * rowH).attr('y2', i * rowH)
            .attr('stroke', colors.rowDivider)
          const y = i * rowH + rowH / 2
          group.append('text')
            .attr('x', 12)
            .attr('y', y)
            .attr('dominant-baseline', 'middle')
            .attr('fill', row.type === 'class' ? colors.rowTextClass : row.type === 'interface' ? colors.rowTextInterface : colors.rowTextDefault)
            .attr('font-size', row.type === 'method' ? 12 : 13)
            .text(row.text)
        })
      })

      // edges
    const nodeById: Record<string, any> = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const edges = data.edges
    const edgesG = g.append('g').attr('class', 'edges')

      // helper: pickPort like case script
      function resolveRowIndex(node: any, role: 'classRow' | 'methodRow', side: 'source' | 'target', attach?: any) {
        const rows = node.rows || []
        const firstMethodIdx = rows.findIndex((r: any) => r.type === 'method')
        const defaultIdx = role === 'classRow' ? 0 : (firstMethodIdx >= 0 ? firstMethodIdx : 0)

        if (attach) {
          // absolute row (1-based)
          const absKey = side === 'source' ? 'sourceRow' : 'targetRow'
          if (typeof attach[absKey] === 'number' && Number.isFinite(attach[absKey])) {
            const oneBased = attach[absKey] as number
            const idx = Math.max(0, Math.min(rows.length - 1, Math.round(oneBased - 1)))
            return idx
          }
          // method index within method-only list (0-based)
          const mKey = side === 'source' ? 'sourceMethodIndex' : 'targetMethodIndex'
          if (typeof attach[mKey] === 'number' && Number.isFinite(attach[mKey]) && firstMethodIdx >= 0) {
            const mIdx = Math.max(0, Math.round(attach[mKey] as number))
            const idx = Math.max(firstMethodIdx, Math.min(rows.length - 1, firstMethodIdx + mIdx))
            return idx
          }
          // substring match on text
          const sKey = side === 'source' ? 'sourceMatch' : 'targetMatch'
          if (typeof attach[sKey] === 'string' && attach[sKey]) {
            const needle = String(attach[sKey]).toLowerCase()
            const found = rows.findIndex((r: any) => String(r.text || '').toLowerCase().includes(needle))
            if (found >= 0) return found
          }
        }
        return defaultIdx
      }

      const renderEdges = () => {
        edgesG.selectAll('*').remove()

        // 1) Prepare edge endpoints and grouping key (based on original ports)
        type Prepared = {
          e: (typeof edges)[number]
          s: any
          t: any
          sIdx: number
          tIdx: number
          sPortY: number
          tPortY: number
          p0x: number
          p3x: number
          targetSide: 'east' | 'west'
        }

        const prepared: Prepared[] = []
        for (const e of edges) {
          const s = nodeById[e.source]
          const t = nodeById[e.target]
          if (!s || !t) continue
          const attachSource = (e.attach?.source as any) || 'classRow'
          const attachTarget = (e.attach?.target as any) || 'classRow'
          const sIdx = resolveRowIndex(s, attachSource, 'source', e.attach)
          const tIdx = resolveRowIndex(t, attachTarget, 'target', e.attach)
          const sPortY = s.y + (sIdx * s.rowH) + s.rowH / 2
          const tPortY = t.y + (tIdx * t.rowH) + t.rowH / 2
          const p0x = s.x + s.width
          const targetSide = e.targetSide === 'east' ? 'east' : 'west'
          const p3x = targetSide === 'east' ? (t.x + t.width) : t.x
          prepared.push({ e, s, t, sIdx, tIdx, sPortY, tPortY, p0x, p3x, targetSide })
        }

        // 2) Group by identical original endpoints to distribute lane offsets
        const groups = new Map<string, Prepared[]>()
        for (const p of prepared) {
          const key = `${p.p0x}|${p.sPortY}|${p.p3x}|${p.tPortY}`
          const arr = groups.get(key)
          if (arr) arr.push(p); else groups.set(key, [p])
        }

        // helper to generate symmetric offsets without 0 when n==2
        const genOffsets = (n: number, gap: number) => {
          if (n <= 1) return [0]
          if (n === 2) return [-gap / 2, gap / 2]
          const res: number[] = []
          const half = Math.floor(n / 2)
          for (let k = 1; k <= half; k++) {
            res.push(-k * gap)
            res.push(k * gap)
          }
          if (n % 2 === 1) res.splice(half, 0, 0)
          return res
        }

        // Precompute lane offset per edge id
        const laneById = new Map<string, number>()
        for (const [, arr] of groups) {
          // explicit overrides first
          const explicit = arr.map((p) => ({ id: p.e.id, v: (p.e as any).laneOffset })).filter((x) => typeof x.v === 'number') as { id: string; v: number }[]
          const implicitTargets = arr.filter((p) => typeof (p.e as any).laneOffset !== 'number')
          const gap = (implicitTargets[0]?.e as any)?.laneGap ?? 6
          const offs = genOffsets(implicitTargets.length, gap)
          // stable order: sort by style line to keep dashed/solid consistent
          implicitTargets.sort((a, b) => (a.e.style?.line || 'solid').localeCompare(b.e.style?.line || 'solid'))
          implicitTargets.forEach((p, i) => laneById.set(p.e.id, offs[i] ?? 0))
          explicit.forEach(({ id, v }) => laneById.set(id, v))
        }

        // 3) Render with lane offsets applied to source/target port y
        prepared.forEach((p) => {
          const e = p.e
          const lane = laneById.get(e.id) ?? 0
          const p0 = { x: p.p0x, y: p.sPortY + lane }
          const p3 = { x: p.p3x, y: p.tPortY + lane }

          const extend = (e as any).extendDistance ?? 80
          const midX = p0.x + extend
          const pts = [p0, { x: midX, y: p0.y }, { x: midX, y: p3.y }, p3]
          const pathD = d3.line<any>().x((pt) => pt.x).y((pt) => pt.y)(pts as any) as string

          edgesG.append('path')
            .attr('d', pathD)
            .attr('fill', 'none')
            .attr('stroke', colors.edgeStroke)
            .attr('stroke-width', 1.8)
            .attr('stroke-dasharray', lineStyleToStrokeDasharray(e.style?.line) || null)
            .attr('marker-end', e.style?.marker === 'arrow' ? 'url(#arrow)' : null)

          if (e.label) {
            const fixedDist = ((e as any).labelDistanceFromSource ?? labelDistance ?? meta.layout?.labelDistanceFromSource ?? 30) as number
            const seg1 = extend
            const seg2 = Math.abs(p3.y - p0.y)
            const seg3 = Math.max(0, Math.abs(p3.x - midX))
            const total = seg1 + seg2 + seg3
            const dfix = Math.min(fixedDist, Math.max(0, total - 1e-3))

            let lx = p0.x, ly = p0.y
            if (dfix <= seg1) {
              lx = p0.x + dfix
              ly = p0.y
            } else if (dfix <= seg1 + seg2) {
              const dd = dfix - seg1
              const dir = p3.y >= p0.y ? 1 : -1
              lx = midX
              ly = p0.y + dir * dd
            } else {
              const dd = dfix - seg1 - seg2
              const dir = p3.x >= midX ? 1 : -1
              lx = midX + dir * dd
              ly = p3.y
            }

            let dy = (e as any).labelDy ?? 0

            const lines = String(e.label).split('\n')
            lines.forEach((line, i) => {
              edgesG.append('text')
                .attr('x', lx)
                .attr('y', ly + dy + i * 12)
                .attr('text-anchor', 'middle')
                .attr('font-size', 11)
                .attr('fill', colors.edgeLabel)
                .text(line)
            })
          }
        })
      }

      renderEdges()

      // drag behavior for nodes: update position and redraw edges
      const dragBehavior = d3.drag<SVGGElement, any>()
        .on('start', function(event) { (event.sourceEvent as any)?.stopPropagation?.(); d3.select(this).style('cursor','grabbing') })
        .on('drag', function(event, d: any) {
          d.x += event.dx
          d.y += event.dy
          d3.select(this as SVGGElement).attr('transform', `translate(${d.x},${d.y})`)
          renderEdges()
        })
        .on('end', function(){ d3.select(this).style('cursor','grab') })
      ;(nodeSel as any).call(dragBehavior as any)

      // fit viewBox
      const bbox = (g.node() as SVGGElement).getBBox()
      const pad = 40
      svg.attr('viewBox', `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`)

      return layoutMs
    }
  }, [dataUrl, labelDistance, reloadTick, themeTick])

  if (error) {
    return (
      <div className="card text-sm">
        加载失败：{error}
        <div className="mt-2 text-white/60">请检查 JSON 路径或网络，并重试。</div>
        <button className="btn mt-3" aria-label="重试加载" onClick={() => setReloadTick((v) => v + 1)}>重试</button>
      </div>
    )
  }

  return (
  <svg ref={svgRef} width="100%" height={height} role="img" aria-label="HPG 图视图">
      <defs />
      <g id="graph"></g>
    </svg>
  )
})

export default GraphViewer
