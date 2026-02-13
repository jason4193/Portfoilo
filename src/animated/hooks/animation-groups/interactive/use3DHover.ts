import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import type { Group } from "three";

import { INTERACTION_3D, EASING } from "@animated/constants/animations";
import type { Hover3DOptions } from "@animated/constants/animationTypes";

/**
 * Hook for 3D hover and press effects on Three.js groups
 * Provides scale and lift animations for interactive 3D elements
 *
 * @example
 * const groupRef = useRef<Group>(null);
 * const { hovered, pressed, handlers } = use3DHover({ groupRef });
 *
 * <group ref={groupRef} {...handlers}>
 *   {children}
 * </group>
 */
export function use3DHover({
  groupRef,
  innerRef: externalInnerRef,
  hoverScale = INTERACTION_3D.HOVER_SCALE,
  hoverLift = INTERACTION_3D.HOVER_LIFT,
  pressScale = INTERACTION_3D.PRESS_SCALE,
  pressDepth = INTERACTION_3D.PRESS_DEPTH,
  duration = INTERACTION_3D.DURATION,
  baseYRef: externalBaseYRef,
}: Hover3DOptions) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const internalBaseYRef = useRef<number | null>(null);
  const baseYRef = externalBaseYRef || internalBaseYRef;
  const pivotReadyRef = useRef(false);
  const innerRef = useRef<Group | null>(null);

  // Setup pivot point for proper rotation/scaling
  useLayoutEffect(() => {
    const group = groupRef.current;
    const inner = externalInnerRef?.current;
    if (!group || !inner || pivotReadyRef.current) return;

    innerRef.current = inner;

    const box = new THREE.Box3().setFromObject(inner);
    if (box.isEmpty()) return;

    const center = new THREE.Vector3();
    box.getCenter(center);

    group.position.copy(center);
    inner.position.set(-center.x, -center.y, -center.z);
    baseYRef.current = group.position.y;
    pivotReadyRef.current = true;
  }, [groupRef, externalInnerRef, baseYRef]);

  // Animate hover/press states
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
      duration,
      ease: EASING.DEFAULT,
    });

    gsap.to(group.position, {
      y: targetLift,
      duration,
      ease: EASING.DEFAULT,
    });
  }, [
    groupRef,
    hovered,
    pressed,
    hoverScale,
    hoverLift,
    pressScale,
    pressDepth,
    duration,
    baseYRef,
  ]);

  // Event handlers
  const handlers = {
    onPointerOver: (event: any) => {
      event.stopPropagation();
      setHovered(true);
    },
    onPointerOut: (event: any) => {
      event.stopPropagation();
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (event: any) => {
      event.stopPropagation();
      setPressed(true);
    },
    onPointerUp: (event: any) => {
      event.stopPropagation();
      setPressed(false);
    },
  };

  return {
    hovered,
    pressed,
    handlers,
    baseYRef,
  };
}
