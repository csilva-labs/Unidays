interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  size?: 'sm' | 'md'
}

export default function Toggle({ checked, onChange, size = 'md' }: ToggleProps) {
  const trackW = size === 'sm' ? 'w-8' : 'w-10'
  const trackH = size === 'sm' ? 'h-4' : 'h-5'
  const thumbSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  const thumbTranslate = size === 'sm' ? 'translate-x-4' : 'translate-x-5'

  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center ${trackW} ${trackH} rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ld-cyan ${
        checked ? 'bg-ld-cyan' : 'bg-ld-border'
      }`}
    >
      <span
        className={`${thumbSize} bg-white rounded-full transform transition-transform ${
          checked ? thumbTranslate : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
