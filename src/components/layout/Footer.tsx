import Link from 'next/link';
import { Download, Heart } from 'lucide-react';

const footerLinks = {
  tools: [
    { label: 'Reels Downloader', href: '/#reels' },
    { label: 'Video Downloader', href: '/#video' },
    { label: 'Photo Downloader', href: '/#photo' },
    { label: 'Story Downloader', href: '/#story' },
    { label: 'Carousel Downloader', href: '/#carousel' },
    { label: 'Profile Picture', href: '/#profile' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'DMCA Policy', href: '/dmca' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border-light dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-primary opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display">
                <span className="gradient-text">Insta</span>
                <span className="text-text-light-primary dark:text-text-dark-primary"> Glan</span>
              </span>
            </Link>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
              Fast, free, and secure Instagram downloader for reels, videos, photos, stories, and more.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-light-primary dark:text-text-dark-primary uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
          <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary text-center leading-relaxed mb-6">
            <strong>Disclaimer:</strong> Insta Glan supports only publicly accessible Instagram content. Users are responsible for respecting copyright and Instagram&apos;s terms of service. This tool is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
              &copy; {new Date().getFullYear()} Insta Glan. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
