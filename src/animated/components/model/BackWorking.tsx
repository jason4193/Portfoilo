import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

interface BackWorkingProps extends SectionProps {
  onSelect?: (position: [number, number, number]) => void;
}

export function BackWorking({ nodes, materials, onSelect }: BackWorkingProps) {
  return (
    <ClickableGroup onClick={onSelect}>
      {/* Working Background */}
      <group
        position={[2.166, 9.096, -1.331]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1.975, 0.936, 2.352]}
      >
        <mesh
          geometry={nodes.Plane035.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh geometry={nodes.Plane035_1.geometry} material={materials.Red} />
      </group>

      {/* Working Icon PC Monitor */}
      <group
        position={[-1.158, 8.436, -1.425]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.452, 0.452, 0.581]}
      >
        <mesh
          geometry={nodes.Plane059.geometry}
          material={materials["Dark Blue"]}
        />
        <mesh
          geometry={nodes.Plane059_1.geometry}
          material={materials["Light Yellow"]}
        />
      </group>

      <mesh
        geometry={nodes.Working_Icon_1.geometry}
        material={materials.Red}
        position={[-0.913, 8.639, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.038, 0.038, 0.171]}
      />
      <mesh
        geometry={nodes.Working_Icon_2.geometry}
        material={materials["Dark Blue"]}
        position={[-0.872, 8.386, -1.424]}
        rotation={[Math.PI / 2, -Math.PI / 4, 0]}
        scale={-0.092}
      />
      <mesh
        geometry={nodes.Working_Icon_3.geometry}
        material={materials.Yellow}
        position={[-1.307, 8.48, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.251]}
      />
      <mesh
        geometry={nodes.Working_Icon_4.geometry}
        material={materials.Yellow}
        position={[-1.161, 8.416, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_6.geometry}
        material={materials.Yellow}
        position={[-1.161, 8.358, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_8.geometry}
        material={materials.Yellow}
        position={[-1.161, 8.298, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_5.geometry}
        material={materials.Yellow}
        position={[-1.449, 8.416, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_7.geometry}
        material={materials.Yellow}
        position={[-1.449, 8.358, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_9.geometry}
        material={materials.Yellow}
        position={[-1.449, 8.298, -1.435]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[0.014, 0.03, 0.107]}
      />
      <group
        position={[-1.895, 8.174, -1.425]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      >
        <mesh geometry={nodes.Circle022.geometry} material={materials.Yellow} />
        <mesh
          geometry={nodes.Circle022_1.geometry}
          material={materials["Light Yellow"]}
        />
      </group>
      <mesh
        geometry={nodes.Working_Header.geometry}
        material={materials["Dark Blue"]}
        position={[1.888, 7.961, -1.425]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={1.09}
      />
      <mesh
        geometry={nodes.Working_Info.geometry}
        material={materials["Dark Blue"]}
        position={[2.024, 6.857, -1.425]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.435}
      />
    </ClickableGroup>
  );
}
