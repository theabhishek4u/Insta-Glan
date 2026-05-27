import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the terms and conditions for using Insta Glan, our Instagram content downloader service.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms &amp; Conditions</h1>
        <p className="text-text-light-tertiary dark:text-text-dark-tertiary text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using Insta Glan, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our service.</p>

        <h2>2. Service Description</h2>
        <p>Insta Glan provides a free online tool for downloading publicly accessible Instagram content including reels, videos, photos, stories, carousel posts, and profile pictures. Our service only works with public content and does not bypass any privacy settings.</p>

        <h2>3. Acceptable Use</h2>
        <p>You agree to use Insta Glan only for lawful purposes. You must NOT:</p>
        <ul>
          <li>Download content from private accounts</li>
          <li>Use downloaded content for commercial purposes without the creator&apos;s permission</li>
          <li>Redistribute or resell downloaded content</li>
          <li>Use our service to infringe upon copyright or intellectual property rights</li>
          <li>Attempt to bypass rate limits or abuse our API</li>
          <li>Use automated scripts or bots to access our service</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>All content downloaded through our service remains the intellectual property of its respective creators. Insta Glan does not claim ownership of any downloaded content. Users are solely responsible for ensuring they have the right to download and use any content.</p>

        <h2>5. Copyright Compliance</h2>
        <p>Insta Glan respects copyright laws and expects users to do the same. If you believe your copyrighted content is being improperly distributed through our service, please contact us or refer to our <a href="/dmca">DMCA Policy</a>.</p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>Insta Glan is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that all content will be available for download.</p>

        <h2>7. Limitation of Liability</h2>
        <p>Insta Glan shall not be liable for any damages arising from the use or inability to use our service, including but not limited to direct, indirect, incidental, or consequential damages.</p>

        <h2>8. Rate Limiting</h2>
        <p>To ensure fair use and service stability, we implement rate limiting. Excessive requests may result in temporary access restrictions.</p>

        <h2>9. Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

        <h2>10. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>

        <h2>11. Contact</h2>
        <p>For questions regarding these terms, please contact us at <a href="mailto:support@instaglan.com">support@instaglan.com</a>.</p>
      </article>
    </div>
  );
}
