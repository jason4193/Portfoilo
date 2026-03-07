import { useCallback, useRef, type RefObject } from "react";

import { content } from "@shared/data/content";
import jasonPhoto from "@shared/assets/Jason_2.webp";
import aboutMeIcon from "@animated/assets/AboutMeSectionIcon.webp";

import { BaseModalContent } from "./BaseModalContent";
import { useModalEntryAnimation } from "@animated/hooks";

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
      style={{ filter: "brightness(0.85)" }}
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
  const customContentAnimation = useCallback(
    (tl: gsap.core.Timeline) => {
      const left = leftRef.current;
      const right = rightRef.current;

      if (left) {
        // First, animate the left container shell
        tl.fromTo(
          left,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 },
        );

        const leftElements = left.querySelectorAll<HTMLElement>(
          "[data-animate-left]",
        );
        if (leftElements.length > 0) {
          // Then stagger in the inner text content
          tl.fromTo(
            leftElements,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 },
            "-=0.2"
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
    [leftRef, rightRef],
  );

  useModalEntryAnimation({
    headerRef,
    closeRef,
    delay: 1,
    customContentAnimation,
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={<AboutMeIcon />}
      title="About Me"
      accentColor={accentColor}
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 flex-col sm:flex-row items-stretch gap-6 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:gap-6"
    >
      {/* Left: MainContent - intro + What I Do */}
      <div
        ref={leftRef}
        className="opacity-0 flex flex-col min-w-0 shrink basis-full lg:basis-[60%] rounded-2xl p-6 sm:p-8 overflow-scroll"
        style={{ backgroundColor: "var(--color-panel-bg-deep)" }}
      >
        <div className="px-2">
          <p
            data-animate-left
            className="opacity-0 text-xl font-bold mb-4"
            style={{ color: "var(--color-panel-text)" }}
          >
            {introTitle}
          </p>
          {introParagraphs.map((p, i) => (
            <p
              key={i}
              data-animate-left
              className="opacity-0 whitespace-pre-line text-sm sm:text-base leading-relaxed mb-4"
              style={{ color: "var(--color-panel-text)" }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* What I Do section */}
        <div
          data-animate-left
          className="opacity-0 mt-6 mb-4 flex items-center rounded-lg px-2 sm:px-2 py-2.5"
          style={{
            backgroundColor: "transparent",
            borderBottom: "1px solid var(--color-panel-border)",
            borderRadius: 0,
          }}
        >
          <span
            className="font-bold text-lg"
            style={{ color: "var(--color-panel-text)" }}
          >
            What I Do
          </span>
        </div>
        <div className="px-2">
          {whatIDoParagraphs.map((p, i) => {
            const prefix = QUESTION_PREFIXES.find((q) => p.startsWith(q));
            if (prefix) {
              const rest = p.slice(prefix.length).replace(/^\n/, "");
              return (
                <p
                  key={i}
                  data-animate-left
                  className="opacity-0 mb-5 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--color-panel-text)" }}
                >
                  <span
                    className="block font-bold mb-1"
                    style={{ color: "var(--color-panel-text)" }}
                  >
                    {prefix}
                  </span>
                  {rest && (
                    <span
                      className="block whitespace-pre-line"
                      style={{ color: "var(--color-panel-text-muted)" }}
                    >
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
                className="opacity-0 whitespace-pre-line text-sm sm:text-base leading-relaxed mb-5"
                style={{ color: "var(--color-panel-text)" }}
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
        className="opacity-0 flex min-w-0 shrink flex-col w-full basis-full lg:basis-[40%]"
      >
        <div
          className="size-full flex flex-col rounded-2xl overflow-hidden shadow-sm"
          style={{ backgroundColor: "var(--color-panel-bg-deep)" }}
        >
          <img
            src={jasonPhoto}
            alt="Jason portrait"
            className="w-full h-2/3 min-h-0 object-cover object-center"
          />
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center min-h-0">
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: "var(--color-panel-text)" }}
            >
              2026 Side Quests & Stats
            </h3>
            <div className="space-y-4">
              {sideQuests.map((quest, index) => {
                // Mock progress data since true values aren't in content.ts yet
                const progress = index === 0 ? "40%" : "30%";
                return (
                  <div key={quest} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end text-sm">
                      <span style={{ color: "var(--color-panel-text)" }}>
                        <span className="opacity-75 mr-2">▶</span> {quest}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "var(--color-panel-text)" }}>
                        {progress}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-panel-border)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: progress,
                          backgroundColor: accentColor,
                          opacity: 0.85
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </BaseModalContent>
  );
}
