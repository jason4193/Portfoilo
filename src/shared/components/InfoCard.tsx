import { useRef } from "react";
import type { ReactNode } from "react";

import { useImageTilt } from "@animation-hooks/interactive/useImageTilt";

interface InfoCardImage {
  src: string;
  alt: string;
}

interface InfoCardProps {
  /** Optional image shown at top of card */
  image?: InfoCardImage;
  /** Extra classes for the image container (e.g. aspect ratio, max-height) */
  imageClassName?: string;
  /** Extra classes for the img element itself (e.g. override min-height, aspect ratio) */
  imgClassName?: string;
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
  imgClassName,
  header,
  listItems,
  bullet = "►",
  children,
  className = "",
  contentSectionClassName = "rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4",
}: InfoCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasContent = header || (listItems && listItems.length > 0) || children;

  // Use the extracted tilt animation hook
  useImageTilt({
    wrapperRef,
    imgRef,
    hasImage: !!image,
  });

  // Base img classes always applied
  const baseImgClasses = "rounded-2xl w-full will-change-transform";

  // Default sizing classes - only applied when no custom imgClassName provided
  const defaultImgSizingClasses =
    "object-cover aspect-[4/3] min-h-[20vh] sm:min-h-[35vh]";

  // If imgClassName is provided, consumer has full control over sizing
  const finalImgClasses = imgClassName
    ? `${baseImgClasses} ${imgClassName}`
    : `${baseImgClasses} ${defaultImgSizingClasses}`;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-[0_0.5rem_1.875rem_rgba(11,43,76,0.08)] ${className}`}
    >
      {image && (
        <div
          ref={wrapperRef}
          className={`shrink-0 overflow-hidden p-2 sm:p-3 [perspective:1000px] ${imageClassName ?? ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            className={finalImgClasses}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      )}
      {hasContent && (
        <div
          className={`flex min-h-0 flex-1 flex-col ${contentSectionClassName}`}
        >
          {header && (
            <div className="flex items-center justify-center gap-3 mb-3 shrink-0">
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
          {children}
          {listItems && listItems.length > 0 && (
            <ul className="mt-2 space-y-2 list-none shrink-0">
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
        </div>
      )}
    </div>
  );
}
