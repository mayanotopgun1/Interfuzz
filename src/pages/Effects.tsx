import { useMemo } from 'react'
import { detectedBugs, summarize, type BugRecord } from '../data/detected-bugs'
import { caseStudies } from '../data/case-studies'
import CaseStudyCard from '../components/CaseStudyCard'
import { TrendingUp, BarChart3, Award } from 'lucide-react'

export default function Effects() {
  const bugs = detectedBugs
  const stats = useMemo(() => summarize(bugs), [bugs])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="card">
        <h2 className="text-2xl font-semibold mb-2">工具效果展示</h2>
        <p className="text-white/70">发现的编译器 Bug 与研究成果（可点击 Bug ID 跳转到外部链接）。</p>
      </section>

      {/* Stats */}
      <section>
        <div className="grid md:grid-cols-4 gap-3">
          <StatCard label="已发现 Bug" value={String(stats.total)} />
          <StatCard label="涉及编译器" value={String(Object.keys(stats.byCompiler).length)} />
          <StatCard label="已确认" value={String(stats.byStatus['Confirmed'] ?? 0)} />
          <StatCard label="已修复" value={String(stats.byStatus['Fixed'] ?? 0)} />
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <BarCard title="按编译器" data={stats.byCompiler as any} colors={{ HotSpot: '#60a5fa', ART: '#34d399', R8: '#fbbf24' }} />
          <BarCard title="按状态" data={stats.byStatus as any} colors={{ Fixed: '#34d399', Confirmed: '#60a5fa', Duplicate: '#a78bfa' }} />
          <BarCard title="按优先级" data={stats.byPriority as any} colors={{ P1: '#f87171', P2: '#fb923c', P3: '#fbbf24', P4: '#a3e635' }} />
        </div>
      </section>

      {/* Comparison with Baseline Tools */}
      <section className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-emerald-400" size={22} />
          与现有 Java 编译器测试工具对比
        </h3>
        <p className="text-white/70 mb-6 text-base">
          在相同实验条件下，我们将 InterFuzz 与 MopFuzzer、Artemis、Jetris 和 JITFuzz 等四个主流 Java 编译器测试工具进行了对比实验。
        </p>

        {/* Coverage Comparison */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <BarChart3 size={18} className="text-emerald-400" />
            代码覆盖率对比
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/30 p-4">
              <div className="text-sm text-white/70 mb-2">HotSpot</div>
              <div className="text-3xl font-bold text-sky-400 mb-2">43.2%</div>
              <div className="text-xs text-white/60">InterFuzz 覆盖率</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 p-4">
              <div className="text-sm text-white/70 mb-2">ART</div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">51.0%</div>
              <div className="text-xs text-emerald-300">InterFuzz 覆盖率 · 最高</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 p-4">
              <div className="text-sm text-white/70 mb-2">R8</div>
              <div className="text-3xl font-bold text-amber-400 mb-2">55.2%</div>
              <div className="text-xs text-amber-300">InterFuzz 覆盖率 · 最高</div>
              <div className="text-xs text-emerald-300 mt-1">比最佳baseline高9.7%</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-white/70">
            <p>在注重类间结构分析的 ART 和 R8 编译器上，InterFuzz 达到了最高覆盖率，分别较最佳baseline高出约 8.4% 和 14.0%。</p>
          </div>
        </div>

        {/* Bug Detection Comparison */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Award size={18} className="text-emerald-400" />
            漏洞检测能力对比
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 font-semibold text-white">编译器</th>
                  <th className="text-center py-3 px-4 font-semibold text-emerald-400">InterFuzz</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-300">MopFuzzer</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-300">Artemis</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-300">Jetris</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-300">JITFuzz</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold text-white">HotSpot</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">2 (2)</td>
                  <td className="py-3 px-4 text-center">3 (0)</td>
                  <td className="py-3 px-4 text-center">3 (0)</td>
                  <td className="py-3 px-4 text-center">2 (0)</td>
                  <td className="py-3 px-4 text-center">1 (0)</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold text-white">ART</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">2 (2)</td>
                  <td className="py-3 px-4 text-center">1 (0)</td>
                  <td className="py-3 px-4 text-center">0 (0)</td>
                  <td className="py-3 px-4 text-center">1 (0)</td>
                  <td className="py-3 px-4 text-center">0 (0)</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold text-white">R8</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">3 (3)</td>
                  <td className="py-3 px-4 text-center">0 (0)</td>
                  <td className="py-3 px-4 text-center">1 (0)</td>
                  <td className="py-3 px-4 text-center">0 (0)</td>
                  <td className="py-3 px-4 text-center">0 (0)</td>
                </tr>
                <tr className="bg-emerald-500/5 border-t-2 border-emerald-500/30">
                  <td className="py-3 px-4 font-bold text-white">总计</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">7 (7)</td>
                  <td className="py-3 px-4 text-center">4 (0)</td>
                  <td className="py-3 px-4 text-center">4 (0)</td>
                  <td className="py-3 px-4 text-center">3 (0)</td>
                  <td className="py-3 px-4 text-center">1 (0)</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3 text-xs text-white/50">
              注：括号内数字表示检测到的类间结构相关漏洞数量
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/30 p-6">
              <h5 className="font-bold text-lg text-emerald-300 mb-3 flex items-center gap-2">
                <Award size={22} className="text-emerald-400" />
                核心结论
              </h5>
              <p className="text-lg font-bold text-white leading-relaxed">
                <span className="text-emerald-400">InterFuzz 在类间结构缺陷检测方面明显优于现有的最新 Java 编译器测试工具。</span>
              </p>
              <p className="text-sm text-white/70 mt-3">
                InterFuzz 检测到的 7 个漏洞（HotSpot 2个、ART 2个、R8 3个）均与复杂类间结构相关，而其他工具检测到的漏洞均不涉及类间结构。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bugs Table */}
      <section className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3">已发现的 Bug</h3>
        <table className="min-w-full text-sm">
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
        <h3 className="text-lg font-semibold mb-3">案例详解</h3>
        <p className="text-white/70 mb-6">以下展示两个典型的编译器 Bug 案例，包含详细的根因分析和完整的复现代码。</p>
        <div className="space-y-6">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </section>
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

function BarCard({ title, data, colors }: { title: string; data: Record<string, number>; colors: Record<string, string> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1
  return (
    <div className="card">
      <div className="text-sm text-white/80 mb-3">{title}</div>
      <div className="space-y-2">
        {Object.entries(data).map(([k, v]) => (
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
