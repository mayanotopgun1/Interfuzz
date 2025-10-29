import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import type { CaseStudy } from '../data/case-studies'

// Register Java language
hljs.registerLanguage('java', java)

// 主题检测 Hook
function useIsLightTheme(): boolean {
  const [isLight, setIsLight] = useState<boolean>(() => 
    typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')
  )
  
  useEffect(() => {
    if (typeof document === 'undefined') return
    const obs = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('theme-light'))
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  
  return isLight
}

// 简单的 Java 语法高亮函数
function highlightLine(line: string, isLight: boolean): string {
  if (!line.trim()) return '&nbsp;'
  
  // 使用 hljs 高亮单行代码
  try {
    const result = hljs.highlight(line, { language: 'java' })
    return result.value
  } catch {
    return line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
}

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const codeRef = useRef<HTMLElement>(null)
  const isLight = useIsLightTheme()

  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      {/* Header with ID and Title */}
      <div className="mb-4">
        <a 
          href={cs.link} 
          target="_blank" 
          rel="noreferrer" 
          className="text-accent hover:text-accent/80 transition-colors font-bold text-xl flex items-center gap-2 group"
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
          <div className="text-base text-blue-300 font-semibold mb-1.5">关键结构</div>
          <div className="text-base text-white/90">{cs.keyStructure}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border-l-4 border-amber-500">
          <div className="text-base text-amber-300 font-semibold mb-1.5">根本原因</div>
          <div className="text-base text-white/90 leading-relaxed">{cs.rootCause}</div>
        </div>
      </div>

      {/* Code with Syntax Highlighting */}
      <div className="mt-4">
        <div className={`text-base font-semibold mb-2 flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          复现代码
        </div>
        <div className={`rounded-xl overflow-hidden shadow-lg ${isLight ? 'border border-slate-200' : 'border border-white/10'}`}>
          <pre className={`code-preview !m-0 ${isLight ? 'bg-slate-50' : 'bg-[#1e1e1e]'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {cs.code.split('\n').map((line, idx) => (
                    <tr key={idx} className="align-top">
                      <td className={`select-none text-right pr-4 pl-4 py-0.5 ${isLight ? 'text-slate-400 bg-slate-100' : 'text-white/30 bg-white/5'}`} style={{ width: '3.5rem', minWidth: '3.5rem' }}>
                        <span className="text-[0.75rem] font-mono">{idx + 1}</span>
                      </td>
                      <td className={`pr-4 py-0.5 ${isLight ? 'text-slate-800' : 'text-white/90'}`}>
                        <code 
                          ref={idx === 0 ? codeRef : undefined}
                          className={`language-java !text-[0.813rem] !leading-relaxed font-mono ${isLight ? 'hljs-light' : 'hljs-dark'}`}
                          dangerouslySetInnerHTML={{ __html: highlightLine(line, isLight) }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </pre>
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
