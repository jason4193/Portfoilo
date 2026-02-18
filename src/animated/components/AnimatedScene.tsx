import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import type { Group } from "three";
import { Card } from "./Card";
import { SceneRig } from "./SceneRig";
import { TransitionProgressController } from "./TransitionProgressController";
import { SectionFocusController } from "./SectionFocusController";
import { StaticBackground } from "./StaticBackground";
import { CAMERA_FRONT_POSITION } from "@animated/constants/scene";

interface AnimatedSceneProps {
  isAnimationReady?: boolean;
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>;
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>;
  modalPanelRef?: React.RefObject<HTMLDivElement | null>;
}

export function AnimatedScene({
  isAnimationReady = false,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: AnimatedSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const cardRef = useRef<Group | null>(null);

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
          position: CAMERA_FRONT_POSITION,
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
        }}
        shadows
        dpr={[1, 2]}
      >
        <TransitionProgressController />
        <SceneRig controlsRef={controlsRef} cardRef={cardRef} />
        <SectionFocusController
          controlsRef={controlsRef}
          cardRef={cardRef}
          dimOverlayRef={dimOverlayRef}
          modalOverlayRef={modalOverlayRef}
          modalPanelRef={modalPanelRef}
        />
        <Card cardRef={cardRef} isAnimationReady={isAnimationReady} />
        <StaticBackground />
      </Canvas>
    </div>
  );
}
