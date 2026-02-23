import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

import { useThemeStore } from "../../shared/stores";
import { MODEL_MATERIAL_VARIANTS } from "../styles/model";

import modelUrl from "../assets/Portfolio_v4.glb?url";
import type { GLTFResult } from "./model/types";

export function StaticBackground() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const meshRef = useRef<any>(null);
  const theme = useThemeStore((state) => state.theme);

  useLayoutEffect(() => {
    const woodMaterial = materials["Wood 124"];
    if (woodMaterial) {
      const variantWood = MODEL_MATERIAL_VARIANTS[theme]["Wood 124"];
      // Keep the desk palette in sync with the app theme toggle
      woodMaterial.emissive.setHex(variantWood.emissive);
      woodMaterial.emissiveIntensity = variantWood.emissiveIntensity;

      if (
        variantWood.roughness !== undefined &&
        typeof woodMaterial.roughness === "number"
      ) {
        woodMaterial.roughness = variantWood.roughness;
      }
      if (
        variantWood.metalness !== undefined &&
        typeof woodMaterial.metalness === "number"
      ) {
        woodMaterial.metalness = variantWood.metalness;
      }

      const meshStandard = woodMaterial as THREE.MeshStandardMaterial;
      const textureMap = meshStandard.map as THREE.Texture | null;
      if (textureMap) {
        textureMap.colorSpace = THREE.SRGBColorSpace;
        textureMap.needsUpdate = true;
      }
      woodMaterial.needsUpdate = true;
    }

    // Enable shadow receiving
    if (meshRef.current) {
      meshRef.current.receiveShadow = true;
    }
  }, [materials, theme]);

  return (
    <group position={[0, -2, 0]}>
      <mesh
        ref={meshRef}
        geometry={nodes.Background.geometry}
        material={materials["Wood 124"]}
        rotation={[0, Math.PI / 4.5, 0]}
        scale={10}
        receiveShadow
      />
    </group>
  );
}
