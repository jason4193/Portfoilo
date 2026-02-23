import { DESKTOP_MIN_WIDTH } from "./card";
import { ThemeMode } from "../../shared/stores";

/** Re-export for scene components that need the same breakpoint */
export { DESKTOP_MIN_WIDTH };

/** OrbitControls zoom limits – tighter range on mobile for better feel */
export const ORBIT_MIN_DISTANCE_DESKTOP = 0.1;
export const ORBIT_MAX_DISTANCE_DESKTOP = 10;
export const ORBIT_MIN_DISTANCE_MOBILE = 2.5;
export const ORBIT_MAX_DISTANCE_MOBILE = 7;

export const CAMERA_FRONT_POSITION: [number, number, number] = [0, 2, 7];

export const FOCUS_Z = -0.2;
export const FOCUS_Y_OFFSET = -0.2;
export const BACK_MOVE_DURATION = 0.4;
export const FOCUS_MOVE_DURATION = 0.5;
export const MODAL_EXPAND_DURATION = 0.5;
export const MODAL_START_OFFSET = 0.2;
export const DIM_START_OFFSET = 0.1;

/** Lighting presets for different themes. */
type DirectionalLightPreset = {
  position: [number, number, number];
  color: number;
  intensityMultiplier: number;
};

type LightingPreset = {
  ambientMultiplier: number;
  ambientColor?: number;
  key: DirectionalLightPreset;
  fill: DirectionalLightPreset;
  rim: DirectionalLightPreset;
};

export const LIGHTING_PRESETS: Record<ThemeMode, LightingPreset> = {
  light: {
    ambientMultiplier: 1,
    ambientColor: 0xffffff,
    key: {
      position: [4.5, 6, 6],
      color: 0xffffff,
      intensityMultiplier: 1,
    },
    fill: {
      position: [-3.5, 4, 2],
      color: 0xf9e9c7,
      intensityMultiplier: 0.75,
    },
    rim: {
      position: [2.5, 3, -4],
      color: 0xb3d9ff,
      intensityMultiplier: 0.65,
    },
  },
  dark: {
    ambientMultiplier: 0.35,
    ambientColor: 0x1a2333,
    key: {
      position: [2.5, 4.5, 4],
      color: 0xc7ecff,
      intensityMultiplier: 1.4,
    },
    fill: {
      position: [-2.25, 3, 1.5],
      color: 0x2e3542,
      intensityMultiplier: 0.35,
    },
    rim: {
      position: [-3, 2.75, -4.5],
      color: 0x4dd0ff,
      intensityMultiplier: 0.9,
    },
  },
};
