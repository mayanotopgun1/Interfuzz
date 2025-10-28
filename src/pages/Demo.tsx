import { useEffect, useRef, useState } from 'react'
import GraphPanel from '../components/GraphPanel'
import { Trash2, PlayCircle, CheckCircle2, Loader2, Info, FileCode, ChevronRight } from 'lucide-react'
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

  // ---- 内置 seed 文件（不在 UI 暴露“示例”字样，仅以文件名呈现） ----
  const seeds = [
    {
      name: 'seed1.java',
      content: `public class Seed1 {\n  public static void main(String[] args) {\n    System.out.println("Hello InterFuzz Seed1");\n  }\n}`,
    },
    {
      name: 'seed2.java',
      content: `interface I1 { default int v(){ return 1; } }\nclass C1 implements I1 { static String s = "x"; static { s = s + "y"; } }\npublic class Seed2 {\n  public static void main(String[] args) { System.out.println(new C1().v()); }\n}`,
    },
    {
      name: 'seed3.java',
      content: `class A { static int n = 1; }\nclass B { static { A.n = 2; } }\npublic class Seed3 {\n  public static void main(String[] args){ System.out.println(A.n); }\n}`,
    },
  ] as const

  // ---- 自动流程演示相关状态 ----
  const progressSteps = PIPELINE_PROGRESS_SEQUENCE
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [mutatedCode, setMutatedCode] = useState<string>('')
  const totalSteps = progressSteps.length
  const progress = currentStep < 0 ? 0 : Math.min(100, Math.round(((currentStep + (analysisDone ? 1 : 0)) / totalSteps) * 100))

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
    }
    reader.readAsText(file)
  }

  // 选择内置 seed：构造内存 File，并直接写入内容与状态
  function selectSeed(idx: number) {
    const seed = seeds[idx]
    // 使用 Blob/File 构造一个内存文件对象
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
    setError(null)
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左：输入与控制 */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2"><PlayCircle size={18} className="text-sky-400"/>分析—变异流水线模拟</h3>
              <button
                className="btn-primary disabled:opacity-50"
                disabled={analysisRunning || !selectedFile}
                onClick={startAutoDemo}
                aria-label="开始分析"
              >{analysisRunning ? (<><Loader2 size={16} className="animate-spin"/> 运行中...</>) : '开始分析'}</button>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs mb-2">
              <label className="text-white/60">选择 Seed 文件：</label>
              <input
                type="file"
                accept=".java"
                onChange={(e)=> onSelectLocalJava(e.target.files?.[0] || null)}
                className="text-xs"
              />
              {/* 预选 Seed：紧凑卡片（无内嵌代码预览） */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-xl">
                {seeds.map((s, idx) => {
                  const isActive = selectedFile?.name === s.name
                  return (
                    <button
                      type="button"
                      key={s.name}
                      onClick={() => selectSeed(idx)}
                      className={`relative text-left rounded-xl px-3 py-2 border transition-all ${isActive ? 'border-sky-400 bg-sky-500/10 shadow-sm' : 'border-white/10 bg-white/5 hover:border-sky-400/40 hover:bg-sky-500/5'}`}
                      aria-pressed={isActive}
                    >
                      {/* 选中标记 */}
                      {isActive && (
                        <span className="absolute right-2 top-2 text-sky-300"><CheckCircle2 size={14} /></span>
                      )}
                      <div className="flex items-center gap-2">
                        <div className={`grid place-items-center w-6 h-6 rounded-md ${isActive ? 'bg-sky-500/20' : 'bg-white/10'}`}>
                          <FileCode size={14} className={isActive ? 'text-sky-300' : 'text-white/70'} />
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-white/90 leading-none">{s.name}</div>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-white/50">
                            <span className="px-1.5 py-0.5 rounded bg-white/10">Java</span>
                            <span>·</span>
                            <span>Seed</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              {selectedFile && (
                <>
                  <button
                    className="btn text-xs px-2 py-1"
                    onClick={() => {
                      setSelectedFile(null)
                      setSelectedFileContent('')
                      setManualJavaText('')
                      setManualOpen(false)
                      setLeftDataUrl(null); setRightDataUrl(null); setLeftSource(''); setRightSource(''); setMutatedCode(''); setAnalysisDone(false); setCurrentStep(-1)
                    }}>移除文件</button>
                  <button
                    className="btn text-xs px-2 py-1"
                    disabled={analysisRunning}
                    onClick={() => { setAnalysisDone(false); setCurrentStep(-1); setMutatedCode(''); startAutoDemo() }}
                  >重新运行</button>
                </>
              )}
            </div>
            {!selectedFile && (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-xs text-white/50">
                请选择一个 Java Seed 文件后可查看源码并启动分析—变异流程
              </div>
            )}
            {selectedFile && selectedFileContent && (
              <div className="mb-2">
                <CodePreview code={selectedFileContent} language="java" filename={selectedFile?.name || 'Seed.java'} maxHeight={256} />
              </div>
            )}
            <p className="text-xs text-white/50">导入 Seed 后可启动流程：系统将依次生成初始 / 变异后 HPG，并最终展示测试程序。</p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/60">进度</span>
                <span className="text-xs text-white/50">{analysisDone ? '完成' : progress + '%'}</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-lg overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 ${analysisDone ? 'sheen' : ''}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          {/* 右：步骤时间线 & 变异代码 */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3" aria-label="Progress Steps">
              {progressSteps.map((s: string, idx: number) => {
                const isActive = idx === currentStep && analysisRunning
                const done = idx < currentStep || (analysisDone && idx === progressSteps.length - 1)
                const isConnector = PIPELINE_CONNECTORS.some((c: { from: string; to: string; label: string }) => c.label === s)
                return (
                  <div key={s} className={`flex items-start gap-3 rounded-xl px-3 py-2 text-sm border ${isConnector ? 'border-dashed' : ''} ${done ? 'border-emerald-500/40 bg-emerald-500/[0.08]' : isActive ? 'border-sky-500/50 bg-sky-500/[0.10]' : 'border-white/10 bg-white/[0.04]'}`}>
                    <div className="mt-0.5 min-w-4 flex items-center justify-center">
                      {isActive ? (
                        <Loader2 size={16} className="text-sky-400 animate-spin"/>
                      ) : done ? (
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
                      <div className={`font-medium ${isConnector ? 'text-xs tracking-wide uppercase text-white/60' : ''} ${done ? 'text-emerald-300' : isActive ? 'text-sky-300' : isConnector ? '' : 'text-white/70'}`}>{s}</div>
                      {isActive && <div className="text-[11px] text-white/50 mt-0.5">模拟处理中...</div>}
                    </div>
                  </div>
                )
              })}
            </div>
            {selectedFile && mutatedCode && (
              <div className="relative group">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white/80 text-sm font-semibold">测试程序</h4>
                </div>
                <CodePreview
                  code={mutatedCode}
                  language="java"
                  filename={`${(selectedFile?.name?.replace(/\.java$/, '') || 'Seed')}Test.java`}
                  maxHeight={320}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 text-[11px] text-white/40 italic tracking-wide">{PIPELINE_NOTE}</div>
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
      <div className={`grid gap-3 xl:grid-cols-2`}>
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
      {/* 图例已移除 per 要求 */}
    </div>
  )
}
