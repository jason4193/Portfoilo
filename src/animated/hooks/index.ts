/**
 * Animation System - Main Entry Point
 * Centralized exports for all animation hooks, constants, and utilities
 */

// Animation Groups
export * from "./animation-groups/modal";
export * from "./animation-groups/scene";
export * from "./animation-groups/mobile";
export * from "./animation-groups/interactive";

// Interaction Hooks
export { useObjectRotation } from "./useObjectRotation";

// Legacy exports (for backwards compatibility during migration)
export { useModalEntry as useModalEntryAnimation } from "./animation-groups/modal";
export { useModalContent as useModalContentAnimation } from "./animation-groups/modal";
export { useCameraFocus as useSectionFocusAnimation } from "./animation-groups/scene";
export { useCameraTracker as useCameraPoseTracker } from "./animation-groups/scene";
export { useSceneTransition as useTransitionLoadProgress } from "./animation-groups/scene";
export { useCardStack as useStackCardCycle } from "./animation-groups/mobile";
export { useSwipeHint as useSwipeHintAnimation } from "./animation-groups/mobile";
