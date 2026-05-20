"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCTAModal } from "@/src/lib/cta-modal";
import { buildAppUrl } from "@/src/lib/app-url";
import { WaitlistForm } from "./WaitlistForm";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function CTAModal() {
  const { open, source, closeCTA } = useCTAModal();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Save trigger element when modal opens.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    }
  }, [open]);

  // ESC closes + Tab focus trap.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCTA();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCTA]);

  // Body scroll lock.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Initial focus on first focusable element.
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const t = setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      el?.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [open]);

  // Return focus to trigger on close.
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={closeCTA}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            tabIndex={-1}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cta-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0d18]/95 backdrop-blur-xl p-7 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={closeCTA}
              aria-label="Close dialog"
              className="absolute top-3 right-3 rounded-full p-2 text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <header className="mb-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-text-tertiary mb-2">
                Early Access
              </p>
              <h2
                id="cta-modal-title"
                className="font-display text-2xl text-text-primary leading-tight"
              >
                Get in line for Shadow.
              </h2>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                One signal at a time. We&rsquo;ll let you in when your slot opens.
              </p>
            </header>

            <WaitlistForm source={source ?? "other"} />

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <span className="text-[11px] text-text-tertiary">Already have access?</span>
              <a
                href={buildAppUrl({ source: "landing-modal" })}
                className="text-xs text-text-primary border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-full transition-colors"
              >
                Sign in →
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
