import { getSectionAnchorId } from "../utils/anchors";
import type { AcademicExperience } from "../types/content";

interface AcademicItemProps {
  id: string;
  title: string;
  academic: AcademicExperience;
}

export function AcademicItem({ id, title, academic }: AcademicItemProps) {
  const anchorId = getSectionAnchorId(id, title);

  return (
    <div id={anchorId} className="mb-6">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      {academic.program && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
          {academic.program}
        </p>
      )}
      {academic.summary && <p className="mb-3">{academic.summary}</p>}
      {academic.achievements?.length > 0 && (
        <ul className="list-disc list-inside space-y-1">
          {academic.achievements.map((achievement: string, aIdx: number) => (
            <li key={aIdx} className="text-sm">
              {achievement}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

