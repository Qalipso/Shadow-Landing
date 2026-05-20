"use client";

import { hero, marqueeConcepts } from "@/content/copy";

/**
 * Hero marquee — Shadow's core concepts (Memory · Focus · Patterns · Life Map · Labs · Shady · Clarity).
 * Each pill uses liquid-glass with tinted gradient per concept color.
 */
export function Marquee() {
  const buildOne = (keyPrefix: string) => (
    <>
      {marqueeConcepts.map((c, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="inline-flex items-center gap-2.5 whitespace-nowrap"
        >
          <span
            className="liquid-glass inline-flex items-center justify-center font-display font-semibold rounded-lg"
            style={{
              width: 26,
              height: 26,
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.92)",
              background: `linear-gradient(135deg, ${c.color}55, ${c.color}11)`,
            }}
          >
            {c.letter}
          </span>
          <span className="text-text-primary text-[15px] font-medium">
            {c.name}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 flex items-center gap-12">
      <div className="text-[12px] text-text-tertiary leading-[1.4] flex-shrink-0 hidden md:block whitespace-pre-line max-w-[180px]">
        {hero.marqueeLabel}
      </div>
      <div className="flex-1 overflow-hidden marquee-mask">
        <div
          className="flex w-max gap-16 animate-marquee"
          style={{ willChange: "transform" }}
        >
          {buildOne("a")}
          {buildOne("b")}
        </div>
      </div>
    </div>
  );
}
