import { useFlags } from '../../context/FlagContext'
import OfferCard from './OfferCard'

const allOffers = [
  {
    id: 'apple',
    brand: 'Apple',
    emoji: '🍎',
    bgClass: 'bg-gradient-to-br from-gray-700 to-gray-900',
    description: 'Education pricing on Mac, iPad and more',
    discount: 'Up to 20% off',
  },
  {
    id: 'nike',
    brand: 'Nike',
    emoji: '👟',
    bgClass: 'bg-gradient-to-br from-orange-600 to-red-700',
    description: 'Exclusive student discount on footwear',
    discount: '10% off',
  },
  {
    id: 'asos',
    brand: 'ASOS',
    emoji: '👗',
    bgClass: 'bg-gradient-to-br from-pink-600 to-purple-700',
    description: 'Fashion and accessories for students',
    discount: '15% off',
  },
  {
    id: 'spotify',
    brand: 'Spotify',
    emoji: '🎵',
    bgClass: 'bg-gradient-to-br from-green-600 to-emerald-800',
    description: 'Premium music streaming at student price',
    discount: '50% off',
  },
  {
    id: 'amazon',
    brand: 'Amazon',
    emoji: '📦',
    bgClass: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    description: 'Prime membership + fast delivery',
    discount: '6 mo free',
  },
  {
    id: 'microsoft',
    brand: 'Microsoft',
    emoji: '💻',
    bgClass: 'bg-gradient-to-br from-blue-600 to-blue-800',
    description: 'Office 365 and Azure for students',
    discount: 'Free',
  },
]

export default function OfferGrid() {
  const { flags } = useFlags()

  const visibleOffers = flags.applePromotionEnabled
    ? allOffers
    : allOffers.filter(o => o.id !== 'apple')

  const sectionTitle = flags.aiOfferRanking
    ? 'AI-ranked offers for you'
    : 'Top student deals'

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-sora font-bold text-base">
          {sectionTitle}
        </h2>
        {flags.aiOfferRanking && (
          <span className="text-ud-teal text-xs font-inter bg-ud-teal/10 px-2 py-0.5 rounded-full">
            ✨ Personalised
          </span>
        )}
      </div>

      {!flags.applePromotionEnabled && (
        <div
          className="mb-3 bg-lime-400/10 border border-lime-400/30 rounded-lg px-4 py-2.5 text-lime-400 text-xs font-inter animate-fade-in"
          style={{ animationDuration: '0.2s' }}
        >
          ⚡ Apple promotion hidden — 0ms propagation across all 8M users
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {visibleOffers.map(offer => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>
    </div>
  )
}
