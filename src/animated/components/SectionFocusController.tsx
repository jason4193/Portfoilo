import { useThree } from "@react-three/fiber";
import { useSectionFocusAnimation } from "../hooks/useSectionFocusAnimation";

interface SectionFocusControllerProps {
  isActive: boolean; // Whether focus mode is active
  focusTarget: [number, number, number] | null; // World position to focus
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

export function SectionFocusController({
  focusTarget,
  isActive,
  controlsRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: SectionFocusControllerProps) {
  const { camera } = useThree();
  useSectionFocusAnimation({
    camera,
    focusTarget,
    isActive,
    controlsRef,
    dimOverlayRef,
    modalOverlayRef,
    modalPanelRef,
  });

  return null;
}
