import React, { useMemo } from 'react'

type CodePreviewProps = {
  code: string
  language?: 'java' | 'text'
  filename?: string
  maxHeight?: number
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlightJavaLine(raw: string): string {
  // 简易高亮：先转义，再按字符串/注解/数字/关键字分层处理
  let line = escapeHtml(raw)

  // 单行注释优先处理
  const commentIdx = line.indexOf('//')
  let comment = ''
  if (commentIdx >= 0) {
    comment = line.slice(commentIdx)
    line = line.slice(0, commentIdx)
  }

  // 字符串
  line = line.replace(/"([^"\\]|\\.)*"/g, (m) => `<span class="text-emerald-300">${m}</span>`)
  // 注解
  line = line.replace(/@[A-Za-z_][A-Za-z0-9_]*/g, (m) => `<span class="text-pink-300">${m}</span>`)
  // 数字
  line = line.replace(/\b\d+\b/g, (m) => `<span class="text-amber-300">${m}</span>`)
  // 关键字（边界匹配）
  const keywords = [
    'public','class','static','void','int','String','new','return','if','else','for','while','do','switch','case','break','continue','interface','implements','extends','package','import','boolean','char','long','float','double','null','true','false','final','private','protected'
  ]
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  line = line.replace(kwRegex, '<span class="text-sky-300">$1</span>')

  if (comment) {
    line += `<span class="text-white/40">${comment}</span>`
  }
  return line
}

export default function CodePreview({ code, language = 'java', filename, maxHeight = 224 }: CodePreviewProps) {
  const lines = useMemo(() => code.replace(/\r\n?/g, '\n').split('\n'), [code])
  const highlighted = useMemo(() => {
    if (language === 'java') return lines.map(highlightJavaLine)
    return lines.map(escapeHtml)
  }, [language, lines])

  function copyAll() {
    navigator.clipboard?.writeText(code).catch(() => {})
  }

  return (
    <div className="code-preview rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <div className="code-preview__bar flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-[11px] text-white/60">
          <span className="px-1.5 py-0.5 rounded bg-white/10">{language.toUpperCase()}</span>
          {filename && <span className="text-white/70">{filename}</span>}
          <span className="text-white/40">· {lines.length} 行</span>
        </div>
        <button className="btn-ghost text-[11px] px-2 py-1" onClick={copyAll}>复制</button>
      </div>
      <div className="text-[12px] leading-relaxed font-mono overflow-auto" style={{ maxHeight }}>
        <table className="w-full table-fixed">
          <tbody>
            {highlighted.map((html, i) => (
              <tr key={i} className="align-top">
                <td className="select-none pr-3 text-right w-10 text-white/30">
                  {i + 1}
                </td>
                <td className="text-white/90 whitespace-pre-wrap">
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
