import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, PlayCircle, BookOpen, BarChart3, GitBranch, ScrollText, Sparkles } from 'lucide-react'

export default function Home() {
  const nav = useNavigate()
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10">
        {/* gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/30 via-transparent to-transparent" />
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-sky-700/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 bg-indigo-700/30 blur-3xl rounded-full" />

  <div className="relative px-6 py-14 md:px-10 md:py-20 text-center">
          <div className="inline-flex">
            <span className="badge">Fuzzing Java optimizing compilers</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">InterFuzz</h1>
          <p className="mt-4 md:mt-6 text-base md:text-xl text-white/70 max-w-3xl mx-auto">
            面向复杂“类间结构”的高层程序图（HPG）建模与变异，引导性挖掘 Java 优化编译器缺陷。
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/demo"
              className="btn-primary relative overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_rgba(56,189,248,0.35)]"
              aria-label="开始演示"
            >
              <PlayCircle size={18} /> 开始演示
            </Link>
            <Link
              to="/principle"
              className="btn transition-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/30"
              aria-label="查看原理"
            >
              <BookOpen size={18} /> 查看原理
            </Link>
          </div>

          {/* Mini features inside hero */}
          <div className="mt-10 grid gap-4 md:grid-cols-3 text-left">
            <Link to="/principle" className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white grid place-items-center mb-3">
                <GitBranch className="opacity-90" size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-1">结构建模 · HPG</h3>
              <p className="text-white/70">用高层程序图抽象类/接口/方法及其语义关系，统一表达与分析。</p>
              <div className="mt-4 inline-flex items-center gap-1 text-white/80 group-hover:text-white">
                了解原理 <ArrowRight size={16} />
              </div>
            </Link>
            <Link to="/demo" className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white grid place-items-center mb-3">
                <PlayCircle className="opacity-90" size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-1">可视交互 · Demo</h3>
              <p className="text-white/70">粘贴/示例 JSON 即刻成图，双图对照与标签距离调节一键掌控。</p>
              <div className="mt-4 inline-flex items-center gap-1 text-white/80 group-hover:text-white">
                开始体验 <ArrowRight size={16} />
              </div>
            </Link>
            <Link to="/effects" className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white grid place-items-center mb-3">
                <BarChart3 className="opacity-90" size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-1">研究结果 · 效果</h3>
              <p className="text-white/70">统计与案例一目了然，直达发现的编译器问题与复现线索。</p>
              <div className="mt-4 inline-flex items-center gap-1 text-white/80 group-hover:text-white">
                查看效果 <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          {/* (removed: cat inside hero) */}
        </div>
      </section>
      {/* Cat fixed on the right edge of the Home page */}
      <div className="pointer-events-none hidden md:block fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10">
        <svg
          className="w-36 h-36 lg:w-48 lg:h-48 float-slow"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          {/* soft glow */}
          <defs>
            <radialGradient id="catGlowHome" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130 120) rotate(90) scale(90 90)">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx="130" cy="120" r="90" fill="url(#catGlowHome)" />

          {/* tail */}
          <path d="M150 125c20 0 25 20 10 28-9 5-18-1-18-1" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />

          {/* body */}
          <ellipse cx="110" cy="120" rx="38" ry="48" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.75)" strokeWidth="2" />

          {/* head */}
          <circle cx="130" cy="72" r="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
          {/* ears */}
          <path d="M115 62 L120 45 L128 62 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
          <path d="M132 62 L140 45 L145 62 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />

          {/* face */}
          <circle cx="123" cy="72" r="2.3" fill="rgba(255,255,255,0.88)" />
          <circle cx="137" cy="72" r="2.3" fill="rgba(255,255,255,0.88)" />
          <path d="M130 78 q-3 3 -6 0" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
          <path d="M130 78 q3 3 6 0" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
          <path d="M130 74 v4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />

          {/* whiskers */}
          <path d="M118 72 h-10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M118 76 h-10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M142 72 h10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M142 76 h10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />

          {/* paws */}
          <circle cx="95" cy="164" r="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
          <circle cx="120" cy="166" r="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Paper intro – livelier with subtle motion */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-10 -left-6 h-28 w-28 bg-sky-500/20 blur-2xl rounded-full float-slow" />
        <div className="pointer-events-none absolute -bottom-10 -right-6 h-28 w-28 bg-indigo-500/20 blur-2xl rounded-full float-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge">来自论文</span>
            <ScrollText size={18} className="opacity-80" />
            <span className="inline-flex items-center gap-1 text-xs text-white/70">
              <Sparkles size={14} className="text-yellow-300" />
              动机与要点
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            复杂跨类结构 + HPG 引导的编译器模糊测试
          </h2>
          <div className="mt-2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] sheen" />
          <p className="mt-3 text-white/80 max-w-4xl">
            以高层程序图（HPG）统一抽象类/接口/方法及其语义边，面向优化敏感的跨类结构进行定向生成与语义保持变异，
            结合差分一致性检测在多优化级别/执行后端下捕获优化不当导致的行为差异。
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { title: 'HPG 异构建模', desc: '融合类、接口、方法与语义边（继承/实现/调用/覆盖等），支撑全局推理。' },
              { title: '跨类结构定向生成', desc: '构造层级调用、泛型、覆盖/多态等优化敏感结构，贴近真实场景。' },
              { title: '结构/语义保持变异', desc: '在不破坏关键语义的前提下局部扰动，扩大探索而不过拟合。' },
              { title: '差分一致性检测', desc: '跨编译器/优化级别或解释/JIT 后端比对输出/异常差异。' },
              { title: '可视交互反馈', desc: '图可视化 + 交互调参，帮助理解与快速迭代。' },
              { title: '实证问题挖掘', desc: '针对真实优化路径定位问题，详情见“效果”。' },
            ].map((it, i) => (
              <div key={i} className="card group transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{it.title}</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/80 transition" />
                </div>
                <p className="mt-1 text-white/70 text-sm">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  )
}
