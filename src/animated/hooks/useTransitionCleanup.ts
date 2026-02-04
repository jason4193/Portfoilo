import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { usePortfolioModeStore } from "../../shared/stores";
import { TRANSITION_MIN_DURATION_MS } from "../constants/transition";

interface TransitionProgressOptions {
  onProgress?: (progress: number) => void;
}

// Runs a timed progress animation, then disposes the WebGL context.
export function useTransitionCleanup({ onProgress }: TransitionProgressOptions) {
  const { gl } = useThree();
  const { isTransitioning, mode, targetMode } = usePortfolioModeStore();
  const cleanupActiveRef = useRef(false);
  const cleanupRafRef = useRef<number | null>(null);
  const onProgressRef = useRef<TransitionProgressOptions["onProgress"]>(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const isCleaningUp =
      isTransitioning && mode === "animated" && targetMode === "markdown";
    if (!isCleaningUp || !onProgressRef.current) return;

    if (cleanupActiveRef.current) return;
    cleanupActiveRef.current = true;

    const start = performance.now();
    onProgressRef.current(0);

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(1, elapsed / TRANSITION_MIN_DURATION_MS);
      onProgressRef.current?.(ratio * 100);

      if (ratio < 1) {
        cleanupRafRef.current = requestAnimationFrame(tick);
        return;
      }

      try {
        gl.dispose();
        gl.clear();

        const canvas = gl.domElement;
        const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
        const loseContext =
          context && (context as any).getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      } catch {
        // ignore
      } finally {
        onProgressRef.current?.(100);
        cleanupActiveRef.current = false;
        cleanupRafRef.current = null;
      }
    };

    cleanupRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (cleanupRafRef.current != null) {
        cancelAnimationFrame(cleanupRafRef.current);
        cleanupRafRef.current = null;
      }
      cleanupActiveRef.current = false;
    };
  }, [gl, isTransitioning, mode, targetMode]);
}
