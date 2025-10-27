// 统一术语：与论文“InterFuzz”描述对齐的前端可见字符串集中管理
// 便于未来国际化 / 论文版本切换（例如中英文）

// Pipeline 步骤（语气更贴近论文，降低“工具化”与“测试”曝光感）
// 说明：保持语义凝练，避免生硬直译；后端接入时对应阶段事件可直接复用这些字符串。
// 主干节点（可视化的主要里程碑）
export const PIPELINE_CORE_STEPS: string[] = [
  'Seed 导入',
  '初始 HPG (Before Mutation)',
  '变异后 HPG (After Mutation)',
  '测试程序生成'
]

// 连接操作（发生在相邻核心节点之间，不单独成为“节点气泡”）
export const PIPELINE_CONNECTORS: Array<{ from: string; to: string; label: string }> = [
  { from: 'Seed 导入', to: '初始 HPG (Before Mutation)', label: '结构分析' },
  { from: '初始 HPG (Before Mutation)', to: '变异后 HPG (After Mutation)', label: 'Inter-Class Mutator' }
]

// 进度序列（用于内部进度条驱动 = 核心节点 + 中间操作）
export const PIPELINE_PROGRESS_SEQUENCE: string[] = [
  'Seed 导入',
  '结构分析',
  '初始 HPG (Before Mutation)',
  'Inter-Class Mutator',
  '变异后 HPG (After Mutation)',
  '测试程序生成'
]

export const PIPELINE_DESCRIPTION = '演示结构：Seed 导入 → 结构分析 → 初始 HPG → Inter-Class Mutator → 变异后 HPG → 测试程序生成。'

export const PIPELINE_NOTE = '中间操作（结构分析 / Inter-Class Mutator）以内联标签呈现；后续可由后端事件流驱动增量刷新。'

export const MUTATED_CODE_HEADER = '// 测试程序生成示例\n'

export const MUTATION_EXPLANATION = `// 说明\n//  - 示例变更: 算术结果偏移 (+1)\n//  - 目的: 展示语义保持约束下的局部扰动及其潜在影响\n//  - 当前: 前端演示文本，未触发真实执行\n`

export const MUTATED_CODE_SNIPPET = (seedBase: string) => {
  const core = seedBase.replace(/\.java$/,'') || 'Seed'
  return `public class ${core}Test {\n    public static void main(String[] args) {\n        ${core} inst = new ${core}();\n        int a = inst.add(2,3); // 期望 5, 变异示例 => 6\n        int b = inst.mul(4,5);\n        System.out.println("add=" + a + ", mul=" + b);\n        if (a != 5) {\n            System.out.println("[DIFF] Inter-Class Mutator 修改影响 add()");\n        }\n    }\n}`
}

export const HEADER_TITLE = 'InterFuzz 功能展示'
export const HEADER_SUBTITLE = 'Seed 导入 · 结构分析 · 初始 HPG · Inter-Class Mutator · 变异后 HPG · 测试程序生成'
