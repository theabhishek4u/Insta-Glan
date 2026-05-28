import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { inter, outfit } from '@/lib/fonts';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
    template: '%s | Insta Glan',
  },
  description: 'Fast, free, and secure Instagram downloader. Download reels, videos, photos, stories, carousel posts, and profile pictures in HD quality. No login required.',
  keywords: [
    'instagram downloader',
    'download instagram reels',
    'instagram video downloader',
    'instagram photo downloader',
    'instagram story downloader',
    'instagram carousel downloader',
    'download instagram profile picture',
    'free instagram downloader',
  ],
  authors: [{ name: 'Insta Glan' }],
  creator: 'Insta Glan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://instaglan.com'),
  openGraph: {
    title: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
    description: 'Fast, free, and secure Instagram downloader for all public content.',
    url: '/',
    siteName: 'Insta Glan',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insta Glan — Download Instagram Reels, Videos, Photos & Stories',
    description: 'Fast, free, and secure Instagram downloader for all public content.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('insta-glan-theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (!theme && window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '12px',
                padding: '14px 20px',
                fontSize: '14px',
              },
              success: {
                style: {
                  background: '#1a1a2e',
                  color: '#f0f0ff',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                },
              },
              error: {
                style: {
                  background: '#1a1a2e',
                  color: '#f0f0ff',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
