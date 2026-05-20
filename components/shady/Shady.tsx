"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { shadyStates, type ShadyState } from "./states";

interface ShadyProps {
  state?: ShadyState;
  size?: number;
  magnetic?: boolean;
  className?: string;
}

/**
 * Shady v2 — character-first design.
 * Small, mysterious, intelligent. Smoky edges. Two subtle glowing eyes.
 * No mouth, no limbs. Quiet. Alive.
 */
export function Shady({
  state = "idle",
  size = 180,
  magnetic = true,
  className = "",
}: ShadyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const config = shadyStates[state];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!magnetic) return;
    const node = ref.current;
    if (!node) return;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist > 360 || dist === 0) { rawX.set(0); rawY.set(0); return; }
        const f = (1 - dist / 360) * 16;
        rawX.set((dx / dist) * f);
        rawY.set((dy / dist) * f);
      });
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [magnetic, rawX, rawY]);

  // Eye dot size: ~2.8% of container, scaled by state multiplier
  const eyeDot = Math.max(3, Math.round(size * 0.028 * config.eyeSize));
  const eyeGlow = eyeDot * 1.8;

  return (
    <div
      ref={ref}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ink shadow drip — beneath orb */}
      <div
        style={{
          position: "absolute",
          bottom: "-6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "52%",
          height: "10%",
          background: "radial-gradient(ellipse, rgba(4, 3, 10, 0.9) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Outer atmospheric haze — subtle, no rectangle bleed */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `radial-gradient(circle at 50% 48%, ${config.haloColor} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ x, y }}
        animate={{ scale: config.scale, rotate: config.rotate }}
        transition={{
          scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
          rotate: { duration: 12, ease: "linear" },
        }}
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-[1400ms]"
          style={{ boxShadow: config.glow }}
        />

        {/* Core body — breathes */}
        <div
          className="absolute inset-0 rounded-full animate-breathe"
          style={{ background: config.inner }}
        />

        {/* Smoke wisps — asymmetric, give character. No filter:blur (GPU layer) */}
        <div
          style={{
            position: "absolute",
            width: "44%",
            height: "52%",
            left: "10%",
            top: "6%",
            background: "radial-gradient(ellipse, rgba(124,92,255,0.09) 0%, transparent 65%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            transform: "rotate(-18deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "36%",
            height: "42%",
            right: "8%",
            bottom: "10%",
            background: "radial-gradient(ellipse, rgba(92,225,255,0.06) 0%, transparent 65%)",
            borderRadius: "40% 70% 30% 60% / 60% 40% 70% 30%",
            transform: "rotate(22deg)",
          }}
        />

        {/* Inner highlight */}
        <div
          style={{
            position: "absolute",
            inset: "22%",
            background: "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.06) 0%, transparent 52%)",
            borderRadius: "50%",
          }}
        />

        {/* Rim conic arc — no mix-blend-screen/filter (GPU layers) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 175deg, rgba(124,92,255,0.0) 0deg, rgba(124,92,255,0.18) 90deg, rgba(92,225,255,0.18) 270deg, rgba(124,92,255,0.0) 360deg)",
            opacity: 0.55,
          }}
        />

        {/* Eyes — subtle, glowing, asymmetric */}
        {config.eyeVisible && (
          <div
            className="absolute inset-0"
            style={{ opacity: config.eyeOpacity, transition: "opacity 0.8s ease" }}
          >
            {/* Left eye */}
            <span
              className="absolute rounded-full animate-shady-blink"
              style={{
                width: eyeDot,
                height: eyeDot,
                left: "37%",
                top: "41%",
                marginLeft: -eyeDot / 2,
                marginTop: -eyeDot / 2,
                background: config.eyeColor,
                boxShadow: `0 0 ${eyeGlow}px ${eyeGlow / 2}px ${config.eyeColor}70`,
                display: "block",
              }}
            />
            {/* Right eye — slightly offset for character asymmetry */}
            <span
              className="absolute rounded-full animate-shady-blink"
              style={{
                width: eyeDot,
                height: eyeDot,
                left: "59%",
                top: "43%",
                marginLeft: -eyeDot / 2,
                marginTop: -eyeDot / 2,
                background: config.eyeColor,
                boxShadow: `0 0 ${eyeGlow}px ${eyeGlow / 2}px ${config.eyeColor}70`,
                display: "block",
                animationDelay: "0.15s",
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
