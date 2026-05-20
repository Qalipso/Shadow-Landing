"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shady } from "@/components/shady/Shady";
import { overload } from "@/content/copy";
import { overloadFragments, signalColors } from "@/content/ui-data";

export function OverloadScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // fragments converge as scroll progresses
  const fragmentX = useTransform(scrollYProgress, [0, 0.6], [0, 0]);
  const fragmentScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 0.3]);
  const fragmentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  const shadyState = useTransform(scrollYProgress, (v) =>
    v < 0.3 ? "idle" : v < 0.7 ? "absorb" : "wake"
  );

  return (
    <section
      id="overload"
      ref={ref}
      className="relative min-h-[200vh] flex items-center justify-center px-6"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* fragments */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            scale: fragmentScale,
            opacity: fragmentOpacity,
          }}
        >
          {overloadFragments.map((frag, i) => {
            const seed = (i * 9973) % 1000;
            const x = 10 + ((seed * 1.3) % 80);
            const y = 10 + ((seed * 2.7) % 80);
            const rotate = -15 + (seed % 30);
            const delay = (i * 0.08) % 1.5;
            return (
              <motion.div
                key={i}
                className="absolute text-xs md:text-sm font-mono whitespace-nowrap"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  color: signalColors[frag.type],
                  rotate,
                  textShadow: `0 0 20px ${signalColors[frag.type]}`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {frag.text}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Shady — center */}
        <div className="relative z-10">
          <Shady state="absorb" size={260} magnetic={false} />
        </div>

        {/* headline */}
        <div className="absolute bottom-20 left-0 right-0 px-6 text-center z-20">
          <motion.h2
            className="font-display font-medium text-h1 text-text-primary mb-3 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {overload.headline}
          </motion.h2>
          <motion.p
            className="text-text-secondary text-body max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {overload.subhead}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
