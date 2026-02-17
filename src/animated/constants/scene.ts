import { DESKTOP_MIN_WIDTH } from "./card";

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
