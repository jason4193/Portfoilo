import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CardStackIndicatorProps {
  total: number;
  currentIndex: number;
  onDotClick?: (index: number) => void;
  /** Delay before showing indicator (in seconds) */
  delay?: number;
}

/**
 * Approach 1: Individual animated dots indicator
 * Each dot scales and expands width when active with GSAP bounce animation
 */
export function CardStackIndicator({
  total,
  currentIndex,
  onDotClick,
  delay = 0,
}: CardStackIndicatorProps) {
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial fade in animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, [delay]);

  useEffect(() => {
    // Animate all dots on index change
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      if (index === currentIndex) {
        // Active dot: scale up, expand width, brighten
        gsap.to(dot, {
          scale: 1.2,
          width: "1.5rem", // 24px
          backgroundColor: "#0B2B4C", // Active color
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        // Inactive dots: scale down, shrink width, fade
        gsap.to(dot, {
          scale: 1,
          width: "0.5rem", // 8px
          backgroundColor: "#CBD5E1", // Inactive gray
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center gap-2 mt-4"
      role="tablist"
      style={{ opacity: 0 }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          ref={(el) => {
            dotsRef.current[index] = el;
          }}
          onClick={() => onDotClick?.(index)}
          className="h-2 rounded-full cursor-pointer border-0 transition-colors"
          style={{
            width: index === currentIndex ? "1.5rem" : "0.5rem",
            backgroundColor: index === currentIndex ? "#0B2B4C" : "#CBD5E1",
          }}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`View card ${index + 1} of ${total}`}
        />
      ))}
    </div>
  );
}
