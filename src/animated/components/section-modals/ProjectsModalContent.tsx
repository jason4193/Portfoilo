import { useRef, type RefObject } from "react";
import { useMediaQuery } from "react-responsive";
import { content } from "@shared/data/content";
import { getMediaUrl } from "@shared/utils/media";
import { InfoCard } from "@shared/components/InfoCard";
import { BaseModalContent } from "./BaseModalContent";
import { useModalContentAnimation } from "@animated/hooks";
import { StackCardLayout } from "@animated/components/modal-layouts/StackCardLayout";
import { GridCardLayout } from "@animated/components/modal-layouts/GridCardLayout";
import { MOBILE_MAX_WIDTH } from "@animated/constants/mobile";
import projectIcon from "@animated/assets/ProjectsSectionIcon.webp";

interface ProjectsModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

/** Rocket icon - Projects section */
function ProjectIcon({ className }: { className?: string }) {
  return (
    <img
      src={projectIcon}
      alt=""
      className={`size-18 object-contain ${className ?? ""}`}
    />
  );
}

type ProjectItem = NonNullable<typeof content>["projects"][number];

function renderProjectCard(item: ProjectItem) {
  const firstImage = item.media?.find((m) => m.type === "image");
  return (
    <InfoCard
      className="size-full"
      imageClassName="max-h-[55%]"
      imgClassName="h-full object-cover object-center"
      image={
        firstImage
          ? {
              src: getMediaUrl(firstImage.src),
              alt: firstImage.alt ?? item.title,
            }
          : undefined
      }
      header={item.date}
      contentSectionClassName="rounded-b-3xl bg-amber-50/90 px-3 py-3 sm:px-4 sm:py-4"
    >
      <h3 className="!mt-0 mb-1 font-bold text-[#0B2B4C] !text-sm sm:text-base">
        {item.title}
      </h3>
      <p className="text-[0.5rem] sm:text-sm leading-relaxed text-[#0B2B4C]/90 mb-2">
        {item.description}
      </p>
      {item.techStack && item.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[0.4rem] sm:text-xs px-2 py-0.5 bg-[#F2D37B]/30 rounded-full text-[#0B2B4C]/80"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </InfoCard>
  );
}

export function ProjectsModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: ProjectsModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const projects = content?.projects ?? [];

  // Standardized modal content animation
  useModalContentAnimation({
    headerRef,
    closeRef,
    introRef,
    cardsRef,
    stackRef,
    isMobile,
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<ProjectIcon className="size-18 object-contain" />}
      title="Projects"
      accentColor={accentColor}
      backgroundColor="#FFF9E6"
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col gap-1 sm:gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed text-[#0B2B4C]/90 sm:text-lg"
      >
        Here are some projects I&apos;ve worked on over the years:
      </p>

      {isMobile ? (
        <div ref={stackRef} className="flex-1 min-h-0">
          <StackCardLayout
            items={projects}
            renderCard={renderProjectCard}
            getItemKey={(item, index) => `${item.title}-${index}`}
            swipeLabel="Swipe left to see next project"
          />
        </div>
      ) : (
        <div ref={cardsRef} className="flex-1 min-h-0">
          <GridCardLayout
            items={projects}
            renderCard={renderProjectCard}
            getItemKey={(item, index) => `${item.title}-${index}`}
            gridMode="equal"
            enforceAspectRatio={false}
          />
        </div>
      )}
    </BaseModalContent>
  );
}
