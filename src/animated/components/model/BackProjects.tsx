import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

export function BackProjects({ nodes, materials }: SectionProps) {
  return (
    <ClickableGroup>
      <mesh
        geometry={nodes.Projects_Icon_1.geometry}
        material={materials.Red}
        position={[2.077, 3.691, -6.032]}
        scale={0.738}
      />
      <mesh
        geometry={nodes.Projects_Icon_Background.geometry}
        material={materials["Light Yellow"]}
        position={[1.841, 3.738, -6.312]}
        scale={0.588}
      />
      <mesh
        geometry={nodes.Projects_Icon_5.geometry}
        material={materials["Dark Blue"]}
        position={[1.545, 3.691, -6.032]}
        scale={-0.225}
      />
      <mesh
        geometry={nodes.Projects_Icon_6.geometry}
        material={materials["Dark Blue"]}
        position={[1.495, 3.691, -6.65]}
        scale={0.15}
      />
      <mesh
        geometry={nodes.Projects_Icon_7.geometry}
        material={materials.Yellow}
        position={[1.944, 3.691, -6.65]}
        scale={0.15}
      />
      <mesh
        geometry={nodes.Projects_Icon_4.geometry}
        material={materials.Yellow}
        position={[2.091, 3.691, -6.65]}
        scale={0.15}
      />
      <mesh
        geometry={nodes.Projects_Icon_3.geometry}
        material={materials.Yellow}
        position={[2.224, 3.691, -6.65]}
        scale={0.15}
      />
      <mesh
        geometry={nodes.Projects_Icon_2.geometry}
        material={materials.Yellow}
        position={[2.37, 3.691, -6.65]}
        scale={0.15}
      />

      {/* Projects Background */}
      <group position={[0.969, 3.841, -7.255]} scale={[1.975, 0.936, 2.352]}>
        <mesh
          geometry={nodes.Plane034.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.Plane034_1.geometry}
          material={materials.Yellow}
        />
      </group>

      <mesh
        geometry={nodes.Projects_Info.geometry}
        material={materials["Dark Blue"]}
        position={[3.189, 3.747, -7.056]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.52}
      />
      <mesh
        geometry={nodes.Projects_Header.geometry}
        material={materials["Dark Blue"]}
        position={[2.119, 3.747, -5.46]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={1.208}
      />
    </ClickableGroup>
  );
}
