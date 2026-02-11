import { Canvas } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";
import type { GLTFResult } from "../model/types";
import modelUrl from "../../assets/Portfolio_v3.glb?url";
import { content } from "../../../shared/data/content";
import jasonPhoto from "../../../shared/assets/Jason_2.webp";
import { InfoCard } from "../../../shared/components/InfoCard";

interface AboutMeModalContentProps {
  accentColor: string;
  onClose: () => void;
}

const QUESTION_PREFIXES = [
  '"When a new term starts and not sure which classes should take?"',
  '"Always struggle with checking the stock price of your shopping list?"',
] as const;

function parseIntroContent(raw: string) {
  const sideQuestMarker = "2026 Side Quest:";
  const sideQuestIdx = raw.indexOf(sideQuestMarker);
  let mainContent = raw;
  let sideQuests: string[] = [];

  if (sideQuestIdx !== -1) {
    mainContent = raw.slice(0, sideQuestIdx).trim();
    const after = raw.slice(sideQuestIdx + sideQuestMarker.length).trim();
    sideQuests = after
      .split(/\n+/)
      .map((line) => line.replace(/^▶\s*/, "").trim())
      .filter(Boolean);
  }

  const paragraphs = mainContent.split(/\n\n+/);
  const introParagraphs: string[] = [];
  const whatIDoParagraphs: string[] = [];
  let inWhatIDo = false;

  for (const p of paragraphs) {
    if (p.startsWith("I like making products") || inWhatIDo) {
      inWhatIDo = true;
      whatIDoParagraphs.push(p);
    } else {
      introParagraphs.push(p);
    }
  }

  return { introParagraphs, whatIDoParagraphs, sideQuests };
}

function AboutMeIconMesh() {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current?.position as THREE.Vector3, {
        y: "+=0.2",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
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
  const raw = content?.introAnimated ?? "";
  const { introParagraphs, whatIDoParagraphs, sideQuests } =
    parseIntroContent(raw);

  return (
    <div className="size-full flex flex-col overflow-hidden rounded-2xl bg-[#F7F4EC] text-[#0B2B4C]">
      {/* Header: yellow/orange bar */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
        style={{ backgroundColor: accentColor }}
      >
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white/40">
            <Canvas
              className="size-10"
              camera={{ position: [0, 0, 4], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.9} />
              <directionalLight position={[2, 2, 4]} intensity={0.8} />
              <Suspense fallback={null}>
                <AboutMeIconMesh />
              </Suspense>
            </Canvas>
          </div>
          <p className="!m-0 leading-none text-2xl font-semibold italic text-shadow-bold-lg md:text-4xl">
            About Me
          </p>
        </div>
        <button
          className="m-0 text-sm font-medium text-[#0B2B4C]/80 transition-colors hover:text-[#0B2B4C]"
          onClick={onClose}
          aria-label="Close section"
        >
          X
        </button>
      </div>

      {/* Main area: flex row - left = MainContent, right = image + Side Quests */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto px-4 py-4 sm:px-10 sm:py-10 lg:flex-row lg:items-stretch lg:gap-8">
        {/* Left: MainContent - intro + What I Do */}
        <div className="flex flex-col justify-center min-w-0 shrink basis-full lg:basis-[65%]">
          <div className="px-2">
            <p className="text-lg md:text-xl font-semibold  text-shadow-bold text-[#0B2B4C] mb-4">
              {introTitle}
            </p>
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 1
                    ? "whitespace-pre-line text-base leading-relaxed mb-4 italic text-[#0B2B4C]/90"
                    : "whitespace-pre-line text-base leading-relaxed mb-4 text-[#0B2B4C]/95"
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* What I Do section */}
          <div className="mt-6 mb-4 flex items-center gap-2 rounded-lg border border-amber-200/80 bg-[#0B2B4C] px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="font-semibold text-yellow-400 text-shadow-bold">
              What I Do
            </span>
          </div>
          <div className="px-4">
            {whatIDoParagraphs.map((p, i) => {
              const prefix = QUESTION_PREFIXES.find((q) => p.startsWith(q));
              if (prefix) {
                const rest = p.slice(prefix.length).replace(/^\n/, "");
                return (
                  <p
                    key={i}
                    className="mb-4 text-base leading-relaxed text-[#0B2B4C]/95"
                  >
                    <span className="block font-semibold text-shadow-bold">
                      {prefix}
                    </span>
                    {rest && (
                      <span className="block whitespace-pre-line text-base italic">
                        {rest}
                      </span>
                    )}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  className="whitespace-pre-line text-base leading-relaxed mb-4 text-[#0B2B4C]/95"
                >
                  {p}
                </p>
              );
            })}
          </div>
        </div>

        {/* Right: combined image + Side Quests card */}
        <div className="flex min-w-0 shrink flex-col justify-center max-w-full mx-auto w-full basis-full lg:mx-0 lg:basis-[35%]">
          <InfoCard
            image={{ src: jasonPhoto, alt: "Jason portrait" }}
            header={sideQuests.length > 0 ? "2026 Side Quests" : undefined}
            listItems={sideQuests.length > 0 ? sideQuests : undefined}
          />
        </div>
      </div>

      {/* Close button */}
      <div className="flex shrink-0 justify-center px-4 pb-4 sm:px-6 sm:pb-6">
        <button className="btn-panel-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

useGLTF.preload(modelUrl);
