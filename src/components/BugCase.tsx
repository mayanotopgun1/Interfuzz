import { useState } from 'react'

export interface BugItem {
  id: string
  compiler: string
  type: string
  title: string
  gist: string
  rootCause: string
  snippet: string
  impact: string
  ref: string
}

export default function BugCase({ item }: { item: BugItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <div className="text-xs text-white/60 mt-1">
            <span className="mr-2 px-2 py-0.5 rounded bg-white/10">{item.compiler}</span>
            <span className="px-2 py-0.5 rounded bg-white/10">{item.type}</span>
          </div>
        </div>
        <button className="btn-ghost" aria-label="展开/收起代码片段" onClick={() => setOpen((v) => !v)}>
          {open ? '收起' : '查看代码'}
        </button>
      </div>
      <div className="mt-3 text-sm">
        <p><b>现象：</b>{item.gist}</p>
        <p><b>成因：</b>{item.rootCause}</p>
        <p><b>影响：</b>{item.impact}</p>
      </div>
      {open && (
        <pre className="mt-3 p-3 rounded-xl bg-black/40 text-xs overflow-auto whitespace-pre-wrap font-mono">
{item.snippet}
        </pre>
      )}
    </div>
  )
}
