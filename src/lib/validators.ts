const INSTAGRAM_URL_REGEX = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|stories|tv|s)\/[\w.-]+(\/[\w.-]+)?\/?(\?.*)?$/i;
const INSTAGRAM_PROFILE_REGEX = /^https?:\/\/(www\.)?instagram\.com\/[\w.]+\/?(\?.*)?$/i;
const INSTAGRAM_DOMAIN_REGEX = /^https?:\/\/(www\.)?instagram\.com/i;

export type DetectedContentType = 'reel' | 'video' | 'photo' | 'carousel' | 'story' | 'profile_picture' | 'post' | 'unknown';

export function isValidInstagramUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!INSTAGRAM_DOMAIN_REGEX.test(trimmed)) return false;
  return INSTAGRAM_URL_REGEX.test(trimmed) || INSTAGRAM_PROFILE_REGEX.test(trimmed);
}

export function getContentType(url: string): DetectedContentType {
  if (!url) return 'unknown';
  const trimmed = url.trim().toLowerCase();

  if (/\/reel\/|\/reels\//.test(trimmed)) return 'reel';
  if (/\/tv\//.test(trimmed)) return 'video';
  if (/\/stories\//.test(trimmed)) return 'story';
  if (/\/p\//.test(trimmed)) return 'post'; // could be photo/video/carousel
  if (/\/s\//.test(trimmed)) return 'post';

  // Profile URL pattern: instagram.com/username
  if (INSTAGRAM_PROFILE_REGEX.test(trimmed) && !INSTAGRAM_URL_REGEX.test(trimmed)) {
    return 'profile_picture';
  }

  return 'unknown';
}

export function sanitizeUrl(url: string): string {
  if (!url) return '';
  let sanitized = url.trim();

  // Remove tracking parameters
  try {
    const urlObj = new URL(sanitized);
    const paramsToRemove = ['igshid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    paramsToRemove.forEach(param => urlObj.searchParams.delete(param));
    sanitized = urlObj.toString();
  } catch {
    // If URL parsing fails, return the trimmed URL as-is
  }

  // Remove trailing slash
  sanitized = sanitized.replace(/\/+$/, '');

  return sanitized;
}

export function getErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    INVALID_URL: 'Please enter a valid Instagram public URL.',
    PRIVATE_CONTENT: 'This content is from a private account and cannot be downloaded.',
    STORY_LOGIN_REQUIRED: 'Instagram Stories require login to access. Stories cannot be downloaded without authentication. Please try posts, reels, or photos instead.',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    API_FAILURE: 'Something went wrong while fetching the content. Please try again.',
    NOT_FOUND: 'Could not extract media. The content may be private, deleted, or temporarily unavailable.',
  };
  return messages[code] || 'An unexpected error occurred. Please try again.';
}
