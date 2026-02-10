import type { SectionProps } from "./types";

export function BackFaceBase({ nodes, materials }: SectionProps) {
  return (
    <>
      <mesh
        geometry={nodes.Circle_BL_1.geometry}
        material={materials.Yellow}
        position={[5.228, 3.847, -7.46]}
      />
      <mesh
        geometry={nodes.Circle_BL_2.geometry}
        material={materials["Dark Blue"]}
        position={[4.675, 3.847, -6.431]}
      />
      <group position={[5.709, 3.847, -4.631]}>
        <mesh geometry={nodes.Circle020.geometry} material={materials.Red} />
        <mesh geometry={nodes.Circle020_1.geometry} material={materials.Yellow} />
      </group>
      <mesh
        geometry={nodes.Circle_BL_4.geometry}
        material={materials["Dark Blue"]}
        position={[3.241, 3.847, -7.994]}
      />
      <mesh
        geometry={nodes.Plane_BR_1.geometry}
        material={materials.Red}
        position={[4.76, 3.847, 7.03]}
        scale={0.972}
      />
      <mesh
        geometry={nodes.Plane_BR_2.geometry}
        material={materials["Dark Blue"]}
        position={[2.817, 3.847, 7.03]}
        scale={0.972}
      />
      <mesh
        geometry={nodes.Plane_BR_3.geometry}
        material={materials.Yellow}
        position={[4.76, 3.847, 5.087]}
        scale={0.972}
      />
      <mesh
        geometry={nodes.Plane_BR_4.geometry}
        material={materials.Yellow}
        position={[3.219, 3.847, 6.627]}
        rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
        scale={0.972}
      />
      <mesh
        geometry={nodes.Plane_BR_5.geometry}
        material={materials.Red}
        position={[5.732, 3.847, 4.115]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.972}
      />
    </>
  );
}
