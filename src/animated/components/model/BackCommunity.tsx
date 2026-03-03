import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackCommunityProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackCommunity({
  nodes,
  materials,
  onSelect,
}: BackCommunityProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* Community MegaSpeaker Icon */}
      <group
        position={[-1.726, 12.728, -1.48]}
        rotation={[-Math.PI / 2, -1.296, Math.PI]}
        scale={0.215}
      >
        <mesh geometry={nodes.Plane046.geometry} material={materials.Secondary} />
        <mesh
          geometry={nodes.Plane046_1.geometry}
          material={materials.Background}
        />
        <mesh
          geometry={nodes.Plane046_2.geometry}
          material={materials.Primary}
        />
      </group>

      {/* Community Background */}
      <group
        position={[2.166, 13.329, -1.331]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
        <mesh
          geometry={nodes.Plane032.geometry}
          material={materials.Background}
        />
        <mesh geometry={nodes.Plane032_1.geometry} material={materials.Accent} />
      </group>

      <mesh
        geometry={nodes.Community_Header.geometry}
        material={materials.Text}
        position={[2.058, 12.165, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={1.208}
      />
      <mesh
        geometry={nodes.Community_Info.geometry}
        material={materials.Text}
        position={[1.954, 11.011, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.52}
      />
    </ClickableGroup>
  );
}
