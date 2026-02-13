import { type RefObject } from "react";

import { useModalEntry } from "./useModalEntry";
import { useBlurMorph } from "./useCardGrid";

interface UseModalContentAnimationOptions {
  /** Ref to the modal header element */
  headerRef: RefObject<HTMLDivElement | null>;
  /** Ref to the close button element */
  closeRef: RefObject<HTMLDivElement | null>;
  /** Ref to the intro paragraph */
  introRef: RefObject<HTMLParagraphElement | null>;
  /** Ref to the cards container (desktop) */
  cardsRef?: RefObject<HTMLDivElement | null>;
  /** Ref to the stack container (mobile) */
  stackRef?: RefObject<HTMLDivElement | null>;
  /** Whether currently in mobile viewport */
  isMobile: boolean;
  /** Delay before animation starts */
  delay?: number;
}

/**
 * Standardized modal content animation hook
 * Handles intro text → stack (mobile) or cards (desktop) entry animations
 */
export function useModalContent({
  headerRef,
  closeRef,
  introRef,
  cardsRef,
  stackRef,
  isMobile,
  delay = 0.5,
}: UseModalContentAnimationOptions) {
  const runBlurMorph = useBlurMorph({ cardsRef });

  useModalEntry({
    headerRef,
    closeRef,
    delay,
    dependencies: [isMobile],
    customContentAnimation: (tl) => {
      const intro = introRef.current;
      const stack = stackRef?.current;

      if (intro) {
        tl.fromTo(
          intro,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.2",
        );
      }

      if (isMobile && stack) {
        tl.fromTo(
          stack,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1",
        );
      } else {
        runBlurMorph(tl);
      }
    },
  });
}
