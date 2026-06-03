import { useState } from 'react'
import { useFlags, type LDStatus } from '../../context/FlagContext'

function LDLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#405BFF" />
      <path d="M8 8h4v12H8V8zm6 0h6l-4 6 4 6h-6l-4-6 4-6z" fill="white" />
    </svg>
  )
}

const statusConfig: Record<LDStatus, { dot: string; label: string; pulse: boolean; text: string }> = {
  disconnected: { dot: 'bg-gray-500',   label: 'Not connected', pulse: false, text: 'text-gray-400' },
  connecting:   { dot: 'bg-yellow-400', label: 'Connecting…',   pulse: true,  text: 'text-yellow-400' },
  connected:    { dot: 'bg-ld-lime',    label: 'Connected',     pulse: true,  text: 'text-ld-lime' },
  error:        { dot: 'bg-ld-pink',    label: 'Invalid key',   pulse: false, text: 'text-ld-pink' },
}

export default function LDPanel() {
  const { ldStatus, ldClientSideId, connectLD, disconnectLD, evalLog } = useFlags()
  const [input, setInput] = useState(ldClientSideId)
  const sc = statusConfig[ldStatus]

  function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) connectLD(input.trim())
  }

  return (
    <div className="h-full flex flex-col bg-ld-bg border-l border-ld-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-ld-border flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-4">
          <LDLogo />
          <span className="font-sora font-bold text-white text-base">LaunchDarkly</span>
        </div>

        {/* Client-side ID input */}
        <form onSubmit={handleConnect} className="space-y-2">
          <label className="text-gray-400 text-xs font-inter font-medium block">
            Client-side ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your client-side ID…"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 min-w-0 bg-ld-surface border border-ld-border rounded-lg px-3 py-2 text-white text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-ld-cyan transition-colors"
            />
            {ldStatus === 'connected' ? (
              <button
                type="button"
                onClick={() => { disconnectLD(); setInput('') }}
                className="flex-shrink-0 px-3 py-2 bg-ld-surface border border-ld-border hover:border-ld-pink text-gray-400 hover:text-ld-pink text-xs font-inter font-semibold rounded-lg transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || ldStatus === 'connecting'}
                className="flex-shrink-0 px-4 py-2 bg-ld-blue hover:bg-ld-blue/80 disabled:opacity-40 text-white text-xs font-inter font-semibold rounded-lg transition-colors"
              >
                {ldStatus === 'connecting' ? 'Connecting…' : 'Connect'}
              </button>
            )}
          </div>

          {/* Status row */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot} ${sc.pulse ? 'animate-pulse' : ''}`} />
            <span className={`text-xs font-inter ${sc.text}`}>{sc.label}</span>
            {ldStatus === 'connected' && (
              <span className="text-gray-600 text-xs font-mono ml-1 truncate">
                · {ldClientSideId.slice(0, 16)}…
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Eval log */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-5 py-3 border-b border-ld-border flex items-center justify-between flex-shrink-0">
          <p className="text-gray-400 text-xs font-inter font-semibold uppercase tracking-wider">Evaluation log</p>
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${ldStatus === 'connected' ? 'bg-ld-lime animate-pulse' : 'bg-gray-600'}`} />
            <span className={`text-xs font-inter ${ldStatus === 'connected' ? 'text-ld-lime' : 'text-gray-600'}`}>
              {ldStatus === 'connected' ? 'live' : 'demo'}
            </span>
          </span>
        </div>
        <div className="flex-1 overflow-y-auto dark-scroll p-4 font-mono text-xs space-y-1.5">
          {evalLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 leading-relaxed">
              <span className="text-gray-600 flex-shrink-0">[{entry.ts}]</span>
              <span className={`font-semibold flex-shrink-0 ${entry.source === 'ld' ? 'text-ld-lime' : 'text-ld-blue'}`}>
                {entry.source === 'ld' ? 'LD' : 'LOCAL'}
              </span>
              <span className="text-ld-cyan break-all">{entry.flag}</span>
              <span className="text-gray-500 flex-shrink-0">→</span>
              <span className="text-white flex-shrink-0">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
