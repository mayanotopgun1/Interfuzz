import { Users, Building2, Link as LinkIcon, Mail } from "lucide-react";

type Member = {
  name: string;
  role: string;
  focus?: string[];
  email?: string;
  homepage?: string;
};

const TEAM: Member[] = [
  {
    name: "张三",
    role: "负责人 / PI",
    focus: ["编译优化", "程序分析"],
    email: "replace@example.com",
  },
  { name: "李四", role: "博士研究生", focus: ["模糊测试", "图可视化"] },
  { name: "王五", role: "硕士研究生", focus: ["变异生成", "自动化实验"] },
  { name: "赵六", role: "本科研究助理", focus: ["数据处理"] },
];

export default function About() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/90 border border-white/20 grid place-items-center shadow-lg overflow-hidden">
            <img 
              src="https://mingwen-cs.github.io/image/logo.png" 
              alt="ARTS3 Logo" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              ARTS3 研究组
            </h2>
            <p className="text-white/70">
              Advanced Research for Trustworthy and Secure Software Systems
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
            <p className="mt-4 text-white/90 leading-relaxed text-base">
              <strong className="text-white">ARTS3 研究组</strong>
              （Advanced Research for Trustworthy and Secure Software Systems）
              隶属于
              <strong className="text-sky-300">
                华中科技大学网络空间安全学院
              </strong>
              ， 由<strong className="text-white">文明 副教授</strong>指导。
              实验室专注于可信与安全软件系统的基础与应用研究，旨在探索构建高可靠、高安全性软件系统的新方法与新技术。
            </p>
            <p className="mt-3 text-white/80 leading-relaxed">
              研究方向涵盖<strong className="text-white">软件安全</strong>、
              <strong className="text-white">软件测试与分析</strong>、
              <strong className="text-white">代码大模型</strong>等领域，
              聚焦于模糊测试、静态与动态分析、软件供应链安全，以及智能化软件工程技术。
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500/10 to-sky-500/5 text-sky-300 text-sm border border-sky-500/30 hover:border-sky-500/50 transition-all font-medium">
                软件安全
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-500/5 text-purple-300 text-sm border border-purple-500/30 hover:border-purple-500/50 transition-all font-medium">
                软件测试与分析
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500/10 to-pink-500/5 text-pink-300 text-sm border border-pink-500/30 hover:border-pink-500/50 transition-all font-medium">
                代码大模型
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-300 text-sm border border-emerald-500/30 hover:border-emerald-500/50 transition-all font-medium">
                软件供应链安全
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 transition-all group">
                <div className="text-xs text-sky-400/70 font-mono mb-0.5">Institution</div>
                <div className="text-sm text-sky-300 font-medium group-hover:text-sky-200 transition-colors">
                  华中科技大学网络空间安全学院
                </div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all group">
                <div className="text-xs text-purple-400/70 font-mono mb-0.5">Research Group</div>
                <div className="text-sm text-purple-300 font-medium group-hover:text-purple-200 transition-colors">
                  ARTS3 Research Group
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-4">
        <div className="card flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 grid place-items-center shadow-lg">
            <Users size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">研究团队 · InterFuzz 小组</h2>
            <div className="mt-3 h-px bg-gradient-to-r from-emerald-500/30 via-white/20 to-transparent" />
            <p className="mt-3 text-white/85 leading-relaxed">
              <strong className="text-emerald-300">InterFuzz 研究小组</strong> 隶属于
              <strong className="text-white"> ARTS3 研究组</strong>， 聚焦于
              <strong className="text-white">编译器测试与程序分析</strong>
              领域的创新研究，
              致力于探索智能化、可扩展的软件测试技术，以推动可信软件系统与自动化验证的发展。
            </p>
            <p className="mt-3 text-white/75 leading-relaxed">
              团队的核心目标是构建面向复杂软件生态的高可靠测试与验证体系，
              在保持工程实用性的同时，深入研究编译优化、程序语义与安全分析之间的关联。
              InterFuzz
              小组注重跨层次、跨语言的系统性研究，希望通过自动化测试与智能分析技术，
              为编译器及软件系统的可信构建提供新的思路与方法。
            </p>
            <p className="mt-3 text-white/75 leading-relaxed">
              展望未来，团队将进一步拓展研究方向至
              <strong className="text-emerald-300">JIT/AOT编译器优化机制测试</strong>、
              <strong className="text-emerald-300">大模型辅助的编译器测试</strong>与
              <strong className="text-emerald-300">LLVM编译器优化机制测试</strong>
              等前沿领域。 同时，InterFuzz
              计划构建开放、协同的研究平台，促进自动化测试工具、编译器安全与人工智能辅助软件工程的深度融合。
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "邱士煜",
              role: "队长 · 2025级博士生",
              focus: ["Java 编译器测试", "程序分析", "自动化测试框架"],
              homepage: "",
              email: "",
            },
            {
              name: "赖昕",
              role: "队员 · 2025级硕士生",
              focus: ["编译器测试", "测试用例生成", "语义变异与差分分析"],
              homepage: "",
              email: "",
            },
            {
              name: "吴若仪",
              role: "队员 · 2023级本科生",
              focus: ["可视化展示", "数据可视化", "交互式系统设计"],
              homepage: "",
              email: "",
            },
          ].map((m) => (
            <div key={m.name} className="card hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-2 border-white/20 grid place-items-center text-white text-xl font-semibold group-hover:border-white/40 group-hover:shadow-lg transition-all duration-300">
                  {m.name.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {m.name}
                  </div>
                  <div className="text-sm text-white/70 mt-0.5">{m.role}</div>
                </div>
              </div>
              {m.focus && m.focus.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
              {(m.homepage || m.email) && (
                <div className="mt-4 flex items-center gap-3 text-sm">
                  {m.homepage && (
                    <a
                      href={m.homepage}
                      className="btn-ghost"
                      target="_blank"
                      rel="noreferrer"
                    >
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
  );
}
