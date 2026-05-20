"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { trust } from "@/content/copy";

// Each card has independent tilt + float physics
function Float3DCard({
  principle,
  index,
}: {
  principle: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Spring-damped rotation — stiffness = snappy, damping = no wobble
  const rotX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotY = useSpring(0, { stiffness: 220, damping: 22 });
  const tz   = useSpring(0, { stiffness: 280, damping: 26 });

  // Specular highlight position (% of card)
  const hlX = useSpring(50, { stiffness: 160, damping: 18 });
  const hlY = useSpring(30, { stiffness: 160, damping: 18 });

  // Derive highlight gradient from spring values
  const specular = useTransform(
    [hlX, hlY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, transparent 55%)`
  );

  // Shadow depth: deeper when hovered (tz > 0)
  const shadow = useTransform(
    tz,
    [0, 18],
    [
      "0 2px 6px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3), 0 24px 48px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
      "0 4px 8px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.38), 0 48px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
    ]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5…0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rotX.set(-y * 18);
    rotY.set( x * 18);
    tz.set(18);
    hlX.set(((e.clientX - rect.left) / rect.width) * 100);
    hlY.set(((e.clientY - rect.top)  / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
    tz.set(0);
    hlX.set(50);
    hlY.set(30);
  };

  // Staggered float offset so cards don't all bob at once
  const floatDuration = 3.2 + index * 0.55;
  const floatDelay    = index * 0.4;

  return (
    // Outer wrapper: idle float animation (y only, no conflict with tilt)
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      style={{ perspective: "900px" }}
    >
      {/* Inner: mouse-tracked 3D tilt */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          translateZ: tz,
          transformStyle: "preserve-3d",
          boxShadow: shadow,
          background: "rgba(16, 11, 28, 0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "20px 22px",
          textAlign: "left",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.9,
          delay: 0.25 + index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Specular highlight — follows cursor */}
        <motion.div
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{ background: specular }}
        />

        {/* Content (needs translateZ to sit above pseudo-layers) */}
        <div style={{ position: "relative" }}>
          <span
            className="block w-1.5 h-1.5 rounded-full mb-4"
            style={{
              background: "rgba(124, 92, 255, 0.85)",
              boxShadow: "0 0 8px rgba(124,92,255,0.6)",
            }}
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            {principle}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TrustScene() {
  return (
    <section id="trust" className="relative px-6 py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 400px at 50% 50%, rgba(124,92,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h3
          className="font-display font-medium text-h2 text-text-primary mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {trust.headline}
        </motion.h3>

        <motion.p
          className="text-text-secondary text-body mb-14 leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {trust.body}
        </motion.p>

        {/* 3D floating cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {trust.principles.map((principle, i) => (
            <Float3DCard key={i} principle={principle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
