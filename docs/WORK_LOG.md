# Shadow Landing — Work Log

## Session: 2026-05-20

### Overview

Full build and physics upgrade of the Shadow AI landing page from initial scaffold to a production-ready v2. Two major phases: content/scene upgrade, then site-wide physics layer.

---

## Phase 1 — Landing v2 Content Upgrade

### Hero (`HeroScene.tsx`)

- Added ambient violet/cyan radial gradient background layer
- Added `tagline` text element (`"AI memory for people with too much in their head."`) between brand eyebrow and headline — provides cold visitor hook before the pain anchor
- Moved CTA button animation delay: `2.0s → 0.95s` — appears much earlier, users see it before scrolling
- Moved Marquee animation delay: `2.4s → 1.6s`
- Reduced `hero.signals` from 6 → 4 (removed "call mom" and "money pressure" — too generic)
- Added parallax depth (see Phase 2)

### Demo Section (`DemoScene.tsx`) — New

Created from scratch. Interactive mock signal classifier:

- 4 pre-written fragments: portfolio avoidance, sleep deficit, quit impulse, creative drought
- State machine: `idle → reading (1.5s) → done`
- "Reading" state shows animated dots
- Result shows classification pills (Type / Area / Mood / Pattern) + Shadow's narrative reading
- Clearly labeled "Mock demo — no backend, no account needed"
- Placed between CaptureScene and MemoryScene in App.tsx

### Modes (`ModesScene.tsx`) — Full Rewrite

- Reduced from 5 modes → 3: **Capture**, **Reflect**, **Recover** (removed Focus and Labs)
- Changed layout: tabs → 3-column card grid
- Each card: icon, Shady miniature (72px), label, description, example chip
- Added `icon` and `example` fields to `modes.items` in copy.ts
- Headline: `"One Shadow. Three states of mind."`

### Labs (`LabsScene.tsx`) — Full Rewrite

- Renamed eyebrow: "Labs" → "Experiments"
- Reduced from 6 cards → 3 curated: Shadow Mirror, Personality Core Scan, Life Pattern Map
- Each card: status badge, name, description, metadata (reveals count + time)
- New headline: `"Built for self-discovery."`

### CTA (`CtaScene.tsx`) — Full Rewrite

- Glass portal card: `backdrop-filter: blur(16px)`, gradient border, multi-layer box-shadow
- Inner violet glow, Shady in "system" state, 6 orbiting fragment pills
- Two CTAs: primary "Start building memory" (modal), ghost "Enter Shadow →" (modal)
- Trust note: "Free early access · No card required · Limited seats"

---

## Phase 2 — Physics Layer

### 1. Hero Parallax Depth

Three scroll-tracked layers via `useScroll` + `useTransform`:

```ts
// HeroScene.tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
const signalParallax = useTransform(scrollYProgress, [0, 1], [0, -90]); // foreground, z=4
const lineParallax   = useTransform(scrollYProgress, [0, 1], [0, -40]); // mid, z=2
const shadyParallax  = useTransform(scrollYProgress, [0, 1], [0, -22]); // anchor, z=3
```

Each layer wrapped in `motion.div` with `style={{ y: parallaxValue }}`. Shady uses nested wrapper (outer: motion.div with y, inner: regular div with CSS translate-50% centering) to avoid transform conflict.

### 2. Magnetic Primary CTA

Extracted `MagneticPrimary` component in `Button.tsx`. On `onMouseMove`: computes cursor offset from button center, applies 28% pull strength via spring-lagged `x`/`y` MotionValues. Snaps back to 0 on `onMouseLeave`.

```ts
x.set(cx * 0.28);
y.set(cy * 0.28);
```

### 3. Spring Hover on Cards

Nested wrapper pattern (prevents spring/ease transition conflicts):
- **Outer** `motion.div`: `whileInView` scroll reveal with eased `transition`
- **Inner** `motion.div`: `whileHover` spring with `SPRING = { type: "spring", stiffness: 360, damping: 24 }`

Applied to: ModesScene, LabsScene, DemoScene.

### 4. LoopScene Spring Inertia

```ts
// LoopScene.tsx
const springProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 30 });
```

`springProgress` replaces raw `scrollYProgress` in all `useTransform` calls and `OrbitalNode` progress prop. Creates physics lag on scroll — orbital nodes decelerate with inertia rather than stopping instantly.

### 5. 3D Trust Cards (`TrustScene.tsx`) — Full Rewrite

`Float3DCard` component:
- `rotateX`, `rotateY`, `translateZ` via `useSpring` (stiffness 220, damping 22)
- Specular highlight via `useTransform([hlX, hlY], ([x, y]) => radial-gradient(circle at ${x}% ${y}%, ...))`
- Shadow depth via `useTransform(tz, [0, 18], [nearShadow, deepShadow])`
- `transformStyle: "preserve-3d"`, `perspective: "900px"` on outer wrapper
- Staggered idle float: `animate={{ y: [0, -8, 0] }}` with per-card duration/delay variation

### 6. CursorField (`components/ui/CursorField.tsx`) — New

Spring-lagged glowing cursor follower:
- `useMotionValue` tracks raw mouse position
- `useSpring(mx/my, { stiffness: 80, damping: 20, mass: 0.5 })` adds inertia lag
- 28px orb, `mixBlendMode: screen`, `z-index: 9999`
- Desktop-only: `hidden md:block`
- Mounted in `App.tsx` outside `<main>` so it overlays everything

---

## Phase 3 — Modes Spotlight + Roll Animation

### Spotlight System

Replaced `whileHover` lift with group-aware `animate` prop:

```tsx
animate={{
  scale: isHovered ? 1.055 : isDimmed ? 0.97 : 1,
  opacity: isDimmed ? 0.42 : 1,
  y: isHovered ? -8 : 0,
  boxShadow: isHovered ? `0 28px 70px ${mode.accent}28, ...` : "0 0 0 rgba(0,0,0,0)",
}}
```

`isDimmed = hovered !== null && !isHovered` — siblings dim when any card is active.

### Shady Roll Animation

Required extracting inline map into `ModeCard` component (can't call `useAnimation()` in a `map`).

Sequence on hover start:
1. Slide out right: `x: 90, opacity: 0` (0.22s ease-in)
2. Instant jump: `shadyAnim.set({ x: -90, opacity: 0 })`
3. Slide back in: `x: 0, opacity: 1` (0.34s ease-out)

On hover end: `shadyAnim.stop()` + snap back to `x: 0, opacity: 1` (0.2s) — handles interrupted mid-roll cleanly.

Initial attempt used `rotate: 160` — created arc path instead of linear motion. Fixed by removing rotation entirely: pure horizontal `x` + `opacity`.

Shady container: removed 72×72 overflow:hidden clip box — mascot floats freely in card space, card's own `overflow-hidden` provides natural boundary.

---

## Bugs Fixed

| Bug | Cause | Fix |
|-----|-------|-----|
| `Argument of type '"cta_scene_secondary"' is not assignable to CTASource` | Source string not in type union | Changed to `"other"` |
| Unicode escapes in JSX text render literally | JSX text nodes don't process `\uXXXX` | Replaced with actual Unicode chars (`→`, `·`, `"`, `"`, `…`, `—`) |
| Shady rolls in arc instead of sliding sideways | `rotate: 160` + `x` compose into arc path | Removed rotation, pure `x` + `opacity` |
| Spring hover conflicts with scroll reveal transition | Framer Motion `transition` prop affects all animations on element | Nested wrapper pattern: outer for `whileInView`, inner for `whileHover` |

---

## Files Modified / Created

| File | Change |
|------|--------|
| `content/copy.ts` | tagline, signals 6→4, modes 5→3, labs copy, finalCta |
| `components/scenes/HeroScene.tsx` | tagline, ambient bg, parallax depth, earlier CTA delay |
| `components/scenes/DemoScene.tsx` | Created — interactive mock classifier |
| `components/scenes/ModesScene.tsx` | Full rewrite → 3-card grid, spotlight, Shady roll animation |
| `components/scenes/LabsScene.tsx` | Full rewrite → Experiments, 3 cards, spring hover |
| `components/scenes/CtaScene.tsx` | Full rewrite → glass portal card |
| `components/scenes/TrustScene.tsx` | Full rewrite → 3D floating cards with physics |
| `components/primitives/Button.tsx` | Magnetic primary CTA |
| `components/ui/CursorField.tsx` | Created — spring-lagged cursor follower |
| `components/scenes/LoopScene.tsx` | Spring inertia on scroll progress |
| `src/App.tsx` | Added DemoScene, CursorField |
