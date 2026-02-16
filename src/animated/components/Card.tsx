import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import PortfolioCardModel from "./model/PortfolioCardModel";
import type { Group } from "three";
import * as THREE from "three";
import {
  BASE_ROTATION_X,
  BASE_ROTATION_Y,
  BASE_ROTATION_Z,
  CARD_SCALE_MAX,
  CARD_SCALE_MIN,
  VIEWPORT_WIDTH_MAX,
  VIEWPORT_WIDTH_MIN,
} from "../constants/card";
import { useSectionSelectionStore } from "../../shared/stores";
import { useObjectRotation } from "../hooks/useObjectRotation";

function createCardTiltAndFlowAnimation(cardGroup: Group) {
  const rotation = cardGroup.rotation;
  // Use a rotation order that reduces gimbal-lock issues
  rotation.order = "XZY";

  // Base pose (card facing camera, slightly pitched toward viewer)
  rotation.x = BASE_ROTATION_X;
  rotation.y = BASE_ROTATION_Y;
  rotation.z = BASE_ROTATION_Z;

  const timeline = gsap.timeline();
  const tiltQuat = new THREE.Quaternion();

  // 1) Initial tilt-in
  timeline.to(rotation, {
    x: `-=0.05`,
    z: `-=0.10`,
    y: `+=0.10`,
    duration: 0.8,
    ease: "power2.out",
    onUpdate: () => {
      tiltQuat.copy(cardGroup.quaternion);
    },
    onComplete: () => {
      tiltQuat.copy(cardGroup.quaternion);
    },
  });

  // 1b) Flip hint so users know the card is rotatable (full 360 on Z)
  const flipProxy = { angle: 0 };
  const startQuat = new THREE.Quaternion();
  const localAxis = new THREE.Vector3(1, 0, 0);
  timeline.to(
    flipProxy,
    {
      angle: -Math.PI * 2,
      duration: 2,
      ease: "power2.inOut",
      onStart: () => {
        flipProxy.angle = 0;
        if (tiltQuat.lengthSq() > 0) {
          startQuat.copy(tiltQuat);
        } else {
          startQuat.setFromEuler(cardGroup.rotation);
        }
        cardGroup.quaternion.copy(startQuat);
      },
      onUpdate: () => {
        const deltaQuat = new THREE.Quaternion().setFromAxisAngle(
          localAxis,
          flipProxy.angle,
        );
        cardGroup.quaternion.copy(startQuat).multiply(deltaQuat);
      },
    },
    ">-0.1",
  );

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

function createCardIdleResumeAnimation(cardGroup: Group) {
  const rotation = cardGroup.rotation;

  // Use a rotation order that reduces gimbal-lock issues
  rotation.order = "XZY";

  const timeline = gsap.timeline();

  // Ease back toward the base pose before resuming idle flow
  timeline.to(rotation, {
    x: BASE_ROTATION_X,
    y: BASE_ROTATION_Y,
    z: BASE_ROTATION_Z,
    duration: 0.8,
    ease: "power2.out",
  });

  // Continuous subtle "flow" – tiny rocking around that idle angle
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
  cardRef,
  isAnimationReady = false,
}: {
  cardRef?: React.RefObject<Group | null>;
  isAnimationReady?: boolean;
}) {
  const isSectionFocused = useSectionSelectionStore((state) => state.isFocused);
  const internalGroupRef = useRef<Group | null>(null);
  const groupRef = cardRef || internalGroupRef;
  const tiltTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  const idleStartModeRef = useRef<"initial" | "resume">("initial");
  const clearVelocityRef = useRef<(() => void) | null>(null);
  const [isIdleActive, setIsIdleActive] = useState(false);
  const { size, gl } = useThree();
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

  // Enable object rotation only when not animating and not focused on a section
  const rotationEnabled = isAnimationReady && !isSectionFocused;

  const { isInteracting, clearRotationVelocity } = useObjectRotation({
    object: groupRef.current,
    domElement: gl.domElement,
    enabled: rotationEnabled,
    rotateSpeed: 0.5,
    dampingFactor: 0.05,
  });

  // Store the clear velocity function for use in other effects
  useEffect(() => {
    clearVelocityRef.current = clearRotationVelocity;
  }, [clearRotationVelocity]);

  // Clear rotation velocity when section is focused to prevent momentum flicks
  useEffect(() => {
    if (isSectionFocused && clearVelocityRef.current) {
      clearVelocityRef.current();
    }
  }, [isSectionFocused]);

  // GSAP tilt animation runs after idle delay and pauses during interaction
  useEffect(() => {
    const cardGroup = groupRef.current;
    if (!cardGroup) return;

    if (idleTimeoutRef.current) {
      window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }

    // Only reset rotation when not ready or section is focused
    if (!isAnimationReady || isSectionFocused) {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
      setIsIdleActive(false);
      // Don't animate if section is focused - preserve current rotation
      if (!isAnimationReady) {
        gsap.to(cardGroup.rotation, {
          x: BASE_ROTATION_X,
          y: BASE_ROTATION_Y,
          z: BASE_ROTATION_Z,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      return;
    }

    if (isInteracting) {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
      setIsIdleActive(false);
      idleStartModeRef.current = "resume";
      return;
    }

    // Start idle immediately on first entry, otherwise wait 10s after interaction
    if (idleStartModeRef.current === "resume") {
      idleTimeoutRef.current = window.setTimeout(() => {
        setIsIdleActive(true);
      }, 10000);
    } else {
      idleStartModeRef.current = "initial";
      setIsIdleActive(true);
    }

    return () => {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
    };
  }, [isAnimationReady, isSectionFocused, isInteracting]);

  useEffect(() => {
    const cardGroup = groupRef.current;
    if (!cardGroup) return;
    if (!isIdleActive) return;

    tiltTimelineRef.current?.kill();
    tiltTimelineRef.current =
      idleStartModeRef.current === "initial"
        ? createCardTiltAndFlowAnimation(cardGroup)
        : createCardIdleResumeAnimation(cardGroup);

    return () => {
      tiltTimelineRef.current?.kill();
      tiltTimelineRef.current = null;
    };
  }, [isIdleActive]);
  return (
    <group
      ref={groupRef}
      // Base orientation (card facing camera)
      rotation={[BASE_ROTATION_X, BASE_ROTATION_Y, BASE_ROTATION_Z]}
      // Lift card slightly above origin
      position={[0, 0.1, 0]}
    >
      <PortfolioCardModel scale={scale} />
    </group>
  );
}
