import * as THREE from "three";
import { forwardRef } from "react";
import { Text3D } from "@react-three/drei";
import { useThemeStore } from "@shared/stores";
import fontUrl from "../../assets/Playwrite NZ Basic_Regular.json?url";

interface ShelfProps {
  position?: [number, number, number] | undefined;
  rotation?: [number, number, number] | undefined;
  scale?: number | [number, number, number] | undefined;
  color?: number;
  roughness?: number;
  metalness?: number;
}

export const Shelf = forwardRef<THREE.Group, ShelfProps>((props, ref) => {
  const {
    position,
    rotation,
    scale,
    color = 0xa67f5d,
    roughness = 0.8,
    metalness = 0.05,
  } = props;

  const theme = useThemeStore((state) => state.theme);

  // Theme-aware colors for the text board
  const textBoardColors = {
    light: {
      background: 0xf2dac4, // c1 - light cream
      text: 0xf2a679, // text color - dark brown
    },
    dark: {
      background: 0x0e4473, // c1Dark - dark blue
      text: 0x72e5f2, // textDark - light cyan
    },
  };

  const boardColor = textBoardColors[theme];

  // Create shelf geometry with a flat platform and subtle support structure
  const shelfGeometry = new THREE.BoxGeometry(3, 0.3, 1.25);

  const shelfMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    side: THREE.DoubleSide,
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
      dispose={null}
    >
      {/* Main shelf surface */}
      <mesh geometry={shelfGeometry} material={shelfMaterial} castShadow />

      {/* Back panel accent */}
      <mesh
        geometry={new THREE.BoxGeometry(3, 0.1, 0.1)}
        material={
          new THREE.MeshStandardMaterial({
            color,
            roughness: roughness - 0.1,
            metalness: metalness + 0.1,
            side: THREE.DoubleSide,
          })
        }
        position={[0, 0.2, 0.55]}
        castShadow
      />

      {/* Hobbies text with shadow layer (dark shadow behind) */}
      {/* <Text
        position={[0.05, 1.46, -0.35]}
        fontSize={0.5}
        fontWeight="bold"
        color={boardColor.background}
        anchorX="center"
        anchorY="middle"
      >
        Hobbies
      </Text> */}

      {/* Hobbies text main layer with depth outline */}
      <Text3D
        position={[-1.2, 1.25, -0.25]}
        font={fontUrl}
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        castShadow
      >
        <meshStandardMaterial
          color={boardColor.text}
          roughness={0.6}
          metalness={0.1}
        />
        Hobbies
      </Text3D>
    </group>
  );
});

Shelf.displayName = "Shelf";
