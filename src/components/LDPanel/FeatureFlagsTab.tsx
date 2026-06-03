import { useFlags, type HeroCTAVariant, type BadgeStyleVariant } from '../../context/FlagContext'
import Toggle from './Toggle'

const tagColors: Record<string, string> = {
  Release: 'bg-ld-blue/20 text-ld-blue',
  Experiment: 'bg-ld-purple/20 text-ld-purple',
  AI: 'bg-ld-cyan/20 text-ld-cyan',
  'Kill switch': 'bg-ld-pink/20 text-ld-pink',
}

interface FlagCardProps {
  flagKey: string
  name: string
  description: string
  tag: string
  children: React.ReactNode
}

function FlagCard({ flagKey, name, description, tag, children }: FlagCardProps) {
  return (
    <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <code className="text-ld-cyan text-xs font-mono">{flagKey}</code>
          <p className="text-white text-sm font-inter font-semibold mt-0.5">{name}</p>
          <p className="text-gray-400 text-xs font-inter mt-0.5 leading-relaxed">{description}</p>
        </div>
        <span className={`text-xs font-inter font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${tagColors[tag] ?? ''}`}>
          {tag}
        </span>
      </div>
      {children}
    </div>
  )
}

export default function FeatureFlagsTab() {
  const { flags, setFlag } = useFlags()

  return (
    <div className="space-y-3">
      {/* Context card */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <p className="text-gray-400 text-xs font-inter font-semibold uppercase tracking-wider mb-3">Context</p>
        <div className="space-y-1.5">
          {[
            { k: 'user.key', v: 'stu_8m_anon' },
            { k: 'user.verified', v: 'false' },
            { k: 'user.country', v: 'GB' },
            { k: 'env', v: 'production' },
            { k: 'session.season', v: 'back-to-school' },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-mono">{k}</span>
              <span className="text-ld-cyan text-xs font-mono">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flag 1: show-verification-banner */}
      <FlagCard
        flagKey="show-verification-banner"
        name="Verification nudge banner"
        description="Shows a teal banner below the nav prompting students to verify their status."
        tag="Release"
      >
        <div className="flex items-center gap-3 mt-3">
          <Toggle
            checked={flags.showVerificationBanner}
            onChange={v => setFlag('showVerificationBanner', v)}
          />
          <span className={`text-xs font-inter font-semibold ${flags.showVerificationBanner ? 'text-ld-cyan' : 'text-gray-500'}`}>
            {flags.showVerificationBanner ? 'ON' : 'OFF'}
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400 text-xs font-inter">Percentage rollout</span>
            <span className="text-white text-xs font-inter font-semibold">{flags.verificationBannerRollout}%</span>
          </div>
          <div className="relative">
            <div className="w-full h-1.5 bg-ld-surface rounded-full">
              <div
                className="h-full bg-ld-cyan rounded-full transition-all"
                style={{ width: `${flags.verificationBannerRollout}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={flags.verificationBannerRollout}
              onChange={e => setFlag('verificationBannerRollout', Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </FlagCard>

      {/* Flag 2: ai-personalised-announcement */}
      <FlagCard
        flagKey="ai-personalised-announcement"
        name="AI personalised announcement"
        description="Shows an AI-generated announcement bar above the nav. Fires AI toast notification on enable."
        tag="AI"
      >
        <div className="flex items-center gap-3 mt-3">
          <Toggle
            checked={flags.aiPersonalisedAnnouncement}
            onChange={v => setFlag('aiPersonalisedAnnouncement', v)}
          />
          <span className={`text-xs font-inter font-semibold ${flags.aiPersonalisedAnnouncement ? 'text-ld-cyan' : 'text-gray-500'}`}>
            {flags.aiPersonalisedAnnouncement ? 'ON' : 'OFF'}
          </span>
        </div>
      </FlagCard>

      {/* Flag 3: hero-cta-variant */}
      <FlagCard
        flagKey="hero-cta-variant"
        name="Hero CTA copy variant"
        description="Controls the primary CTA button text in the hero section. Part of the CTA copy A/B test."
        tag="Experiment"
      >
        <div className="mt-3">
          <select
            value={flags.heroCTAVariant}
            onChange={e => setFlag('heroCTAVariant', e.target.value as HeroCTAVariant)}
            className="w-full bg-ld-surface border border-ld-border text-white text-xs font-inter rounded-lg px-3 py-2 focus:outline-none focus:border-ld-cyan"
          >
            <option value="control">Control: "Get verified free"</option>
            <option value="B">B: "Claim your student discounts"</option>
            <option value="C">C: "Unlock 800+ brand deals"</option>
          </select>
        </div>
      </FlagCard>

      {/* Flag 4: discount-badge-style */}
      <FlagCard
        flagKey="discount-badge-style"
        name="Discount badge colour"
        description="Controls the colour of discount badge pills across all offer cards."
        tag="Experiment"
      >
        <div className="mt-3">
          <select
            value={flags.discountBadgeStyle}
            onChange={e => setFlag('discountBadgeStyle', e.target.value as BadgeStyleVariant)}
            className="w-full bg-ld-surface border border-ld-border text-white text-xs font-inter rounded-lg px-3 py-2 focus:outline-none focus:border-ld-cyan"
          >
            <option value="control">Control: Teal (default)</option>
            <option value="B">Variant B: Pink — urgency (#FF4081)</option>
            <option value="C">Variant C: Navy — premium (#0D1B36)</option>
          </select>
        </div>
      </FlagCard>

      {/* Flag 5: apple-promotion-enabled */}
      <FlagCard
        flagKey="apple-promotion-enabled"
        name="Apple promotion"
        description="Kill switch — immediately removes the Apple offer card from the deal grid for all users."
        tag="Kill switch"
      >
        <div className="flex items-center gap-3 mt-3">
          <Toggle
            checked={flags.applePromotionEnabled}
            onChange={v => setFlag('applePromotionEnabled', v)}
          />
          <span className={`text-xs font-inter font-semibold ${flags.applePromotionEnabled ? 'text-ld-cyan' : 'text-ld-pink'}`}>
            {flags.applePromotionEnabled ? 'ON' : 'OFF — promotion hidden'}
          </span>
        </div>
      </FlagCard>
    </div>
  )
}
