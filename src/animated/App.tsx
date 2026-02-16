import { useEffect, useRef, useState } from "react";
import {
  useLoadingProgressStore,
  usePortfolioModeStore,
  useSectionSelectionStore,
} from "../shared/stores";
import { Layout } from "./components/Layout";
import { AnimatedScene } from "./components/AnimatedScene";
import { SectionModal } from "./components/SectionModal";
import { EntryGuideOverlay } from "./components/EntryGuideOverlay";

export function AnimatedApp() {
  const { isTransitioning } = usePortfolioModeStore();
  const MIN_LOADING_DURATION_MS = 1200;
  // Loading + readiness
  const loadingProgress = useLoadingProgressStore(
    (state) => state.loadingProgress,
  );
  const [canAnimate, setCanAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    const store = usePortfolioModeStore.getState();
    return !store.isTransitioning;
  });
  const [showEntryGuide, setShowEntryGuide] = useState(false);
  const canvasCreatedRef = useRef(false);
  const entryGuideTriggeredRef = useRef(false);
  const loadingStartRef = useRef<number | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
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

  const scheduleLoadingComplete = () => {
    if (loadingTimeoutRef.current != null) {
      return;
    }

    const startTime = loadingStartRef.current ?? performance.now();
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_LOADING_DURATION_MS - elapsed);

    loadingTimeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      loadingTimeoutRef.current = null;
    }, remaining);
  };

  // Loading screen completion handler
  const handleLoadingComplete = () => {
    scheduleLoadingComplete();
  };

  // Sync loading state with transitions
  useEffect(() => {
    if (isTransitioning) {
      setShowEntryGuide(false);
      setIsLoading(false);
      loadingStartRef.current = null;
      if (loadingTimeoutRef.current != null) {
        window.clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    } else if (!isTransitioning && canvasCreatedRef.current) {
      if (loadingProgress >= 100) {
        scheduleLoadingComplete();
      }
    } else if (
      !isLoading &&
      loadingProgress === 0 &&
      !canvasCreatedRef.current
    ) {
      setIsLoading(true);
      loadingStartRef.current = performance.now();
    }
  }, [isTransitioning, isLoading, loadingProgress]);

  useEffect(() => {
    if (!isTransitioning && loadingProgress === 0) {
      entryGuideTriggeredRef.current = false;
      setShowEntryGuide(false);
    }

    if (
      !isTransitioning &&
      loadingProgress >= 85 &&
      !entryGuideTriggeredRef.current
    ) {
      entryGuideTriggeredRef.current = true;
      setShowEntryGuide(true);
    }
  }, [loadingProgress, isTransitioning]);

  // Enable animations after loading and entry guide dismissal
  useEffect(() => {
    if (isTransitioning || shouldShowInternalLoading || showEntryGuide) {
      setCanAnimate(false);
      return;
    }

    const raf = requestAnimationFrame(() => setCanAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [isTransitioning, shouldShowInternalLoading, showEntryGuide]);

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
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
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
      <EntryGuideOverlay
        isVisible={showEntryGuide}
        onEnter={() => setShowEntryGuide(false)}
      />
      {/* Dim/blur overlay for focus transition */}
      <div
        ref={dimOverlayRef}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          opacity: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(0)",
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
