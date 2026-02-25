import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackProjectsProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackProjects({
  nodes,
  materials,
  onSelect,
}: BackProjectsProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      <mesh
        geometry={nodes.Projects_Icon_1.geometry}
        material={materials.Accent}
        position={[5.924, 7.988, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.738}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_Background.geometry}
        material={materials.Background}
        position={[6.204, 8.223, -1.434]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.588}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_5.geometry}
        material={materials.Primary}
        position={[5.924, 8.519, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={-0.225}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_6.geometry}
        material={materials.Primary}
        position={[6.542, 8.57, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.15}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_7.geometry}
        material={materials.Secondary}
        position={[6.542, 8.121, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.15}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_4.geometry}
        material={materials.Secondary}
        position={[6.542, 7.974, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.15}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_3.geometry}
        material={materials.Secondary}
        position={[6.542, 7.841, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.15}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Icon_2.geometry}
        material={materials.Secondary}
        position={[6.542, 7.695, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.15}
        castShadow
      />

      {/* Projects Background */}
      <group
        position={[7.148, 9.096, -1.331]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
        <mesh
          geometry={nodes.Plane034.geometry}
          material={materials.Background}
          castShadow
        />
        <mesh
          geometry={nodes.Plane034_1.geometry}
          material={materials.Secondary}
          castShadow
        />
      </group>

      <mesh
        geometry={nodes.Projects_Info.geometry}
        material={materials.Text}
        position={[6.949, 6.876, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.52}
        castShadow
      />
      <mesh
        geometry={nodes.Projects_Header.geometry}
        material={materials.Text}
        position={[5.353, 7.946, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={1.208}
        castShadow
      />
    </ClickableGroup>
  );
}
