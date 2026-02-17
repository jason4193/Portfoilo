import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";

import modelUrl from "../assets/Portfolio_v4.glb?url";
import type { GLTFResult } from "./model/types";

export function StaticBackground() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const meshRef = useRef<any>(null);

  useLayoutEffect(() => {
    const woodMaterial = materials["Wood 124"];
    if (woodMaterial) {
      // Brighten the wood material by adding emissive color
      woodMaterial.emissive.setHex(0x8b6f47); // Light brown emissive
      woodMaterial.emissiveIntensity = 0.4;
      woodMaterial.needsUpdate = true;
    }

    // Enable shadow receiving
    if (meshRef.current) {
      meshRef.current.receiveShadow = true;
    }
  }, [materials]);

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
