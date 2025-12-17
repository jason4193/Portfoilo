import { getSectionAnchorId } from "../utils/anchors";

interface SectionHeaderProps {
  id: string;
  title: string;
}

export function SectionHeader({ id, title }: SectionHeaderProps) {
  const anchorId = getSectionAnchorId(id, title);

  return (
    <div id={anchorId} className="border-t border-[var(--color-border)]">
      <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
        {title}
      </div>
    </div>
  );
}

