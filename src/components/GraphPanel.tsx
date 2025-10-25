import { useEffect, useRef, useState } from 'react'
import GraphViewer, { GraphViewerHandle } from './GraphViewer'

interface GraphPanelProps {
  dataUrl?: string | null
  labelDistance?: number
  height?: number
  title?: string
  resetSignal?: number
  subtitle?: string
}

export default function GraphPanel({ dataUrl, labelDistance, height = 420, title, resetSignal, subtitle }: GraphPanelProps) {
  const gvRef = useRef<GraphViewerHandle>(null)
  const gvFsRef = useRef<GraphViewerHandle>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [localReset, setLocalReset] = useState(0)
  const [ld, setLd] = useState<number>(labelDistance ?? 80)
  const fullscreenGraphHeight = typeof window !== 'undefined'
    ? Math.round(Math.min(window.innerHeight * 0.75, 720))
    : 600

  useEffect(() => {
    if (typeof labelDistance === 'number') setLd(labelDistance)
  }, [labelDistance])

  // close fullscreen on ESC when open
  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen])

  const doReset = () => {
    if (gvRef.current) gvRef.current.reset()
    else setLocalReset((v) => v + 1)
  }
  const doResetFs = () => {
    if (gvFsRef.current) gvFsRef.current.reset()
  }

  const Controls = (
    <div className="absolute top-3 right-3 z-10 flex gap-2">
      <button className="w-9 h-9 rounded-md bg-sky-600 text-white grid place-items-center hover:bg-sky-500" aria-label="放大" onClick={() => gvRef.current?.zoomIn()}>+</button>
      <button className="w-9 h-9 rounded-md bg-sky-600 text-white grid place-items-center hover:bg-sky-500" aria-label="缩小" onClick={() => gvRef.current?.zoomOut()}>−</button>
      <button className="w-9 h-9 rounded-md bg-sky-600 text-white grid place-items-center hover:bg-sky-500" aria-label="重置" onClick={doReset}>⤾</button>
      <button className="w-9 h-9 rounded-md bg-sky-600 text-white grid place-items-center hover:bg-sky-500" aria-label="全屏" onClick={() => setFullscreen(true)}>⛶</button>
    </div>
  )

  const LeftControls = (
    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
      <span className="text-[11px] text-white/70">labelDistance</span>
      <input
        type="range"
        min={20}
        max={160}
        value={ld}
        onChange={(e) => setLd(Number(e.target.value))}
      />
      <span className="text-[11px] text-white/70 w-8 text-right">{ld}</span>
    </div>
  )

  return (
    <div className="relative w-full border border-white/10 rounded-lg bg-white/5 overflow-hidden">
      {(title || subtitle) && (
        <div className="px-3 py-2 text-sm text-white/80 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div>{title}</div>
          {subtitle ? <span className="badge">{subtitle}</span> : <span />}
        </div>
      )}
      <div className="relative">
        {Controls}
        {LeftControls}
        {dataUrl ? (
          <GraphViewer ref={gvRef} dataUrl={dataUrl} labelDistance={ld} height={height} resetSignal={resetSignal ?? localReset} />
        ) : (
          <div className="grid place-items-center" style={{ height }}>
            <div className="text-white/50 text-sm">尚未加载 JSON 数据</div>
          </div>
        )}
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-label="图全屏查看"
          aria-modal="true"
          onClick={() => setFullscreen(false)}
        >
          <div
            className="w-full max-w-7xl max-h-[90vh] bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="text-white/90 font-medium">全屏查看</div>
              <div className="flex gap-2">
                <div className="hidden md:flex items-center gap-2 bg-black/20 px-2 py-1 rounded-md border border-white/10">
                  <span className="text-xs text-white/70">labelDistance</span>
                  <input
                    type="range"
                    min={20}
                    max={160}
                    value={ld}
                    onChange={(e) => setLd(Number(e.target.value))}
                  />
                  <span className="text-xs text-white/70 w-8 text-right">{ld}</span>
                </div>
                <button className="px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-500" onClick={() => gvFsRef.current?.zoomIn()}>放大</button>
                <button className="px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-500" onClick={() => gvFsRef.current?.zoomOut()}>缩小</button>
                <button className="px-3 py-1.5 rounded-md bg-sky-600 text-white hover:bg-sky-500" onClick={doResetFs}>重置</button>
                <button className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-500" onClick={() => setFullscreen(false)}>关闭</button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="min-h-[60vh]">
                {dataUrl ? (
                  <GraphViewer ref={gvFsRef} dataUrl={dataUrl} labelDistance={ld} height={fullscreenGraphHeight} />
                ) : (
                  <div className="grid place-items-center h-[60vh] text-white/50 text-sm">暂无数据</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
