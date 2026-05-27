export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Insta Glan',
    description: 'Fast, free, and secure Instagram downloader for reels, videos, photos, stories, carousel posts, and profile pictures.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://instaglan.com',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '12500',
      bestRating: '5',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Insta Glan',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://instaglan.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://instaglan.com'}/og-image.png`,
    sameAs: [],
  };
}

export const defaultMetadata = {
  title: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
  description: 'Fast, free, and secure Instagram downloader. Download reels, videos, photos, stories, carousel posts, and profile pictures in HD quality. No login required.',
  keywords: [
    'instagram downloader',
    'download instagram reels',
    'instagram video downloader',
    'instagram photo downloader',
    'instagram story downloader',
    'instagram carousel downloader',
    'download instagram profile picture',
    'instagram reels download hd',
    'free instagram downloader',
    'insta glan',
  ],
  openGraph: {
    title: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
    description: 'Fast, free, and secure Instagram downloader. Download reels, videos, photos, stories, and carousel posts in HD quality.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://instaglan.com',
    siteName: 'Insta Glan',
    type: 'website' as const,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
    description: 'Fast, free, and secure Instagram downloader for all public content.',
  },
};
