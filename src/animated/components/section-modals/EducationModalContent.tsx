import { useRef, type RefObject } from "react";
import { useMediaQuery } from "react-responsive";

import { content } from "@shared/data/content";
import { getMediaUrl } from "@shared/utils/media";
import { InfoCard } from "@shared/components/InfoCard";
import { BaseModalContent } from "./BaseModalContent";
import { useModalContent } from "@animated/hooks";
import { StackCardLayout } from "@animated/components/modal-layouts/StackCardLayout";
import { GridCardLayout } from "@animated/components/modal-layouts/GridCardLayout";
import { MOBILE_MAX_WIDTH } from "@animated/constants/mobile";
import educationIcon from "@animated/assets/EducationSectionIcon.webp";

interface EducationModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Graduation cap icon - Education section */
function EducationIcon({ className }: { className?: string }) {
  return (
    <img
      src={educationIcon}
      alt=""
      className={`size-18 object-contain ${className ?? ""}`}
    />
  );
}

type AcademicItem = NonNullable<typeof content>["academic"][number];

function renderEducationCard(item: AcademicItem) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg rounded-2xl"
      imageClassName="max-h-[60%]"
      imgClassName="h-full object-cover object-center"
      image={
        firstImage
          ? {
            src: getMediaUrl(firstImage.src),
            alt: firstImage.alt ?? item.institution,
          }
          : undefined
      }
      header={item.institution}
      contentSectionClassName="bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4 h-full"
    >
      <h3
        className="!mt-0 mb-1 font-bold !text-sm sm:text-base"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.program}
      </h3>
      <p
        className="text-xs sm:text-base leading-relaxed"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.summary}
      </p>
    </InfoCard>
  );
}

export function EducationModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: EducationModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const academics = content?.academic ?? [];

  // Standardized modal content animation
  useModalContent({
    headerRef,
    closeRef,
    introRef,
    cardsRef,
    stackRef,
    isMobile,
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<EducationIcon className="size-18 object-contain" />}
      title="Education"
      accentColor={accentColor}
      headerTextColor={"var(--color-panel-bg)"}
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col gap-1 sm:gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed sm:text-lg shrink-0"
        style={{ color: "var(--color-panel-text-subtle)" }}
      >
        Here&apos;s my educational background and academic journey:
      </p>

      {isMobile ? (
        <div ref={stackRef} className="flex-1 min-h-0">
          <StackCardLayout
            items={academics}
            renderCard={renderEducationCard}
            getItemKey={(item, index) => `${item.institution}-${index}`}
            swipeLabel="Swipe left to see next institution"
          />
        </div>
      ) : (
        <div ref={cardsRef} className="flex-1 min-h-0 w-full flex flex-col justify-center">
          <GridCardLayout
            items={academics}
            renderCard={renderEducationCard}
            getItemKey={(item, index) => `${item.institution}-${index}`}
          />
        </div>
      )}
    </BaseModalContent>
  );
}

