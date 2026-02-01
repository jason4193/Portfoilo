import type { IconProps } from "./IconProps";

export function MoonIcon({
  className = "w-6 h-6",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      {/* Moon using path with crescent shape */}
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
