import { useRef, useCallback, type RefObject } from "react";
import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- GSAP Flip has Flip.d.ts vs flip.d.ts casing mismatch
// @ts-ignore
import { Flip } from "gsap/Flip";
import { useMediaQuery } from "react-responsive";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import communityIcon from "../../assets/CommunitySectionIcon.png";
import { BaseModalContent } from "./BaseModalContent";
import { useModalEntryAnimation } from "../../hooks/useModalEntryAnimation";
import {
  MOBILE_MAX_WIDTH,
  SWIPE_THRESHOLD,
  STACK_TOP_OFFSET,
  STACK_LEFT_OFFSET,
} from "../../constants/mobile";

gsap.registerPlugin(Flip);

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

function renderInfoCard(
  item: NonNullable<typeof content>["communityContributions"][number],
) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName="[&>img]:!max-h-[min(12vh,8rem)]"
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
      <h3 className="!mt-0 mb-1 font-bold text-[#0B2B4C] text-xs sm:text-base">
        {item.title}
      </h3>
      <p className="text-xs leading-relaxed text-[#0B2B4C]/90">
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
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const contributions = content?.communityContributions ?? [];

  const cycleCard = useCallback(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length <= 1) return;

    const state = Flip.getState(cards);
    const first = cards[0];
    stack.appendChild(first);

    // Update styles to reflect new positions
    const updatedCards = stack.querySelectorAll<HTMLElement>("[data-card]");
    updatedCards.forEach((card, index) => {
      card.style.left = `${index * STACK_LEFT_OFFSET}px`;
      card.style.top = `${index * STACK_TOP_OFFSET}px`;
      card.style.zIndex = `${contributions.length - index}`;
    });

    Flip.from(state, {
      targets: cards,
      ease: "sine.inOut",
      absolute: true,
      duration: 0.4,
      onLeave: (elements) =>
        gsap.to(elements, {
          duration: 0.3,
          yPercent: 5,
          xPercent: -5,
          transformOrigin: "bottom left",
          opacity: 0,
          ease: "power2.in",
        }),
      onEnter: (elements) =>
        gsap.from(elements, {
          duration: 0.3,
          yPercent: 20,
          opacity: 0,
          ease: "power2.out",
        }),
    });
  }, [contributions.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      if (deltaX > SWIPE_THRESHOLD) {
        cycleCard();
      }
    },
    [cycleCard],
  );

  // Animate modal entry
  useModalEntryAnimation({
    headerRef,
    closeRef,
    delay: 0.5,
    dependencies: [isMobile],
    customContentAnimation: (tl) => {
      const intro = introRef.current;
      const cards = cardsRef.current;
      const stack = stackRef.current;

      if (intro) {
        tl.fromTo(
          intro,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.2",
        );
      }

      if (isMobile && stack) {
        tl.fromTo(
          stack,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1",
        );
      } else if (cards) {
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
      icon={<CommunityIcon className="size-18 object-contain" />}
      title="Community"
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
        Here&apos;s how I&apos;ve engaged with various communities and
        contributed over the years:
      </p>

      {isMobile ? (
        <div
          ref={stackRef}
          className="relative min-h-[min(45vh,300px)] w-full flex-1 overflow-visible pl-10 pt-10 [perspective:1000px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
          aria-label="Swipe left to see next community contribution"
        >
          {contributions.map((item, index) => (
            <div
              key={item.title}
              data-card
              className="absolute top-0 h-full"
              style={{
                left: index * STACK_LEFT_OFFSET,
                top: index * STACK_TOP_OFFSET,
                width: `calc(100% - ${contributions.length * 3}%)`,
                zIndex: contributions.length - index,
              }}
            >
              {renderInfoCard(item)}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={cardsRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-hidden sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
        >
          {contributions.map((item) => (
            <div
              key={item.title}
              data-card
              className="w-full shrink-0 sm:min-w-0 sm:flex-1 sm:basis-[min(100%,20rem)]"
            >
              {renderInfoCard(item)}
            </div>
          ))}
        </div>
      )}
    </BaseModalContent>
  );
}
