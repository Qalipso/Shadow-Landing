"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Demo fragments with pre-computed mock classification results.
// No backend. Clearly framed as demo.
const DEMO_FRAGMENTS = [
  {
    id: "portfolio",
    text: "I keep postponing the portfolio. Again.",
    result: {
      type: "Pattern",
      area: "Career",
      mood: "Avoidance",
      pattern: "Avoidance loop",
      reading:
        "This looks less like laziness and more like avoidance around visibility. Shadow has seen this signal 3 times in the last 3 weeks.",
    },
  },
  {
    id: "sleep",
    text: "Didn\u2019t sleep again. Mind won\u2019t stop.",
    result: {
      type: "Body + Emotion",
      area: "Health",
      mood: "Overwhelm",
      pattern: "Rest deficit",
      reading:
        "Your sleep signals correlate with high cognitive load days. This is the 5th occurrence in 2 weeks. Shadow flagged it as a pattern, not an isolated event.",
    },
  },
  {
    id: "quit",
    text: "What if I just quit everything and start over.",
    result: {
      type: "Decision",
      area: "Identity",
      mood: "Friction",
      pattern: "Reset impulse",
      reading:
        "This comes up when you\u2019re overloaded, not when you\u2019re bored. Shadow noticed this appears after high-pressure weeks, not low-energy ones.",
    },
  },
  {
    id: "creative",
    text: "Haven\u2019t made anything creative in 5 weeks.",
    result: {
      type: "Observation",
      area: "Creative",
      mood: "Depletion",
      pattern: "Creative drought",
      reading:
        "Your map shows a creative gap that began after the last delivery sprint. Energy went to output, not making. Shadow logged the correlation.",
    },
  },
] as const;

type DemoState = "idle" | "reading" | "done";

const PILL_CONFIG = [
  { key: "type" as const,    label: "Type",    color: "#7C5CFF" },
  { key: "area" as const,    label: "Area",    color: "#5CE1FF" },
  { key: "mood" as const,    label: "Mood",    color: "#FFB068" },
  { key: "pattern" as const, label: "Pattern", color: "#9A9AA8" },
];

export function DemoScene() {
  const [selected, setSelected] = useState<number | null>(null);
  const [demoState, setDemoState] = useState<DemoState>("idle");

  const handleSelect = (i: number) => {
    if (demoState === "reading") return;
    setSelected(i);
    setDemoState("reading");
    setTimeout(() => setDemoState("done"), 1500);
  };

  const fragment = selected !== null ? DEMO_FRAGMENTS[selected] : null;

  return (
    <section id="demo" className="relative px-6 py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 500px at 50% 40%, rgba(124,92,255,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            className="text-xs font-mono tracking-widest uppercase text-violet mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            Live Demo
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-4"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            See Shadow classify your life.
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Click a signal. Watch Shadow understand it.
          </motion.p>
          <motion.p
            className="text-[11px] font-mono mt-2"
            style={{ color: "rgba(255,255,255,0.28)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            Mock demo — no backend, no account needed
          </motion.p>
        </div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: signal picker */}
          <div>
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Choose a signal
            </div>
            <div className="space-y-2.5">
              {DEMO_FRAGMENTS.map((f, i) => (
                <motion.button
                  key={f.id}
                  onClick={() => handleSelect(i)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-colors duration-200"
                  style={{
                    background:
                      selected === i
                        ? "rgba(124,92,255,0.12)"
                        : "rgba(18,14,30,0.88)",
                    border: `1px solid ${
                      selected === i
                        ? "rgba(124,92,255,0.38)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: 1.45,
                    color:
                      selected === i
                        ? "rgba(255,255,255,0.92)"
                        : "rgba(255,255,255,0.58)",
                    cursor: demoState === "reading" ? "not-allowed" : "pointer",
                  }}
                  whileHover={demoState !== "reading" ? { scale: 1.02, y: -2 } : {}}
                  whileTap={demoState !== "reading" ? { scale: 0.98, y: 0 } : {}}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  "{f.text}"
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: result area */}
          <div
            className="relative min-h-[340px] rounded-2xl flex items-center justify-center p-6"
            style={{
              background: "rgba(10,10,14,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              {/* Empty state */}
              {selected === null && (
                <motion.div
                  key="empty"
                  className="text-center"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-14 h-14 rounded-full border mx-auto mb-5 flex items-center justify-center"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <span style={{ fontSize: 22, opacity: 0.5 }}>◎</span>
                  </div>
                  <p className="text-sm font-mono">Select a signal to see Shadow work.</p>
                </motion.div>
              )}

              {/* Reading state */}
              {selected !== null && demoState === "reading" && (
                <motion.div
                  key="reading"
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="text-[11px] font-mono tracking-widest uppercase mb-5"
                    style={{ color: "#7C5CFF" }}
                  >
                    Shadow is reading…
                  </div>
                  <div className="flex gap-2 justify-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: "#7C5CFF" }}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
                        transition={{
                          duration: 1.1,
                          delay: i * 0.22,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result state */}
              {selected !== null && demoState === "done" && fragment && (
                <motion.div
                  key="result"
                  className="w-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Input echo */}
                  <div
                    className="mb-5 px-4 py-3 rounded-lg"
                    style={{
                      background: "rgba(124,92,255,0.06)",
                      border: "1px dashed rgba(124,92,255,0.22)",
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.52)",
                    }}
                  >
                    "{fragment.text}"
                  </div>

                  {/* Classification pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {PILL_CONFIG.map((pill, i) => (
                      <motion.span
                        key={pill.key}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono"
                        style={{
                          color: pill.color,
                          border: `1px solid ${pill.color}38`,
                          background: `${pill.color}10`,
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                      >
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>
                          {pill.label} ·
                        </span>{" "}
                        {fragment.result[pill.key]}
                      </motion.span>
                    ))}
                  </div>

                  {/* Shadow reading card */}
                  <motion.div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(18,14,30,0.88)",
                      border: "1px solid rgba(124,92,255,0.18)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.55 }}
                  >
                    <div
                      className="text-[9px] font-mono uppercase tracking-widest mb-3"
                      style={{ color: "#7C5CFF" }}
                    >
                      Shadow reading
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      "{fragment.result.reading}"
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
