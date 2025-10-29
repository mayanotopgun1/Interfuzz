import React, { useMemo, useState, useEffect } from 'react'

type CodePreviewProps = {
  code: string
  language?: 'java' | 'text'
  filename?: string
  maxHeight?: number
}

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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightJavaLine(raw: string, isLight: boolean): string {
  // 简易高亮：先转义，再按字符串/注解/数字/关键字分层处理
  let line = escapeHtml(raw)

  // 单行注释优先处理
  const commentIdx = line.indexOf('//')
  let comment = ''
  if (commentIdx >= 0) {
    comment = line.slice(commentIdx)
    line = line.slice(0, commentIdx)
  }

  // 根据主题使用不同的颜色
  const colors = isLight ? {
    string: 'text-red-700',
    annotation: 'text-purple-700',
    number: 'text-emerald-700',
    keyword: 'text-blue-700',
    comment: 'text-green-600'
  } : {
    string: 'text-emerald-300',
    annotation: 'text-pink-300',
    number: 'text-amber-300',
    keyword: 'text-sky-300',
    comment: 'text-white/40'
  }

  // 字符串
  line = line.replace(/"([^"\\]|\\.)*"/g, (m) => `<span class="${colors.string}">${m}</span>`)
  // 注解
  line = line.replace(/@[A-Za-z_][A-Za-z0-9_]*/g, (m) => `<span class="${colors.annotation}">${m}</span>`)
  // 数字
  line = line.replace(/\b\d+\b/g, (m) => `<span class="${colors.number}">${m}</span>`)
  // 关键字（边界匹配）
  const keywords = [
    'public','class','static','void','int','String','new','return','if','else','for','while','do','switch','case','break','continue','interface','implements','extends','package','import','boolean','char','long','float','double','null','true','false','final','private','protected'
  ]
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  line = line.replace(kwRegex, `<span class="${colors.keyword}">$1</span>`)

  if (comment) {
    line += `<span class="${colors.comment}">${comment}</span>`
  }
  return line
}

export default function CodePreview({ code, language = 'java', filename, maxHeight = 224 }: CodePreviewProps) {
  const isLight = useIsLightTheme()
  const lines = useMemo(() => code.replace(/\r\n?/g, '\n').split('\n'), [code])
  const highlighted = useMemo(() => {
    if (language === 'java') return lines.map(l => highlightJavaLine(l, isLight))
    return lines.map(escapeHtml)
  }, [language, lines, isLight])

  function copyAll() {
    navigator.clipboard?.writeText(code).catch(() => {})
  }

  return (
    <div className={`code-preview rounded-xl border overflow-hidden ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/40'}`}>
      <div className={`code-preview__bar flex items-center justify-between px-3 py-2 border-b ${isLight ? 'border-slate-200 bg-slate-100' : 'border-white/10 bg-white/5'}`}>
        <div className={`flex items-center gap-2 text-[11px] ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
          <span className={`px-1.5 py-0.5 rounded ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>{language.toUpperCase()}</span>
          {filename && <span className={isLight ? 'text-slate-700' : 'text-white/70'}>{filename}</span>}
          <span className={isLight ? 'text-slate-400' : 'text-white/40'}>· {lines.length} 行</span>
        </div>
        <button className="btn-ghost text-[11px] px-2 py-1" onClick={copyAll}>复制</button>
      </div>
      <div className="text-[12px] leading-relaxed font-mono overflow-auto" style={{ maxHeight }}>
        <table className="w-full table-fixed">
          <tbody>
            {highlighted.map((html, i) => (
              <tr key={i} className="align-top">
                <td className={`select-none pr-3 text-right w-10 ${isLight ? 'text-slate-400' : 'text-white/30'}`}>
                  {i + 1}
                </td>
                <td className={`whitespace-pre-wrap ${isLight ? 'text-slate-800' : 'text-white/90'}`}>
                  <span dangerouslySetInnerHTML={{ __html: html }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
