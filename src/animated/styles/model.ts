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

const c1 = 0xf2dac4;
const c2 = 0xb4bf9b;
const c3 = 0xf2a679;
const c4 = 0xd98162;
const text = 0x4b433f;
const wood = 0x63442d; //0x8b6f47
const background = 0xededed;

// Dark mode neon/night city colors
const c1Dark = 0x0e4473;
const c2Dark = 0x048abf;
const c3Dark = 0x0e3a73;
const c4Dark = 0x0a2740;
const textDark = 0x72e5f2;
const backgroundDark = 0x0a2136;

export const MODEL_MATERIAL_VARIANTS: Record<ThemeMode, MaterialVariantConfig> =
{
  light: {
    Background: {
      color: background,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
      roughness: 0.7,
      metalness: 0.0,
    },
    Base: {
      color: c1,
      emissive: 0x8b6f47,
      emissiveIntensity: 0.2,
      roughness: 0.65,
      metalness: 0.1,
    },
    Primary: {
      color: c2,
      emissive: 0x132033,
      emissiveIntensity: 0.25,
      roughness: 0.5,
      metalness: 0.2,
    },
    Secondary: {
      color: c3,
      emissive: 0x4d3100,
      emissiveIntensity: 0.2,
      roughness: 0.6,
      metalness: 0.15,
    },
    Accent: {
      color: c4,
      emissive: 0x66313a,
      emissiveIntensity: 0.15,
      roughness: 0.5,
      metalness: 0.1,
    },
    Wood: {
      emissive: wood,
      emissiveIntensity: 0.5,
      roughness: 0.78,
      metalness: 0.12,
    },
    Text: {
      color: text,
      emissive: 0x132033,
      emissiveIntensity: 0.25,
      roughness: 0.5,
      metalness: 0.2,
    },
  },
  dark: {
    Base: {
      color: c1Dark,
      emissive: 0x1a1f3a,
      emissiveIntensity: 0.4,
      roughness: 0.85,
      metalness: 0.05,
    },
    Background: {
      color: backgroundDark,
      emissive: 0x000000,
      emissiveIntensity: 0.3,
      roughness: 0.5,
      metalness: 0.1,
    },
    Primary: {
      color: c2Dark,
      emissive: 0x048abf,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.4,
    },
    Secondary: {
      color: c3Dark,
      emissive: 0xff006e,
      emissiveIntensity: 0.7,
      roughness: 0.4,
      metalness: 0.3,
    },
    Accent: {
      color: c4Dark,
      emissive: 0x8b00ff,
      emissiveIntensity: 0.75,
      roughness: 0.35,
      metalness: 0.35,
    },
    Wood: {
      emissive: 0x8b6f47,
      emissiveIntensity: 0.25,
      roughness: 0.9,
      metalness: 0.05,
    },
    Text: {
      color: textDark,
      emissive: 0x72e5f2,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.2,
    },
  },
};
