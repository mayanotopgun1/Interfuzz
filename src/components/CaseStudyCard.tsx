import { useState } from 'react'
import type { CaseStudy } from '../data/case-studies'

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <a href={cs.link} target="_blank" rel="noreferrer" className="text-accent hover:underline font-semibold">
            {cs.id}
          </a>
          <div className="text-sm mt-1 font-medium">{cs.title}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <Badge className={compilerCls(cs.compiler)}>{cs.compiler}</Badge>
            <Badge className={statusCls(cs.status)}>{cs.status}</Badge>
            <Badge className={priorityCls(cs.priority)}>{cs.priority}</Badge>
            <Badge className="bg-white/10 text-white/70">{cs.symptom}</Badge>
          </div>
        </div>
        <button className="btn-ghost" onClick={() => setOpen((v) => !v)} aria-label="展开/收起代码">
          {open ? '收起代码' : '查看代码'}
        </button>
      </div>

      <div className="mt-4 text-sm space-y-1">
        <p className="text-white/80"><b>关键结构：</b>{cs.keyStructure}</p>
        <p className="text-white/80"><b>根因：</b>{cs.rootCause}</p>
      </div>

      {open && (
        <pre className="mt-3 p-3 rounded-xl bg-black/40 text-xs overflow-auto whitespace-pre-wrap font-mono">
{cs.code}
        </pre>
      )}
    </div>
  )
}

function Badge({ children, className = '' }: { children: any; className?: string }) {
  return <span className={`px-2 py-0.5 rounded-full ${className}`}>{children}</span>
}

function compilerCls(c: 'HotSpot' | 'R8') {
  return c === 'HotSpot' ? 'bg-blue-600/20 text-blue-300' : 'bg-amber-600/20 text-amber-300'
}
function statusCls(s: 'Fixed' | 'Confirmed') {
  return s === 'Fixed' ? 'bg-emerald-600/20 text-emerald-300' : 'bg-blue-600/20 text-blue-300'
}
function priorityCls(p: 'P1' | 'P2' | 'P3') {
  return p === 'P1' ? 'bg-rose-600/20 text-rose-300' : p === 'P2' ? 'bg-orange-600/20 text-orange-300' : 'bg-amber-600/20 text-amber-300'
}
