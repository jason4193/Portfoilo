import { useEffect, useRef } from "react";
import { usePortfolioModeStore, useThemeStore } from "../stores";
import { AnimatedIcon, MarkdownIcon } from "./icons";

interface ModeToggleProps {
  className?: string;
  iconClassName?: string;
}

export function ModeToggle({
  className = "",
  iconClassName = "w-6 h-6",
}: ModeToggleProps) {
  const { mode, toggleMode } = usePortfolioModeStore();
  const { theme } = useThemeStore();
  const isMarkdown = mode === "markdown";
  const isDark = theme === "dark";
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const button = (
    <button
      onClick={toggleMode}
      className={`flex items-center justify-center rounded-md border border-stroke w-9 h-9 sm:w-10 sm:h-10 relative z-10 transition-colors duration-300 ${className} ${
        isDark
          ? "bg-neutral-800 text-white hover:bg-neutral-700"
          : "bg-white/70 text-neutral-700 hover:bg-white"
      }`}
      aria-label={`Switch to ${isMarkdown ? "animated" : "markdown"} mode`}
      title={`Switch to ${isMarkdown ? "animated" : "markdown"} mode`}
    >
      {isMarkdown ? (
        <AnimatedIcon className={iconClassName} aria-hidden={true} />
      ) : (
        <MarkdownIcon className={iconClassName} aria-hidden={true} />
      )}
    </button>
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !isMarkdown) return;

    let angle = 0;
    const radius = 18;

    const animate = () => {
      if (!isHoveringRef.current) {
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        wrapper.style.setProperty("--rx", `${x}%`);
        wrapper.style.setProperty("--ry", `${y}%`);
        angle += 0.02;
      }
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMarkdown]);

  if (!isMarkdown) {
    return button;
  }

  return (
    <div
      className="rainbow-hover-wrapper rounded-md p-[0.0625rem]"
      ref={wrapperRef}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        event.currentTarget.style.setProperty("--rx", `${x}%`);
        event.currentTarget.style.setProperty("--ry", `${y}%`);
      }}
      onPointerEnter={() => {
        isHoveringRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveringRef.current = false;
      }}
      onPointerCancel={() => {
        isHoveringRef.current = false;
      }}
    >
      <span className="rainbow-hover-border" aria-hidden={true} />
      {button}
    </div>
  );
}
