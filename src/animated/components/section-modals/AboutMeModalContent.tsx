import { Canvas } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";
import type { GLTFResult } from "../model/types";
import modelUrl from "../../assets/Portfolio_v3.glb?url";
import { content } from "../../../shared/data/content";
import jasonPhoto from "../../../shared/assets/Jason_2.webp";

interface AboutMeModalContentProps {
  accentColor: string;
  onClose: () => void;
}

function AboutMeIconMesh() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group | null>(null);

  // Animate the groupRef to move up and down slowly using GSAP
  // Only import gsap if possible at the top-level (skip here per prompt),
  // so assume gsap is available as 'gsap'

  useEffect(() => {
    if (!groupRef.current) return;
    // Animate Y up and down using gsap
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current?.position as THREE.Vector3, {
        y: "+=0.2",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, groupRef);

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, Math.PI / 2, Math.PI]}>
      <Center>
        <group scale={2.5}>
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
        </group>
      </Center>
    </group>
  );
}

export function AboutMeModalContent({
  accentColor,
  onClose,
}: AboutMeModalContentProps) {
  const introTitle = content?.header
    ? `Hello! I'm ${content.header}.`
    : "Hello!";
  const introBody = content?.introAnimated ?? "";

  return (
    <div className="h-full w-full rounded-2xl bg-[#F7F4EC] text-[#0B2B4C] flex flex-col">
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20">
            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 0, 4], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <axesHelper />
              <ambientLight intensity={0.9} />
              <directionalLight position={[2, 2, 4]} intensity={0.8} />
              <Suspense fallback={null}>
                <AboutMeIconMesh />
              </Suspense>
            </Canvas>
          </div>
          <p className="text-3xl md:text-5xl font-semibold pt-6">About Me</p>
        </div>
        <button
          className="text-[#0B2B4C]/80 hover:text-[#0B2B4C] text-sm"
          onClick={onClose}
          aria-label="Close section"
        >
          Close
        </button>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="h-full flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-lg font-semibold">{introTitle}</p>
            <p className="text-base leading-relaxed whitespace-pre-line">
              {introBody}
            </p>
            <p className="text-sm text-[#0B2B4C]/70">
              You can expand this section with a longer narrative later.
            </p>
          </div>
          <div className="w-full lg:w-[40%] flex justify-center">
            <div className="bg-white rounded-2xl p-3 shadow-xl">
              <img
                src={jasonPhoto}
                alt="Jason portrait"
                className="rounded-xl object-cover w-[240px] h-[240px] lg:w-[280px] lg:h-[280px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex justify-center">
        <button
          className="px-8 py-2 rounded-full bg-[#0B2B4C] text-white shadow-md hover:opacity-90 transition-opacity"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

useGLTF.preload(modelUrl);
