import { useState, Activity } from "react";
import { getSectionAnchorId } from "../../shared/utils/anchors";
import { MediaCollection } from "../../shared/components/MediaCollection";
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  LinkIcon,
} from "../../shared/components/icons";
import type {
  CompetitionExperience,
  CommunityContributionExperience,
  WorkingExperience,
} from "../../shared/types/content";

interface ExperienceItemProps {
  id: string;
  title: string;
  experience:
    | CompetitionExperience
    | CommunityContributionExperience
    | WorkingExperience;
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

export function ExperienceItem({ id, title, experience }: ExperienceItemProps) {
  const anchorId = getSectionAnchorId(id, title);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExpandableContent =
    (experience.achievements && experience.achievements.length > 0) ||
    (experience.media && experience.media.length > 0);

  return (
    <div id={anchorId} className="mb-6">
      <div
        className={`expandable-item ${
          hasExpandableContent ? "expandable-item--clickable" : ""
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
              <h4 className="text-xl font-semibold">{title}</h4>
              {experience.links && experience.links.length > 0 && (
                <div className="mt-0 flex gap-3 flex-wrap items-center sm:mt-6">
                  {experience.links.map((link, lIdx: number) => {
                    const Icon = getLinkIcon(link.label);
                    return (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-icon"
                        onClick={(e) => e.stopPropagation()} // don't toggle expand
                        title={link.label}
                      >
                        <Icon aria-label={link.label} aria-hidden={false} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-sm text-secondary mb-2">
              {experience.date}
              {experience.role && ` • ${experience.role}`}
            </p>
            {experience.description && (
              <p className="mb-3">{experience.description}</p>
            )}
          </div>
          {hasExpandableContent && (
            <svg
              className={`expand-chevron mt-4 ${isExpanded ? "rotate-180" : ""}`}
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
          </div>
        </Activity>
      )}
    </div>
  );
}
