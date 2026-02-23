import { ThemeMode } from "@shared/stores";
import { type GLTFResult } from "@animated/components/model/types";

export interface MaterialThemeSettings {
  color?: number;
  emissive: number;
  emissiveIntensity: number;
  roughness: number;
  metalness: number;
}

export type MaterialName = keyof GLTFResult["materials"];

export type MaterialVariantConfig = Record<MaterialName, MaterialThemeSettings>;

export const MODEL_MATERIAL_VARIANTS: Record<ThemeMode, MaterialVariantConfig> =
  {
    light: {
      "Light Yellow": {
        color: 0xf7f4ec,
        emissive: 0x8b6f47,
        emissiveIntensity: 0.2,
        roughness: 0.65,
        metalness: 0.1,
      },
      "Dark Blue": {
        color: 0x2f4668,
        emissive: 0x132033,
        emissiveIntensity: 0.25,
        roughness: 0.5,
        metalness: 0.2,
      },
      Yellow: {
        color: 0xf0c34e,
        emissive: 0x4d3100,
        emissiveIntensity: 0.2,
        roughness: 0.6,
        metalness: 0.15,
      },
      Red: {
        color: 0xf2a1a1,
        emissive: 0x66313a,
        emissiveIntensity: 0.15,
        roughness: 0.5,
        metalness: 0.1,
      },
      "Wood 124": {
        emissive: 0x8b6f47,
        emissiveIntensity: 0.15,
        roughness: 0.78,
        metalness: 0.12,
      },
    },
    dark: {
      "Light Yellow": {
        color: 0x0f111c,
        emissive: 0x151b2f,
        emissiveIntensity: 0.55,
        roughness: 0.85,
        metalness: 0.05,
      },
      "Dark Blue": {
        // color: 0x00d9ff,
        color: 0xd4e9fe,
        emissive: 0x0b2b4c,
        emissiveIntensity: 0.65,
        roughness: 0.4,
        metalness: 0.25,
      },
      Yellow: {
        color: 0xf0c34e,
        emissive: 0x2f1f00,
        emissiveIntensity: 0.25,
        roughness: 0.6,
        metalness: 0.15,
      },
      Red: {
        color: 0x7c6eff,
        emissive: 0x241a5c,
        emissiveIntensity: 0.6,
        roughness: 0.5,
        metalness: 0.2,
      },
      "Wood 124": {
        emissive: 0x0a1b2c,
        emissiveIntensity: 0.14,
        roughness: 0.95,
        metalness: 0.03,
      },
    },
  };
