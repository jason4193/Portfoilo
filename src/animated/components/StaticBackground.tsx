import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

import modelUrl from "../assets/Portfolio_v4.glb?url";
import type { GLTFResult } from "./model/types";
import { Camera } from "./model/CameraModel";
import { Shoes } from "./model/ShoesModel";
import { Shelf } from "./model/Shelf";
import { ClickableGroup } from "./ClickableGroup";
import { useMediaQuery } from "react-responsive";

export function StaticBackground() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const meshRef = useRef<any>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const responsiveProps = {
    scale: isMobile ? 0.6 : 0.9, // scale down for smaller screens
    position: (isMobile ? [1.2, 0.8, -5.5] : [-1, 0.3, 0]) as [
      number,
      number,
      number,
    ], // adjust position for mobile
  };

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
      {/* Hoobbies Shelf */}
      <group position={responsiveProps.position} scale={responsiveProps.scale}>
        <Shelf
          position={[-4.5, 1.8, -8.5]}
          scale={1.2}
          rotation={[0, Math.PI / 4.5, 0]}
          color={0xa67f5d}
          roughness={0.78}
          metalness={0.12}
        />

        {/* Camera scaled down and positioned on top of shelf */}
        <ClickableGroup>
          <Camera
            position={[-5, 2, -8]}
            scale={0.75}
            rotation={[0, Math.PI / 4.5, 0]}
          />
        </ClickableGroup>

        {/* Shoes scaled down and positioned on top of shelf */}
        <ClickableGroup>
          <Shoes
            position={[-4, 1.9, -9]}
            scale={0.8}
            rotation={[0, Math.PI / 2.5, 0]}
          />
        </ClickableGroup>
      </group>
    </group>
  );
}
