import type { RefObject } from "react";
import type { SectionId } from "../constants/sections";
import { SECTION_COLORS, SECTION_TITLES } from "../constants/sections";
import { AboutMeModalContent } from "./section-modals/AboutMeModalContent";

interface SectionModalProps {
  sectionId: SectionId | null;
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export function SectionModal({
  sectionId,
  overlayRef,
  panelRef,
  onClose,
}: SectionModalProps) {
  if (!sectionId) return null;

  const title = SECTION_TITLES[sectionId];
  const accent = SECTION_COLORS[sectionId];
  const isAboutMe = sectionId === "aboutMe";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      style={{ opacity: 0, pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-[95%] h-[95%] overflow-hidden rounded-2xl border border-white/20 shadow-xl flex flex-col"
        style={isAboutMe ? undefined : { backgroundColor: accent }}
        onClick={(event) => event.stopPropagation()}
      >
        {isAboutMe ? (
          <AboutMeModalContent accentColor={accent} onClose={onClose} />
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-6 min-h-[30%]">
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <button
                className="text-white/90 hover:text-white text-sm"
                onClick={onClose}
                aria-label="Close section"
              >
                Close
              </button>
            </div>
            <div className="text-slate-900 px-6 py-5 flex-1 overflow-y-auto" />
          </>
        )}
      </div>
    </div>
  );
}
