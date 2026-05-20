"use client";

/**
 * Real Shady — uses character PNG asset (vs procedural SVG `Shady`).
 * Each state maps to its own painted illustration from /public/assets/.
 */

import type { ShadyState } from "./states";

const STATE_TO_FILE: Record<string, string> = {
  sleep: "shady-sleep.png",
  wake: "shady-awaken.png",
  idle: "shady-idle.png",
  absorb: "shady-absorbing.png",
  structure: "shady-awaken.png",
  memoryCore: "shady-memory.png",
  focus: "shady-guardian.png",
  reflect: "shady-dormant.png",
  portal: "shady-labs.png",
  system: "shady-final.png",
};

export interface ShadyImageProps {
  state?: ShadyState;
  /** Either a CSS width (string) or pixel size (number). Use "100%" to fill parent. */
  size?: number | string;
  halo?: boolean;
  flicker?: boolean;
  breathe?: boolean;
  className?: string;
  alt?: string;
  /** Browser loading hint. Pass "eager" for above-the-fold instances. */
  loading?: "lazy" | "eager";
}

export function ShadyImage({
  state = "idle",
  size = 360,
  halo = true,
  flicker = true,
  breathe = true,
  className = "",
  alt = "Shady",
  loading = "lazy",
}: ShadyImageProps) {
  const file = STATE_TO_FILE[state] ?? STATE_TO_FILE.idle;
  const animClass = [
    breathe ? "animate-breathe" : "",
    flicker ? "animate-eye-flicker" : "",
  ].filter(Boolean).join(" ");
  const cssWidth = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`relative inline-block isolate pointer-events-none select-none ${className}`}
      style={{
        width: cssWidth,
        aspectRatio: "1024 / 1536",
      }}
    >
      {halo && (
        <>
          <div
            className="absolute rounded-full animate-halo-outer pointer-events-none"
            style={{
              inset: "-40%",
              background:
                "radial-gradient(circle, rgba(124,92,255,0.12) 0%, rgba(124,92,255,0) 55%)",
              zIndex: 0,
            }}
          />
          <div
            className="absolute rounded-full animate-halo pointer-events-none"
            style={{
              inset: "-15%",
              background:
                "radial-gradient(circle, rgba(124,92,255,0.22) 0%, rgba(124,92,255,0) 60%)",
              zIndex: 0,
            }}
          />
        </>
      )}

      <img
        src={`/assets/${file}`}
        alt={alt}
        loading={loading}
        className={`relative block w-full h-auto ${animClass}`}
        style={{
          objectFit: "contain",
          willChange: "transform, opacity, filter",
          zIndex: 1,
        }}
        draggable={false}
      />
    </div>
  );
}
