import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

export function BackAboutMe({ nodes, materials }: SectionProps) {
  return (
    <ClickableGroup>
      {/* AboutMe Background */}
      <group position={[-3.265, 3.841, -7.255]} scale={[1.975, 0.936, 2.352]}>
        <mesh
          geometry={nodes.Plane030.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh
          geometry={nodes.Plane030_1.geometry}
          material={materials.Yellow}
        />
      </group>

      <mesh
        geometry={nodes.AboutMe_Icon_Background.geometry}
        material={materials["Light Yellow"]}
        position={[-2.408, 3.738, -6.312]}
        scale={0.936}
      />
      <mesh
        geometry={nodes.AboutMe_Icon_Avatar_1.geometry}
        material={materials["Dark Blue"]}
        position={[-2.688, 3.691, -6.314]}
        scale={0.936}
      />
      <mesh
        geometry={nodes.AboutMe_Icon_Avatar_2.geometry}
        material={materials["Dark Blue"]}
        position={[-1.924, 3.691, -6.314]}
        scale={1.395}
      />
      <mesh
        geometry={nodes.AboutMe_Header.geometry}
        material={materials["Dark Blue"]}
        position={[-2.101, 3.747, -5.595]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={1.208}
      />
      <mesh
        geometry={nodes.AboutMe_Info.geometry}
        material={materials["Dark Blue"]}
        position={[-0.891, 3.747, -7.056]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.52}
      />
    </ClickableGroup>
  );
}
