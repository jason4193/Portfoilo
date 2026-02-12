type DebugPayload = Record<string, unknown> | string | number | boolean | null;

const lastLogByKey = new Map<string, number>();

export function debugPerf(
  key: string,
  payload?: DebugPayload,
  throttleMs = 0,
) {
  if (typeof window === "undefined") return;
  const enabled = (window as any).__PERF_DEBUG__ === true;
  if (!enabled) return;

  if (throttleMs > 0) {
    const now = performance.now();
    const last = lastLogByKey.get(key) ?? 0;
    if (now - last < throttleMs) return;
    lastLogByKey.set(key, now);
  }

  if (payload === undefined) {
    // eslint-disable-next-line no-console
    console.debug(`[perf] ${key}`);
  } else {
    // eslint-disable-next-line no-console
    console.debug(`[perf] ${key}`, payload);
  }
}
