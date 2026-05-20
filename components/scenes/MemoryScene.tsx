"use client";

import { motion } from "framer-motion";
import { Shady } from "@/components/shady/Shady";
import { memory } from "@/content/copy";

const CENTER = { x: 260, y: 260 };
const RADIUS = 185;

export function MemoryScene() {
  const nodes = memory.nodes.map((n, i) => {
    const angle = (i / memory.nodes.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...n,
      x: CENTER.x + Math.cos(angle) * RADIUS,
      y: CENTER.y + Math.sin(angle) * RADIUS,
    };
  });

  return (
    <section
      id="memory"
      className="relative min-h-screen flex items-center px-6 py-32 overflow-hidden"
    >
      {/* Ambient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(124,92,255,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          <motion.div
            className="text-xs font-mono tracking-widest uppercase text-violet mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            {memory.eyebrow}
          </motion.div>
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-5"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {memory.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body max-w-md"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {memory.subhead}
          </motion.p>

          {/* Objection killers — brand brief v2 §A.10 */}
          <motion.div
            className="mt-6 space-y-2 max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {memory.objectionKillers.map((line, i) => (
              <div
                key={i}
                className="font-serif italic text-[15px] text-text-tertiary leading-snug pl-3 border-l border-violet/40"
              >
                {line}
              </div>
            ))}
          </motion.div>

          {/* Memory type legend */}
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {[
              { label: "Ideas & Thoughts", color: "#7C5CFF" },
              { label: "Emotions", color: "#FFB068" },
              { label: "Tasks & Goals", color: "#5CE1FF" },
              { label: "Decisions", color: "#C8C8D0" },
            ].map((t) => (
              <span
                key={t.label}
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-tertiary uppercase tracking-wider"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }}
                />
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — memory graph */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[520px] aspect-square">
            {/* SVG connections */}
            <svg
              viewBox="0 0 520 520"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {nodes.map((node, i) => (
                <motion.line
                  key={node.id}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.color}
                  strokeOpacity={0.2}
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                />
              ))}
            </svg>

            {/* Memory nodes */}
            {nodes.map((node, i) => {
              const pct = { left: `${(node.x / 520) * 100}%`, top: `${(node.y / 520) * 100}%` };
              return (
                <motion.div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={pct}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="glass rounded-lg px-3 py-1.5 text-center"
                    style={{ borderColor: `${node.color}30` }}
                  >
                    <div
                      className="text-[10px] font-medium tracking-wide"
                      style={{ color: node.color }}
                    >
                      {node.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Shady at center — memory core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Shady state="memoryCore" size={130} magnetic={false} />
              </motion.div>
            </div>

            {/* Knowledge gap caption */}
            <motion.div
              className="absolute liquid-glass rounded-lg px-3 py-2 text-[11px] font-mono text-text-secondary max-w-[200px] leading-snug"
              style={{
                right: "-4%",
                bottom: "8%",
                background: "rgba(20, 14, 32, 0.86)",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <span className="text-violet uppercase tracking-widest text-[9px] block mb-1">
                Knowledge gap
              </span>
              {memory.knowledgeGap}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
