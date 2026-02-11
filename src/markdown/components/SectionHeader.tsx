import { getSectionAnchorId } from "../../shared/utils/anchors";

interface SectionHeaderProps {
  id: string;
  title: string;
}

export function SectionHeader({ id, title }: SectionHeaderProps) {
  const anchorId = getSectionAnchorId(id, title);

  return (
    <div id={anchorId} className="section-header">
      <div className="section-title">{title}</div>
    </div>
  );
}

