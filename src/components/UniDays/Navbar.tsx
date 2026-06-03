import { useState } from 'react'
import VerificationModal from './VerificationModal'

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <nav className="bg-ud-navy px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="font-sora font-800 text-xl tracking-tight">
            <span className="text-white">UNi</span>
            <span className="text-ud-teal font-extrabold">DAYS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Discounts', 'Brands', 'Tech', 'Fashion', 'Food'].map(link => (
              <a
                key={link}
                href="#"
                className="text-gray-300 hover:text-white text-sm font-inter font-medium transition-colors"
                onClick={e => e.preventDefault()}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white border border-white/30 hover:border-white/70 px-4 py-1.5 rounded-full text-sm font-inter font-medium transition-colors">
            Log in
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-ud-teal hover:bg-opacity-90 text-ud-navy px-4 py-1.5 rounded-full text-sm font-inter font-semibold transition-all"
          >
            Verify free
          </button>
        </div>
      </nav>
      {modalOpen && <VerificationModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
