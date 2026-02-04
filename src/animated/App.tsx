import { useEffect, useRef, useState } from "react";
import { usePortfolioModeStore } from "../shared/stores";
import { Layout } from "./components/Layout";
import { AnimatedScene } from "./components/AnimatedScene";

export function AnimatedApp() {
  const { isTransitioning } = usePortfolioModeStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canAnimate, setCanAnimate] = useState(false);
  const canvasCreatedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(() => {
    const store = usePortfolioModeStore.getState();
    return !store.isTransitioning;
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isTransitioning) {
      setIsLoading(false);
    } else if (!isTransitioning && canvasCreatedRef.current) {
      setIsLoading(false);
      setLoadingProgress(100);
    } else if (!isLoading && loadingProgress === 0 && !canvasCreatedRef.current) {
      setIsLoading(true);
    }
  }, [isTransitioning, isLoading, loadingProgress]);

  const shouldShowInternalLoading = isLoading && !isTransitioning;

  useEffect(() => {
    if (isTransitioning || shouldShowInternalLoading) {
      setCanAnimate(false);
      return;
    }

    const raf = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [isTransitioning, shouldShowInternalLoading]);

  return (
    <Layout
      showLoading={shouldShowInternalLoading}
      loadingProgress={loadingProgress}
      onLoadingComplete={handleLoadingComplete}
    >
      <AnimatedScene
        isAnimationReady={canAnimate}
        onProgress={(progress) => {
          setLoadingProgress(progress);
          if (progress > 0 && !canvasCreatedRef.current) {
            canvasCreatedRef.current = true;
          }
        }}
      />
    </Layout>
  );
}
