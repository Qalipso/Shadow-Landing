"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, type MotionValue } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { loop } from "@/content/copy";

// ---- layout ----
const R = 155;
const COL_X = 235;
const ROW_Y = [-85, 0, 85];
const CARD_W = 130;
const CARD_H = 48;

const LIST_CFG: Array<{ col: 0 | 1; row: number }> = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 0, row: 1 },
  { col: 1, row: 1 },
  { col: 0, row: 2 },
  { col: 1, row: 2 },
];

// easeOutQuart — fast start, dramatic slow end (vortex feel)
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 4);
}

// smoothstep for list transition
function ss(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Node colors per kind
const NODE_COLORS = [
  "hsl(196 85% 78%)",  // Capture — cyan
  "hsl(252 90% 80%)",  // Structure — violet
  "hsl(348 80% 78%)",  // Memory — rose
  "hsl(42 90% 72%)",   // Knowledge Gap — amber
  "hsl(120 60% 72%)",  // Question — mint
  "hsl(196 85% 78%)",  // Update — cyan
];

function OrbitalNode({
  node,
  index,
  progress,
}: {
  node: { id: string; label: string; note: string };
  index: number;
  progress: MotionValue<number>;
}) {
  const { col, row } = LIST_CFG[index];
  const targetX = (col === 0 ? -1 : 1) * COL_X;
  const targetY = ROW_Y[row];
  // stagger list arrival per node
  const listStart = 0.58 + index * 0.015;
  const listEnd = listStart + 0.22;
  const baseAngle = (index / 6) * Math.PI * 2 - Math.PI / 2;
  const color = NODE_COLORS[index];

  const x = useTransform(progress, (p: number) => {
    const orbitT = Math.min(p / 0.65, 1);
    const listT = ss(listStart, listEnd, p);
    // vortex: 2 full rotations with easeOutQuart deceleration
    const rotation = easeOutQuart(orbitT) * Math.PI * 4;
    const angle = baseAngle + rotation;
    const cx = Math.cos(angle) * R * (1 - listT) + targetX * listT;
    return cx - CARD_W / 2;
  });

  const y = useTransform(progress, (p: number) => {
    const orbitT = Math.min(p / 0.65, 1);
    const listT = ss(listStart, listEnd, p);
    const rotation = easeOutQuart(orbitT) * Math.PI * 4;
    const angle = baseAngle + rotation;
    const cy = Math.sin(angle) * R * (1 - listT) + targetY * listT;
    return cy - CARD_H / 2;
  });

  // motion blur: sharp when slow, blurred when spinning fast
  const filter = useTransform(progress, (p: number) => {
    const orbitT = Math.min(p / 0.65, 1);
    const speed = Math.max(0, 1 - easeOutQuart(orbitT));
    const blurPx = (speed * speed * 4).toFixed(1);
    return `blur(${blurPx}px)`;
  });

  // opacity: fade in on enter, full during orbit, steady in list
  const opacity = useTransform(progress, (p: number) => {
    return p < 0.04 ? p / 0.04 : 1;
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CARD_W,
        x,
        y,
        filter,
        opacity,
        zIndex: 10,
      }}
    >
      {/* cloud text — no card, just floating text with glow */}
      <div style={{ textAlign: "center", padding: "4px 6px" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color,
            textShadow: `0 0 18px ${color}99, 0 0 6px ${color}55`,
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
            fontFamily: "var(--font-body)",
          }}
        >
          {node.label}
        </div>
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.35,
            marginTop: 2,
            fontFamily: "var(--font-body)",
          }}
        >
          {node.note}
        </div>
      </div>
    </motion.div>
  );
}

// ---- Decorative orbit ring SVG ----
const SVG_SIZE = (R + 10) * 2;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const TICK_COUNT = 48;
const DIAMOND_ANGLES = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2 - Math.PI / 2);

function OrbitRingSvg() {
  return (
    <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} fill="none">
      <defs>
        <linearGradient id="loopRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#5CE1FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="cometGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#7C5CFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* main dashed ring */}
      <circle cx={CX} cy={CY} r={R} stroke="url(#loopRingGrad)" strokeWidth="0.8" strokeDasharray="1.5 5" />

      {/* tick marks radially around ring */}
      {Array.from({ length: TICK_COUNT }, (_, i) => {
        const a = (i / TICK_COUNT) * Math.PI * 2;
        const isMajor = i % (TICK_COUNT / 6) === 0;
        const inner = isMajor ? R - 6 : R - 3;
        const outer = isMajor ? R + 6 : R + 3;
        return (
          <line
            key={i}
            x1={CX + Math.cos(a) * inner}
            y1={CY + Math.sin(a) * inner}
            x2={CX + Math.cos(a) * outer}
            y2={CY + Math.sin(a) * outer}
            stroke={isMajor ? "rgba(124,92,255,0.55)" : "rgba(124,92,255,0.18)"}
            strokeWidth={isMajor ? "1.2" : "0.6"}
          />
        );
      })}

      {/* chevron arrows every 30° — pointing clockwise */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 + Math.PI / 24;
        const px = CX + Math.cos(a) * R;
        const py = CY + Math.sin(a) * R;
        const rot = (a * 180) / Math.PI + 90;
        return (
          <g key={i} transform={`translate(${px},${py}) rotate(${rot})`}>
            <path
              d="M-3.5 -2 L0 2.5 L3.5 -2"
              stroke="rgba(92,225,255,0.3)"
              strokeWidth="0.9"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );
      })}

      {/* diamond markers at node anchor positions */}
      {DIAMOND_ANGLES.map((a, i) => {
        const px = CX + Math.cos(a) * R;
        const py = CY + Math.sin(a) * R;
        return (
          <polygon
            key={i}
            points={`${px},${py - 5} ${px + 3.5},${py} ${px},${py + 5} ${px - 3.5},${py}`}
            fill="rgba(124,92,255,0.12)"
            stroke="rgba(124,92,255,0.45)"
            strokeWidth="0.7"
            transform={`rotate(45, ${px}, ${py})`}
          />
        );
      })}

      {/* animated comet — orbits continuously */}
      <circle r="4" fill="url(#cometGlow)" opacity="0.7">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={`M ${CX + R} ${CY} A ${R} ${R} 0 1 1 ${CX + R - 0.001} ${CY}`}
        />
      </circle>
      <circle r="2" fill="rgba(255,255,255,0.9)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={`M ${CX + R} ${CY} A ${R} ${R} 0 1 1 ${CX + R - 0.001} ${CY}`}
        />
      </circle>
    </svg>
  );
}

export function LoopScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const springProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 30 });

  const ringOpacity = useTransform(springProgress, [0.52, 0.78], [1, 0]);
  // ring rotates as vortex spins
  const ringRotate = useTransform(springProgress, (p: number) => {
    const orbitT = Math.min(p / 0.65, 1);
    const deg = easeOutQuart(orbitT) * 720; // 2 full rotations
    return `${deg.toFixed(1)}deg`;
  });

  return (
    <div ref={containerRef} id="loop" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* header */}
        <div className="text-center mb-6 max-w-3xl px-6">
          <motion.div
            className="text-xs font-mono tracking-widest uppercase text-cyan mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {loop.eyebrow}
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-3"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {loop.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {loop.subhead}
          </motion.p>
        </div>

        {/* orbit stage */}
        <div
          className="relative"
          style={{
            width: "min(820px, 92vw)",
            height: "clamp(300px, 38vw, 430px)",
          }}
        >
          {/* decorative orbit ring — rotates with vortex, fades at list phase */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
              rotate: ringRotate,
              opacity: ringOpacity,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <OrbitRingSvg />
          </motion.div>

          {/* orbital nodes */}
          {loop.nodes.map((node, i) => (
            <OrbitalNode key={node.id} node={node} index={i} progress={springProgress} />
          ))}

          {/* center Shady */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          >
            <Shady state="loop" size={130} magnetic={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
