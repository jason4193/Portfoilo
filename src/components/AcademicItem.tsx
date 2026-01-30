import { useState, Activity } from "react";
import { getSectionAnchorId } from "../utils/anchors";
import { MediaCollection } from "./MediaCollection";
import type { AcademicExperience } from "../types/content";

interface AcademicItemProps {
  id: string;
  title: string;
  academic: AcademicExperience;
}

export function AcademicItem({ id, title, academic }: AcademicItemProps) {
  const anchorId = getSectionAnchorId(id, title);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExpandableContent =
    academic.achievements && academic.achievements.length > 0;

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
            {academic.program && (
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                {academic.program}
              </p>
            )}
            {academic.summary && <p className="mb-3">{academic.summary}</p>}
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
            <MediaCollection media={academic.media} />
            {academic.achievements?.length > 0 && (
              <ul className="list-disc list-inside space-y-1">
                {academic.achievements.map(
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
