import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import PortfolioCardModel from "../models/PortfolioCardModel_v3";
import type { Group } from "three";
import {
  CARD_SCALE_DESKTOP,
  CARD_SCALE_MOBILE,
  DESKTOP_MIN_WIDTH,
} from "../constants/card";

function createCardTiltAndFlowAnimation(cardGroup: Group) {
  const rotation = cardGroup.rotation;

  // Use a rotation order that reduces gimbal-lock issues
  rotation.order = "XZY";

  // Base pose (card facing camera, slightly pitched toward viewer)
  rotation.x = 1.57; // ≈ 90° around X
  rotation.y = -1.57; // ≈ -90° around Y
  rotation.z = 0; // no roll yet

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
}: {
  isAnimationReady?: boolean;
}) {
  const groupRef = useRef<Group | null>(null);
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const scale = isDesktop ? CARD_SCALE_DESKTOP : CARD_SCALE_MOBILE;

  // Small, slow right-tilt animation after mount (i.e. after loading screen),
  // then continuous subtle "flow" to keep the card feeling alive.
  useEffect(() => {
    if (!isAnimationReady) return;
    const cardGroup = groupRef.current;
    if (!cardGroup) return;

    const ctx = gsap.context(() => {
      createCardTiltAndFlowAnimation(cardGroup);
    });

    return () => {
      ctx.revert();
    };
  }, [isAnimationReady]);

  return (
    <group
      ref={groupRef}
      // Base orientation (card facing camera)
      rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      // Lift card slightly above origin
      position={[0, 0.1, 0]}
    >
      <PortfolioCardModel scale={scale} />
    </group>
  );
}
