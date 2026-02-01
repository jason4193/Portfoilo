import { useRef } from "react";
import { Mesh, DoubleSide } from "three";

export function BusinessCard() {
  const cardRef = useRef<Mesh>(null);

  // Business card dimensions (standard size ratio: 3.5" x 2")
  // Scaled to Three.js units
  const width = 3.5;
  const height = 2;
  const depth = 0.01; // Very thin card

  return (
    <mesh ref={cardRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* Card geometry - BoxGeometry for front and back faces */}
      <boxGeometry args={[width, height, depth]} />
      
      {/* Materials array for different faces */}
      {/* Front (index 4), Back (index 5), Sides (indices 0-3) */}
      <meshStandardMaterial
        attach="material-0"
        color="#e8e8e0"
        roughness={0.9}
        metalness={0.05}
        side={DoubleSide}
      />
      <meshStandardMaterial
        attach="material-1"
        color="#e8e8e0"
        roughness={0.9}
        metalness={0.05}
        side={DoubleSide}
      />
      <meshStandardMaterial
        attach="material-2"
        color="#e8e8e0"
        roughness={0.9}
        metalness={0.05}
        side={DoubleSide}
      />
      <meshStandardMaterial
        attach="material-3"
        color="#e8e8e0"
        roughness={0.9}
        metalness={0.05}
        side={DoubleSide}
      />
      {/* Front face - slightly brighter */}
      <meshStandardMaterial
        attach="material-4"
        color="#f5f5f0"
        roughness={0.8}
        metalness={0.1}
        side={DoubleSide}
      />
      {/* Back face - slightly darker */}
      <meshStandardMaterial
        attach="material-5"
        color="#e0e0d8"
        roughness={0.8}
        metalness={0.1}
        side={DoubleSide}
      />
    </mesh>
  );
}
