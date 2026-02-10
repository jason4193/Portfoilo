import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackAwardsProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackAwards({ nodes, materials, onSelect }: BackAwardsProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* Awards Background */}
      <group position={[-3.263, 3.842, 2.712]} scale={[1.975, 0.936, 2.352]}>
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
        position={[-2.613, 3.697, 6.503]}
        rotation={[0, -0.321, 0]}
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
        position={[-1.002, 3.747, 2.994]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.538}
      />
      <mesh
        geometry={nodes.Awards_Header.geometry}
        material={materials["Light Yellow"]}
        position={[-2.069, 3.747, 3.169]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={1.385}
      />
    </ClickableGroup>
  );
}
