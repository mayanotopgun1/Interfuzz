import * as d3 from 'd3'

export type GraphJSON = {
  meta: {
    title?: string
    layout?: {
      mode?: 'grid' | 'elk'
      colGap?: number
      rowGap?: number
      c0ExtendLong?: number
      c0ExtendShort?: number
      labelDistanceFromSource?: number
    }
    nodeDefaults?: { width?: number; rowHeight?: number; padding?: number }
  }
  nodes: Array<{
    id: string
    layer: number
    order: number
    rows: Array<{ type: 'class' | 'interface' | 'method' | 'field'; text: string }>
  }>
  edges: Array<{
    id: string
    source: string
    target: string
    style?: { line?: 'solid' | 'dashed' | 'dotted'; marker?: 'arrow' | 'none' }
    label?: string
    // semantics is deprecated/unused now; kept for backward-compat only
    semantics?: string
    // optional per-edge lane offset to avoid overlap with parallel edges (pixels, +down/-up)
    laneOffset?: number
    // optional gap (pixels) used when auto-distributing lanes within the same pair
    laneGap?: number
    attach?: {
      // legacy roles (still supported)
      source?: 'classRow' | 'methodRow'
      target?: 'classRow' | 'methodRow'
      // optional precise selectors (new):
      // 1-based absolute row index within the node's rows array
      sourceRow?: number
      targetRow?: number
      // 0-based index among method rows only (first method = 0)
      sourceMethodIndex?: number
      targetMethodIndex?: number
      // substring match against row.text; first match wins
      sourceMatch?: string
      targetMatch?: string
    }
    // explicit per-edge geometry/tuning (new, all optional)
    extendDistance?: number // horizontal extend length before turning vertical
    labelDistanceFromSource?: number // along-edge distance for placing label
    labelDy?: number // vertical offset for label placement
    targetSide?: 'east' | 'west' | 'north' | 'south'
  }>
}

export function measureNodeHeight(node: GraphJSON['nodes'][number], defRow = 30, pad = 8) {
  return node.rows.length * defRow + pad * 2
}

export function lineStyleToStrokeDasharray(line?: 'solid' | 'dashed' | 'dotted') {
  if (line === 'dashed') return '6,6'
  if (line === 'dotted') return '2,6'
  return null
}

export function centerOfAttach(
  n: { x: number; y: number; width: number; height: number; rows: GraphJSON['nodes'][number]['rows'] },
  which: 'classRow' | 'methodRow'
) {
  const padding = 0
  const rowHeight = n.height / n.rows.length
  const classIdx = 0
  const methodIdx = n.rows.findIndex((r) => r.type === 'method')
  const idx = which === 'classRow' ? (classIdx >= 0 ? classIdx : 0) : methodIdx >= 0 ? methodIdx : 0
  const cy = n.y + padding + rowHeight * idx + rowHeight / 2
  const cx = n.x + n.width / 2
  return { x: cx, y: cy }
}

export function applyZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>
) {
  const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    g.attr('transform', event.transform.toString())
  }
  const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.2, 4]).on('zoom', zoomed)
  svg.call(zoom as any)
  return {
    reset() {
      svg.transition().duration(250).call(zoom.transform as any, d3.zoomIdentity)
    },
    scaleBy(factor: number) {
      svg.transition().duration(200).call((zoom as any).scaleBy, factor)
    },
    destroy() {
      svg.on('.zoom', null)
    },
  }
}
