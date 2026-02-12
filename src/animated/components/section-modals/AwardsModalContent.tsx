import { useRef, type RefObject } from "react";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import awardIcon from "../../assets/AwardSectionIcon.png";
import { BaseModalContent } from "./BaseModalContent";
import { useModalEntryAnimation } from "../../hooks/useModalEntryAnimation";

interface AwardsModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Trophy icon - Awards section */
function AwardIcon({ className }: { className?: string }) {
  return <img src={awardIcon} alt="" className={className} />;
}

function renderInfoCard(
  item: NonNullable<typeof content>["competitions"][number],
) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.role || item.date}
      contentSectionClassName="rounded-b-3xl bg-white/90 px-3 py-3 sm:px-4 sm:py-4"
    >
      <h3 className="!mt-0 mb-1 font-bold text-[#0B2B4C] text-xs sm:text-base">
        {item.title}
      </h3>
      <p className="text-xs leading-relaxed text-[#0B2B4C]/90 mb-2">
        {item.description}
      </p>
      {item.achievements && item.achievements.length > 0 && (
        <ul className="text-xs leading-relaxed text-[#0B2B4C]/80 space-y-1 pl-4">
          {item.achievements.map((achievement, idx) => (
            <li key={idx}>{achievement}</li>
          ))}
        </ul>
      )}
    </InfoCard>
  );
}

export function AwardsModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: AwardsModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const competitions = content?.competitions ?? [];

  // Animate modal entry
  useModalEntryAnimation({
    headerRef,
    closeRef,
    delay: 0.5,
    customContentAnimation: (tl) => {
      const intro = introRef.current;
      const cards = cardsRef.current;

      if (intro) {
        tl.fromTo(
          intro,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.2",
        );
      }

      if (cards) {
        const cardEls = cards.querySelectorAll<HTMLElement>("[data-card]");
        if (cardEls.length > 0) {
          tl.fromTo(
            cardEls,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.1",
          );
        }
      }
    },
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<AwardIcon className="size-18 object-contain" />}
      title="Awards & Recognition"
      accentColor={accentColor}
      backgroundColor="#E8F4F8"
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col gap-1 sm:gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed text-[#0B2B4C]/90 sm:text-lg"
      >
        Here are some competitions and awards I&apos;ve received:
      </p>

      <div
        ref={cardsRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
      >
        {competitions.map((item) => (
          <div
            key={item.title}
            data-card
            className="w-full shrink-0 sm:min-w-0 sm:flex-1 sm:basis-[min(100%,20rem)]"
          >
            {renderInfoCard(item)}
          </div>
        ))}
      </div>
    </BaseModalContent>
  );
}
