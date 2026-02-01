import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Scene } from "./Scene";
import { usePortfolioModeStore } from "../../shared/stores";

interface AnimatedSceneProps {
  onProgress?: (progress: number) => void;
}

// Component to handle cleanup with progress tracking
function CleanupHandler({ onCleanupProgress }: { onCleanupProgress?: (progress: number) => void }) {
  const { gl } = useThree();
  const { isTransitioning, mode, targetMode } = usePortfolioModeStore();

  useEffect(() => {
    // Only track cleanup if we're transitioning away from animated mode
    const isCleaningUp = isTransitioning && mode === "animated" && targetMode === "markdown";
    
    console.log("[CleanupHandler] Effect running - isTransitioning:", isTransitioning, 
                "mode:", mode, "targetMode:", targetMode, 
                "isCleaningUp:", isCleaningUp, "onCleanupProgress:", !!onCleanupProgress);
    
    if (!isCleaningUp || !onCleanupProgress) {
      return;
    }

    console.log("[CleanupHandler] Starting cleanup process (animated → markdown)");

    let cleanupProgress = 0;
    const cleanupSteps = [
      () => {
        cleanupProgress = 20;
        console.log("[CleanupHandler] Cleanup step: 20% - Disposing renderer");
        onCleanupProgress(cleanupProgress);
        // Dispose geometries and materials
        gl.dispose();
      },
      () => {
        cleanupProgress = 50;
        console.log("[CleanupHandler] Cleanup step: 50% - Clearing renderer");
        onCleanupProgress(cleanupProgress);
        // Clear renderer state
        gl.clear();
      },
      () => {
        cleanupProgress = 80;
        console.log("[CleanupHandler] Cleanup step: 80% - Losing WebGL context");
        onCleanupProgress(cleanupProgress);
        // Force context loss
        const canvas = gl.domElement;
        const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
        if (context) {
          const loseContext = (context as any).getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        }
      },
      () => {
        cleanupProgress = 100;
        console.log("[CleanupHandler] Cleanup step: 100% - Cleanup complete");
        onCleanupProgress(cleanupProgress);
      },
    ];

    // Execute cleanup steps with small delays for smooth progress
    cleanupSteps.forEach((step, index) => {
      setTimeout(() => {
        try {
          step();
        } catch (e) {
          // Silently ignore cleanup errors
        }
      }, index * 50); // 50ms between steps
    });

    return () => {
      // Final cleanup on unmount
      try {
        gl.dispose();
        const canvas = gl.domElement;
        const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
        if (context) {
          const loseContext = (context as any).getExtension("WEBGL_lose_context");
          if (loseContext) {
            loseContext.loseContext();
          }
        }
      } catch (e) {
        // Silently ignore cleanup errors
      }
    };
  }, [gl, isTransitioning, mode, targetMode, onCleanupProgress]);

  return null;
}

export function AnimatedScene({ onProgress }: AnimatedSceneProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const store = usePortfolioModeStore();
  const { setTransitionProgress, completeTransition } = store;

  // Debug mount/unmount
  useEffect(() => {
    console.log("[AnimatedScene] Component mounted");
    return () => {
      console.log("[AnimatedScene] Component unmounting");
    };
  }, []);

  // Get current state - use function form to get latest state
  const getTransitionState = () => {
    const state = usePortfolioModeStore.getState();
    return {
      isTransitioning: state.isTransitioning,
      targetMode: state.targetMode,
      mode: state.mode,
    };
  };

  // Determine if we're cleaning up (going FROM animated)
  // Loading mode is checked inside onCreated callback to get latest state
  const transitionState = getTransitionState();
  const isCleaningUp = transitionState.isTransitioning && transitionState.mode === "animated" && transitionState.targetMode === "markdown";

  // Handle cleanup progress (when leaving animated mode)
  const handleCleanupProgress = (progress: number) => {
    console.log("[AnimatedScene] Cleanup progress:", progress + "%");
    setTransitionProgress(progress);
    if (progress >= 100) {
      console.log("[AnimatedScene] Cleanup complete, finishing transition");
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        completeTransition();
      }, 100);
    }
  };

  // Handle loading progress (when entering animated mode)
  const handleLoadingProgress = (progress: number) => {
    console.log("[AnimatedScene] Loading progress:", progress + "%");
    setTransitionProgress(progress);
    if (progress >= 100) {
      console.log("[AnimatedScene] Loading complete, finishing transition");
      // Small delay to ensure everything is ready
      setTimeout(() => {
        completeTransition();
      }, 100);
    }
  };

  return (
    <div ref={canvasRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: false, // Better for cleanup
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
        onCreated={() => {
          console.log("[AnimatedScene] Canvas created - WebGL renderer initialized");
          // Check transition state at callback time (not render time)
          const currentState = getTransitionState();
          const isInLoadingMode = currentState.isTransitioning && currentState.targetMode === "animated";
          const isInTransition = currentState.isTransitioning;

          console.log("[AnimatedScene] onCreated - isTransitioning:", currentState.isTransitioning, 
                      "targetMode:", currentState.targetMode, 
                      "mode:", currentState.mode,
                      "isInLoadingMode:", isInLoadingMode,
                      "isInTransition:", isInTransition);

          // During transitions TO animated, only report to transition progress (main.tsx handles loading screen)
          if (isInLoadingMode) {
            console.log("[AnimatedScene] Starting transition loading (markdown → animated)");
            // Notify AnimatedApp that Canvas is created (so it knows not to show internal loading)
            if (onProgress) {
              onProgress(100); // Signal Canvas is ready
            }
            // Simulate 3D setup progress - only report to transition progress
            let progress = 0;
            const loadingSteps = [
              () => {
                progress = 20;
                console.log("[AnimatedScene] Loading step: 20%");
                handleLoadingProgress(progress);
              },
              () => {
                progress = 40;
                console.log("[AnimatedScene] Loading step: 40%");
                handleLoadingProgress(progress);
              },
              () => {
                progress = 60;
                console.log("[AnimatedScene] Loading step: 60%");
                handleLoadingProgress(progress);
              },
              () => {
                progress = 80;
                console.log("[AnimatedScene] Loading step: 80%");
                handleLoadingProgress(progress);
              },
              () => {
                progress = 100;
                console.log("[AnimatedScene] Loading step: 100%");
                handleLoadingProgress(progress);
              },
            ];

            // Execute loading steps with delays
            loadingSteps.forEach((step, index) => {
              setTimeout(() => {
                step();
              }, index * 100); // 100ms between steps
            });
          } else if (!isInTransition && onProgress) {
            console.log("[AnimatedScene] Starting direct load (refresh on animated mode)");
            // Normal loading (not during transition) - report to AnimatedApp's internal progress
            // This is for direct loads (refresh on animated mode)
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              console.log("[AnimatedScene] Direct load progress:", progress + "%");
              onProgress(Math.min(progress, 100));
              if (progress >= 100) {
                console.log("[AnimatedScene] Direct load complete");
                clearInterval(interval);
              }
            }, 100);
          } else {
            console.log("[AnimatedScene] No loading started - isTransitioning:", isInTransition, "onProgress:", !!onProgress);
          }
          // During transition, never call onProgress (AnimatedApp's internal loading is disabled)
        }}
      >
        <CleanupHandler onCleanupProgress={isCleaningUp ? handleCleanupProgress : undefined} />
        <Scene />
      </Canvas>
    </div>
  );
}
