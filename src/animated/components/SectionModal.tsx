import type { RefObject } from "react";
import type { SectionId } from "../constants/sections";
import { SECTION_COLORS, SECTION_TITLES } from "../constants/sections";
import { AboutMeModalContent } from "./section-modals/AboutMeModalContent";
import { CommunityModalContent } from "./section-modals/CommunityModalContent";

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
  const isCommunity = sectionId === "community";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      style={{ opacity: 0, pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative size-full overflow-visible rounded-2xl border border-white/20 shadow-xl flex flex-col"
        style={
          isAboutMe || isCommunity ? undefined : { backgroundColor: accent }
        }
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute -top-2 -right-2 z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#0B2B4C]/80 shadow-md transition-colors hover:bg-white hover:text-[#0B2B4C] sm:-top-3 sm:-right-3 sm:size-11"
          onClick={onClose}
          aria-label="Close section"
        >
          <span className="text-sm font-medium sm:text-base">X</span>
        </button>
        {isAboutMe ? (
          <AboutMeModalContent accentColor={accent} onClose={onClose} />
        ) : isCommunity ? (
          <CommunityModalContent accentColor={accent} onClose={onClose} />
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
