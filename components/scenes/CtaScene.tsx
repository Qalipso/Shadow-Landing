"use client";

import { motion } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { Button } from "@/components/primitives/Button";
import { finalCta } from "@/content/copy";
import { useCTAModal } from "@/src/lib/cta-modal";

// Floating signal fragments orbiting Shady
const FRAGMENTS: Array<{ text: string; x: number; y: number; delay: number }> = [
  { text: "mood: focused",         x: -240, y:  -50, delay: 0.00 },
  { text: "task \u00b7 design review",  x:  190, y: -105, delay: 0.12 },
  { text: "energy +12%",           x: -195, y:   80, delay: 0.24 },
  { text: "pattern: avoidance",    x:  215, y:   62, delay: 0.36 },
  { text: "memory updated",        x: -100, y: -135, delay: 0.08 },
  { text: "signal captured",       x:  120, y:  125, delay: 0.20 },
];

export function CtaScene() {
  const { openCTA } = useCTAModal();

  return (
    <section
      id="cta"
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 50% 45%, rgba(124,92,255,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Glass portal card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: "rgba(14,10,26,0.88)",
          border: "1px solid rgba(124,92,255,0.18)",
          boxShadow:
            "0 0 80px rgba(124,92,255,0.08), 0 0 0 1px rgba(255,255,255,0.04) inset",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Portal inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.14) 0%, transparent 55%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center px-8 py-14 sm:px-14">
          {/* Shady with orbiting fragments */}
          <motion.div
            className="relative mb-10 w-full max-w-[520px]"
            style={{ height: 280 }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Shady */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Shady state="system" size={144} magnetic={false} />
            </div>

            {/* Floating fragment pills */}
            {FRAGMENTS.map((f, i) => (
              <motion.div
                key={i}
                className="absolute glass rounded-lg px-3 py-1.5 text-xs font-mono whitespace-nowrap pointer-events-none"
                style={{
                  left: `calc(50% + ${f.x}px)`,
                  top: `calc(50% + ${f.y}px)`,
                  transform: "translate(-50%, -50%)",
                  color: "rgba(255,255,255,0.36)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8 + f.delay,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {f.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {finalCta.headline}
          </motion.h2>

          {/* Subhead */}
          <motion.p
            className="text-text-secondary text-body mb-10 max-w-md"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.55 }}
          >
            {finalCta.subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.72 }}
          >
            <Button
              variant="primary"
              onClick={() => openCTA("cta_scene_primary")}
            >
              {finalCta.primaryCta}
            </Button>
            <Button
              variant="ghost"
              onClick={() => openCTA("other")}
            >
              {finalCta.secondaryCta} →
            </Button>
          </motion.div>

          {/* Trust note */}
          <motion.p
            className="mt-8 text-[11px] font-mono"
            style={{ color: "rgba(255,255,255,0.24)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 1 }}
          >
            Free early access · No card required · Limited seats
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
