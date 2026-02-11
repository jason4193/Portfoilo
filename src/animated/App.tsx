import { useEffect, useRef, useState } from "react";
import {
  useLoadingProgressStore,
  usePortfolioModeStore,
  useSectionSelectionStore,
} from "../shared/stores";
import { Layout } from "./components/Layout";
import { AnimatedScene } from "./components/AnimatedScene";
import { SectionModal } from "./components/SectionModal";

export function AnimatedApp() {
  const { isTransitioning } = usePortfolioModeStore();
  // Loading + readiness
  const loadingProgress = useLoadingProgressStore(
    (state) => state.loadingProgress,
  );
  const [canAnimate, setCanAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    const store = usePortfolioModeStore.getState();
    return !store.isTransitioning;
  });
  const canvasCreatedRef = useRef(false);
  const closeTimeoutRef = useRef<number | null>(null);
  // Section focus state
  const selectedSection = useSectionSelectionStore(
    (state) => state.selectedSection,
  );
  const clearSelectedSection = useSectionSelectionStore(
    (state) => state.clearSelectedSection,
  );
  // UI overlay refs
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  // Internal loading visibility
  const shouldShowInternalLoading = isLoading && !isTransitioning;

  // Loading screen completion handler
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Sync loading state with transitions
  useEffect(() => {
    if (isTransitioning) {
      setIsLoading(false);
    } else if (!isTransitioning && canvasCreatedRef.current) {
      setIsLoading(false);
    } else if (
      !isLoading &&
      loadingProgress === 0 &&
      !canvasCreatedRef.current
    ) {
      setIsLoading(true);
    }
  }, [isTransitioning, isLoading, loadingProgress]);

  // Enable animations after loading
  useEffect(() => {
    if (isTransitioning || shouldShowInternalLoading) {
      setCanAnimate(false);
      return;
    }

    const raf = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [isTransitioning, shouldShowInternalLoading]);

  useEffect(() => {
    if (loadingProgress > 0 && !canvasCreatedRef.current) {
      canvasCreatedRef.current = true;
    }
  }, [loadingProgress]);

  useEffect(() => {
    if (selectedSection && closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, [selectedSection]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Layout
      showLoading={shouldShowInternalLoading}
      loadingProgress={loadingProgress}
      onLoadingComplete={handleLoadingComplete}
    >
      {/* Dim/blur overlay for focus transition */}
      <div
        ref={dimOverlayRef}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          opacity: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(0px)",
        }}
      />
      {/* 3D scene + focus handling */}
      <AnimatedScene
        isAnimationReady={canAnimate}
        dimOverlayRef={dimOverlayRef}
        modalOverlayRef={modalOverlayRef}
        modalPanelRef={modalPanelRef}
      />
      {/* Modal overlay for focused section */}
      {selectedSection && (
        <SectionModal
          sectionId={selectedSection.id}
          overlayRef={modalOverlayRef}
          panelRef={modalPanelRef}
          onClose={() => {
            if (closeTimeoutRef.current) {
              window.clearTimeout(closeTimeoutRef.current);
            }
            closeTimeoutRef.current = window.setTimeout(
              () => clearSelectedSection(),
              500,
            );
          }}
        />
      )}
    </Layout>
  );
}
