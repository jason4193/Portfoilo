import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

export function BackCommunity({ nodes, materials }: SectionProps) {
  return (
    <ClickableGroup>
      {/* Community MegaSpeaker Icon */}
      <group
        position={[-2.663, 3.691, 1.619]}
        rotation={[0, -0.275, 0]}
        scale={0.215}
      >
        <mesh geometry={nodes.Plane046.geometry} material={materials.Yellow} />
        <mesh
          geometry={nodes.Plane046_1.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.Plane046_2.geometry}
          material={materials["Dark Blue"]}
        />
      </group>

      {/* Community Background */}
      <group position={[-3.265, 3.841, -2.273]} scale={[1.975, 0.936, 2.352]}>
        <mesh
          geometry={nodes.Plane032.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh geometry={nodes.Plane032_1.geometry} material={materials.Red} />
      </group>

      <mesh
        geometry={nodes.Community_Header.geometry}
        material={materials["Dark Blue"]}
        position={[-2.101, 3.747, -2.165]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={1.208}
      />
      <mesh
        geometry={nodes.Community_Info.geometry}
        material={materials["Dark Blue"]}
        position={[-0.947, 3.747, -2.061]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.52}
      />
    </ClickableGroup>
  );
}
