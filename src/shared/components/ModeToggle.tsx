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
      className={`btn-icon relative z-10 opacity-80 ${className}`}
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
