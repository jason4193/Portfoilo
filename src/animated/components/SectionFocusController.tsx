import { useThree } from "@react-three/fiber";
import type { Group } from "three";

import { useCameraFocus } from "@animated/hooks";
import { useSectionSelectionStore } from "@shared/stores";

interface SectionFocusControllerProps {
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  cardRef: React.RefObject<Group | null>; // Card group ref for rotation
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

export function SectionFocusController({
  controlsRef,
  cardRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: SectionFocusControllerProps) {
  const { camera } = useThree();
  const focusTarget = useSectionSelectionStore((state) => state.focusTarget);
  const isActive = useSectionSelectionStore((state) => state.isFocused);
  useCameraFocus({
    camera,
    cardObject: cardRef.current,
    focusTarget,
    isActive,
    controlsRef,
    dimOverlayRef,
    modalOverlayRef,
    modalPanelRef,
  });

  return null;
}
