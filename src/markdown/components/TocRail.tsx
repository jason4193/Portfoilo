import { useState, useRef, useEffect } from "react";
import type { TocItem } from "../hooks/useToc";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { scrollToActiveSection } from "../utils/scroll";

interface TocRailProps {
  tocItems: TocItem[];
}

export function TocRail({ tocItems }: TocRailProps) {
  const { currentSectionId } = useScrollSpy(tocItems);
  const [isHovered, setIsHovered] = useState(false);
  const tocNavRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when current section changes while hovering
  useEffect(() => {
    if (isHovered && currentSectionId && tocNavRef.current) {
      scrollToActiveSection(tocNavRef.current, currentSectionId);
    }
  }, [isHovered, currentSectionId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Scroll to active section immediately on hover (no render cycle delay)
    if (currentSectionId && tocNavRef.current) {
      scrollToActiveSection(tocNavRef.current, currentSectionId);
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  // Find parent section for the current subsection
  const findParentSection = (currentId: string | null): string | null => {
    if (!currentId) return null;

    const currentItem = tocItems.find((item) => item.id === currentId);
    if (!currentItem || currentItem.level === 1) return null;

    // Find the parent (level 1) section that comes before this item
    const currentIndex = tocItems.findIndex((item) => item.id === currentId);
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (tocItems[i].level === 1) {
        return tocItems[i].id;
      }
    }
    return null;
  };

  const parentSectionId = findParentSection(currentSectionId);

  const handleClick = (item: TocItem) => {
    if (item.element) {
      const elementTop =
        item.element.getBoundingClientRect().top + window.scrollY;
      const offset = 80; // Account for header height
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="fixed top-0 right-0 z-50 hidden lg:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Hover reveal: Full TOC list - top right corner */}
        {isHovered && (
          <div
            ref={tocNavRef}
            className="absolute top-0 right-0 transition-opacity duration-150 rounded-lg bg-surface-secondary p-4 border border-stroke max-h-[70vh] max-w-xs w-max overflow-y-auto"
          >
            <div className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wide">
              Contents
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => {
                const isActive = item.id === currentSectionId;
                const isParentActive = item.id === parentSectionId;
                const indent =
                  item.level > 1 ? `ml-${(item.level - 1) * 4}` : "";

                return (
                  <button
                    key={item.id}
                    data-toc-item-id={item.id}
                    onClick={() => handleClick(item)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${indent} ${
                      isActive
                        ? "bg-link text-white font-semibold"
                        : isParentActive
                          ? "text-link opacity-75"
                          : "text-text-muted hover:bg-surface-primary"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Not hovering: Horizontal bars for all sections - Right side */}
        {!isHovered && (
          <div className="absolute top-30 right-4 flex flex-col items-end gap-1.5">
            {tocItems.map((item) => {
              const isActive = item.id === currentSectionId;
              const isParentActive = item.id === parentSectionId;
              const isTopLevel = item.level === 1;
              // Top-level sections: longer bars, subsections: shorter bars
              const barWidth = isTopLevel
                ? isActive || isParentActive
                  ? "w-16"
                  : "w-12"
                : isActive
                  ? "w-10"
                  : "w-8";

              return (
                <div key={item.id} className="relative flex items-center">
                  {/* Section name tag - Shown for active top-level sections OR parent of active subsection */}
                  {(isActive && isTopLevel) ||
                  (isParentActive && isTopLevel) ? (
                    <div className="absolute right-full mr-2 whitespace-nowrap">
                      <div
                        className={`text-xs font-medium bg-bg border border-border rounded px-2 py-0.5 shadow-sm ${
                          isActive ? "text-link" : "text-link opacity-75"
                        }`}
                      >
                        {item.title}
                      </div>
                    </div>
                  ) : null}
                  {/* Horizontal bar */}
                  <button
                    onClick={() => handleClick(item)}
                    className={`h-1 rounded transition-all duration-200 ${
                      isActive
                        ? "bg-link"
                        : isParentActive
                          ? "bg-link opacity-75"
                          : "bg-border hover:bg-secondary"
                    } ${barWidth}`}
                    aria-label={item.title}
                    title={item.title}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
