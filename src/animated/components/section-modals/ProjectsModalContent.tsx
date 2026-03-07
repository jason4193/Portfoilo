import { useState, useMemo, type RefObject } from "react";
import { content } from "@shared/data/content";
import { getMediaUrl } from "@shared/utils/media";
import { InfoCard } from "@shared/components/InfoCard";
import { GenericModalContent } from "./GenericModalContent";
import projectIcon from "@animated/assets/ProjectsSectionIcon.webp";
import type { Project } from "@shared/types/content";

interface ProjectsModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Rocket icon - Projects section */
function ProjectIcon({ className }: { className?: string }) {
  return (
    <img
      src={projectIcon}
      alt=""
      className={`size-18 object-contain ${className ?? ""}`}
    />
  );
}

function renderProjectCard(item: Project, _placement: any, _index?: number) {
  const firstImage = item.media?.find((m) => m.type === "image");

  return (
    <InfoCard
      className="size-full"
      // Slightly taller image cap so the single-card grid
      // feels substantial but still stays inside the frame.
      imageClassName="max-h-[30vh] sm:max-h-[48vh]"
      imgClassName="h-full w-full object-contain"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.date}
      contentSectionClassName="rounded-b-3xl bg-surface-infocard px-3 py-3 sm:px-4 sm:py-4"
    >
      <h3
        className="!mt-0 mb-1 font-bold !text-sm sm:text-base"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.title}
      </h3>
      <p
        className="text-sm sm:text-xs leading-relaxed mb-2"
        style={{ color: "var(--color-panel-text)" }}
      >
        {item.description}
      </p>
      {item.techStack && item.techStack.length > 0 && (
        <div className="flex-wrap gap-1 flex sm:hidden">
          {item.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-card-secondary)",
                color: "var(--color-panel-bg)",
                opacity: 0.7,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </InfoCard>
  );
}

const PROJECT_CATEGORIES = [
  "All",
  "Web",
  "System",
  "Tool",
  "Security",
  "AI & Data",
];

export function ProjectsModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: ProjectsModalContentProps) {
  const projects = content?.projects ?? [];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => {
      const cats =
        p.categories && p.categories.length > 0
          ? p.categories
          : p.category
            ? [p.category]
            : ["Web"];
      return cats.includes(activeCategory);
    });
  }, [projects, activeCategory]);

  const filterComponent = (
    <div className="flex gap-2 w-full overflow-x-auto no-scrollbar items-center pb-1">
      {PROJECT_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors border ${
            activeCategory === cat
              ? "border-[var(--color-panel-text)]/40 bg-[var(--color-panel-text)] text-[var(--color-panel-bg)] shadow-sm"
              : "border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
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
      icon={<ProjectIcon className="size-18 object-contain" />}
      title="Projects"
      accentColor={accentColor}
      introText="Here are some projects I've worked on over the years:"
      items={filteredProjects}
      onClose={onClose}
      renderCard={renderProjectCard}
      getItemKey={(item, index) => `${item.title}-${index}`}
      swipeLabel="Swipe left to see next project"
      enableDetailPanel={true}
      galleryHeaderLeftContent={filterComponent}
    />
  );
}
