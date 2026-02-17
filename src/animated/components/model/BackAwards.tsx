import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackAwardsProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackAwards({ nodes, materials, onSelect }: BackAwardsProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* Awards Background */}
      <group
        position={[-2.819, 13.328, -1.33]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
        <mesh
          geometry={nodes.Plane033.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.Plane033_1.geometry}
          material={materials["Dark Blue"]}
        />
      </group>

      {/* Awards Icon */}
      <group
        position={[-6.61, 12.678, -1.475]}
        rotation={[-Math.PI / 2, -1.249, Math.PI]}
        scale={1.498}
      >
        <mesh geometry={nodes.Circle001.geometry} material={materials.Red} />
        <mesh
          geometry={nodes.Circle001_1.geometry}
          material={materials.Yellow}
        />
        <mesh
          geometry={nodes.Circle001_2.geometry}
          material={materials["Light Yellow"]}
        />
      </group>

      <mesh
        geometry={nodes.Awards_Info.geometry}
        material={materials["Dark Blue"]}
        position={[-3.101, 11.066, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.538}
      />
      <mesh
        geometry={nodes.Awards_Header.geometry}
        material={materials["Light Yellow"]}
        position={[-3.276, 12.134, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={1.385}
      />
    </ClickableGroup>
  );
}
