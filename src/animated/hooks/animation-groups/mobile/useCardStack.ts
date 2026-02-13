import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- GSAP Flip has Flip.d.ts vs flip.d.ts casing mismatch
// @ts-ignore
import { Flip } from "gsap/Flip";

import {
  SWIPE_THRESHOLD,
  STACK_LEFT_OFFSET,
  STACK_TOP_OFFSET,
} from "@animated/constants/mobile";

gsap.registerPlugin(Flip);

/**
 * Hook for managing stack card cycling animations with swipe gestures
 * @param itemsLength Number of items in the stack
 * @returns Refs and handlers for stack card interaction
 */
export function useCardStack(itemsLength: number) {
  const stackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cycleCard = useCallback(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length <= 1) return;

    // Update current index (cycles through: 0, 1, 2, ..., length-1, 0, ...)
    setCurrentIndex((prev) => (prev + 1) % itemsLength);

    const state = Flip.getState(cards);
    const first = cards[0];
    stack.appendChild(first);

    const updatedCards = stack.querySelectorAll<HTMLElement>("[data-card]");
    updatedCards.forEach((card, index) => {
      card.style.left = `${index * STACK_LEFT_OFFSET}px`;
      card.style.top = `${index * STACK_TOP_OFFSET}px`;
      card.style.zIndex = `${itemsLength - index}`;
    });

    Flip.from(state, {
      targets: cards,
      ease: "sine.inOut",
      absolute: true,
      duration: 0.4,
      onLeave: (elements) =>
        gsap.to(elements, {
          duration: 0.3,
          yPercent: 5,
          xPercent: -5,
          transformOrigin: "bottom left",
          opacity: 0,
          ease: "power2.in",
        }),
      onEnter: (elements) =>
        gsap.from(elements, {
          duration: 0.3,
          yPercent: 20,
          opacity: 0,
          ease: "power2.out",
        }),
    });
  }, [itemsLength]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      if (deltaX > SWIPE_THRESHOLD) {
        cycleCard();
      }
    },
    [cycleCard],
  );

  return {
    stackRef,
    cycleCard,
    handleTouchStart,
    handleTouchEnd,
    currentIndex,
  };
}
