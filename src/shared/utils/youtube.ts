/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&other=params
 * - Direct video ID string
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // If it's already just a video ID (no URL structure)
  if (!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("/")) {
    return url;
  }

  // Handle youtu.be short URLs
  const youtuBeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) {
    return youtuBeMatch[1];
  }

  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return watchMatch[1];
  }

  // Handle youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return embedMatch[1];
  }
  
  // Handle youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) {
    return shortsMatch[1];
  }

  return null;
}