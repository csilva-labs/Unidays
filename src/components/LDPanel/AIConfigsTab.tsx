import { useState } from 'react'
import { useFlags } from '../../context/FlagContext'
import Toggle from './Toggle'

interface EditableParamProps {
  label: string
  value: string
  editable?: boolean
  onChange?: (v: string) => void
}

function EditableParam({ label, value, editable, onChange }: EditableParamProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  function commit() {
    onChange?.(draft)
    setEditing(false)
  }

  return (
    <div className="bg-ld-surface rounded-lg p-2.5">
      <p className="text-gray-500 text-xs font-inter mb-0.5">{label}</p>
      {editing ? (
        <input
          autoFocus
          className="w-full bg-transparent text-white text-xs font-inter font-semibold border-b border-ld-cyan focus:outline-none pb-0.5"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => e.key === 'Enter' && commit()}
        />
      ) : (
        <p
          className={`text-white text-xs font-inter font-semibold ${editable ? 'cursor-pointer hover:text-ld-cyan' : ''}`}
          onClick={() => editable && setEditing(true)}
          title={editable ? 'Click to edit' : undefined}
        >
          {value}
          {editable && <span className="text-gray-600 ml-1 text-xs">✎</span>}
        </p>
      )}
    </div>
  )
}

export default function AIConfigsTab() {
  const { flags, setFlag } = useFlags()
  const [temp1, setTemp1] = useState('0.7')
  const [maxTokens, setMaxTokens] = useState('512')
  const [temp2] = useState('0.3')
  const [systemPrompt, setSystemPrompt] = useState(
    `You are a student discount recommendation engine for UNiDAYS. Given a student's context (country, verified status, browsing history, season), rank and personalise the top 6 offers. Prioritise {{season_focus}} categories. Explain each pick in <15 words.`
  )

  function handleApplyAI() {
    setFlag('aiPersonalisedAnnouncement', true)
    setFlag('aiOfferRanking', true)
  }

  return (
    <div className="space-y-4">
      {/* Card 1 */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-inter font-semibold text-sm">Personalised offer ranking</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-ld-purple/20 text-ld-purple text-xs font-inter font-semibold px-2 py-0.5 rounded-full">claude-sonnet-4</span>
              <span className="bg-ld-cyan/10 text-ld-cyan text-xs font-inter px-2 py-0.5 rounded-full">streaming</span>
            </div>
          </div>
          <Toggle
            checked={flags.aiOfferRanking}
            onChange={v => setFlag('aiOfferRanking', v)}
            size="sm"
          />
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-xs font-inter mb-1.5">System prompt</p>
          <textarea
            value={systemPrompt}
            onChange={e => setSystemPrompt(e.target.value)}
            rows={4}
            className="w-full bg-ld-surface border border-ld-border rounded-lg p-2.5 text-gray-200 text-xs font-mono resize-none focus:outline-none focus:border-ld-cyan leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <EditableParam label="Model" value="claude-sonnet-4" />
          <EditableParam label="Temperature" value={temp1} editable onChange={setTemp1} />
          <EditableParam label="Max tokens" value={maxTokens} editable onChange={setMaxTokens} />
          <EditableParam label="Fallback" value="static-offer-list" />
        </div>

        <button
          onClick={handleApplyAI}
          className="w-full bg-ld-blue hover:bg-ld-blue/80 text-white font-inter font-semibold text-xs py-2.5 rounded-lg transition-colors"
        >
          Apply to UNiDAYS homepage →
        </button>
      </div>

      {/* Card 2 */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-inter font-semibold text-sm">Seasonal announcement copy</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-ld-purple/20 text-ld-purple text-xs font-inter font-semibold px-2 py-0.5 rounded-full">claude-haiku-4</span>
              <span className="bg-ld-surface text-gray-400 text-xs font-inter px-2 py-0.5 rounded-full border border-ld-border">no-stream</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-gray-400 text-xs font-inter mb-1.5">Prompt template</p>
          <div className="bg-ld-surface rounded-lg p-2.5 text-gray-400 text-xs font-mono leading-relaxed select-none">
            Generate a 1-sentence announcement bar copy for UNiDAYS homepage. Context: season=&#123;&#123;season&#125;&#125;, country=&#123;&#123;country&#125;&#125;. Tone: upbeat, student-friendly. Max 12 words.
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <EditableParam label="Model" value="claude-haiku-4" />
          <EditableParam label="Temperature" value={temp2} />
        </div>
      </div>

      {/* Guardrails */}
      <div className="bg-ld-card rounded-xl p-4 border border-ld-border">
        <p className="text-gray-400 text-xs font-inter font-semibold uppercase tracking-wider mb-3">Guardrails</p>
        <div className="space-y-2">
          {[
            { label: 'Content filter', value: 'enabled', color: 'text-ld-lime' },
            { label: 'PII masking', value: 'enabled', color: 'text-ld-lime' },
            { label: 'Fallback on error', value: 'static-offer-list', color: 'text-ld-cyan' },
            { label: 'Latency SLA', value: '200ms p99', color: 'text-white' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-inter">{label}</span>
              <span className={`text-xs font-inter font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
