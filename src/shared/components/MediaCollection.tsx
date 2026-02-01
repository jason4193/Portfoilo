import { useState, useRef, useEffect } from "react";
import type { Media } from "../types/content";
import { getMediaUrl } from "../utils/media";
import { getDominantColor } from "../utils/colorExtraction";
import YouTube from "react-youtube";
import { extractYouTubeVideoId } from "../utils/youtube";

interface MediaCollectionProps {
  media?: Media[];
}

export function MediaCollection({ media }: MediaCollectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dominantColors, setDominantColors] = useState<Map<string, string>>(
    new Map()
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !media || media.length === 0) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const hasMedia = media && media.length > 0;

  // Scroll to show current media on mobile
  useEffect(() => {
    if (scrollContainerRef.current && media && media.length > 0) {
      const container = scrollContainerRef.current;
      const mediaWidth = container.clientWidth;
      container.scrollTo({
        left: currentIndex * mediaWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, media]);

  // Track scroll position for desktop to update current index and handle infinite scroll
  // Only enable infinite scroll for 3+ items
  useEffect(() => {
    const desktopContainer = desktopScrollRef.current;
    if (
      !desktopContainer ||
      !hasMedia ||
      !media ||
      media.length === 0 ||
      media.length < 3
    )
      return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (isScrollingRef.current) {
        // Still update index even during programmatic scroll
        const scrollLeft = desktopContainer.scrollLeft;
        const firstItem = desktopContainer.firstElementChild as HTMLElement;
        if (!firstItem) return;
        const itemWidth = firstItem.offsetWidth;
        const gap = 16;
        const itemWidthWithGap = itemWidth + gap;
        const singleSetWidth = media.length * itemWidthWithGap;
        const normalizedScroll = scrollLeft % singleSetWidth;
        const newIndex = Math.round(normalizedScroll / itemWidthWithGap);
        const clampedIndex = Math.min(Math.max(0, newIndex), media.length - 1);
        setCurrentIndex(clampedIndex);
        return;
      }

      // Cancel any pending animation frame
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollLeft = desktopContainer.scrollLeft;

        // Get the first child to calculate actual item width
        const firstItem = desktopContainer.firstElementChild as HTMLElement;
        if (!firstItem) return;

        const itemWidth = firstItem.offsetWidth;
        const gap = 16; // gap-4 = 1rem = 16px
        const itemWidthWithGap = itemWidth + gap;
        const singleSetWidth = media.length * itemWidthWithGap;
        const containerWidth = desktopContainer.clientWidth;
        const maxScroll = desktopContainer.scrollWidth - containerWidth;

        // Calculate which set we're currently in (0, 1, or 2)
        const currentSet = Math.floor(scrollLeft / singleSetWidth);
        const positionInSet = scrollLeft % singleSetWidth;
        const distanceFromEnd = maxScroll - scrollLeft;

        // Jump logic: when we're near the edges, jump to the middle set
        // Jump when we're less than one item width from the start of first set
        if (currentSet === 0 && positionInSet < itemWidthWithGap) {
          isScrollingRef.current = true;
          // Jump to same position in second set
          desktopContainer.scrollLeft = singleSetWidth + positionInSet;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
        // Jump when we're near the end - check both set 2 position AND actual scroll position
        // Use a larger threshold (3 item widths) to trigger earlier for smoother experience
        else if (
          (currentSet === 2 &&
            positionInSet > singleSetWidth - itemWidthWithGap * 3) ||
          distanceFromEnd < itemWidthWithGap * 3
        ) {
          isScrollingRef.current = true;
          // Calculate position in the current set and jump to same position in second set
          const normalizedPosition = scrollLeft % singleSetWidth;
          desktopContainer.scrollLeft = singleSetWidth + normalizedPosition;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }

        // Calculate current index based on scroll position within a single set
        const normalizedScroll = scrollLeft % singleSetWidth;
        const newIndex = Math.round(normalizedScroll / itemWidthWithGap);
        const clampedIndex = Math.min(Math.max(0, newIndex), media.length - 1);
        setCurrentIndex(clampedIndex);
      });
    };

    desktopContainer.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Initialize scroll position to the middle (second set) for infinite scroll
    const initScroll = () => {
      const firstItem = desktopContainer.firstElementChild as HTMLElement;
      if (!firstItem) {
        setTimeout(initScroll, 50);
        return;
      }
      const itemWidth = firstItem.offsetWidth;
      const gap = 16;
      const itemWidthWithGap = itemWidth + gap;
      const singleSetWidth = media.length * itemWidthWithGap;

      // Start at the beginning of the second set
      desktopContainer.scrollLeft = singleSetWidth;
      handleScroll();
    };

    // Wait for DOM to be ready
    setTimeout(initScroll, 100);

    return () => {
      desktopContainer.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [hasMedia, media]);

  // Handle desktop dot navigation
  const handleDesktopDotClick = (index: number) => {
    if (!desktopScrollRef.current || !hasMedia || !media) return;

    const container = desktopScrollRef.current;
    const firstItem = container.firstElementChild as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const gap = 16; // gap-4 = 1rem = 16px
    const itemWidthWithGap = itemWidth + gap;

    // For 3+ items, use infinite scroll logic
    if (media.length >= 3) {
      const singleSetWidth = media.length * itemWidthWithGap;
      // Always use the second set (singleSetWidth + targetScrollInSet) for smooth infinite scroll
      const targetScrollInSet = index * itemWidthWithGap;
      const scrollTo = singleSetWidth + targetScrollInSet;

      isScrollingRef.current = true;
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    } else {
      // For 1-2 items, simple scroll to position
      const scrollTo = index * itemWidthWithGap;
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Extract dominant colors for images
  useEffect(() => {
    if (!hasMedia) return;

    const extractColors = async () => {
      const colorMap = new Map<string, string>();

      for (const item of media) {
        if (item.type === "image" || item.type === "gif") {
          const imageUrl = getMediaUrl(item.src);
          try {
            const color = await getDominantColor(imageUrl);
            colorMap.set(item.src, color);
          } catch (error) {
            console.warn(`Failed to extract color for ${item.src}:`, error);
            colorMap.set(item.src, "#808080"); // Fallback gray
          }
        }
      }

      setDominantColors(colorMap);
    };

    extractColors();
  }, [media, hasMedia]);

  const getBackgroundColor = (item: Media): string => {
    if (item.type === "video") return "transparent";
    const color = dominantColors.get(item.src) || "#f0f0f0";
    // Add alpha channel: 20% opacity = 0.2 * 255 = 51 = 0x33 in hex
    const alpha = Math.round(0.2 * 255).toString(16).padStart(2, "0");
    return color + alpha;
  };

  const renderMedia = (item: Media) => {
    const mediaUrl = getMediaUrl(item.src);
    const bgColor = getBackgroundColor(item);

    // Standard frame with rounded corners and border
    const frameClass =
      "w-full aspect-1/1 rounded-lg border border-[var(--color-border)] overflow-hidden";

    switch (item.type) {
      case "image":
        return (
          <div className={frameClass} style={{ backgroundColor: bgColor}}>
            <img
              src={mediaUrl}
              alt={item.alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        );
        case "video":
          // Check if it's a YouTube URL
          const videoId = extractYouTubeVideoId(mediaUrl);
          
          if (videoId) {
            // YouTube video
            const opts = {
              width: "100%",
              height: "100%",
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                modestbranding: 1 as const,
                rel: 0 as const, // Don't show related videos from other channels
              },
            };

            return (
              <div className={frameClass}>
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                  title={item.alt}
                />
              </div>
            );
          }
          
          // Regular video file
          return (
            <div className={frameClass}>
              <video
                src={mediaUrl}
                controls
                className="w-full h-full object-contain"
                aria-label={item.alt}
              />
            </div>
          );
      case "gif":
        return (
          <div className={frameClass} style={{ backgroundColor: bgColor }}>
            <img
              src={mediaUrl}
              alt={item.alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderSkeleton = () => (
    <div className="animate-pulse">
      <div className="w-full aspect-1/1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]" />
    </div>
  );

  // Don't render anything if no media
  if (!hasMedia || !media || media.length === 0) {
    return null;
  }

  const mediaCount = media.length;
  const shouldUseInfiniteScroll = mediaCount >= 3;

  return (
    <div className="mb-4">
      {/* Desktop: Responsive layout based on media count */}
      <div className="hidden md:block">
        <div
          ref={desktopScrollRef}
          className={`flex gap-4 pb-2 hide-scrollbar ${
            shouldUseInfiniteScroll ? "overflow-x-auto" : "justify-center"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {shouldUseInfiniteScroll
            ? // Render three sets of items for seamless infinite scroll (3+ items)
              [...media, ...media, ...media].map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[calc(33.333%-0.67rem)] min-w-[200px]"
                >
                  {renderMedia(item)}
                </div>
              ))
            : // Render actual items for 1-2 items
              media.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[calc(33.333%-0.67rem)] min-w-[200px]"
                >
                  {renderMedia(item)}
                </div>
              ))}
        </div>
        {/* Desktop navigation dots */}
        {mediaCount > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDesktopDotClick(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-[var(--color-link)] w-6"
                    : "bg-[var(--color-border)]"
                }`}
                aria-label={`Go to media ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile: 1 media item with swipe */}
      <div className="md:hidden">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden snap-x snap-mandatory hide-scrollbar"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {hasMedia ? (
            media.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-full snap-center">
                {renderMedia(item)}
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-full snap-center">
              {renderSkeleton()}
            </div>
          )}
        </div>
        {/* Mobile navigation dots */}
        {hasMedia && media.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-[var(--color-link)] w-6"
                    : "bg-[var(--color-border)]"
                }`}
                aria-label={`Go to media ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
