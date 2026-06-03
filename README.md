# UNiDAYS × LaunchDarkly Demo

A sales demo tool for LaunchDarkly Solutions Engineers — a realistic student discount platform with an embedded LaunchDarkly feature management control panel.

## What it does

A two-panel split-screen demo that shows how LaunchDarkly controls a live UNiDAYS-style student platform in real time:

- **Left panel**: A realistic UNiDAYS student discount platform with offer cards, hero section, verification flow, and announcement bars
- **Right panel**: A LaunchDarkly control panel with Feature Flags, Experiments, AI Configs, and Observe tabs

Every flag toggle and variant change in the right panel instantly updates the left panel with no page reload, demonstrating LaunchDarkly's real-time flag evaluation.

## How to run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview
```

---

## Demo Script

### Setup (30 seconds)
Open the app and point to the split-screen layout. Explain: "Left is UNiDAYS — 22M students across 115 countries. Right is LaunchDarkly controlling every user experience in real-time."

---

### Tab 1 — Feature Flags (3–4 minutes)

**1. Verification Banner (Release flag)**
- Toggle **show-verification-banner** OFF → the teal nudge bar disappears instantly
- Toggle it back ON → it reappears
- Drag the **percentage rollout** slider: "We can roll this out to 0–100% of users without redeploying"

**2. AI Personalised Announcement (AI flag)**
- Toggle **ai-personalised-announcement** ON
- Watch the teal announcement bar appear above the nav AND an AI toast notification slides in from the bottom-left
- "Claude Haiku generates contextual copy per session — all wrapped in a feature flag so we can kill it instantly"

**3. Hero CTA Variant (Experiment flag)**
- Change the dropdown from Control → B → C
- Watch the hero button text update live: "This is a running A/B test across 8.2 million users. We can see variant C is winning in the Experiments tab."

**4. Discount Badge Colour (Experiment flag)**
- Switch Control → B (Pink) → C (Navy)
- All 6 badge pills update instantly: "Same UI, three different user experiences — zero code changes"

**5. Apple Kill Switch**
- Toggle **apple-promotion-enabled** OFF
- The Apple card disappears and a lime notification reads "0ms propagation across all 8M users"
- "This is a kill switch — say Apple's promotion budget ran out or there's a contractual issue. One click, instant for every user worldwide."

---

### Tab 2 — Experiments (2 minutes)

Point to the three experiment cards:

- **Hero CTA copy test**: Show Variant C at 16.8% conversion with "winner" badge. "96% statistical significance — LaunchDarkly tells us exactly when to ship."
- **Discount badge colour**: "Only 3 days of data, not enough to call it yet — the system automatically tells you."
- **Verification flow step reduction**: "This is scheduled for Monday — we can queue experiments in advance."

---

### Tab 3 — AI Configs (2 minutes)

- Show the **Personalised offer ranking** card with the editable system prompt
- Edit the temperature value inline: "Every AI parameter is a feature flag — you can A/B test your prompts and model configs"
- Click **"Apply to UNiDAYS homepage →"**: watches AI announcement bar appear AND the offer grid heading changes to "AI-ranked offers for you"
- Point to Guardrails section: "Content filter, PII masking, latency SLA — safety rails baked in"

---

### Tab 4 — Observe (1 minute)

- Point to the live-updating metric cards: "These update every 2 seconds — real-time view of your platform"
- Show the **Evaluation log** updating whenever a flag is changed: "Every flag evaluation is observable"
- "83K active sessions, 24.7K flag evaluations per second at sub-2ms p99 — that's the SDK performance"

---

### Closing

"Everything we just did — 5 flag changes affecting 22 million users — happened without a single deployment, feature branch, or support ticket. That's LaunchDarkly."
