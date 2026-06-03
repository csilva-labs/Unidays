# UNiDAYS × LaunchDarkly Demo

## Project Overview
A sales demo tool for LaunchDarkly Solutions Engineers. Two-panel split layout:
- **Left panel**: UNiDAYS student discount platform mimic
- **Right panel**: LaunchDarkly feature management control panel

## Commands
- `npm run dev` — Vite dev server (hot reload)
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS v3
- Google Fonts: Sora (headlines, 700/800) + Inter (body) via `index.html` `<link>` tag
- No backend — all state managed client-side via React hooks + Context

## Project Structure
```
src/
├── context/
│   └── FlagContext.tsx       # ALL flag state lives here — single source of truth
├── components/
│   ├── UniDays/              # Left panel — student platform UI
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── VerificationBanner.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategoryFilters.tsx
│   │   ├── OfferGrid.tsx
│   │   ├── OfferCard.tsx
│   │   ├── VerificationModal.tsx
│   │   └── AIToast.tsx
│   └── LDPanel/              # Right panel — LD control panel
│       ├── LDPanel.tsx
│       ├── FeatureFlagsTab.tsx
│       ├── ExperimentsTab.tsx
│       ├── AIConfigsTab.tsx
│       └── ObserveTab.tsx
├── App.tsx
├── main.tsx
└── globals.css
```

## Styling Rules
- **Never** use hardcoded hex values in components — use Tailwind classes or CSS variables
- Color tokens are defined in `tailwind.config.ts` and `src/globals.css`
- LaunchDarkly brand CSS variables (defined in `globals.css`):
  - `--ld-bg`: #191919 (panel background)
  - `--ld-card`: #2C2C2C (card background)
  - `--ld-blue`: #405BFF
  - `--ld-lime`: #DDFF46
  - `--ld-cyan`: #00C5A8 (also UNiDAYS teal)
  - `--ld-purple`: #8B5CF6
  - `--ld-pink`: #FF4081

## State Management
All flag state lives in `/src/context/FlagContext.tsx`. Both panels import from this context. Flag changes are instant — no animation delay except the Apple kill-switch notification (200ms fade).

The context exposes:
- `flags`: current flag states object
- `setFlag(key, value)`: update any flag
- `evalLog`: array of evaluation log entries
- `addLogEntry(entry)`: append to eval log
