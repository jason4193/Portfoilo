import { useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { useThree } from "@react-three/fiber";

import { use3DHover } from "@animation-hooks/interactive/use3DHover";

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
    // When back is visible: x ≈ -π/2 (negative ~-90°) AND y ≈ π/2 (positive ~90°)
    // The key is that x is NEGATIVE and y is POSITIVE
    const x = rotatedParent.rotation.x;
    const y = rotatedParent.rotation.y;

    const PI_4 = Math.PI / 4; // ~0.785 (45°)
    // Back is visible when x is negative AND large, AND y is positive AND large
    const isBackVisible = x < -PI_4 && y > PI_4;

    return isBackVisible;
  };

  const handlePointerUp = (event: any) => {
    handlers.onPointerUp(event);

    const isBackVisible = isBackFacingCamera();

    // Only process click if back face is facing camera
    if (!isBackVisible) {
      return;
    }

    const group = groupRef.current;
    if (!group || !onClick) {
      return;
    }

    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
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
