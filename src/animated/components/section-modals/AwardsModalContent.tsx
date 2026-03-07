import { type RefObject } from "react";

import { content } from "@shared/data/content";
import { getMediaUrl } from "@shared/utils/media";
import { InfoCard } from "@shared/components/InfoCard";
import awardIcon from "@animated/assets/AwardSectionIcon.webp";
import { GenericModalContent } from "./GenericModalContent";
import type { GridPlacement } from "@animated/components/modal-layouts/GridCardLayout";
import type { CompetitionExperience } from "@shared/types/content";

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

function renderAwardCard(
  item: CompetitionExperience,
  placement?: GridPlacement,
) {
  const firstImage = item.media?.find((m) => m.type === "image");

  // Only on desktop with placement info
  if (placement) {
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
        contentSectionClassName="rounded-b-3xl bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4"
      >
        <p
          className="!mt-0 mb-1 font-bold text-lg"
          style={{ color: "var(--color-panel-text)" }}
        >
          {item.title}
        </p>
      </InfoCard>
    );
  }

  // Mobile rendering
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
      contentSectionClassName="rounded-b-3xl bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4"
    >
      <p
        className="!mt-0 mb-1 font-bold text-lg"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.title}
      </p>
    </InfoCard>
  );
}

function groupCardsForRows(cards: CompetitionExperience[]) {
  const n = cards.length;
  if (n === 5)
    return [
      [cards[1], cards[2]],
      [cards[0], cards[3], cards[4]],
    ];
  if (n === 6) return [cards.slice(0, 3), cards.slice(3, 6)];
  if (n === 7) return [[cards[0]], cards.slice(1, 4), cards.slice(4, 7)];
  if (n === 8) return [cards.slice(0, 2), cards.slice(2, 5), cards.slice(5, 8)];
  if (n === 9) return [cards.slice(0, 3), cards.slice(3, 6), cards.slice(6, 9)];
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
  const competitions = content?.competitions ?? [];

  return (
    <GenericModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<AwardIcon className="size-18 object-contain" />}
      title="Awards & Competitions"
      accentColor={accentColor}
      headerTextColor="var(--color-panel-bg)"
      introText="Here are some competitions and awards I've done:"
      items={competitions}
      onClose={onClose}
      renderCard={renderAwardCard}
      getItemKey={(item, index) => `${item.title}-${index}`}
      swipeLabel="Swipe left to see next award"
      groupFn={groupCardsForRows}
      enableDetailPanel={true}
    />
  );
}
