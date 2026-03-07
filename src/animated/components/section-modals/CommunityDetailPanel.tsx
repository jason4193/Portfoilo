import { getMediaUrl } from "@shared/utils/media";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import type { CommunityContributionExperience } from "@shared/types/content";

gsap.registerPlugin(ScrollToPlugin);

type CommunityItem = CommunityContributionExperience;

interface CommunityDetailPanelProps {
  item: CommunityItem;
  onBack: () => void;
}

export function CommunityDetailPanel({
  item,
  onBack,
}: CommunityDetailPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLParagraphElement>(null);

  const images = item.media?.filter((m) => m.type === "image") ?? [];
  const hero = images[0];

  // Animate hero expansion on mount
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in hero image
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0,
      );

      // Fade in and apply floating animation to scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.3,
        );

        // Floating/pulsing animation for scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Handle scroll to trigger animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Fade out scroll indicator when scrolling
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: container.scrollTop > 50 ? 0 : 1,
          duration: 0.3,
          pointerEvents: container.scrollTop > 50 ? "none" : "auto",
        });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll animation when clicking the detail card
  const handleScrollToDetails = () => {
    if (!containerRef.current || !detailsRef.current) return;

    gsap.to(containerRef.current, {
      scrollTo: { y: detailsRef.current.offsetTop - 60 },
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  // Smooth scroll back to top
  const handleBackToHero = () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      scrollTo: { y: 0 },
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-y-auto overflow-x-hidden rounded-3xl scroll-smooth no-scrollbar"
    >
      {/* Sticky Back Button */}
      <div className="sticky top-6 z-30 h-0 w-full px-4 sm:px-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            console.log("Back button clicked");
            onBack();
          }}
          className="pointer-events-auto flex items-center gap-2 min-h-10 px-4 py-2 rounded-full shadow-md transition-colors backdrop-blur-sm"
          style={{
            backgroundColor: "var(--color-panel-btn)",
            color: "var(--color-animated-bg-light)",
          }}
          aria-label="Back to contributions"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* Hero Image Section */}
      <div
        ref={heroRef}
        className="relative flex-shrink-0 w-full h-screen max-h-[600px] sm:max-h-[700px] flex flex-col overflow-hidden"
      >
        {/* Hero Background */}
        <div
          className="absolute inset-0 bg-black/20"
          style={{
            backgroundImage: `url(${getMediaUrl(hero?.src)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Back button moved outside hero to prevent clipping */}

        {/* Content Container with Scroll */}
        <div className="relative z-10 flex flex-col flex-1 justify-end">
          {/* Translucent Detail Card Preview */}
          <div
            ref={detailCardRef}
            className="w-full px-4 sm:px-6 pb-6 cursor-pointer group"
            onClick={handleScrollToDetails}
          >
            <div className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-lg p-4 sm:p-6 shadow-lg hover:bg-white/15 transition-colors">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/80">
                  {item.date}
                </p>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 sm:text-base mt-1">
                  {item.role}
                </p>
              </div>

              {item.description && (
                <p className="text-sm leading-relaxed text-white/85 sm:text-base mt-3 line-clamp-2">
                  {item.description}
                </p>
              )}

              <p
                ref={scrollIndicatorRef}
                className="text-xs text-white/60 mt-3 group-hover:text-white/80 transition-colors"
              >
                Click or scroll to see more details ↓
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div
        ref={detailsRef}
        className="flex-shrink-0 w-full bg-detail-bg backdrop-blur-sm"
      >
        <div className="rounded-t-3xl border-t border-detail-border p-4 sm:p-6">
          {/* Scroll-up indicator / Back button */}
          <button
            type="button"
            onClick={handleBackToHero}
            className="flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-detail-text hover:text-detail-text/70 transition-colors"
            aria-label="Back to hero preview"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16.236V5m0 0l7 7m-7-7l-7 7"
              />
            </svg>
            Back to preview
          </button>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              {" "}
              {hero && (
                <div className="overflow-hidden rounded-2xl bg-white">
                  <img
                    src={getMediaUrl(hero.src)}
                    alt={hero.alt ?? item.title}
                    className="h-56 w-full object-cover sm:h-72"
                  />
                </div>
              )}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.slice(1, 4).map((img) => (
                    <img
                      key={img.src}
                      src={getMediaUrl(img.src)}
                      alt={img.alt ?? item.title}
                      className="h-16 w-full rounded-xl object-cover sm:h-20"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-detail-text/60">
                  {item.date}
                </p>
                <h3 className="text-lg font-bold text-detail-text sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm text-detail-text/80 sm:text-base">
                  {item.role}
                </p>
              </div>

              {item.description && (
                <p className="text-sm leading-relaxed text-detail-text/90 sm:text-base">
                  {item.description}
                </p>
              )}

              {item.achievements?.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-sm text-detail-text/90 sm:text-base">
                  {item.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}

              {item.links && item.links?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-detail-pill-bg px-3 py-1 text-xs font-semibold text-detail-text hover:bg-detail-pill-bg-hover sm:text-sm"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
