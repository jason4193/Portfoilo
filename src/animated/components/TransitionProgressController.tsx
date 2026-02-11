import { useEffect, useRef } from "react";
import { useLoadingProgressStore, usePortfolioModeStore } from "../../shared/stores";
import { TRANSITION_MIN_DURATION_MS } from "../constants/transition";
import { useTransitionCleanup } from "../hooks/useTransitionCleanup";
import { useTransitionLoadProgress } from "../hooks/useTransitionLoadProgress";

// Utility-like component: no UI, just wires transition hooks inside Canvas.
export function TransitionProgressController() {
  const { setTransitionProgress, completeTransition } = usePortfolioModeStore();
  const setLoadingProgress = useLoadingProgressStore(
    (state) => state.setLoadingProgress,
  );
  const transitionStartRef = useRef<number | null>(null);
  const completeTimeoutRef = useRef<number | null>(null);

  const handleTransitionProgress = (progress: number) => {
    const now = performance.now();
    if (transitionStartRef.current == null) {
      transitionStartRef.current = now;
    }

    const elapsed = now - transitionStartRef.current;
    setTransitionProgress(progress);
    setLoadingProgress(progress);

    if (progress < 100) return;

    const remaining = Math.max(0, TRANSITION_MIN_DURATION_MS - elapsed);
    if (completeTimeoutRef.current != null) return;

    completeTimeoutRef.current = window.setTimeout(() => {
      const state = usePortfolioModeStore.getState();
      if (!state.isTransitioning) {
        completeTimeoutRef.current = null;
        transitionStartRef.current = null;
        return;
      }

      completeTransition();
      completeTimeoutRef.current = null;
      transitionStartRef.current = null;
    }, remaining);
  };

  useTransitionLoadProgress({ onProgress: handleTransitionProgress });
  useTransitionCleanup({ onProgress: handleTransitionProgress });

  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current != null) {
        window.clearTimeout(completeTimeoutRef.current);
        completeTimeoutRef.current = null;
      }
      transitionStartRef.current = null;
    };
  }, []);
  return null;
}
