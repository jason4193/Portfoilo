/**
 * Dynamically import media assets from the assets folder
 * Uses Vite's new URL() with import.meta.url for dynamic imports
 */

/**
 * Get the resolved URL for a media asset
 * @param src - The source path from JSON (e.g., "image.png" or "src/assets/image.png")
 * @returns The resolved URL for the asset, or the original src if not found
 */
export function getMediaUrl(src: string): string {
  if (!src) return src;

  // Handle absolute URLs (external)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Extract filename from path
  // Handle paths like "src/assets/image.png" or "/assets/image.png" or "assets/image.png" or just "image.png"
  let filename = src.split("/").pop() || src;

  // Remove any leading path components
  filename = filename.replace(/^(src\/assets\/|assets\/|src\/)/, "");

  // Use Vite's dynamic import with new URL()
  // This works for assets in the src/assets folder
  try {
    // Construct the path relative to the assets folder
    const assetPath = new URL(`../assets/${filename}`, import.meta.url).href;
    return assetPath;
  } catch (error) {
    // If all else fails, return the original src
    console.warn(`Failed to resolve media URL: ${src}`, error);
    return src;
  }
}
