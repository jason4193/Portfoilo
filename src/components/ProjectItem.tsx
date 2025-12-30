import { useState, Activity } from "react";
import { getSectionAnchorId } from "../utils/anchors";
import type { Project } from "../types/content";

interface ProjectItemProps {
  id: string;
  title: string;
  project: Project;
}

export function ProjectItem({ id, title, project }: ProjectItemProps) {
  const anchorId = getSectionAnchorId(id, title);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExpandableContent =
    (project.achievements && project.achievements.length > 0) ||
    (project.links && project.links.length > 0);

  return (
    <div id={anchorId} className="mb-12">
      <div
        className={`group ${
          hasExpandableContent ? "cursor-pointer" : ""
        } transition-all duration-200 ${
          hasExpandableContent ? "hover:opacity-80" : ""
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
            <h3 className="text-2xl font-semibold mb-3">{title}</h3>
            {project.date && (
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                {project.date}
              </p>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-3">
                <span className="text-sm text-[var(--color-text-secondary)]">
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
              className={`w-5 h-5 text-[var(--color-text-secondary)] flex-shrink-0 mt-1 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
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
            {project.achievements?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {project.achievements.map(
                  (achievement: string, aIdx: number) => (
                    <li key={aIdx} className="text-sm">
                      {achievement}
                    </li>
                  )
                )}
              </ul>
            )}
            {project.links?.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {project.links.map((link, lIdx: number) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-link)] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Activity>
      )}
    </div>
  );
}
