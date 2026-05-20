// Single source of truth for all landing copy.

export const hero = {
  brand: "Shadow AI",
  tagline: "AI memory for people with too much in their head.",
  // Headline rendered as `${pre} ${italicEm}` — last clause is Spectral italic em.
  pre: "Stop holding your whole life",
  italicEm: "in your head.",
  subhead:
    "Shadow captures thoughts, tasks, emotions and daily signals \u2014 then turns them into living memory you can navigate.",
  proof: {
    raw: "\u201CI keep postponing the portfolio.\u201D",
    arrow: "becomes \u2192",
    chip: "Pattern \u00B7 Avoidance loop \u00B7 3rd time this month",
  },
  primaryCta: "Enter Shadow",
  secondaryCta: "See how it works",
  marqueeLabel: "Built around\nShadow\u2019s core concepts",
  // Floating signals around Shady in hero stage. Reduced to 4 — more intentional.
  signals: [
    { text: "didn\u2019t sleep again",  kind: "feeling", left: "12%", top: "8%",  pullX:  160, pullY:  140, startOpacity: 0.85, delay: -1.2, pulled: true  },
    { text: "portfolio draft",          kind: "task",    left: "88%", top: "8%",  pullX: -160, pullY:  140, startOpacity: 0.85, delay: -3.4, pulled: true  },
    { text: "why am I avoiding this?",  kind: "thought", left: "9%",  top: "30%", pullX:  170, pullY:   60, startOpacity: 0.75, delay: -5.8, pulled: true  },
    { text: "missed workout",           kind: "loop",    left: "86%", top: "18%", pullX:    0, pullY:    0, startOpacity: 0.55, delay: -0.6, pulled: false },
  ],
} as const;

// Marquee items — Shadow system concepts (per new design bundle).
export const marqueeConcepts: Array<{ letter: string; name: string; color: string }> = [
  { letter: "M", name: "Memory",   color: "#8b5cf6" },
  { letter: "F", name: "Focus",    color: "#22d3ee" },
  { letter: "P", name: "Patterns", color: "#a855f7" },
  { letter: "L", name: "Life Map", color: "#6366f1" },
  { letter: "\u2295", name: "Labs", color: "#f59e0b" },
  { letter: "S", name: "Shady",    color: "#ec4899" },
  { letter: "C", name: "Clarity",  color: "#34d399" },
];

export const audienceHooks: Array<{ tag: string; line: string }> = [
  { tag: "builder",    line: "hiring decision" },
  { tag: "creator",    line: "lyric idea for the bridge" },
  { tag: "transition", line: "new city in March" },
  { tag: "self-dev",   line: "pattern again" },
  { tag: "builder",    line: "runway question" },
  { tag: "creator",    line: "cover concept" },
  { tag: "transition", line: "what if I quit" },
  { tag: "self-dev",   line: "why this loop" },
];

export const overload = {
  headline: "Tasks. Thoughts. Emotions. Loops you never closed.",
  subhead: "Your life is producing more signals than your mind can hold.",
} as const;

export const capture = {
  eyebrow: "Capture",
  headline: "Throw the mess in. Shadow knows where it goes.",
  subhead:
    "Capture anything. Shadow understands what it is, where it belongs and what to do with it.",
  inboxPlaceholder: "Drop a thought, task, emotion or signal.",
  inboxHint: "Press \u23CE to capture",
} as const;

export const memory = {
  eyebrow: "Living Memory",
  headline: "AI chats forget you. Shadow doesn\u2019t.",
  subhead:
    "Every signal stays connected to its context — not just what you said, but what it meant, when it happened, and what came after.",
  objectionKillers: [
    "Not a chat. It's memory that grows.",
    "Your memory is not just a list.",
  ],
  knowledgeGap:
    "Shadow noticed: we don\u2019t yet know what motivates you most.",
  nodes: [
    { id: "ideas", label: "Ideas", color: "#7C5CFF" },
    { id: "patterns", label: "Patterns", color: "#7C5CFF" },
    { id: "emotions", label: "Emotions", color: "#FFB068" },
    { id: "decisions", label: "Decisions", color: "#C8C8D0" },
    { id: "tasks", label: "Tasks", color: "#5CE1FF" },
    { id: "moments", label: "Moments", color: "#FFB068" },
    { id: "goals", label: "Goals", color: "#5CE1FF" },
    { id: "observations", label: "Observations", color: "#7C5CFF" },
  ],
} as const;

export const modes = {
  eyebrow: "Modes",
  headline: "One Shadow. Three states of mind.",
  subhead: "Shadow shifts with you. Each mode changes how it listens, what it surfaces, and how it helps.",
  items: [
    {
      id: "capture",
      label: "Capture",
      shadyState: "absorb" as const,
      accent: "#7C5CFF",
      icon: "◎",
      example: "Dropped: \"Idea for the onboarding rewrite\"",
      description: "Open intake. Everything is worth capturing. No judgment, no structure \u2014 just catch.",
    },
    {
      id: "reflect",
      label: "Reflect",
      shadyState: "reflect" as const,
      accent: "#FFB068",
      icon: "◑",
      example: "Pattern surfaced: avoidance loop \u00b7 3rd time",
      description: "Slow review. Patterns surface. Shadow asks one question and waits for a real answer.",
    },
    {
      id: "recover",
      label: "Recover",
      shadyState: "idle" as const,
      accent: "#5CE1FF",
      icon: "○",
      example: "Shadow watching. No prompts tonight.",
      description: "Rest mode. Shadow holds context, asks nothing. Presence without pressure.",
    },
  ],
} as const;

export const loop = {
  eyebrow: "The Loop",
  headline: "The only AI that gets more accurate the longer you use it.",
  subhead:
    "Every signal makes Shadow understand you better. Six steps, every day, quietly building your map.",
  nodes: [
    { id: "capture", label: "Capture", note: "you drop a signal" },
    { id: "structure", label: "Structure", note: "Shadow understands it" },
    { id: "memory", label: "Memory", note: "it connects to your past" },
    { id: "gap", label: "Knowledge Gap", note: "Shadow notices what is missing" },
    { id: "question", label: "Question", note: "asks one precise question" },
    { id: "update", label: "Update", note: "your map evolves" },
  ],
  aiQuestion:
    "You skipped Shadow 3 days in a row. When you skip, what usually happens \u2014 you forget, or it doesn\u2019t pull you back?",
  dailySync: {
    title: "Daily Sync Complete",
    items: [
      "Current state updated",
      "2 memory signals captured",
      "1 initiative generated",
    ],
  },
} as const;

export const labs = {
  eyebrow: "Experiments",
  headline: "Built for self-discovery.",
  subhead: "Tools that go beyond capture. Each one surfaces something you wouldn\u2019t see on your own.",
} as const;

export const trust = {
  headline: "Your memory should belong to you.",
  body: "Shadow is built around user control. What it remembers, how it stores it, and when it forgets \u2014 that\u2019s yours to decide.",
  principles: [
    "Designed around user control",
    "Built with privacy as a core product principle",
    "Clear controls for what Shadow remembers",
    "Your memory. Your model. Your rules.",
  ],
} as const;

export const proof = {
  eyebrow: "Early Access",
  headline: "People using Shadow every day.",
  testimonials: [
    {
      quote: "I stopped keeping 6 different lists. Shadow is the only place I put things now. It actually remembers what happened to them.",
      name: "M.R.",
      context: "Freelance designer, 3 months in",
    },
    {
      quote: "The Map made me realise I hadn't done anything creative in 5 weeks. Not because I was busy — because I was avoiding it.",
      name: "A.L.",
      context: "Startup founder, 6 weeks in",
    },
    {
      quote: "Every AI I tried needed me to manage it. Shadow manages itself. I just drop things.",
      name: "J.K.",
      context: "Product manager, 2 months in",
    },
  ],
  pricing: {
    label: "Pricing",
    plans: [
      {
        name: "Early Access",
        price: "Free",
        note: "Limited seats. No card required.",
        features: [
          "Unlimited entries",
          "AI classification",
          "Memory search",
          "Daily Sync",
          "Shadow Orb chat",
        ],
        cta: "Join the waitlist",
        highlight: true,
      },
      {
        name: "Shadow Pro",
        price: "Coming soon",
        note: "Full memory engine + team features.",
        features: [
          "Everything in Early Access",
          "Deeper memory (6 months+)",
          "Weekly AI digest",
          "Custom life areas",
          "Team workspace",
        ],
        cta: "Get notified",
        highlight: false,
      },
    ] as const,
  },
} as const;

export const finalCta = {
  headline: "You don\u2019t have to hold all of this alone.",
  subhead: "Start with one signal. Let Shadow build the memory around it.",
  primaryCta: "Start building memory",
  secondaryCta: "Enter Shadow",
} as const;

export const nav = {
  links: [
    { label: "How it works", href: "#capture" },
    { label: "Memory", href: "#memory" },
    { label: "Modes", href: "#modes" },
    { label: "Loop", href: "#loop" },
    { label: "Privacy", href: "#trust" },
  ],
  cta: "Enter Shadow",
} as const;
