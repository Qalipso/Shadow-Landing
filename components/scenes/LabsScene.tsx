"use client";

import { motion } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { labs } from "@/content/copy";

// 3 curated experiment cards — strongest, most self-contained
const EXPERIMENTS = [
  {
    id: "shadow-mirror",
    name: "Shadow Mirror",
    what: "Weekly reflection distilled from your signals — not a summary, a mirror. What Shadow noticed that you didn\u2019t.",
    reveals: "Blind spots in your patterns",
    time: "5 min weekly",
    status: "available" as const,
    accent: "#7C5CFF",
  },
  {
    id: "personality-core",
    name: "Personality Core Scan",
    what: "A structured read of your recurring patterns, values, and friction points across 30 days of signals.",
    reveals: "Your operating system",
    time: "One-time + monthly",
    status: "experimental" as const,
    accent: "#FFB068",
  },
  {
    id: "life-pattern-map",
    name: "Life Pattern Map",
    what: "Visual graph of your recurring cycles: energy patterns, decision loops, emotional weather over time.",
    reveals: "The shape of your life",
    time: "Grows with use",
    status: "experimental" as const,
    accent: "#5CE1FF",
  },
] as const;

const STATUS_COLORS = {
  available: "#5CE1FF",
  experimental: "#FFB068",
  building: "#9A9AA8",
} as const;

const STATUS_LABELS = {
  available: "Available",
  experimental: "Experimental",
  building: "Coming later",
} as const;

export function LabsScene() {
  return (
    <section
      id="labs"
      className="relative px-6 py-32 overflow-hidden"
      style={{ background: "#060410" }}
    >
      {/* Portal glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 500,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(92,225,255,0.1) 0%, transparent 60%)",
          marginTop: -100,
        }}
      />

      {/* Outer atmospheric rings */}
      <div
        className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 280,
          height: 280,
          border: "1px solid rgba(92,225,255,0.1)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 360,
          height: 360,
          border: "1px solid rgba(124,92,255,0.06)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Shady — portal state */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Shady state="portal" size={130} magnetic={false} />
          </motion.div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <motion.div
            className="text-xs font-mono tracking-widest uppercase text-cyan mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            {labs.eyebrow}
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {labs.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {labs.subhead}
          </motion.p>
        </div>

        {/* Experiment cards — 3 columns */}
        <div className="grid sm:grid-cols-3 gap-4">
          {EXPERIMENTS.map((exp, i) => (
            // Outer: eased scroll reveal
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
            {/* Inner: spring hover lift */}
            <motion.div
              className="relative rounded-2xl p-6 flex flex-col overflow-hidden group h-full"
              style={{
                background: "rgba(10,6,20,0.95)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              whileHover={{
                y: -8,
                borderColor: `${exp.accent}28`,
                boxShadow: `0 20px 60px ${exp.accent}14, 0 8px 24px rgba(0,0,0,0.5)`,
              }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              {/* Corner glow on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at top right, ${exp.accent}14 0%, transparent 65%)`,
                }}
              />

              {/* Status + color accent bar */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    color: STATUS_COLORS[exp.status],
                    border: `1px solid ${STATUS_COLORS[exp.status]}38`,
                    background: `${STATUS_COLORS[exp.status]}0E`,
                  }}
                >
                  {STATUS_LABELS[exp.status]}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: exp.accent,
                    boxShadow: `0 0 10px ${exp.accent}80`,
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="font-display font-medium text-[16px] text-text-primary mb-3 leading-snug">
                {exp.name}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-[13px] leading-relaxed mb-6 flex-1">
                {exp.what}
              </p>

              {/* Meta row */}
              <div className="border-t border-white/5 pt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>Reveals</span>
                  <span style={{ color: exp.accent, opacity: 0.85 }}>{exp.reveals}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>Time</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{exp.time}</span>
                </div>
              </div>
            </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
