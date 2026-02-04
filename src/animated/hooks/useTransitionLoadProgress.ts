import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { usePortfolioModeStore } from "../../shared/stores";
import { TRANSITION_MIN_DURATION_MS } from "../constants/transition";

interface TransitionProgressOptions {
  onProgress?: (progress: number) => void;
}

// Configures the renderer and drives loading progress during transitions.
export function useTransitionLoadProgress({ onProgress }: TransitionProgressOptions) {
  const { gl } = useThree();
  const { progress } = useProgress(); // 0 → 100 based on real asset loading
  const progressRef = useRef(0);
  const { isTransitioning, targetMode, mode } = usePortfolioModeStore();
  const prevIsTransitionToAnimatedRef = useRef(false);

  const onProgressRef = useRef<TransitionProgressOptions["onProgress"]>(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    progressRef.current = Math.max(0, Math.min(100, progress));
  }, [progress]);

  const startTimeRef = useRef<number | null>(null);
  const phaseRef = useRef<"transition" | "direct" | null>(null);

  // One-time renderer configuration
  useEffect(() => {
    gl.outputColorSpace = SRGBColorSpace;
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);

  // Track phase changes explicitly so timing doesn't reset every frame.
  useEffect(() => {
    const isTransitionToAnimated =
      isTransitioning && targetMode === "animated";
    const isDirectAnimated = !isTransitioning && mode === "animated";

    if (isTransitionToAnimated && !prevIsTransitionToAnimatedRef.current) {
      startTimeRef.current = performance.now();
    }
    prevIsTransitionToAnimatedRef.current = isTransitionToAnimated;

    if (isTransitionToAnimated) {
      phaseRef.current = "transition";
      return;
    }

    if (isDirectAnimated) {
      if (phaseRef.current !== "direct") {
        phaseRef.current = "direct";
        startTimeRef.current = performance.now();
      }
      return;
    }

    phaseRef.current = null;
    startTimeRef.current = null;
  }, [isTransitioning, targetMode, mode]);

  // Drive progress based on real asset loading state every frame (so time can advance)
  useFrame(() => {
    if (!phaseRef.current || startTimeRef.current == null) return;

    const elapsedMs = performance.now() - startTimeRef.current;
    const timeCap = Math.min(
      100,
      (elapsedMs / TRANSITION_MIN_DURATION_MS) * 100,
    );
    const clampedReal = progressRef.current;

    const display =
      clampedReal > 0 ? Math.min(clampedReal, timeCap) : timeCap;

    onProgressRef.current?.(display);
  });
}
