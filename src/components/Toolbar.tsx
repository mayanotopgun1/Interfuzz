interface Props {
  dataset: 'seed' | 'mut'
  onDatasetChange: (v: 'seed' | 'mut') => void
  compare: boolean
  onCompareChange: (v: boolean) => void
  labelDistance: number
  onLabelDistanceChange: (v: number) => void
  onResetLeft: () => void
  onResetRight: () => void
}

export default function Toolbar(props: Props) {
  const {
    dataset,
    onDatasetChange,
    compare,
    onCompareChange,
    labelDistance,
    onLabelDistanceChange,
    onResetLeft,
    onResetRight,
  } = props

  return (
    <div className="card flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2" role="group" aria-label="数据切换">
        <label className="inline-flex items-center gap-1">
          <input
            type="radio"
            name="dataset"
            value="seed"
            checked={dataset === 'seed'}
            onChange={() => onDatasetChange('seed')}
          />
          Seed
        </label>
        <label className="inline-flex items-center gap-1">
          <input
            type="radio"
            name="dataset"
            value="mut"
            checked={dataset === 'mut'}
            onChange={() => onDatasetChange('mut')}
          />
          Mut
        </label>
        <label className="inline-flex items-center gap-1 ml-4">
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => onCompareChange(e.target.checked)}
            aria-label="并排对比"
          />
          并排对比
        </label>
      </div>

      <div className="flex items-center gap-2" aria-label="标签距离">
        <label htmlFor="labelDistance" className="text-sm text-white/70">
          labelDistanceFromSource
        </label>
        <input
          id="labelDistance"
          type="range"
          min={20}
          max={160}
          value={labelDistance}
          onChange={(e) => onLabelDistanceChange(Number(e.target.value))}
        />
        <span className="text-sm text-white/70 w-10">{labelDistance}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="btn" onClick={onResetLeft} aria-label="重置左图">重置左图</button>
        <button className="btn" onClick={onResetRight} aria-label="重置右图">重置右图</button>
      </div>
    </div>
  )
}
