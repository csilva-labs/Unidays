import { useFlags } from '../../context/FlagContext'

export default function AIToast() {
  const { showAIToast, dismissAIToast } = useFlags()

  if (!showAIToast) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
      <div className="bg-ld-card border border-ud-teal/40 rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3 max-w-xs">
        <div className="text-ud-teal text-lg mt-0.5">✨</div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-inter font-semibold leading-tight">AI personalisation active</p>
          <p className="text-gray-400 text-xs mt-0.5 font-inter">Offers ranked for uk_student · back-to-school season</p>
        </div>
        <button onClick={dismissAIToast} className="text-gray-500 hover:text-white text-lg leading-none flex-shrink-0">×</button>
      </div>
    </div>
  )
}
