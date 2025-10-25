import { useEffect, useRef, useState } from 'react'
import GraphPanel from '../components/GraphPanel'
import { Upload, Wand2, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

export default function Demo() {
  const [leftDataUrl, setLeftDataUrl] = useState<string | null>(null)
  const [rightDataUrl, setRightDataUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [mutating, setMutating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const blobUrls = useRef<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // manual JSON input states
  const [seedText, setSeedText] = useState<string>('')
  const [seedPretty, setSeedPretty] = useState<string>('')
  const [mutText, setMutText] = useState<string>('')
  const [mutPretty, setMutPretty] = useState<string>('')
  const [leftSource, setLeftSource] = useState<string>('')
  const [rightSource, setRightSource] = useState<string>('')
  const [seedOpen, setSeedOpen] = useState<boolean>(true)
  const [mutOpen, setMutOpen] = useState<boolean>(true)

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

  async function handleUpload() {
    setError(null)
    if (!selectedFile) {
      setError('请先选择一个 .java 文件再上传')
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', selectedFile)

      // Placeholder endpoint: POST /api/upload-seed
      // Expected responses (frontend is tolerant):
      // 1) { seedJsonUrl: '/graphs/seed-generated.json' }
      // 2) raw graph JSON (object with nodes/edges)
      // 3) { graph: { ... } }
      const res = await fetch('/api/upload-seed', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`upload failed: ${res.status}`)
      const json = await res.json().catch(() => null)
      if (json && typeof json === 'object') {
        if (typeof json.seedJsonUrl === 'string') {
          setLeftDataUrl(json.seedJsonUrl)
          setLeftSource('上传')
        } else if (json.graph) {
          const blob = new Blob([JSON.stringify(json.graph)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          blobUrls.current.push(url)
          setLeftDataUrl(url)
          setLeftSource('上传')
        } else if (json.nodes && json.edges) {
          // assume it's graph JSON directly
          const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          blobUrls.current.push(url)
          setLeftDataUrl(url)
          setLeftSource('上传')
        } else {
          // unexpected shape; treat as error
          throw new Error('上传返回的数据格式不可识别')
        }
      } else {
        throw new Error('上传未返回 JSON 数据')
      }
  // uploaded seed loaded; 双图模式固定，无需切换
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setUploading(false)
    }
  }

  async function handleMutate() {
    setError(null)
    setMutating(true)
    try {
      // Placeholder endpoint: POST /api/trigger-mut
      // We pass the seed URL (if available) so backend can locate the seed
      const body = JSON.stringify({ seedUrl: leftDataUrl ?? undefined })
      const res = await fetch('/api/trigger-mut', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
      if (!res.ok) throw new Error(`mutate failed: ${res.status}`)
      const json = await res.json().catch(() => null)
      if (json && typeof json === 'object') {
        if (typeof json.mutJsonUrl === 'string') {
          setRightDataUrl(json.mutJsonUrl)
          setRightSource('变异')
        } else if (json.graph) {
          const blob = new Blob([JSON.stringify(json.graph)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          blobUrls.current.push(url)
          setRightDataUrl(url)
          setRightSource('变异')
        } else if (json.nodes && json.edges) {
          const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          blobUrls.current.push(url)
          setRightDataUrl(url)
          setRightSource('变异')
        } else {
          throw new Error('变异返回的数据格式不可识别')
        }
      } else {
        throw new Error('变异未返回 JSON 数据')
      }
  // 变异结果已加载
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setMutating(false)
    }
  }

  function setBlobForSide(side: 'left' | 'right', obj: unknown) {
    try {
      const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      blobUrls.current.push(url)
      if (side === 'left') setLeftDataUrl(url)
      else setRightDataUrl(url)
    } catch (e) {
      setError('对象转为 JSON 失败')
    }
  }

  function loadSeedFromText() {
    setError(null)
    try {
      const obj = JSON.parse(seedText)
  setSeedPretty(JSON.stringify(obj, null, 2))
  setBlobForSide('left', obj)
      setLeftSource('手动')
    } catch (e: any) {
      setError('seed JSON 解析失败：' + (e?.message ?? String(e)))
    }
  }

  function loadMutFromText() {
    setError(null)
    try {
      const obj = JSON.parse(mutText)
  setMutPretty(JSON.stringify(obj, null, 2))
  setBlobForSide('right', obj)
      setRightSource('手动')
    } catch (e: any) {
      setError('mut JSON 解析失败：' + (e?.message ?? String(e)))
    }
  }

  async function loadSeedFromExample() {
    // 先让图加载示例 URL，再异步填充预览；即便预览失败，图也能展示
    setLeftDataUrl('/graphs/seed.json')
    setError(null)
    try {
      const res = await fetch('/graphs/seed.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const obj = await res.json()
      const txt = JSON.stringify(obj)
      setSeedText(txt)
      setSeedPretty(JSON.stringify(obj, null, 2))
    } catch (e: any) {
      // 仅影响预览，不影响图
      setSeedText('')
      setSeedPretty('')
    }
    setLeftSource('示例')
  }

  async function loadMutFromExample() {
    // 同上：先显示图，再尝试拉取预览
    setRightDataUrl('/graphs/mut.json')
    setError(null)
    try {
      const res = await fetch('/graphs/mut.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const obj = await res.json()
      const txt = JSON.stringify(obj)
      setMutText(txt)
      setMutPretty(JSON.stringify(obj, null, 2))
    } catch (e: any) {
      setMutText('')
      setMutPretty('')
    }
    setRightSource('示例')
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">功能演示 · JSON → 图</h2>
            <div className="flex items-center gap-3 text-white/70 text-sm">输入 → 渲染 → 对照</div>
          </div>
          <p className="text-sm text-white/60">按步骤加载 seed.json 与 mut.json（可用示例或手动粘贴），下方始终提供左右双图，初始为空，加载后实时呈现。</p>
        </div>
      </div>
      {/* Actions strip */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".java"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <button className="btn" onClick={handleUpload} disabled={uploading}>
              <Upload size={16} /> {uploading ? '上传中...' : '上传 seed (.java)'}
            </button>
            <button className="btn btn-primary" onClick={handleMutate} disabled={mutating}>
              <Wand2 size={16} /> {mutating ? '变异进行中...' : 'InterFuzz 变异'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn"
              onClick={() => {
                setLeftDataUrl(null)
                setRightDataUrl(null)
                setSeedText('')
                setSeedPretty('')
                setMutText('')
                setMutPretty('')
                setLeftSource('')
                setRightSource('')
              }}
            >
              <Trash2 size={16} /> 清空
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-rose-400 mt-2">错误：{error}</p>}
      </div>
      {/* Steps: Seed & Mut */}
      <div className={`grid gap-3 xl:grid-cols-2`}>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button className="btn-ghost p-1" onClick={() => setSeedOpen((v) => !v)} aria-label="展开/折叠">
                {seedOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <h3 className="font-semibold text-white">步骤 1 · Seed JSON</h3>
              {leftSource && <span className="badge">来源：{leftSource}</span>}
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={loadSeedFromExample}>示例 seed.json</button>
              <button className="btn btn-primary" onClick={loadSeedFromText}>加载 JSON</button>
            </div>
          </div>
          {seedOpen && (
            <>
              <textarea
                className="w-full h-40 textarea"
                placeholder="粘贴 seed.json 内容（包含 nodes/edges）"
                value={seedText}
                onChange={(e) => setSeedText(e.target.value)}
              />
              {seedPretty && (
                <div className="mt-2">
                  <p className="text-xs text-white/60 mb-1">解析预览：</p>
                  <pre className="max-h-60 overflow-auto bg-black/40 rounded p-2 text-xs whitespace-pre-wrap">{seedPretty}</pre>
                </div>
              )}
            </>
          )}
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button className="btn-ghost p-1" onClick={() => setMutOpen((v) => !v)} aria-label="展开/折叠">
                {mutOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <h3 className="font-semibold text-white">步骤 2 · Mut JSON</h3>
              {rightSource && <span className="badge">来源：{rightSource}</span>}
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={loadMutFromExample}>示例 mut.json</button>
              <button className="btn btn-primary" onClick={loadMutFromText}>加载 JSON</button>
            </div>
          </div>
          {mutOpen && (
            <>
              <textarea
                className="w-full h-40 textarea"
                placeholder="粘贴 mut.json 内容（包含 nodes/edges）"
                value={mutText}
                onChange={(e) => setMutText(e.target.value)}
              />
              {mutPretty && (
                <div className="mt-2">
                  <p className="text-xs text-white/60 mb-1">解析预览：</p>
                  <pre className="max-h-60 overflow-auto bg-black/40 rounded p-2 text-xs whitespace-pre-wrap">{mutPretty}</pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70">渲染结果</div>
          <div className="h-px flex-1 mx-3 bg-white/10" />
          <div className="text-xs text-white/50">双图对照 · 左 Seed / 右 Mut</div>
        </div>
      </div>
      {/* Graphs: 双图固定并排，初始为空 */}
      <div className={`grid gap-3 xl:grid-cols-2`}>
        <GraphPanel
          dataUrl={effectiveLeftUrl}
          height={600}
          title={'原始图'}
          subtitle={leftSource ? `来源：${leftSource}` : undefined}
        />
        <GraphPanel
          dataUrl={effectiveRightUrl}
          height={600}
          title="增强图"
          subtitle={rightSource ? `来源：${rightSource}` : undefined}
        />
      </div>
      <div className="card text-sm text-white/70">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-white/80">图例</p>
            <ul className="list-disc list-inside mt-1">
              <li>线型：solid / dashed / dotted</li>
              <li>箭头：marker=arrow 表示方向</li>
              <li>标签：instantiate / call / implement / extend</li>
            </ul>
          </div>
          <div className="text-right text-white/50">网格布局 · 端口连线 · 固定标签距离</div>
        </div>
      </div>
    </div>
  )
}
