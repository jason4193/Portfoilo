import { useEffect } from "react";
import gsap from "gsap";

import { INTERACTION_3D, EASING } from "@animated/constants/animations";
import type { ImageTiltOptions } from "@animated/constants/animationTypes";
import { debugPerf } from "@shared/utils/debug";

/**
 * Hook for 3D tilt effect on images based on mouse movement
 * Creates a parallax/tilt effect following the cursor
 *
 * @example
 * const wrapperRef = useRef<HTMLDivElement>(null);
 * const imgRef = useRef<HTMLImageElement>(null);
 * useImageTilt({ wrapperRef, imgRef, hasImage: !!image });
 */
export function useImageTilt({
  wrapperRef,
  imgRef,
  tiltStrength = INTERACTION_3D.TILT_STRENGTH,
  duration = INTERACTION_3D.TILT_DURATION,
  resetDuration = INTERACTION_3D.TILT_RESET,
  hasImage = true,
}: ImageTiltOptions) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;

    if (!wrapper || !img || !hasImage) return;

    debugPerf("image-tilt-enabled", { tiltStrength }, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: x * tiltStrength,
        rotateX: -y * tiltStrength,
        duration,
        ease: EASING.DEFAULT,
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(img, {
        rotateX: 0,
        rotateY: 0,
        duration: resetDuration,
        ease: EASING.DEFAULT,
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [wrapperRef, imgRef, tiltStrength, duration, resetDuration, hasImage]);
}
