import gsap from "gsap";

import {
  DURATION,
  EASING,
  TRANSLATE_Y,
  SCALE,
  BLUR,
} from "@animated/constants/animations";
import type {
  AnimationValues,
  StaggerConfig,
} from "@animated/constants/animationTypes";

/**
 * Create a GSAP timeline with default settings
 */
export function createTimeline(
  options: gsap.TimelineVars = {},
): gsap.core.Timeline {
  return gsap.timeline({
    defaults: { ease: EASING.DEFAULT },
    ...options,
  });
}

/**
 * Common fade in animation
 */
export function fadeIn(
  element: gsap.TweenTarget,
  options: { duration?: number; y?: number; delay?: number } = {},
): gsap.core.Tween {
  const { duration = DURATION.STANDARD, y = 0, delay = 0 } = options;

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: EASING.DEFAULT },
  );
}

/**
 * Common fade out animation
 */
export function fadeOut(
  element: gsap.TweenTarget,
  options: { duration?: number; y?: number; delay?: number } = {},
): gsap.core.Tween {
  const { duration = DURATION.STANDARD, y = 10, delay = 0 } = options;

  return gsap.to(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease: EASING.DEFAULT,
  });
}

/**
 * Slide in from direction
 */
export function slideIn(
  element: gsap.TweenTarget,
  direction: "left" | "right" | "up" | "down",
  options: { duration?: number; distance?: number; delay?: number } = {},
): gsap.core.Tween {
  const {
    duration = DURATION.STANDARD,
    distance = TRANSLATE_Y.STANDARD,
    delay = 0,
  } = options;

  const from: AnimationValues = { opacity: 0 };
  const to: AnimationValues = {
    opacity: 1,
    duration,
    delay,
    ease: EASING.DEFAULT,
  };

  switch (direction) {
    case "left":
      from.x = -distance;
      to.x = 0;
      break;
    case "right":
      from.x = distance;
      to.x = 0;
      break;
    case "up":
      from.y = distance;
      to.y = 0;
      break;
    case "down":
      from.y = -distance;
      to.y = 0;
      break;
  }

  return gsap.fromTo(element, from, to);
}

/**
 * Scale animation
 */
export function scale(
  element: gsap.TweenTarget,
  options: {
    from?: number;
    to?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {},
): gsap.core.Tween {
  const {
    from = SCALE.HIDDEN,
    to = SCALE.NORMAL,
    duration = DURATION.STANDARD,
    delay = 0,
    ease = EASING.BACK,
  } = options;

  return gsap.fromTo(
    element,
    { scale: from, opacity: 0 },
    { scale: to, opacity: 1, duration, delay, ease },
  );
}

/**
 * Blur morph animation (signature effect)
 */
export function blurMorph(
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    fromBlur?: number;
    fromScale?: number;
    fromY?: number;
  } = {},
): gsap.core.Tween {
  const {
    duration = DURATION.STANDARD_LONG,
    delay = 0,
    fromBlur = BLUR.STRONG,
    fromScale = SCALE.SLIGHT,
    fromY = TRANSLATE_Y.LARGE,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      filter: `blur(${fromBlur}px)`,
      scale: fromScale,
      y: fromY,
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      duration,
      delay,
      ease: EASING.DEFAULT,
    },
  );
}

/**
 * Stagger animation helper
 */
export function staggerIn(
  elements: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number | StaggerConfig;
    from?: AnimationValues;
    to?: Partial<AnimationValues>;
  } = {},
): gsap.core.Tween {
  const {
    duration = DURATION.STANDARD,
    delay = 0,
    stagger = 0.12,
    from = { opacity: 0, y: TRANSLATE_Y.STANDARD },
    to = {},
  } = options;

  return gsap.fromTo(elements, from, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    ...to,
    duration,
    delay,
    stagger,
    ease: EASING.DEFAULT,
  });
}

/**
 * Kill all animations on an element and reset properties
 */
export function killAndReset(element: gsap.TweenTarget, clearProps = "all") {
  gsap.killTweensOf(element);
  gsap.set(element, { clearProps });
}

/**
 * Conditional animation helper - only runs if condition is true
 */
export function animateIf(
  condition: boolean,
  animationFn: () => gsap.core.Tween | gsap.core.Timeline,
): gsap.core.Tween | gsap.core.Timeline | null {
  return condition ? animationFn() : null;
}

/**
 * Add animation to timeline with relative positioning
 */
export function addToTimeline(
  timeline: gsap.core.Timeline,
  animation: () => void,
  position: string | number = "+=0",
): gsap.core.Timeline {
  return timeline.add(animation, position);
}

/**
 * Create a looping animation
 */
export function createLoop(
  element: gsap.TweenTarget,
  animation: gsap.TweenVars,
  options: { yoyo?: boolean; repeatDelay?: number } = {},
): gsap.core.Tween {
  const { yoyo = true, repeatDelay = 0 } = options;

  return gsap.to(element, {
    ...animation,
    repeat: -1,
    yoyo,
    repeatDelay,
  });
}
