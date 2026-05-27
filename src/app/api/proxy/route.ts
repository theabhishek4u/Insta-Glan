import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mediaUrl = searchParams.get('url');

  if (!mediaUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const decodedUrl = decodeURIComponent(mediaUrl);

    // Only allow proxying from Instagram CDN domains and known safe domains
    const allowedDomains = [
      'cdninstagram.com',
      'scontent',
      'instagram.f',
      'fbcdn.net',
      'instagram.com',
      'picsum.photos',     // for dev
      'sample-videos.com', // for dev
    ];

    const url = new URL(decodedUrl);
    const isAllowed = allowedDomains.some(domain => url.hostname.includes(domain));

    if (!isAllowed) {
      return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 });
    }

    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch media' }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const isVideo = contentType.includes('video');
    const extension = isVideo ? 'mp4' : 'jpg';
    const filename = `instaglan_${Date.now()}.${extension}`;

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to proxy media' }, { status: 500 });
  }
}
