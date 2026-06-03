import { useState } from 'react'
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

export default function LDPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('flags')

  return (
    <div className="h-full flex flex-col bg-ld-bg border-l border-ld-border">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-ld-border flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <LDLogo />
            <span className="font-sora font-bold text-white text-base">LaunchDarkly</span>
          </div>
          <div className="flex items-center gap-1.5 bg-ld-lime/10 border border-ld-lime/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-ld-lime animate-pulse" />
            <span className="text-ld-lime text-xs font-inter font-semibold">Live</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs font-inter mt-1">UNiDAYS · Production · uk-gb-students</p>
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
