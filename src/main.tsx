import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { usePortfolioModeStore, useThemeStore } from "./shared/stores";
import { LoadingScreen } from "./shared/components/LoadingScreen";
import { MarkdownApp } from "./markdown/App";
import { AnimatedApp } from "./animated/App";
import "./shared/styles/tailwind.css";
import "./shared/styles/theme.css";

function App() {
  const { mode, isTransitioning, transitionProgress, targetMode } = usePortfolioModeStore();
  
  // Initialize theme store (ensures theme is applied, store handles persistence)
  useThemeStore();

  // Debug transition state
  useEffect(() => {
    console.log("[App] State update - mode:", mode, "isTransitioning:", isTransitioning, 
                "targetMode:", targetMode, "progress:", transitionProgress + "%");
  }, [mode, isTransitioning, targetMode, transitionProgress]);

  // Determine loading message based on transition direction
  const loadingMessage = targetMode === "animated" 
    ? "Loading 3D Portfolio..." 
    : "Compiling Markdown Format...";

  // Determine which component to show - use targetMode during transition to avoid remounting
  const displayMode = (isTransitioning && targetMode) ? targetMode : mode;
  
  console.log("[App] Render - displayMode:", displayMode, "isTransitioning:", isTransitioning);

  // Show loading screen during transition with progress
  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 z-50">
          <LoadingScreen message={loadingMessage} progress={transitionProgress} />
        </div>
      )}
      {/* Single component instance per mode - use displayMode to avoid remounting during transition */}
      {/* Key ensures React reuses the same component instance - same key = same instance */}
      {displayMode === "markdown" && (
        <div key="markdown" style={{ visibility: isTransitioning ? "hidden" : "visible" }}>
          <MarkdownApp />
        </div>
      )}
      {displayMode === "animated" && (
        <div key="animated" style={{ visibility: isTransitioning ? "hidden" : "visible" }}>
          <AnimatedApp />
        </div>
      )}
      {/* Keep current mode mounted during transition for cleanup (only if different from target) */}
      {isTransitioning && mode !== targetMode && mode === "animated" && (
        <div key="animated-cleanup" style={{ visibility: "hidden" }}>
          <AnimatedApp />
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
