"use client";

import { motion } from "framer-motion";
import { proof } from "@/content/copy";
import { useCTAModal } from "@/src/lib/cta-modal";

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

export function ProofScene() {
  const { openCTA } = useCTAModal();

  return (
    <section id="proof" className="relative px-6 py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,163,106,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          {...fade(0)}
          className="text-center text-xs font-mono uppercase tracking-[0.2em] mb-3"
          style={{ color: "rgba(201,163,106,0.8)" }}
        >
          {proof.eyebrow}
        </motion.p>

        <motion.h2
          {...fade(0.07)}
          className="text-center font-display text-3xl md:text-4xl font-medium text-text-primary mb-16 leading-tight"
        >
          {proof.headline}
        </motion.h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {proof.testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              {...fade(0.1 + i * 0.08)}
              className="flex flex-col rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="flex-1 text-sm text-text-secondary leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <p className="text-sm font-medium text-text-primary">{t.name}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{t.context}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Pricing */}
        <motion.p
          {...fade(0.25)}
          className="text-center text-xs font-mono uppercase tracking-[0.2em] mb-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {proof.pricing.label}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {proof.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fade(0.3 + i * 0.08)}
              className="rounded-2xl p-6 flex flex-col"
              style={
                plan.highlight
                  ? {
                      background: "rgba(201,163,106,0.08)",
                      border: "1px solid rgba(201,163,106,0.28)",
                    }
                  : {
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }
              }
            >
              <div className="mb-4">
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-1"
                  style={{
                    color: plan.highlight
                      ? "rgba(201,163,106,0.8)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-2xl font-display font-medium"
                  style={{ color: plan.highlight ? "rgb(232,205,159)" : "rgb(161,161,170)" }}
                >
                  {plan.price}
                </p>
                <p className="text-xs text-text-tertiary mt-1">{plan.note}</p>
              </div>

              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span
                      className="mt-1 flex-shrink-0 rounded-full h-1.5 w-1.5"
                      style={{
                        background: plan.highlight
                          ? "rgba(201,163,106,0.7)"
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openCTA("cta_scene_primary")}
                className="w-full rounded-xl py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
                style={
                  plan.highlight
                    ? { background: "rgba(201,163,106,0.9)", color: "#0a0a0c" }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgb(161,161,170)",
                      }
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
