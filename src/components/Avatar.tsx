import { useState } from "react";

const JASON_PHOTO_Front = new URL("../assets/Jason_1.JPG", import.meta.url).href;
const JASON_PHOTO_Back = new URL("../assets/Jason_2.JPG", import.meta.url).href;

interface AvatarProps {
  className?: string;
}

export function Avatar({ className = "w-20 h-20 sm:w-26 sm:h-26" }: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative ${className} cursor-pointer`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label="Flip avatar image"
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease-in-out",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front image */}
        <img
          src={JASON_PHOTO_Front}
          alt="Portrait of Jason Poon"
          className="absolute inset-0 w-full h-full rounded-full object-cover border border-[var(--color-border)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            objectPosition: "center 20%",
          }}
        />
        {/* Back image */}
        <img
          src={JASON_PHOTO_Back}
          alt="Portrait of Jason Poon (back)"
          className="absolute inset-0 w-full h-full rounded-full object-cover border border-[var(--color-border)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        />
      </div>
    </div>
  );
}
