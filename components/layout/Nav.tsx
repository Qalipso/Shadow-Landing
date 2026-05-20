"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/content/copy";
import { useCTAModal } from "@/src/lib/cta-modal";

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const { openCTA } = useCTAModal();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ESC closes menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,8,18,0.7) 0%, rgba(10,8,18,0.4) 60%, rgba(10,8,18,0) 100%)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-text-primary font-display font-medium tracking-wide z-10"
          >
            <span className="relative w-6 h-6">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #2a1f3a 0%, #050507 70%)",
                  boxShadow: "0 0 12px 2px rgba(124, 92, 255, 0.5)",
                }}
              />
            </span>
            Shadow
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => openCTA("nav")}
              className="text-sm text-text-primary border border-white/15 hover:border-white/30 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              {nav.cta}
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative z-10 p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "rgba(10,8,18,0.98)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "-24px 0 60px rgba(0,0,0,0.6)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
                <span className="text-text-primary font-display font-medium tracking-wide">
                  Shadow
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <IconX />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-6 py-6 flex flex-col gap-1">
                {nav.links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 text-base text-text-secondary hover:text-text-primary transition-colors border-b border-white/[0.05] last:border-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="px-6 pb-8">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openCTA("nav"); }}
                  className="w-full py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: "rgba(201,163,106,0.92)",
                    color: "#0a0a0c",
                  }}
                >
                  {nav.cta}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
