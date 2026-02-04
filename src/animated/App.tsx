import { useState, useEffect, useRef } from "react";
import { usePortfolioModeStore, useThemeStore } from "../shared/stores";
import { ThemeToggle } from "../shared/components/ThemeToggle";
import { MarkdownIcon } from "../shared/components/icons";
import { LoadingScreen } from "../shared/components/LoadingScreen";
import { Layout as AnimatedLayout } from "./components/Layout";

export function AnimatedApp() {
  const { toggleMode, isTransitioning } = usePortfolioModeStore();
  const { theme } = useThemeStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canAnimate, setCanAnimate] = useState(false);
  // Track if Canvas was already created (during transition)
  const canvasCreatedRef = useRef(false);
  // Initialize loading state based on transition - if transitioning, don't show internal loading
  const [isLoading, setIsLoading] = useState(() => {
    // Check transition state at initialization
    const store = usePortfolioModeStore.getState();
    return !store.isTransitioning;
  });
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Sync loading state with transition state
  useEffect(() => {
    if (isTransitioning) {
      // During transition, disable internal loading (main.tsx handles it)
      setIsLoading(false);
    } else if (!isTransitioning && canvasCreatedRef.current) {
      // Transition just completed and Canvas was already created during transition
      // Mark loading as complete immediately since Canvas is ready
      setIsLoading(false);
      setLoadingProgress(100);
    } else if (!isLoading && loadingProgress === 0 && !canvasCreatedRef.current) {
      // When transition ends, if Canvas wasn't created yet, start loading
      // This handles direct loads (refresh on animated mode)
      setIsLoading(true);
    }
  }, [isTransitioning, isLoading, loadingProgress]);

  // Only show internal loading screen when NOT transitioning
  // During transitions, main.tsx handles all loading screens
  const shouldShowInternalLoading = isLoading && !isTransitioning;

  // Gate card animation until all loading screens are gone
  useEffect(() => {
    if (isTransitioning || shouldShowInternalLoading) {
      setCanAnimate(false);
      return;
    }

    const raf = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [isTransitioning, shouldShowInternalLoading]);

  // Cleanup WebGL context only when component unmounts (not on mode change)
  // The CleanupHandler in Layout handles cleanup during transitions
  useEffect(() => {
    return () => {
      // Only cleanup on actual unmount (when leaving animated mode entirely)
      // CleanupHandler in Layout handles cleanup during transitions
      if (sceneRef.current) {
        const canvases = sceneRef.current.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          try {
            const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
            if (gl) {
              const loseContext = (gl as any).getExtension("WEBGL_lose_context");
              if (loseContext) {
                loseContext.loseContext();
              }
            }
          } catch (e) {
            console.error("[AnimatedApp] Error during cleanup:", e);
          }
        });
      }
    };
  }, []); // Empty deps - only run on unmount, not on mode/transition changes

  return (
    <div
      className="min-h-screen flex flex-col relative"
      // Slightly warmer/darker background only for animated mode in light theme
      style={{
        backgroundColor:
          theme === "light" ? "#DDE4EA" : "var(--color-bg-primary)",
      }}
    >
      {/* Loading Screen - only show when NOT in transition (main.tsx handles transition loading) */}
      {shouldShowInternalLoading && (
        <LoadingScreen
          message="Loading 3D Portfolio"
          progress={loadingProgress}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* Minimal floating toggle buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleMode}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-colors shadow-lg flex items-center justify-center"
          aria-label="Switch to markdown mode"
          title="Switch to markdown mode"
        >
          <MarkdownIcon className="w-5 h-5" aria-hidden={true} />
        </button>
        <ThemeToggle />
      </div>

      {/* 3D Scene */}
      <div ref={sceneRef}>
        <AnimatedLayout 
          isAnimationReady={canAnimate}
          onProgress={(progress) => {
            setLoadingProgress(progress);
            // Mark Canvas as created when we get any progress
            if (progress > 0 && !canvasCreatedRef.current) {
              canvasCreatedRef.current = true;
            }
          }} 
        />
      </div>
    </div>
  );
}
