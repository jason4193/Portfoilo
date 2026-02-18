import type { Group } from "three";

/**
 * Find the parent group that has actual rotation
 * @param group - The starting group to traverse from
 * @returns The group with rotation, or the highest parent
 */
export function findRotatedParent(group: Group): Group {
  let rotatedParent = group;

  let current = group;
  while (current.parent) {
    const rot = current.rotation;
    if (
      Math.abs(rot.x) > 0.1 ||
      Math.abs(rot.y) > 0.1 ||
      Math.abs(rot.z) > 0.1
    ) {
      rotatedParent = current;
      break;
    }
    current = current.parent as Group;

    // Safety exit if we go too high
    if (!current.parent) {
      rotatedParent = current;
      break;
    }
  }

  return rotatedParent;
}

/**
 * Detect if the back face of a card is visible based on Y-axis rotation
 * @param cardGroup - The card group to check
 * @returns true if back face is visible, false otherwise
 */
export function isBackFaceVisible(cardGroup: Group): boolean {
  const rotatedParent = findRotatedParent(cardGroup);
  const PI_2 = Math.PI / 2; // 90 degrees
  const OFFSET = 0.5; // Small offset to ensure back face is clearly visible
  const y = rotatedParent.rotation.y;
  return Math.abs(y) > PI_2 + OFFSET;
}
