import { useMemo } from 'react'
import { detectedBugs, summarize, type BugRecord } from '../data/detected-bugs'
import { caseStudies } from '../data/case-studies'
import CaseStudyCard from '../components/CaseStudyCard'
import { TrendingUp, BarChart3, Award } from 'lucide-react'

export default function Effects() {
  const bugs = detectedBugs
  const stats = useMemo(() => summarize(bugs), [bugs])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-2">工具效果展示</h1>
        <p className="text-white/60 text-base">发现的编译器 Bug 与研究成果</p>
      </div>

      <div className="space-y-8">
        {/* Stats */}
        <section>
          <div className="grid md:grid-cols-3 gap-3">
            <StatCard label="已发现缺陷" value="24" />
            <StatCard label="已确认" value="20" />
            <StatCard label="已修复" value="6" />
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            <BarCard title="按编译器" data={stats.byCompiler as any} colors={{ HotSpot: '#60a5fa', ART: '#34d399', R8: '#fbbf24' }} />
            <BarCard title="按状态" data={stats.byStatus as any} colors={{ Fixed: '#34d399', Confirmed: '#60a5fa', Duplicate: '#a78bfa' }} />
            <BarCard title="按优先级" data={stats.byPriority as any} colors={{ P1: '#f87171', P2: '#fb923c', P3: '#fbbf24', P4: '#a3e635' }} order={['P4', 'P3', 'P2', 'P1']} />
          </div>
        </section>

      {/* Comparison with Baseline Tools */}
      <section className="card">
        <h3 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          {/* <TrendingUp className="text-emerald-400" size={22} /> */}
          与现有 Java 编译器测试工具对比
        </h3>

        {/* 核心结论 */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border-2 border-emerald-500/40 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Award size={24} className="text-emerald-300" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-emerald-300 mb-3">
                InterFuzz 是目前最有效的 Java 编译器测试工具
              </h4>
              <p className="text-base text-white leading-relaxed mb-3">
                在与 MopFuzzer、Artemis、Jetris 和 JITFuzz 等主流工具的对比实验中，
                <span className="font-semibold text-emerald-300">InterFuzz 在代码覆盖率和缺陷检测能力两方面均显著领先</span>。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 size={16} className="text-sky-400" />
                    <div className="font-semibold text-white">Java编译器代码覆盖率高</div>
                  </div>
                  <p className="text-base text-white/80 leading-relaxed">
                    在 HotSpot、ART 和 R8 三大编译器上均达到最高覆盖率（HotSpot: 43.2%，ART: 51.0%，R8: 55.2%），
                    特别是在注重类间结构分析的 ART 和 R8 上，覆盖率分别比最佳 baseline 高出 8.4% 和 14.0%。
                  </p>
                  <p className="text-base text-white/60 mt-2">
                    <strong className="text-white">原因：</strong>通过 HPG 建模和跨类结构变异，能够触达传统方法难以覆盖的编译器优化路径。
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-emerald-400" />
                    <div className="font-semibold text-white">跨类结构相关缺陷检测能力最强</div>
                  </div>
                  <p className="text-base text-white/80 leading-relaxed">
                    在对比实验中发现 7 个新缺陷，全部与复杂类间结构相关（HotSpot 2 个、ART 2 个、R8 3 个），
                    而其他工具检测到的缺陷均不涉及类间结构。
                  </p>
                  <p className="text-base text-white/60 mt-2">
                    <strong className="text-white">原因：</strong>传统工具缺乏对跨类关系的系统化建模，无法发现隐藏在类间交互中的编译器优化错误。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bugs Table */}
      <section className="card overflow-x-auto">
        <h3 className="text-3xl font-semibold mb-6">已发现的 Bug</h3>
        <table className="min-w-full text-base">
          <thead className="text-white/60">
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4">No.</th>
              <th className="text-left py-2 pr-4">Bug ID</th>
              <th className="text-left py-2 pr-4">编译器</th>
              <th className="text-left py-2 pr-4">症状</th>
              <th className="text-left py-2 pr-4">状态</th>
              <th className="text-left py-2 pr-4">Inter-Class</th>
              <th className="text-left py-2 pr-4">优先级</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((b) => (
              <tr key={b.no} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 pr-4">{b.no}</td>
                <td className="py-2 pr-4">
                  <a href={b.link} target="_blank" rel="noreferrer" className="text-accent hover:underline">{labelFor(b)}</a>
                </td>
                <td className="py-2 pr-4"><CompilerBadge compiler={b.compiler} /></td>
                <td className="py-2 pr-4">{b.symptom}</td>
                <td className="py-2 pr-4"><StatusBadge status={b.status} /></td>
                <td className="py-2 pr-4">{b.interClassRelated ? '✅' : '❌'}</td>
                <td className="py-2 pr-4"><PriorityBadge p={b.priority} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 案例详解 */}
      <section className="card">
        <h3 className="text-3xl font-semibold mb-6">案例详解</h3>
        {/* <p className="text-white/70 mb-6">以下展示两个典型的编译器 Bug 案例，包含详细的根因分析和完整的复现代码。</p> */}
        <div className="space-y-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-white/60 mt-1 text-sm">{label}</div>
    </div>
  )
}

function BarCard({ title, data, colors, order }: { title: string; data: Record<string, number>; colors: Record<string, string>; order?: string[] }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1
  const entries = order 
    ? order.map(k => [k, data[k] || 0] as [string, number]).filter(([_, v]) => v > 0)
    : Object.entries(data)
  return (
    <div className="card">
      <div className="text-sm text-white/80 mb-3">{title}</div>
      <div className="space-y-2">
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center gap-3">
            <div className="w-28 text-white/70 text-xs">{k}</div>
            <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
              <div className="h-full" style={{ width: `${(v / total) * 100}%`, background: colors[k] ?? '#60a5fa' }} />
            </div>
            <div className="w-8 text-right text-xs text-white/70">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompilerBadge({ compiler }: { compiler: BugRecord['compiler'] }) {
  const cls = compiler === 'HotSpot' ? 'bg-blue-600/20 text-blue-300'
    : compiler === 'ART' ? 'bg-emerald-600/20 text-emerald-300'
    : 'bg-amber-600/20 text-amber-300'
  return <span className={`px-2 py-0.5 rounded-full text-xs ${cls}`}>{compiler}</span>
}

function StatusBadge({ status }: { status: BugRecord['status'] }) {
  const map: Record<BugRecord['status'], string> = {
    Fixed: 'bg-emerald-600/20 text-emerald-300',
    Confirmed: 'bg-blue-600/20 text-blue-300',
    Duplicate: 'bg-violet-600/20 text-violet-300',
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>{status}</span>
}

function PriorityBadge({ p }: { p: BugRecord['priority'] }) {
  const map: Record<BugRecord['priority'], string> = {
    P1: 'bg-rose-600/20 text-rose-300',
    P2: 'bg-orange-600/20 text-orange-300',
    P3: 'bg-amber-600/20 text-amber-300',
    P4: 'bg-lime-600/20 text-lime-300',
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs ${map[p]}`}>{p}</span>
}

function labelFor(b: BugRecord) {
  if (b.compiler === 'HotSpot') return `JDK-${b.id}`
  return b.id
}
