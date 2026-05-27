import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Insta Glan handles your data and protects your privacy. We are committed to transparency and user privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:gradient-text prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 !gradient-text">Privacy Policy</h1>
        <p className="text-text-light-tertiary dark:text-text-dark-tertiary text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <h2>1. Information We Collect</h2>
        <p>Insta Glan is designed with privacy in mind. We collect minimal data necessary to provide our service:</p>
        <ul>
          <li><strong>URLs Submitted:</strong> We temporarily process Instagram URLs you provide to fetch content. These URLs are not stored after processing.</li>
          <li><strong>Usage Data:</strong> We may collect anonymous usage statistics such as page views, download counts, and general browser/device information to improve our service.</li>
          <li><strong>Cookies:</strong> We use essential cookies to remember your theme preference (dark/light mode). No tracking cookies are used.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>The limited information we collect is used solely to:</p>
        <ul>
          <li>Process your download requests</li>
          <li>Improve our service performance and user experience</li>
          <li>Prevent abuse and enforce rate limits</li>
          <li>Remember your display preferences</li>
        </ul>

        <h2>3. Data Storage</h2>
        <p>Insta Glan does not store downloaded content or Instagram URLs on our servers. All download processing happens in real-time, and data is discarded immediately after delivery to your browser. Download history is stored only in your browser&apos;s local storage.</p>

        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services for:</p>
        <ul>
          <li>Content delivery and hosting (Vercel)</li>
          <li>Anonymous analytics (if enabled)</li>
          <li>Advertising (Google AdSense, if enabled)</li>
        </ul>
        <p>These services may collect their own data in accordance with their respective privacy policies.</p>

        <h2>5. Advertising</h2>
        <p>Our website may display advertisements through Google AdSense or similar ad networks. These services may use cookies and similar technologies to serve relevant ads. You can opt out of personalized advertising through your browser settings or ad preferences.</p>

        <h2>6. Children&apos;s Privacy</h2>
        <p>Insta Glan is not intended for children under 13 years of age. We do not knowingly collect personal information from children.</p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Clear your local download history at any time</li>
          <li>Disable cookies in your browser settings</li>
          <li>Request information about any data we may hold (contact us)</li>
        </ul>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@instaglan.com">support@instaglan.com</a>.</p>
      </article>
    </div>
  );
}
