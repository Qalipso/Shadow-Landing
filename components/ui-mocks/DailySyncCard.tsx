"use client";

import { motion } from "framer-motion";
import { loop } from "@/content/copy";

export function DailySyncCard() {
  return (
    <motion.div
      className="glass-blur rounded-2xl p-5 w-full max-w-xs"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-1.5 h-1.5 rounded-full bg-cyan"
          style={{ boxShadow: "0 0 8px #5CE1FF" }}
        />
        <span className="text-xs font-mono tracking-widest uppercase text-text-tertiary">
          Daily Sync
        </span>
      </div>
      <div className="text-sm text-text-primary font-medium mb-3">
        {loop.dailySync.title}
      </div>
      <ul className="space-y-1.5">
        {loop.dailySync.items.map((item, i) => (
          <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
            <span className="text-violet mt-1.5">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
