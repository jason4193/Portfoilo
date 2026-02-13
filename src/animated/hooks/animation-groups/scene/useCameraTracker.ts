import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import { useCameraPoseStore } from "@shared/stores";
import { debugPerf } from "@shared/utils/debug";

interface CameraPoseTrackerOptions {
  fps?: number;
  epsilon?: number;
}

export function useCameraTracker({
  fps = 30,
  epsilon = 0.001,
}: CameraPoseTrackerOptions = {}) {
  const { camera } = useThree();
  const setCameraPosition = useCameraPoseStore(
    (state) => state.setCameraPosition,
  );
  const lastPositionRef = useRef<[number, number, number]>([0, 0, 0]);
  const elapsedRef = useRef(0);
  const interval = 1 / fps;

  const updatesThisSecondRef = useRef(0);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    if (elapsedRef.current < interval) return;
    elapsedRef.current = 0;

    const x = camera.position.x;
    const y = camera.position.y;
    const z = camera.position.z;
    const [lx, ly, lz] = lastPositionRef.current;

    if (
      Math.abs(x - lx) < epsilon &&
      Math.abs(y - ly) < epsilon &&
      Math.abs(z - lz) < epsilon
    ) {
      return;
    }

    lastPositionRef.current = [x, y, z];
    setCameraPosition([x, y, z]);
    updatesThisSecondRef.current += 1;
    debugPerf(
      "camera-pose-update",
      { fps, updatesThisSecond: updatesThisSecondRef.current },
      1000,
    );
    updatesThisSecondRef.current = 0;
  });
}
