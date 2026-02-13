import { useCallback, type RefObject } from "react";

interface CardAnimationOptions {
  /** Ref to the cards container (desktop) */
  cardsRef?: RefObject<HTMLDivElement | null>;
}

/**
 * Blur Morph Animation
 * Cards fade in with blur reduction and subtle scale
 * Creates a soft, elegant, modern effect like objects materializing from fog
 */
export function useBlurMorph({ cardsRef }: CardAnimationOptions) {
  return useCallback((timeline?: gsap.core.Timeline) => {
    if (!timeline) return;

    const cards = cardsRef?.current;
    if (!cards) return;

    const cardEls = cards.querySelectorAll<HTMLElement>("[data-card]");
    if (cardEls.length === 0) return;

    timeline.fromTo(
      cardEls,
      {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.85,
        y: 40,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "random", // Random order creates organic feel
        },
        ease: "power2.out",
      },
      "-=0.1",
    );
  }, [cardsRef]);
}
