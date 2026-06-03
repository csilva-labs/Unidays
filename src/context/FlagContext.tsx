import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type HeroCTAVariant = 'control' | 'B' | 'C'
export type BadgeStyleVariant = 'control' | 'B' | 'C'

export interface FlagState {
  showVerificationBanner: boolean
  verificationBannerRollout: number
  aiPersonalisedAnnouncement: boolean
  heroCTAVariant: HeroCTAVariant
  discountBadgeStyle: BadgeStyleVariant
  applePromotionEnabled: boolean
  aiOfferRanking: boolean
}

export interface EvalLogEntry {
  ts: string
  flag: string
  value: string
  ctx: string
}

interface FlagContextValue {
  flags: FlagState
  setFlag: <K extends keyof FlagState>(key: K, value: FlagState[K]) => void
  evalLog: EvalLogEntry[]
  addLogEntry: (flag: string, value: string, ctx?: string) => void
  showAIToast: boolean
  dismissAIToast: () => void
  showAppleKillNotice: boolean
}

const defaultFlags: FlagState = {
  showVerificationBanner: true,
  verificationBannerRollout: 100,
  aiPersonalisedAnnouncement: false,
  heroCTAVariant: 'control',
  discountBadgeStyle: 'control',
  applePromotionEnabled: true,
  aiOfferRanking: false,
}

const FlagContext = createContext<FlagContextValue | null>(null)

function formatTs(): string {
  const now = new Date()
  return now.toTimeString().slice(0, 8)
}

const seedLog: EvalLogEntry[] = [
  { ts: '14:22:01', flag: 'show-verification-banner', value: 'true', ctx: 'uk_student' },
  { ts: '14:22:01', flag: 'hero-cta-variant', value: 'control', ctx: 'uk_student' },
  { ts: '14:22:01', flag: 'discount-badge-style', value: 'control', ctx: 'uk_student' },
  { ts: '14:22:01', flag: 'apple-promotion-enabled', value: 'true', ctx: 'uk_student' },
]

export function FlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FlagState>(defaultFlags)
  const [evalLog, setEvalLog] = useState<EvalLogEntry[]>(seedLog)
  const [showAIToast, setShowAIToast] = useState(false)
  const [showAppleKillNotice, setShowAppleKillNotice] = useState(false)

  const addLogEntry = useCallback((flag: string, value: string, ctx = 'uk_student') => {
    const entry: EvalLogEntry = { ts: formatTs(), flag, value, ctx }
    setEvalLog(prev => [entry, ...prev].slice(0, 50))
  }, [])

  const setFlag = useCallback(<K extends keyof FlagState>(key: K, value: FlagState[K]) => {
    setFlags(prev => ({ ...prev, [key]: value }))

    // Map internal key to display flag key
    const flagKeyMap: Record<keyof FlagState, string> = {
      showVerificationBanner: 'show-verification-banner',
      verificationBannerRollout: 'show-verification-banner',
      aiPersonalisedAnnouncement: 'ai-personalised-announcement',
      heroCTAVariant: 'hero-cta-variant',
      discountBadgeStyle: 'discount-badge-style',
      applePromotionEnabled: 'apple-promotion-enabled',
      aiOfferRanking: 'ai-offer-ranking',
    }

    const displayVal = typeof value === 'boolean' ? String(value) : String(value)
    addLogEntry(flagKeyMap[key], displayVal)

    // Side effects
    if (key === 'aiPersonalisedAnnouncement' && value === true) {
      setShowAIToast(true)
      setTimeout(() => setShowAIToast(false), 3500)
    }

    if (key === 'applePromotionEnabled') {
      setShowAppleKillNotice(!value as boolean)
      if (!value) {
        setTimeout(() => setShowAppleKillNotice(false), 4000)
      }
    }
  }, [addLogEntry])

  const dismissAIToast = useCallback(() => setShowAIToast(false), [])

  return (
    <FlagContext.Provider value={{
      flags,
      setFlag,
      evalLog,
      addLogEntry,
      showAIToast,
      dismissAIToast,
      showAppleKillNotice,
    }}>
      {children}
    </FlagContext.Provider>
  )
}

export function useFlags() {
  const ctx = useContext(FlagContext)
  if (!ctx) throw new Error('useFlags must be used inside FlagProvider')
  return ctx
}
