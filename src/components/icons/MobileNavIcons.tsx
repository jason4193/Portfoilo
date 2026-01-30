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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9C6 7.34315 7.34315 6 9 6H15C16.6569 6 18 7.34315 18 9V12C18 13.6569 16.6569 15 15 15H9C7.34315 15 6 13.6569 6 12V9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "currentColor" : "none"}
        fillOpacity={isActive ? 0.1 : 0}
      />
      <path
        d="M8 15V17C8 18.1046 8.89543 19 10 19H14C15.1046 19 16 18.1046 16 17V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6V4M12 19V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="10.5" r="1" fill="currentColor" />
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
