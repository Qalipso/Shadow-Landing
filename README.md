# Shadow Landing

Landing page for **Shadow AI** — a personal life analytics and AI memory assistant. Built with physics-driven interactions, a procedural mascot, and a dark premium aesthetic.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Package manager | npm |

## Project Structure

```
shadowwwLanding/
├── components/
│   ├── forms/          # CTAModal, WaitlistForm
│   ├── layout/         # Nav, Footer, Marquee
│   ├── primitives/     # Button (magnetic), Headline
│   ├── scenes/         # One component per page section
│   │   ├── HeroScene.tsx
│   │   ├── OverloadScene.tsx
│   │   ├── CaptureScene.tsx
│   │   ├── DemoScene.tsx
│   │   ├── MemoryScene.tsx
│   │   ├── ModesScene.tsx
│   │   ├── LoopScene.tsx
│   │   ├── LabsScene.tsx
│   │   ├── TrustScene.tsx
│   │   ├── ProofScene.tsx
│   │   └── CtaScene.tsx
│   ├── shady/          # Procedural mascot (Shady orb)
│   └── ui/             # CursorField
├── content/
│   ├── copy.ts         # All text content (single source of truth)
│   └── ui-data.ts      # Mock UI data for scene illustrations
├── src/
│   ├── App.tsx         # Root composition
│   ├── index.css       # Global styles + custom keyframes
│   └── lib/
│       ├── cta-modal.tsx   # CTA modal context + hook
│       └── analytics.ts    # Analytics stub
└── public/assets/      # Shady state images
```

## Scenes (page sections)

| Scene | Description |
|-------|-------------|
| **Hero** | Shady mascot + floating life signals + parallax depth layers + tagline + CTAs |
| **Overload** | Pain-point hook section |
| **Capture** | How signal capture works |
| **Demo** | Interactive mock classifier (no backend — 4 pre-computed fragments) |
| **Memory** | Living memory visualization |
| **Modes** | 3-card spotlight: Capture / Reflect / Recover modes |
| **Loop** | Orbital vortex scroll animation (300vh sticky) |
| **Labs** | Experiments section — 3 curated cards |
| **Trust** | Privacy principles — 3D floating cards |
| **Proof** | Social proof |
| **CTA** | Glass portal card with dual CTAs |

## Physics & Animations

### Site-wide

- **CursorField** (`components/ui/CursorField.tsx`) — spring-lagged glow dot follows cursor. `mixBlendMode: screen`. Desktop only (`hidden md:block`). Spring: `stiffness: 80, damping: 20, mass: 0.5`.

### Hero
- **Parallax depth** — 3 independent layers scroll at different rates:
  - Signals (foreground, z=4): `useTransform(scrollYProgress, [0,1], [0, -90])`
  - SVG lines (mid, z=2): `[0, -40]`
  - Shady (background anchor, z=3): `[0, -22]`
- **Wake sequence** — Shady animates `sleep → wake → idle` on mount (timings: 0 / 900ms / 2200ms)

### Button
- **Primary CTA** — magnetic pull: `onMouseMove` → spring-lagged `x/y` offset at 28% strength. Spring: `stiffness: 280, damping: 22, mass: 0.6`.

### Modes
- **Spotlight** — hovered card: `scale: 1.055, y: -8`, siblings: `opacity: 0.42, scale: 0.97`. Group state managed in parent, `animate` prop per card.
- **Shady roll** — on hover: slide out right (`x: 90, opacity: 0`, 0.22s ease-in) → jump to left (`x: -90`) → slide back in (`x: 0, opacity: 1`, 0.34s ease-out). Uses `useAnimation()` in extracted `ModeCard` component.

### Loop
- **Spring inertia** — `useSpring(scrollYProgress, { stiffness: 55, damping: 30 })` applied to all `useTransform` calls and orbital nodes. Creates physics lag on scroll.
- **Vortex** — 6 nodes orbit with `easeOutQuart` deceleration (2 full rotations) then land in grid layout.

### Trust
- **3D tilt** — `Float3DCard`: `useSpring` for `rotateX/rotateY/translateZ`, cursor-tracked specular highlight via `useTransform([hlX, hlY], ...)`.
- **Float** — staggered idle `y: [0, -8, 0]` animation per card (different duration + delay).

## Setup

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
```

## Content

All copy lives in `content/copy.ts`. Edit there to change headlines, signals, mode descriptions, lab cards, proof quotes, etc.

## CTA Modal

Controlled via `useCTAModal()` hook from `src/lib/cta-modal.tsx`. Call `openCTA(source)` with a `CTASource` string:

```ts
type CTASource = "hero_primary" | "nav" | "cta_scene_primary" | "sticky" | "other"
```

## Environment

No environment variables required for the landing page itself. Analytics stub in `src/lib/analytics.ts` — wire up your provider there.
