import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

import { debugPerf } from "@shared/utils/debug";
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
} from "@animated/constants/scene";

interface UseSectionFocusAnimationProps {
  camera: THREE.Camera; // Three.js camera instance reference
  isActive: boolean; // Whether focus mode is active
  focusTarget: [number, number, number] | null; // World position to focus
  controlsRef: React.RefObject<any>; // Orbit controls ref for updates
  dimOverlayRef?: React.RefObject<HTMLDivElement | null>; // Dim and blur layer ref
  modalOverlayRef?: React.RefObject<HTMLDivElement | null>; // Modal backdrop overlay ref
  modalPanelRef?: React.RefObject<HTMLDivElement | null>; // Modal panel container ref
}

export function useCameraFocus({
  camera,
  focusTarget,
  isActive,
  controlsRef,
  dimOverlayRef,
  modalOverlayRef,
  modalPanelRef,
}: UseSectionFocusAnimationProps) {
  // --- Stateful refs for camera focus flow ---
  const defaultPositionRef = useRef<THREE.Vector3 | null>(null);
  const defaultTargetRef = useRef<THREE.Vector3 | null>(null);
  const lastCameraPositionRef = useRef<THREE.Vector3 | null>(null);
  const lastTargetRef = useRef<THREE.Vector3 | null>(null);
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
      BACK_MOVE_DURATION + DIM_START_OFFSET,
    );
  };

  // --- Track mounted state for safe callbacks ---
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // --- Initialize default camera + controls target once ---
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

    // --- Restore flow: return camera + hide overlays ---
    if (!focusTarget || !isActive) {
      debugPerf("focus-restore-start", {
        isActive,
        hasFocusTarget: Boolean(focusTarget),
      });
      const restorePos =
        lastCameraPositionRef.current ?? defaultPositionRef.current;
      const restoreTarget = lastTargetRef.current ?? defaultTargetRef.current;
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
      return () => {
        if (resetTimelineRef.current) {
          resetTimelineRef.current.kill();
          resetTimelineRef.current = null;
        }
        resetOverlays();
      };
    }

    // --- Focus flow: move camera + show overlays ---
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

    focusTimelineRef.current.to(camera.position, {
      x: CAMERA_BACK_POSITION[0],
      y: CAMERA_BACK_POSITION[1],
      z: CAMERA_BACK_POSITION[2],
      duration: BACK_MOVE_DURATION,
      onUpdate: updateControls,
    });

    focusTimelineRef.current.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: FOCUS_MOVE_DURATION,
      onUpdate: updateControls,
    });

    if (controls) {
      focusTimelineRef.current.to(
        controls.target,
        {
          x: target.x,
          y: target.y - FOCUS_Y_OFFSET,
          z: target.z,
          duration: FOCUS_MOVE_DURATION,
          onUpdate: updateControls,
        },
        BACK_MOVE_DURATION,
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
    controlsRef,
    focusTarget,
    isActive,
    dimOverlayRef,
    modalOverlayRef,
    modalPanelRef,
  ]);
}
