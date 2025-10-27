import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import 'highlight.js/styles/vs2015.css'
import type { CaseStudy } from '../data/case-studies'

// Register Java language
hljs.registerLanguage('java', java)

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [cs.code])

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      {/* Header with ID and Title */}
      <div className="mb-4">
        <a 
          href={cs.link} 
          target="_blank" 
          rel="noreferrer" 
          className="text-accent hover:text-accent/80 transition-colors font-bold text-lg flex items-center gap-2 group"
        >
          <span>{cs.id}:</span>
          <span className="text-white/90 font-medium">{cs.title}</span>
          <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className={compilerCls(cs.compiler)}>{cs.compiler}</Badge>
        <Badge className={statusCls(cs.status)}>{cs.status}</Badge>
        <Badge className={priorityCls(cs.priority)}>{cs.priority}</Badge>
        <Badge className="bg-purple-600/20 text-purple-300">{cs.symptom}</Badge>
      </div>

      {/* Key Information */}
      <div className="space-y-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3 border-l-4 border-blue-500">
          <div className="text-sm text-blue-300 font-semibold mb-1.5">关键结构</div>
          <div className="text-sm text-white/90">{cs.keyStructure}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border-l-4 border-amber-500">
          <div className="text-sm text-amber-300 font-semibold mb-1.5">根本原因</div>
          <div className="text-sm text-white/90 leading-relaxed">{cs.rootCause}</div>
        </div>
      </div>

      {/* Code with Syntax Highlighting */}
      <div className="mt-4">
        <div className="text-sm text-white/60 font-semibold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          复现代码
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <pre className="!m-0 !bg-[#1e1e1e]"><code ref={codeRef} className="language-java !text-[0.813rem] !leading-relaxed">{cs.code}</code></pre>
        </div>
      </div>
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
