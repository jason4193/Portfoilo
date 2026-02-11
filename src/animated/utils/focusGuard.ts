export function isCameraBehindCard(
  cameraPosition: [number, number, number],
  threshold = -0.05,
) {
  return cameraPosition[2] < threshold;
}
