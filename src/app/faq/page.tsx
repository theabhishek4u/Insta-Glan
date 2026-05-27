import type { Metadata } from 'next';
import FAQSection from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Find answers to common questions about Insta Glan, our Instagram downloader. Learn about supported formats, privacy, quality, and more.',
};

export default function FAQPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
          <span className="gradient-text">FAQ</span>
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-lg">
          Find answers to all your questions about using Insta Glan
        </p>
      </div>
      <FAQSection />
    </div>
  );
}
