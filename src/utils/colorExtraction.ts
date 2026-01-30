/**
 * Extract dominant color from an image using Canvas API
 * Optimized for performance with many images by downsampling
 */

/**
 * Get the dominant color from an image URL
 * @param imageUrl - URL of the image to analyze
 * @param quality - Quality factor (1-10, lower = faster but less accurate). Default: 5
 * @returns Promise resolving to a hex color string (e.g., "#ff5733")
 */
export async function getDominantColor(
  imageUrl: string,
  quality: number = 5
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        // Create a canvas and draw the image at reduced size for performance
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Downsample the image for faster processing
        // Quality 5 means we process at 1/5th the size (20% of pixels)
        const scale = 1 / quality;
        canvas.width = Math.max(1, Math.floor(img.width * scale));
        canvas.height = Math.max(1, Math.floor(img.height * scale));

        // Draw the image to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Count color frequencies (quantize to reduce memory)
        const colorMap = new Map<string, number>();
        const quantize = 8; // Reduce color precision for grouping

        for (let i = 0; i < data.length; i += 4) {
          const r = Math.floor(data[i] / quantize) * quantize;
          const g = Math.floor(data[i + 1] / quantize) * quantize;
          const b = Math.floor(data[i + 2] / quantize) * quantize;
          const a = data[i + 3]; // Alpha channel

          // Skip transparent or very transparent pixels
          if (a < 128) continue;

          const colorKey = `${r},${g},${b}`;
          colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }

        // Find the most frequent color
        let maxCount = 0;
        let dominantColor = "808080"; // Default gray

        for (const [colorKey, count] of colorMap.entries()) {
          if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = colorKey.split(",").map(Number);
            dominantColor = [r, g, b]
              .map((val) => val.toString(16).padStart(2, "0"))
              .join("");
          }
        }

        resolve(`#${dominantColor}`);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.src = imageUrl;
  });
}
