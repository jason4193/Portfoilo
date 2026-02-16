import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

import { debugPerf } from "@shared/utils/debug";
import {
  CAMERA_FRONT_POSITION,
  DIM_START_OFFSET,
  FOCUS_MOVE_DURATION,
  MODAL_EXPAND_DURATION,
  MODAL_START_OFFSET,
} from "@animated/constants/scene";

interface UseSectionFocusAnimationProps {
  camera: THREE.Camera; // Three.js camera instance reference
  cardObject: THREE.Object3D | null; // The card group to rotate
  isActive: boolean; // Whether focus mode is active
  focusTarget: [number, number, number] | null; // World position to focus
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

// Card rotation constants - straight back view
const CARD_BACK_ROTATION = {
  x: -1.5708, // -π/2 (back side)
  y: 1.5708, // π/2 (back side)
  z: 0,
};

export function useCameraFocus({
  camera,
  cardObject,
  focusTarget,
  isActive,
  controlsRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: UseSectionFocusAnimationProps) {
  // --- Stateful refs for camera and card focus flow ---
  const defaultPositionRef = useRef<THREE.Vector3 | null>(null);
  const defaultTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCardRotationRef = useRef<THREE.Euler | null>(null);
  const lastCameraPositionRef = useRef<THREE.Vector3 | null>(null);
  const lastTargetRef = useRef<THREE.Vector3 | null>(null);
  const lastCardRotationRef = useRef<THREE.Euler | null>(null);
  const resetTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const focusTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isMountedRef = useRef(true);

  // --- Overlay helpers (modal + dim) ---
  const hideModalOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.025,
      ease: "power2.inOut",
      onComplete: () => {
        overlay.style.pointerEvents = "none";
      },
    });
  };

  const prepareModalOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
  };

  const showModalOverlay = (
    overlay: HTMLDivElement,
    timeline: gsap.core.Timeline,
  ) => {
    // Start modal expansion during zoom phase (after card rotation)
    const startTime = FOCUS_MOVE_DURATION + MODAL_START_OFFSET;
    timeline.set(overlay, { pointerEvents: "auto" }, startTime);
    timeline.to(
      overlay,
      { opacity: 1, duration: MODAL_EXPAND_DURATION, ease: "power2.out" },
      startTime,
    );
  };

  const hideDimOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.025,
      ease: "power2.inOut",
      onComplete: () => {
        overlay.style.backdropFilter = "blur(0)";
      },
    });
  };

  const prepareDimOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { opacity: 0 });
    overlay.style.backdropFilter = "blur(0)";
  };

  const resetOverlays = () => {
    if (modalOverlayRef?.current) {
      const overlay = modalOverlayRef.current;
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
    }
    if (dimOverlayRef?.current) {
      const dimOverlay = dimOverlayRef.current;
      gsap.killTweensOf(dimOverlay);
      gsap.set(dimOverlay, { opacity: 0 });
      dimOverlay.style.backdropFilter = "blur(0)";
    }
  };

  const showDimOverlay = (
    overlay: HTMLDivElement,
    timeline: gsap.core.Timeline,
  ) => {
    // Start dim overlay during zoom phase (after card rotation)
    timeline.to(
      overlay,
      {
        opacity: 1,
        duration: FOCUS_MOVE_DURATION,
        ease: "power2.out",
        onStart: () => {
          overlay.style.backdropFilter = "blur(0.375rem)";
        },
      },
      FOCUS_MOVE_DURATION + DIM_START_OFFSET,
    );
  };

  // --- Track mounted state for safe callbacks ---
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // --- Initialize default camera + controls target + card rotation once ---
  useEffect(() => {
    if (!defaultPositionRef.current) {
      defaultPositionRef.current = new THREE.Vector3(...CAMERA_FRONT_POSITION);
      camera.position.set(...CAMERA_FRONT_POSITION);
    }
    const controls = controlsRef.current;
    if (controls && !defaultTargetRef.current) {
      defaultTargetRef.current = controls.target.clone();
    }
    if (cardObject && !defaultCardRotationRef.current) {
      defaultCardRotationRef.current = cardObject.rotation.clone();
    }
  }, [camera, controlsRef, cardObject]);

  // --- Main focus / restore effect ---
  useEffect(() => {
    const controls = controlsRef.current;
    const updateControls = () => controlsRef.current?.update?.();
    if (controls) {
      controls.enabled = !isActive;
    }

    if (resetTimelineRef.current) {
      resetTimelineRef.current.kill();
      resetTimelineRef.current = null;
    }
    if (focusTimelineRef.current) {
      focusTimelineRef.current.kill();
      focusTimelineRef.current = null;
    }

    // --- Restore flow: return camera, card rotation + hide overlays ---
    if (!focusTarget || !isActive) {
      debugPerf("focus-restore-start", {
        isActive,
        hasFocusTarget: Boolean(focusTarget),
      });
      const restorePos =
        lastCameraPositionRef.current ?? defaultPositionRef.current;
      const restoreTarget = lastTargetRef.current ?? defaultTargetRef.current;
      const restoreCardRotation =
        lastCardRotationRef.current ?? defaultCardRotationRef.current;
      if (!restorePos) return;

      resetTimelineRef.current = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      resetTimelineRef.current.to(camera.position, {
        x: restorePos.x,
        y: restorePos.y,
        z: restorePos.z,
        onUpdate: updateControls,
      });

      if (restoreTarget && controls) {
        resetTimelineRef.current.to(
          controls.target,
          {
            x: restoreTarget.x,
            y: restoreTarget.y,
            z: restoreTarget.z,
            onUpdate: updateControls,
          },
          0,
        );
      }

      // Restore card rotation to previous state using quaternion interpolation
      if (cardObject && restoreCardRotation) {
        // Create target quaternion from restore rotation
        const targetQuat = new THREE.Quaternion();
        targetQuat.setFromEuler(restoreCardRotation);

        // Store current quaternion for interpolation
        const startQuat = cardObject.quaternion.clone();

        // Animate using quaternion slerp for smooth interpolation
        const proxy = { t: 0 };
        resetTimelineRef.current.to(
          proxy,
          {
            t: 1,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              if (cardObject) {
                // Spherical linear interpolation between current and target quaternions
                cardObject.quaternion
                  .copy(startQuat)
                  .slerp(targetQuat, proxy.t);
              }
            },
            onComplete: () => {
              if (cardObject) {
                // Ensure exact final rotation
                cardObject.quaternion.copy(targetQuat);
              }
            },
          },
          0,
        );
      }
      if (modalOverlayRef?.current && modalPanelRef?.current) {
        const overlay = modalOverlayRef.current;
        hideModalOverlay(overlay);
      }
      if (dimOverlayRef?.current) {
        const dimOverlay = dimOverlayRef.current;
        hideDimOverlay(dimOverlay);
      }

      lastCameraPositionRef.current = null;
      lastTargetRef.current = null;
      lastCardRotationRef.current = null;
      return () => {
        if (resetTimelineRef.current) {
          resetTimelineRef.current.kill();
          resetTimelineRef.current = null;
        }
        resetOverlays();
      };
    }

    // --- Focus flow: save current rotation + zoom camera to section ---
    const target = new THREE.Vector3(...focusTarget);
    debugPerf("focus-animate-start", {
      focusTarget: focusTarget.join(","),
    });
    if (!lastCameraPositionRef.current) {
      lastCameraPositionRef.current = camera.position.clone();
    }
    if (controls && !lastTargetRef.current) {
      lastTargetRef.current = controls.target.clone();
    }
    if (cardObject && !lastCardRotationRef.current) {
      lastCardRotationRef.current = cardObject.rotation.clone();
    }

    if (modalOverlayRef?.current && modalPanelRef?.current) {
      const overlay = modalOverlayRef.current;
      prepareModalOverlay(overlay);
    }
    if (dimOverlayRef?.current) {
      const dimOverlay = dimOverlayRef.current;
      prepareDimOverlay(dimOverlay);
    }

    focusTimelineRef.current = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        if (!isMountedRef.current) return;
        if (modalOverlayRef?.current && modalPanelRef?.current) {
          const overlay = modalOverlayRef.current;
          gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
        }
      },
    });

    // Step 1: Rotate card to back view using quaternion interpolation
    if (cardObject) {
      // Create target quaternion for back view
      const targetQuat = new THREE.Quaternion();
      const targetEuler = new THREE.Euler(
        CARD_BACK_ROTATION.x,
        CARD_BACK_ROTATION.y,
        CARD_BACK_ROTATION.z,
        cardObject.rotation.order,
      );
      targetQuat.setFromEuler(targetEuler);

      // Store current quaternion for interpolation
      const startQuat = cardObject.quaternion.clone();

      // Animate using quaternion slerp for smooth interpolation
      const proxy = { t: 0 };
      focusTimelineRef.current.to(proxy, {
        t: 1,
        duration: FOCUS_MOVE_DURATION,
        ease: "power2.out",
        onUpdate: () => {
          if (cardObject) {
            // Spherical linear interpolation between start and target quaternions
            cardObject.quaternion.copy(startQuat).slerp(targetQuat, proxy.t);
          }
        },
        onComplete: () => {
          if (cardObject) {
            // Ensure exact final rotation
            cardObject.quaternion.copy(targetQuat);
          }
        },
      });
    }

    // Step 2: Zoom camera to target section (after card rotation completes)
    if (controls) {
      // Calculate current camera distance from its target
      const currentDistance = camera.position.distanceTo(controls.target);

      // Calculate direction from target to current camera position
      const directionToCamera = new THREE.Vector3().subVectors(
        camera.position,
        controls.target,
      );
      directionToCamera.normalize();

      // Zoom in by moving camera closer (reduce distance to 40% of original)
      const zoomedDistance = currentDistance * 0.4;
      const newCameraPos = new THREE.Vector3()
        .copy(target)
        .addScaledVector(directionToCamera, zoomedDistance);

      // Animate both camera position and target to focus point
      focusTimelineRef.current.to(
        camera.position,
        {
          x: newCameraPos.x,
          y: newCameraPos.y,
          z: newCameraPos.z,
          duration: FOCUS_MOVE_DURATION,
          onUpdate: updateControls,
        },
        FOCUS_MOVE_DURATION, // Start after card rotation completes
      );

      focusTimelineRef.current.to(
        controls.target,
        {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: FOCUS_MOVE_DURATION,
          onUpdate: updateControls,
        },
        FOCUS_MOVE_DURATION, // Start at same time as camera
      );
    }

    if (modalOverlayRef?.current && modalPanelRef?.current) {
      const overlay = modalOverlayRef.current;
      showModalOverlay(overlay, focusTimelineRef.current);
    }
    if (dimOverlayRef?.current) {
      const dimOverlay = dimOverlayRef.current;
      showDimOverlay(dimOverlay, focusTimelineRef.current);
    }

    return () => {
      if (focusTimelineRef.current) {
        focusTimelineRef.current.kill();
        focusTimelineRef.current = null;
      }
      resetOverlays();
    };
  }, [
    camera,
    cardObject,
    controlsRef,
    focusTarget,
    isActive,
    dimOverlayRef,
    modalOverlayRef,
    modalPanelRef,
  ]);
}
