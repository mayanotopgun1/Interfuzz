import { useEffect, useRef, useState } from 'react'
import GraphPanel from '../components/GraphPanel'
import { Trash2, PlayCircle, CheckCircle2, Loader2, Info, FileCode, ChevronRight, Download, BarChart2, Activity, ArrowRightCircle, Sparkles } from 'lucide-react'
import { PIPELINE_CORE_STEPS, PIPELINE_CONNECTORS, PIPELINE_PROGRESS_SEQUENCE, PIPELINE_DESCRIPTION, PIPELINE_NOTE, MUTATED_CODE_HEADER, MUTATION_EXPLANATION, MUTATED_CODE_SNIPPET, HEADER_TITLE, HEADER_SUBTITLE } from '../data/terminology'
import PipelineFlow from '../components/PipelineFlow'
import CodePreview from '../components/CodePreview'

export default function Demo() {
  const [leftDataUrl, setLeftDataUrl] = useState<string | null>(null)
  const [rightDataUrl, setRightDataUrl] = useState<string | null>(null)
  // 移除上传/变异后台调用，仅保留本地文件读取预览
  const [error, setError] = useState<string | null>(null)
  const blobUrls = useRef<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFileContent, setSelectedFileContent] = useState<string>('')
  const [manualOpen, setManualOpen] = useState<boolean>(false)
  const [manualJavaText, setManualJavaText] = useState<string>('')
  const [leftSource, setLeftSource] = useState<string>('')
  const [rightSource, setRightSource] = useState<string>('')
  // 预选 Seed 选择器
  const [showSeedPicker, setShowSeedPicker] = useState<boolean>(false)
  const previewRef = useRef<HTMLDivElement | null>(null)

  // ---- 生成 Seed（对外呈现为由 JavaFuzzer 生成；内部使用本地生成逻辑） ----
  function generateRandomSeed(iterations: number): { name: string; content: string } {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const classId = `${Date.now().toString(36)}${rand(100, 999)}`
    const cls = `Seed${classId}`
    const iface = `I${rand(1, 9)}`
    const methCount = rand(1, 3)
    const methods = Array.from({ length: methCount }).map((_, i) => `  public int m${i + 1}() { return ${rand(0, 9)}; }`).join('\n')
    const meta = `// InterFuzz Demo Seed  ·  iterations=${iterations}  ·  generated=${new Date().toISOString()}\n`
    const content = meta +
      `interface ${iface} { default int v(){ return ${rand(1, 3)}; } }\n` +
      `class C_${cls} implements ${iface} { static int s = ${rand(0, 2)}; static { s = s + ${rand(0, 3)}; }\n${methods}\n}` +
      `\npublic class ${cls} {\n  public static void main(String[] args) {\n    System.out.println(new C_${cls}().v() + C_${cls}.s);\n  }\n}`
    return { name: `${cls}.java`, content }
  }

  // ---- 自动流程演示相关状态 ----
  const progressSteps = PIPELINE_PROGRESS_SEQUENCE
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [mutatedCode, setMutatedCode] = useState<string>('')
  const totalSteps = progressSteps.length
  const progress = currentStep < 0 ? 0 : Math.min(100, Math.round(((currentStep + (analysisDone ? 1 : 0)) / totalSteps) * 100))

  // ---- Graph 结构差异（四类节点 · 五类边） ----
  type GraphRow = { type: string; text: string }
  type GraphNode = { id: string; rows: GraphRow[] }
  type GraphEdge = { id: string; kind?: string; source: string; target: string }
  interface GraphData { nodes: GraphNode[]; edges: GraphEdge[] }
  interface GraphSummary {
    rowCounts: Record<string, number> // 基于行统计: class/interface/method/field
    nodeKindCounts: Record<string, number> // 节点级 (class/interface 节点数量, 其他按行补齐)
    edgeKindCounts: Record<string, number>
    methodRowsPerNode: Record<string, number>
  }
  interface GraphDiff {
    nodeKindDelta: Record<string, number>
    edgeKindDelta: Record<string, number>
    addedNodes: Array<{ id: string; kind: string }>
    addedMethodRows: Array<{ nodeId: string; count: number }>
    addedEdges: Array<{ id: string; kind: string }>
  }
  const [seedGraphSummary, setSeedGraphSummary] = useState<GraphSummary | null>(null)
  const [mutGraphSummary, setMutGraphSummary] = useState<GraphSummary | null>(null)
  const [graphDiff, setGraphDiff] = useState<GraphDiff | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareJustActivated, setCompareJustActivated] = useState(false)
  // 图区域临时脉冲高亮 (点击“可视化变异过程”时触发)
  const [graphPulse, setGraphPulse] = useState(false)

  // 轻量主题检测（通过根元素是否含有 theme-light class）
  function useIsLightTheme(): boolean {
    const [isLight, setIsLight] = useState<boolean>(() => typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light'))
    useEffect(() => {
      if (typeof document === 'undefined') return
      const obs = new MutationObserver(() => {
        setIsLight(document.documentElement.classList.contains('theme-light'))
      })
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => obs.disconnect()
    }, [])
    return isLight
  }
  const isLight = useIsLightTheme()

  // 公共色阶映射（暗 / 亮）
  const tone = {
    heading: isLight ? 'text-slate-700' : 'text-white/80',
    subHeading: isLight ? 'text-slate-600' : 'text-white/60',
    caption: isLight ? 'text-slate-500' : 'text-white/50',
    divider: isLight ? 'bg-slate-200' : 'bg-white/10',
    tagIdle: isLight ? 'text-slate-500' : 'text-white/45'
  }

  function normalizeEdgeKind(k?: string): string {
    if (!k) return 'unknown'
    const v = k.toLowerCase()
    if (v === 'interface_impl' || v === 'implement' || v === 'interface-impl') return 'interface-impl'
    if (v === 'generic_bounds' || v === 'generic-bounds') return 'generic-bounds'
    return v
  }
  const EDGE_BASE = ['reference','interface-impl','inheritance','nesting','generic-bounds']
  const ROW_BASE = ['class','interface','method','field']

  function summarizeGraph(g: GraphData): GraphSummary {
    const rowCounts: Record<string, number> = {}
    const nodeKindCounts: Record<string, number> = {}
    const edgeKindCounts: Record<string, number> = {}
    const methodRowsPerNode: Record<string, number> = {}
    ROW_BASE.forEach(r => { rowCounts[r] = 0 })
    EDGE_BASE.forEach(e => { edgeKindCounts[e] = 0 })

    g.nodes.forEach(n => {
      const rows = n.rows || []
      let nodeKind = 'unknown'
      for (const r of rows) {
        const t = r.type.toLowerCase()
        if (ROW_BASE.includes(t)) rowCounts[t] = (rowCounts[t] || 0) + 1
        if ((t === 'class' || t === 'interface') && nodeKind === 'unknown') nodeKind = t
        if (t === 'method') methodRowsPerNode[n.id] = (methodRowsPerNode[n.id] || 0) + 1
      }
      nodeKindCounts[nodeKind] = (nodeKindCounts[nodeKind] || 0) + 1
    })
    g.edges.forEach(e => {
      const k = normalizeEdgeKind(e.kind)
      if (EDGE_BASE.includes(k)) edgeKindCounts[k] = (edgeKindCounts[k] || 0) + 1
    })
    // ensure keys present
    ROW_BASE.forEach(r => { if (!(r in rowCounts)) rowCounts[r] = 0 })
    EDGE_BASE.forEach(e => { if (!(e in edgeKindCounts)) edgeKindCounts[e] = 0 })
    return { rowCounts, nodeKindCounts, edgeKindCounts, methodRowsPerNode }
  }

  function diffGraphs(seed: GraphData, mutated: GraphData): GraphDiff {
    const s = summarizeGraph(seed)
    const m = summarizeGraph(mutated)
    const nodeKindDelta: Record<string, number> = { class: 0, interface: 0, method: 0, field: 0 }
    const edgeKindDelta: Record<string, number> = { reference: 0, 'interface-impl': 0, inheritance: 0, nesting: 0, 'generic-bounds': 0 }
    ;(['class','interface','method','field'] as const).forEach((k) => { nodeKindDelta[k] = (m.rowCounts[k]||0)-(s.rowCounts[k]||0) })
    EDGE_BASE.forEach((k) => { edgeKindDelta[k] = (m.edgeKindCounts[k]||0)-(s.edgeKindCounts[k]||0) })
    const seedNodeIds = new Set<string>(seed.nodes.map(n=>n.id))
    const addedNodes: Array<{ id: string; kind: string }> = mutated.nodes.filter(n=>!seedNodeIds.has(n.id)).map(n => {
      const firstRow = n.rows[0]?.type?.toLowerCase() || 'unknown'
      return { id: n.id, kind: firstRow }
    })
    const addedMethodRows: Array<{ nodeId: string; count: number }> = []
    mutated.nodes.forEach(n => {
      const mCount = m.methodRowsPerNode[n.id]||0
      const sCount = s.methodRowsPerNode[n.id]||0
      if (mCount > sCount) addedMethodRows.push({ nodeId: n.id, count: mCount - sCount })
    })
    const seedEdgeIds = new Set<string>(seed.edges.map(e=>e.id))
    const addedEdges: Array<{ id: string; kind: string }> = mutated.edges.filter(e=>!seedEdgeIds.has(e.id)).map(e => ({ id: e.id, kind: normalizeEdgeKind(e.kind) }))
    setSeedGraphSummary(s)
    setMutGraphSummary(m)
    return { nodeKindDelta, edgeKindDelta, addedNodes, addedMethodRows, addedEdges }
  }

  // Fetch & summarize when URLs become available
  useEffect(() => {
    async function fetchSeed() {
      if (!leftDataUrl) return
      try {
        const r = await fetch(leftDataUrl)
        if (!r.ok) throw new Error('seed graph load failed')
        const data: GraphData = await r.json()
        setSeedGraphSummary(summarizeGraph(data))
      } catch {}
    }
    fetchSeed()
  }, [leftDataUrl])
  useEffect(() => {
    async function fetchMut() {
      if (!rightDataUrl || !leftDataUrl) return
      try {
        const seedResp = await fetch(leftDataUrl); const seedData: GraphData = await seedResp.json()
        const mutResp = await fetch(rightDataUrl); const mutData: GraphData = await mutResp.json()
        const d = diffGraphs(seedData, mutData)
        setGraphDiff(d)
        setCompareMode(true); setCompareJustActivated(true); setTimeout(()=>setCompareJustActivated(false),800)
      } catch {}
    }
    fetchMut()
  }, [rightDataUrl, leftDataUrl])

  function buildGraphSuggestions(): string[] {
    if (!graphDiff) return ['等待加载图数据以生成建议']
    const s: string[] = []
    // 聚合结构复杂度提升相关触发条件为单条建议
    const structuralComplex = (
      graphDiff.nodeKindDelta.interface > 0 ||
      graphDiff.nodeKindDelta.class > 0 ||
      graphDiff.addedMethodRows.length > 0 ||
      graphDiff.edgeKindDelta['inheritance'] > 0
    )
    if (structuralComplex) s.push('更复杂的类间结构')
    if (graphDiff.edgeKindDelta['interface-impl'] > 0) s.push('实现关系增长：动态分派机会增加')
    if (graphDiff.edgeKindDelta['reference'] > 1) s.push('引用边显著增长：对象交互路径增多')
    if (graphDiff.edgeKindDelta['generic-bounds'] > 0) s.push('出现泛型约束：类型系统覆盖增强')
    if (graphDiff.edgeKindDelta['nesting'] > 0) s.push('出现嵌套：内部类/作用域结构更丰富')
    if (s.length === 0) s.push('结构变化较小，可考虑引入新的接口或继承层次')
    return s
  }
  const graphSuggestions = buildGraphSuggestions()

  // 右侧列垂直居中偏移逻辑（当左侧过高时）
  const leftColumnRef = useRef<HTMLDivElement | null>(null)
  const rightColumnRef = useRef<HTMLDivElement | null>(null)
  const [rightTopOffset, setRightTopOffset] = useState(0)
  function recalcRightOffset() {
    if (!leftColumnRef.current || !rightColumnRef.current) return
    const lh = leftColumnRef.current.getBoundingClientRect().height
    const rh = rightColumnRef.current.getBoundingClientRect().height
    const diff = lh - rh
    // 仅在明显差距时居中（> 120px）
    if (diff > 120) {
      setRightTopOffset(Math.round(diff / 2))
    } else {
      setRightTopOffset(0)
    }
  }
  useEffect(() => { recalcRightOffset() }, [selectedFileContent, mutatedCode, analysisDone, compareMode])
  // 变异生成后自动进入对比模式（一次性）
  // compare mode 激活已在加载右图时处理；保留对测试程序触发的兜底逻辑
  useEffect(() => {
    if (mutatedCode && !compareMode && rightDataUrl) {
      setCompareMode(true)
      setCompareJustActivated(true)
      setTimeout(() => setCompareJustActivated(false), 800)
    }
  }, [mutatedCode, rightDataUrl])
  useEffect(() => {
    const h = () => recalcRightOffset()
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  // 模拟步骤执行
  async function startAutoDemo() {
    if (analysisRunning) return
    const hasManual = false
    const seedName = selectedFile?.name || ''
    if (!selectedFile) {
      setError('请先选择一个 Java Seed 文件')
      return
    }
    // reset
    setAnalysisDone(false)
    setCurrentStep(-1)
    setMutatedCode('')
    setLeftDataUrl(null)
    setRightDataUrl(null)
    setLeftSource('')
    setRightSource('')
    // 清空结构统计与差异，以确保重新运行时右上角组件刷新
    setSeedGraphSummary(null)
    setMutGraphSummary(null)
    setGraphDiff(null)
    setCompareMode(false)
    setCompareJustActivated(false)
    setError(null)
    setAnalysisRunning(true)

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
    for (let i = 0; i < progressSteps.length; i++) {
      setCurrentStep(i)
      // 针对具体阶段做出可见效果
      if (progressSteps[i].includes('初始 HPG')) {
        setLeftDataUrl('/graphs/seed.json')
        const seedFileBase = seedName || 'Seed.java'
        setLeftSource(seedFileBase)
      }
      // 结构分析阶段：只生成统计，不加载图（假设步骤名包含“结构分析”）
      if (progressSteps[i].includes('结构分析')) {
        // 预加载种子图数据用于统计展示
        try {
          const resp = await fetch('/graphs/seed.json')
          if (resp.ok) {
            const data: GraphData = await resp.json()
            const summary = summarizeGraph(data)
            setSeedGraphSummary(summary)
          }
        } catch {}
      }
      if (progressSteps[i].includes('变异后 HPG')) {
        setRightDataUrl('/graphs/mut.json')
        const seedFileBase = seedName || 'Seed.java'
        setRightSource(`${seedFileBase.replace(/\.java$/,'')}-after.json`)
      }
      if (progressSteps[i].includes('测试程序生成')) {
        const seedBase = (seedName || 'Seed.java')
        setMutatedCode(MUTATED_CODE_HEADER + MUTATION_EXPLANATION + MUTATED_CODE_SNIPPET(seedBase))
      }
      // 不同阶段不同停顿模拟耗时
      await delay( i === 0 ? 800 : i === progressSteps.length - 1 ? 600 : 900 )
    }
    setAnalysisRunning(false)
    setAnalysisDone(true)
  }

  // 复制逻辑由 CodePreview 内部处理

  // 初始两个图都为空

  // cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      blobUrls.current.forEach((u) => URL.revokeObjectURL(u))
      blobUrls.current = []
    }
  }, [])

  const effectiveLeftUrl = leftDataUrl ?? undefined
  const effectiveRightUrl = rightDataUrl ?? undefined

  // 读取本地选取的 Java Seed 文件内容用于预览（不上传）
  function onSelectLocalJava(file: File | null) {
    setSelectedFile(file)
    setSelectedFileContent('')
    // 切换到文件时清空手动输入
    if (file) {
      setManualJavaText('')
      setManualOpen(false)
    }
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      setSelectedFileContent(text)
      // 切换新 Seed 时清理旧结构
      setSeedGraphSummary(null)
      setMutGraphSummary(null)
      setGraphDiff(null)
      setCompareMode(false)
      setCompareJustActivated(false)
    }
    reader.readAsText(file)
  }

  // 预选 Seed 集（用于演示，不依赖后端）
  const sampleSeeds: Array<{ name: string; content: string }> = [
    {
      name: 'SeedSample_A.java',
      content: `// Preselected Seed · A\ninterface I1 { default int v(){ return 1; } }\nclass C_A implements I1 { static int s = 0; static { s = s + 1; }\n  public int m1(){ return 3; }\n}\npublic class SeedSample_A { public static void main(String[] args){ System.out.println(new C_A().v() + C_A.s); } }`
    },
    {
      name: 'SeedSample_B.java',
      content: `// Preselected Seed · B\ninterface I2 { default int v(){ return 2; } }\nclass C_B implements I2 { static int s = 1; static { s = s + 2; }\n  public int m1(){ return 5; }\n  public int m2(){ return 7; }\n}\npublic class SeedSample_B { public static void main(String[] args){ System.out.println(new C_B().v() + C_B.s); } }`
    },
    {
      name: 'SeedSample_C.java',
      content: `// Preselected Seed · C\ninterface I3 { default int v(){ return 3; } }\nclass C_C implements I3 { static int s = 2; static { s = s + 1; }\n  public int m1(){ return 1; }\n}\npublic class SeedSample_C { public static void main(String[] args){ System.out.println(new C_C().v() + C_C.s); } }`
    }
  ]

  function useSampleSeed(seed: { name: string; content: string }) {
    const file = new File([seed.content], seed.name, { type: 'text/x-java-source;charset=utf-8' })
    setSelectedFile(file)
    setSelectedFileContent(seed.content)
    setManualJavaText('')
    setManualOpen(false)
    // 清理结果区，等待用户点击“开始分析”
    setAnalysisDone(false)
    setCurrentStep(-1)
    setMutatedCode('')
    setLeftDataUrl(null)
    setRightDataUrl(null)
    setLeftSource('')
    setRightSource('')
    setSeedGraphSummary(null)
    setMutGraphSummary(null)
    setGraphDiff(null)
    setCompareMode(false)
    setCompareJustActivated(false)
    setError(null)
    setShowSeedPicker(false)
    setTimeout(() => { previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 50)
  }

  // 原手动 JSON 模式逻辑已移除

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 bg-clip-text text-transparent tracking-wide">{HEADER_TITLE}</h1>
              <p className="text-sm text-white/55 leading-relaxed">{HEADER_SUBTITLE}</p>
            </div>
            <div className="hidden md:flex text-xs text-white/40 flex-col items-end pt-1">
              <span>Prototype · UI Simulation</span>
              <span>Academic Alignment</span>
            </div>
          </div>
          <div className="text-xs text-white/50 flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
            <Info size={14} className="mt-0.5 text-sky-300"/> <span>{PIPELINE_DESCRIPTION}</span>
          </div>
        </div>
      </div>
      {/* 自动流程演示模块 */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左：控制 + 预览双栈 */}
          <div className="flex-[1.15] space-y-4" ref={leftColumnRef}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2"><PlayCircle size={18} className="text-sky-400"/>分析—变异流水线</h3>
              <button
                className="btn-primary disabled:opacity-50"
                disabled={analysisRunning || !selectedFile}
                onClick={startAutoDemo}
                aria-label="开始分析"
              >{analysisRunning ? (<><Loader2 size={16} className="animate-spin"/> 运行中...</>) : '开始分析'}</button>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs mb-1 relative">
              <label className="text-white/60">Seed：</label>
              <button
                type="button"
                onClick={() => setShowSeedPicker((v) => !v)}
                className={`seed-btn`}
                aria-label="选择预选 Seed"
                aria-expanded={showSeedPicker}
              >
                <span className="seed-btn__sheen" aria-hidden="true" />
                <span className="seed-btn__content">
                  <FileCode size={14} />
                  <span className="text-[12px] font-semibold tracking-wide">选择预选 Seed</span>
                </span>
              </button>
              <span className="seed-caption">
                <span className="seed-caption__source">预选 Seed 集</span>
              </span>
              {selectedFile && (
                <>
                  <div className="h-4 w-px bg-white/10 mx-1" />
                  <button
                    className="btn text-xs px-2 py-1"
                    onClick={() => {
                      setSelectedFile(null)
                      setSelectedFileContent('')
                      setManualJavaText('')
                      setManualOpen(false)
                      setLeftDataUrl(null); setRightDataUrl(null); setLeftSource(''); setRightSource(''); setMutatedCode(''); setAnalysisDone(false); setCurrentStep(-1)
                      setSeedGraphSummary(null); setMutGraphSummary(null); setGraphDiff(null); setCompareMode(false); setCompareJustActivated(false)
                    }}>移除文件</button>
                  <button
                    className="btn text-xs px-2 py-1"
                    disabled={analysisRunning}
                    onClick={() => { setAnalysisDone(false); setCurrentStep(-1); setMutatedCode(''); startAutoDemo() }}
                  >重新运行</button>
                </>
              )}
              {showSeedPicker && (
                <div className={`absolute z-20 top-full left-14 mt-2 w-[520px] rounded-xl border p-3 shadow-lg backdrop-blur-md transition ${isLight ? 'border-slate-200 bg-white/95' : 'border-white/10 bg-[rgba(20,24,36,0.9)]'} `}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleSeeds.map((s) => (
                      <div
                        key={s.name}
                        className={`rounded-lg border p-2 transition group ${isLight ? 'border-slate-200 bg-slate-50 hover:bg-slate-100' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className={`font-medium truncate ${isLight ? 'text-slate-700 group-hover:text-slate-800' : 'text-white/80 group-hover:text-white'}`}
                            title={s.name}
                          >{s.name}</div>
                          <button
                            className={`text-[11px] px-2 py-1 rounded-md border transition ${isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-600' : 'btn-ghost border-white/15 text-white/60 hover:text-white'}`}
                            onClick={() => useSampleSeed(s)}
                          >选用</button>
                        </div>
                        <pre className={`text-[10px] max-h-24 overflow-auto whitespace-pre-wrap leading-snug ${isLight ? 'text-slate-600' : 'text-white/60'}`}>{s.content.slice(0, 240)}{s.content.length > 240 ? '…' : ''}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-white/50">导入 Seed 后系统依次执行：Seed 导入 → 结构分析 → 初始 HPG → 变异执行 → 变异后 HPG → 测试程序。</p>
            {/* 输入预览 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-white/70 text-xs font-semibold tracking-wide">输入 Seed 源码</h4>
                {selectedFile && <span className="text-[10px] text-white/40">{selectedFile.name}</span>}
              </div>
              {selectedFile && selectedFileContent ? (
                <div ref={previewRef}>
                  <CodePreview code={selectedFileContent} language="java" filename={selectedFile?.name || 'Seed.java'} maxHeight={260} />
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-xs text-white/45">
                  选择或导入 Seed 后显示源码
                </div>
              )}
            </div>
            {/* 输出预览 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-white/70 text-xs font-semibold tracking-wide">输出测试程序</h4>
                {mutatedCode && <span className="text-[10px] text-white/40">Generated</span>}
              </div>
              {selectedFile && mutatedCode ? (
                <CodePreview
                  code={mutatedCode}
                  language="java"
                  filename={`${(selectedFile?.name?.replace(/\.java$/, '') || 'Seed')}Test.java`}
                  maxHeight={260}
                />
              ) : (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-xs text-white/45 min-h-[140px] flex items-center justify-center">
                  等待流程生成测试程序…
                </div>
              )}
            </div>
          </div>
          {/* 右：步骤列表（整合进度） */}
          <div className="flex-[0.85] space-y-4" ref={rightColumnRef} style={{ marginTop: rightTopOffset }}>
            {/* Graph 结构 / 差异 面板 */}
            <div className={`relative rounded-xl border p-6 flex flex-col gap-6 overflow-hidden transition-all duration-500 min-h-[300px] graph-struct-surface ${compareJustActivated ? 'ring-1 ring-cyan-400/40 scale-[1.02]' : ''} ${isLight ? 'border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200' : 'border-white/10 bg-gradient-to-br from-[rgba(35,50,70,0.55)] via-[rgba(20,28,40,0.55)] to-[rgba(12,18,30,0.55)]'}`}>
              <div className="absolute inset-0 pointer-events-none opacity-[0.18] bg-[radial-gradient(circle_at_70%_30%,rgba(0,155,220,0.45),transparent_60%)]" />
              <div className="flex items-center justify-between relative z-10">
                <h4 className={`text-xs font-semibold tracking-wide flex items-center gap-1 ${tone.heading}`}><BarChart2 size={14} className="text-cyan-400"/>{compareMode ? 'Graph 结构差异' : 'Seed 结构'}</h4>
                <button
                  type="button"
                  onClick={() => setCompareMode(m => !m)}
                  className={`text-[10px] px-2 py-1 rounded-md border transition ${isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-600' : 'border-white/15 bg-white/5 hover:bg-white/10 text-white/60'}`}
                >{compareMode ? '单列视图' : '对比视图'}</button>
              </div>
              {!compareMode && (
                <div className="relative z-10 flex-1 flex flex-col gap-6">
                  <div className="flex flex-col">
                    <h5 className={`text-[11px] font-medium mb-2 ${tone.subHeading}`}>节点统计</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3">
                      <MetricBlock label="Class" value={seedGraphSummary?.rowCounts.class ?? '-'} color="sky" />
                      <MetricBlock label="Interface" value={seedGraphSummary?.rowCounts.interface ?? '-'} color="cyan" />
                      <MetricBlock label="Method" value={seedGraphSummary?.rowCounts.method ?? '-'} color="emerald" />
                      <MetricBlock label="Field" value={seedGraphSummary?.rowCounts.field ?? '-'} color="amber" />
                    </div>
                    {/* 移除原行统计说明 */}
                  </div>
                  <div className="flex flex-col">
                    <h5 className={`text-[11px] font-medium mb-2 ${tone.subHeading}`}>边统计</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      <MetricBlock label="Reference" value={seedGraphSummary?.edgeKindCounts['reference'] ?? '-'} color="teal" />
                      <MetricBlock label="Interface Implementation" value={seedGraphSummary?.edgeKindCounts['interface-impl'] ?? '-'} color="violet" />
                      <MetricBlock label="Inheritance" value={seedGraphSummary?.edgeKindCounts['inheritance'] ?? '-'} color="indigo" />
                      <MetricBlock label="Nesting" value={seedGraphSummary?.edgeKindCounts['nesting'] ?? '-'} color="rose" />
                      <MetricBlock label="Generic Bounds" value={seedGraphSummary?.edgeKindCounts['generic-bounds'] ?? '-'} color="lime" />
                    </div>
                    {/* 移除原边分类说明 */}
                  </div>
                  <div className={`text-[10px] italic ${tone.caption}`}>单列模式：加载右侧图后自动进入对比</div>
                </div>
              )}
              {compareMode && (
                <div className="relative z-10 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h5 className={`text-[11px] font-medium flex items-center gap-1 ${tone.subHeading}`}><Activity size={12} className="text-sky-500"/>Seed</h5>
                    <CompareLine label="Class" a={seedGraphSummary?.rowCounts.class} b={mutGraphSummary?.rowCounts.class} />
                    <CompareLine label="Interface" a={seedGraphSummary?.rowCounts.interface} b={mutGraphSummary?.rowCounts.interface} />
                    <CompareLine label="Method" a={seedGraphSummary?.rowCounts.method} b={mutGraphSummary?.rowCounts.method} />
                    <CompareLine label="Field" a={seedGraphSummary?.rowCounts.field} b={mutGraphSummary?.rowCounts.field} />
                    <div className={`mt-1 h-px w-full ${tone.divider}`} />
                    <CompareLine label="Reference" a={seedGraphSummary?.edgeKindCounts['reference']} b={mutGraphSummary?.edgeKindCounts['reference']} />
                    <CompareLine label="Interface Implementation" a={seedGraphSummary?.edgeKindCounts['interface-impl']} b={mutGraphSummary?.edgeKindCounts['interface-impl']} />
                    <CompareLine label="Inheritance" a={seedGraphSummary?.edgeKindCounts['inheritance']} b={mutGraphSummary?.edgeKindCounts['inheritance']} />
                    <CompareLine label="Nesting" a={seedGraphSummary?.edgeKindCounts['nesting']} b={mutGraphSummary?.edgeKindCounts['nesting']} />
                    <CompareLine label="Generic Bounds" a={seedGraphSummary?.edgeKindCounts['generic-bounds']} b={mutGraphSummary?.edgeKindCounts['generic-bounds']} />
                  </div>
                  <div className="space-y-2">
                    <h5 className={`text-[11px] font-medium flex items-center gap-1 ${tone.subHeading}`}><ArrowRightCircle size={12} className="text-emerald-500"/>差异摘要</h5>
                    <div className="flex flex-wrap gap-1">
                      {graphDiff?.addedNodes.map(an => (
                        <span key={an.id} className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-[10px] text-emerald-300">+节点 {an.id}({an.kind})</span>
                      ))}
                      {graphDiff?.addedMethodRows.map(am => (
                        <span key={am.nodeId} className="px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-[10px] text-cyan-300">+方法 {am.nodeId} ×{am.count}</span>
                      ))}
                      {graphDiff?.addedEdges.map(ae => (
                        <span key={ae.id} className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-400/30 text-[10px] text-purple-300">+边 {ae.kind}</span>
                      ))}
                      {graphDiff && graphDiff.addedNodes.length===0 && graphDiff.addedEdges.length===0 && graphDiff.addedMethodRows.length===0 && (
                        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] text-white/50">暂无新增结构</span>
                      )}
                    </div>
                    <div className={`mt-2 text-[10px] italic flex items-center gap-1 ${tone.caption}`}><Sparkles size={12} className="text-yellow-500"/>基于行(row)统计：方法/字段作为行计数，节点按首行类型分类。</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {graphSuggestions.map((sg,i)=>(
                        <span key={i} className="px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10px] text-white/65 backdrop-blur-sm">{sg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 步骤列表 */}
            <div className="space-y-2" aria-label="Progress Steps">
              {progressSteps.map((s: string, idx: number) => {
                const isActive = idx === currentStep && analysisRunning
                const doneStep = idx < currentStep || (analysisDone && idx === progressSteps.length - 1)
                const isConnector = PIPELINE_CONNECTORS.some((c: { from: string; to: string; label: string }) => c.label === s)
                const isTestProgramStep = /测试程序生成/.test(s)
                return (
                  <div key={s} className={`flex items-start gap-3 rounded-lg px-3 py-2 text-[13px] border transition relative overflow-hidden group ${isConnector ? 'border-dashed' : ''} ${doneStep ? 'border-emerald-500/40 bg-emerald-500/[0.07]' : isActive ? 'border-sky-500/50 bg-sky-500/[0.12]' : 'border-white/10 bg-white/[0.035]'}`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-r from-cyan-400/40 to-transparent"></div>
                    <div className="mt-0.5 min-w-4 flex items-center justify-center">
                      {isActive ? (
                        <Loader2 size={16} className="text-sky-400 animate-spin"/>
                      ) : doneStep ? (
                        isConnector ? (
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                        ) : (
                          <CheckCircle2 size={16} className="text-emerald-400"/>
                        )
                      ) : (
                        <ChevronRight size={16} className="text-white/40"/>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isConnector ? 'text-xs tracking-wide uppercase text-white/50' : ''} ${doneStep ? 'text-emerald-300' : isActive ? 'text-sky-300' : isConnector ? '' : 'text-white/70'}`}>{s}</div>
                      {isActive && <div className="text-[11px] text-white/50 mt-0.5">处理中...</div>}
                    </div>
                  </div>
                )
              })}
              {/* 外部提示：测试程序生成后出现 */}
              {progressSteps.some(s => /测试程序生成/.test(s)) && (
                (() => {
                  const idx = progressSteps.findIndex(s => /测试程序生成/.test(s))
                  const reached = idx >= 0 && (currentStep > idx || (currentStep === idx && (analysisDone || analysisRunning)))
                  if (!reached) return null
                  return (
                    <div className="flex items-center justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          // 仅滚动到图区域，不再做额外偏移；触发脉冲高亮反馈
                          const target = document.querySelector('#graph-visual-region')
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            setGraphPulse(true)
                            setTimeout(() => setGraphPulse(false), 900)
                          }
                        }}
                        className="group relative px-3 py-1.5 rounded-md bg-transparent text-cyan-200 text-[12px] font-semibold tracking-wide flex items-center gap-1 hover:text-cyan-100 transition"
                        aria-label="滚动查看图可视化"
                      >
                        <span className="inline-flex items-center gap-1">
                          <span className="drop-shadow-sm">可视化变异过程</span>
                          <span className="animate-bounce inline-flex text-cyan-300">
                            {/* 更精致的双层箭头 */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M12 4v8" />
                              <path d="M6 12l6 6 6-6" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                  )
                })()
              )}
            </div>
          </div>
        </div>
        {/* 去除独立居中进度条，减少重复视觉元素 */}
      </div>
      {error && <div className="card text-sm text-rose-400">错误：{error}</div>}
      {/* Divider */}
      <div className="card">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">图结果</div>
            <div className="h-px flex-1 mx-3 bg-white/10" />
            <div className="text-xs text-white/50">Left: 初始 HPG · Right: 变异后 HPG</div>
          </div>
          {/* 水平流程示意 */}
          <div className="hidden md:block">
            <PipelineFlow
              coreSteps={PIPELINE_CORE_STEPS}
              connectors={PIPELINE_CONNECTORS}
              active={progressSteps[currentStep] || null}
              completed={new Set(progressSteps.slice(0, currentStep))}
            />
          </div>
        </div>
      </div>
      {/* Graphs: 双图固定并排，初始为空 */}
  <div id="graph-visual-region" className={`grid gap-3 xl:grid-cols-2 ${graphPulse ? 'ring-2 ring-cyan-400/50 rounded-xl animate-pulse' : ''}`}>
        <GraphPanel
          dataUrl={effectiveLeftUrl}
          height={600}
          title={'初始 HPG'}
          subtitle={leftSource || undefined}
        />
        <GraphPanel
          dataUrl={effectiveRightUrl}
          height={600}
          title="变异后 HPG"
          subtitle={rightSource || undefined}
        />
      </div>
      {/* 获取 Seed 模块 */}
      <AcquireSeedsSection generateRandomSeed={generateRandomSeed} blobUrls={blobUrls} />
    </div>
  )
}

// 获取 Seed 批量打包组件
interface AcquireSeedsProps {
  generateRandomSeed: (iterations: number) => { name: string; content: string }
  blobUrls: React.MutableRefObject<string[]>
}

function AcquireSeedsSection({ generateRandomSeed, blobUrls }: AcquireSeedsProps) {
  const [count, setCount] = useState<number>(3)
  const [iterations, setIterations] = useState<number>(100)
  const [acquiring, setAcquiring] = useState(false)
  const [items, setItems] = useState<Array<{ name: string; url: string; content: string }>>([])
  const [zipBuilding, setZipBuilding] = useState(false)
  const [zipProgress, setZipProgress] = useState(0)
  const [zipUrl, setZipUrl] = useState<string | null>(null)
  const [zipJustBuilt, setZipJustBuilt] = useState(false)

  // 清理单独创建的 blob (ZIP) URL
  useEffect(() => {
    return () => {
      if (zipUrl) URL.revokeObjectURL(zipUrl)
    }
  }, [zipUrl])

  async function acquire() {
    if (acquiring) return
    setAcquiring(true)
    // 清理旧的 item urls
    items.forEach((it) => URL.revokeObjectURL(it.url))
    const next: Array<{ name: string; url: string; content: string }> = []
    for (let i = 0; i < count; i++) {
      const seed = generateRandomSeed(iterations)
      const blob = new Blob([seed.content], { type: 'text/x-java-source;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      blobUrls.current.push(url)
      next.push({ name: seed.name, url, content: seed.content })
    }
    setItems(next)
    setAcquiring(false)
  }

  function downloadOne(it: { name: string; url: string }) {
    const a = document.createElement('a')
    a.href = it.url
    a.download = it.name
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function downloadAll() {
    if (zipBuilding || items.length === 0) return
    setZipBuilding(true)
    setZipProgress(0)
    try {
      const JSZipModule = await import('jszip')
      const zip = new JSZipModule.default()
      items.forEach((it) => {
        let filename = it.name
        if (!filename.endsWith('.java') && !filename.endsWith('.txt')) filename = `${filename}.java`
        zip.file(filename, it.content)
      })
      const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setZipProgress(Math.round(metadata.percent))
      })
      const url = URL.createObjectURL(blob)
      blobUrls.current.push(url)
      setZipUrl(url)
      const a = document.createElement('a')
      a.href = url
      a.download = `seeds-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      // 动态加载庆祝特效
      try {
        const mod = await import('canvas-confetti')
        const confetti = mod.default
        confetti({ particleCount: 90, spread: 72, startVelocity: 28, scalar: 0.9, origin: { y: 0.3 } })
        setZipJustBuilt(true)
        setTimeout(() => setZipJustBuilt(false), 2000)
      } catch {
        // ignore
      }
      setZipProgress(100)
      setTimeout(() => {
        setZipBuilding(false)
        setZipProgress(0)
      }, 400)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('zip pack failed', e)
      alert('打包失败，请重试。')
      setZipBuilding(false)
      setZipProgress(0)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
  <h3 className="font-semibold text-white">种子生成</h3>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5">数量: <span className="text-white">{count}</span></span>
          <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5">迭代: <span className="text-white">{iterations}</span></span>
          <span className="text-white/40">批量导出</span>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <label htmlFor="cnt-select" className="text-white/60">数量</label>
          <select id="cnt-select" className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 focus:outline-none" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))}>
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="iter-select2" className="text-white/60">迭代次数</label>
          <select id="iter-select2" className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 focus:outline-none" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value, 10))}>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
          </select>
        </div>
  <button className="btn-primary disabled:opacity-50" disabled={acquiring} onClick={acquire} aria-label="种子生成">{acquiring ? (<><Loader2 size={14} className="animate-spin"/> 生成中...</>) : '生成'}</button>
        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button className="btn text-xs px-2 py-1 inline-flex items-center gap-2" onClick={downloadAll} disabled={zipBuilding}>
              {zipBuilding ? (<><Loader2 size={14} className="animate-spin"/> 打包中 {zipProgress}%</>) : (<><Download size={14}/> 打包并下载 (zip)</>)}
            </button>
            {zipUrl && !zipBuilding && (
              <a className="text-xs text-white/60 underline" href={zipUrl} download>重新下载 ZIP</a>
            )}
            {zipJustBuilt && !zipBuilding && (
              <span className="text-[11px] text-emerald-300 inline-flex items-center gap-1"><CheckCircle2 size={14}/> 打包完成</span>
            )}
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((it) => (
            <div key={it.url} className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition shadow-sm">
              <div className="flex items-center justify-between">
                <div className="truncate text-white/80 text-xs" title={it.name}>{it.name}</div>
                <button className="btn-ghost text-[11px] px-2 py-1 inline-flex items-center gap-1" onClick={() => downloadOne(it)}>
                  <Download size={12}/> 下载
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {zipBuilding && (
        <div className="mt-3">
          <div className="text-xs text-white/60 mb-1">正在打包 {items.length} 个 Seed：{zipProgress}%</div>
          <div className="w-full h-3 bg-white/10 rounded-lg overflow-hidden">
            <div className="h-full transition-all duration-200 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${zipProgress}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}

export { AcquireSeedsSection }

// 辅助展示组件定义（放在同文件末尾避免引入额外文件）
interface MetricBlockProps { label: string; value: any; color: string }
function MetricBlock({ label, value, color }: MetricBlockProps) {
  const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')
  const colorMapDark: Record<string,string> = {
    cyan: 'text-cyan-300', sky: 'text-sky-300', emerald: 'text-emerald-300', violet: 'text-violet-300', fuchsia: 'text-fuchsia-300', amber: 'text-amber-300', rose: 'text-rose-300', lime: 'text-lime-300', indigo: 'text-indigo-300', teal: 'text-teal-300'
  }
  const colorMapLight: Record<string,string> = {
    cyan: 'text-cyan-600', sky: 'text-sky-600', emerald: 'text-emerald-600', violet: 'text-violet-600', fuchsia: 'text-fuchsia-600', amber: 'text-amber-600', rose: 'text-rose-600', lime: 'text-lime-600', indigo: 'text-indigo-600', teal: 'text-teal-600'
  }
  return (
    <div className={`rounded-lg border p-2 flex flex-col items-center gap-1 ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'}`}>
      <div className={`text-[10px] text-center leading-tight ${isLight ? 'text-slate-500' : 'text-white/45'}`}>{label}</div>
      <div className={`text-sm font-semibold ${ (isLight ? colorMapLight[color] : colorMapDark[color]) || (isLight ? 'text-slate-700' : 'text-white/70')}`}>{value}</div>
    </div>
  )
}
interface CompareLineProps { label: string; a?: number; b?: number }
function CompareLine({ label, a, b }: CompareLineProps) {
  const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className={isLight ? 'text-slate-500' : 'text-white/45'}>{label}</span>
      <div className="flex items-center gap-1">
        <span className={`${isLight ? 'text-slate-600' : 'text-white/60'} min-w-[22px] text-right`}>{a ?? '-'}</span>
        <ChevronRight size={12} className={isLight ? 'text-slate-400' : 'text-white/30'} />
        <span className={`${isLight ? 'text-emerald-600' : 'text-emerald-300'} min-w-[22px] text-left`}>{b ?? '-'}</span>
        {a != null && b != null && a !== b && (
          <span className={`text-[10px] ${b - a >= 0 ? (isLight ? 'text-emerald-500' : 'text-emerald-400') : (isLight ? 'text-rose-500' : 'text-rose-400')}`}>{b - a >= 0 ? '+' : ''}{b - a}</span>
        )}
      </div>
    </div>
  )
}
interface DiffBarProps { original?: number; added?: number }
function DiffBar({ original, added }: DiffBarProps) {
  if (original == null || added == null) return <div className="h-2 rounded bg-white/10" />
  const total = original + added
  const pct = total === 0 ? 0 : (added / total) * 100
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
      <div className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${pct}%` }} />
      <div className="absolute inset-0 flex items-center justify-center text-[9px] text-white/70">
        +{added} / {original}
      </div>
    </div>
  )
}
