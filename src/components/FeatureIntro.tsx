import React, { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Layers, Activity, BarChart2, Package } from 'lucide-react'

/**
 * FeatureIntro (Overview Only)
 * 精简、高对比、去除彩色渐变大块与卡片堆叠。
 * 仅用于“总览”模式，不展示具体两个功能块。
 */
interface Props { onNavigateMode?: (mode: 'single' | 'batch') => void }

export default function FeatureIntro({ onNavigateMode }: Props) {
  // 轻量主题检测（与 Demo 页一致）
  const [isLight, setIsLight] = useState<boolean>(() => typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light'))
  useEffect(() => {
    if (typeof document === 'undefined') return
    const obs = new MutationObserver(() => setIsLight(document.documentElement.classList.contains('theme-light')))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const txtStrong = isLight ? 'text-slate-900' : 'text-white'
  const txtPrimary = isLight ? 'text-slate-700' : 'text-white/70'
  const txtSecondary = isLight ? 'text-slate-600' : 'text-white/65'
  const txtMuted = isLight ? 'text-slate-500' : 'text-white/50'
  const badgeBorder = isLight ? 'border-cyan-400/40' : 'border-cyan-400/30'
  const badgeBg = isLight ? 'bg-cyan-400/15' : 'bg-cyan-500/10'
  const badgeText = isLight ? 'text-cyan-700' : 'text-cyan-300'
  const surfaceBase = isLight ? 'border-slate-200 bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_32px_-4px_rgba(0,0,0,0.06)]' : 'border-white/10 bg-[#12171f]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_-4px_rgba(0,0,0,0.45)]'
  const valueCardBorder = isLight ? 'border-slate-200 bg-slate-50/80 hover:bg-slate-100/70' : 'border-white/10 bg-white/[0.02]'
  const modeCardBorder = isLight ? 'border-slate-200 bg-slate-50/70' : 'border-white/10 bg-white/[0.035]'
  const modeSubtitle = isLight ? 'text-slate-500' : 'text-white/45'
  const modeTitle = isLight ? 'text-slate-800' : 'text-white/90'
  const listText = isLight ? 'text-slate-600' : 'text-white/60'
  const listIcon = isLight ? 'text-slate-400' : 'text-white/30'
  const dividerLine = isLight ? 'bg-slate-200' : 'bg-white/15'
  const enterBtn = isLight ? 'border-slate-300 bg-white/70 text-slate-700 hover:from-cyan-400/10 hover:to-emerald-400/10 hover:text-slate-900' : 'border-white/10 bg-white/5 text-white/75 hover:text-white'
  const gradientTitle = isLight ? 'from-cyan-600 via-sky-600 to-emerald-600 drop-shadow-[0_2px_4px_rgba(0,140,255,0.20)]' : 'from-cyan-300 via-sky-300 to-emerald-300 drop-shadow-[0_2px_8px_rgba(0,180,255,0.25)]'
  return (
    <section className="relative mb-12" aria-labelledby="interfuzz-intro-heading">
      {/* 背景网格 + 光斑装饰 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className={`absolute inset-0 ${isLight ? 'opacity-[0.22] bg-[radial-gradient(circle_at_35%_20%,rgba(120,200,255,0.55),transparent_60%)]' : 'opacity-[0.18] bg-[radial-gradient(circle_at_35%_20%,rgba(90,180,255,0.45),transparent_60%)]'}`} />
        <div className={`absolute inset-0 ${isLight ? 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]'} bg-[size:40px_40px]`} />
      </div>
      <div className={`relative p-9 md:p-12 rounded-2xl backdrop-blur-md ${surfaceBase}`}>
        <div className="grid lg:grid-cols-11 gap-12">
          {/* 左列：标题 + 描述段落 */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-4">
              <div className={`intro-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border ${badgeBorder} ${badgeBg} ${badgeText} text-[11px] tracking-wide uppercase font-medium shadow-sm animate-fade-in`}>Java 编译器测试</div>
              <h2 id="interfuzz-intro-heading" className={`intro-title text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] bg-gradient-to-r ${gradientTitle} bg-clip-text text-transparent transform opacity-0 translate-y-3 animate-title-in`}>
                InterFuzz
              </h2>
              <p className={`text-base md:text-lg ${txtPrimary} leading-relaxed max-w-prose font-medium`}>
                面向 Java 编译器测试的跨类结构测试种子生成平台，强调 <span className={txtStrong}>结构演化</span>、<span className={txtStrong}>差异可视化</span> 与 <span className={txtStrong}>批量构建</span> 能力。
              </p>
            </div>
            <div className={`space-y-4 text-[14px] leading-relaxed ${txtSecondary} animate-stagger`}>
              <p>InterFuzz 为 Java 编译器测试提供 <span className={`${txtStrong} font-semibold`}>丰富跨类结构</span> 的测试种子，两大核心路径：
                <span className={`${isLight ? 'text-cyan-700' : 'text-cyan-200'} font-semibold`}>单种子流水线</span>
                {' '}与{' '}
                <span className={`${isLight ? 'text-emerald-700' : 'text-emerald-200'} font-semibold`}>多种子批量生成</span>。
              </p>
              <p><span className={`font-semibold ${txtStrong}`}>单种子流水线：</span> 从基础 Seed 出发迭代应用跨类结构变异算子：接口实现、继承层次、嵌套、泛型约束等，逐步演化并支持前后关系图对比。</p>
              <p><span className={`font-semibold ${txtStrong}`}>多种子批量生成：</span> 依据数量与迭代深度参数批量产出多样化结构集合，支持单例 ZIP 与总包打包，快速扩展编译器输入集。</p>
            </div>
            {/* 能力徽章 */}
            <div className="flex flex-wrap gap-2 pt-2 animate-stagger">
              {[{icon:<Activity size={15}/>,label:'结构演化'}, {icon:<BarChart2 size={15}/>,label:'差异度量'}, {icon:<Package size={15}/>,label:'批量生成'}, {icon:<Layers size={15}/>,label:'跨类关系'}].map(b => (
                <span key={b.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[12px] transition shadow-sm ${isLight ? 'border-slate-300 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50' : 'border-white/10 bg-gradient-to-r from-white/10 to-white/5 text-white/75 hover:text-white hover:border-white/20 hover:from-white/15'}`}>
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>
            <div className="pt-1 flex items-center gap-2">
              <div className={`h-px w-12 ${dividerLine}`} />
            {/* <div className="text-[11px] text-white/45 tracking-wide">使用顶部 Tab 切换模式获取不同交互区域</div> */}
            </div>
          </div>
          {/* 右列：价值点 + 模式对照 */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* 三列价值点 */}
            <div className={`rounded-xl p-6 grid md:grid-cols-3 gap-6 intro-cards-prim ${isLight ? 'border-slate-200 bg-white/70' : 'border-white/10 bg-white/[0.02]'} border`}>
              {[
                { title: '结构演化驱动', detail: '由无跨类结构到多维关系组合，提升类型/层次覆盖。' },
                { title: '差异可视化', detail: '节点/方法/字段与边类型增量清晰呈现演化价值。' },
                { title: '批量构建扩展', detail: '批量生成 + 打包，预留后续去重与覆盖评估接口。' }
              ].map(x => (
                <div key={x.title} className="flex flex-col gap-2 group">
                  <div className={`text-base md:text-lg font-semibold flex items-center gap-1 ${isLight ? 'text-slate-900' : 'text-white/80'}`}><ChevronRight size={15} className={`${isLight ? 'text-slate-500 group-hover:text-cyan-600' : 'text-white/30 group-hover:text-cyan-300'} transition`} />{x.title}</div>
                  <div className={`text-sm md:text-[15px] leading-relaxed transition ${isLight ? 'text-slate-600 group-hover:text-slate-700' : 'text-white/50 group-hover:text-white/60'}`}>{x.detail}</div>
                </div>
              ))}
            </div>
            {/* 模式对照 */}
            <div className="grid md:grid-cols-2 gap-6 intro-cards-secondary">
              {[
                { key: 'single', title: '单种子流水线', sub: '结构渐进演化', lines: ['输入：单个 Seed', '算子：跨类结构注入', '产出：演化后结构 + 图对比', '定位：观察结构差异轨迹'] },
                { key: 'batch', title: '多种子批量生成', sub: '规模化输入集构建', lines: ['输入：迭代次数 + 数量', '过程：批量并行生成/打包', '产出：单例 ZIP + 总包 ZIP', '定位：快速形成输入集合'] }
              ].map(card => (
                <div key={card.key} className={`rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group opacity-0 translate-y-4 animate-card-in border ${modeCardBorder}`}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition ${isLight ? 'bg-gradient-to-br from-cyan-500/25 via-sky-500/20 to-emerald-500/25' : 'bg-gradient-to-br from-cyan-400/30 via-sky-400/25 to-emerald-400/30'}`} />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className={`text-base font-semibold tracking-wide ${modeTitle}`}>{card.title}</span>
                      <span className={`text-[11px] ${modeSubtitle}`}>{card.sub}</span>
                    </div>
                    <Layers size={20} className={`${isLight ? 'text-slate-400/50' : 'text-white/25'}`} />
                  </div>
                  <ul className={`space-y-1.5 text-[12px] leading-relaxed ${listText}`}>
                    {card.lines.map(l => <li key={l} className="flex items-start gap-1"><ChevronRight size={13} className={`mt-[2px] transition ${isLight ? 'text-slate-400 group-hover:text-cyan-500' : 'text-white/30 group-hover:text-cyan-300'}`} />{l}</li>)}
                  </ul>
                  <div className="pt-1 relative">
                    {/* 指向按钮的醒目箭头：卡片内最高层级，位于按钮右上方略向下偏斜 */}
                    <div className="pointer-events-none absolute top-0 right-42 -translate-y-3 w-11 h-0.5 flex items-center justify-center z-40 animate-arrow-point">
                      <svg className={`w-11 h-11 drop-shadow-[0_0_10px_rgba(0,155,255,0.45)] ${isLight ? 'text-cyan-600' : 'text-cyan-300'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: 'rotate(50deg)' }}>
                        <path d="M4 12h13" />
                        <path d="M13 6l7 6-7 6" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateMode?.(card.key as 'single'|'batch')}
                      className={`group inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md border transition shadow-sm ${enterBtn}`}
                    >进入 {card.title}<ArrowRight size={13} className="group-hover:translate-x-0.5 transition"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

