import { useState, Activity } from "react";
import { getSectionAnchorId } from "../../shared/utils/anchors";
import { MediaCollection } from "../../shared/components/MediaCollection";
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  LinkIcon,
} from "../../shared/components/icons";
import type { Project } from "../../shared/types/content";

interface ProjectItemProps {
  id: string;
  title: string;
  project: Project;
  projectIndex: number; // 0-5 for projects in the grid
}

function getLinkIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) {
    return GitHubIcon;
  }
  if (normalized.includes("linkedin")) {
    return LinkedInIcon;
  }
  if (normalized.includes("email") || normalized.includes("mail")) {
    return EmailIcon;
  }

  return LinkIcon;
}

export function ProjectItem({
  id,
  title,
  project,
  projectIndex,
}: ProjectItemProps) {
  const anchorId = getSectionAnchorId(id, title);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the first image to check if it's a sprite image
  const firstImage = project.media?.find((m) => m.type === "image");
  const useSprites = firstImage?.src === "Projects.webp";

  // Include all media in the collection
  const mediaForCollection = project.media;

  const hasExpandableContent =
    (project.achievements && project.achievements.length > 0) ||
    (mediaForCollection && mediaForCollection.length > 0);

  return (
    <div id={anchorId}>
      <div
        className={`min-w-0 py-4 transition-opacity ${
          hasExpandableContent ? "cursor-pointer hover:opacity-80" : ""
        }`}
        onClick={() => hasExpandableContent && setIsExpanded(!isExpanded)}
        role={hasExpandableContent ? "button" : undefined}
        tabIndex={hasExpandableContent ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasExpandableContent && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={hasExpandableContent ? isExpanded : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col mb-2 sm:flex-row sm:items-baseline sm:gap-3">
              <h4 className="text-2xl font-semibold">{title}</h4>
              {project.links && project.links.length > 0 && (
                <div className="mt-0 flex gap-3 flex-wrap items-center sm:mt-6">
                  {project.links.map((link, lIdx: number) => {
                    const Icon = getLinkIcon(link.label);
                    return (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-6 h-6 text-color-link hover:text-color-link-hover transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title={link.label}
                      >
                        <Icon aria-label={link.label} aria-hidden={false} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            {project.date && (
              <p className="text-sm text-secondary mb-2">{project.date}</p>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-3">
                <span className="text-sm text-secondary">
                  {project.techStack.join(", ")}
                </span>
              </div>
            )}
            {project.description && (
              <p className="mb-4">{project.description}</p>
            )}
          </div>
          {hasExpandableContent && (
            <svg
              className={`w-6 h-6 text-text-base mt-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
      {hasExpandableContent && (
        <Activity mode={isExpanded ? "visible" : "hidden"}>
          <div className="mt-4 space-y-4">
            <MediaCollection
              media={mediaForCollection}
              isSprites={useSprites}
              spriteImageIndex={useSprites ? projectIndex : undefined}
            />
            {project.achievements?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {project.achievements.map(
                  (achievement: string, aIdx: number) => (
                    <li key={aIdx} className="text-sm">
                      {achievement}
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </Activity>
      )}
    </div>
  );
}
