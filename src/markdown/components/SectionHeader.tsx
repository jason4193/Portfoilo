import { getSectionAnchorId } from "../../shared/utils/anchors";

interface SectionHeaderProps {
  id: string;
  title: string;
}

export function SectionHeader({ id, title }: SectionHeaderProps) {
  const anchorId = getSectionAnchorId(id, title);

  return (
    <div id={anchorId} className="border-t border-stroke min-w-0">
      <h2 className="text-3xl font-semibold mt-5 pb-4 border-b border-stroke break-words">
        {title}
      </h2>
    </div>
  );
}
