import { type RefObject } from "react";
import type { SectionId } from "../constants/sections";
import { SECTION_COLORS } from "../constants/sections";
import { AboutMeModalContent } from "./section-modals/AboutMeModalContent";
import { CommunityModalContent } from "./section-modals/CommunityModalContent";
import { AwardsModalContent } from "./section-modals/AwardsModalContent";

interface SectionModalProps {
  sectionId: SectionId | null;
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

/**
 * Modal router component - decides which section content to render
 */
export function SectionModal({
  sectionId,
  overlayRef,
  panelRef,
  onClose,
}: SectionModalProps) {
  if (!sectionId) return null;

  const accent = SECTION_COLORS[sectionId];

  switch (sectionId) {
    case "aboutMe":
      return (
        <AboutMeModalContent
          overlayRef={overlayRef}
          panelRef={panelRef}
          accentColor={accent}
          onClose={onClose}
        />
      );
    case "community":
      return (
        <CommunityModalContent
          overlayRef={overlayRef}
          panelRef={panelRef}
          accentColor={accent}
          onClose={onClose}
        />
      );
    case "awards":
      return (
        <AwardsModalContent
          overlayRef={overlayRef}
          panelRef={panelRef}
          accentColor={accent}
          onClose={onClose}
        />
      );
    default:
      // TODO: Implement default modal content for other sections
      return null;
  }
}
