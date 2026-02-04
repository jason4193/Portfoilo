import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Card } from "./Card";
import { DirectionalLightHelper, AxesHelper, DirectionalLight } from "three";

function CameraDebug({ throttleMs = 750 }: { throttleMs?: number }) {
  const lastLogRef = useRef(0);

  useFrame(() => {
    const now = performance.now();
    if (now - lastLogRef.current < throttleMs) return;
    lastLogRef.current = now;
  });

  return null;
}

export function StudioLight({
  isAnimationReady = false,
}: {
  isAnimationReady?: boolean;
}) {
  const controlsRef = useRef<any>(null);
  const dirARef = useRef<DirectionalLight>(null);
  const dirBRef = useRef<DirectionalLight>(null);

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
  useHelper(debugLights ? (dirARef as any) : null, DirectionalLightHelper, 1, 0x00ff00);
  useHelper(debugLights ? (dirBRef as any) : null, DirectionalLightHelper, 1, 0xff00ff);

  return (
    <>
      <CameraDebug />
      {/* Lighting - very bright for pure white card appearance */}
      <ambientLight intensity={1.2} />
      <directionalLight
        ref={dirARef}
        position={[1, 0, 3]}
        intensity={1.1}
      />
      <directionalLight ref={dirBRef} position={[-5, 5, -5]} intensity={0.8} />


      {debugLights && <primitive object={new AxesHelper(2.5)} />}

      {/* Camera Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
        
      />

      {/* Business Card */}
      <Card isAnimationReady={isAnimationReady} />
    </>
  );
}
