import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import {
  BACK_MOVE_DURATION,
  CAMERA_BACK_POSITION,
  CAMERA_FRONT_POSITION,
  DIM_START_OFFSET,
  FOCUS_MOVE_DURATION,
  FOCUS_Y_OFFSET,
  FOCUS_Z,
  MODAL_EXPAND_DURATION,
  MODAL_START_OFFSET,
} from "../constants/scene";

interface UseSectionFocusAnimationProps {
  camera: THREE.Camera; // Three.js camera instance reference
  isActive: boolean; // Whether focus mode is active
  focusTarget: [number, number, number] | null; // World position to focus
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

export function useSectionFocusAnimation({
  camera,
  focusTarget,
  isActive,
  controlsRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: UseSectionFocusAnimationProps) {
  const defaultPositionRef = useRef<THREE.Vector3 | null>(null);
  const defaultTargetRef = useRef<THREE.Vector3 | null>(null);
  const lastCameraPositionRef = useRef<THREE.Vector3 | null>(null);
  const lastTargetRef = useRef<THREE.Vector3 | null>(null);

  const hideModalOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
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

  const showModalOverlay = (overlay: HTMLDivElement, timeline: gsap.core.Timeline) => {
    timeline.set(
      overlay,
      { pointerEvents: "auto" },
      BACK_MOVE_DURATION + MODAL_START_OFFSET,
    );
    timeline.to(
      overlay,
      { opacity: 1, duration: MODAL_EXPAND_DURATION, ease: "power2.out" },
      BACK_MOVE_DURATION + MODAL_START_OFFSET,
    );
  };

  const hideDimOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        overlay.style.backdropFilter = "blur(0px)";
      },
    });
  };

  const prepareDimOverlay = (overlay: HTMLDivElement) => {
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { opacity: 0 });
    overlay.style.backdropFilter = "blur(0px)";
  };

  const showDimOverlay = (overlay: HTMLDivElement, timeline: gsap.core.Timeline) => {
    timeline.to(
      overlay,
      {
        opacity: 1,
        duration: FOCUS_MOVE_DURATION,
        ease: "power2.out",
        onStart: () => {
          overlay.style.backdropFilter = "blur(6px)";
        },
      },
      BACK_MOVE_DURATION + DIM_START_OFFSET,
    );
  };

  useEffect(() => {
    if (!defaultPositionRef.current) {
      defaultPositionRef.current = new THREE.Vector3(...CAMERA_FRONT_POSITION);
      camera.position.set(...CAMERA_FRONT_POSITION);
    }
    const controls = controlsRef.current;
    if (controls && !defaultTargetRef.current) {
      defaultTargetRef.current = controls.target.clone();
    }
  }, [camera, controlsRef]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.enabled = !isActive;
    }

    if (!focusTarget || !isActive) {
      const restorePos =
        lastCameraPositionRef.current ?? defaultPositionRef.current;
      const restoreTarget = lastTargetRef.current ?? defaultTargetRef.current;
      if (!restorePos) return;

      const resetTimeline = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
      });

      resetTimeline.to(camera.position, {
        x: restorePos.x,
        y: restorePos.y,
        z: restorePos.z,
        onUpdate: () => controls?.update?.(),
      });

      if (restoreTarget && controls) {
        resetTimeline.to(
          controls.target,
          {
            x: restoreTarget.x,
            y: restoreTarget.y,
            z: restoreTarget.z,
            onUpdate: () => controls.update?.(),
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
      return;
    }

    const target = new THREE.Vector3(...focusTarget);
    if (!lastCameraPositionRef.current) {
      lastCameraPositionRef.current = camera.position.clone();
    }
    if (controls && !lastTargetRef.current) {
      lastTargetRef.current = controls.target.clone();
    }
    const cameraPos = new THREE.Vector3(
      target.x,
      target.y - FOCUS_Y_OFFSET,
      FOCUS_Z,
    );

    if (modalOverlayRef?.current && modalPanelRef?.current) {
      const overlay = modalOverlayRef.current;
      prepareModalOverlay(overlay);
    }
    if (dimOverlayRef?.current) {
      const dimOverlay = dimOverlayRef.current;
      prepareDimOverlay(dimOverlay);
    }

    const focusTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        if (modalOverlayRef?.current && modalPanelRef?.current) {
          const overlay = modalOverlayRef.current;
          gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
        }
      },
    });

    focusTimeline.to(camera.position, {
      x: CAMERA_BACK_POSITION[0],
      y: CAMERA_BACK_POSITION[1],
      z: CAMERA_BACK_POSITION[2],
      duration: BACK_MOVE_DURATION,
      onUpdate: () => controls?.update?.(),
    });

    focusTimeline.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: FOCUS_MOVE_DURATION,
      onUpdate: () => controls?.update?.(),
    });

    if (controls) {
      focusTimeline.to(
        controls.target,
        {
          x: target.x,
          y: target.y - FOCUS_Y_OFFSET,
          z: target.z,
          duration: FOCUS_MOVE_DURATION,
          onUpdate: () => controls.update?.(),
        },
        BACK_MOVE_DURATION,
      );
    }

    if (modalOverlayRef?.current && modalPanelRef?.current) {
      const overlay = modalOverlayRef.current;
      showModalOverlay(overlay, focusTimeline);
    }
    if (dimOverlayRef?.current) {
      const dimOverlay = dimOverlayRef.current;
      showDimOverlay(dimOverlay, focusTimeline);
    }
  }, [
    camera,
    controlsRef,
    focusTarget,
    isActive,
    dimOverlayRef,
    modalOverlayRef,
    modalPanelRef,
  ]);
}
