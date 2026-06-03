import { useState, useEffect } from 'react'
import { useFlags } from '../../context/FlagContext'

function jitter(base: number, range: number): number {
  return +(base + (Math.random() * 2 - 1) * range).toFixed(1)
}

interface MetricCardProps {
  label: string
  value: string
  delta: string
  positive?: boolean
}

function MetricCard({ label, value, delta, positive = true }: MetricCardProps) {
  return (
    <div className="bg-ld-card rounded-xl p-3 border border-ld-border">
      <p className="text-gray-400 text-xs font-inter mb-1">{label}</p>
      <p className="text-white font-sora font-bold text-lg leading-none">{value}</p>
      <p className={`text-xs font-inter mt-1 ${positive ? 'text-ld-lime' : 'text-ld-pink'}`}>{delta}</p>
    </div>
  )
}

export default function ObserveTab() {
  const { evalLog } = useFlags()
  const [metrics, setMetrics] = useState({
    verifications: 1284,
    redemption: 9.4,
    flagEvals: 24.7,
    sessions: 83,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        verifications: Math.round(jitter(prev.verifications, 15)),
        redemption: +jitter(prev.redemption, 0.1).toFixed(1),
        flagEvals: +jitter(prev.flagEvals, 0.3).toFixed(1),
        sessions: Math.round(jitter(prev.sessions, 1)),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Verifications/hr"
          value={metrics.verifications.toLocaleString()}
          delta="↑18% vs last hour"
        />
        <MetricCard
          label="Redemption rate"
          value={`${metrics.redemption}%`}
          delta="↑1.2pp vs baseline"
        />
        <MetricCard
          label="Flag evaluations/s"
          value={`${metrics.flagEvals}K`}
          delta="p99 <2ms"
        />
        <MetricCard
          label="Active sessions"
          value={`${metrics.sessions}K`}
          delta="↑34% (B2S spike)"
        />
      </div>

      {/* Eval log */}
      <div className="bg-ld-card rounded-xl border border-ld-border overflow-hidden">
        <div className="px-4 py-2.5 border-b border-ld-border flex items-center justify-between">
          <p className="text-gray-300 text-xs font-inter font-semibold">Evaluation log</p>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ld-lime animate-pulse" />
            <span className="text-ld-lime text-xs font-inter">live</span>
          </span>
        </div>
        <div className="p-3 max-h-40 overflow-y-auto dark-scroll font-mono text-xs space-y-1">
          {evalLog.map((entry, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400 leading-relaxed">
              <span className="text-gray-600">[{entry.ts}]</span>
              <span className="text-ld-blue font-semibold">EVAL</span>
              <span className="text-ld-cyan">{entry.flag}</span>
              <span className="text-gray-500">→</span>
              <span className="text-white">{entry.value}</span>
              <span className="text-gray-600">(ctx: {entry.ctx})</span>
            </div>
          ))}
        </div>
      </div>

      {/* SDK health */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <p className="text-gray-400 text-xs font-inter font-semibold uppercase tracking-wider mb-3">SDK health</p>
        <div className="space-y-2">
          {[
            { label: 'Error rate', value: '0.001%', color: 'text-ld-lime' },
            { label: 'SDK streaming', value: 'connected', color: 'text-ld-lime' },
            { label: 'Relay proxy', value: 'healthy · 3 nodes', color: 'text-ld-lime' },
            { label: 'Last flag change', value: 'just now', color: 'text-ld-cyan' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-inter">{label}</span>
              <span className={`text-xs font-inter font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
