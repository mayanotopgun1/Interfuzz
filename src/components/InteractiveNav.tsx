import { useEffect } from 'react'
import { Layers, Boxes, Eye, Compass } from 'lucide-react'

/**
 * InteractiveNav
 * 页面顶部模式切换。折叠功能已移除，仅保留模式切换。
 * 父级通过回调接收当前激活模式。
 */
export interface InteractiveNavProps {
  onModeChange?: (m: Mode) => void
  activeMode?: Mode // 外部受控模式（从父级传入以同步 Tab 高亮）
}
export type Mode = 'overview' | 'single' | 'batch'

export default function InteractiveNav({ onModeChange, activeMode }: InteractiveNavProps) {
  // 纯受控：不再维护内部副本，避免横跳；父级传入 activeMode
  const mode = activeMode || 'overview'
  // 若需要通知父级（首次挂载或 activeMode 变化）
  useEffect(() => { if (activeMode) onModeChange?.(activeMode) }, [activeMode, onModeChange])

  const tabs: Array<{ mode: Mode; label: string; icon: any; desc: string }> = [
    { mode: 'overview', label: '总览', icon: Compass, desc: '平台价值与功能鸟瞰' },
    { mode: 'single', label: '单种子流水线', icon: Layers, desc: '分析—变异—可视化过程' },
    { mode: 'batch', label: '批量生成', icon: Boxes, desc: '多测试用例自动生成与下载' },
  ]

  return (
    <div className="relative mb-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => {
          const active = t.mode === mode
          return (
            <button
              key={t.mode}
              type="button"
              onClick={() => onModeChange?.(t.mode)}
              className={`group px-4 py-2 rounded-xl border text-sm flex items-center gap-2 transition ${active ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-200' : 'border-white/10 bg-white/5 text-white/60 hover:text-white'}`}
              aria-pressed={active}
            >
              <t.icon size={16} className={active ? 'text-cyan-300' : 'text-white/40 group-hover:text-white/70'} />
              <span className="font-medium tracking-wide">{t.label}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-3 text-xs text-white/50 flex items-center gap-2">
        <Eye size={14} />
        <span>当前模式：{tabs.find(t => t.mode === mode)?.desc}</span>
      </div>
    </div>
  )
}
