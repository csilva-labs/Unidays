import { useState } from 'react'
import { useFlags } from '../../context/FlagContext'
import VerificationModal from './VerificationModal'

const ctaLabels: Record<string, string> = {
  control: 'Get verified free',
  B: 'Claim your student discounts',
  C: 'Unlock 800+ brand deals',
}

export default function HeroSection() {
  const { flags } = useFlags()
  const [modalOpen, setModalOpen] = useState(false)

  const ctaText = ctaLabels[flags.heroCTAVariant] ?? ctaLabels.control

  return (
    <>
      <div className="bg-ud-navy px-6 py-10 text-center">
        <p className="text-ud-teal text-xs font-inter font-semibold uppercase tracking-widest mb-3">
          Student discounts · Verified in 60 seconds
        </p>
        <h1 className="font-sora font-extrabold text-white text-3xl md:text-4xl leading-tight mb-4">
          Save more on the brands<br />
          <span className="text-ud-teal">students actually love</span>
        </h1>
        <p className="text-gray-400 font-inter text-base mb-8 max-w-md mx-auto">
          Join 22 million students worldwide. Instant access to exclusive deals on tech, fashion, food and more.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-ud-teal hover:bg-opacity-90 text-ud-navy px-6 py-3 rounded-full font-inter font-bold text-sm transition-all shadow-lg shadow-ud-teal/20"
          >
            {ctaText}
          </button>
          <button className="border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-full font-inter font-medium text-sm transition-colors">
            Browse deals
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-4 font-inter">
          No credit card required · 800+ brands · Updated daily
        </p>
      </div>
      {modalOpen && <VerificationModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
