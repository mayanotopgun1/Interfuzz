import React from 'react'

interface Connector { from: string; to: string; label: string }

interface PipelineFlowProps {
  coreSteps: string[]
  connectors: Connector[]
  active?: string | null
  completed?: Set<string>
  className?: string
}

// A compact horizontal pipeline visual: Core steps are nodes; connectors are inline tagged operations.
// Styling focuses on readability and progressive emphasis (active glow, completed gradient, pending subtle).
export const PipelineFlow: React.FC<PipelineFlowProps> = ({ coreSteps, connectors, active, completed, className }) => {
  const isCompleted = (label: string) => completed?.has(label)
  const isActive = (label: string) => active === label

  return (
    <div className={"w-full flex items-stretch gap-0 select-none " + (className || '')} aria-label="Pipeline Overview">
      {coreSteps.map((core, idx) => {
        const next = coreSteps[idx + 1]
        const connector = connectors.find(c => c.from === core && c.to === next)
        const baseCore = core.replace(/ \(.*\)$/,'')
        const coreState = isActive(core) ? 'active' : isCompleted(core) ? 'done' : 'pending'
        const connectorState = connector ? (isActive(connector.label) ? 'active' : isCompleted(connector.label) ? 'done' : 'pending') : 'pending'
        return (
          <div key={core} className="flex items-center flex-1 min-w-0">
            {/* Core node */}
            <div className="flex flex-col items-center gap-1 min-w-[82px]">
              <div
                className={
                  'px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-colors ' +
                  (coreState==='active' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-800/30' :
                   coreState==='done' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                   'bg-white/5 text-white/55 border border-white/10')
                }
              >{baseCore}</div>
              <div className={
                'w-2 h-2 rounded-full ' +
                (coreState==='active' ? 'bg-sky-400 animate-pulse' : coreState==='done' ? 'bg-emerald-400' : 'bg-white/25')
              } />
            </div>
            {/* Connector line + tag */}
            {next && (
              <div className="flex-1 flex items-center mx-1 relative h-10">
                <div className="h-px w-full bg-gradient-to-r from-white/15 to-white/5" />
                {connector && (
                  <div
                    className={
                      'absolute left-1/2 -translate-x-1/2 -top-3 px-2 py-0.5 rounded-full border text-[10px] backdrop-blur-sm whitespace-nowrap ' +
                      (connectorState==='active' ? 'bg-sky-500/25 border-sky-400/40 text-sky-300' :
                       connectorState==='done' ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' :
                       'bg-white/6 border-white/10 text-white/50')
                    }
                  >{connector.label}</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PipelineFlow
