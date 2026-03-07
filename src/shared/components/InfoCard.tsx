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
  imageClassName = "",
  imgClassName = "",
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
  const hasContent = header || (listItems && listItems.length > 0) || children;

  // 1. Force a standard aspect ratio for the image container
  // This prevents different image sizes from making cards different heights.
  const imageFrameClass = isGridImage
    ? "aspect-square"
    : "aspect-video w-full"; // Standard 16:9 for landscape cards

  return (
    <div
      className={`flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-surface-panel ${className}`}
    >
      {image && (
        <div className={`shrink-0 overflow-hidden relative ${imageFrameClass} ${imageClassName}`}>
          {isGridImage ? (
            <div
              className={`absolute inset-0 bg-no-repeat object-cover ${imgClassName}`}
              role="img"
              aria-label={image.alt}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: `${spriteColumns * 100}% ${spriteRows * 100}%`,
                backgroundPosition: "0% 0%",
                ...imgStyle,
              }}
            />
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
              style={imgStyle}
            />
          )}
        </div>
      )}

      {hasContent && (
        <div className={`flex flex-col flex-1 p-4 bg-surface-infocard ${contentSectionClassName ?? ""}`}>
          {header && (
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="rounded-full px-3 py-1 bg-card-secondary text-xs font-bold uppercase tracking-wider">
                {header}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          )}

          <div className="flex-1 text-sm text-text-panel">
            {children}
          </div>

          {listItems && listItems.length > 0 && (
            <ul className="mt-3 space-y-2 list-none">
              {listItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[10px] mt-1 opacity-60">{bullet}</span>
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