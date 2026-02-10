import { useEffect, useRef } from "react";
import { usePortfolioModeStore } from "../stores";
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
  const isMarkdown = mode === "markdown";
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const button = (
    <button
      onClick={toggleMode}
      className={`relative z-10 opacity-80 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-colors flex items-center justify-center ${className}`}
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
  }, []);

  if (!isMarkdown) {
    return button;
  }

  return (
    <div
      className="rainbow-hover-wrapper rounded-md p-[1px]"
      ref={wrapperRef}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        event.currentTarget.style.setProperty("--rx", `${x}px`);
        event.currentTarget.style.setProperty("--ry", `${y}px`);
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
