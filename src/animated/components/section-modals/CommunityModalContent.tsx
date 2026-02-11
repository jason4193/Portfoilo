import { useRef, useEffect } from "react";
import gsap from "gsap";
import { content } from "../../../shared/data/content";
import { getMediaUrl } from "../../../shared/utils/media";
import { InfoCard } from "../../../shared/components/InfoCard";
import communityIcon from "../../assets/CommunitySectionIcon.png";

interface CommunityModalContentProps {
  accentColor: string;
  onClose: () => void;
}

/** Megaphone icon - Community section */
function CommunityIcon({ className }: { className?: string }) {
  return <img src={communityIcon} alt="" className={className} />;
}

export function CommunityModalContent({
  accentColor,
  onClose,
}: CommunityModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const contributions = content?.communityContributions ?? [];

  useEffect(() => {
    const header = headerRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current;
    const close = closeRef.current;
    if (!header || !intro || !cards || !close) return;

    const cardEls = cards.querySelectorAll<HTMLElement>("[data-card]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.5,
      });

      tl.fromTo(
        header,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4 },
      )
        .fromTo(
          intro,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.2",
        )
        .fromTo(
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
        )
        .fromTo(
          close,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35 },
          "-=0.15",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-2xl bg-[#FCE8E7] text-[#0B2B4C]">
      {/* Header: salmon bar with megaphone + title */}
      <div
        ref={headerRef}
        className="flex shrink-0 items-center rounded-t-2xl px-4 py-3 sm:px-6 sm:py-4"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/40 text-[#0B2B4C] sm:size-14">
            <CommunityIcon className="size-18 object-contain" />
          </div>
          <p className="!m-0 text-xl font-bold italic text-[#0B2B4C] sm:text-2xl md:text-3xl">
            Community
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8">
        <p
          ref={introRef}
          className="text-base leading-relaxed text-[#0B2B4C]/90 sm:text-lg"
        >
          Here&apos;s how I&apos;ve engaged with various communities and
          contributed over the years:
        </p>

        <div
          ref={cardsRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-hidden sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
        >
          {contributions.map((item) => {
            const firstImage = item.media?.find((m) => m.type === "image");
            return (
              <div
                key={item.title}
                data-card
                className="w-full shrink-0 sm:min-w-0 sm:flex-1 sm:basis-[min(100%,20rem)]"
              >
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
                  <h3 className="mb-1 font-bold text-[#0B2B4C] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#0B2B4C]/90">
                    {item.description}
                  </p>
                </InfoCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Close button */}
      <div
        ref={closeRef}
        className="flex shrink-0 justify-center px-4 pb-4 sm:px-6 sm:pb-6"
      >
        <button className="btn-panel-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
