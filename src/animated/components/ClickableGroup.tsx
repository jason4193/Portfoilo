import { useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import type { Group } from "three";

import { use3DHover } from "@animation-hooks/interactive/use3DHover";
import { useDebugStore } from "@shared/stores/useDebugStore";
import { isBackFaceVisible, findRotatedParent } from "../utils/cardDetection";

interface ClickableGroupProps {
  children: ReactNode;
  hoverScale?: number;
  hoverLift?: number;
  pressScale?: number;
  pressDepth?: number;
  onClick?: (position: [number, number, number]) => void;
}

export function ClickableGroup({
  children,
  hoverScale = 1.02,
  hoverLift = -0.1,
  pressScale = 0.98,
  pressDepth = -0.02,
  onClick,
}: ClickableGroupProps) {
  const groupRef = useRef<Group | null>(null);
  const innerRef = useRef<Group | null>(null);
  const debugEnabled = useDebugStore((state) => state.enabled);
  // Use the extracted 3D hover animation hook
  const { handlers } = use3DHover({
    groupRef,
    innerRef,
    hoverScale,
    hoverLift,
    pressScale,
    pressDepth,
  });

  const handlePointerUp = (event: any) => {
    handlers.onPointerUp(event);

    if (!groupRef.current) return;
    const isBackVisible = isBackFaceVisible(groupRef.current!);

    // Debug logging
    if (debugEnabled) {
      console.log("[ClickableGroup] Click event:", {
        AbsRotatioY: findRotatedParent(groupRef.current).rotation.y.toFixed(2),
        PI_2WithOffset: (Math.PI / 2 + 0.5).toFixed(2),
        isBackVisible,
        hasGroup: !!groupRef.current,
        hasOnClick: !!onClick,
      });
    }

    // Only process click if back face is facing camera
    if (!isBackVisible) {
      if (debugEnabled) {
        console.log("[ClickableGroup] Click blocked: back face not visible");
      }
      return;
    }

    const group = groupRef.current;
    if (!group || !onClick) {
      if (debugEnabled) {
        console.log(
          "[ClickableGroup] Click blocked: no group or onClick handler",
        );
      }
      return;
    }

    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    if (debugEnabled) {
      console.log(
        "[ClickableGroup] Click processed, calling onClick with position:",
        {
          x: worldPos.x.toFixed(2),
          y: worldPos.y.toFixed(2),
          z: worldPos.z.toFixed(2),
        },
      );
    }
    onClick([worldPos.x, worldPos.y, worldPos.z]);
  };

  return (
    <group
      ref={groupRef}
      onPointerOver={handlers.onPointerOver}
      onPointerOut={handlers.onPointerOut}
      onPointerDown={handlers.onPointerDown}
      onPointerUp={handlePointerUp}
    >
      <group ref={innerRef}>{children}</group>
    </group>
  );
}
