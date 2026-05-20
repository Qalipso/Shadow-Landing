"use client";

import { motion } from "framer-motion";
import { inboxExample } from "@/content/ui-data";

export function ClassificationCard() {
  return (
    <motion.div
      className="glass-blur rounded-2xl p-6 w-full max-w-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-widest uppercase text-text-tertiary">
          Classification
        </span>
        <span className="text-[10px] font-mono text-cyan">
          confidence {Math.round(inboxExample.classification.confidence * 100)}%
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {inboxExample.classification.types.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-white/15 text-text-primary"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <div className="text-text-tertiary mb-1 font-mono uppercase tracking-wider text-[10px]">
            Destination
          </div>
          <div className="text-text-primary">
            {inboxExample.classification.destination}
          </div>
        </div>
        <div>
          <div className="text-text-tertiary mb-1 font-mono uppercase tracking-wider text-[10px]">
            Next action
          </div>
          <div className="text-text-primary">
            {inboxExample.classification.nextAction}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
