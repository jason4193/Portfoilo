import { Canvas } from "@react-three/fiber";
import { StudioLight } from "./StudioLight";
import { TransitionProgressController } from "./TransitionProgressController";

interface LayoutProps {
  onProgress?: (progress: number) => void;
  isAnimationReady?: boolean;
}

export function Layout({ onProgress, isAnimationReady = false }: LayoutProps) {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          // Reset to a neutral default; OrbitControls target will be (0,0,0)
          position: [0, 0, 5],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false, // Better for cleanup
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
      >
        <TransitionProgressController onProgress={onProgress} />
        <StudioLight isAnimationReady={isAnimationReady} />
      </Canvas>
    </div>
  );
}
