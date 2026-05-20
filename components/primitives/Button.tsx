"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  href?: string;
  className?: string;
}

// Magnetic pull only on primary — the main CTA deserves it most
function MagneticPrimary({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className: string;
  onClick?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 280, damping: 22, mass: 0.6 });
  const y = useSpring(0, { stiffness: 280, damping: 22, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    // 28% pull strength — strong enough to feel, subtle enough to not disorient
    x.set(cx * 0.28);
    y.set(cy * 0.28);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={wrapRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.button
        type="button"
        onClick={onClick}
        className={className}
        style={{ x, y }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        {children}
      </motion.button>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-white/95 text-ink-base hover:bg-white shadow-[0_0_40px_rgba(124,92,255,0.4)] hover:shadow-[0_0_60px_rgba(124,92,255,0.6)]",
    secondary:
      "border border-white/15 text-text-primary hover:border-white/30 hover:bg-white/5",
    ghost: "text-text-secondary hover:text-text-primary",
  };

  const fullClass = `${base} ${variants[variant]} ${className}`;

  // Primary CTA gets magnetic behavior
  if (variant === "primary" && !href) {
    return (
      <MagneticPrimary className={fullClass} onClick={onClick}>
        {children}
      </MagneticPrimary>
    );
  }

  const content = (
    <motion.span
      className={fullClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
