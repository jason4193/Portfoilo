import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SwipeInstructionProps {
  /** Delay before showing instruction (in seconds) */
  delay?: number;
  /** Callback when instruction animation completes */
  onComplete?: () => void;
}

/**
 * Swipe instruction text that fades in from bottom, displays briefly, then fades out
 * Shows "← Swipe to see more" hint
 */
export function SwipeInstruction({
  delay = 1.5,
  onComplete,
}: SwipeInstructionProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when callback changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Force initial state with important flag
    gsap.set(text, {
      opacity: 0,
      y: 20,
      force3D: true,
      immediateRender: true,
    });

    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        setShouldRender(false);
        onCompleteRef.current?.();
      },
    });

    timelineRef.current = tl;

    // Fade in from bottom - override any parent animations
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto", // Override conflicting animations
      force3D: true,
    });
    // Hold for a moment
    tl.to(text, { duration: 0.5 });
    // Fade out
    tl.to(text, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.in",
      overwrite: "auto",
    });

    const cleanup = () => {
      tl.kill();
      gsap.set(text, { clearProps: "all" });
    };

    return cleanup;
  }, [delay]);

  if (!shouldRender) return null;

  return (
    <div
      ref={textRef}
      className="absolute left-0 right-0 bottom-1 flex items-center justify-center gap-2 text-sm pointer-events-none"
      style={{ isolation: "isolate", color: "var(--color-panel-text-muted)" }}
    >
      <span className="text-base">←</span>
      <span>Swipe to see more</span>
    </div>
  );
}
