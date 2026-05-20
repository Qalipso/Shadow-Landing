import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { events } from "./analytics";

type CTASource =
  | "hero_primary"
  | "nav"
  | "cta_scene_primary"
  | "sticky"
  | "other";

type CTAModalState = {
  open: boolean;
  source: CTASource | null;
};

type CTAModalApi = CTAModalState & {
  openCTA: (source?: CTASource) => void;
  closeCTA: () => void;
};

const CTAModalContext = createContext<CTAModalApi | null>(null);

export function CTAModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CTAModalState>({ open: false, source: null });

  const openCTA = useCallback((source: CTASource = "other") => {
    setState({ open: true, source });
    events.ctaOpen(source);
  }, []);

  const closeCTA = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo<CTAModalApi>(
    () => ({ ...state, openCTA, closeCTA }),
    [state, openCTA, closeCTA],
  );

  return <CTAModalContext.Provider value={value}>{children}</CTAModalContext.Provider>;
}

export function useCTAModal(): CTAModalApi {
  const ctx = useContext(CTAModalContext);
  if (!ctx) throw new Error("useCTAModal must be used inside <CTAModalProvider>");
  return ctx;
}
