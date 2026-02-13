import { useRef, type RefObject } from "react";
import { useMediaQuery } from "react-responsive";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import awardIcon from "../../assets/AwardSectionIcon.webp";
import { BaseModalContent } from "./BaseModalContent";
import { useModalContentAnimation } from "../../hooks/useModalContentAnimation";
import { StackCardLayout } from "../modal-layouts/StackCardLayout";
import {
  GridCardLayout,
  type GridPlacement,
} from "../modal-layouts/GridCardLayout";
import { MOBILE_MAX_WIDTH } from "../../constants/mobile";

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

type CompetitionItem = NonNullable<typeof content>["competitions"][number];

function renderMobileCard(item: CompetitionItem) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName="h-2/3"
      imgClassName="h-full object-contain object-center"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.award || item.role || item.date}
      contentSectionClassName="rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4"
    >
      <p className="!mt-0 mb-1 font-bold text-[#0B2B4C] text-lg">
        {item.title}
      </p>
    </InfoCard>
  );
}

function renderDesktopCard(item: CompetitionItem, placement: GridPlacement) {
  const firstImage = item.media?.find((m) => m.type === "image");

  // Landscape cards: 55% image, 45% content | Square cards: 50% image, 50% content
  const imageClassName = placement.landscape ? "sm:h-[65%]" : "sm:h-[60%]";

  return (
    <InfoCard
      className="size-full"
      imageClassName={imageClassName}
      imgClassName="h-full object-cover object-[0%_35%]"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.award || item.role || item.date}
      contentSectionClassName="rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4"
    >
      <p className="!mt-0 mb-1 font-bold text-[#0B2B4C] text-lg">
        {item.title}
      </p>
    </InfoCard>
  );
}

function groupCardsForRows(cards: any[]) {
  const n = cards.length;
  if (n === 5)
    return [
      [cards[1], cards[2]],
      [cards[0], cards[3], cards[4]],
    ]; // First row [1,2], second row [0,3,4]
  if (n === 6) return [cards.slice(0, 3), cards.slice(3, 6)];
  if (n === 7) return [[cards[0]], cards.slice(1, 4), cards.slice(4, 7)];
  if (n === 8) return [cards.slice(0, 2), cards.slice(2, 5), cards.slice(5, 8)];
  if (n === 9) return [cards.slice(0, 3), cards.slice(3, 6), cards.slice(6, 9)];
  // Fallback: group by 3s
  const rows = [];
  for (let i = 0; i < n; i += 3) rows.push(cards.slice(i, i + 3));
  return rows;
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
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const competitions = content?.competitions ?? [];
  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

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
      icon={<AwardIcon className="size-18 object-contain" />}
      title="Awards & Competitions"
      textColor="#E8F4F8"
      accentColor={accentColor}
      backgroundColor="#E8F4F8"
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="min-h-0 flex-1 px-4 py-5 sm:px-8 sm:py-8 flex flex-col overflow-hidden"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed text-[#0B2B4C]/90 sm:text-lg mb-4"
      >
        Here are some competitions and awards I&apos;ve done:
      </p>

      {isMobile ? (
        <div ref={stackRef} className="flex-1 min-h-0">
          <StackCardLayout
            items={competitions}
            renderCard={renderMobileCard}
            getItemKey={(item) => item.title}
            swipeLabel="Swipe left to see next award"
          />
        </div>
      ) : (
        <div ref={cardsRef} className="flex-1 min-h-0">
          <GridCardLayout
            items={competitions}
            groupFn={groupCardsForRows}
            renderCard={renderDesktopCard}
            getItemKey={(item) => item.title}
            gridMode="equal"
            enforceAspectRatio={false}
          />
        </div>
      )}
    </BaseModalContent>
  );
}
