import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { StudioLight } from "./StudioLight";
import { TransitionProgressController } from "./TransitionProgressController";

interface AnimatedSceneProps {
  onProgress?: (progress: number) => void;
  isAnimationReady?: boolean;
}

export function AnimatedScene({
  onProgress,
  isAnimationReady = false,
}: AnimatedSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        const canvases = sceneRef.current.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          try {
            const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
            if (gl) {
              const loseContext = (gl as any).getExtension("WEBGL_lose_context");
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
        <StudioLight isAnimationReady={isAnimationReady} />
      </Canvas>
    </div>
  );
}
