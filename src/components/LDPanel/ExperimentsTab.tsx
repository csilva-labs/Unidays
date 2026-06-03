interface VariantBarProps {
  label: string
  conversion: string
  barWidth: number
  barColor: string
  isWinner?: boolean
}

function VariantBar({ label, conversion, barWidth, barColor, isWinner }: VariantBarProps) {
  return (
    <div className={`rounded-lg p-2.5 ${isWinner ? 'bg-ld-lime/5 border border-ld-lime/20' : 'bg-ld-surface/50'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-xs font-inter">"{label}"</span>
          {isWinner && (
            <span className="bg-ld-lime text-black text-xs font-bold px-1.5 py-0.5 rounded-full">winner</span>
          )}
        </div>
        <span className={`text-xs font-inter font-bold ${isWinner ? 'text-ld-lime' : 'text-white'}`}>
          {conversion} {isWinner ? '↑' : ''}
        </span>
      </div>
      <div className="w-full h-1.5 bg-ld-border rounded-full">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${barWidth}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  )
}

interface StatusChipProps {
  label: string
  color: string
}

function StatusChip({ label, color }: StatusChipProps) {
  const colorMap: Record<string, string> = {
    lime: 'bg-ld-lime/20 text-ld-lime',
    cyan: 'bg-ld-cyan/20 text-ld-cyan',
    blue: 'bg-ld-blue/20 text-ld-blue',
    orange: 'bg-orange-400/20 text-orange-400',
  }
  return (
    <span className={`text-xs font-inter font-semibold px-2 py-0.5 rounded-full ${colorMap[color] ?? ''}`}>
      {label}
    </span>
  )
}

export default function ExperimentsTab() {
  return (
    <div className="space-y-4">
      {/* Experiment 1 */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-inter font-semibold text-sm">Hero CTA copy test</h3>
          <StatusChip label="Running" color="lime" />
        </div>
        <p className="text-gray-400 text-xs font-inter mb-3">
          Metric: Verification sign-up rate · 14 days · 8.2M users
        </p>
        <div className="space-y-2">
          <VariantBar
            label="Get verified free"
            conversion="12.4%"
            barWidth={62}
            barColor="#6b7280"
          />
          <VariantBar
            label="Claim your student discounts"
            conversion="14.1%"
            barWidth={70}
            barColor="#405BFF"
          />
          <VariantBar
            label="Unlock 800+ brand deals"
            conversion="16.8%"
            barWidth={84}
            barColor="#DDFF46"
            isWinner
          />
        </div>
        <div className="mt-3 pt-3 border-t border-ld-border flex items-center gap-2">
          <span className="text-ld-lime text-xs">●</span>
          <p className="text-gray-300 text-xs font-inter">
            Variant C shows <span className="text-ld-lime font-semibold">35% lift</span> · 96% statistical significance ·{' '}
            <span className="text-white font-semibold">recommend shipping</span>
          </p>
        </div>
      </div>

      {/* Experiment 2 */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-inter font-semibold text-sm">Discount badge colour</h3>
          <StatusChip label="Early data" color="cyan" />
        </div>
        <p className="text-gray-400 text-xs font-inter mb-3">
          Metric: Coupon redemption rate · Day 3 · 2.1M users
        </p>
        <div className="space-y-2">
          <VariantBar label="Teal (default)" conversion="4.3%" barWidth={43} barColor="#6b7280" />
          <VariantBar label="Pink — urgency" conversion="4.7%" barWidth={47} barColor="#FF4081" />
          <VariantBar label="Navy — premium" conversion="4.1%" barWidth={41} barColor="#405BFF" />
        </div>
        <div className="mt-3 pt-3 border-t border-ld-border flex items-center gap-2">
          <span className="text-orange-400 text-xs">●</span>
          <p className="text-gray-400 text-xs font-inter">Insufficient data — continue running for 11 more days</p>
        </div>
      </div>

      {/* Experiment 3 */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-white font-inter font-semibold text-sm">Verification flow step reduction</h3>
          <StatusChip label="Scheduled" color="blue" />
        </div>
        <p className="text-gray-400 text-xs font-inter mb-4">
          Metric: Verification completion rate · Starts Mon · 3-way split
        </p>
        <div className="bg-ld-surface rounded-lg p-3 text-center">
          <p className="text-gray-400 text-xs font-inter">
            Reducing verification from 5 steps to 2 steps for cohorts B and C. Hypothesis: fewer form fields increases completion by 20–40%.
          </p>
          <p className="text-ld-blue text-xs font-inter font-semibold mt-2">
            🗓 Launch: Monday 09:00 UTC · 33% / 33% / 34% split
          </p>
        </div>
      </div>
    </div>
  )
}
