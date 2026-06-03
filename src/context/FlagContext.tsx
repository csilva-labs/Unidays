import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react'
import * as LD from 'launchdarkly-js-client-sdk'

export type HeroCTAVariant = 'control' | 'B' | 'C'
export type BadgeStyleVariant = 'control' | 'B' | 'C'
export type LDStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

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
  source?: 'local' | 'ld'
}

interface FlagContextValue {
  flags: FlagState
  setFlag: <K extends keyof FlagState>(key: K, value: FlagState[K]) => void
  evalLog: EvalLogEntry[]
  addLogEntry: (flag: string, value: string, ctx?: string, source?: 'local' | 'ld') => void
  showAIToast: boolean
  dismissAIToast: () => void
  showAppleKillNotice: boolean
  // LD connection
  ldStatus: LDStatus
  ldClientSideId: string
  connectLD: (clientSideId: string) => Promise<void>
  disconnectLD: () => void
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
  return new Date().toTimeString().slice(0, 8)
}

const seedLog: EvalLogEntry[] = [
  { ts: '14:22:01', flag: 'show-verification-banner', value: 'true', ctx: 'uk_student', source: 'local' },
  { ts: '14:22:01', flag: 'hero-cta-variant', value: 'control', ctx: 'uk_student', source: 'local' },
  { ts: '14:22:01', flag: 'discount-badge-style', value: 'control', ctx: 'uk_student', source: 'local' },
  { ts: '14:22:01', flag: 'apple-promotion-enabled', value: 'true', ctx: 'uk_student', source: 'local' },
]

// Maps LD flag keys (kebab-case) → our internal state keys
const ldKeyMap: Partial<Record<string, keyof FlagState>> = {
  'show-verification-banner': 'showVerificationBanner',
  'ai-personalised-announcement': 'aiPersonalisedAnnouncement',
  'hero-cta-variant': 'heroCTAVariant',
  'discount-badge-style': 'discountBadgeStyle',
  'apple-promotion-enabled': 'applePromotionEnabled',
  'ai-offer-ranking': 'aiOfferRanking',
}

// Maps our internal state keys → display flag keys for the log
const displayKeyMap: Record<keyof FlagState, string> = {
  showVerificationBanner: 'show-verification-banner',
  verificationBannerRollout: 'show-verification-banner',
  aiPersonalisedAnnouncement: 'ai-personalised-announcement',
  heroCTAVariant: 'hero-cta-variant',
  discountBadgeStyle: 'discount-badge-style',
  applePromotionEnabled: 'apple-promotion-enabled',
  aiOfferRanking: 'ai-offer-ranking',
}

const LD_CONTEXT: LD.LDContext = {
  kind: 'user',
  key: 'stu_8m_anon',
  country: 'GB',
  custom: { verified: false, season: 'back-to-school' },
} as LD.LDContext & { custom: Record<string, unknown> }

export function FlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FlagState>(defaultFlags)
  const [evalLog, setEvalLog] = useState<EvalLogEntry[]>(seedLog)
  const [showAIToast, setShowAIToast] = useState(false)
  const [showAppleKillNotice, setShowAppleKillNotice] = useState(false)
  const [ldStatus, setLdStatus] = useState<LDStatus>('disconnected')
  const [ldClientSideId, setLdClientSideId] = useState(
    () => localStorage.getItem('ld-client-side-id') ?? ''
  )
  const ldClientRef = useRef<LD.LDClient | null>(null)

  const addLogEntry = useCallback((flag: string, value: string, ctx = 'uk_student', source: 'local' | 'ld' = 'local') => {
    setEvalLog(prev => [{ ts: formatTs(), flag, value, ctx, source }, ...prev].slice(0, 50))
  }, [])

  const applyFlagValue = useCallback((key: keyof FlagState, value: FlagState[typeof key], source: 'local' | 'ld' = 'local') => {
    setFlags(prev => ({ ...prev, [key]: value }))
    addLogEntry(displayKeyMap[key], String(value), 'uk_student', source)

    if (key === 'aiPersonalisedAnnouncement' && value === true) {
      setShowAIToast(true)
      setTimeout(() => setShowAIToast(false), 3500)
    }
    if (key === 'applePromotionEnabled') {
      setShowAppleKillNotice(!value as boolean)
      if (!value) setTimeout(() => setShowAppleKillNotice(false), 4000)
    }
  }, [addLogEntry])

  const setFlag = useCallback(<K extends keyof FlagState>(key: K, value: FlagState[K]) => {
    applyFlagValue(key, value, 'local')
  }, [applyFlagValue])

  // Sync all known flags from an LD client into local state
  const syncFromLD = useCallback((client: LD.LDClient) => {
    Object.entries(ldKeyMap).forEach(([ldKey, stateKey]) => {
      if (!stateKey) return
      const val = client.variation(ldKey, undefined)
      if (val === undefined) return
      applyFlagValue(stateKey, val as FlagState[typeof stateKey], 'ld')
    })
  }, [applyFlagValue])

  const disconnectLD = useCallback(() => {
    if (ldClientRef.current) {
      ldClientRef.current.close()
      ldClientRef.current = null
    }
    setLdStatus('disconnected')
    setLdClientSideId('')
    localStorage.removeItem('ld-client-side-id')
  }, [])

  const connectLD = useCallback(async (clientSideId: string) => {
    if (ldClientRef.current) {
      ldClientRef.current.close()
      ldClientRef.current = null
    }
    if (!clientSideId.trim()) return

    setLdStatus('connecting')
    setLdClientSideId(clientSideId)
    localStorage.setItem('ld-client-side-id', clientSideId)

    try {
      const client = LD.initialize(clientSideId, LD_CONTEXT)
      ldClientRef.current = client

      await client.waitForInitialization(10)
      setLdStatus('connected')
      syncFromLD(client)

      client.on('change', () => syncFromLD(client))
    } catch {
      setLdStatus('error')
    }
  }, [syncFromLD])

  // Auto-connect on mount if a client-side ID was previously saved
  useEffect(() => {
    if (ldClientSideId) connectLD(ldClientSideId)
    return () => { ldClientRef.current?.close() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      ldStatus,
      ldClientSideId,
      connectLD,
      disconnectLD,
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
