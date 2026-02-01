interface IconProps {
  className?: string;
  isActive?: boolean;
}

// Projects Icon - Folder/Code icon
export function ProjectsIcon({ className = "", isActive = false }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <path
        d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16M8 15H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Competitions Icon - Trophy/Award icon
export function CompetitionsIcon({
  className = "",
  isActive = false,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(1.5)">
        <path
          d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"
          fill="currentColor"
          fillOpacity={isActive ? 1 : 0.8}
        />
        <path
          d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"
          fill="currentColor"
          fillOpacity={isActive ? 1 : 0.8}
        />
      </g>
    </svg>
  );
}

// Community Contributions Icon - People/Network icon
export function CommunityIcon({
  className = "",
  isActive = false,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="7"
        r="3.5"
        stroke="currentColor"
        strokeWidth="2"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <circle
        cx="16"
        cy="7"
        r="3.5"
        stroke="currentColor"
        strokeWidth="2"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <path
        d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 15.5 17.134 15.5 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 21C8.5 17.134 11.634 14 15.5 14C19.366 14 22 17.134 22 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Working Experience Icon - Briefcase icon
export function WorkIcon({ className = "", isActive = false }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <path
        d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11V15M10 13H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Education Icon - Graduation cap icon
export function EducationIcon({
  className = "",
  isActive = false,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6L2 11L12 16L22 11L12 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <path
        d="M2 11V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15V12M18 15V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
