import { NextRequest, NextResponse } from 'next/server';
import { isValidInstagramUrl, sanitizeUrl } from '@/lib/validators';
import { checkRateLimit } from '@/lib/rateLimiter';
import { fetchMediaFromUrl } from '@/lib/instagram';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               '127.0.0.1';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limited',
          code: 'RATE_LIMITED',
          message: `Too many requests. Please try again in ${Math.ceil(rateLimit.resetMs / 1000)} seconds.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Retry-After': Math.ceil(rateLimit.resetMs / 1000).toString(),
          },
        }
      );
    }

    // Parse body
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        {
          error: 'Invalid request',
          code: 'INVALID_URL',
          message: 'Please provide a valid Instagram URL.',
        },
        { status: 400 }
      );
    }

    // Validate URL
    const sanitizedUrl = sanitizeUrl(url);
    if (!isValidInstagramUrl(sanitizedUrl)) {
      return NextResponse.json(
        {
          error: 'Invalid URL',
          code: 'INVALID_URL',
          message: 'Please enter a valid Instagram public URL.',
        },
        { status: 400 }
      );
    }

    // Fetch media using multi-strategy approach
    const mediaData = await fetchMediaFromUrl(sanitizedUrl);

    return NextResponse.json(mediaData, {
      status: 200,
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'API_FAILURE';

    console.error('[Download API] Error:', errorMessage);

    const statusMap: Record<string, number> = {
      INVALID_URL: 400,
      PRIVATE_CONTENT: 403,
      STORY_LOGIN_REQUIRED: 403,
      NOT_FOUND: 404,
      RATE_LIMITED: 429,
      API_FAILURE: 500,
    };

    const messageMap: Record<string, string> = {
      INVALID_URL: 'Please enter a valid Instagram public URL.',
      PRIVATE_CONTENT: 'This content is from a private account and cannot be downloaded.',
      STORY_LOGIN_REQUIRED: 'Instagram Stories require login to access. Stories cannot be downloaded without authentication. Please try downloading posts, reels, or photos instead.',
      NOT_FOUND: 'Could not extract media from this URL. The content may be private, deleted, or temporarily unavailable. Please try again.',
      RATE_LIMITED: 'Too many requests. Please wait and try again.',
      API_FAILURE: 'Something went wrong while fetching the content. Please try again later.',
    };

    return NextResponse.json(
      {
        error: errorMessage,
        code: errorMessage,
        message: messageMap[errorMessage] || 'Something went wrong. Please try again later.',
      },
      { status: statusMap[errorMessage] || 500 }
    );
  }
}
