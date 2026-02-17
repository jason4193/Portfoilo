import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackEducationProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackEducation({
  nodes,
  materials,
  onSelect,
}: BackEducationProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* Education Background */}
      <group
        position={[-2.817, 9.096, -1.331]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
        <mesh
          geometry={nodes.Plane036.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.Plane036_1.geometry}
          material={materials["Dark Blue"]}
        />
      </group>

      <mesh
        geometry={nodes.Education_Header.geometry}
        material={materials["Light Yellow"]}
        position={[-2.997, 7.926, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={1.314}
      />
      <mesh
        geometry={nodes.Education_Info.geometry}
        material={materials["Dark Blue"]}
        position={[-3.012, 6.872, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.458}
      />

      {/* Education Icon */}
      <group
        position={[-7.165, 8.413, -1.425]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={-0.04}
      >
        <mesh geometry={nodes.Plane007.geometry} material={materials.Red} />
        <mesh
          geometry={nodes.Plane007_1.geometry}
          material={materials.Yellow}
        />
        <mesh
          geometry={nodes.Plane007_2.geometry}
          material={materials["Light Yellow"]}
        />
      </group>
    </ClickableGroup>
  );
}
