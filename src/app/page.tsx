import HeroSection from '@/components/home/HeroSection';
import PreviewCard from '@/components/home/PreviewCard';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import FAQSection from '@/components/home/FAQSection';
import DownloadManager from '@/components/download/DownloadManager';
import AdSlot from '@/components/layout/AdSlot';
import { generateWebApplicationSchema, generateOrganizationSchema } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PreviewCard />
      <HowItWorks />
      <FeaturesGrid />
      <AdSlot format="banner" className="max-w-4xl mx-auto my-8 px-4" />
      <FAQSection />

      {/* Legal Disclaimer */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary leading-relaxed">
            <strong>Legal Disclaimer:</strong> Insta Glan supports only publicly accessible Instagram content. Users are responsible for respecting copyright and Instagram&apos;s terms of service. This website is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc.
          </p>
        </div>
      </section>

      <DownloadManager />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
    </>
  );
}
