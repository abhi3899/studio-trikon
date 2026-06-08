/**
 * Resolves any supported image URL to a direct, CDN-served image URL.
 * Supports: Google Drive share links, lh3.googleusercontent.com, plain URLs.
 *
 * Google Drive CDN supports width params: =w400, =w900, =w1400, =w1800
 * This is served from Google's global CDN — fast everywhere.
 */

export function extractDriveFileId(url: string): string | null {
  // https://drive.google.com/file/d/FILE_ID/view
  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID
  const patterns = [
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/,
    /lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

export function isGoogleDriveUrl(url: string): boolean {
  return (
    url.includes('drive.google.com') ||
    url.includes('lh3.googleusercontent.com')
  )
}

/**
 * Returns a direct image URL at the given pixel width.
 * For Google Drive URLs, uses lh3 CDN with size param.
 * For all other URLs, returns as-is (no server-side resizing available).
 */
export function resolveImageUrl(url: string, width?: number): string {
  if (!url) return url

  const fileId = extractDriveFileId(url)
  if (fileId) {
    const base = `https://lh3.googleusercontent.com/d/${fileId}`
    return width ? `${base}=w${width}` : base
  }

  return url
}

/**
 * Returns the best URL for each display context.
 * thumbnail → 400px  (project card cover, admin table)
 * cover     → 900px  (project card full, homepage)
 * hero      → 1400px (project detail top, homepage hero)
 * full      → 1800px (lightbox)
 */
export type ImageSize = 'thumbnail' | 'cover' | 'hero' | 'full'

const SIZE_MAP: Record<ImageSize, number> = {
  thumbnail: 400,
  cover: 900,
  hero: 1400,
  full: 1800,
}

export function getImageUrl(url: string, size: ImageSize = 'cover'): string {
  return resolveImageUrl(url, SIZE_MAP[size])
}
