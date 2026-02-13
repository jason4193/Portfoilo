/**
 * Centralized Animation Constants
 * All durations are in seconds, all easings are GSAP-compatible strings
 */

// ==================== DURATIONS ====================

/** Micro-interaction durations (UI feedback) */
export const DURATION = {
  /** Quick feedback (button press, hover start) */
  MICRO: 0.15,
  /** Standard micro-interaction */
  MICRO_MEDIUM: 0.25,
  /** Longer micro-interaction */
  MICRO_LONG: 0.4,
  
  /** Standard content animation */
  STANDARD: 0.5,
  /** Medium content animation */
  STANDARD_MEDIUM: 0.6,
  /** Longer content animation */
  STANDARD_LONG: 0.8,
  
  /** Scene transition start */
  SCENE: 0.9,
  /** Scene transition medium */
  SCENE_MEDIUM: 1.2,
  /** Scene transition long */
  SCENE_LONG: 2.0,
} as const;

// ==================== EASINGS ====================

/** Common GSAP easing functions */
export const EASING = {
  /** Default smooth easing for most UI */
  DEFAULT: "power2.out",
  /** Stronger deceleration */
  STRONG: "power3.out",
  /** Very strong deceleration */
  STRONGEST: "power4.out",
  /** Smooth bidirectional */
  SMOOTH: "sine.inOut",
  /** Elastic bounce effect */
  ELASTIC: "elastic.out(1, 0.6)",
  /** Bounce landing */
  BOUNCE: "bounce.out",
  /** Spring-like effect */
  BACK: "back.out(1.5)",
  /** Linear (no easing) */
  LINEAR: "none",
} as const;

// ==================== STAGGER ====================

/** Stagger timing for multiple elements */
export const STAGGER = {
  /** Tight stagger (fast reveal) */
  TIGHT: 0.08,
  /** Standard stagger */
  STANDARD: 0.12,
  /** Loose stagger (slower reveal) */
  LOOSE: 0.15,
  /** Very loose stagger */
  VERY_LOOSE: 0.2,
} as const;

// ==================== MODAL ANIMATIONS ====================

export const MODAL = {
  /** Delay before modal animation starts */
  ENTRY_DELAY: 0.5,
  /** Header animation duration */
  HEADER_DURATION: 0.4,
  /** Content animation duration */
  CONTENT_DURATION: 0.5,
  /** Card grid animation duration */
  CARD_DURATION: 0.8,
  /** Overlay fade duration */
  OVERLAY_DURATION: 0.35,
  /** Card stagger amount (total time for all cards) */
  CARD_STAGGER_AMOUNT: 0.4,
} as const;

// ==================== 3D INTERACTIONS ====================

export const INTERACTION_3D = {
  /** Hover scale multiplier */
  HOVER_SCALE: 1.02,
  /** Hover lift distance in Y-axis (negative = up/toward camera) */
  HOVER_LIFT: -0.1,
  /** Press scale multiplier */
  PRESS_SCALE: 0.98,
  /** Press depth in Y-axis (negative = up/toward camera) */
  PRESS_DEPTH: -0.02,
  /** Image tilt strength (degrees) */
  TILT_STRENGTH: 10,
  /** Hover/press animation duration */
  DURATION: 0.15,
  /** Tilt animation duration */
  TILT_DURATION: 0.4,
  /** Tilt reset duration */
  TILT_RESET: 0.6,
} as const;

// ==================== MOBILE SWIPE ====================

export const SWIPE = {
  /** Swipe hint delay (seconds after mount) */
  HINT_DELAY: 2,
  /** Swipe hint animation duration */
  HINT_DURATION: 0.5,
  /** Swipe hint return duration */
  HINT_RETURN: 0.6,
  /** Card cycle animation duration */
  CYCLE_DURATION: 0.4,
  /** Swipe threshold (pixels) */
  THRESHOLD: 50,
} as const;

// ==================== TEXT ANIMATIONS ====================

export const TEXT = {
  /** Fade in duration */
  FADE_IN: 0.5,
  /** Fade out duration */
  FADE_OUT: 0.4,
  /** Slide distance (pixels) */
  SLIDE_DISTANCE: 24,
  /** Small slide distance */
  SLIDE_SMALL: 8,
  /** Large slide distance */
  SLIDE_LARGE: 40,
} as const;

// ==================== COMMON ANIMATION VALUES ====================

/** Common Y-axis movement distances */
export const TRANSLATE_Y = {
  SMALL: 8,
  MEDIUM: 16,
  STANDARD: 24,
  LARGE: 40,
  XLARGE: 60,
} as const;

/** Common X-axis movement distances */
export const TRANSLATE_X = {
  SMALL: -10,
  MEDIUM: -30,
  STANDARD: -30,
  LARGE: -50,
} as const;

/** Common scale values */
export const SCALE = {
  HIDDEN: 0,
  SMALL: 0.5,
  MEDIUM: 0.7,
  SLIGHT: 0.85,
  NORMAL: 1,
  HOVER: 1.02,
  LARGE: 1.1,
} as const;

/** Common blur values (pixels) */
export const BLUR = {
  NONE: 0,
  SLIGHT: 5,
  MEDIUM: 10,
  STRONG: 20,
} as const;

// ==================== TYPE EXPORTS ====================

export type DurationKey = keyof typeof DURATION;
export type EasingKey = keyof typeof EASING;
export type StaggerKey = keyof typeof STAGGER;
