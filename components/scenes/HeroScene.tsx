"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { Button } from "@/components/primitives/Button";
import { Marquee } from "@/components/layout/Marquee";
import { hero } from "@/content/copy";
import type { ShadyState } from "@/components/shady/states";
import { useCTAModal } from "@/src/lib/cta-modal";

// Signal kind → color tokens
const KIND_STYLES: Record<string, { color: string; border: string }> = {
  feeling: { color: "hsl(348 80% 78%)", border: "hsl(348 50% 40% / 0.35)" },
  task:    { color: "hsl(196 85% 76%)", border: "hsl(196 50% 36% / 0.35)" },
  thought: { color: "hsl(252 95% 80%)", border: "hsl(252 50% 50% / 0.40)" },
  loop:    { color: "hsl(42 90% 72%)",  border: "hsl(42 50% 40% / 0.35)"  },
};

// Memory lines from signal positions (in stage viewBox 1000×580) → Shady center (500,450)
const LINES_PRIMARY = [
  { x1: 120, y1: 60,  x2: 500, y2: 450 },
  { x1: 880, y1: 60,  x2: 500, y2: 450 },
  { x1: 90,  y1: 180, x2: 500, y2: 450 },
];
const LINES_SECONDARY = [
  { x1: 910, y1: 180, x2: 500, y2: 450 },
  { x1: 140, y1: 110, x2: 500, y2: 450 },
  { x1: 860, y1: 110, x2: 500, y2: 450 },
];

// Wake sequence: sleep → wake → idle (eyes appear then settle)
const WAKE_SEQUENCE: ShadyState[] = ["sleep", "wake", "idle"];
const WAKE_TIMINGS = [0, 900, 2200];

export function HeroScene() {
  const [shadyState, setShadyState] = useState<ShadyState>("sleep");
  const { openCTA } = useCTAModal();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: track scroll from hero top → hero bottom
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Signals (foreground, z=4) — move most = feel closest
  const signalParallax = useTransform(scrollYProgress, [0, 1], [0, -90]);
  // Memory lines (mid, z=2) — medium rate
  const lineParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);
  // Shady (background anchor, z=3) — barely moves = feels anchored
  const shadyParallax = useTransform(scrollYProgress, [0, 1], [0, -22]);

  useEffect(() => {
    const timers = WAKE_SEQUENCE.slice(1).map((s, i) =>
      setTimeout(() => setShadyState(s), WAKE_TIMINGS[i + 1])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 pt-24 pb-10">
      {/* Ambient violet/cyan gradient — premium atmospheric bg */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 50% 30%, rgba(124,92,255,0.07) 0%, rgba(92,225,255,0.03) 45%, transparent 70%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 0%, rgba(10,8,18,0.35) 55%, rgba(8,6,16,0.85) 100%)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center text-center max-w-5xl w-full">
        {/* Hero stage — Shady + signals + memory lines */}
        <motion.div
          className="relative mx-auto"
          style={{
            width: "min(1100px, 92vw)",
            height: "clamp(360px, 42vw, 580px)",
          }}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 0.7, 0.2, 1] }}
        >
          {/* Memory lines SVG */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: lineParallax, zIndex: 2 }}
          >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 580"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="hsl(252 90% 70%)"
              strokeWidth="0.7"
              strokeOpacity="0.4"
              strokeDasharray="2 6"
              className="animate-line-flow"
            >
              {LINES_PRIMARY.map((l, i) => (
                <line key={`p${i}`} {...l} />
              ))}
            </g>
            <g
              fill="none"
              stroke="hsl(252 50% 60%)"
              strokeWidth="0.5"
              strokeOpacity="0.22"
              strokeDasharray="1 6"
            >
              {LINES_SECONDARY.map((l, i) => (
                <line key={`s${i}`} {...l} />
              ))}
            </g>
          </svg>
          </motion.div>

          {/* Floating life signals */}
          <motion.div className="absolute inset-0" style={{ y: signalParallax }}>
          {hero.signals.map((s, i) => {
            const style = KIND_STYLES[s.kind] ?? KIND_STYLES.thought;
            const cssVars: Record<string, string | number> = {
              left: s.left,
              top: s.top,
              "--start-o": s.startOpacity,
              "--pull-x": `${s.pullX}px`,
              "--pull-y": `${s.pullY}px`,
              color: style.color,
              borderColor: style.border,
              animationDelay: `${s.delay}s`,
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "14px",
              lineHeight: 1.2,
              opacity: s.startOpacity,
              background: "hsl(258 40% 8% / 0.55)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: `1px solid ${style.border}`,
              borderRadius: "999px",
              padding: "7px 12px",
              whiteSpace: "nowrap",
              position: "absolute",
              zIndex: 4,
            };
            return (
              <div
                key={i}
                className={s.pulled ? "animate-signal-pull" : "animate-signal-drift"}
                style={cssVars as React.CSSProperties}
              >
                {s.text}
              </div>
            );
          })}
          </motion.div>

          {/* Shady — minimal procedural orb with blinking eyes (no drawing on page 1) */}
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "62%",
              y: shadyParallax,
              zIndex: 3,
            }}
          >
            <div
              className="animate-eye-flicker"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <Shady state={shadyState} size={220} magnetic />
            </div>
          </motion.div>
        </motion.div>

        {/* Brand eyebrow — pulled into Shady's lower body */}
        <motion.div
          className="relative inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.32em] text-[11px]"
          style={{
            zIndex: 4,
            color: "hsl(252 80% 78% / 0.78)",
            marginTop: "-40px",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 0.7, 0.2, 1] }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, hsl(252 70% 70% / 0.5), transparent)",
            }}
          />
          {hero.brand}
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, hsl(252 70% 70% / 0.5), transparent)",
            }}
          />
        </motion.div>

        {/* Tagline — cold visitor hook, appears early */}
        <motion.p
          className="relative font-serif italic text-center mt-4 max-w-lg"
          style={{
            zIndex: 4,
            color: "hsl(40 6% 90% / 0.62)",
            fontSize: "clamp(14px, 1.6vw, 17px)",
            letterSpacing: "-0.01em",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.tagline}
        </motion.p>

        {/* Headline — pain anchor with italic em */}
        <motion.h1
          className="relative font-display font-normal text-text-primary mt-3 leading-[1.02] tracking-[-0.03em] mx-auto"
          style={{
            zIndex: 4,
            fontSize: "clamp(36px, 5.4vw, 88px)",
            maxWidth: "22ch",
            textShadow:
              "0 4px 24px hsl(258 80% 4% / 0.95), 0 0 80px hsl(258 80% 4% / 0.85), 0 0 160px hsl(252 90% 50% / 0.18)",
          }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.22, 0.7, 0.2, 1] }}
        >
          {hero.pre}{" "}
          <em
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "hsl(40 6% 95% / 0.7)",
            }}
          >
            {hero.italicEm}
          </em>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-body max-w-2xl mt-5 leading-relaxed"
          style={{
            color: "hsl(40 6% 90% / 0.82)",
            zIndex: 4,
            position: "relative",
            textShadow: "0 2px 16px hsl(258 80% 4% / 0.95)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.subhead}
        </motion.p>

        {/* Proof transformation chip — one raw signal becoming structured */}
        <motion.div
          className="relative flex flex-wrap items-center justify-center gap-3.5 mt-5"
          style={{ zIndex: 4 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "hsl(40 6% 90% / 0.55)",
              padding: "7px 14px",
              background: "hsl(258 40% 8% / 0.5)",
              border: "1px dashed hsl(252 30% 28% / 0.5)",
              borderRadius: 999,
              fontSize: 13,
            }}
          >
            {hero.proof.raw}
          </span>
          <span
            className="font-mono uppercase tracking-[0.18em]"
            style={{ color: "hsl(252 80% 70%)", fontSize: 11 }}
          >
            {hero.proof.arrow}
          </span>
          <span
            className="inline-flex items-center gap-2 font-mono"
            style={{
              padding: "7px 14px",
              background: "hsl(252 60% 18% / 0.55)",
              border: "1px solid hsl(252 70% 50% / 0.42)",
              borderRadius: 999,
              color: "hsl(252 100% 88%)",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(252 95% 70%)",
                boxShadow: "0 0 8px hsl(252 95% 65%)",
              }}
            />
            {hero.proof.chip}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="relative flex flex-col sm:flex-row items-center gap-4 mt-9"
          style={{ zIndex: 4 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button variant="primary" onClick={() => openCTA("hero_primary")}>{hero.primaryCta}</Button>
          <Button variant="ghost" href="#capture">{hero.secondaryCta} →</Button>
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div
        className="relative z-10 w-full mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
