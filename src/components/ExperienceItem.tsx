import { getSectionAnchorId } from "../utils/anchors";
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

  return (
    <div id={anchorId} className="mb-6">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
        {experience.date}
        {experience.role && ` • ${experience.role}`}
      </p>
      {experience.description && <p className="mb-3">{experience.description}</p>}
      {experience.achievements?.length > 0 && (
        <ul className="list-disc list-inside space-y-1 mb-3">
          {experience.achievements.map((achievement: string, aIdx: number) => (
            <li key={aIdx} className="text-sm">
              {achievement}
            </li>
          ))}
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
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

