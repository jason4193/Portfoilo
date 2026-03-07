import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useControls } from "leva";
import {
  AxesHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Vector3,
} from "three";
import * as THREE from "three";
import type { Group } from "three";

const toHex = (c: number | string | undefined): string => {
  if (c === undefined) return "#ffffff";
  if (typeof c === "string") return c.startsWith("#") ? c : "#" + c;
  let hex = c.toString(16);
  if (hex.length > 6) hex = hex.slice(0, 6);
  return "#" + hex.padStart(6, "0");
};

import {
  DESKTOP_MIN_WIDTH,
  ORBIT_MAX_DISTANCE_DESKTOP,
  ORBIT_MAX_DISTANCE_MOBILE,
  ORBIT_MIN_DISTANCE_DESKTOP,
  ORBIT_MIN_DISTANCE_MOBILE,
} from "@animated/constants/scene";
import { useCameraPoseTracker } from "@animated/hooks";
import { useDebugStore, useThemeStore, useSectionSelectionStore } from "../../shared/stores";
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
  const isFocused = useSectionSelectionStore((state) => state.isFocused);
  const {
    ambient: baseAmbientIntensity,
    key: baseKeyIntensity,
    fill: baseFillIntensity,
    rim: baseRimIntensity,
    warmAccent: baseWarmAccentIntensity,
    topFill: baseTopFillIntensity,
  } = lightIntensities;
  const lightingPreset = LIGHTING_PRESETS[theme];
  const keyLightConfig = lightingPreset.key;
  const fillLightConfig = lightingPreset.fill;
  const rimLightConfig = lightingPreset.rim;
  const warmAccentConfig = lightingPreset.warmAccent;
  const topFillConfig = lightingPreset.topFill;

  // Direct preset values — always theme-reactive
  const presetValues = {
    ambientIntensity: baseAmbientIntensity * lightingPreset.ambientMultiplier,
    ambientColor: toHex(lightingPreset.ambientColor),
    keyIntensity: baseKeyIntensity * keyLightConfig.intensityMultiplier,
    keyColor: toHex(keyLightConfig.color),
    keyPosition: keyLightConfig.position as [number, number, number],
    fillIntensity: baseFillIntensity * fillLightConfig.intensityMultiplier,
    fillColor: toHex(fillLightConfig.color),
    fillPosition: fillLightConfig.position as [number, number, number],
    rimIntensity: baseRimIntensity * rimLightConfig.intensityMultiplier,
    rimColor: toHex(rimLightConfig.color),
    rimPosition: rimLightConfig.position as [number, number, number],
    warmAccentIntensity: baseWarmAccentIntensity * warmAccentConfig.intensityMultiplier,
    warmAccentColor: toHex(warmAccentConfig.color),
    warmAccentPosition: warmAccentConfig.position as [number, number, number],
    topFillIntensity: baseTopFillIntensity * topFillConfig.intensityMultiplier,
    topFillColor: toHex(topFillConfig.color),
    topFillPosition: topFillConfig.position as [number, number, number],
  };

  // Leva overrides — only active in debug mode
  const levaAmbient = useControls("1. Ambient Light", {
    ambientIntensity: { value: presetValues.ambientIntensity, min: 0, max: 5, step: 0.1 },
    ambientColor: { value: presetValues.ambientColor },
  }, { collapsed: true }, [theme]);

  const levaKey = useControls("2. Key Light", {
    keyIntensity: { value: presetValues.keyIntensity, min: 0, max: 10, step: 0.1 },
    keyColor: { value: presetValues.keyColor },
    keyPosition: { value: presetValues.keyPosition, step: 0.1 },
  }, { collapsed: true }, [theme]);

  const levaFill = useControls("3. Fill Light", {
    fillIntensity: { value: presetValues.fillIntensity, min: 0, max: 10, step: 0.1 },
    fillColor: { value: presetValues.fillColor },
    fillPosition: { value: presetValues.fillPosition, step: 0.1 },
  }, { collapsed: true }, [theme]);

  const levaRim = useControls("4. Rim Light", {
    rimIntensity: { value: presetValues.rimIntensity, min: 0, max: 10, step: 0.1 },
    rimColor: { value: presetValues.rimColor },
    rimPosition: { value: presetValues.rimPosition, step: 0.1 },
  }, { collapsed: true }, [theme]);

  const levaWarmAccent = useControls("5. Warm Accent Light", {
    warmAccentIntensity: { value: presetValues.warmAccentIntensity, min: 0, max: 10, step: 0.1 },
    warmAccentColor: { value: presetValues.warmAccentColor },
    warmAccentPosition: { value: presetValues.warmAccentPosition, step: 0.1 },
  }, { collapsed: true }, [theme]);

  const levaTopFill = useControls("6. Top Fill Light", {
    topFillIntensity: { value: presetValues.topFillIntensity, min: 0, max: 10, step: 0.1 },
    topFillColor: { value: presetValues.topFillColor },
    topFillPosition: { value: presetValues.topFillPosition, step: 0.1 },
  }, { collapsed: true }, [theme]);

  // Use Leva values in debug mode, otherwise use preset values directly
  const ambientIntensity = debugEnabled ? levaAmbient.ambientIntensity : presetValues.ambientIntensity;
  const ambientColor = debugEnabled ? levaAmbient.ambientColor : presetValues.ambientColor;
  const keyIntensity = debugEnabled ? levaKey.keyIntensity : presetValues.keyIntensity;
  const keyColor = debugEnabled ? levaKey.keyColor : presetValues.keyColor;
  const keyPosition = debugEnabled ? levaKey.keyPosition : presetValues.keyPosition;
  const fillIntensity = debugEnabled ? levaFill.fillIntensity : presetValues.fillIntensity;
  const fillColor = debugEnabled ? levaFill.fillColor : presetValues.fillColor;
  const fillPosition = debugEnabled ? levaFill.fillPosition : presetValues.fillPosition;
  const rimIntensity = debugEnabled ? levaRim.rimIntensity : presetValues.rimIntensity;
  const rimColor = debugEnabled ? levaRim.rimColor : presetValues.rimColor;
  const rimPosition = debugEnabled ? levaRim.rimPosition : presetValues.rimPosition;
  const warmAccentIntensity = debugEnabled ? levaWarmAccent.warmAccentIntensity : presetValues.warmAccentIntensity;
  const warmAccentColor = debugEnabled ? levaWarmAccent.warmAccentColor : presetValues.warmAccentColor;
  const warmAccentPosition = debugEnabled ? levaWarmAccent.warmAccentPosition : presetValues.warmAccentPosition;
  const topFillIntensity = debugEnabled ? levaTopFill.topFillIntensity : presetValues.topFillIntensity;
  const topFillColor = debugEnabled ? levaTopFill.topFillColor : presetValues.topFillColor;
  const topFillPosition = debugEnabled ? levaTopFill.topFillPosition : presetValues.topFillPosition;
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

  // Refs for ambient light
  const ambientLightRef = useRef<any>(null);
  // Temp Color objects for lerping
  const targetColor = useMemo(() => new THREE.Color(), []);
  const LERP_SPEED = 3; // higher = faster transition
  const lerpTimer = useRef(2.0);

  useEffect(() => {
    lerpTimer.current = 0;
  }, [theme, debugEnabled]);

  // Smooth lighting transitions via useFrame
  useFrame((_, delta) => {
    if (lerpTimer.current >= 2.0) return;
    lerpTimer.current += delta;

    const t = Math.min(1, delta * LERP_SPEED);

    // Ambient
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, ambientIntensity, t);
      targetColor.set(ambientColor);
      ambientLightRef.current.color.lerp(targetColor, t);
    }

    // Key
    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, keyIntensity, t);
      targetColor.set(keyColor);
      keyLightRef.current.color.lerp(targetColor, t);
      keyLightRef.current.position.lerp(new Vector3(...keyPosition), t);
    }

    // Fill
    if (fillLightRef.current) {
      fillLightRef.current.intensity = THREE.MathUtils.lerp(fillLightRef.current.intensity, fillIntensity, t);
      targetColor.set(fillColor);
      fillLightRef.current.color.lerp(targetColor, t);
      fillLightRef.current.position.lerp(new Vector3(...fillPosition), t);
    }

    // Rim
    if (rimLightRef.current) {
      rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, rimIntensity, t);
      targetColor.set(rimColor);
      rimLightRef.current.color.lerp(targetColor, t);
      rimLightRef.current.position.lerp(new Vector3(...rimPosition), t);
    }

    // Warm Accent
    if (warmAccentLightRef.current) {
      warmAccentLightRef.current.intensity = THREE.MathUtils.lerp(warmAccentLightRef.current.intensity, warmAccentIntensity, t);
      targetColor.set(warmAccentColor);
      warmAccentLightRef.current.color.lerp(targetColor, t);
      warmAccentLightRef.current.position.lerp(new Vector3(...warmAccentPosition), t);
    }

    // Top Fill
    if (topFillLightRef.current) {
      topFillLightRef.current.intensity = THREE.MathUtils.lerp(topFillLightRef.current.intensity, topFillIntensity, t);
      targetColor.set(topFillColor);
      topFillLightRef.current.color.lerp(targetColor, t);
      topFillLightRef.current.position.lerp(new Vector3(...topFillPosition), t);
    }
  });

  return (
    <>
      {/* Lighting - studio setup with smooth theme transitions */}
      <ambientLight ref={ambientLightRef} />
      <directionalLight
        ref={keyLightRef}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-far={30}
        shadow-bias={-0.002}
      />
      <directionalLight ref={fillLightRef} />
      <directionalLight ref={rimLightRef} />
      <directionalLight ref={warmAccentLightRef} />
      <directionalLight ref={topFillLightRef} />
      {debugEnabled && <primitive object={axesHelper} />}
      {/* Camera Controls - disable drag rotation */}
      <OrbitControls
        ref={activeControlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={debugRotationMode === "orbit"}
        enabled={!isFocused}
        minDistance={minDistance}
        maxDistance={maxDistance}
        autoRotate={false}
      />
    </>
  );
}
