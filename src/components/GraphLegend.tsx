import React, { useEffect, useState } from 'react'
import { getNodePalette, type NodeKind } from '../lib/nodeTypePalette'

const items: Array<{ key: NodeKind; label: string }> = [
  { key: 'class', label: '类 Class' },
  { key: 'interface', label: '接口 Interface' },
  { key: 'method', label: '方法 Method' },
  { key: 'field', label: '字段 Field' },
]

function isLightTheme() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')
}

export default function GraphLegend() {
  const [isLight, setIsLight] = useState(isLightTheme())

  useEffect(() => {
    const el = document.documentElement
    const mo = new MutationObserver(() => setIsLight(isLightTheme()))
    mo.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  const palette = getNodePalette(isLight)

  const edgeItems: Array<{ key: string; label: string; stroke: string; dash?: 'solid'|'dashed'|'dotted'; arrow?: boolean }>= [
    { key: 'inheritance', label: '继承 Inheritance', stroke: isLight ? '#38bdf8' : '#bae6fd', dash: 'solid', arrow: true },
    { key: 'interface-impl', label: '接口实现 Interface Impl', stroke: isLight ? '#a78bfa' : '#c4b5fd', dash: 'dashed', arrow: true },
    { key: 'nesting', label: '嵌套 Nesting', stroke: isLight ? '#f59e0b' : '#fbbf24', dash: 'solid', arrow: false },
    { key: 'generic-bounds', label: '泛型约束 Generic Bounds', stroke: isLight ? '#fb7185' : '#fca5a5', dash: 'dotted', arrow: false },
    { key: 'reference', label: '引用 Reference', stroke: isLight ? '#22c55e' : '#86efac', dash: 'dotted', arrow: true },
  ]

  return (
    <div className="absolute bottom-3 right-3 z-10 rounded-md border text-xs px-2 py-2 backdrop-blur-sm"
         style={{
           borderColor: isLight ? 'rgba(15,23,42,0.15)' : 'rgba(255,255,255,0.16)',
           background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(2,6,23,0.45)',
           color: isLight ? '#0f172a' : '#e5e7eb',
         }}
         aria-label="节点图例">
      <div className="grid grid-cols-1 gap-1">
        <div className="text-[11px] opacity-80">节点 Node</div>
        {items.map((it) => (
          <div key={it.key} className="flex items-center gap-2">
            <span aria-hidden className="inline-block rounded-sm"
                  style={{ width: 10, height: 10, background: palette[it.key].accent }} />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
      <div className="h-px my-2" style={{ background: isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.12)' }} />
      <div className="grid grid-cols-1 gap-1">
        <div className="text-[11px] opacity-80">边 Edge</div>
        {edgeItems.map((it) => (
          <div key={it.key} className="flex items-center gap-2">
            <svg width="46" height="12" aria-hidden>
              <defs>
                <marker id={`legend-arrow-${it.key}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={it.stroke} />
                </marker>
              </defs>
              <line x1="2" y1="6" x2="44" y2="6"
                    stroke={it.stroke}
                    strokeWidth="2"
                    strokeDasharray={it.dash === 'dashed' ? '6,6' : it.dash === 'dotted' ? '2,6' : undefined}
                    markerEnd={it.arrow ? `url(#legend-arrow-${it.key})` : undefined}
              />
            </svg>
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
