import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PortfolioMode = "markdown" | "animated";

interface PortfolioModeStore {
  mode: PortfolioMode;
  targetMode: PortfolioMode | null;
  isTransitioning: boolean;
  transitionProgress: number;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  setTransitionProgress: (progress: number) => void;
  completeTransition: () => void;
}

function getInitialMode(): PortfolioMode {
  // Check localStorage first
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("portfolio-mode-storage");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.state?.mode === "markdown" || parsed.state?.mode === "animated") {
          return parsed.state.mode;
        }
      } catch {
        // Fall through to default
      }
    }
  }
  // Default to "markdown"
  return "markdown";
}

export const usePortfolioModeStore = create<PortfolioModeStore>()(
  persist(
    (set, get) => ({
      mode: getInitialMode(),
      targetMode: null,
      isTransitioning: false,
      transitionProgress: 0,
      setMode: (newMode: PortfolioMode) => {
        const currentMode = get().mode;
        if (newMode !== currentMode) {
          // Start transition - cleanup will complete it
          set({ isTransitioning: true, transitionProgress: 0, targetMode: newMode });
        }
      },
      toggleMode: () => {
        const currentMode = get().mode;
        const newMode: PortfolioMode = currentMode === "markdown" ? "animated" : "markdown";
        // Start transition - cleanup will complete it
        set({ isTransitioning: true, transitionProgress: 0, targetMode: newMode });
      },
      setTransitionProgress: (progress: number) => {
        const clamped = Math.min(100, Math.max(0, progress));
        set({ transitionProgress: clamped });
      },
      completeTransition: () => {
        const { targetMode } = get();
        if (targetMode) {
          set({ 
            mode: targetMode, 
            isTransitioning: false, 
            transitionProgress: 100,
            targetMode: null
          });
        }
      },
    }),
    {
      name: "portfolio-mode-storage",
      partialize: (state) => ({ mode: state.mode }), // Don't persist transition state
    }
  )
);
