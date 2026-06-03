import { useState } from 'react'
import { useFlags, type LDStatus } from '../../context/FlagContext'
import FeatureFlagsTab from './FeatureFlagsTab'
import ExperimentsTab from './ExperimentsTab'
import AIConfigsTab from './AIConfigsTab'
import ObserveTab from './ObserveTab'

type Tab = 'flags' | 'experiments' | 'ai' | 'observe'

const tabs: { id: Tab; label: string }[] = [
  { id: 'flags', label: 'Feature Flags' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'ai', label: 'AI Configs' },
  { id: 'observe', label: 'Observe' },
]

function LDLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#405BFF" />
      <path d="M8 8h4v12H8V8zm6 0h6l-4 6 4 6h-6l-4-6 4-6z" fill="white" />
    </svg>
  )
}

const statusConfig: Record<LDStatus, { dot: string; label: string; pulse: boolean }> = {
  disconnected: { dot: 'bg-gray-500', label: 'Demo mode', pulse: false },
  connecting:   { dot: 'bg-yellow-400', label: 'Connecting…', pulse: true },
  connected:    { dot: 'bg-ld-lime', label: 'Live', pulse: true },
  error:        { dot: 'bg-ld-pink', label: 'Error', pulse: false },
}

function ConnectSection() {
  const { ldStatus, ldClientSideId, connectLD, disconnectLD } = useFlags()
  const [input, setInput] = useState(ldClientSideId)
  const [expanded, setExpanded] = useState(ldStatus === 'disconnected' && !ldClientSideId)

  function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) {
      connectLD(input.trim())
      setExpanded(false)
    }
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="text-xs font-inter text-gray-500 hover:text-ld-cyan transition-colors underline decoration-dotted"
      >
        {ldStatus === 'connected' ? `Connected · ${ldClientSideId.slice(0, 12)}…` : 'Connect to project →'}
      </button>
    )
  }

  return (
    <form onSubmit={handleConnect} className="mt-2 flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Client-side ID (e.g. 64a3f…)"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full bg-ld-surface border border-ld-border rounded-lg px-3 py-2 text-white text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-ld-cyan"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!input.trim() || ldStatus === 'connecting'}
          className="flex-1 bg-ld-blue hover:bg-ld-blue/80 disabled:opacity-50 text-white text-xs font-inter font-semibold py-1.5 rounded-lg transition-colors"
        >
          {ldStatus === 'connecting' ? 'Connecting…' : 'Connect'}
        </button>
        {ldStatus === 'connected' && (
          <button
            type="button"
            onClick={() => { disconnectLD(); setInput(''); setExpanded(false) }}
            className="px-3 bg-ld-surface border border-ld-border hover:border-ld-pink text-gray-400 hover:text-ld-pink text-xs font-inter rounded-lg transition-colors"
          >
            Disconnect
          </button>
        )}
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="px-3 bg-ld-surface border border-ld-border text-gray-400 hover:text-white text-xs font-inter rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
      {ldStatus === 'error' && (
        <p className="text-ld-pink text-xs font-inter">
          Could not connect — check your Client-side ID.
        </p>
      )}
    </form>
  )
}

export default function LDPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('flags')
  const { ldStatus } = useFlags()
  const sc = statusConfig[ldStatus]

  return (
    <div className="h-full flex flex-col bg-ld-bg border-l border-ld-border">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-ld-border flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <LDLogo />
            <span className="font-sora font-bold text-white text-base">LaunchDarkly</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
            ldStatus === 'connected'
              ? 'bg-ld-lime/10 border-ld-lime/30'
              : ldStatus === 'error'
              ? 'bg-ld-pink/10 border-ld-pink/30'
              : ldStatus === 'connecting'
              ? 'bg-yellow-400/10 border-yellow-400/30'
              : 'bg-white/5 border-white/10'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${sc.pulse ? 'animate-pulse' : ''}`} />
            <span className={`text-xs font-inter font-semibold ${
              ldStatus === 'connected' ? 'text-ld-lime'
              : ldStatus === 'error' ? 'text-ld-pink'
              : ldStatus === 'connecting' ? 'text-yellow-400'
              : 'text-gray-400'
            }`}>{sc.label}</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs font-inter mt-0.5">UNiDAYS · Production · uk-gb-students</p>
        <div className="mt-2">
          <ConnectSection />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-3 pt-3 gap-1 flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-inter font-semibold rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-ld-blue text-white'
                : 'text-gray-400 hover:text-white hover:bg-ld-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto dark-scroll p-4">
        {activeTab === 'flags' && <FeatureFlagsTab />}
        {activeTab === 'experiments' && <ExperimentsTab />}
        {activeTab === 'ai' && <AIConfigsTab />}
        {activeTab === 'observe' && <ObserveTab />}
      </div>
    </div>
  )
}
