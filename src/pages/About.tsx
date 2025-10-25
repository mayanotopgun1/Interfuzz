import { Users, Building2, Link as LinkIcon, Mail } from 'lucide-react'

type Member = {
  name: string
  role: string
  focus?: string[]
  email?: string
  homepage?: string
}

const TEAM: Member[] = [
  { name: '张三', role: '负责人 / PI', focus: ['编译优化', '程序分析'], email: 'replace@example.com' },
  { name: '李四', role: '博士研究生', focus: ['模糊测试', '图可视化'] },
  { name: '王五', role: '硕士研究生', focus: ['变异生成', '自动化实验'] },
  { name: '赵六', role: '本科研究助理', focus: ['数据处理'] },
]

export default function About() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center"><Building2 size={22} /></div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold">实验室介绍</h1>
            <p className="mt-2 text-white/70">
              我们聚焦于编译优化、程序分析与测试自动化，探索以高层程序图（HPG）建模复杂类间结构，
              结合针对性的变异策略，系统性挖掘优化编译器缺陷。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge">研究方向：编译优化 / 程序分析 / 模糊测试</span>
              <span className="badge">方法论：HPG 建模 / 引导式变异</span>
              <span className="badge">工具：React + D3</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-4">
        <div className="card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center"><Users size={22} /></div>
          <div>
            <h2 className="text-xl font-semibold">研究团队</h2>
            <p className="mt-1 text-white/70">欢迎感兴趣的同学与我们交流与合作（以下为示意信息，可替换为真实成员）。</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <div key={m.name} className="card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 grid place-items-center text-white/80">
                  {m.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-white/70">{m.role}</div>
                </div>
              </div>
              {m.focus && m.focus.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span key={f} className="badge">{f}</span>
                  ))}
                </div>
              )}
              {(m.homepage || m.email) && (
                <div className="mt-4 flex items-center gap-3 text-sm">
                  {m.homepage && (
                    <a href={m.homepage} className="btn-ghost" target="_blank" rel="noreferrer">
                      <LinkIcon size={14} /> 主页
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="btn-ghost">
                      <Mail size={14} /> 邮箱
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
