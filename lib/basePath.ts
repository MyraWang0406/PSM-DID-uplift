/**
 * BasePath helper for GitHub Pages and Cloudflare Pages compatibility
 * 
 * GitHub Pages: /PSM-DID-uplift
 * Cloudflare Pages: (empty, root path)
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Adds basePath to a path
 * @param path - The path to add basePath to
 * @returns The path with basePath prepended
 * 
 * @example
 * withBase("/funnel_by_channel.json") // "/PSM-DID-uplift/funnel_by_channel.json" (GitHub) or "/funnel_by_channel.json" (Cloudflare)
 */
export const withBase = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Remove trailing slash from base if exists
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${normalizedPath}`;
};


