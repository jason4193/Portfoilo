import { useState, Activity } from "react";
import { getSectionAnchorId } from "../utils/anchors";
import { MediaCollection } from "./MediaCollection";
import type {
  CompetitionExperience,
  CommunityContributionExperience,
  WorkingExperience,
} from "../types/content";

interface ExperienceItemProps {
  id: string;
  title: string;
  experience:
    | CompetitionExperience
    | CommunityContributionExperience
    | WorkingExperience;
}

export function ExperienceItem({ id, title, experience }: ExperienceItemProps) {
  const anchorId = getSectionAnchorId(id, title);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExpandableContent =
    (experience.achievements && experience.achievements.length > 0) ||
    (experience.links && experience.links.length > 0);

  return (
    <div id={anchorId} className="mb-6">
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
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">
              {experience.date}
              {experience.role && ` • ${experience.role}`}
            </p>
            {experience.description && (
              <p className="mb-3">{experience.description}</p>
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
          <div className="mt-3 space-y-3">
            <MediaCollection media={experience.media} />
            {experience.achievements?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {experience.achievements.map(
                  (achievement: string, aIdx: number) => (
                    <li key={aIdx} className="text-sm">
                      {achievement}
                    </li>
                  )
                )}
              </ul>
            )}
            {experience.links && experience.links.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {experience.links.map((link, lIdx: number) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-link)] hover:underline text-sm"
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
