import { useEffect, useRef, useState } from "react";
import { usePortfolioModeStore } from "../shared/stores";
import { Layout } from "./components/Layout";
import { AnimatedScene } from "./components/AnimatedScene";
import { SectionModal } from "./components/SectionModal";
import type { SectionId } from "./constants/sections";

export function AnimatedApp() {
  const { isTransitioning } = usePortfolioModeStore();
  // Loading + readiness
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canAnimate, setCanAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    const store = usePortfolioModeStore.getState();
    return !store.isTransitioning;
  });
  const canvasCreatedRef = useRef(false);
  const closeTimeoutRef = useRef<number | null>(null);
  // Section focus state
  const [selectedSection, setSelectedSection] = useState<{
    id: SectionId;
    target: [number, number, number];
  } | null>(null);
  // UI overlay refs
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  // Internal loading visibility
  const shouldShowInternalLoading = isLoading && !isTransitioning;

  // Loading progress handler
  const handleProgress = (progress: number) => {
    setLoadingProgress(progress);
    if (progress > 0 && !canvasCreatedRef.current) {
      canvasCreatedRef.current = true;
    }
  };

  // Section selection handler
  const handleSectionSelect = (
    id: SectionId,
    position: [number, number, number],
  ) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setSelectedSection({ id, target: position });
  };

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
      setLoadingProgress(100);
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
        onProgress={handleProgress}
        onSectionSelect={handleSectionSelect}
        focusTarget={selectedSection?.target ?? null}
        isSectionFocused={Boolean(selectedSection)}
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
              () => setSelectedSection(null),
              500,
            );
          }}
        />
      )}
    </Layout>
  );
}
