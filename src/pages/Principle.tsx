import { useMemo, useState, useRef, useEffect } from 'react'
import { GitBranch, Wand2, Gauge, GitCompare, ShieldCheck, CheckCircle2 } from 'lucide-react'

type PrincipleItem = {
  id: string
  title: string
  hint: string
  render: () => JSX.Element
}

export default function Principle() {
  const glossary = useMemo(() => ([
    { key: 'hpg', term: 'HPG', desc: 'Heterogeneous Program Graph：同一张图里包含多类节点与多种语义边，统一表达跨类结构。' },
    { key: 'devirt', term: '去虚化', desc: '把虚方法调用优化为直接调用（静态绑定），前提通常是目标可唯一决定。' },
    { key: 'escape', term: '逃逸分析', desc: '判断对象是否逃出作用域；若不逃逸，可做标量替换/栈上分配等优化。' },
    { key: 'difftest', term: '差分测试', desc: '同一用例在不同环境（编译器/级别/后端）运行，行为不同即为可疑。' },
    { key: 'equiv', term: '等价类', desc: '在定义的语义视角下等价的图/用例集合，用于去重与最小化。' },
    { key: 'invariant', term: '不变量', desc: '变异前后必须保持的规则（类型/可见性/泛型边界/无循环等）。' },
  ]), [])
  const [openGlossaryKey, setOpenGlossaryKey] = useState<string | null>(null)
  const [glossaryVisible, setGlossaryVisible] = useState<boolean>(false)
  const [glossaryQuery, setGlossaryQuery] = useState<string>('')
  const filteredGlossary = useMemo(() => {
    const q = glossaryQuery.trim().toLowerCase()
    if (!q) return glossary
    return glossary.filter(g =>
      g.term.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
    )
  }, [glossary, glossaryQuery])
  const items: PrincipleItem[] = useMemo(() => [
    {
      id: 'hpg',
      title: 'HPG（异构程序图）',
      hint: '统一抽象 · 语义对齐',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">HPG（异构程序图）</h2>
            <span className="badge">模型</span>
          </div>
          <p className="text-white/80">
            什么是 HPG？它是一种把“类 / 接口 / 方法及其关系”画成图的方式。与只关注语法的 AST 或只关注控制流的 CFG 不同，
            HPG 聚焦于“跨类的语义结构”——继承、实现、调用、覆写、泛型边界、嵌套等，把这些容易触发编译优化边界的关系清晰地表达出来。
          </p>
          <p className="text-white/70 mt-2">
            为什么需要它？优化器经常在这些关系的组合处做决策（比如内联、逃逸分析、虚调用去虚化）。如果结构复杂或边界条件微妙，
            就可能产生错误优化或行为不一致。HPG 让我们“看得见结构”，并且可以对结构做精确的生成与变异，从而更有针对性地测试编译器。
          </p>
          <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3 text-white/75 text-sm">
            <div className="font-medium mb-1">一个直观的小例子</div>
            <p>
              接口 I 有一个默认方法 f()，类 A 实现 I 并覆写 f()，类 B 继承 A 但不覆写。对象经由 I 的引用被传递，
              不同的优化级别下，JIT 可能把虚调用去虚化到 A.f()。若边界条件（比如泛型或可见性）被微调，去虚化可能不再成立，
              这类细小变化就很容易在 HPG 上被“看见”和“构造”。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h3 className="font-medium mb-1">元素与语义</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>节点：Class / Interface / Method / Field（含修饰符、可见性、泛型参数）。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>语义边：Inheritance、Implements、Overrides、Calls、Instantiates、FieldAccess、Nesting、GenericBounds。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>类型信息：方法签名（返回/参数/泛型约束）、异常、可空性与可见性。</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-1">约束与可视</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>图约束：无循环继承/实现冲突；覆写需满足签名一致性与可见性放宽原则。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>泛型约束：边界一致（extends/super）；可替换性满足里氏替换。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>可视化规范：正交边 + 端口；标签沿源端定距显示；同层对齐、跨层有序。</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 text-white/70 text-sm space-y-1">
            <div>设计初衷：用 HPG 统一承载“生成→变异→验证”的全流程信息，以结构显式与语义可检验为第一原则。</div>
            <div>为什么叫“异构”：同一张图中并置多类节点和多种语义边（继承/调用/覆写/泛型等），统一表达而非割裂为多张图。</div>
          </div>
        </section>
      )
    },
    {
      id: 'mut',
      title: 'Inter-Class Mutators',
      hint: '结构保持 · 有效扰动',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Inter-Class Mutators（结构保持变换）</h2>
            <span className="badge">变异</span>
          </div>
          <p className="text-white/80">
            为什么要变异？真实优化问题常发生在“几乎正确”的边界上。我们通过对 HPG 做小步、可控的结构调整，
            把图推向那些容易触发优化决策变化的临界点。变异不是随意破坏，而是在保持语义不变的前提下“换一个结构角度”。
          </p>
          <p className="text-white/70 mt-2">核心设计：原子操作 + 不变量守护。前者保证覆盖多种结构；后者保证变异后仍然“可编译、可运行、可对比”。</p>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3">
              <h3 className="font-medium">原子操作</h3>
              <ul className="text-white/75 text-sm mt-1 space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>Add Node（Class / Interface / Method / Field）</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>Add Edge（Inheritance / Implements / Calls / Overrides / Nesting ...）</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>替换类型/修饰符（在约束允许下）</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>方法移动/提升（pull-up/push-down）与委托注入（delegate/forward）。</span></li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <h3 className="font-medium">结构保持（Invariants）</h3>
              <ul className="text-white/75 text-sm mt-1 space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>不引入循环继承/实现冲突</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>保持方法签名/可见性契约与重写一致性</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>保持泛型边界与类型可替换性</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>避免破坏外部可见 API 的二进制兼容性（名称/签名/可见性）。</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3">
              <h3 className="font-medium">优化敏感模式库</h3>
              <ul className="text-white/75 text-sm mt-1 space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>多态链：A→B→C 覆盖深度与分支度。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>内联边界：小方法跨模块调用与异常路径。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>逃逸相关：对象分配位置与别名关系。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>泛型擦除：边界与通配配合（extends/super）。</span></li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <h3 className="font-medium">去重与最小化</h3>
              <ul className="text-white/75 text-sm mt-1 space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>基于 HPG 等价类的差异归并（结构签名 + 语义哈希）。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-sky-400 mt-0.5" /><span>最小化策略：保留差分行为的最小节点/边子图。</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 text-white/70 text-sm">示例：添加中间父类、插入多态覆盖点、重定向调用到接口默认方法、在嵌套类间引入访问桥。</div>
          <div className="mt-2 text-white/70 text-xs">
            正确性保障：
            <span className="ml-1">(1) 语义等价视角：对外可见 API 与行为不变；</span>
            <span className="ml-1">(2) 约束守护：类型/可见性/泛型边界/无循环；</span>
            <span className="ml-1">(3) 自动校验：编译通过 + 运行自检 + 差分再验证。</span>
          </div>
        </section>
      )
    },
    {
      id: 'guide',
      title: '引导信号（复杂度/敏感度）',
      hint: '覆盖优化难点',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">引导信号（复杂度与优化敏感度）</h2>
            <span className="badge">启发</span>
          </div>
          <p className="text-white/80">
            为什么要引导？全空间随机探索既慢又浪费。我们用“结构复杂度 + 优化敏感度”给图打分，优先选择更可能触发优化边界的方向，
            同时保留随机扰动，避免走进单一路径——可以理解为“更聪明的随机”。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h3 className="font-medium mb-1">复杂度评分</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>度指标：Σ 节点度（入/出）与跨层连接数。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>类型熵：不同语义边（call/override/instantiate/…）的分布熵。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>层级深度：继承/嵌套/调用路径的最大深度与平均深度。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>综合得分：score = w1·deg + w2·entropy + w3·depth（归一化后加权）。</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-1">优化敏感度</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>多态/覆写热点、内联临界点、逃逸/别名敏感结构加权提升。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>“风险图元”库：抽象类 + 默认接口方法 + 泛型边界 + 捕获异常链。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>自适应调度：选择能提升分数的变异器；周期回溯与随机扰动避免早收敛。</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-2 text-white/70 text-sm">评分用于引导搜索方向，而非唯一目标；保持一定随机性提高覆盖多样性。</div>
        </section>
      )
    },
    {
      id: 'diff',
      title: '差分一致性测试',
      hint: '多编译器/级别/后端',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">差分一致性测试流程</h2>
            <span className="badge">测试</span>
          </div>
          <p className="text-white/80">
            差分测试是什么？同一个用例在不同“编译器/版本/优化级别/后端”下运行，若结果不同，就说明某处存在潜在问题。
            它不依赖手写断言，而是用“环境差异”来当判定器，特别适合挖掘优化相关的微妙错误。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h3 className="font-medium mb-1">管线</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-white/10 text-white/80 text-xs grid place-items-center">1</span><span>从 HPG 生成/变异 Java 用例，保证可编译与确定性。</span></div>
                <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-white/10 text-white/80 text-xs grid place-items-center">2</span><span>编译/运行矩阵：多编译器/版本、多优化级别（O0/O1/O2…），多后端（解释/JIT）。</span></div>
                <div className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-white/10 text-white/80 text-xs grid place-items-center">3</span><span>采集产物：标准输出/错误、退出码、崩溃信号、超时、可选字节码/IR。</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-1">判定与归并</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>差分判定：行为不一致、崩溃、断言失败、性能异常尖峰（可选阈值）。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>最小化：delta-debug + 图子集保留策略，维持差分成立。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>去重：按症状 + HPG 结构签名聚类，减少重复报告。</span></li>
              </ul>
            </div>
          </div>
          {/* 直观比较矩阵小示意 */}
          <div className="mt-3 text-white/80">
            <div className="text-sm font-medium mb-1">比较矩阵（示意）</div>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div></div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10">编译器A</div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10">编译器B</div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10">编译器C</div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10">O1/JIT</div>
              <div className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30">OK</div>
              <div className="px-2 py-1 rounded bg-rose-500/15 border border-rose-500/30">不同</div>
              <div className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30">OK</div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/10">O2/JIT</div>
              <div className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30">OK</div>
              <div className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30">OK</div>
              <div className="px-2 py-1 rounded bg-rose-500/15 border border-rose-500/30">不同</div>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-2">在前端，你看到的是“同一结构”在不同配置下的表现差异；我们会把可疑路径高亮到图上，帮助定位。</p>
        </section>
      )
    },
    {
      id: 'safety',
      title: '前提与安全边界',
      hint: '可复现 · 可控',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">前提与安全边界</h2>
            <span className="badge">边界</span>
          </div>
          <p className="text-white/80">
            为了让“发现的问题真实可信、可复现”，我们对输入、执行环境与副作用做了硬性约束。它们保证每一次对比都是有意义的，
            同时也让复现与上报更顺畅。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">前提</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>语法/类型正确；构建可复现（固定种子、固定依赖与时钟）。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>避免未定义行为：不使用 native/反射黑盒/非确定性 API。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>资源约束：超时、内存上限与线程数上限。</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-1">安全与报告</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>行为异常即候选：崩溃、断言失败、差分不一致、编译器内部错误。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>审计：收集环境指纹（编译器/系统/标志位）与最小复现包。</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-sky-400 mt-0.5" /><span>限制副作用：隔离 I/O 与网络，避免写磁盘与外部依赖。</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 text-white/70 text-sm">
            排除项：涉及外部系统交互（网络、文件系统写入）、依赖时间/随机性的行为、使用非标准编译标志或未记录的内部 API 的场景不在目标范围内。
          </div>
        </section>
      )
    },
  ], [])

  const [active, setActive] = useState<string>(items[0]?.id || 'hpg')
  const mainRef = useRef<HTMLDivElement | null>(null)

  // 鼠标滚轮切换上下原理（轻节流，避免频繁触发）
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    let locked = false
    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY
      if (Math.abs(dy) < 30 || locked) return
      const idx = items.findIndex((i) => i.id === active)
      let next = idx
      if (dy > 0 && idx < items.length - 1) next = idx + 1
      else if (dy < 0 && idx > 0) next = idx - 1
      if (next !== idx) {
        e.preventDefault()
        locked = true
        setTimeout(() => { locked = false }, 500)
        setActive(items[next].id)
        try { el.scrollTo?.({ top: 0, behavior: 'smooth' }) } catch {}
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel as any)
  }, [active, items])
  const current = items.find(i => i.id === active) || items[0]

  return (
  <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start min-h-[85vh]">
      {/* 顶部轻量概览横幅（仅显示一次） */}
      <div className="md:col-span-2">
        <div className="px-1">
          <div className="inline-flex items-center gap-2">
            <span className="badge">原理概览</span>
            <span className="text-sm text-white/70">HPG 模型 · 结构保持变异 · 引导信号 · 差分一致性 · 安全边界</span>
          </div>
          <div className="mt-3 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
          {/* 删除“三步速览”应用户要求 */}
          {/* 术语速查（右侧按钮展开 + 可搜索） */}
          <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/80">术语速查</div>
              <button
                type="button"
                className={
                  'text-xs px-3 py-1 rounded-full border transition shadow-sm ' +
                  (glossaryVisible
                    ? 'bg-pink-500/20 border-pink-500/40 text-pink-200 shadow-pink-500/20 hover:bg-pink-500/25'
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:text-white')
                }
                aria-pressed={glossaryVisible}
                onClick={() => setGlossaryVisible(v => !v)}
              >
                {glossaryVisible ? '收起术语 ✨' : '查询术语 ✨'}
              </button>
            </div>
            {glossaryVisible && (
              <>
                <div className="mt-2">
                  <input
                    value={glossaryQuery}
                    onChange={(e) => setGlossaryQuery(e.target.value)}
                    placeholder="搜索术语/描述…"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-pink-400/40"
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  {filteredGlossary.length === 0 && (
                    <div className="text-xs text-white/50">没有匹配的术语</div>
                  )}
                  {filteredGlossary.map(g => (
                    <div key={g.key} className="max-w-[360px]">
                      <button
                        type="button"
                        className={
                          'px-2 py-1 rounded-full text-[13px] transition border ' +
                          (openGlossaryKey === g.key
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white')
                        }
                        aria-expanded={openGlossaryKey === g.key}
                        onClick={() => setOpenGlossaryKey(prev => (prev === g.key ? null : g.key))}
                      >
                        {g.term}
                      </button>
                      {openGlossaryKey === g.key && (
                        <div className="mt-1 text-xs text-white/75 bg-white/5 border border-white/10 rounded-lg p-2">
                          {g.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* 左侧竖向导航（更轻、更灵动） */}
      <aside className="md:sticky md:top-1/2 md:-translate-y-1/2 self-center">
        <div className="relative pl-3">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
          <nav className="flex md:flex-col gap-1">
            {items.map((it) => (
              <button
                key={it.id}
                className={
                  `relative text-left rounded-lg px-3 py-2 text-sm transition transform ` +
                  (active === it.id
                    ? 'text-white bg-white/10 hover:bg-white/15 before:absolute before:left-[-3px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:rounded-full before:bg-sky-500'
                    : 'text-white/80 hover:text-white hover:bg-white/5 hover:translate-x-0.5')
                }
                aria-current={active === it.id ? 'page' : undefined}
                onClick={() => setActive(it.id)}
              >
                <div className="flex items-center gap-2 font-medium leading-tight">
                  {/* icon */}
                  <span className="shrink-0 text-white/70">
                    {it.id === 'hpg' && <GitBranch size={16} />}
                    {it.id === 'mut' && <Wand2 size={16} />}
                    {it.id === 'guide' && <Gauge size={16} />}
                    {it.id === 'diff' && <GitCompare size={16} />}
                    {it.id === 'safety' && <ShieldCheck size={16} />}
                  </span>
                  <span>{it.title}</span>
                </div>
                <div className="text-[11px] text-white/60">{it.hint}</div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 右侧内容区（更高的可视占比） */}
      <main ref={mainRef} className="space-y-4 min-h-[80vh] pb-12 md:pt-8 grid place-items-center">
        {/* 切换内容，带入场动画 */}
        <div key={current.id} className="route-in w-full flex justify-center">
          <div className="w-full max-w-5xl">
            {current.render()}
          </div>
        </div>
      </main>
    </div>
  )
}
