import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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
import { useDebugStore, useThemeStore } from "../../shared/stores";
import { LIGHTING_PRESETS } from "@animated/constants/scene";

interface SceneRigProps {
  controlsRef?: React.RefObject<any>;
  cardRef?: React.RefObject<Group | null>;
}

export function SceneRig({ controlsRef, cardRef }: SceneRigProps) {
  const lightIntensities = useDebugStore((state) => state.lightIntensities);
  const debugRotationMode = useDebugStore((state) => state.rotationMode);
  const debugEnabled = useDebugStore((state) => state.enabled);
  const theme = useThemeStore((state) => state.theme);
  const {
    ambient: baseAmbientIntensity,
    key: baseKeyIntensity,
    fill: baseFillIntensity,
    rim: baseRimIntensity,
    warmAccent: baseWarmAccentIntensity,
    topFill: baseTopFillIntensity,
  } = lightIntensities;
  const lightingPreset = LIGHTING_PRESETS[theme];
  const ambientIntensity =
    baseAmbientIntensity * lightingPreset.ambientMultiplier;
  const keyLightConfig = lightingPreset.key;
  const fillLightConfig = lightingPreset.fill;
  const rimLightConfig = lightingPreset.rim;
  const warmAccentConfig = lightingPreset.warmAccent;
  const topFillConfig = lightingPreset.topFill;
  const keyIntensity = baseKeyIntensity * keyLightConfig.intensityMultiplier;
  const fillIntensity = baseFillIntensity * fillLightConfig.intensityMultiplier;
  const rimIntensity = baseRimIntensity * rimLightConfig.intensityMultiplier;
  const warmAccentIntensity = baseWarmAccentIntensity * warmAccentConfig.intensityMultiplier;
  const topFillIntensity = baseTopFillIntensity * topFillConfig.intensityMultiplier;
  useCameraPoseTracker({ fps: 30, epsilon: 0.002 });
  const internalControlsRef = useRef<any>(null);
  const activeControlsRef = controlsRef ?? internalControlsRef;
  const hasCenteredRef = useRef(false);
  const keyLightRef = useRef<DirectionalLight>(null);
  const fillLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<DirectionalLight>(null);
  const warmAccentLightRef = useRef<DirectionalLight>(null);
  const topFillLightRef = useRef<DirectionalLight>(null);

  const isDesktop = useMediaQuery({ minWidth: DESKTOP_MIN_WIDTH });
  const minDistance = isDesktop
    ? ORBIT_MIN_DISTANCE_DESKTOP
    : ORBIT_MIN_DISTANCE_MOBILE;
  const maxDistance = isDesktop
    ? ORBIT_MAX_DISTANCE_DESKTOP
    : ORBIT_MAX_DISTANCE_MOBILE;

  // Memoize AxesHelper to avoid creating a new instance on every render
  const axesHelper = useMemo(() => new AxesHelper(2.5), []);

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
  useHelper(
    debugEnabled ? (warmAccentLightRef as any) : null,
    DirectionalLightHelper,
    1,
    0xffdd44,
  );
  useHelper(
    debugEnabled ? (topFillLightRef as any) : null,
    DirectionalLightHelper,
    1,
    0x88ccff,
  );

  return (
    <>
      {/* Lighting - studio setup with theme-aware ratios */}
      <ambientLight
        intensity={ambientIntensity}
        color={lightingPreset.ambientColor}
      />
      <directionalLight
        ref={keyLightRef}
        position={keyLightConfig.position}
        intensity={keyIntensity}
        color={keyLightConfig.color}
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
        position={fillLightConfig.position}
        intensity={fillIntensity}
        color={fillLightConfig.color}
      />
      <directionalLight
        ref={rimLightRef}
        position={rimLightConfig.position}
        intensity={rimIntensity}
        color={rimLightConfig.color}
      />
      <directionalLight
        ref={warmAccentLightRef}
        position={warmAccentConfig.position}
        intensity={warmAccentIntensity}
        color={warmAccentConfig.color}
      />
      <directionalLight
        ref={topFillLightRef}
        position={topFillConfig.position}
        intensity={topFillIntensity}
        color={topFillConfig.color}
      />
      {debugEnabled && <primitive object={axesHelper} />}
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
