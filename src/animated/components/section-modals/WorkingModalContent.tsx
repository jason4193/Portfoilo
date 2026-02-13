import { useRef, type RefObject } from "react";
import { useMediaQuery } from "react-responsive";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import { BaseModalContent } from "./BaseModalContent";
import { useModalContentAnimation } from "../../hooks/useModalContentAnimation";
import { StackCardLayout } from "../modal-layouts/StackCardLayout";
import { GridCardLayout } from "../modal-layouts/GridCardLayout";
import { MOBILE_MAX_WIDTH } from "../../constants/mobile";
import workingIcon from "../../assets/WorkingSectionIcon.webp";

interface WorkingModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Briefcase icon - Working Experience section */
function WorkingIcon({ className }: { className?: string }) {
  return (
    <img
      src={workingIcon}
      alt=""
      className={`size-18 object-contain ${className ?? ""}`}
    />
  );
}

type WorkingItem = NonNullable<typeof content>["workingExperience"][number];

function renderWorkingCard(item: WorkingItem) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName="max-h-[60%]"
      imgClassName="h-full object-cover object-center"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.role}
      contentSectionClassName="rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4"
    >
      <h3 className="!mt-0 mb-1 font-bold text-[#0B2B4C] !text-sm sm:text-base">
        {item.title}
      </h3>
      <p className="text-[0.45rem] sm:text-xs leading-relaxed text-[#0B2B4C]/70 mb-1">
        {item.date}
      </p>
      <p className="text-[0.5rem] sm:text-base leading-relaxed text-[#0B2B4C]/90">
        {item.description}
      </p>
    </InfoCard>
  );
}

export function WorkingModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: WorkingModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const workExperiences = content?.workingExperience ?? [];

  // Standardized modal content animation
  useModalContentAnimation({
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
      icon={<WorkingIcon className="size-18 object-contain" />}
      title="Working Experience"
      accentColor={accentColor}
      backgroundColor="#FCE8E7"
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col gap-1 sm:gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed text-[#0B2B4C]/90 sm:text-lg"
      >
        Here&apos;s my professional experience and work history:
      </p>

      {isMobile ? (
        <div ref={stackRef} className="flex-1 min-h-0">
          <StackCardLayout
            items={workExperiences}
            renderCard={renderWorkingCard}
            getItemKey={(item) => item.title}
            swipeLabel="Swipe left to see next experience"
          />
        </div>
      ) : (
        <div ref={cardsRef} className="flex-1 min-h-0">
          <GridCardLayout
            items={workExperiences}
            renderCard={renderWorkingCard}
            getItemKey={(item) => item.title}
            gridMode="equal"
            enforceAspectRatio={false}
          />
        </div>
      )}
    </BaseModalContent>
  );
}
