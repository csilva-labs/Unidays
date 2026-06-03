import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function VerificationModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ email: '', university: '', year: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(onClose, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-ld-card rounded-2xl p-6 w-full max-w-sm mx-4 border border-white/10 shadow-2xl">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-white font-sora font-bold text-lg">Verify your student status</h2>
            <p className="text-gray-400 text-sm font-inter mt-1">Unlock 800+ exclusive student discounts</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none mt-0.5">×</button>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-white font-semibold font-inter">Verification email sent!</p>
            <p className="text-gray-400 text-sm mt-1">Check your inbox to confirm your status.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 text-xs font-inter font-medium block mb-1">University email</label>
              <input
                type="email"
                placeholder="you@university.ac.uk"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-ld-surface border border-ld-border rounded-lg px-3 py-2.5 text-white text-sm font-inter placeholder-gray-500 focus:outline-none focus:border-ud-teal transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs font-inter font-medium block mb-1">University name</label>
              <input
                type="text"
                placeholder="University of Edinburgh"
                value={form.university}
                onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                className="w-full bg-ld-surface border border-ld-border rounded-lg px-3 py-2.5 text-white text-sm font-inter placeholder-gray-500 focus:outline-none focus:border-ud-teal transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs font-inter font-medium block mb-1">Expected graduation year</label>
              <input
                type="text"
                placeholder="2026"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                className="w-full bg-ld-surface border border-ld-border rounded-lg px-3 py-2.5 text-white text-sm font-inter placeholder-gray-500 focus:outline-none focus:border-ud-teal transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ud-teal text-ud-navy font-inter font-bold py-3 rounded-full hover:bg-opacity-90 transition-all mt-2"
            >
              Send verification email
            </button>
            <p className="text-gray-500 text-xs text-center font-inter">
              Free forever · No credit card required
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
