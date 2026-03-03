import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

import modelUrl from "../assets/Portfolio_v4.glb?url";
import type { GLTFResult } from "./model/types";
import { FloatingHobbies } from "./FloatingHobbies";

export function StaticBackground() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const meshRef = useRef<any>(null);

  return (
    <group position={[0, -2, 0]}>
      <mesh
        ref={meshRef}
        geometry={nodes.Background.geometry}
        material={materials.Background}
        rotation={[0, Math.PI / 4.5, 0]}
        scale={10}
        receiveShadow
      />
      {/* Floating hobby objects orbiting around the card */}
      <FloatingHobbies />
    </group>
  );
}
