import type { SectionProps } from "./types";

interface FrontFaceProps extends SectionProps {
  cardPosition: [number, number, number];
}

export function FrontFace({ nodes, materials, cardPosition }: FrontFaceProps) {
  return (
    <>
      <mesh
        geometry={nodes.Card.geometry}
        material={materials.Base}
        position={cardPosition}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[-4.823, -6, -8.001]}
        castShadow
      />
      <mesh
        geometry={nodes.Circle_FL_1.geometry}
        material={materials.Primary}
        position={[-5.114, 4.338, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.571}
        castShadow
      />
      <group
        position={[-6.062, 12.729, -1]}
        rotation={[-Math.PI / 2, -0.192, 0]}
      >
        <mesh
          geometry={nodes.BézierCurve002.geometry}
          material={materials.Base}
          castShadow
        />
        <mesh
          geometry={nodes.BézierCurve002_1.geometry}
          material={materials.Primary}
          castShadow
        />
        <mesh
          geometry={nodes.BézierCurve002_2.geometry}
          material={materials.Secondary}
          castShadow
        />
      </group>
      <mesh
        geometry={nodes.Title_F_1.geometry}
        material={materials.Text}
        position={[-4.572, 9.721, -1.1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.546}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_FR_1.geometry}
        material={materials.Secondary}
        position={[6.269, 9.955, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.827}
        castShadow
      />
      <mesh
        geometry={nodes.Cross_FL.geometry}
        material={materials.Primary}
        position={[-6.285, 7.38, -1.114]}
        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        scale={[2.641, 0.11, 0.042]}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_FL_1.geometry}
        material={materials.Primary}
        position={[-6.086, 13.963, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[4.815, 0.999, 0.999]}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_FL_2.geometry}
        material={materials.Accent}
        position={[-6.086, 13.963, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[4.815, 0.999, 0.999]}
        castShadow
      />
      <mesh
        geometry={nodes.Plane_FR_2.geometry}
        material={materials.Primary}
        position={[7.894, 4.333, -1.067]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes["Plane-R-001"].geometry}
        material={materials.Primary}
        position={[5.456, 6.771, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Title_F_2.geometry}
        material={materials.Text}
        position={[-2.194, 8.193, -1.1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.974}
        castShadow
      />
      <mesh
        geometry={nodes.Star_F.geometry}
        material={materials.Primary}
        position={[6.35, 12.387, -1.2]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FL_1.geometry}
        material={materials.Secondary}
        position={[-8.109, 13.979, -1.2]}
        rotation={[Math.PI / 2, -1.571, 0]}
        scale={1.499}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_1.geometry}
        material={materials.Secondary}
        position={[7.894, 6.771, -1.059]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_2.geometry}
        material={materials.Accent}
        position={[3.83, 13.167, -1.059]}
        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_3.geometry}
        material={materials.Accent}
        position={[4.643, 5.146, -1.059]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_4.geometry}
        material={materials.Accent}
        position={[3.018, 5.146, -1.059]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_5.geometry}
        material={materials.Primary}
        position={[3.83, 5.959, -1.059]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_6.geometry}
        material={materials.Secondary}
        position={[6.269, 5.146, -1.059]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_7.geometry}
        material={materials.Primary}
        position={[5.456, 13.979, -1.059]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={0.813}
        castShadow
      />
      <mesh
        geometry={nodes.Tri_FR_8.geometry}
        material={materials.Primary}
        position={[3.817, 6.629, -1.2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.237}
      />
    </>
  );
}
