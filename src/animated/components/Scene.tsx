import { OrbitControls } from "@react-three/drei";
import { BusinessCard } from "./BusinessCard";

export function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />

      {/* Business Card */}
      <BusinessCard />
    </>
  );
}
