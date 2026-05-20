"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorField() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Spring lag — slower = heavier inertia feel
  const x = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(124,92,255,0.55) 0%, rgba(92,225,255,0.18) 50%, transparent 70%)",
        boxShadow:
          "0 0 24px rgba(124,92,255,0.4), 0 0 60px rgba(124,92,255,0.12)",
        mixBlendMode: "screen" as const,
      }}
    />
  );
}
