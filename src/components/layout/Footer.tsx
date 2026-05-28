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
    <footer className="relative mt-20 border-t border-border-light dark:border-border-dark bg-surface-light-secondary/60 dark:bg-surface-dark-secondary/60 backdrop-blur-md">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px gradient-primary opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-premium-glow hover:scale-105 transition-transform duration-300">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">
                <span className="gradient-text">Insta</span>
                <span className="text-text-light-primary dark:text-text-dark-primary group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"> Glan</span>
              </span>
            </Link>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
              Fast, free, and secure Instagram downloader. Download reels, videos, photos, stories, and carousels in high quality. No login required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-6 after:h-[2px] after:bg-gradient-to-r after:from-primary-500 after:to-pink-500">
              Tools
            </h3>
            <ul className="space-y-4 pt-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors hover-underline-expand inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-6 after:h-[2px] after:bg-gradient-to-r after:from-pink-500 after:to-blue-500">
              Legal
            </h3>
            <ul className="space-y-4 pt-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors hover-underline-expand inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-text-light-primary dark:text-text-dark-primary uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-6 after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-purple-500">
              Company
            </h3>
            <ul className="space-y-4 pt-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors hover-underline-expand inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-border-light dark:border-border-dark">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
              &copy; {new Date().getFullYear()} Insta Glan. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5 text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
