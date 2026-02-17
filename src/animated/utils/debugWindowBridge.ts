import { useDebugStore } from "../../shared/stores/useDebugStore";

/**
 * Initialize debug mode window bridge for browser console access.
 * Call this once during app initialization.
 *
 * Usage in browser console:
 *   setDebugMode(true)  // Show debug panel
 *   setDebugMode(false) // Hide debug panel
 */
export function initDebugWindowBridge() {
  if (typeof window === "undefined") return;

  (window as any).setDebugMode = (value: boolean) => {
    useDebugStore.getState().setEnabled(value);
  };
}
