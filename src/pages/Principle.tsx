import { useMemo, useState, useRef, useEffect } from 'react'
import ThemedImage from '../components/ThemedImage'
import { BookOpen, AlertTriangle, Layers, Wand2, Gauge, BarChart3, CheckCircle2 } from 'lucide-react'

type PrincipleItem = {
  id: string
  title: string
  hint: string
  render: () => JSX.Element
}

export default function Principle() {
  const glossary = useMemo(() => ([
    { key: 'jit', term: 'JIT', desc: 'Just-In-Time 即时编译器：运行时动态优化热点代码，如 HotSpot。' },
    { key: 'aot', term: 'AOT', desc: 'Ahead-Of-Time 提前编译器：构建阶段静态分析优化，如 R8。' },
    { key: 'hpg', term: 'HPG', desc: 'Heterogeneous Program Graph：异构程序图，统一表达跨类结构的图模型。' },
    { key: 'interclass', term: '类间结构', desc: '类之间的关系：继承、接口实现、嵌套、泛型约束、引用等。' },
    { key: 'mutator', term: '变异算子', desc: '在图上执行原子操作（添加节点/边、修改属性）以生成新测试用例。' },
    { key: 'complexity', term: '图复杂度', desc: '基于节点度数、边类型多样性、层级深度等指标评估程序结构复杂度。' },
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
      id: 'background',
      title: '背景与动机',
      hint: 'Java 编译器 · 优化挑战',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">背景与动机</h2>
            {/* <span className="badge">ICSE 2026</span> */}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/10 p-4">
              <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                <BookOpen size={18} className="text-sky-400" />
                <span>Java 与跨平台兼容性</span>
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                Java 是一种被广泛采用的编程语言，以其"<strong className="text-sky-300">跨平台兼容性</strong>"著称。
                Java 程序被编译成 <strong className="text-white">字节码（bytecode）</strong>，由 
                <strong className="text-white"> Java 虚拟机（JVM）</strong> 执行。
                为了提升运行效率和性能，现代 JVM 通常集成了多种<strong className="text-white">优化编译器</strong>，
                包括 <strong className="text-purple-300">即时编译器（JIT）</strong> 和 
                <strong className="text-purple-300">提前编译器（AOT）</strong>。
              </p>
              <div className="text-xs text-white/60 bg-white/5 rounded-lg p-2 border-l-2 border-sky-500/50">
                💡 这些优化编译器在保持程序语义不变的前提下，对代码进行转换与优化
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/5 border border-sky-500/20 p-3 hover:border-sky-500/40 transition-all">
                <div className="text-sm font-semibold text-sky-400 mb-2 flex items-center gap-1">
                  <span>⚡</span>
                  <span>JIT 编译器</span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  如 <strong className="text-white">HotSpot</strong>，在程序运行过程中动态地对"热点代码"进行优化
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-purple-500/20 p-3 hover:border-purple-500/40 transition-all">
                <div className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-1">
                  <span>🎯</span>
                  <span>AOT 编译器</span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  如 <strong className="text-white">R8</strong>，在构建阶段执行静态分析和优化，减少应用体积、混淆代码并增强安全性
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-pink-500/20 p-3 hover:border-pink-500/40 transition-all">
                <div className="text-sm font-semibold text-pink-400 mb-2 flex items-center gap-1">
                  <span>🔄</span>
                  <span>混合策略</span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  如 <strong className="text-white">ART</strong>，在安装时使用 AOT 编译，在运行时结合 JIT 优化
                </p>
              </div>
            </div>

            <div className="border-l-4 border-sky-500/50 pl-4 py-3 bg-sky-500/5 rounded-r-lg">
              <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
                <Layers size={18} className="text-sky-400" />
                <span>类间结构（Inter-Class Structures）</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                面向对象编程通过"对象"来封装状态与行为。在 Java 中，类不仅描述了单个对象的属性与方法，
                还通过多种机制来组织和协调对象之间的交互——我们称之为<strong className="text-white">类间结构</strong>。
                这些机制实现了代码复用、抽象和多态等核心特性。
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 font-mono">Inheritance 继承</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 font-mono">Interface Implementation 接口实现</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 font-mono">Nesting 嵌套</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 font-mono">Generic Bounds 泛型</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 font-mono">Reference 引用</span>
              </div>
              <div className="rounded-xl overflow-hidden border-2 border-white/20 p-2 hover:border-white/40 transition-all duration-300 shadow-lg themed-surface">
                <ThemedImage
                  lightSrc="/5-inter-class-structures-light.png"
                  darkSrc="/5-inter-class-structures-dark.png"
                  alt="五种类间结构示例"
                  className="w-full object-contain rounded-lg"
                  style={{ maxWidth: '70%', margin: '0 auto', display: 'block' }}
                />
                <div className="mt-2 text-center text-xs font-medium caption-surface py-1 rounded">
                  图1: InterFuzz 关注的五种核心类间结构
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4">
              <h3 className="font-semibold mb-3 text-amber-300 flex items-center gap-2">
                <span>🔍</span>
                <span>真实案例：HotSpot JIT 优化错误</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                以下示例展示了复杂类间结构对编译器优化的影响。程序包含两个类 
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C1</code> 与 
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C2</code>，
                它们之间通过<strong className="text-white">静态字段和初始化块</strong>发生交互。
              </p>
              <div className="rounded-xl overflow-hidden border-2 border-amber-500/40 p-3 hover:border-amber-500/60 transition-all duration-300 shadow-lg themed-surface">
                <ThemedImage
                  lightSrc="/motivating-example-light.png"
                  darkSrc="/motivating-example-dark.jpg"
                  alt="HotSpot JIT 优化错误示例"
                  className="w-full object-contain rounded-lg"
                  style={{ maxWidth: '70%', margin: '0 auto', display: 'block' }}
                />
                <div className="mt-2 text-center text-xs font-medium bg-amber-500/10 text-amber-300 py-1 rounded">
                  图2: 复杂类间交互导致的编译器优化错误
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-amber-400 shrink-0">①</span>
                  <p className="text-white/75 leading-relaxed">
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C1</code> 
                    在构造函数中创建 <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C2</code> 的实例（第 3 行）
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-amber-400 shrink-0">②</span>
                  <p className="text-white/75 leading-relaxed">
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C2</code> 
                    的静态初始化块（第 6 行）会在构造过程中修改 
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-mono">C1.str</code>
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-rose-400 shrink-0">⚠️</span>
                  <p className="text-white/75 leading-relaxed">
                    <strong className="text-rose-300">优化错误</strong>：HotSpot 的 JIT 优化器错误地假设 
                    <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono">str</code> 
                    在构造函数执行时仍为 <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono">null</code>，
                    从而生成了语义错误的优化代码
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4">
              <h3 className="font-semibold mb-2 text-rose-300 flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>关键发现</span>
              </h3>
              <div className="space-y-3">
                <p className="text-white/80 text-sm leading-relaxed">
                  该示例揭示出一个关键问题：<strong className="text-white">编译器在处理跨类的依赖关系和执行顺序时，
                  若分析模型不足以捕捉复杂的类间交互，就极易引发错误优化</strong>。
                </p>
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-4">
                  <div className="text-center mb-2">
                    <span className="text-4xl font-bold text-rose-200">76.4%</span>
                  </div>
                  <p className="text-white/90 text-sm text-center leading-relaxed">
                    通过对历史缺陷的统计分析发现，在 R8 编译器的缺陷案例中，有 <strong className="text-rose-200">76.4% 的错误</strong> 
                    仅能在具有复杂类间结构的测试程序中被触发。
                  </p>
                </div>
                <p className="text-white/90 font-medium text-sm bg-gradient-to-r from-rose-500/20 to-transparent p-3 rounded-lg">
                  💡 这表明：验证 Java 优化编译器在复杂类间结构下的正确性，<strong className="text-white">不仅重要，而且迫切</strong>。
                </p>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'challenges',
      title: '现有方法的局限',
      hint: '生成 · 变异 · 搜索',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">现有模糊测试方法的局限</h2>
            {/* <span className="badge">挑战</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                当前的 Java 编译器模糊测试主要分为<strong className="text-white">生成式（generation-based）</strong>
                和<strong className="text-white">变异式（mutation-based）</strong>两类方法。
                但这两类方法大多聚焦于<strong className="text-sky-300">类内（intra-class）</strong>或
                <strong className="text-sky-300">方法内（intra-method）</strong>的结构，
                难以生成拥有复杂类间关系的多类程序。
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 p-3">
                  <div className="text-sm font-semibold text-sky-400 mb-2">生成式方法</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-2">
                    主要测试单类结构或特定的 JVM 优化场景
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">JITFuzz (ICSE'23)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">MopFuzzer (ASPLOS'24)</span>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-3">
                  <div className="text-sm font-semibold text-purple-400 mb-2">变异式方法</div>
                  <p className="text-xs text-white/70 leading-relaxed mb-2">
                    只针对单个方法片段进行模糊测试
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70">Jetris (CCS'24)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-amber-500/50 pl-4 py-2 bg-amber-500/5 rounded-r-lg">
              <h3 className="font-semibold mb-2 text-amber-300">核心瓶颈</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">当前模糊测试无法系统性地生成具有复杂类间结构的测试样例</strong>，
                这成为揭露编译器优化错误的主要障碍。
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-3 text-white">生成复杂类间结构的三大挑战</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-rose-400 shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold text-rose-300 mb-1.5">结构建模困难</h4>
                      <p className="text-sm text-white/75 leading-relaxed">
                        类之间的关系多种多样，涉及实例化、方法调用、字段访问等多种语法形式。
                        现有方法往往只能捕捉局部类内逻辑，<strong className="text-white">无法全面描述类之间的复杂依赖</strong>。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-amber-400 shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-1.5">程序生成复杂</h4>
                      <p className="text-sm text-white/75 leading-relaxed">
                        在构造和修改这些结构时，需要同时满足语法与语义约束。
                        稍有不慎就可能<strong className="text-white">生成无效或不可编译的测试程序</strong>。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-sky-500/10 to-transparent border border-sky-500/20 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-sky-400 shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold text-sky-300 mb-1.5">搜索空间爆炸</h4>
                      <p className="text-sm text-white/75 leading-relaxed">
                        引入类间结构后，程序的语法组合会急剧增多。
                        即便是细微的代码修改，也可能显著改变程序语义，
                        <strong className="text-white">导致模糊测试效率急剧下降</strong>。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'overview',
      title: 'InterFuzz 方法概览',
      hint: 'HPG · 变异 · 引导',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">我们的方法：InterFuzz</h2>
            {/* <span className="badge">方案</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4">
              <p className="text-white/90 text-sm leading-relaxed mb-3">
                为了解决<strong className="text-white">结构建模困难（挑战1）</strong>、
                <strong className="text-white">程序生成复杂（挑战2）</strong>、
                <strong className="text-white">搜索空间爆炸（挑战3）</strong>等三大挑战，
                本文提出了一种新型 Java 编译器模糊测试框架——
                <strong className="text-white">InterFuzz</strong>。
              {/* </p> */}
              {/* <div className="bg-white/5 rounded-lg p-3 border-l-4 border-purple-500/50"> */}
                {/* <p className="text-white/80 text-sm"> */}
                  <strong className="text-white">InterFuzz</strong> 通过引入 
                  <strong className="text-white">异构程序图（HPG）</strong> 作为核心抽象，
                  并结合 <strong className="text-white">跨类结构变异算子</strong> 与 
                  <strong className="text-white">图复杂度度量</strong> 三个关键组件，
                  实现了系统化的复杂类间结构生成与优化编译器验证。
                </p>
              {/* </div> */}
            </div>

            <div className="rounded-xl overflow-hidden border-2 border-purple-500/30 p-3 hover:border-purple-500/50 transition-all duration-300 shadow-lg themed-surface">
              <ThemedImage
                lightSrc="/overview-light.png"
                darkSrc="/overview-dark.png"
                alt="InterFuzz 方法概览"
                className="w-full object-contain rounded-lg"
                style={{ maxWidth: '70%', margin: '0 auto', display: 'block' }}
              />
              <div className="text-xs text-purple-300 text-center mt-3 font-medium bg-purple-500/10 py-1 rounded">
                图3: InterFuzz 整体架构 — HPG 建模 → 跨类变异 → 复杂度引导
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 p-4 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 cursor-default">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 grid place-items-center shrink-0">
                    <Layers size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sky-300 mb-1">异构程序图（HPG）</h3>
                    <div className="text-[10px] text-gray-700 font-medium">Heterogeneous Program Graph</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">→</span>
                    <p className="text-xs text-white/70 leading-relaxed">
                      <strong className="text-white">应对挑战1·结构建模困难</strong>：
                      将多样的类间结构语法实现抽象为图中不同的边类型
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">✓</span>
                    <p className="text-xs text-white/60 leading-relaxed">
                      统一而简洁的表示方法，支持对各种类间结构进行统一分析与操作
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-4 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 grid place-items-center shrink-0">
                    <Wand2 size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-300 mb-1">跨类结构变异算子</h3>
                    <div className="text-[10px] text-gray-700 font-medium">Inter-Class Mutators</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">→</span>
                    <p className="text-xs text-white/70 leading-relaxed">
                      <strong className="text-white">应对挑战2·程序生成复杂</strong>：
                      通过操作HPG在种子程序中生成复杂类间结构
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">✓</span>
                    <p className="text-xs text-white/60 leading-relaxed">
                      将困难的类间结构变异转化为可控的高层图操作过程
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 p-4 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 cursor-default">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 grid place-items-center shrink-0">
                    <Gauge size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-300 mb-1">图复杂度度量</h3>
                    <div className="text-[10px] text-gray-700 font-medium">Graph Complexity Metric</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">→</span>
                    <p className="text-xs text-white/70 leading-relaxed">
                      <strong className="text-white">应对挑战3·搜索空间爆炸</strong>：
                      捕获结构类型多样性与总数量两个关键维度
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-white/40 text-xs shrink-0 mt-0.5">✓</span>
                    <p className="text-xs text-white/60 leading-relaxed">
                      引导模糊测试优先选择提升HPG复杂度的变异算子，高效生成易触发缺陷的测试用例
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500/50 pl-4 py-2 bg-purple-500/5 rounded-r-lg">
              <p className="text-white/80 text-sm leading-relaxed">
                💡 InterFuzz 通过这三个核心组件的协同工作，实现了系统化的复杂类间结构生成与优化编译器验证。
              </p>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'hpg',
      title: 'HPG（异构程序图）',
      hint: '统一抽象 · 结构化表示',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">异构程序图（HPG）</h2>
            {/* <span className="badge">核心 1</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/10 p-4">
              <p className="text-white/90 leading-relaxed">
                为了统一表示 Java 程序中多样的类间结构（如继承、接口实现、嵌套、泛型约束与引用等），
                我们提出了<strong className="text-white">异构程序图（Heterogeneous Program Graph, HPG）</strong>。
              </p>
              <p className="text-white/75 text-sm mt-2 leading-relaxed">
                该模型将程序抽象为一个多类型有向图，使复杂的类间依赖关系能够以结构化形式进行分析与操作。
                通过这种表示，我们可以将抽象的"结构复杂性"问题转化为可量化的图结构问题。
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                <span className="text-sky-400">∑</span>
                <span>形式化定义</span>
              </h3>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-white/90 overflow-x-auto mb-3">
                <div className="mb-3 text-base">HPG(𝒫) = (V<sub>𝒫</sub>, 𝒯, E<sub>𝒫</sub>, ℰ)</div>
                <div className="text-xs text-white/70 space-y-1.5 pl-4 border-l-2 border-sky-500/30">
                  <div>• <strong>V<sub>𝒫</sub></strong>: 节点集合，表示程序中的类间实体（inter-class entities）</div>
                  <div>• <strong>E<sub>𝒫</sub></strong>: 有向边集合，表示实体间的类间结构（inter-class structures）</div>
                  <div>• <strong>𝒯</strong>: 节点类型集合</div>
                  <div>• <strong>ℰ</strong>: 边类型集合</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-lg bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 p-3">
                  <h4 className="font-semibold mb-2 text-sky-400 flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    <span>节点类型 𝒯</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">Class</span>
                      <span className="text-white/70">类</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">Intf</span>
                      <span className="text-white/70">接口</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">Mtd</span>
                      <span className="text-white/70">方法</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">Fld</span>
                      <span className="text-white/70">字段</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-3 leading-relaxed">
                    每个节点 v=(t,n)，其中 t∈𝒯 为类型，n 为属性（名称、修饰符等）
                  </p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-3">
                  <h4 className="font-semibold mb-2 text-purple-400 flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    <span>边类型 ℰ</span>
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300">→</span>
                      <span className="text-white/80">Inheritance（继承）</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300">→</span>
                      <span className="text-white/80">Interface Implementation（接口实现）</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300">→</span>
                      <span className="text-white/80">Nesting（嵌套）</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300">→</span>
                      <span className="text-white/80">Generic Bounds（泛型边界）</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-300">→</span>
                      <span className="text-white/80">Reference（引用）</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-3 leading-relaxed">
                    每条边 e=(v<sub>s</sub>,v<sub>t</sub>,r,n)，描述类间依赖的语义特征
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4">
              <h3 className="font-semibold mb-3 text-amber-300">HPG 示例</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                下图展示了前面示例程序的 HPG 表示。从 <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300">C0.main</code> 到 
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300">C1</code> 与 
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300">C2</code> 
                的 <strong className="text-white">Reference</strong> 边表示对象创建，
                而 <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-300">I2 → I1</code> 的 
                <strong className="text-white">Inheritance</strong> 边表示接口继承。
              </p>
              <div className="rounded-xl overflow-hidden border-2 border-amber-500/40 p-3 hover:border-amber-500/60 transition-all duration-300 shadow-lg themed-surface">
                <ThemedImage
                  lightSrc="/motivating-example-with-hpg-light.png"
                  darkSrc="/motivating-example-with-hpg-dark.png"
                  alt="HPG 示例：Motivating Example"
                  className="w-full rounded-lg object-contain"
                  style={{ maxWidth: '100%', margin: '0 auto', display: 'block' }}
                />
                <div className="text-xs text-amber-300 text-center mt-3 font-medium bg-amber-500/10 py-1 rounded">
                  图4: 程序的 HPG 表示 — 节点表示实体，边表示类间关系
                </div>
              </div>
            </div>

            <div className="border-l-4 border-sky-500/50 pl-4 py-3 bg-sky-500/5 rounded-r-lg">
              <h3 className="font-semibold mb-2 text-sky-300">核心优势</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 shrink-0">✓</span>
                  <span>将抽象的"结构复杂性"转化为可量化的图结构问题</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 shrink-0">✓</span>
                  <span>统一承载"生成→变异→验证"的全流程信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 shrink-0">✓</span>
                  <span>支持精确的结构分析与操作，为后续测试引导提供基础</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'mut',
      title: '跨类结构变异算子',
      hint: '图级原子操作',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">跨类结构变异算子（Inter-Class Mutators）</h2>
            {/* <span className="badge">核心 2</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4">
              <p className="text-white/90 leading-relaxed">
                为了生成包含复杂类间结构的测试程序，InterFuzz 设计了一组
                <strong className="text-white">跨类结构变异算子（Inter-Class Mutators）</strong>。
                基于 HPG，这些算子通过在图上操作节点和边来修改程序结构，
                从而将代码级的复杂修改转化为可控的图操作。
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <h3 className="font-semibold mb-3 text-white">设计原则</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-lg bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 p-3">
                  <h4 className="font-medium text-sky-400 mb-2 flex items-center gap-2">
                    <Wand2 size={16} />
                    <span>模块化与原子性</span>
                  </h4>
                  <p className="text-sm text-white/75 leading-relaxed">
                    每个算子只执行<strong className="text-white">一个原子操作</strong>，
                    避免相互干扰，并可通过组合实现更复杂的类间关系
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-3">
                  <h4 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>不变量守护</span>
                  </h4>
                  <p className="text-sm text-white/75 leading-relaxed">
                    保持语义不变，确保变异后仍然
                    <strong className="text-white">"可编译、可运行、可对比"</strong>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">算子类型</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="font-medium text-sky-400 mb-3">节点添加（Node Addition）</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Class Node - 新增类节点</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Interface Node - 新增接口节点</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Method Node - 新增方法节点</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-sky-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Field Node - 新增字段节点</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="font-medium text-purple-400 mb-3">边添加（Edge Addition）</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Inheritance Edge - 添加继承关系</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Interface Impl Edge - 添加接口实现</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Nesting Edge - 添加嵌套关系</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">Add Reference Edge - 添加引用关系</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
              <h3 className="font-semibold mb-3 text-emerald-300 flex items-center gap-2">
                <Wand2 size={18} />
                <span>算子操作示例</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                下图展示了三个代表性变异算子的操作示意。通过在 HPG 图层面进行精细控制，
                InterFuzz 能系统地生成具有多样类间关系的测试用例。
                每个变异算子对应一种原子操作，保证生成的程序在语法和语义上都是正确的。
              </p>
              
              <div className="rounded-xl overflow-hidden border-2 border-emerald-500/40 p-3 hover:border-emerald-500/60 transition-all duration-300 shadow-lg themed-surface mb-4">
                <ThemedImage
                  lightSrc="/inter-class-mutators-light.png"
                  darkSrc="/inter-class-mutators-dark.jpg"
                  alt="跨类结构变异算子操作示例"
                  className="w-full rounded-lg object-contain"
                  style={{ maxWidth: '70%', margin: '0 auto', display: 'block' }}
                />
                <div className="text-xs text-emerald-300 text-center mt-3 font-medium bg-emerald-500/10 py-1 rounded">
                  图5: 三个代表性变异算子的操作示意
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/30 p-3 hover:border-sky-500/50 transition-all">
                  <div className="font-semibold text-sky-300 text-sm mb-2">添加/移除接口实现</div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    在类与接口之间添加或移除实现关系（implements），改变类的类型层级结构，
                    使类获得或失去特定接口的行为契约
                  </div>
                </div>
                
                <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 p-3 hover:border-purple-500/50 transition-all">
                  <div className="font-semibold text-purple-300 text-sm mb-2">添加/移除嵌套类</div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    在类内部添加或移除嵌套类（inner class），增加类间的包含关系复杂度，
                    创建更紧密的类间耦合和作用域依赖
                  </div>
                </div>
                
                <div className="rounded-lg bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 p-3 hover:border-pink-500/50 transition-all">
                  <div className="font-semibold text-pink-300 text-sm mb-2">添加引用关系</div>
                  <div className="text-xs text-white/70 leading-relaxed">
                    在类之间添加引用关系（通过字段、方法参数或返回值），
                    使类之间产生新的数据流依赖和对象创建链
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500/50 pl-4 py-3 bg-purple-500/5 rounded-r-lg">
              <h3 className="font-semibold mb-2 text-purple-300">覆盖范围</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                InterFuzz 共针对 HPG 中的<strong className="text-white">五类结构</strong>
                （继承、接口实现、嵌套、泛型约束、引用）和
                <strong className="text-white">四类实体</strong>
                （类、接口、方法、字段）设计了对应算子，实现了全面的结构覆盖。
              </p>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'guide',
      title: '图复杂度引导',
      hint: '多样性优先 · 有效搜索',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">图复杂度引导（Graph Complexity Guidance）</h2>
            {/* <span className="badge">核心 3</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 p-4">
              <p className="text-white/90 leading-relaxed">
                为在变异过程中优先生成"更可能触发优化缺陷"的测试样例，InterFuzz 引入
                <strong className="text-white">图复杂度引导（Graph Complexity Guidance）</strong>。
              </p>
              <p className="text-white/75 text-sm mt-2 leading-relaxed">
                核心直觉：<strong className="text-white">越复杂的类间结构，越容易覆盖到编译器更深层的优化路径与边界条件</strong>。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-white">"复杂"的两层含义</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎨</span>
                    <h4 className="font-semibold text-sky-300">种类的复杂</h4>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed mb-2">
                    <strong className="text-white">关系多样性</strong>：
                    同一实体若同时参与多种类间关系（如继承、接口实现、嵌套、泛型约束、引用），
                    编译器需要在多种分析假设下综合处理。
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    多样性越高，潜在行为分支越多，触发缺陷的机会越大。
                  </p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="font-semibold text-purple-300">数量的复杂</h4>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed mb-2">
                    <strong className="text-white">关系规模</strong>：
                    实体连接的关系越多（被更多方法调用、持有/访问更多字段、与更多类型建立层级关系），
                    其在程序中的"交汇度"越高。
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed">
                    小的修改就可能在更广的范围内产生连锁效应，放大编译器优化假设的偏差。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                <Gauge size={18} className="text-pink-400" />
                <span>引导策略</span>
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                InterFuzz 在每次应用变异算子后，评估图中各实体
                <strong className="text-white">参与关系的种类</strong>与
                <strong className="text-white">数量</strong>是否得到提升：
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xl shrink-0">✅</span>
                  <div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      若某次变异<strong className="text-emerald-300">同时提升了多样性与规模</strong>
                      （比如为同一类新增一种不同类型的跨类关系，并引入新的连接），
                      该变异将被<strong className="text-white">"奖励"</strong>，未来被选择的概率更高。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-xl shrink-0">⚠️</span>
                  <div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      若只带来<strong className="text-amber-300">机械性的膨胀</strong>
                      （仅重复同一关系类型，缺乏新语义连接），则不被偏好，避免无效增大。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-pink-500/50 pl-4 py-3 bg-pink-500/5 rounded-r-lg">
              <h3 className="font-semibold mb-2 text-pink-300">引导原则</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                基于"<strong className="text-white">先多样、后做大；既多样，又做大</strong>"的引导策略，
                使变异过程持续朝着<strong className="text-white">更丰富、更多交互、更易触发优化边界</strong>的程序形态演化，
                而非单纯增加节点或边的数量。
              </p>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'results',
      title: '实验结果与发现',
      hint: '高效 · 覆盖广',
      render: () => (
        <section className="card route-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold mb-2">实验结果与发现</h2>
            {/* <span className="badge">成果</span> */}
          </div>
          
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
              <p className="text-white/90 leading-relaxed">
                我们对 InterFuzz 进行了系统评估，结果显示其在发现编译器优化缺陷方面
                <strong className="text-emerald-300">显著优于现有方法</strong>。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-emerald-300 mb-2 bg-gradient-to-br from-emerald-300 to-emerald-500 bg-clip-text text-transparent">24</div>
                <div className="text-sm text-white/90 font-medium mb-1">新发现的缺陷</div>
                <div className="text-xs text-white/60">覆盖 HotSpot、ART、R8</div>
                <div className="mt-2 pt-2 border-t border-emerald-500/20">
                  <span className="text-xs text-emerald-400">三大主流编译器</span>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/30 p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-sky-300 mb-2 bg-gradient-to-br from-sky-300 to-sky-500 bg-clip-text text-transparent">20</div>
                <div className="text-sm text-white/90 font-medium mb-1">官方确认的缺陷</div>
                <div className="text-xs text-white/60">83.3% 确认率</div>
                <div className="mt-2 pt-2 border-t border-sky-500/20">
                  <span className="text-xs text-sky-400">高可信度</span>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 p-4 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-purple-300 mb-2 bg-gradient-to-br from-purple-300 to-purple-500 bg-clip-text text-transparent">16</div>
                <div className="text-sm text-white/90 font-medium mb-1">类间结构相关缺陷</div>
                <div className="text-xs text-white/60">传统方法难以触及</div>
                <div className="mt-2 pt-2 border-t border-purple-500/20">
                  <span className="text-xs text-purple-400">核心贡献</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-sky-400" />
                <span>主要发现</span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      在 24 小时的实验中，InterFuzz 不仅发现的缺陷更多，
                      还在<strong className="text-white">代码覆盖率</strong>方面显著领先于现有工具
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      消融实验表明，基于<strong className="text-white">图复杂度的引导机制</strong>，
                      是 InterFuzz 高效发现复杂优化错误的关键
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      <strong className="text-white">16 个缺陷被证实与复杂类间结构直接相关</strong>，
                      证明了 HPG + 图驱动变异的有效性
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-emerald-500/50 pl-4 py-3 bg-emerald-500/5 rounded-r-lg">
              <p className="text-white/90 text-sm leading-relaxed">
                💡 实验结果充分验证了 InterFuzz 的核心思想：
                <strong className="text-white">通过系统化建模和引导式变异复杂类间结构，
                能够有效揭露传统方法难以触及的编译器优化缺陷</strong>。
              </p>
            </div>
          </div>
        </section>
      )
    }
  ], [])

  const [active, setActive] = useState<string>(items[0]?.id || 'background')
  const mainRef = useRef<HTMLDivElement | null>(null)

  // 禁用鼠标滚轮切换页面功能
  // useEffect(() => {
  //   const el = mainRef.current
  //   if (!el) return
  //   let locked = false
  //   const onWheel = (e: WheelEvent) => {
  //     const dy = e.deltaY
  //     if (Math.abs(dy) < 30 || locked) return
  //     const idx = items.findIndex((i) => i.id === active)
  //     let next = idx
  //     if (dy > 0 && idx < items.length - 1) next = idx + 1
  //     else if (dy < 0 && idx > 0) next = idx - 1
  //     if (next !== idx) {
  //       e.preventDefault()
  //       locked = true
  //       setTimeout(() => { locked = false }, 500)
  //       setActive(items[next].id)
  //       try { el.scrollTo?.({ top: 0, behavior: 'smooth' }) } catch {}
  //     }
  //   }
  //   el.addEventListener('wheel', onWheel, { passive: false })
  //   return () => el.removeEventListener('wheel', onWheel as any)
  // }, [active, items])
  const current = items.find(i => i.id === active) || items[0]

  return (
  <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start min-h-[85vh]">
      {/* 左侧竖向导航（更轻、更灵动） */}
  <aside className="md:sticky md:top-24 self-start">
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
                    {it.id === 'background' && <BookOpen size={16} />}
                    {it.id === 'challenges' && <AlertTriangle size={16} />}
                    {it.id === 'overview' && <Layers size={16} />}
                    {it.id === 'hpg' && <Layers size={16} />}
                    {it.id === 'mut' && <Wand2 size={16} />}
                    {it.id === 'guide' && <Gauge size={16} />}
                    {it.id === 'results' && <BarChart3 size={16} />}
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
      <main ref={mainRef} className="space-y-4 min-h-[80vh] pb-12">
        {/* 切换内容，带入场动画 */}
        <div key={current.id} className="route-in w-full">
          <div className="w-full max-w-5xl">
            {current.render()}
          </div>
        </div>
      </main>
    </div>
  )
}
