import React from "react";
import ReactDOM from "react-dom/client";
import { usePortfolioModeStore, useThemeStore } from "./shared/stores";
import { LoadingScreen } from "./shared/components/LoadingScreen";
import { MarkdownApp } from "./markdown/App";
import { AnimatedApp } from "./animated/App";
import "./shared/styles/tailwind.css";
import "./shared/styles/theme.css";

function App() {
  const { mode, isTransitioning } = usePortfolioModeStore();
  
  // Initialize theme store (ensures theme is applied, store handles persistence)
  useThemeStore();

  // Show loading screen during transition
  if (isTransitioning) {
    return <LoadingScreen message="Switching mode..." />;
  }

  return (
    <>
      {mode === "markdown" ? <MarkdownApp /> : <AnimatedApp />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
