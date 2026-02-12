import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { debugPerf } from "../utils/debug";

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

const TILT_STRENGTH = 10;

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasContent = header || (listItems && listItems.length > 0) || children;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img || !image) return;

    debugPerf("infocard-tilt-enabled", { src: image.src }, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(img, {
        rotateY: x * TILT_STRENGTH,
        rotateX: -y * TILT_STRENGTH,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(img, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [image]);

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
            className="rounded-2xl object-cover aspect-[4/3] min-h-[20vh] sm:min-h-[35vh] w-full will-change-transform"
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
