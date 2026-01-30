import React, { useMemo } from "react";
import type { TocItem } from "../hooks/useToc";
import { useScrollSpy } from "../hooks/useScrollSpy";
import {
  ProjectsIcon,
  CompetitionsIcon,
  CommunityIcon,
  WorkIcon,
  EducationIcon,
} from "./icons/MobileNavIcons";

interface MobileProgressIndicatorProps {
  tocItems: TocItem[];
}

// Map section titles to icons and short labels
function getSectionConfig(title: string): {
  icon: React.ComponentType<{ className?: string; isActive?: boolean }>;
  shortLabel: string;
} {
  const titleLower = title.toLowerCase();
  
  if (titleLower === "projects") {
    return { icon: ProjectsIcon, shortLabel: "Projects" };
  }
  if (titleLower === "competitions") {
    return { icon: CompetitionsIcon, shortLabel: "Awards" };
  }
  if (titleLower === "community contributions") {
    return { icon: CommunityIcon, shortLabel: "Community" };
  }
  if (titleLower === "working experience") {
    return { icon: WorkIcon, shortLabel: "Work" };
  }
  if (titleLower === "education") {
    return { icon: EducationIcon, shortLabel: "Education" };
  }
  
  // Fallback with partial matching
  if (titleLower.includes("project")) {
    return { icon: ProjectsIcon, shortLabel: "Projects" };
  }
  if (titleLower.includes("competition")) {
    return { icon: CompetitionsIcon, shortLabel: "Awards" };
  }
  if (titleLower.includes("community")) {
    return { icon: CommunityIcon, shortLabel: "Community" };
  }
  if (titleLower.includes("working") || titleLower.includes("experience")) {
    return { icon: WorkIcon, shortLabel: "Work" };
  }
  if (titleLower.includes("education") || titleLower.includes("academic")) {
    return { icon: EducationIcon, shortLabel: "Education" };
  }
  
  // Final fallback
  return { icon: ProjectsIcon, shortLabel: title };
}

export function MobileProgressIndicator({
  tocItems,
}: MobileProgressIndicatorProps) {
  const { currentSectionId } = useScrollSpy(tocItems);

  // Filter to only top-level sections (level === 1) - memoized to prevent unnecessary re-renders
  const topLevelSections = useMemo(
    () => tocItems.filter((item) => item.level === 1),
    [tocItems]
  );

  // Find the active top-level section based on currentSectionId from useScrollSpy
  // useScrollSpy already handles all scroll tracking, so we just need to find the parent
  const activeSectionId = useMemo(() => {
    if (!currentSectionId) {
      return null;
    }

    // Find the current item in tocItems
    const currentIndex = tocItems.findIndex(
      (item) => item.id === currentSectionId
    );

    if (currentIndex === -1) {
      return null;
    }

    const currentItem = tocItems[currentIndex];

    // If it's already a top-level section, return it
    if (currentItem.level === 1) {
      return currentItem.id;
    }

    // Otherwise, find the parent top-level section by going backwards
    for (let i = currentIndex; i >= 0; i--) {
      if (tocItems[i].level === 1) {
        return tocItems[i].id;
      }
    }

    return null;
  }, [currentSectionId, tocItems]);

  // Don't render if no top-level sections (must be after all hooks)
  if (topLevelSections.length === 0) {
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
    <div className="fixed bottom-2 left-0 right-0 z-50 block md:hidden safe-area-inset-bottom mx-3">
      <div className="bg-[var(--color-bg-primary)] opacity-85 backdrop-blur-xl border rounded-3xl border-[var(--color-border)]/50">
        <div className="max-w-4xl mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            {topLevelSections.map((item) => {
              const isActive = item.id === activeSectionId;
              const { icon: Icon, shortLabel } = getSectionConfig(item.title);

              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="flex flex-col items-center justify-center flex-1 py-2 px-1 min-w-0 transition-all duration-200 active:scale-95"
                  aria-label={item.title}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={`mb-1 transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-link)]"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    <Icon
                      className="w-6 h-6"
                      isActive={isActive}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-link)]"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
