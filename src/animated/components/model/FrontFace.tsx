import type { SectionProps } from "./types";

export function FrontFace({ nodes, materials }: SectionProps) {
  return (
    <>
      <mesh
        geometry={nodes.Card.geometry}
        material={materials["Light Yellow"]}
        position={[0.908, 3.972, 0]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-4.823, -6, -8.001]}
      />
      <mesh
        geometry={nodes.Circle_FL_1.geometry}
        material={materials["Dark Blue"]}
        position={[5.726, 3.972, 5.007]}
        scale={0.571}
      />
      <group position={[-2.664, 4.172, 5.954]} rotation={[0, -1.379, Math.PI]}>
        <mesh
          geometry={nodes.BézierCurve002.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.BézierCurve002_1.geometry}
          material={materials["Dark Blue"]}
        />
        <mesh
          geometry={nodes.BézierCurve002_2.geometry}
          material={materials.Yellow}
        />
      </group>
      <mesh
        geometry={nodes.Title_F_1.geometry}
        material={materials["Dark Blue"]}
        position={[0.343, 4.072, 4.465]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.546}
      />
      <mesh
        geometry={nodes.Plane_FR_1.geometry}
        material={materials.Yellow}
        position={[0.11, 3.972, -6.376]}
        scale={0.827}
      />
      <mesh
        geometry={nodes.Cross_FL.geometry}
        material={materials["Dark Blue"]}
        position={[5.732, 4.072, 6.047]}
        rotation={[0, 0, -Math.PI]}
        scale={[2.641, 0.11, 0.042]}
      />
      <mesh
        geometry={nodes.Plane_FL_1.geometry}
        material={materials["Dark Blue"]}
        position={[-3.898, 3.972, 5.979]}
        scale={[4.815, 0.999, 0.999]}
      />
      <mesh
        geometry={nodes.Plane_FL_2.geometry}
        material={materials.Red}
        position={[-3.898, 3.972, 5.979]}
        scale={[4.815, 0.999, 0.999]}
      />
      <mesh
        geometry={nodes.Plane_FR_2.geometry}
        material={materials["Dark Blue"]}
        position={[5.732, 4.105, -8.001]}
        scale={0.813}
      />
      <mesh
        geometry={nodes["Plane-R-001"].geometry}
        material={materials["Dark Blue"]}
        position={[3.293, 3.972, -5.563]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Title_F_2.geometry}
        material={materials["Dark Blue"]}
        position={[1.872, 4.072, 2.087]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.974}
      />
      <mesh
        geometry={nodes.Star_F.geometry}
        material={materials["Dark Blue"]}
        position={[-2.322, 3.972, -6.457]}
      />
      <mesh
        geometry={nodes.Tri_FL_1.geometry}
        material={materials.Yellow}
        position={[-3.915, 3.972, 8.001]}
        scale={1.499}
      />
      <mesh
        geometry={nodes.Tri_FR_1.geometry}
        material={materials.Yellow}
        position={[3.293, 4.113, -8.001]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_2.geometry}
        material={materials.Red}
        position={[-3.102, 4.113, -3.938]}
        rotation={[0, 0, -Math.PI]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_3.geometry}
        material={materials.Red}
        position={[4.919, 4.113, -4.75]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_4.geometry}
        material={materials.Red}
        position={[4.919, 4.113, -3.125]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_5.geometry}
        material={materials["Dark Blue"]}
        position={[4.106, 4.113, -3.938]}
        rotation={[-Math.PI, 1.571, 0]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_6.geometry}
        material={materials.Yellow}
        position={[4.919, 4.113, -6.376]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_7.geometry}
        material={materials["Dark Blue"]}
        position={[-3.915, 4.113, -5.563]}
        rotation={[-Math.PI, 1.571, 0]}
        scale={0.813}
      />
      <mesh
        geometry={nodes.Tri_FR_8.geometry}
        material={materials["Dark Blue"]}
        position={[3.436, 3.972, -3.924]}
        rotation={[0, Math.PI / 2, 0]}
        scale={2.237}
      />
    </>
  );
}
