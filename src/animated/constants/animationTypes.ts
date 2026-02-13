import type { RefObject } from "react";

/**
 * Common animation hook options
 */
export interface BaseAnimationOptions {
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of animation (seconds) */
  duration?: number;
  /** GSAP easing function */
  ease?: string;
}

/**
 * Options for timeline-based animations
 */
export interface TimelineAnimationOptions extends BaseAnimationOptions {
  /** GSAP timeline to add animation to */
  timeline: gsap.core.Timeline;
}

/**
 * Options for ref-based animations
 */
export interface RefAnimationOptions<T extends HTMLElement = HTMLElement>
  extends BaseAnimationOptions {
  /** React ref to the element to animate */
  ref: RefObject<T | null>;
}

/**
 * Options for modal animations
 */
export interface ModalAnimationOptions {
  /** Ref to the modal header element */
  headerRef?: RefObject<HTMLElement | null>;
  /** Ref to the main content area */
  contentRef?: RefObject<HTMLElement | null>;
  /** Ref to the close button element */
  closeRef: RefObject<HTMLElement | null>;
  /** CSS selector for content items to animate (for stagger) */
  contentSelector?: string;
  /** Whether to stagger animate content items */
  stagger?: boolean;
  /** Custom content animation function */
  customContentAnimation?: (timeline: gsap.core.Timeline) => void;
  /** Initial delay before animation starts */
  delay?: number;
  /** Dependencies array to re-run effect */
  dependencies?: unknown[];
}

/**
 * Options for card grid animations
 */
export interface CardAnimationOptions {
  /** Ref to the cards container */
  cardsRef: RefObject<HTMLDivElement | null>;
  /** GSAP timeline to add animation to */
  timeline: gsap.core.Timeline;
}

/**
 * Options for 3D hover animations
 */
export interface Hover3DOptions {
  /** Ref to the group/element to animate */
  groupRef: RefObject<any>;
  /** Ref to the inner group (for pivot calculations) */
  innerRef?: RefObject<any>;
  /** Scale multiplier on hover (default: 1.02) */
  hoverScale?: number;
  /** Lift distance on hover (default: -0.1) */
  hoverLift?: number;
  /** Scale multiplier on press (default: 0.98) */
  pressScale?: number;
  /** Depth on press (default: -0.02) */
  pressDepth?: number;
  /** Animation duration (default: 0.15) */
  duration?: number;
  /** Base Y position reference */
  baseYRef?: RefObject<number | null>;
}

/**
 * Options for image tilt animations
 */
export interface ImageTiltOptions {
  /** Ref to the wrapper element (for mouse tracking) */
  wrapperRef: RefObject<HTMLElement | null>;
  /** Ref to the image element (to animate) */
  imgRef: RefObject<HTMLElement | null>;
  /** Tilt strength in degrees (default: 10) */
  tiltStrength?: number;
  /** Animation duration (default: 0.4) */
  duration?: number;
  /** Reset duration (default: 0.6) */
  resetDuration?: number;
  /** Whether the image exists (for conditional hook execution) */
  hasImage?: boolean;
}

/**
 * Common animation state
 */
export interface AnimationState {
  isAnimating: boolean;
  progress: number;
}

/**
 * GSAP animation from/to values
 */
export interface AnimationValues {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotation?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  filter?: string;
  [key: string]: any;
}

/**
 * Stagger configuration
 */
export interface StaggerConfig {
  /** Amount of time to stagger (total) */
  amount?: number;
  /** Time between each stagger */
  each?: number;
  /** From where to start stagger */
  from?: "start" | "end" | "center" | "edges" | "random" | number;
  /** Grid stagger [rows, cols] */
  grid?: [number, number];
  /** Axis for grid stagger */
  axis?: "x" | "y";
}
