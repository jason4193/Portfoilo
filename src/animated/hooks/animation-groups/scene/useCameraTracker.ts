import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import { useCameraPoseStore, useSectionSelectionStore } from "@shared/stores";
import { debugPerf } from "@shared/utils/debug";

interface CameraPoseTrackerOptions {
  fps?: number;
  epsilon?: number;
}

export function useCameraTracker({
  fps = 30,
  epsilon = 0.01,
}: CameraPoseTrackerOptions = {}) {
  const { camera } = useThree();
  const setCameraPosition = useCameraPoseStore(
    (state) => state.setCameraPosition,
  );
  const isFocused = useSectionSelectionStore((state) => state.isFocused);
  const lastPositionRef = useRef<[number, number, number]>([0, 0, 0]);
  const elapsedRef = useRef(0);
  const interval = 1 / fps;

  const updatesThisSecondRef = useRef(0);
  const lastResetRef = useRef(0);

  // Memoize epsilon squared to avoid repeated multiplications
  const epsilonSq = useRef(epsilon * epsilon);

  useFrame((_, delta) => {
    if (isFocused) return;

    elapsedRef.current += delta;
    if (elapsedRef.current < interval) return;
    elapsedRef.current = 0;

    const x = camera.position.x;
    const y = camera.position.y;
    const z = camera.position.z;
    const [lx, ly, lz] = lastPositionRef.current;

    // Use squared distance to avoid expensive sqrt calls
    const dx = x - lx;
    const dy = y - ly;
    const dz = z - lz;
    const distSq = dx * dx + dy * dy + dz * dz;

    if (distSq < epsilonSq.current) {
      return;
    }

    lastPositionRef.current = [x, y, z];
    setCameraPosition([x, y, z]);
    updatesThisSecondRef.current += 1;

    const now = Date.now();
    if (lastResetRef.current === 0) {
      lastResetRef.current = now;
    }

    if (now - lastResetRef.current >= 1000) {
      debugPerf(
        "camera-pose-update",
        { fps, updatesThisSecond: updatesThisSecondRef.current },
        1000,
      );
      updatesThisSecondRef.current = 0;
      lastResetRef.current = now;
    }
  });
}
