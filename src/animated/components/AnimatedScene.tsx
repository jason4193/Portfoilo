import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Card } from "./Card";
import { SceneRig } from "./SceneRig";
import { TransitionProgressController } from "./TransitionProgressController";
import { SectionFocusController } from "./SectionFocusController";
import type { SectionId } from "../constants/sections";

interface AnimatedSceneProps {
  onProgress?: (progress: number) => void;
  isAnimationReady?: boolean;
  onSectionSelect?: (id: SectionId, position: [number, number, number]) => void;
  focusTarget?: [number, number, number] | null;
  isSectionFocused?: boolean;
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>;
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>;
  modalPanelRef?: React.RefObject<HTMLDivElement | null>;
}

export function AnimatedScene({
  onProgress,
  isAnimationReady = false,
  onSectionSelect,
  focusTarget = null,
  isSectionFocused = false,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: AnimatedSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        const canvases = sceneRef.current.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          try {
            const gl =
              canvas.getContext("webgl") || canvas.getContext("webgl2");
            if (gl) {
              const loseContext = (gl as any).getExtension(
                "WEBGL_lose_context",
              );
              if (loseContext) {
                loseContext.loseContext();
              }
            }
          } catch (e) {
            console.error("[AnimatedScene] Error during cleanup:", e);
          }
        });
      }
    };
  }, []);

  return (
    <div ref={sceneRef} className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <TransitionProgressController onProgress={onProgress} />
        <SceneRig controlsRef={controlsRef} />
        <SectionFocusController
          isActive={isSectionFocused}
          focusTarget={focusTarget}
          controlsRef={controlsRef}
          dimOverlayRef={dimOverlayRef}
          modalOverlayRef={modalOverlayRef}
          modalPanelRef={modalPanelRef}
        />
        <Card
          isAnimationReady={isAnimationReady}
          onSectionSelect={onSectionSelect}
          isSectionFocused={isSectionFocused}
        />
      </Canvas>
    </div>
  );
}
