import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";
import * as THREE from "three";
import type { Group } from "three";

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
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const baseYRef = useRef<number | null>(null);
  const pivotReadyRef = useRef(false);

  useLayoutEffect(() => {
    const group = groupRef.current;
    const inner = innerRef.current;
    if (!group || !inner || pivotReadyRef.current) return;

    const box = new THREE.Box3().setFromObject(inner);
    if (box.isEmpty()) return;

    const center = new THREE.Vector3();
    box.getCenter(center);

    group.position.copy(center);
    inner.position.set(-center.x, -center.y, -center.z);
    baseYRef.current = group.position.y;
    pivotReadyRef.current = true;
  }, []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    if (baseYRef.current == null) {
      baseYRef.current = group.position.y;
    }

    const targetScale = pressed ? pressScale : hovered ? hoverScale : 1;
    const targetLift =
      (baseYRef.current ?? 0) +
      (hovered ? hoverLift : 0) +
      (pressed ? pressDepth : 0);

    gsap.to(group.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.15,
      ease: "power2.out",
    });

    gsap.to(group.position, {
      y: targetLift,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [hovered, pressed, hoverScale, hoverLift, pressScale, pressDepth]);

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        setPressed(true);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        setPressed(false);
        const group = groupRef.current;
        if (!group || !onClick) return;
        const worldPos = new THREE.Vector3();
        group.getWorldPosition(worldPos);
        onClick([worldPos.x, worldPos.y, worldPos.z]);
      }}
    >
      <group ref={innerRef}>{children}</group>
    </group>
  );
}
