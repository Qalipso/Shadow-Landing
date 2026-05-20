export type ShadyState =
  | "idle"
  | "sleep"
  | "wake"
  | "absorb"
  | "structure"
  | "memoryCore"
  | "focus"
  | "reflect"
  | "loop"
  | "portal"
  | "system";

export interface ShadyConfig {
  scale: number;
  glow: string;
  rotate: number;
  inner: string;
  haloColor: string;        // outer atmospheric tint
  eyeVisible: boolean;
  eyeColor: string;
  eyeOpacity: number;
  eyeSize: number;          // multiplier: 1 = base
}

export const shadyStates: Record<ShadyState, ShadyConfig> = {
  idle: {
    scale: 1,
    glow: "0 0 70px 18px rgba(124, 92, 255, 0.22), 0 0 140px 35px rgba(124, 92, 255, 0.08)",
    rotate: 0,
    inner: "radial-gradient(circle at 38% 34%, #1a1530 0%, #08060f 65%, #050410 100%)",
    haloColor: "rgba(124, 92, 255, 0.05)",
    eyeVisible: true,
    eyeColor: "#9070FF",
    eyeOpacity: 0.55,
    eyeSize: 1,
  },
  sleep: {
    scale: 0.92,
    glow: "0 0 30px 8px rgba(124, 92, 255, 0.08)",
    rotate: 0,
    inner: "radial-gradient(circle at 50% 50%, #0d0b18 0%, #05040c 100%)",
    haloColor: "rgba(124, 92, 255, 0.02)",
    eyeVisible: false,
    eyeColor: "#7C5CFF",
    eyeOpacity: 0,
    eyeSize: 0.5,
  },
  wake: {
    scale: 1.05,
    glow: "0 0 55px 14px rgba(124, 92, 255, 0.28), 0 0 110px 28px rgba(124, 92, 255, 0.08)",
    rotate: 0,
    inner: "radial-gradient(circle at 38% 34%, #251840 0%, #100d22 55%, #07061a 100%)",
    haloColor: "rgba(124, 92, 255, 0.05)",
    eyeVisible: true,
    eyeColor: "#B090FF",
    eyeOpacity: 0.92,
    eyeSize: 1.35,
  },
  absorb: {
    scale: 1.07,
    glow: "0 0 60px 16px rgba(124, 92, 255, 0.28), 0 0 120px 32px rgba(92, 225, 255, 0.07)",
    rotate: 2,
    inner: "radial-gradient(circle at 36% 32%, #20163c 0%, #0e0c1e 50%, #060412 100%)",
    haloColor: "rgba(92, 225, 255, 0.04)",
    eyeVisible: true,
    eyeColor: "#5CE1FF",
    eyeOpacity: 0.72,
    eyeSize: 1.2,
  },
  structure: {
    scale: 0.97,
    glow: "0 0 55px 14px rgba(92, 225, 255, 0.28), 0 0 110px 28px rgba(92, 225, 255, 0.09)",
    rotate: -1,
    inner: "radial-gradient(circle at 44% 40%, #0f1c24 0%, #070e14 58%, #040810 100%)",
    haloColor: "rgba(92, 225, 255, 0.04)",
    eyeVisible: true,
    eyeColor: "#5CE1FF",
    eyeOpacity: 0.68,
    eyeSize: 0.9,
  },
  memoryCore: {
    scale: 1.12,
    glow: "0 0 160px 45px rgba(124, 92, 255, 0.55), 0 0 280px 90px rgba(92, 225, 255, 0.18)",
    rotate: 20,
    inner: "radial-gradient(circle at 42% 38%, #281c44 0%, #130e28 50%, #070416 100%)",
    haloColor: "rgba(124, 92, 255, 0.12)",
    eyeVisible: true,
    eyeColor: "#A880FF",
    eyeOpacity: 0.78,
    eyeSize: 1.15,
  },
  focus: {
    scale: 0.96,
    glow: "0 0 44px 11px rgba(92, 225, 255, 0.22), 0 0 88px 22px rgba(92, 225, 255, 0.07)",
    rotate: 0,
    inner: "radial-gradient(circle at 45% 38%, #0d1c22 0%, #070e14 56%, #04080c 100%)",
    haloColor: "rgba(92, 225, 255, 0.03)",
    eyeVisible: true,
    eyeColor: "#5CE1FF",
    eyeOpacity: 0.88,
    eyeSize: 0.85,
  },
  reflect: {
    scale: 1.03,
    glow: "0 0 95px 24px rgba(255, 176, 104, 0.22), 0 0 190px 50px rgba(124, 92, 255, 0.07)",
    rotate: -3,
    inner: "radial-gradient(circle at 40% 36%, #201208 0%, #10080a 56%, #06040a 100%)",
    haloColor: "rgba(255, 176, 104, 0.04)",
    eyeVisible: true,
    eyeColor: "#FFB068",
    eyeOpacity: 0.62,
    eyeSize: 1.1,
  },
  loop: {
    scale: 1.02,
    glow: "0 0 80px 20px rgba(124, 92, 255, 0.28), 0 0 160px 42px rgba(92, 225, 255, 0.08)",
    rotate: 0,
    inner: "radial-gradient(circle at 40% 38%, #1c1236 0%, #0a081c 58%, #060410 100%)",
    haloColor: "rgba(124, 92, 255, 0.06)",
    eyeVisible: true,
    eyeColor: "#7C5CFF",
    eyeOpacity: 0.42,
    eyeSize: 0.82,
  },
  portal: {
    scale: 1.14,
    glow: "0 0 150px 42px rgba(92, 225, 255, 0.38), 0 0 300px 90px rgba(124, 92, 255, 0.18)",
    rotate: 6,
    inner: "radial-gradient(circle at 38% 34%, #0c2030 0%, #061422 48%, #03080f 100%)",
    haloColor: "rgba(92, 225, 255, 0.1)",
    eyeVisible: true,
    eyeColor: "#5CE1FF",
    eyeOpacity: 0.94,
    eyeSize: 1.45,
  },
  system: {
    scale: 1.14,
    glow: "0 0 180px 52px rgba(124, 92, 255, 0.52), 0 0 300px 110px rgba(92, 225, 255, 0.2)",
    rotate: 0,
    inner: "radial-gradient(circle at 40% 36%, #2c1e46 0%, #160e30 48%, #08061a 100%)",
    haloColor: "rgba(124, 92, 255, 0.14)",
    eyeVisible: true,
    eyeColor: "#C0A0FF",
    eyeOpacity: 1,
    eyeSize: 1.5,
  },
};
