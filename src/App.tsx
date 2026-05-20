import { MotionConfig } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { HeroScene } from "@/components/scenes/HeroScene";
import { OverloadScene } from "@/components/scenes/OverloadScene";
import { CaptureScene } from "@/components/scenes/CaptureScene";
import { DemoScene } from "@/components/scenes/DemoScene";
import { MemoryScene } from "@/components/scenes/MemoryScene";
import { ModesScene } from "@/components/scenes/ModesScene";
import { LoopScene } from "@/components/scenes/LoopScene";
import { LabsScene } from "@/components/scenes/LabsScene";
import { TrustScene } from "@/components/scenes/TrustScene";
import { ProofScene } from "@/components/scenes/ProofScene";
import { CtaScene } from "@/components/scenes/CtaScene";
import { CTAModalProvider } from "@/src/lib/cta-modal";
import { CTAModal } from "@/components/forms/CTAModal";
import { CursorField } from "@/components/ui/CursorField";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
    <CTAModalProvider>
      <main id="main-content" className="relative" style={{ overflowX: "clip" }}>
        <Nav />
        <HeroScene />
        <OverloadScene />
        <CaptureScene />
        <DemoScene />
        <MemoryScene />
        <ModesScene />
        <LoopScene />
        <LabsScene />
        <TrustScene />
        <ProofScene />
        <CtaScene />
      </main>
      <Footer />
      <CTAModal />
      <CursorField />
    </CTAModalProvider>
    </MotionConfig>
  );
}
