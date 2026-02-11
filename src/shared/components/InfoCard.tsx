import type { ReactNode } from "react";

interface InfoCardImage {
  src: string;
  alt: string;
}

interface InfoCardProps {
  /** Optional image shown at top of card */
  image?: InfoCardImage;
  /** Extra classes for the image container (e.g. aspect ratio, max-height) */
  imageClassName?: string;
  /** Optional header text shown as pill with horizontal lines */
  header?: string;
  /** Optional list items with bullet (e.g. ►) */
  listItems?: string[];
  /** Bullet character for list items */
  bullet?: string;
  /** Custom content slot (use instead of or alongside listItems) */
  children?: ReactNode;
  /** Card root classes */
  className?: string;
  /** Classes for the content section below image (e.g. background) */
  contentSectionClassName?: string;
}

export function InfoCard({
  image,
  imageClassName,
  header,
  listItems,
  bullet = "►",
  children,
  className = "",
  contentSectionClassName = "rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4",
}: InfoCardProps) {
  const hasContent = header || (listItems && listItems.length > 0) || children;

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white/95 shadow-[0_0.5rem_1.875rem_rgba(11,43,76,0.08)] ${className}`}
    >
      {image && (
        <div className={`p-2 sm:p-3 ${imageClassName ?? ""}`}>
          <img
            src={image.src}
            alt={image.alt}
            className="rounded-2xl object-cover w-full aspect-[4/3] max-h-44 sm:max-h-[40%]"
          />
        </div>
      )}
      {hasContent && (
        <div className={contentSectionClassName}>
          {header && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span
                className="h-0.5 flex-1 max-w-8 bg-amber-300/80 shrink"
                aria-hidden
              />
              <span className="rounded-full bg-amber-200/90 px-3 py-1.5">
                <span className="font-semibold text-[#0B2B4C] text-sm">
                  {header}
                </span>
              </span>
              <span
                className="h-0.5 flex-1 max-w-8 bg-amber-300/80 shrink"
                aria-hidden
              />
            </div>
          )}
          {listItems && listItems.length > 0 && (
            <ul className="space-y-2 list-none">
              {listItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-[#0B2B4C]"
                >
                  <span className="text-[#0B2B4C] text-xs" aria-hidden>
                    {bullet}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
