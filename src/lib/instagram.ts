import type { MediaResponse, MediaItem } from '@/types';
import * as cheerio from 'cheerio';
import { execFile } from 'child_process';
import path from 'path';
import util from 'util';
import fs from 'fs';

const execFileAsync = util.promisify(execFile);

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';

// Browser-like headers to avoid Instagram blocking
const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'sec-ch-ua': '"Chromium";v="131", "Google Chrome";v="131"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
};

/**
 * Extract shortcode from an Instagram URL
 */
function extractShortcode(url: string): string | null {
  // Match /p/, /reel/, /reels/, /tv/ shortcode patterns
  const match = url.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (match) return match[2];

  // Match /stories/username/story_id
  const storyMatch = url.match(/\/stories\/[^/]+\/(\d+)/);
  if (storyMatch) return storyMatch[1];

  return null;
}

/**
 * Extract username from profile URL
 */
function extractUsername(url: string): string | null {
  const match = url.match(/instagram\.com\/([A-Za-z0-9_.]+)\/?(\?|$)/);
  if (match && !['p', 'reel', 'reels', 'tv', 'stories', 'explore', 'accounts', 'about', 'legal', 'developer', 'directory'].includes(match[1])) {
    return match[1];
  }
  return null;
}

// ======================================================
// STRATEGY 1: Scrape the Instagram embed page
// ======================================================
async function scrapeEmbedPage(url: string): Promise<MediaResponse | null> {
  try {
    const shortcode = extractShortcode(url);
    if (!shortcode) return null;

    // Instagram embed URL doesn't require login
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;

    const response = await fetch(embedUrl, {
      headers: {
        ...BROWSER_HEADERS,
        Referer: 'https://www.instagram.com/',
      },
      redirect: 'follow',
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);

    const media: MediaItem[] = [];
    let caption = '';
    let username = 'unknown';
    let thumbnail = '';

    // Extract username
    const usernameEl = $('.UsernameText, .Header .Username, a[href*="instagram.com"]');
    if (usernameEl.length > 0) {
      const href = usernameEl.attr('href') || usernameEl.text();
      const uMatch = href.match(/instagram\.com\/([A-Za-z0-9_.]+)/) || [null, usernameEl.text().replace('@', '').trim()];
      if (uMatch[1]) username = uMatch[1];
    }

    // Extract caption
    const captionEl = $('.Caption, .CaptionText, div[class*="Caption"]');
    if (captionEl.length > 0) {
      caption = captionEl.text().trim().substring(0, 500);
    }

    // Try to find video URL from the embed HTML
    // Instagram embeds often contain the video URL in a script tag
    const scripts = $('script').toArray();
    for (const script of scripts) {
      const content = $(script).html() || '';

      // Look for video_url in JSON data embedded in scripts
      const videoUrlMatch = content.match(/"video_url"\s*:\s*"([^"]+)"/);
      if (videoUrlMatch) {
        const videoUrl = videoUrlMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        media.push({
          url: videoUrl,
          type: 'video',
          quality: 'hd',
          width: 1080,
          height: 1920,
        });
      }

      // Look for display_url (image)
      const displayUrlMatch = content.match(/"display_url"\s*:\s*"([^"]+)"/);
      if (displayUrlMatch) {
        thumbnail = displayUrlMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
      }

      // Look for thumbnail_src
      const thumbMatch = content.match(/"thumbnail_src"\s*:\s*"([^"]+)"/);
      if (thumbMatch && !thumbnail) {
        thumbnail = thumbMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
      }
    }

    // Also try finding video from HTML video elements
    const videoEl = $('video');
    if (videoEl.length > 0) {
      const videoSrc = videoEl.attr('src') || videoEl.find('source').attr('src');
      if (videoSrc && !media.some((m) => m.type === 'video')) {
        media.push({
          url: videoSrc,
          type: 'video',
          quality: 'hd',
          width: 1080,
          height: 1920,
        });
      }
      // Get poster as thumbnail
      const poster = videoEl.attr('poster');
      if (poster && !thumbnail) {
        thumbnail = poster;
      }
    }

    // Extract image from embed if no video found
    const imgEl = $('img.EmbeddedMediaImage, img[class*="Media"], img[src*="cdninstagram"], img[src*="scontent"]');
    if (imgEl.length > 0) {
      const imgSrc = imgEl.attr('src');
      if (imgSrc) {
        if (!thumbnail) thumbnail = imgSrc;
        if (media.length === 0) {
          media.push({
            url: imgSrc,
            type: 'image',
            quality: 'hd',
            width: 1080,
            height: 1080,
          });
        }
      }
    }

    if (media.length === 0) return null;

    // Determine type
    const isReel = url.includes('/reel/') || url.includes('/reels/');
    const hasVideo = media.some((m) => m.type === 'video');
    const type = isReel ? 'reel' : hasVideo ? 'video' : 'photo';

    return {
      type,
      thumbnail: thumbnail || media[0]?.url || '',
      username,
      caption,
      media,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[Strategy 1 - Embed] Failed:', error);
    return null;
  }
}

// ======================================================
// STRATEGY 2: Scrape the main Instagram page for og tags
// ======================================================
async function scrapeOgTags(url: string): Promise<MediaResponse | null> {
  try {
    const response = await fetch(url, {
      headers: BROWSER_HEADERS,
      redirect: 'follow',
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Check for login wall / private content
    if (html.includes('Login') && html.includes('log in') && html.length < 50000) {
      return null;
    }

    const $ = cheerio.load(html);

    const media: MediaItem[] = [];
    let thumbnail = '';
    let username = 'unknown';
    let caption = '';

    // Extract OG meta tags
    const ogVideo = $('meta[property="og:video"]').attr('content') ||
                     $('meta[property="og:video:url"]').attr('content') ||
                     $('meta[property="og:video:secure_url"]').attr('content');
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content') || '';
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';

    // Extract username from og:title like "@username on Instagram"
    const titleUserMatch = ogTitle.match(/@?([A-Za-z0-9_.]+)\s+on\s+Instagram/i);
    if (titleUserMatch) username = titleUserMatch[1];

    // Caption from description
    if (ogDescription) {
      caption = ogDescription.replace(/^\d+\s+(Likes?,?\s*)?/i, '').substring(0, 500);
    }

    if (ogImage) thumbnail = ogImage;

    if (ogVideo) {
      media.push({
        url: ogVideo,
        type: 'video',
        quality: 'hd',
        width: 1080,
        height: 1920,
      });
    }

    // Also look in script tags for additional JSON data
    const scripts = $('script[type="application/ld+json"]').toArray();
    for (const script of scripts) {
      try {
        const jsonData = JSON.parse($(script).html() || '{}');
        if (jsonData.video && jsonData.video.contentUrl) {
          const videoUrl = jsonData.video.contentUrl;
          if (!media.some((m) => m.url === videoUrl)) {
            media.push({
              url: videoUrl,
              type: 'video',
              quality: 'hd',
              width: 1080,
              height: 1920,
            });
          }
        }
        if (jsonData.contentUrl && !media.some((m) => m.url === jsonData.contentUrl)) {
          const isVid = jsonData['@type'] === 'VideoObject';
          media.push({
            url: jsonData.contentUrl,
            type: isVid ? 'video' : 'image',
            quality: 'hd',
            width: 1080,
            height: isVid ? 1920 : 1080,
          });
        }
      } catch {
        // skip invalid JSON
      }
    }

    // Look for __additionalDataLoaded or window._sharedData in inline scripts
    const allScripts = $('script:not([src])').toArray();
    for (const script of allScripts) {
      const content = $(script).html() || '';

      // Extract video_url from embedded JSON
      const videoMatches = content.matchAll(/"video_url"\s*:\s*"([^"]+)"/g);
      for (const match of videoMatches) {
        const videoUrl = match[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        if (!media.some((m) => m.url === videoUrl)) {
          media.push({
            url: videoUrl,
            type: 'video',
            quality: 'hd',
            width: 1080,
            height: 1920,
          });
        }
      }

      // Extract display_url from embedded JSON
      const displayMatches = content.matchAll(/"display_url"\s*:\s*"([^"]+)"/g);
      for (const match of displayMatches) {
        const imgUrl = match[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
        if (!thumbnail) thumbnail = imgUrl;
        if (!media.some((m) => m.url === imgUrl)) {
          media.push({
            url: imgUrl,
            type: 'image',
            quality: 'hd',
            width: 1080,
            height: 1080,
          });
        }
      }
    }

    // If we only have an og:image and no other media, use it
    if (media.length === 0 && ogImage) {
      media.push({
        url: ogImage,
        type: 'image',
        quality: 'hd',
        width: 1080,
        height: 1080,
      });
    }

    if (media.length === 0) return null;

    const isReel = url.includes('/reel/') || url.includes('/reels/');
    const hasVideo = media.some((m) => m.type === 'video');
    const type = isReel ? 'reel' : hasVideo ? 'video' : 'photo';

    return {
      type,
      thumbnail: thumbnail || media[0]?.url || '',
      username,
      caption,
      media,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[Strategy 2 - OG Tags] Failed:', error);
    return null;
  }
}

// ======================================================
// STRATEGY 3: RapidAPI (paid, if key is available)
// ======================================================
interface RapidApiResponse {
  result?: {
    type?: string;
    thumbnail?: string;
    owner?: { username?: string; profile_pic_url?: string };
    caption?: { text?: string };
    video_url?: string;
    image_url?: string;
    display_url?: string;
    video_versions?: Array<{ url: string; width: number; height: number }>;
    image_versions2?: { candidates?: Array<{ url: string; width: number; height: number }> };
    carousel_media?: Array<{
      video_url?: string;
      image_url?: string;
      display_url?: string;
      video_versions?: Array<{ url: string; width: number; height: number }>;
      image_versions2?: { candidates?: Array<{ url: string; width: number; height: number }> };
    }>;
    taken_at?: number;
  };
  data?: {
    media_type?: number;
    thumbnail_url?: string;
    username?: string;
    caption?: string;
    video_url?: string;
    image_url?: string;
    display_url?: string;
    carousel?: Array<{
      video_url?: string;
      image_url?: string;
      is_video?: boolean;
    }>;
  };
  profile_pic_url_hd?: string;
  username?: string;
}

async function fetchFromRapidApi(url: string): Promise<MediaResponse | null> {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY === 'your_key_here' || RAPIDAPI_KEY === 'your_rapidapi_key_here') {
    return null;
  }

  try {
    const targetUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1/post_info?code_or_id_or_url=${encodeURIComponent(url)}`;
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
      },
    });

    if (!response.ok) return null;

    const data: RapidApiResponse = await response.json();
    const result = data.result || data.data;
    if (!result && !data.profile_pic_url_hd) return null;

    const media: MediaItem[] = [];

    // Handle carousel
    const carouselItems = data.result?.carousel_media || data.data?.carousel;
    if (carouselItems && carouselItems.length > 0) {
      for (const item of carouselItems) {
        const videoUrl = 'video_url' in item ? item.video_url : undefined;
        const imageUrl = 'image_url' in item ? item.image_url : ('display_url' in item ? item.display_url : undefined);
        const isVideo = !!videoUrl || ('is_video' in item && item.is_video);

        if (isVideo && videoUrl) {
          media.push({ url: videoUrl, type: 'video', quality: 'hd', width: 1080, height: 1920 });
        } else if (imageUrl) {
          media.push({ url: imageUrl, type: 'image', quality: 'hd', width: 1080, height: 1080 });
        }
      }
    }

    // Handle single video
    const videoUrl = data.result?.video_url || data.data?.video_url;
    if (videoUrl && media.length === 0) {
      media.push({ url: videoUrl, type: 'video', quality: 'hd', width: 1080, height: 1920 });
    }

    // Handle single image
    const imageUrl = data.result?.image_url || data.result?.display_url || data.data?.image_url || data.data?.display_url;
    if (imageUrl && media.length === 0) {
      media.push({ url: imageUrl, type: 'image', quality: 'hd', width: 1080, height: 1080 });
    }

    // Profile picture
    if (data.profile_pic_url_hd && media.length === 0) {
      media.push({ url: data.profile_pic_url_hd, type: 'image', quality: 'hd', width: 320, height: 320 });
    }

    if (media.length === 0) return null;

    const isReel = url.includes('/reel/') || url.includes('/reels/');
    const hasVideo = media.some((m) => m.type === 'video');
    const type = isReel ? 'reel' : hasVideo ? 'video' : data.profile_pic_url_hd ? 'profile_picture' : 'photo';

    return {
      type,
      thumbnail: data.result?.thumbnail || data.data?.thumbnail_url || media[0]?.url || '',
      username: data.result?.owner?.username || data.data?.username || data.username || 'unknown',
      caption: data.result?.caption?.text || data.data?.caption || '',
      media,
      timestamp: data.result?.taken_at ? new Date(data.result.taken_at * 1000).toISOString() : new Date().toISOString(),
      profilePicture: data.result?.owner?.profile_pic_url || '',
    };
  } catch (error) {
    console.error('[Strategy 3 - RapidAPI] Failed:', error);
    return null;
  }
}

// ======================================================
// STRATEGY 4: yt-dlp binary extraction (Primary Strategy)
// ======================================================
async function fetchFromYtDlp(url: string): Promise<MediaResponse | null> {
  try {
    const isWin = process.platform === 'win32';
    const ytDlpBinary = isWin ? 'yt-dlp.exe' : 'yt-dlp';
    const ytDlpPath = path.join(process.cwd(), ytDlpBinary);

    console.log(`[Instagram] Running yt-dlp at: ${ytDlpPath} for URL: ${url} (OS: ${process.platform})`);

    // On Linux/macOS, ensure the binary is executable
    if (!isWin) {
      try {
        if (fs.existsSync(ytDlpPath)) {
          fs.chmodSync(ytDlpPath, '755');
        } else {
          console.error(`[Instagram] Linux yt-dlp binary not found at: ${ytDlpPath}`);
          return null;
        }
      } catch (chmodError) {
        console.error('[Instagram] Failed to chmod yt-dlp binary:', chmodError);
      }
    }

    const { stdout } = await execFileAsync(
      ytDlpPath,
      ['--dump-json', url],
      { timeout: 30000 }
    );

    if (!stdout) return null;

    const data = JSON.parse(stdout);
    const media: MediaItem[] = [];
    let thumbnail = data.thumbnail || '';
    const username = data.uploader || data.uploader_id || 'unknown';
    const caption = data.description || data.title || '';

    // Handle playlist / multi-item carousel
    if (data._type === 'playlist' && Array.isArray(data.entries)) {
      for (const entry of data.entries) {
        if (!entry) continue;
        const entryUrl = entry.url;
        if (!entryUrl) continue;

        const isVideo = 
          entry.ext === 'mp4' || 
          (entry.vcodec && entry.vcodec !== 'none') || 
          (entry.url && (entry.url.includes('.mp4') || entry.url.includes('mime_type=video') || entry.url.includes('_v/') || entry.url.includes('/o1/')));
        media.push({
          url: entryUrl,
          type: isVideo ? 'video' : 'image',
          quality: 'hd',
          width: entry.width || (isVideo ? 1080 : 1080),
          height: entry.height || (isVideo ? 1920 : 1080),
        });
      }
    } else {
      // Single post
      const directUrl = data.url;
      if (directUrl) {
        const isVideo = 
          data.ext === 'mp4' || 
          (data.vcodec && data.vcodec !== 'none') || 
          url.includes('/reel/') || 
          url.includes('/reels/') || 
          url.includes('/tv/') ||
          (data.url && (data.url.includes('.mp4') || data.url.includes('mime_type=video') || data.url.includes('_v/') || data.url.includes('/o1/')));
        media.push({
          url: directUrl,
          type: isVideo ? 'video' : 'image',
          quality: 'hd',
          width: data.width || (isVideo ? 1080 : 1080),
          height: data.height || (isVideo ? 1920 : 1080),
        });
      }
    }

    if (media.length === 0 && Array.isArray(data.formats)) {
      // Fallback to formats
      const bestFormat = data.formats[data.formats.length - 1];
      if (bestFormat && bestFormat.url) {
        const isVideo = 
          data.ext === 'mp4' || 
          (data.vcodec && data.vcodec !== 'none') || 
          url.includes('/reel/') || 
          url.includes('/reels/') || 
          url.includes('/tv/') ||
          (bestFormat.url && (bestFormat.url.includes('.mp4') || bestFormat.url.includes('mime_type=video') || bestFormat.url.includes('_v/') || bestFormat.url.includes('/o1/')));
        media.push({
          url: bestFormat.url,
          type: isVideo ? 'video' : 'image',
          quality: 'hd',
          width: bestFormat.width || 1080,
          height: bestFormat.height || 1080,
        });
      }
    }

    if (media.length === 0) return null;

    const isReel = url.includes('/reel/') || url.includes('/reels/');
    const hasVideo = media.some((m) => m.type === 'video');
    const type = isReel ? 'reel' : hasVideo ? 'video' : media.length > 1 ? 'carousel' : 'photo';

    return {
      type,
      thumbnail: thumbnail || media[0]?.url || '',
      username,
      caption,
      media,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[Strategy 4 - yt-dlp] Failed:', error);
    return null;
  }
}

// ======================================================
// MAIN ENTRY: Try strategies in order
// ======================================================
export async function fetchMediaFromUrl(url: string): Promise<MediaResponse> {
  console.log(`[Instagram] Fetching media for: ${url}`);

  // Strategy 0: yt-dlp extraction (most robust local method)
  console.log('[Instagram] Trying Strategy 0: yt-dlp extraction...');
  const ytDlpResult = await fetchFromYtDlp(url);
  if (ytDlpResult && ytDlpResult.media.length > 0) {
    console.log('[Instagram] Strategy 0 (yt-dlp) succeeded!');
    return ytDlpResult;
  }

  // Strategy 1: Try embed page scraping (most reliable free method)
  console.log('[Instagram] Trying Strategy 1: Embed page scraping...');
  const embedResult = await scrapeEmbedPage(url);
  if (embedResult && embedResult.media.length > 0) {
    console.log('[Instagram] Strategy 1 succeeded!');
    return embedResult;
  }

  // Strategy 2: Try OG tag extraction from main page
  console.log('[Instagram] Trying Strategy 2: OG tag extraction...');
  const ogResult = await scrapeOgTags(url);
  if (ogResult && ogResult.media.length > 0) {
    console.log('[Instagram] Strategy 2 succeeded!');
    return ogResult;
  }

  // Strategy 3: Try RapidAPI (if key is configured)
  console.log('[Instagram] Trying Strategy 3: RapidAPI...');
  const rapidResult = await fetchFromRapidApi(url);
  if (rapidResult && rapidResult.media.length > 0) {
    console.log('[Instagram] Strategy 3 succeeded!');
    return rapidResult;
  }

  // All strategies failed
  console.error('[Instagram] All strategies failed for URL:', url);
  throw new Error('NOT_FOUND');
}
