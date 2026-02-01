import { useState, useEffect, useRef } from "react";
import { usePortfolioModeStore } from "../shared/stores";
import { ThemeToggle } from "../shared/components/ThemeToggle";
import { MarkdownIcon } from "../shared/components/icons";
import { LoadingScreen } from "../shared/components/LoadingScreen";
import { AnimatedScene } from "./components/AnimatedScene";

export function AnimatedApp() {
  const { toggleMode, isTransitioning } = usePortfolioModeStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  // Track if Canvas was already created (during transition)
  const canvasCreatedRef = useRef(false);
  // Initialize loading state based on transition - if transitioning, don't show internal loading
  const [isLoading, setIsLoading] = useState(() => {
    // Check transition state at initialization
    const store = usePortfolioModeStore.getState();
    const shouldLoad = !store.isTransitioning;
    console.log("[AnimatedApp] Mounting - isTransitioning:", store.isTransitioning, "shouldLoad:", shouldLoad);
    return shouldLoad;
  });
  const sceneRef = useRef<HTMLDivElement>(null);

  // Debug mount/unmount
  useEffect(() => {
    console.log("[AnimatedApp] Component mounted");
    return () => {
      console.log("[AnimatedApp] Component unmounting");
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Sync loading state with transition state
  useEffect(() => {
    console.log("[AnimatedApp] Transition state changed - isTransitioning:", isTransitioning, "isLoading:", isLoading, "canvasCreated:", canvasCreatedRef.current);
    if (isTransitioning) {
      // During transition, disable internal loading (main.tsx handles it)
      console.log("[AnimatedApp] Disabling internal loading (transition in progress)");
      setIsLoading(false);
    } else if (!isTransitioning && canvasCreatedRef.current) {
      // Transition just completed and Canvas was already created during transition
      // Mark loading as complete immediately since Canvas is ready
      console.log("[AnimatedApp] Transition completed, Canvas already created - marking loading complete");
      setIsLoading(false);
      setLoadingProgress(100);
    } else if (!isLoading && loadingProgress === 0 && !canvasCreatedRef.current) {
      // When transition ends, if Canvas wasn't created yet, start loading
      // This handles direct loads (refresh on animated mode)
      console.log("[AnimatedApp] Enabling internal loading (direct load)");
      setIsLoading(true);
    }
  }, [isTransitioning, isLoading, loadingProgress]);

  // Only show internal loading screen when NOT transitioning
  // During transitions, main.tsx handles all loading screens
  const shouldShowInternalLoading = isLoading && !isTransitioning;

  // Cleanup WebGL context only when component unmounts (not on mode change)
  // The CleanupHandler in AnimatedScene handles cleanup during transitions
  useEffect(() => {
    return () => {
      console.log("[AnimatedApp] Cleanup effect running - checking for WebGL contexts");
      // Only cleanup on actual unmount (when leaving animated mode entirely)
      // CleanupHandler in AnimatedScene handles cleanup during transitions
      if (sceneRef.current) {
        const canvases = sceneRef.current.querySelectorAll("canvas");
        console.log("[AnimatedApp] Found", canvases.length, "canvas(es) to cleanup");
        canvases.forEach((canvas, index) => {
          try {
            const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
            if (gl) {
              console.log("[AnimatedApp] Losing WebGL context for canvas", index);
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
    <div className="min-h-screen flex flex-col relative">
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
        <AnimatedScene 
          onProgress={(progress) => {
            setLoadingProgress(progress);
            // Mark Canvas as created when we get any progress
            if (progress > 0 && !canvasCreatedRef.current) {
              console.log("[AnimatedApp] Canvas created detected via progress");
              canvasCreatedRef.current = true;
            }
          }} 
        />
      </div>
    </div>
  );
}
