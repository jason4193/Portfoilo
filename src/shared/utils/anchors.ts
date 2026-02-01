/**
 * Generate a URL-friendly slug from a string
 * Used for creating anchor IDs for headings
 */
export function slugify(text: string, index?: number): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, "") + // Remove leading/trailing hyphens
    (index !== undefined ? `-${index}` : "")
  );
}

/**
 * Generate a unique anchor ID for a heading
 * Combines slug with optional index for uniqueness
 */
export function generateAnchorId(title: string, index?: number): string {
  const baseSlug = slugify(title);
  return index !== undefined ? `${baseSlug}-${index}` : baseSlug;
}

/**
 * Get anchor ID from a section
 */
export function getSectionAnchorId(sectionId: string, title?: string): string {
  if (title) {
    return slugify(title);
  }
  return sectionId;
}
