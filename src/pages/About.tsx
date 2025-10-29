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
      {/* Team Members */}
      <section className="card">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 grid place-items-center shadow-lg">
            <Users size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-4">研究团队</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "文明",
              role: "指导老师 · 副教授",
              photo: "/members/wenming.jpg",
              focus: ["软件安全", "编译器测试", "程序分析"],
              homepage: "",
              email: "",
            },
            {
              name: "邱士煜",
              role: "队长 · 2025级博士生",
              photo: "/members/qiushiyu.jpg",
              focus: ["Java 编译器测试", "程序分析", "自动化测试框架"],
              homepage: "",
              email: "",
            },
            {
              name: "赖昕",
              role: "队员 · 2025级硕士生",
              photo: "/members/laixin.jpg",
              focus: ["编译器测试", "测试用例生成", "语义变异与差分分析"],
              homepage: "",
              email: "",
            },
            {
              name: "吴若仪",
              role: "队员 · 2023级本科生",
              photo: "/members/wuruoyi.jpg",
              focus: ["可视化展示", "数据可视化", "交互式系统设计"],
              homepage: "",
              email: "",
            },
          ].map((m) => (
            <div key={m.name} className="card hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-white/40 group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {m.photo ? (
                    <img 
                      src={m.photo} 
                      alt={m.name}
                      className={`w-full h-full object-cover ${m.name === "邱士煜" ? "object-[center_top]" : ""}`}
                      style={m.name === "邱士煜" ? { objectPosition: "center 35%" } : undefined}
                      onError={(e) => {
                        // 如果图片加载失败，显示初始字母
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 grid place-items-center text-white text-xl font-semibold">${m.name.slice(0, 1)}</div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 grid place-items-center text-white text-xl font-semibold">
                      {m.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {m.name}
                  </div>
                  <div className="text-base text-white/70 mt-0.5">{m.role}</div>
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

      {/* ARTS3 Research Group */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-white/10 grid place-items-center shadow-lg">
            <Building2 size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-2">ARTS3 研究组</h2>
            <p className="text-white/90 leading-relaxed">
              <strong className="text-white">ARTS3 研究组</strong>
              （Advanced Research for Trustworthy and Secure Software Systems）
              隶属于
              <strong className="text-sky-300">
                华中科技大学网络空间安全学院
              </strong>
              ，由<strong className="text-white">文明副教授</strong>指导。
              实验室专注于可信与安全软件系统的基础与应用研究，旨在探索构建高可靠、高安全性软件系统的新方法与新技术。
            </p>
            <p className="mt-3 text-white/80 leading-relaxed">
              研究方向涵盖软件安全、软件测试与分析、代码大模型等领域，
              聚焦于模糊测试、静态与动态分析、软件供应链安全，以及智能化软件工程技术。
              <strong className="text-white">InterFuzz</strong>是实验室在编译器测试领域的重要研究成果，
              面向复杂"类间结构"的高层程序图（HPG）建模与变异，引导性挖掘 Java 优化编译器缺陷。
              团队致力于探索智能化、可扩展的软件测试技术，以推动可信软件系统与自动化验证的发展。
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
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
          </div>
        </div>
      </section>

      {/* CGCL Laboratory */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 grid place-items-center shadow-lg">
            <Building2 size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-3">集群与网格计算湖北省重点实验室（CGCL）</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              华中科技大学"服务计算技术与系统教育部重点实验室"暨"集群与网格计算湖北省重点实验室"依托于计算机系统结构国家重点学科和计算机软件与理论湖北省重点学科，拥有自由开放的学术氛围和国际前沿的研究方向。目前研究领域主要包括：系统软件与体系结构、分布式系统、网络空间安全、大数据等。
            </p>
            <p className="text-white/80 leading-relaxed mb-3">
              实验室具备实力雄厚的师资力量、充满活力的科研梯队以及良好的硬件设施环境。现有教授20人，副教授17人，副研究员2人，具有博士学位者48人。实验室出版专著和教材29本，发表国内外学术期刊及国际学术会议论文1400余篇，获得美国发明专利56项、国家发明专利441项。
            </p>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">InterFuzz</strong>是实验室的重要研究成果之一，旨在为企业和开发者提供高效、准确的 Java 编译器测试解决方案，通过面向复杂类间结构的高层程序图（HPG）建模与变异，引导性挖掘 Java 优化编译器缺陷，提升软件系统的可靠性与安全性。
            </p>
          </div>
        </div>
      </section>

      {/* Distributed Systems Lab */}
      <section className="card">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 grid place-items-center shadow-lg">
            <Building2 size={26} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-3">分布式系统实验室</h2>
            <p className="text-white/80 leading-relaxed">
              华中科技大学分布式系统实验室致力于分布式计算、分布式存储、分布式系统架构等前沿技术的研究与创新。实验室在分布式系统设计、容错机制、一致性协议、分布式调度等方向具有丰富的理论积累与工程实践经验。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
