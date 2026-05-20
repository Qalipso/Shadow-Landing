# Shadow Landing — Production Plan

## Executive Summary

Shadow = AI personal operating system. Wedge: daily cognitive offload with memory. Landing must do 4 things — name pain (overload), show mechanism (capture→memory→loop), prove via real UI fragments, convert via "enter system" feel. Shady is product-promise embodied, not mascot. Core risk: vaporware perception if visuals abstract OR therapy/wellness drift if copy emotional.

Phased build: **Phase 0 copy+inventory lockdown → Phase 1 MVP 4-scene vertical (Hero, Overload+Capture, Loop, CTA) → external test → Phase 2 full 10 scenes → Phase 3 polish**. Stack: Next.js 16 App Router + Tailwind + Framer Motion + GSAP/Lenis + Rive (Shady v2) + R3F (Hero core, Memory Graph only). Shady v1 = SVG/CSS blob before Rive — de-risk character early.

Critical gates: (1) static landing must sell **without** motion, (2) Shady v1 must feel alive before Rive investment, (3) MVP must pass 5-user "this is me" test before full build. Trust block BEFORE CTA, not footer. Real data in every UI card — zero lorem. Mobile considered from Phase 2, not patched at end.

---

## 1. Product Understanding

**Category:** AI personal OS / second brain / life analytics. Not journaling, not chatbot, not Notion, not therapy.

**Pain:** cognitive overload + loss of continuity across scattered tools.

**Differentiation:**
- vs to-do apps: starts with raw signals, not tasks
- vs journaling: connects reflection to goals/habits/analytics
- vs AI chatbots: persistent memory architecture
- vs Notion: zero manual structuring
- vs therapy: no diagnosis, no treatment

**Thesis:** Shadow turns scattered life signals into living memory that gets more accurate the longer you use it.

---

## 2. Narrative Arc

3 acts, 10 scenes. Emotion: recognition → relief → curiosity → understanding → trust → resolve.

Shady journey: idle → absorb → filter → memory core → morph → mirror → loop center → curator → system star → closed circle.

---

## 3. Landing Structure

| Scene | Goal | Message | Shady | Motion | Proof | CTA |
|---|---|---|---|---|---|---|
| 1 Hero | First impression | Stop holding your whole life in your head | Idle core breathing | Subtle rotate on scroll | None | Enter Shadow / See how |
| 2 Overload | Recognition | Tasks. Thoughts. Emotions. All in your head. | Still, then absorbs | Parallax fragments, scroll-controlled absorption | Real input examples | None |
| 3 Capture | Mechanism | Throw mess in. Shadow knows where it goes | Filter/funnel, color shift | Sticky ~150vh, signal flow | Inbox Dump, Classification | Capture first signal |
| 4 Memory | Kill chatbot objection | AI chats forget you. Shadow doesn't | Memory core | R3F graph rotation, compress into Shady | Knowledge Gap example | None |
| 5 Modes | Adaptive UX | Different states need different interfaces | Liquid morph | Pinned horizontal | Real mode UI | None |
| 6 Life Circle | Analytics climax | See patterns behind energy/habits/emotions/goals | Lens/mirror | Sector reveal | Real metrics, anti-BI line | None |
| 7 Loop | Differentiation | Only AI that gets more accurate longer you use it | Circuit center | Pulse around 6 nodes | AI question + Daily Sync | Manifesto link |
| 8 Labs | Depth | Maps of yourself you haven't seen yet | Curator | Spotlight reveals | Lab artifacts | None |
| 9 Shadow OS + Trust | Vision + trust | One adaptive system / Memory belongs to you | Star of system | Reprise | Privacy statement | None (trust only) |
| 10 CTA | Conversion | You don't have to hold all of this anymore | Calm breathing | Lean toward CTA on hover | None | Join early access |

---

## 4. MVP vs Full

**MVP (4 scenes):** Hero · Overload+Capture · Loop · CTA. Static React + Shady v1 + Framer Motion + real copy + real mocks.

**Full (10 scenes):** + Memory R3F, Modes pinned horizontal, Life Circle, Labs, Shadow OS, Shady v2 Rive.

**Premium:** interactive demo, case study, animated OG, WebGL postprocess, sound ambient.

---

## 5. Tech Stack

| Layer | Tool | MVP? |
|---|---|---|
| Framework | Next.js 16 App Router | yes |
| Styles | Tailwind v4 | yes |
| UI motion | Framer Motion | yes |
| Cinematic | GSAP + ScrollTrigger | Phase 2 |
| Smooth scroll | Lenis | Phase 2 |
| 3D | React Three Fiber + Drei | Phase 2 |
| Shady v1 | SVG + CSS + JS magnetic | yes |
| Shady v2 | Rive state machine | Phase 3 |
| State | Zustand | Phase 2 |
| Forms | React Hook Form + Zod | yes |
| Analytics | PostHog | yes |
| Deploy | Vercel | yes |

---

## 6. Architecture

```
shadowwwLanding/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── manifesto/page.tsx
│   ├── how-it-works/page.tsx
│   ├── privacy/page.tsx
│   ├── early-access/page.tsx
│   └── api/early-access/route.ts
├── components/
│   ├── layout/ (Nav, Footer)
│   ├── scenes/ (10 scene components)
│   ├── shady/ (Shady, ShadyV1, ShadyV2, states, useShadyState)
│   ├── motion/ (ScrollProvider, StickySection, ParallaxLayer, FragmentField)
│   ├── ui-mocks/ (18 product UI fragments)
│   ├── primitives/ (Button, GlassCard, Headline, TextReveal)
│   └── forms/ (EarlyAccessForm)
├── content/
│   ├── copy.ts           # single source of truth
│   ├── ui-data.ts        # real mock data
│   ├── audience-fragments.ts
│   ├── memory-nodes.ts
│   └── seo.ts
├── lib/
│   ├── design-tokens.ts
│   ├── motion-tokens.ts
│   └── analytics.ts
└── public/shady/
```

---

## 7. Motion System

**Critical:** Shady breathing, fragment absorption, signal→category flow, graph rotation, mode morph, Life Circle reveal, loop pulse.

**Decorative (defer):** grain, vignette pulse, signal drift, CTA glow expansion, ink trails.

**Mechanics:** Lenis baseline · Framer Motion reveals · GSAP for sticky pin · R3F Hero+Memory only.

**Easings:** cubic-bezier(0.22, 1, 0.36, 1). Durations 600–1200ms. Reverse-friendly.

---

## 8. Shady Plan

**v1 (MVP):** SVG circle, radial gradient, breathing scale 1.0↔1.03 4s, blur 8px edges, animated box-shadow violet→cyan glow, JS magnetic cursor.

**v2 (post-test):** Rive `.riv` w/ 10 states. Inputs: scrollProgress, mouseX/Y, cursorDistance, triggerImpulse.

**R3F variant:** Hero + Memory only. Custom shader sphere.

**Anti-childish:** no eyes/mouth/limbs. No bounce. Violet/cyan only. Slow movement. Present, not dominant.

---

## 9. Visual Inventory

| # | Artifact | Fidelity | Scene | Priority |
|---|---|---|---|---|
| 1 | Inbox Dump | Real UI | 3 | MVP |
| 2 | AI Classification | Stylized | 3 | MVP |
| 3 | Clarifying Question | Real UI | 7 | MVP |
| 4 | Memory Graph | Stylized+R3F | 4 | P2 |
| 5 | Daily Sync | Real UI | 7 | MVP |
| 6 | State Sliders | Real UI | 6 | P2 |
| 7 | Mode Switcher | Real+Stylized | 5 | P2 |
| 8 | Life Circle | Stylized | 6 | P2 |
| 9 | Insight Card | Real UI | 6 | P2 |
| 10 | Weekly Report | Real UI | 9 | P3 |
| 11 | Labs Cards | Stylized | 8 | P2 |
| 12 | Personality Scan Q | Stylized | 8 | P2 |
| 13 | Scan Result | Stylized | 8 | P3 |
| 14 | Initiative Card | Real UI | opt | P3 |
| 15 | Floating Shady chip | Conceptual | all | P2 |
| 16 | Privacy Card | Real UI | 9 | MVP |
| 17 | Loop Visualization | Schematic | 7 | MVP |
| 18 | Shadow OS Orbital | Conceptual | 9 | P2 |

**Real-data convention.** Zero lorem.

---

## 10. Copy & Messaging

**Hero headline:** Stop holding your whole life in your head.
**Subhead:** Shadow captures thoughts, tasks, emotions and daily signals, turns them into living memory, and shows you the patterns behind your life.
**Primary CTA:** Enter Shadow
**Secondary CTA:** See how it works

**Tone:** short, strong, concrete, calm, precise, premium. Never therapeutic, never corporate.

**Forbidden:** "supercharge", "unlock potential", "AI-powered insights", "revolutionize", "crush goals", "AI buddy".

---

## 11. Trust / Credibility

**Trust block BEFORE CTA in Scene 9:**
> Your memory belongs to you. Shadow helps you see your life, not exploit it. End-to-end encrypted. No ads. No data sale. Export anything, anytime.

**Components:** founder note, real outputs distributed across scenes, early access mechanics, roadmap proof, technical proof, privacy page.

---

## 12. SEO & Pages

**v1 launch:** / · /manifesto · /how-it-works · /privacy · /early-access · /about (light)

**Defer:** /labs · /blog · /changelog · /demo · /case-study · /press-kit

**Nav:** minimal top — Logo · How it works · Manifesto · Privacy · Enter Shadow CTA

**Performance:** LCP ≤2.5s, INP ≤200ms, no CLS, SSR metadata, semantic h1/h2/h3, lazy WebGL.

---

## 13. Roadmap

| # | Phase | Duration | Result | Risks |
|---|---|---|---|---|
| 0 | Discovery | 3d | Inventory + gaps | Scope creep |
| 1 | Copy lock | 1w | copy.ts final | Translation drift |
| 2 | UI mock inventory | 1w | All mocks in Figma | Incomplete data pool |
| 3 | Art direction | 1.5w | 4 hi-fi frames, Shady poses | AD availability |
| 4 | Static landing | 2w | All 10 scenes responsive | Static doesn't sell |
| 5 | Shady v1 + basic motion | 1.5w | Framer reveals, sticky | v1 feels dead |
| 6 | Cinematic MVP | 2w | GSAP/Lenis/R3F on 4 scenes | Perf, scroll bugs |
| 6a | External test | 2d | 5–10 user reactions | "Not for me" |
| 7 | Shady v2 Rive | 1w | .riv 10 states | Learning curve |
| 8 | Full cinematic | 2w | Remaining scenes motion | Mobile fallback |
| 9 | SEO/trust pages | 1w | manifesto/how/privacy/EA | Content gaps |
| 10 | Polish | 1.5w | Perf, a11y, copy pass | Rework needed |
| 11 | Launch | 1d | Deploy | Analytics broken |
| 12 | Post-launch | continuous | A/B tests | Low conversion |

**Total: ~12–13 weeks.** Stop-the-line gates after Phase 4, 5, 6a.

---

## 14. Risks

| Risk | Severity | Solution |
|---|---|---|
| Too abstract | High | Real UI mocks every scene |
| Generic AI | High | Shady differentiator + closed loop anchor |
| Tech complexity | Med | Phased motion stack |
| Little proof | High | Real-data convention |
| Shady childish | Critical | Strict guardrails + v1 early |
| Perf | High | DPR cap, lazy WebGL, Hero fallback |
| Category confusion | High | Anti-positioning copy, anti-BI line |
| Weak privacy | High | Trust BEFORE CTA |
| Pretty but empty | Critical | 18 real UI mocks mandate |
| Heavy RU→EN | Med | Native English copy |
| Shady v1 dead | Critical | Build before Rive |
| Mobile breaks | High | Mobile from Phase 3 |
| Loop unclear | Med | Real AI question example |
| Founder bandwidth | High | Lock copy+data in Phase 1–2 |

---

## 15. Start Now

Build **MVP 4-scene vertical**: Hero · Overload+Capture · Loop · CTA.

**Minimum asset bundle:**
1. copy.ts final 4 scenes
2. ui-data.ts real pool
3. 4 hi-fi style frames
4. Shady v1 SVG + 3 poses
5. Static React + real copy/mocks
6. Framer Motion baseline
7. GSAP + Lenis on Loop only
8. R3F Hero core
9. Loop visualization SVG circuit
10. Early access form
11. OG image
12. /manifesto + /privacy minimal

**Portfolio leverage:** Loop scene = unique differentiator. Lead case study with it.

---

## Next 3–5 Days

1. **D1:** Lock hero headline. Output: copy.ts v0.
2. **D1–2:** Real-data pool. Output: ui-data.ts v0.
3. **D2–3:** 4 hi-fi style frames + Shady idle pose.
4. **D3–4:** Init Next.js, install deps, scaffold architecture.
5. **D4–5:** Build Shady v1. **Gate:** does it feel alive?
