import { useCallback, useRef, type RefObject } from "react";
import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- GSAP Flip has Flip.d.ts vs flip.d.ts casing mismatch
// @ts-ignore
import { Flip } from "gsap/Flip";
import { useMediaQuery } from "react-responsive";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import awardIcon from "../../assets/AwardSectionIcon.png";
import { BaseModalContent } from "./BaseModalContent";
import { useModalEntryAnimation } from "../../hooks/useModalEntryAnimation";
import {
  MOBILE_MAX_WIDTH,
  SWIPE_THRESHOLD,
  STACK_LEFT_OFFSET,
  STACK_TOP_OFFSET,
} from "../../constants/mobile";

gsap.registerPlugin(Flip);

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
  imageClassName?: string,
) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName={imageClassName}
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
  const touchStartX = useRef(0);

  const competitions = content?.competitions ?? [];
  const grouped = groupCardsForRows(competitions);
  const layout = grouped.flatMap((row, rowIdx) => {
    const colSpan = row.length === 1 ? 6 : row.length === 2 ? 3 : 2;
    let colStart = 1;
    return row.map((item) => {
      const entry = {
        item,
        rowIdx,
        colSpan,
        colStart,
        landscape: row.length <= 2,
      };
      colStart += colSpan;
      return entry;
    });
  });

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

  const cycleCard = useCallback(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = stack.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length <= 1) return;

    const state = Flip.getState(cards);
    const first = cards[0];
    stack.appendChild(first);

    const updatedCards = stack.querySelectorAll<HTMLElement>("[data-card]");
    updatedCards.forEach((card, index) => {
      card.style.left = `${index * STACK_LEFT_OFFSET}px`;
      card.style.top = `${index * STACK_TOP_OFFSET}px`;
      card.style.zIndex = `${competitions.length - index}`;
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
  }, [competitions.length]);

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
      {/* Desktop grid layout */}
      {isMobile ? (
        <div
          ref={stackRef}
          className="relative min-h-[min(45vh,300px)] w-full flex-1 overflow-visible pl-10 pt-10 [perspective:1000px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
          aria-label="Swipe left to see next award"
        >
          {competitions.map((item, index) => (
            <div
              key={item.title}
              data-card
              className="absolute top-0 h-full"
              style={{
                left: index * STACK_LEFT_OFFSET,
                top: index * STACK_TOP_OFFSET,
                width: `calc(100% - ${competitions.length * 3}%)`,
                zIndex: competitions.length - index,
              }}
            >
              {renderInfoCard(
                item,
                "h-2/3 [&>img]:h-full [&>img]:object-contain",
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={cardsRef}
          className="flex flex-col gap-3 sm:grid sm:grid-cols-6 sm:auto-rows-fr sm:gap-6 sm:min-h-0 sm:flex-1 sm:overflow-y-auto"
        >
          {layout.map(({ item, rowIdx, colSpan, colStart, landscape }) => (
            <div
              key={item.title}
              data-card
              className={
                landscape
                  ? "sm:aspect-[5/2] sm:h-full sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md"
                  : "sm:aspect-square sm:h-full sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md"
              }
              style={{
                minWidth: 0,
                gridColumn: `${colStart} / span ${colSpan}`,
                gridRow: `${rowIdx + 1}`,
              }}
            >
              {renderInfoCard(
                item,
                landscape
                  ? "sm:h-2/3 sm:[&>img]:h-full sm:[&>img]:min-h-0 sm:[&>img]:aspect-auto [&>img]:object-[0%_35%]"
                  : "sm:h-2/3 [&>img]:min-h-0 [&>img]:h-auto",
              )}
            </div>
          ))}
        </div>
      )}
    </BaseModalContent>
  );
}
