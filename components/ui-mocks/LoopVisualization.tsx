"use client";

import { motion } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { loop } from "@/content/copy";

const radius = 180;

export function LoopVisualization() {
  return (
    <div className="relative w-full max-w-[420px] aspect-square md:max-w-[520px]">
      {/* circuit ring */}
      <svg
        viewBox="0 0 520 520"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#5CE1FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#5CE1FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="260"
          cy="260"
          r={radius}
          stroke="url(#ring)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        {/* animated pulse — single FM element on SVG circle */}
        <motion.circle
          cx="260"
          cy="260"
          r={radius}
          stroke="url(#pulse)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * radius * 0.15} ${2 * Math.PI * radius}`}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -2 * Math.PI * radius }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* 6 nodes — CSS pulse, no per-node FM repeat:Infinity */}
      {loop.nodes.map((node, i) => {
        const angle = (i / loop.nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (Math.cos(angle) * radius * 100) / 520;
        const y = 50 + (Math.sin(angle) * radius * 100) / 520;
        const pulseDuration = 12 / 6;
        const pulseDelay = (i * 12) / 6;
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              delay: 0.4 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="glass rounded-xl px-3 py-2 min-w-[110px] text-center animate-node-pulse"
              style={{
                animationDuration: `${pulseDuration}s`,
                animationDelay: `${pulseDelay}s`,
              }}
            >
              <div className="text-[11px] font-medium text-text-primary mb-0.5">
                {node.label}
              </div>
              <div className="text-[9px] text-text-tertiary leading-tight">
                {node.note}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* center — Shady */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Shady state="loop" size={150} magnetic={false} />
      </div>
    </div>
  );
}
