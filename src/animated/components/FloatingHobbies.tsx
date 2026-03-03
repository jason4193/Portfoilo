import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { PointLight, PointLightHelper } from "three";
import type { Group } from "three";
import { SimpleCameraModel } from "./model/SimpleCameraModel";
import { CartoonShoesModel } from "./model/CartoonShoesModel";
import { PomPomModel } from "./model/PomPomModel";
import { SumireModel } from "./model/SumireModel";
import { ClickableGroup } from "./ClickableGroup";
import { useDebugStore, useThemeStore } from "../../shared/stores";

interface FloatingItemProps {
    children: React.ReactNode;
    /** Fixed X/Z position */
    position: [number, number, number];
    /** Fixed rotation */
    rotation?: [number, number, number];
    /** Bob amplitude */
    bobAmplitude?: number;
    /** Bob speed (radians per second) */
    bobSpeed?: number;
    /** Self-rotation speed around Y axis (radians per second) */
    selfRotateSpeed?: number;
    /** Point light color */
    lightColor?: string;
    /** Point light position */
    lightPosition?: [number, number, number];
    /** Point light intensity */
    lightIntensity?: number;
    /** Point light distance (falloff range) */
    lightDistance?: number;
}

function FloatingItem({
    children,
    position,
    rotation,
    bobAmplitude = 0.15,
    bobSpeed = 1.5,
    selfRotateSpeed = 0.3,
    lightPosition = [0, 0.8, 1],
    lightColor = "#ffffff",
    lightIntensity = 0.6,
    lightDistance = 4,
}: FloatingItemProps) {
    const groupRef = useRef<Group>(null);
    const lightRef = useRef<PointLight>(null);
    const timeRef = useRef(Math.random() * Math.PI * 2);
    const debugEnabled = useDebugStore((state) => state.enabled);
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === "dark";

    useHelper(
        debugEnabled && isDark ? (lightRef as any) : null,
        PointLightHelper,
        0.3,
        lightColor,
    );

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        timeRef.current += delta;

        // Vertical bobbing
        const bob = Math.sin(timeRef.current * bobSpeed) * bobAmplitude;
        groupRef.current.position.set(position[0], position[1] + bob, position[2]);

        // Self-rotation around own Y axis
        groupRef.current.rotation.y += selfRotateSpeed * delta;
    });

    return (
        <group ref={groupRef} rotation={rotation}>
            {isDark && (
                <pointLight
                    ref={lightRef}
                    color={lightColor}
                    intensity={lightIntensity}
                    distance={lightDistance}
                    decay={2}
                    position={lightPosition}
                />
            )}
            {children}
        </group>
    );
}

export function FloatingHobbies() {
    return (
        <group position={[0, -2, 0]}>
            {/* Camera — upper left area */}
            <FloatingItem
                position={[1.5, 2.3, 0.5]}
                bobAmplitude={0.08}
                bobSpeed={1.2}
                selfRotateSpeed={0.2}
                lightColor="#ffeedd"
                lightPosition={[0, 0.8, 0]}
                lightIntensity={0.8}
                lightDistance={4}
            >
                <ClickableGroup>
                    <SimpleCameraModel scale={1.2} />
                </ClickableGroup>
            </FloatingItem>

            {/* Shoes — right side, lower */}
            <FloatingItem
                position={[-1.5, 2.3, 0.5]}
                bobAmplitude={0.04}
                bobSpeed={1.5}
                selfRotateSpeed={-0.2}
                lightColor="#ddeeff"
                lightPosition={[-0.2, 0.5, 0.5]}
                lightIntensity={0.7}
                lightDistance={3.5}
            >
                <ClickableGroup>
                    <CartoonShoesModel scale={0.15} />
                </ClickableGroup>
            </FloatingItem>

            {/* PomPom — upper right, further back */}
            <FloatingItem
                position={[3, 2.5, -1]}
                rotation={[-Math.PI / 20, 0, 0]}
                bobAmplitude={0}
                bobSpeed={0}
                selfRotateSpeed={0}
                lightColor="#ffe0f0"
                lightPosition={[0, 0.8, 1]}
                lightIntensity={2}
                lightDistance={2}
            >
                <ClickableGroup>
                    <PomPomModel scale={0.7} />
                </ClickableGroup>
            </FloatingItem>

            {/* Sumire — static, no bob, no rotation */}
            <FloatingItem
                position={[-2.5, 3, 0]}
                rotation={[0, Math.PI / 4, 0]}
                bobAmplitude={0}
                bobSpeed={0}
                selfRotateSpeed={0}
                lightColor="#e0eeff"
                lightPosition={[0, 0.5, 0]}
                lightIntensity={0.8}
                lightDistance={4.5}
            >
                <ClickableGroup>
                    <SumireModel scale={0.5} />
                </ClickableGroup>
            </FloatingItem>
        </group>
    );
}

