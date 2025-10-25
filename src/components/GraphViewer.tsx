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

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const g = svg.select('g#graph') as d3.Selection<SVGGElement, unknown, null, undefined>
    if (zoomCtl.current) zoomCtl.current.destroy()
    zoomCtl.current = applyZoom(svg as any, g as any)
    return () => { zoomCtl.current?.destroy() }
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
        .attr('fill', '#E2E8F0')

      const filter = defs.append('filter').attr('id', 'nodeShadow')
      filter.append('feDropShadow')
        .attr('dx', 0)
        .attr('dy', 1)
        .attr('stdDeviation', 2)
        .attr('flood-color', '#000')
        .attr('flood-opacity', 0.35)
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
        .attr('fill', '#111827')
        .attr('stroke', 'rgba(255,255,255,0.22)')
        .attr('filter', 'url(#nodeShadow)')

      ;(nodeSel as any).each(function(this: any, d: any) {
        const group = d3.select(this)
        const rowH = d.rowH
        const rows = d.rows || []
        rows.forEach((row: any, i: number) => {
          // row background (optional subtle line)
          group.append('line')
            .attr('x1', 0).attr('x2', d.width).attr('y1', i * rowH).attr('y2', i * rowH)
            .attr('stroke', 'rgba(255,255,255,0.12)')
          const y = i * rowH + rowH / 2
          group.append('text')
            .attr('x', 12)
            .attr('y', y)
            .attr('dominant-baseline', 'middle')
            .attr('fill', row.type === 'class' ? '#4FD1C5' : row.type === 'interface' ? '#8adade' : '#ffffff')
            .attr('font-size', row.type === 'method' ? 12 : 13)
            .text(row.text)
        })
      })

      // edges
    const nodeById: Record<string, any> = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const edges = data.edges
    const edgesG = g.append('g').attr('class', 'edges')

      // helper: pickPort like case script
      function pickPort(node: any, role: 'classRow' | 'methodRow') {
        const rows = node.rows || []
        const idx = role === 'methodRow' ? Math.min(1, Math.max(0, rows.length - 1)) : 0
        return { y: node.y + (idx * node.rowH) + node.rowH / 2 }
      }

      const renderEdges = () => {
        edgesG.selectAll('*').remove()
        edges.forEach((e) => {
          const s = nodeById[e.source]
          const t = nodeById[e.target]
          if (!s || !t) return
          const attachSource = (e.attach?.source as any) || (e.semantics === 'call' ? 'methodRow' : 'classRow')
          const attachTarget = (e.attach?.target as any) || (e.semantics === 'call' ? 'methodRow' : 'classRow')
          const sPort = pickPort(s, attachSource)
          const tPort = pickPort(t, attachTarget)

          const p0 = { x: s.x + s.width, y: sPort.y }
          const targetSide = e.targetSide === 'east' ? 'east' : 'west'
          const p3 = { x: targetSide === 'east' ? (t.x + t.width) : t.x, y: tPort.y }

          // extend distance per semantics (case standard)
          const extend = e.semantics === 'instantiate' ? (meta.layout?.c0ExtendLong ?? 130)
            : e.semantics === 'call' ? (meta.layout?.c0ExtendShort ?? 100)
            : 60
          const midX = p0.x + extend
          const pts = [p0, { x: midX, y: p0.y }, { x: midX, y: p3.y }, p3]
          const pathD = d3.line<any>().x((p) => p.x).y((p) => p.y)(pts as any) as string

          edgesG.append('path')
            .attr('d', pathD)
            .attr('fill', 'none')
            .attr('stroke', '#E2E8F0')
            .attr('stroke-width', 1.8)
            .attr('stroke-dasharray', lineStyleToStrokeDasharray(e.style?.line) || null)
            .attr('marker-end', e.style?.marker === 'arrow' ? 'url(#arrow)' : null)

          // label with fixed distance from source along polyline
          if (e.label) {
            const fixedDist = (labelDistance ?? (e as any).labelDistanceFromSource ?? meta.layout?.labelDistanceFromSource ?? 30) as number
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

            let dy = 0
            if (e.semantics === 'instantiate') dy = -15
            else if (e.semantics === 'call') dy = 10

            const lines = String(e.label).split('\n')
            lines.forEach((line, i) => {
              edgesG.append('text')
                .attr('x', lx)
                .attr('y', ly + dy + i * 12)
                .attr('text-anchor', 'middle')
                .attr('font-size', 11)
                .attr('fill', '#E5E7EB')
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
  }, [dataUrl, labelDistance, reloadTick])

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
