import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import {
  AxesHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Vector3,
} from "three";
import type { Group } from "three";

import {
  DESKTOP_MIN_WIDTH,
  ORBIT_MAX_DISTANCE_DESKTOP,
  ORBIT_MAX_DISTANCE_MOBILE,
  ORBIT_MIN_DISTANCE_DESKTOP,
  ORBIT_MIN_DISTANCE_MOBILE,
} from "@animated/constants/scene";
import { useCameraPoseTracker } from "@animated/hooks";
import { useDebugStore } from "../../shared/stores";

interface SceneRigProps {
  controlsRef?: React.RefObject<any>;
  cardRef?: React.RefObject<Group | null>;
}

export function SceneRig({ controlsRef, cardRef }: SceneRigProps) {
  const lightIntensities = useDebugStore((state) => state.lightIntensities);
  const debugRotationMode = useDebugStore((state) => state.rotationMode);
  const debugEnabled = useDebugStore((state) => state.enabled);
  const {
    ambient: ambientIntensity,
    key: keyIntensity,
    fill: fillIntensity,
    rim: rimIntensity,
  } = lightIntensities;
  useCameraPoseTracker({ fps: 30, epsilon: 0.002 });
  const internalControlsRef = useRef<any>(null);
  const activeControlsRef = controlsRef ?? internalControlsRef;
  const hasCenteredRef = useRef(false);
  const keyLightRef = useRef<DirectionalLight>(null);
  const fillLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<DirectionalLight>(null);

  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const minDistance = isDesktop
    ? ORBIT_MIN_DISTANCE_DESKTOP
    : ORBIT_MIN_DISTANCE_MOBILE;
  const maxDistance = isDesktop
    ? ORBIT_MAX_DISTANCE_DESKTOP
    : ORBIT_MAX_DISTANCE_MOBILE;

  useFrame(() => {
    if (hasCenteredRef.current) return;
    if (!cardRef?.current || !activeControlsRef.current) {
      return;
    }

    const center = new Vector3();
    cardRef.current.getWorldPosition(center);

    activeControlsRef.current.target.copy(center);
    activeControlsRef.current.update?.();

    hasCenteredRef.current = true;
  });

  useHelper(
    debugEnabled ? (keyLightRef as any) : null,
    DirectionalLightHelper,
    1,
    0x00ff9a,
  );
  useHelper(
    debugEnabled ? (fillLightRef as any) : null,
    DirectionalLightHelper,
    1,
    0x66ccff,
  );
  useHelper(
    debugEnabled ? (rimLightRef as any) : null,
    DirectionalLightHelper,
    1,
    0xffaa66,
  );

  return (
    <>
      {/* Lighting - studio setup with a right-side key to cast a slight left shadow */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        ref={keyLightRef}
        position={[4.5, 6, 6]}
        intensity={keyIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-far={25}
        shadow-bias={-0.0004}
      />
      <directionalLight
        ref={fillLightRef}
        position={[-3.5, 4, 2]}
        intensity={fillIntensity}
      />
      <directionalLight
        ref={rimLightRef}
        position={[2.5, 3, -4]}
        intensity={rimIntensity}
      />
      {debugEnabled && <primitive object={new AxesHelper(2.5)} />}
      {/* Camera Controls - disable drag rotation */}
      <OrbitControls
        ref={activeControlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={debugRotationMode === "orbit"}
        minDistance={minDistance}
        maxDistance={maxDistance}
        autoRotate={false}
      />
    </>
  );
}
