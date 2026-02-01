import { useState, useEffect } from "react";
import type { TocItem } from "./useToc";

export interface ScrollState {
  currentSectionId: string | null;
  progressPercent: number;
}

export function useScrollSpy(tocItems: TocItem[]) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSectionId: null,
    progressPercent: 0,
  });

  useEffect(() => {
    if (tocItems.length === 0) return;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent =
        documentHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100))
          : 0;

      // Find the current section based on scroll position
      let currentSectionId: string | null = null;

      // Check sections from bottom to top to find the one we're currently viewing
      // This ensures subsections are detected when scrolled to
      for (let i = tocItems.length - 1; i >= 0; i--) {
        const item = tocItems[i];
        if (item.element) {
          const rect = item.element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          const viewportTop = window.scrollY;
          const viewportBottom = viewportTop + window.innerHeight;

          // Check if element is in viewport (with some tolerance)
          const isInViewport =
            elementBottom >= viewportTop - 50 &&
            elementTop <= viewportBottom + 50;

          if (isInViewport) {
            // For elements in viewport, prefer those closer to the top third
            // This helps detect subsections that are scrolled into view
            if (rect.top <= window.innerHeight * 0.5) {
              currentSectionId = item.id;
              break;
            }
          }

          // Also check if section top has passed the top threshold
          // This is the original logic for sections at the top
          if (rect.top <= window.innerHeight * 0.33 && rect.top >= -200) {
            currentSectionId = item.id;
            break;
          }
        }
      }

      // If no section found and we're at the top, select the first one
      if (!currentSectionId && scrollTop < 100) {
        currentSectionId = tocItems[0]?.id || null;
      }

      setScrollState({
        currentSectionId,
        progressPercent,
      });
    };

    // Initial update
    updateScrollState();

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [tocItems]);

  return scrollState;
}
