export type NodeKind = 'class' | 'interface' | 'method' | 'field'

export function normalizeRowType(t?: string): NodeKind | undefined {
  const v = String(t || '').toLowerCase()
  if (!v) return undefined
  if (v === 'class') return 'class'
  if (v === 'interface' || v === 'intf') return 'interface'
  if (v === 'method' || v === 'mtd') return 'method'
  if (v === 'field' || v === 'fld') return 'field'
  return undefined
}

export type PaletteColor = {
  accent: string // strong stroke/accent
  tint: string // subtle row background
  text: string // preferred text color
}

export type NodePalette = Record<NodeKind, PaletteColor>

export function getNodePalette(isLight: boolean): NodePalette {
  // Keep colors accessible in both themes
  return {
    class: {
      accent: isLight ? '#0f766e' : '#34d399', // teal-700 / emerald-400
      tint: isLight ? 'rgba(13,148,136,0.08)' : 'rgba(16,185,129,0.10)', // teal-600 / emerald-500
      text: isLight ? '#0f172a' : '#e2e8f0', // slate-900 / slate-200
    },
    interface: {
      accent: isLight ? '#2563eb' : '#60a5fa', // blue-600 / blue-400 (more distinct from class teal)
      tint: isLight ? 'rgba(37,99,235,0.10)' : 'rgba(96,165,250,0.16)', // blue-600 / blue-400
      text: isLight ? '#0f172a' : '#e2e8f0',
    },
    method: {
      accent: isLight ? '#4338ca' : '#a78bfa', // indigo-700 / violet-300
      tint: isLight ? 'rgba(99,102,241,0.08)' : 'rgba(167,139,250,0.12)', // indigo-500 / violet-300
      text: isLight ? '#111827' : '#f3f4f6',
    },
    field: {
      accent: isLight ? '#a16207' : '#f59e0b', // amber-700 / amber-500
      tint: isLight ? 'rgba(245,158,11,0.10)' : 'rgba(245,158,11,0.12)',
      text: isLight ? '#111827' : '#f8fafc',
    },
  }
}

export function inferNodeKind(node: any): NodeKind | undefined {
  // Prefer explicit node.kind or node.type if provided
  const direct = normalizeRowType((node && (node.kind || node.type)) as string)
  if (direct) return direct
  // Fallback: use the first row type as the node kind
  const rows = (node?.rows || []) as Array<{ type?: string }>
  if (rows.length > 0) return normalizeRowType(rows[0]?.type)
  return undefined
}
