import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DURATION, EASING } from "../constants/animations";

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
  const [isExiting, setIsExiting] = useState(false);

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

    gsap
      .timeline({
        onComplete: onEnter,
      })
      .to(overlayRef.current, {
        scale: 0.6,
        rotateX: 8,
        rotateY: 4,
        rotateZ: -4,
        transformPerspective: 1000,
        borderRadius: "2rem",
        duration: 0.55,
        ease: "back.in(0.2)",
      })
      .to(overlayRef.current, {
        y: exitDistance,
        scale: 0.85,
        rotateX: 12,
        rotateY: 3,
        rotateZ: -3,
        opacity: 0,
        duration: 0.75,
        ease: "power2.in",
      });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="entry-guide-overlay" ref={overlayRef}>
      <div className="entry-guide-content" role="dialog" aria-modal="true">
        <div className="entry-guide-kicker">Entry Guide</div>
        <h2 className="entry-guide-title">Hi, I am Jason.</h2>
        <p className="entry-guide-copy">
          You are landing on my animated portfolio. Click Enter to receive my
          business card.
        </p>

        <ul className="entry-guide-tips">
          {TIPS.map((tip) => (
            <li key={tip} className="entry-guide-tip">
              {tip}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="entry-guide-button"
          onClick={handleEnter}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
