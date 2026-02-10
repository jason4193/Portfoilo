import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import PortfolioCardModel from "./model/PortfolioCardModel";
import type { SectionId } from "../constants/sections";
import type { Group } from "three";
import {
  BASE_ROTATION_X,
  BASE_ROTATION_Y,
  BASE_ROTATION_Z,
  CARD_SCALE_MAX,
  CARD_SCALE_MIN,
  VIEWPORT_WIDTH_MAX,
  VIEWPORT_WIDTH_MIN,
} from "../constants/card";

function createCardTiltAndFlowAnimation(cardGroup: Group) {
  const rotation = cardGroup.rotation;

  // Use a rotation order that reduces gimbal-lock issues
  rotation.order = "XZY";

  // Base pose (card facing camera, slightly pitched toward viewer)
  rotation.x = BASE_ROTATION_X;
  rotation.y = BASE_ROTATION_Y;
  rotation.z = BASE_ROTATION_Z;

  const timeline = gsap.timeline();

  // 1) Initial tilt-in
  timeline.to(rotation, {
    x: `-=0.05`,
    z: `-=0.10`,
    y: `+=0.10`,
    duration: 2.5,
    ease: "power2.out",
  });

  // 2) Continuous subtle "flow" – tiny rocking around that idle angle
  timeline.to(rotation, {
    x: `+=0.05`,
    duration: 3.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });

  return timeline;
}

/**
 * Card
 */
export function Card({
  isAnimationReady = false,
  onSectionSelect,
  isSectionFocused = false,
}: {
  isAnimationReady?: boolean;
  onSectionSelect?: (id: SectionId, position: [number, number, number]) => void;
  isSectionFocused?: boolean;
}) {
  const groupRef = useRef<Group | null>(null);
  const tiltTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { size } = useThree();
  const scale = useMemo(() => {
    const width = size.width;
    const t = Math.max(
      0,
      Math.min(
        1,
        (width - VIEWPORT_WIDTH_MIN) /
          (VIEWPORT_WIDTH_MAX - VIEWPORT_WIDTH_MIN),
      ),
    );
    return CARD_SCALE_MIN + (CARD_SCALE_MAX - CARD_SCALE_MIN) * t;
  }, [size.width]);

  // Small, slow right-tilt animation after mount (i.e. after loading screen),
  // then continuous subtle "flow" to keep the card feeling alive.
  useEffect(() => {
    const cardGroup = groupRef.current;
    if (!cardGroup) return;
    if (!isAnimationReady || isSectionFocused) {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
      gsap.to(cardGroup.rotation, {
        x: BASE_ROTATION_X,
        y: BASE_ROTATION_Y,
        z: BASE_ROTATION_Z,
        duration: 0.3,
        ease: "power2.out",
      });
      return;
    }

    tiltTimelineRef.current?.kill();
    tiltTimelineRef.current = createCardTiltAndFlowAnimation(cardGroup);

    return () => {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
    };
  }, [isAnimationReady, isSectionFocused]);

  return (
    <group
      ref={groupRef}
      // Base orientation (card facing camera)
      rotation={[BASE_ROTATION_X, BASE_ROTATION_Y, BASE_ROTATION_Z]}
      // Lift card slightly above origin
      position={[0, 0.1, 0]}
    >
      <PortfolioCardModel scale={scale} onSectionSelect={onSectionSelect} />
    </group>
  );
}
