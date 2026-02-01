import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PortfolioMode = "markdown" | "animated";

interface PortfolioModeStore {
  mode: PortfolioMode;
  isTransitioning: boolean;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
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
      isTransitioning: false,
      setMode: (newMode: PortfolioMode) => {
        const currentMode = get().mode;
        if (newMode !== currentMode) {
          set({ isTransitioning: true });
          // After 3 seconds, update the mode
          setTimeout(() => {
            set({ mode: newMode, isTransitioning: false });
          }, 3000);
        }
      },
      toggleMode: () => {
        const currentMode = get().mode;
        const newMode = currentMode === "markdown" ? "animated" : "markdown";
        set({ isTransitioning: true });
        // After 3 seconds, update the mode
        setTimeout(() => {
          set({ mode: newMode, isTransitioning: false });
        }, 3000);
      },
    }),
    {
      name: "portfolio-mode-storage",
      partialize: (state) => ({ mode: state.mode }), // Only persist mode, not isTransitioning
    }
  )
);
