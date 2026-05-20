"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface HeadlineProps {
  children: ReactNode;
  level?: "display" | "h1" | "h2";
  className?: string;
  delay?: number;
}

const sizes = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
};

export function Headline({
  children,
  level = "h1",
  className = "",
  delay = 0,
}: HeadlineProps) {
  return (
    <motion.h1
      className={`font-display font-medium text-text-primary ${sizes[level]} ${className}`}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h1>
  );
}
