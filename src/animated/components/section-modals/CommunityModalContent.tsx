import { type RefObject } from "react";

import { content } from "@shared/data/content";
import { getMediaUrl } from "@shared/utils/media";
import { InfoCard } from "@shared/components/InfoCard";
import communityIcon from "@animated/assets/CommunitySectionIcon.webp";
import { GenericModalContent } from "./GenericModalContent";
import type { CommunityContributionExperience } from "@shared/types/content";

interface CommunityModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Megaphone icon - Community section */
function CommunityIcon({ className }: { className?: string }) {
  return <img src={communityIcon} alt="" className={className} />;
}

function renderCommunityCard(item: CommunityContributionExperience) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName="max-h-[60%] overflow-hidden rounded-t-3xl"
      imgClassName="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
      image={
        firstImage
          ? {
            src: getMediaUrl(firstImage.src),
            alt: firstImage.alt ?? item.title,
          }
          : undefined
      }
      header={item.role}
      contentSectionClassName="rounded-b-3xl bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4"
    >
      <h3
        className="!mt-0 mb-1 font-bold !text-sm sm:text-base"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.title}
      </h3>
      <p
        className="text-[0.5rem] sm:text-base leading-relaxed"
        style={{ color: "var(--color-panel-text-subtle)" }}
      >
        {item.description}
      </p>
    </InfoCard>
  );
}

export function CommunityModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: CommunityModalContentProps) {
  const contributions = content?.communityContributions ?? [];

  return (
    <GenericModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<CommunityIcon className="size-18 object-contain" />}
      title="Community"
      accentColor={accentColor}
      introText="Here's how I've engaged with various communities and contributed over the years:"
      items={contributions}
      onClose={onClose}
      renderCard={renderCommunityCard}
      getItemKey={(item, index) => `${item.title}-${index}`}
      swipeLabel="Swipe left to see next community contribution"
      enableDetailPanel={true}
    />
  );
}
