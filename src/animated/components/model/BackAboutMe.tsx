import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackAboutMeProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackAboutMe({ nodes, materials, onSelect }: BackAboutMeProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* AboutMe Background */}
      <group
        position={[7.148, 13.329, -1.331]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
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
        position={[6.204, 12.473, -1.434]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.936}
      />
      <mesh
        geometry={nodes.AboutMe_Icon_Avatar_1.geometry}
        material={materials["Dark Blue"]}
        position={[6.207, 12.753, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.936}
      />
      <mesh
        geometry={nodes.AboutMe_Icon_Avatar_2.geometry}
        material={materials["Dark Blue"]}
        position={[6.207, 11.988, -1.48]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={1.395}
      />
      <mesh
        geometry={nodes.AboutMe_Header.geometry}
        material={materials["Dark Blue"]}
        position={[5.487, 12.165, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={1.208}
      />
      <mesh
        geometry={nodes.AboutMe_Info.geometry}
        material={materials["Dark Blue"]}
        position={[6.949, 10.955, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.52}
      />
    </ClickableGroup>
  );
}
