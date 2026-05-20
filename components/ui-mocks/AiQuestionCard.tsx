"use client";

import { motion } from "framer-motion";
import { loop } from "@/content/copy";

export function AiQuestionCard() {
  return (
    <motion.div
      className="glass-blur rounded-2xl p-6 w-full max-w-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-1.5 h-1.5 rounded-full bg-violet"
          style={{ boxShadow: "0 0 8px #7C5CFF" }}
        />
        <span className="text-xs font-mono tracking-widest uppercase text-text-tertiary">
          One question to make this useful
        </span>
      </div>
      <p className="text-sm text-text-primary leading-relaxed mb-4">
        {loop.aiQuestion}
      </p>
      <div className="flex gap-2">
        <button className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/30 transition-all">
          I forget
        </button>
        <button className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/30 transition-all">
          It doesn't pull me back
        </button>
      </div>
    </motion.div>
  );
}
