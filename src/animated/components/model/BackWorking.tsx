import { ClickableGroup } from "../ClickableGroup";
import type { SectionProps } from "./types";

export function BackWorking({ nodes, materials }: SectionProps) {
  return (
    <ClickableGroup>
      {/* Working Background */}
      <group position={[0.969, 3.841, -2.273]} scale={[1.975, 0.936, 2.352]}>
        <mesh
          geometry={nodes.Plane035.geometry}
          material={materials["Light Yellow"]}
        />
        <mesh geometry={nodes.Plane035_1.geometry} material={materials.Red} />
      </group>

      {/* Working Icon PC Monitor */}
      <group position={[1.629, 3.747, 1.051]} scale={[0.452, 0.452, 0.581]}>
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
        position={[1.426, 3.737, 0.806]}
        scale={[0.038, 0.038, 0.171]}
      />
      <mesh
        geometry={nodes.Working_Icon_2.geometry}
        material={materials["Dark Blue"]}
        position={[1.679, 3.747, 0.764]}
        rotation={[0, Math.PI / 4, 0]}
        scale={-0.092}
      />
      <mesh
        geometry={nodes.Working_Icon_3.geometry}
        material={materials.Yellow}
        position={[1.584, 3.737, 1.199]}
        scale={[0.014, 0.03, 0.251]}
      />
      <mesh
        geometry={nodes.Working_Icon_4.geometry}
        material={materials.Yellow}
        position={[1.649, 3.737, 1.054]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_6.geometry}
        material={materials.Yellow}
        position={[1.706, 3.737, 1.054]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_8.geometry}
        material={materials.Yellow}
        position={[1.767, 3.737, 1.054]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_5.geometry}
        material={materials.Yellow}
        position={[1.649, 3.737, 1.342]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_7.geometry}
        material={materials.Yellow}
        position={[1.706, 3.737, 1.342]}
        scale={[0.014, 0.03, 0.107]}
      />
      <mesh
        geometry={nodes.Working_Icon_9.geometry}
        material={materials.Yellow}
        position={[1.767, 3.737, 1.342]}
        scale={[0.014, 0.03, 0.107]}
      />
      <group position={[1.891, 3.747, 1.788]}>
        <mesh geometry={nodes.Circle022.geometry} material={materials.Yellow} />
        <mesh
          geometry={nodes.Circle022_1.geometry}
          material={materials["Light Yellow"]}
        />
      </group>
      <mesh
        geometry={nodes.Working_Header.geometry}
        material={materials["Dark Blue"]}
        position={[2.103, 3.747, -1.996]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        scale={1.09}
      />
      <mesh
        geometry={nodes.Working_Info.geometry}
        material={materials["Dark Blue"]}
        position={[3.207, 3.747, -2.131]}
        rotation={[Math.PI, Math.PI / 2, 0]}
        scale={0.435}
      />
    </ClickableGroup>
  );
}
