import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DURATION, EASING } from "../constants/animations";

// Map overlay animation durations to constants
const OVERLAY_ANIMATION_DURATION_1 = 0.55; // back.in phase
const OVERLAY_ANIMATION_DURATION_2 = 0.75; // power2.in phase

interface EntryGuideOverlayProps {
  isVisible: boolean;
  onEnter: () => void;
}

const TIPS = [
  "Drag or swipe to rotate the card",
  "Scroll or pinch to zoom in and out",
  "Click a face to open details",
  "Use the top-right toggles for mode and theme",
];

export function EntryGuideOverlay({
  isVisible,
  onEnter,
}: EntryGuideOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isMountedRef = useRef(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (exitTimelineRef.current) {
        exitTimelineRef.current.kill();
        exitTimelineRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !overlayRef.current) {
      return;
    }

    const el = overlayRef.current;
    setIsExiting(false);

    gsap.set(el, {
      opacity: 0,
      y: 8,
      scale: 0.99,
    });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: DURATION.STANDARD_LONG,
      ease: EASING.DEFAULT,
      delay: 0,
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, [isVisible]);

  const handleEnter = () => {
    if (!overlayRef.current || isExiting) {
      return;
    }

    setIsExiting(true);
    const exitDistance = window.innerHeight + 160;

    // Store timeline in ref so it can be killed on unmount
    exitTimelineRef.current = gsap
      .timeline({
        onComplete: () => {
          // Only call onEnter if component is still mounted
          if (isMountedRef.current) {
            onEnter();
          }
        },
      })
      .to(overlayRef.current, {
        scale: 0.6,
        rotateX: 8,
        rotateY: 4,
        rotateZ: -4,
        transformPerspective: 1000,
        borderRadius: "2rem",
        duration: OVERLAY_ANIMATION_DURATION_1,
        ease: "back.in(0.2)",
      })
      .to(overlayRef.current, {
        y: exitDistance,
        scale: 0.85,
        rotateX: 12,
        rotateY: 3,
        rotateZ: -3,
        opacity: 0,
        duration: OVERLAY_ANIMATION_DURATION_2,
        ease: "power2.in",
      });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-60 flex items-center justify-center px-6 py-10 text-text-panel bg-surface-animated border-2 border-card-primary/30"
    >
      <div
        className="w-full max-w-xs sm:max-w-sm text-left"
        role="dialog"
        aria-modal="true"
      >
        <div className="uppercase tracking-widest text-[0.7rem] text-text-panel/70 mb-3">
          Entry Guide
        </div>
        <h2 className="text-3xl mb-2 leading-tight text-text-panel font-bold">
          Hi, I am Jason.
        </h2>
        <p className="text-text-panel/75 mb-5 leading-loose text-base">
          You are landing on my animated portfolio. Click Enter to receive my
          business card.
        </p>

        <ul className="list-none p-0 m-0 mb-7 grid gap-2">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="flex items-center gap-2 text-text-panel/70 text-sm before:content-['▸'] before:text-card-secondary before:font-bold"
            >
              {tip}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-full bg-text-panel px-8 py-2 text-surface-animated font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity"
          onClick={handleEnter}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
