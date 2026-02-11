import { useThree } from "@react-three/fiber";
import { useSectionFocusAnimation } from "../hooks/useSectionFocusAnimation";
import { useSectionSelectionStore } from "../../shared/stores";

interface SectionFocusControllerProps {
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

export function SectionFocusController({
  controlsRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: SectionFocusControllerProps) {
  const { camera } = useThree();
  const focusTarget = useSectionSelectionStore((state) => state.focusTarget);
  const isActive = useSectionSelectionStore((state) => state.isFocused);
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
