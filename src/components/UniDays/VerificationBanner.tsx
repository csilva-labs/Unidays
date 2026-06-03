import { useState } from 'react'
import { useFlags } from '../../context/FlagContext'
import VerificationModal from './VerificationModal'

export default function VerificationBanner() {
  const { flags } = useFlags()
  const [modalOpen, setModalOpen] = useState(false)

  if (!flags.showVerificationBanner) return null

  return (
    <>
      <div className="bg-ud-teal/10 border-b border-ud-teal/20 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-inter">
          <span className="text-ud-teal">🎓</span>
          <span className="text-gray-200">
            <span className="font-semibold text-white">Verify your student status</span> to unlock exclusive discounts from 800+ brands
          </span>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-ud-teal text-ud-navy px-4 py-1 rounded-full text-xs font-semibold hover:bg-opacity-90 transition-all flex-shrink-0 ml-4"
        >
          Verify now →
        </button>
      </div>
      {modalOpen && <VerificationModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
