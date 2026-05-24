# Shadow

> **AI memory for people with too much in their head.**
>
> Built for the moment you realize your life produces more signal than your mind can hold.

Shadow is not another chatbot. Not a notes app. Not a journal with a robot stapled on. Shadow is a **living memory layer** — an AI that watches the quiet pattern of your days and turns the mess of thoughts, tasks, emotions and avoidance loops into something you can actually navigate.

> *"I keep postponing the portfolio."* → **Pattern · Avoidance loop · 3rd time this month.**

That move — raw signal becoming named pattern — is the entire product.

This repository hosts the **public landing** that introduces Shadow to the world. The product itself lives in a separate app; this is the story we tell before someone signs up.

🌐 **Live:** [shadow-landing-sage.vercel.app](https://shadow-landing-sage.vercel.app)
📚 **Wiki:** [Vision · Persona · Memory Layer · Mascot · Tech-as-Craft · Roadmap](https://github.com/Qalipso/Shadow-Landing/wiki)
🪞 **Waitlist:** [/#capture](https://shadow-landing-sage.vercel.app/#capture)

---

## Why Shadow exists

LLMs got brilliant at conversation. They stayed catastrophic at memory. Every chat starts from zero. Every insight evaporates the moment the tab closes. You end up holding context the model refuses to hold.

Shadow is the opposite stance:

| AI chats | Shadow |
|---|---|
| Forget you between sessions | Remembers *you* across years |
| Optimize for one-shot answers | Optimizes for living context |
| Treat you like a query | Treats you like a person with history |
| You curate prompts | Shadow curates patterns |

You don't talk *to* Shadow. You talk *through* it. It listens, classifies, connects, and quietly hands you back the version of yourself you keep losing track of.

---

## What the landing communicates

Each scene is a beat in the Shadow story:

| Scene | Promise it makes |
|---|---|
| **Hero** | "Stop holding your whole life in your head." First contact with **Shady**, the mascot. |
| **Overload** | Names the pain. The phone-in-bed, the loops, the 17 open tabs in your head. |
| **Capture** | One inbox. Throw the mess in. Shadow knows where it goes. |
| **Demo** | A mock classifier. Click a raw thought, watch Shadow parse it into Emotion / Pattern / Task / Next-action. No backend. Just the promise made visible. |
| **Memory** | A living graph. AI chats forget you. Shadow doesn't. |
| **Modes** | Capture · Reflect · Recover. One Shadow, three states of mind. |
| **Loop** | The orbital vortex — how raw signal becomes named pattern. |
| **Labs** | Where Shadow runs experiments *on itself* with you. |
| **Trust** | Privacy as a posture, not a footer link. |
| **Proof** | Real signals from real users. |
| **CTA** | The glass portal. Step in. |

Every section is a component in [`components/scenes/`](components/scenes/). Every line of marketing copy lives in [`content/copy.ts`](content/copy.ts) — one file, one source of truth, one voice.

---

## Meet Shady

Shadow has a mascot. Not a logo. A **procedural orb** built from animated SVG layers in [`components/shady/`](components/shady/). Shady has states: `sleep`, `wake`, `idle`, `absorb`, `reflect`, `structure`. As you scroll, Shady changes posture. It's not decoration — it's the visual proxy for what the AI is doing at that moment in the narrative.

When the page first loads, Shady wakes (`sleep → wake → idle`, timed at 0 / 900 ms / 2200 ms). It's the smallest possible piece of theater, and it does most of the emotional work.

---

## The product behind the landing

Shadow itself is:

- **Inbox** — capture any thought, task, emotion, or signal in one keystroke
- **Classification** — Shadow auto-detects what kind of signal it is, what it means, where it belongs
- **Memory graph** — every signal becomes a node connected to the rest of your life
- **Patterns** — repeated signals surface as named loops, with frequency and context
- **Modes** — Capture (open intake), Reflect (slow review), Recover (presence without pressure)
- **Labs** — self-knowledge experiments that Shadow runs on you, with you
- **Shady chat** — talk to your own memory; it remembers everything you've ever fed it

The public landing's job is to make all of that feel **inevitable**, not abstract.

---

## Tech as craft

This site is engineered like a product, not a brochure.

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 + React 19 | RSC by default, instant deploys to Vercel |
| Language | TypeScript strict | One contract from copy to component |
| Styling | Tailwind v3 + custom keyframes | Design-token discipline, raw CSS where physics demands it |
| Animation | Framer Motion v11 | Spring physics for *every* hover, not just hero |
| Persistence | Supabase REST (waitlist) | Anonymous insert, RLS, fire-and-forget |
| Testing | Playwright | 20 e2e flows across landing + app + cross-product |

A few examples of what "engineered like a product" means:

- **Magnetic CTAs** — the primary button has spring-lagged `x/y` pull (28% strength, `stiffness: 280, damping: 22`). It feels like the cursor is in conversation with the button.
- **Three-layer parallax** — signals, SVG lines, and Shady scroll at different rates (`-90 / -40 / -22 px`) so the hero stage feels like a stage, not a flat image.
- **Loop scene** — 300vh sticky orbital vortex driven by `useSpring(scrollYProgress, …)`. Scroll *is* the animation timeline.
- **Trust cards** — full 3D tilt via `useSpring` on `rotateX/rotateY/translateZ`, with cursor-tracked specular highlights.
- **Honeypot + double-submit guard** in [`components/forms/WaitlistForm.tsx`](components/forms/WaitlistForm.tsx) — captures emails cleanly, drops bots silently.

Full architecture map: [Wiki → Tech as Craft](https://github.com/Qalipso/Shadow-Landing/wiki/Tech-as-Craft).

---

## Run it

```bash
git clone https://github.com/Qalipso/Shadow-Landing
cd Shadow-Landing
npm install
npm run dev          # http://localhost:3008
npm run build        # production build
npm run test:e2e     # 20 Playwright flows against prod URL
```

### Env

```bash
NEXT_PUBLIC_SUPABASE_URL=…           # optional — landing falls back to localStorage
NEXT_PUBLIC_SUPABASE_ANON_KEY=…
NEXT_PUBLIC_WAITLIST_ENDPOINT=…      # optional fan-out (n8n / Zapier / Resend)
NEXT_PUBLIC_APP_URL=…                # where "Sign in" deep-links go
```

No env? Form still captures locally + the page works end-to-end. Designed to never embarrass itself in front of a portfolio reviewer.

---

## Repo layout

```
shadowwwLanding/
├── app/                  Next.js App Router entry
├── components/
│   ├── forms/            CTAModal + WaitlistForm (Supabase + honeypot)
│   ├── layout/           Nav, Footer, Marquee
│   ├── primitives/       Magnetic Button, Headline
│   ├── scenes/           One file per narrative beat (Hero…CTA)
│   ├── shady/            The procedural orb mascot
│   └── ui/               CursorField (spring-lagged glow)
├── content/copy.ts       Every word on the site, one file
├── src/lib/              cta-modal, analytics, app-url builders
├── tests/e2e/            8 Playwright spec files, 20 flows
└── public/assets/        Shady state images
```

---

## Status

- ✅ Landing v2 — narrative, mascot, motion physics, 11 scenes
- ✅ Waitlist — Supabase + honeypot + analytics events
- ✅ E2E suite — 20 flows, runs against live prod by default
- ⏳ App (`shadow/web`) — Inbox, Classification, Memory graph, Shady chat, Labs (separate repo, private beta)
- ⏳ Public Labs preview — "Self-Knowledge Engine" demo on the marketing site

Roadmap lives in [Wiki → Roadmap](https://github.com/Qalipso/Shadow-Landing/wiki/Roadmap).

---

## Philosophy

> Most AI products are built around the model. Shadow is built around *you*.
>
> The model is a tool. The memory is the product. The patterns are the gift.

If that idea pulls at you — **[get on the waitlist](https://shadow-landing-sage.vercel.app/#capture)**.

If you want to see how the cursor field feels at 144 Hz — clone it and `npm run dev`. Both reactions are valid.

---

**License:** MIT
**Built by:** [Qalipso](https://github.com/Qalipso) · Montevideo · 2026
