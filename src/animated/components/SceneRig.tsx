import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { DirectionalLightHelper, AxesHelper, DirectionalLight } from "three";
import {
  DESKTOP_MIN_WIDTH,
  ORBIT_MAX_DISTANCE_DESKTOP,
  ORBIT_MAX_DISTANCE_MOBILE,
  ORBIT_MIN_DISTANCE_DESKTOP,
  ORBIT_MIN_DISTANCE_MOBILE,
} from "../constants/scene";
import { useCameraPoseTracker } from "../hooks/useCameraPoseTracker";

function CameraDebug({ throttleMs = 750 }: { throttleMs?: number }) {
  const lastLogRef = useRef(0);

  useFrame(() => {
    const now = performance.now();
    if (now - lastLogRef.current < throttleMs) return;
    lastLogRef.current = now;
  });

  return null;
}

interface SceneRigProps {
  controlsRef?: React.RefObject<any>;
}

export function SceneRig({ controlsRef }: SceneRigProps) {
  useCameraPoseTracker({ fps: 30, epsilon: 0.002 });
  const internalControlsRef = useRef<any>(null);
  const activeControlsRef = controlsRef ?? internalControlsRef;
  const dirARef = useRef<DirectionalLight>(null);
  const dirBRef = useRef<DirectionalLight>(null);

  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const minDistance = isDesktop
    ? ORBIT_MIN_DISTANCE_DESKTOP
    : ORBIT_MIN_DISTANCE_MOBILE;
  const maxDistance = isDesktop
    ? ORBIT_MAX_DISTANCE_DESKTOP
    : ORBIT_MAX_DISTANCE_MOBILE;

  // Debug light helpers can be toggled from the browser console via:
  // window.setDebugLights(true | false)
  const [debugLights, setDebugLights] = React.useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).__DEBUG_LIGHTS__ ??= false;
    setDebugLights((window as any).__DEBUG_LIGHTS__);

    (window as any).setDebugLights = (value: boolean) => {
      (window as any).__DEBUG_LIGHTS__ = value;
      setDebugLights(value);
    };

    return () => {
      if ((window as any).setDebugLights) {
        delete (window as any).setDebugLights;
      }
    };
  }, []);

  // `useHelper` expects a ref to an Object3D. Our light refs are nullable, so we cast for TS.
  useHelper(
    debugLights ? (dirARef as any) : null,
    DirectionalLightHelper,
    1,
    0x00ff00,
  );
  useHelper(
    debugLights ? (dirBRef as any) : null,
    DirectionalLightHelper,
    1,
    0xff00ff,
  );

  return (
    <>
      <CameraDebug />
      {/* Lighting - very bright for pure white card appearance */}
      <ambientLight intensity={1.2} />
      <directionalLight ref={dirARef} position={[1, 0, 3]} intensity={1.1} />
      <directionalLight ref={dirBRef} position={[-5, 2, -2]} intensity={1.2} />

      {debugLights && <primitive object={new AxesHelper(2.5)} />}

      {/* Camera Controls */}
      <OrbitControls
        ref={activeControlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={minDistance}
        maxDistance={maxDistance}
        autoRotate={false}
      />
    </>
  );
}
