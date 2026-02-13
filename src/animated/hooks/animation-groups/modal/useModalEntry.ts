import { useEffect } from "react";
import gsap from "gsap";

interface AnimationConfig {
  /** Ref to the header element (optional) */
  headerRef?: React.RefObject<HTMLElement | null>;
  /** Ref to the main content area */
  contentRef?: React.RefObject<HTMLElement | null>;
  /** Ref to the close button element */
  closeRef: React.RefObject<HTMLElement | null>;
  /** CSS selector for content items to animate (for stagger) */
  contentSelector?: string;
  /** Whether to stagger animate content items */
  stagger?: boolean;
  /** Custom content animation function */
  customContentAnimation?: (timeline: gsap.core.Timeline) => void;
  /** Initial delay before animation starts */
  delay?: number;
  /** Dependencies array to re-run effect */
  dependencies?: unknown[];
}

/**
 * Reusable hook for modal entry animations
 * Animates header, content, and close button in sequence
 */
export function useModalEntry({
  headerRef,
  contentRef,
  closeRef,
  contentSelector,
  stagger = false,
  customContentAnimation,
  delay = 0.5,
  dependencies = [],
}: AnimationConfig) {
  useEffect(() => {
    const header = headerRef?.current;
    const content = contentRef?.current;
    const close = closeRef.current;

    if (!close) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay,
      });

      // Animate header (if provided)
      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 },
        );
      }

      // Animate content
      if (customContentAnimation) {
        customContentAnimation(tl);
      } else if (content && contentSelector && stagger) {
        const contentItems =
          content.querySelectorAll<HTMLElement>(contentSelector);
        if (contentItems.length > 0) {
          tl.fromTo(
            contentItems,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.1",
          );
        }
      } else if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1",
        );
      }

      // Animate close button
      tl.fromTo(
        close,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.15",
      );
    });

    return () => ctx.revert();
  }, [
    headerRef,
    contentRef,
    closeRef,
    contentSelector,
    stagger,
    customContentAnimation,
    delay,
    ...dependencies,
  ]);
}
