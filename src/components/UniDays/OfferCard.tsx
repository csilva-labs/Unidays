import { useFlags, type BadgeStyleVariant } from '../../context/FlagContext'

interface OfferCardProps {
  brand: string
  emoji: string
  bgClass: string
  description: string
  discount: string
}

function getBadgeStyle(variant: BadgeStyleVariant): string {
  switch (variant) {
    case 'B': return 'bg-ld-pink text-white'
    case 'C': return 'bg-ud-navy text-ud-teal border border-ud-teal/30'
    default: return 'bg-ud-teal text-ud-navy'
  }
}

export default function OfferCard({ brand, emoji, bgClass, description, discount }: OfferCardProps) {
  const { flags } = useFlags()
  const badgeClass = getBadgeStyle(flags.discountBadgeStyle)

  return (
    <div className="bg-ld-card rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer border border-white/5">
      <div className={`${bgClass} h-24 flex items-center justify-center`}>
        <span className="text-4xl">{emoji}</span>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-white font-inter font-semibold text-sm">{brand}</span>
          <span className={`${badgeClass} text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 transition-colors`}>
            {discount}
          </span>
        </div>
        <p className="text-gray-400 text-xs font-inter leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
