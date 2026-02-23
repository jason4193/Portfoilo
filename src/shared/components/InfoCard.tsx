import { useRef } from "react";
import type { RefObject, ReactNode } from "react";

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
  /** Optional inline styles for the img element */
  imgStyle?: React.CSSProperties;
  /** Whether this is a grid image that needs special square aspect ratio and scaling */
  isGridImage?: boolean;
  /** For grid images: number of columns in sprite sheet (default: 3) */
  spriteColumns?: number;
  /** For grid images: number of rows in sprite sheet (default: 2) */
  spriteRows?: number;
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
  imgStyle,
  isGridImage = false,
  spriteColumns = 3,
  spriteRows = 2,
  header,
  listItems,
  bullet = "►",
  children,
  className = "",
  contentSectionClassName,
}: InfoCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLElement | null>(null);
  const hasContent = header || (listItems && listItems.length > 0) || children;

  // Default classes without background (background will be applied via inline style)
  const defaultContentClasses = "rounded-b-3xl px-3 py-3 sm:px-4 sm:py-4";
  const finalContentClasses = contentSectionClassName || defaultContentClasses;

  const baseRegularImgClasses = "w-full will-change-transform object-cover";
  const regularImgClasses = imgClassName
    ? `${baseRegularImgClasses} ${imgClassName}`
    : `${baseRegularImgClasses} aspect-[4/3] min-h-[20vh] sm:min-h-[35vh]`;

  const gridImgClasses = imgClassName
    ? `absolute inset-0 will-change-transform ${imgClassName}`
    : "absolute inset-0 will-change-transform";

  const gridBackgroundStyle: React.CSSProperties | undefined = isGridImage
    ? {
        backgroundImage: image ? `url(${image.src})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${spriteColumns * 100}% ${spriteRows * 100}%`,
        backgroundPosition: "0% 0%",
        ...imgStyle,
      }
    : undefined;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl shadow-[0_0.5rem_1.875rem_rgba(11,43,76,0.08)] bg-surface-panel ${className}`}
    >
      {image && (
        <div
          ref={wrapperRef}
          className={`shrink-0 overflow-hidden [perspective:1000px] flex justify-center ${imageClassName ?? ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={isGridImage ? "relative aspect-square" : "w-full"}>
            {isGridImage ? (
              <div
                ref={imgRef as RefObject<HTMLDivElement | null>}
                className={gridImgClasses}
                role="img"
                aria-label={image.alt}
                style={{
                  transformStyle: "preserve-3d",
                  ...gridBackgroundStyle,
                }}
              />
            ) : (
              <img
                ref={imgRef as RefObject<HTMLImageElement | null>}
                src={image.src}
                alt={image.alt}
                className={regularImgClasses}
                style={{
                  transformStyle: "preserve-3d",
                  ...imgStyle,
                }}
              />
            )}
          </div>
        </div>
      )}
      {hasContent && (
        <div
          className={`flex min-h-0 flex-1 flex-col ${finalContentClasses} bg-surface-infocard`}
        >
          {header && (
            <div className="flex items-center justify-center gap-3 mb-3 shrink-0">
              <span
                className="h-0.5 flex-1 max-w-8 shrink bg-card-yellow"
                aria-hidden
              />
              <span className="rounded-full px-3 py-1.5 bg-card-yellow">
                <span className="font-semibold sm:text-xs text-sm text-surface-animated">
                  {header}
                </span>
              </span>
              <span
                className="h-0.5 flex-1 max-w-8 shrink bg-card-yellow"
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
                  className="flex items-center gap-2.5 text-sm text-text-panel"
                >
                  <span className="text-xs text-text-panel" aria-hidden>
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
