import { IconProps } from "./IconProps";

export function MarkdownIcon({ className = "", "aria-label": ariaLabel, "aria-hidden": ariaHidden = true }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      {/* Document/page representation */}
      <path d="M4 4h16v16H4z" />
      {/* Text lines */}
      <path d="M7 8h10" />
      <path d="M7 12h8" />
      <path d="M7 16h6" />
      {/* Markdown indicator - hash symbol */}
      <path d="M7 8l-2-2" />
    </svg>
  );
}
