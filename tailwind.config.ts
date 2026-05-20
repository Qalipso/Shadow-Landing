import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          base: "#0A0A0C",
          raised: "#121218",
          glass: "rgba(28, 24, 40, 0.6)",
        },
        violet: {
          DEFAULT: "#7C5CFF",
        },
        cyan: {
          DEFAULT: "#5CE1FF",
        },
        amber: {
          warm: "#FFB068",
        },
        text: {
          primary: "#F2F2F5",
          secondary: "#9A9AA8",
          tertiary: "#5A5A66",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.5rem, 11vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        h1: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.028em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        body: ["clamp(1rem, 1.2vw, 1.125rem)", { lineHeight: "1.6" }],
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 10s ease-in-out infinite",
        "fade-in": "fade-in 1.2s ease-out forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.95" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
        "pulse-slow": {
          "0%, 100%": { boxShadow: "0 0 80px 20px rgba(124, 92, 255, 0.25)" },
          "50%": { boxShadow: "0 0 120px 30px rgba(92, 225, 255, 0.25)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
