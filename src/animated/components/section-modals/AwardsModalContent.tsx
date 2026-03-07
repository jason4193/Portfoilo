import { useState, useMemo, type RefObject } from "react";

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
    return (
      <InfoCard
        className="size-full shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg rounded-2xl"
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
        contentSectionClassName="bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4 h-full"
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

  return (
    <InfoCard
      className="size-full shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg rounded-2xl"
      imageClassName="h-2/3 sm:h-[60%]"
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
      contentSectionClassName="bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4 h-full"
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

const AWARD_CATEGORIES = ["All", "Hackathon", "CTF"];

export function AwardsModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: AwardsModalContentProps) {
  const competitions = content?.competitions ?? [];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCompetitions = useMemo(() => {
    if (activeCategory === "All") return competitions;
    return competitions.filter((c) => {
      const cats = c.categories && c.categories.length > 0
        ? c.categories
        : (c.category ? [c.category] : ["CTF"]);
      return cats.includes(activeCategory);
    });
  }, [competitions, activeCategory]);

  const filterComponent = (
    <div className="flex gap-2 w-full overflow-x-auto no-scrollbar items-center pb-1">
      {AWARD_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors border ${activeCategory === cat
            ? "border-black/40 bg-black/20 text-black shadow-sm dark:border-white/40 dark:bg-white/20 dark:text-white"
            : "border-black/10 bg-white/20 text-black/70 hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-black/20 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  return (
    <GenericModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<AwardIcon className="size-18 object-contain" />}
      title="Awards & Competitions"
      accentColor={accentColor}
      headerTextColor="var(--color-panel-bg)"
      introText="Here are some competitions and awards I've done:"
      items={filteredCompetitions}
      onClose={onClose}
      renderCard={renderAwardCard}
      getItemKey={(item, index) => `${item.title}-${index}`}
      swipeLabel="Swipe left to see next award"
      enableDetailPanel={true}
      galleryHeaderLeftContent={filterComponent}
    />
  );
}

