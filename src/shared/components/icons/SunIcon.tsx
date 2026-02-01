import type { IconProps } from "./IconProps";

export function SunIcon({
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
      {/* Sun center */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      {/* Sun rays in 8 sectors */}
      <path
        d="M12 2 L12 4 M12 20 L12 22 M2 12 L4 12 M20 12 L22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.93 4.93 L6.34 6.34 M17.66 17.66 L19.07 19.07 M4.93 19.07 L6.34 17.66 M17.66 6.34 L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
