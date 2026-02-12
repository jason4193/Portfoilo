import { useRef, type RefObject } from "react";
import { content } from "../../../shared/data/content";
import jasonPhoto from "../../../shared/assets/Jason_2.webp";
import aboutMeIcon from "../../assets/AboutMeSectionIcon.webp";
import { InfoCard } from "../../../shared/components/InfoCard";
import { BaseModalContent } from "./BaseModalContent";
import { useModalEntryAnimation } from "../../hooks/useModalEntryAnimation";

interface AboutMeModalContentProps {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  accentColor: string;
  onClose: () => void;
}

const QUESTION_PREFIXES = [
  '"When a new term starts and not sure which classes should take?"',
  '"Always struggle with checking the stock price of your shopping list?"',
] as const;

function parseIntroContent(raw: string) {
  const sideQuestMarker = "2026 Side Quest:";
  const sideQuestIdx = raw.indexOf(sideQuestMarker);
  let mainContent = raw;
  let sideQuests: string[] = [];

  if (sideQuestIdx !== -1) {
    mainContent = raw.slice(0, sideQuestIdx).trim();
    const after = raw.slice(sideQuestIdx + sideQuestMarker.length).trim();
    sideQuests = after
      .split(/\n+/)
      .map((line) => line.replace(/^▶\s*/, "").trim())
      .filter(Boolean);
  }

  const paragraphs = mainContent.split(/\n\n+/);
  const introParagraphs: string[] = [];
  const whatIDoParagraphs: string[] = [];
  let inWhatIDo = false;

  for (const p of paragraphs) {
    if (p.startsWith("I like making products") || inWhatIDo) {
      inWhatIDo = true;
      whatIDoParagraphs.push(p);
    } else {
      introParagraphs.push(p);
    }
  }

  return { introParagraphs, whatIDoParagraphs, sideQuests };
}

/** About Me section icon */
function AboutMeIcon() {
  return (
    <img
      src={aboutMeIcon}
      alt=""
      className="size-18 object-contain"
      aria-hidden
    />
  );
}

export function AboutMeModalContent({
  overlayRef,
  panelRef,
  accentColor,
  onClose,
}: AboutMeModalContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const introTitle = content?.header
    ? `Hello! I'm ${content.header}.`
    : "Hello!";
  const raw = content?.introAnimated ?? "";
  const { introParagraphs, whatIDoParagraphs, sideQuests } =
    parseIntroContent(raw);

  // Custom animation for AboutMe modal
  useModalEntryAnimation({
    headerRef,
    closeRef,
    delay: 1,
    customContentAnimation: (tl) => {
      const left = leftRef.current;
      const right = rightRef.current;

      if (left) {
        const leftElements = left.querySelectorAll<HTMLElement>(
          "[data-animate-left]",
        );
        if (leftElements.length > 0) {
          tl.fromTo(
            leftElements,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 },
          );
        }
      }

      if (right) {
        tl.fromTo(
          right,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.2",
        );
      }
    },
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<AboutMeIcon />}
      title="About Me"
      accentColor={accentColor}
      backgroundColor="#F7F4EC"
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto px-4 py-4 sm:px-10 sm:py-10 lg:flex-row lg:items-stretch lg:gap-8"
    >
      {/* Left: MainContent - intro + What I Do */}
      <div
        ref={leftRef}
        className="flex flex-col justify-center min-w-0 shrink basis-full lg:basis-[65%]"
      >
        <div className="px-2">
          <p
            data-animate-left
            className="opacity-0 text-lg md:text-xl font-semibold text-shadow-bold text-[#0B2B4C] mb-4"
          >
            {introTitle}
          </p>
          {introParagraphs.map((p, i) => (
            <p
              key={i}
              data-animate-left
              className={
                i === 1
                  ? "opacity-0 whitespace-pre-line text-base leading-relaxed mb-4 italic text-[#0B2B4C]/90"
                  : "opacity-0 whitespace-pre-line text-base leading-relaxed mb-4 text-[#0B2B4C]/95"
              }
            >
              {p}
            </p>
          ))}
        </div>

        {/* What I Do section */}
        <div
          data-animate-left
          className="opacity-0 mt-6 mb-4 flex items-center gap-2 rounded-lg border border-amber-200/80 bg-[#0B2B4C] px-3 py-2 sm:px-4 sm:py-2.5"
        >
          <span className="font-semibold text-yellow-400 text-shadow-bold">
            What I Do
          </span>
        </div>
        <div className="px-4">
          {whatIDoParagraphs.map((p, i) => {
            const prefix = QUESTION_PREFIXES.find((q) => p.startsWith(q));
            if (prefix) {
              const rest = p.slice(prefix.length).replace(/^\n/, "");
              return (
                <p
                  key={i}
                  data-animate-left
                  className="opacity-0 mb-4 text-base leading-relaxed text-[#0B2B4C]/95"
                >
                  <span className="block font-semibold text-shadow-bold">
                    {prefix}
                  </span>
                  {rest && (
                    <span className="block whitespace-pre-line text-base italic">
                      {rest}
                    </span>
                  )}
                </p>
              );
            }
            return (
              <p
                key={i}
                data-animate-left
                className="opacity-0 whitespace-pre-line text-base leading-relaxed mb-4 text-[#0B2B4C]/95"
              >
                {p}
              </p>
            );
          })}
        </div>
      </div>

      {/* Right: image + Side Quests card */}
      <div
        ref={rightRef}
        className="opacity-0 flex min-w-0 shrink flex-col justify-center max-w-full mx-auto w-full basis-full lg:mx-0 lg:basis-[35%]"
      >
        <InfoCard
          image={{ src: jasonPhoto, alt: "Jason portrait" }}
          header={sideQuests.length > 0 ? "2026 Side Quests" : undefined}
          listItems={sideQuests.length > 0 ? sideQuests : undefined}
        />
      </div>
    </BaseModalContent>
  );
}
