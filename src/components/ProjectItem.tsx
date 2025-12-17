import { getSectionAnchorId } from "../utils/anchors";
import type { Project } from "../types/content";

interface ProjectItemProps {
  id: string;
  title: string;
  project: Project;
}

export function ProjectItem({ id, title, project }: ProjectItemProps) {
  const anchorId = getSectionAnchorId(id, title);

  return (
    <div id={anchorId} className="mb-12">
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
      {project.description && <p className="mb-4">{project.description}</p>}
      {project.achievements?.length > 0 && (
        <ul className="list-disc list-inside mb-4 space-y-1">
          {project.achievements.map((achievement: string, aIdx: number) => (
            <li key={aIdx} className="text-sm">
              {achievement}
            </li>
          ))}
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
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

