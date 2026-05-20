// Real mock data for product UI fragments.
// Zero lorem. Every value should feel like a real Shadow signal.

export type SignalType = "thought" | "task" | "emotion" | "decision" | "body" | "money";

export const signalColors: Record<SignalType, string> = {
  thought: "#7C5CFF",
  task: "#5CE1FF",
  emotion: "#FFB068",
  decision: "#C8C8D0",
  body: "#5CE1FF",
  money: "#7C5CFF",
};

export const overloadFragments: Array<{ text: string; type: SignalType }> = [
  { text: "call mom", type: "task" },
  { text: "-2.4kg this month", type: "body" },
  { text: "meeting 4pm", type: "task" },
  { text: "didn\u2019t sleep again", type: "body" },
  { text: "idea: rewrite onboarding", type: "thought" },
  { text: "taxes due", type: "money" },
  { text: "why am I so tired", type: "emotion" },
  { text: "what if I quit", type: "decision" },
  { text: "lyric idea for the bridge", type: "thought" },
  { text: "bug from yesterday", type: "task" },
  { text: "hiring decision", type: "decision" },
  { text: "runway question", type: "money" },
  { text: "pattern again", type: "thought" },
  { text: "new city in March", type: "decision" },
  { text: "who am I writing for", type: "thought" },
  { text: "cover concept", type: "thought" },
  { text: "rent on the 5th", type: "money" },
  { text: "felt clear in the morning", type: "emotion" },
  { text: "scrolled for an hour", type: "emotion" },
  { text: "skipped the workout", type: "body" },
];

export const inboxExample = {
  raw: "I keep postponing the same task and I think it is not about time, it is about fear.",
  classification: {
    types: ["Emotion", "Pattern", "Task"] as const,
    destination: "Memory Layer \u00b7 Pattern: Avoidance Loop",
    nextAction: "One 25-minute next step, set before sleep.",
    confidence: 0.84,
  },
};

export const recentSignals: Array<{ text: string; type: SignalType; when: string }> = [
  { text: "Energy dropped after the call", type: "emotion", when: "2h ago" },
  { text: "Portfolio outline draft v1", type: "thought", when: "yesterday" },
  { text: "Slept 5h again", type: "body", when: "this morning" },
];

// Labs artifact cards
export const labsArtifacts = [
  {
    id: "personality-core",
    name: "Personality Core Scan",
    description: "A structured read of your recurring patterns, values, and friction points across 30 days of signals.",
    status: "experimental" as const,
    accent: "#7C5CFF",
  },
  {
    id: "dream-capture",
    name: "Dream Capture",
    description: "Log fragments on wake. Shadow finds emotional threads and recurring symbols across your sleep signals.",
    status: "building" as const,
    accent: "#5CE1FF",
  },
  {
    id: "life-pattern-map",
    name: "Life Pattern Map",
    description: "Visual graph of your recurring cycles: energy patterns, decision loops, emotional weather over time.",
    status: "experimental" as const,
    accent: "#FFB068",
  },
  {
    id: "shadow-mirror",
    name: "Shadow Mirror",
    description: "Weekly reflection distilled from your signals. Not a summary \u2014 a mirror. What Shadow noticed that you didn\u2019t.",
    status: "available" as const,
    accent: "#7C5CFF",
  },
  {
    id: "emotional-timeline",
    name: "Emotional Timeline",
    description: "A longitudinal view of your emotional state across months. Correlates mood with events, sleep, work, and decisions.",
    status: "building" as const,
    accent: "#FFB068",
  },
  {
    id: "identity-thread",
    name: "Identity Thread",
    description: "Shadow tracks how your language, goals, and values evolve. See who you\u2019re becoming across time.",
    status: "experimental" as const,
    accent: "#5CE1FF",
  },
];
