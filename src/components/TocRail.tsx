import { useState } from "react";
import type { TocItem } from "../hooks/useToc";
import { useScrollSpy } from "../hooks/useScrollSpy";

interface TocRailProps {
  tocItems: TocItem[];
}

export function TocRail({ tocItems }: TocRailProps) {
  const { currentSectionId } = useScrollSpy(tocItems);
  const [isHovered, setIsHovered] = useState(false);

  if (tocItems.length === 0) {
    return null;
  }

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
      className="fixed right-0 top-1/4 -translate-y-1/2 z-50 hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center flex-row-reverse">
        {/* Hover reveal: Full TOC list - Left side */}
        {isHovered && (
          <div className="mr-4 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg shadow-lg p-3 min-w-[200px] max-h-[400px] overflow-y-auto transition-opacity duration-150">
            <div className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
              Contents
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => {
                const isActive = item.id === currentSectionId;
                const indent =
                  item.level > 1 ? `ml-${(item.level - 1) * 4}` : "";

                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-link)] font-medium bg-[var(--color-bg-secondary)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                    } ${indent}`}
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
          <div className="relative flex flex-col items-end gap-1.5 mr-4">
            {tocItems.map((item) => {
              const isActive = item.id === currentSectionId;
              const isTopLevel = item.level === 1;
              // Top-level sections: longer bars, subsections: shorter bars
              const barWidth = isTopLevel
                ? isActive
                  ? "w-16"
                  : "w-12"
                : isActive
                ? "w-10"
                : "w-8";

              return (
                <div key={item.id} className="relative flex items-center">
                  {/* Section name tag - Only shown for active top-level sections, positioned to the left */}
                  {isActive && isTopLevel && (
                    <div className="absolute right-full mr-2 whitespace-nowrap">
                      <div className="text-xs text-[var(--color-link)] font-medium bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded px-2 py-0.5 shadow-sm">
                        {item.title}
                      </div>
                    </div>
                  )}
                  {/* Horizontal bar */}
                  <button
                    onClick={() => handleClick(item)}
                    className={`h-1 rounded transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-link)]"
                        : "bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]"
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
