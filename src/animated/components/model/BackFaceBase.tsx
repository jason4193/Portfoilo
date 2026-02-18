import type { SectionProps } from "./types";

export function BackFaceBase({ nodes, materials }: SectionProps) {
  return (
    <>
      <mesh
        geometry={nodes.Circle_BL_1.geometry}
        material={materials.Yellow}
        position={[7.353, 4.837, -1.325]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        castShadow
      />
      <mesh
        geometry={nodes.Circle_BL_2.geometry}
        material={materials["Dark Blue"]}
        position={[6.324, 5.39, -1.325]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        castShadow
      />
      <group
        position={[4.524, 4.355, -1.325]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      >
        <mesh
          geometry={nodes.Circle020.geometry}
          material={materials.Red}
          castShadow
        />
        <mesh
          geometry={nodes.Circle020_1.geometry}
          material={materials.Yellow}
          castShadow
        />
      </group>
      <mesh
        geometry={nodes.Circle_BL_4.geometry}
        material={materials["Dark Blue"]}
        position={[7.887, 6.824, -1.325]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_BR_1.geometry}
        material={materials.Red}
        position={[-7.137, 5.305, -1.325]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={0.972}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_BR_2.geometry}
        material={materials["Dark Blue"]}
        position={[-7.137, 7.248, -1.325]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={0.972}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_BR_3.geometry}
        material={materials.Yellow}
        position={[-5.194, 5.305, -1.325]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={0.972}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_BR_4.geometry}
        material={materials.Yellow}
        position={[-6.735, 6.845, -1.325]}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
        scale={0.972}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_BR_5.geometry}
        material={materials.Red}
        position={[-4.222, 4.333, -1.325]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={0.972}
        castShadow
      />
    </>
  );
}
