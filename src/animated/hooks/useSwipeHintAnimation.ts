import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseSwipeHintAnimationOptions {
  /** Ref to the stack container */
  stackRef: React.RefObject<HTMLDivElement | null>;
  /** Whether to run the animation */
  shouldAnimate: boolean;
  /** Delay before starting the hint animation (default: 2s after mount) */
  delay?: number;
}

/**
 * Hook for animating a swipe hint on the card stack
 * Demonstrates left-swipe gesture by moving the front card slightly left and back
 */
export function useSwipeHintAnimation({
  stackRef,
  shouldAnimate,
  delay = 2,
}: UseSwipeHintAnimationOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const stack = stackRef.current;
    if (!stack) return;

    const frontCard = stack.querySelector<HTMLElement>("[data-card]");
    if (!frontCard) return;

    // Kill any existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ delay })
        .to(frontCard, {
          x: -30,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(frontCard, {
          x: 0,
          duration: 0.6,
          ease: "back.out(1.5)",
        });

      timelineRef.current = tl;
    });

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
  }, [stackRef, shouldAnimate, delay]);
}
