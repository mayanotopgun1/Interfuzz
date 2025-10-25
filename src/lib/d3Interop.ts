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
    semantics?: string
    attach?: { source?: 'classRow' | 'methodRow'; target?: 'classRow' | 'methodRow' }
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
