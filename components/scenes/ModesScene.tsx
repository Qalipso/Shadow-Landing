"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { modes } from "@/content/copy";
import type { ShadyState } from "@/components/shady/states";

const SPRING = { type: "spring" as const, stiffness: 360, damping: 24 };

type ModeItem = (typeof modes.items)[number];

function ModeCard({
  mode,
  index,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
  mode: ModeItem;
  index: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const shadyAnim = useAnimation();

  const handleHoverStart = async () => {
    onHoverStart();
    // Slide out to the right
    await shadyAnim.start({
      x: 90,
      opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    });
    // Jump to left
    shadyAnim.set({ x: -90, opacity: 0 });
    // Slide back in from the left
    await shadyAnim.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
    });
  };

  const handleHoverEnd = () => {
    onHoverEnd();
    shadyAnim.stop();
    shadyAnim.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative flex flex-col overflow-hidden cursor-default h-full"
        style={{
          background: "rgba(12,8,22,0.92)",
          border: `1px solid ${
            isHovered ? `${mode.accent}38` : "rgba(255,255,255,0.06)"
          }`,
          borderRadius: 16,
          padding: "28px",
          transition: "border-color 0.3s ease",
        }}
        animate={{
          scale: isHovered ? 1.055 : isDimmed ? 0.97 : 1,
          opacity: isDimmed ? 0.42 : 1,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? `0 28px 70px ${mode.accent}28, 0 8px 28px rgba(0,0,0,0.5)`
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={SPRING}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {/* Corner glow on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${mode.accent}14 0%, transparent 65%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Mode icon */}
        <div
          className="text-2xl mb-5 font-serif"
          style={{ color: mode.accent }}
        >
          {mode.icon}
        </div>

        {/* Shady — floats freely in the card */}
        <div className="mb-5">
          <motion.div animate={shadyAnim}>
            <Shady
              state={mode.shadyState as ShadyState}
              size={72}
              magnetic={false}
            />
          </motion.div>
        </div>

        {/* Label */}
        <div
          className="text-[11px] font-mono uppercase tracking-widest mb-2"
          style={{ color: mode.accent }}
        >
          {mode.label} Mode
        </div>

        {/* Description */}
        <p className="text-text-secondary text-[14px] leading-relaxed mb-6 flex-1">
          {mode.description}
        </p>

        {/* Example chip */}
        <div
          className="rounded-lg px-3 py-2 text-[11px] font-mono leading-snug"
          style={{
            background: `${mode.accent}0C`,
            border: `1px solid ${mode.accent}22`,
            color: "rgba(255,255,255,0.42)",
          }}
        >
          {mode.example}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ModesScene() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="modes" className="relative px-6 py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(124,92,255,0.05) 0%, transparent 55%)",
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
            {modes.eyebrow}
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-4"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {modes.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {modes.subhead}
          </motion.p>
        </div>

        {/* 3-column card grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          {modes.items.map((mode, i) => (
            <ModeCard
              key={mode.id}
              mode={mode}
              index={i}
              isHovered={hovered === i}
              isDimmed={hovered !== null && hovered !== i}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
