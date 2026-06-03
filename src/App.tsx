import { useState } from 'react'
import { FlagProvider } from './context/FlagContext'
import UniDaysPanel from './components/UniDays/UniDaysPanel'
import LDPanel from './components/LDPanel/LDPanel'

export default function App() {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <FlagProvider>
      <div className="flex h-screen w-screen overflow-hidden relative">
        <div className="flex-1 min-w-0 overflow-hidden">
          <UniDaysPanel />
        </div>

        {/* Slide-in LD panel */}
        <div
          className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
            panelOpen ? 'w-[480px]' : 'w-0'
          }`}
        >
          <div className="w-[480px] h-full">
            <LDPanel />
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setPanelOpen(p => !p)}
          className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-ld-blue hover:bg-ld-blue/80 text-white text-xs font-inter font-semibold px-3 py-2 rounded-full shadow-lg transition-all"
          title={panelOpen ? 'Hide LaunchDarkly panel' : 'Open LaunchDarkly panel'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect width="14" height="14" rx="3" fill="white" fillOpacity="0.2" />
            <path d="M3 3h3v8H3V3zm4 0h4l-2.5 4 2.5 4H7L4.5 7 7 3z" fill="white" />
          </svg>
          {panelOpen ? 'Hide panel' : 'LaunchDarkly'}
        </button>
      </div>
    </FlagProvider>
  )
}
