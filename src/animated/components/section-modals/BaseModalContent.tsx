import type { RefObject, ReactNode } from "react";

interface BaseModalContentProps {
  /** Ref for overlay element (for animations) */
  overlayRef: RefObject<HTMLDivElement | null>;
  /** Ref for panel element (for animations) */
  panelRef: RefObject<HTMLDivElement | null>;
  /** Icon to display in header */
  icon: ReactNode;
  /** Title text for header */
  title: string;
  /** Accent color for header background */
  accentColor: string;
  /** Background color for main container */
  backgroundColor?: string;
  /** Text color for container */
  textColor?: string;
  /** Ref for header element (for animations) */
  headerRef: RefObject<HTMLDivElement | null>;
  /** Ref for close button element (for animations) */
  closeRef: RefObject<HTMLDivElement | null>;
  /** Close handler */
  onClose: () => void;
  /** Main content area */
  children: ReactNode;
  /** Custom class name for main content area */
  contentClassName?: string;
}

/**
 * Base modal content layout component
 * Provides full modal structure: overlay + panel + header + scrollable content + close buttons
 */
export function BaseModalContent({
  overlayRef,
  panelRef,
  icon,
  title,
  accentColor,
  backgroundColor = "#F7F4EC",
  textColor = "#0B2B4C",
  headerRef,
  closeRef,
  onClose,
  children,
  contentClassName = "flex min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-10 sm:py-10",
}: BaseModalContentProps) {
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      style={{ opacity: 0, pointerEvents: "none" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative size-full overflow-visible rounded-2xl shadow-xl flex flex-col"
        style={{ backgroundColor, color: textColor }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Mobile-only top-right X button */}
        <button
          className="absolute -top-2 -right-2 z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#0B2B4C]/80 shadow-md transition-colors hover:bg-white hover:text-[#0B2B4C] sm:hidden"
          onClick={onClose}
          aria-label="Close section"
        >
          <span className="text-base font-bold">✕</span>
        </button>

        {/* Header */}
        <div
          ref={headerRef}
          className="flex shrink-0 items-center rounded-t-2xl px-4 py-3 sm:px-6 sm:py-4"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/40 sm:size-14">
              {icon}
            </div>
            <p
              className="!m-0 text-xl font-bold italic sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ color: textColor }}
            >
              {title}
            </p>
          </div>
        </div>

        {/* Main content area - customizable */}
        <div className={contentClassName}>{children}</div>

        {/* Desktop-only close button footer */}
        <div
          ref={closeRef}
          className="hidden shrink-0 justify-center px-4 pb-4 sm:flex sm:px-6 sm:pb-6"
        >
          <button className="btn-panel-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
