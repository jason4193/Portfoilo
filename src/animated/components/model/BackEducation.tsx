import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

export function BackEducation({ nodes, materials }: SectionProps) {
  return (
    <ClickableGroup>
      {/* Education Background */}
      <group position={[0.969, 3.841, 2.71]} scale={[1.975, 0.936, 2.352]}>
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
        position={[2.138, 3.747, 2.89]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={1.314}
      />
      <mesh
        geometry={nodes.Education_Info.geometry}
        material={materials["Dark Blue"]}
        position={[3.192, 3.747, 2.904]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.458}
      />

      {/* Education Icon */}
      <group position={[1.652, 3.747, 7.058]} scale={-0.04}>
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
