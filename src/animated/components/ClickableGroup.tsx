import { useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import type { Group } from "three";

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
    const group = groupRef.current;
    if (!group || !onClick) return;
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
