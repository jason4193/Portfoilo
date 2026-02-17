import { useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { useThree } from "@react-three/fiber";

import { use3DHover } from "@animation-hooks/interactive/use3DHover";
import { useDebugStore } from "@shared/stores/useDebugStore";

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
  const { camera } = useThree();
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

  // Check if the back face is facing the camera
  const isBackFacingCamera = (): boolean => {
    if (!groupRef.current || !camera) return false;

    let group = groupRef.current;

    // Traverse up to find the parent with actual rotation (not 0,0,0)
    let rotatedParent = group;
    while (group.parent) {
      const rot = group.rotation;
      if (
        Math.abs(rot.x) > 0.1 ||
        Math.abs(rot.y) > 0.1 ||
        Math.abs(rot.z) > 0.1
      ) {
        rotatedParent = group;
        break;
      }
      group = group.parent as Group;

      // Safety exit if we go too high
      if (!group.parent) {
        rotatedParent = group;
        break;
      }
    }

    // Check if card rotation indicates back is visible
    // Back is visible when card has rotated more than 90 degrees (π/2)
    // This handles rotation in both directions on Y axis
    const x = rotatedParent.rotation.x;
    const y = rotatedParent.rotation.y;

    const PI_2 = Math.PI / 2; // ~1.5708 (90°)
    const OFF_SET = 0.5; // Small offset to ensure back face is clearly visible, not edge-on

    // Back is visible when |y| > π/2 (rotated more than 90 degrees from front)
    const isBackVisible = Math.abs(y) > PI_2 + OFF_SET;

    if (debugEnabled) {
      console.log("[isBackFacingCamera] Check:", {
        x: x.toFixed(4),
        y: y.toFixed(4),
        absY: Math.abs(y).toFixed(4),
        "π/2 + offset": (PI_2 + OFF_SET).toFixed(4),
        "IsBackVisible: |y| > π/2 + offset": isBackVisible,
      });
    }

    return isBackVisible;
  };

  const handlePointerUp = (event: any) => {
    handlers.onPointerUp(event);

    const isBackVisible = isBackFacingCamera();

    // Debug logging
    if (debugEnabled) {
      console.log("[ClickableGroup] Click event:", {
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
