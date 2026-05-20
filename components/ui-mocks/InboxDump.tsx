"use client";

import { motion } from "framer-motion";
import { capture } from "@/content/copy";
import { inboxExample, recentSignals, signalColors } from "@/content/ui-data";

export function InboxDump() {
  return (
    <motion.div
      className="glass-blur rounded-2xl p-6 md:p-7 w-full max-w-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-widest uppercase text-text-tertiary">
          Inbox
        </span>
        <span className="text-[10px] font-mono text-text-tertiary">
          {recentSignals.length + 1} signals · today
        </span>
      </div>

      {/* current input */}
      <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/5">
        <p className="text-sm text-text-primary leading-relaxed mb-3">
          "{inboxExample.raw}"
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary font-mono">just now</span>
          <span className="text-violet">capturing…</span>
        </div>
      </div>

      {/* recent */}
      <div className="space-y-2">
        {recentSignals.map((sig, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-xs py-1.5 text-text-secondary"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: signalColors[sig.type],
                boxShadow: `0 0 8px ${signalColors[sig.type]}`,
              }}
            />
            <span className="truncate flex-1">{sig.text}</span>
            <span className="text-text-tertiary font-mono shrink-0">
              {sig.when}
            </span>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
        <input
          type="text"
          placeholder={capture.inboxPlaceholder}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-tertiary outline-none"
          readOnly
        />
        <span className="text-[10px] font-mono text-text-tertiary">
          {capture.inboxHint}
        </span>
      </div>
    </motion.div>
  );
}
