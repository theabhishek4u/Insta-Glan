import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA Policy',
  description: 'Insta Glan DMCA policy for copyright claims and takedown requests.',
};

export default function DMCAPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-display prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">DMCA Policy</h1>
        <p className="text-text-light-tertiary dark:text-text-dark-tertiary text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <h2>1. Overview</h2>
        <p>Insta Glan respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to valid notices of alleged copyright infringement.</p>

        <h2>2. How Our Service Works</h2>
        <p>Insta Glan is a tool that helps users download publicly accessible content from Instagram. We do not host, store, or cache any Instagram content on our servers. All downloads are processed in real-time directly from Instagram&apos;s public CDN.</p>

        <h2>3. Filing a DMCA Notice</h2>
        <p>If you believe that content accessible through our service infringes your copyright, you may file a DMCA takedown notice. Your notice must include:</p>
        <ul>
          <li>A physical or electronic signature of the copyright owner or authorized agent</li>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material that is claimed to be infringing, with sufficient detail for us to locate it</li>
          <li>Your contact information (address, phone number, email)</li>
          <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
          <li>A statement, under penalty of perjury, that the information in the notice is accurate</li>
        </ul>

        <h2>4. Where to Send Notices</h2>
        <p>DMCA notices should be sent to:</p>
        <p>Email: <a href="mailto:dmca@instaglan.com">dmca@instaglan.com</a></p>

        <h2>5. Response Process</h2>
        <p>Upon receiving a valid DMCA notice, we will:</p>
        <ul>
          <li>Review the notice for completeness and validity</li>
          <li>Take appropriate action, which may include blocking access to specific URLs</li>
          <li>Notify the affected parties as appropriate</li>
        </ul>

        <h2>6. Counter-Notification</h2>
        <p>If you believe your content was removed in error, you may file a counter-notification containing:</p>
        <ul>
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that was removed</li>
          <li>A statement under penalty of perjury that the material was removed by mistake</li>
          <li>Your name, address, and phone number</li>
          <li>Consent to the jurisdiction of the federal district court</li>
        </ul>

        <h2>7. Repeat Infringers</h2>
        <p>We reserve the right to terminate access for users who are repeat infringers.</p>

        <h2>8. Important Note</h2>
        <p>Since Insta Glan does not store content, the most effective way to address copyright concerns is to contact Instagram directly to make the original content private or request its removal from their platform.</p>
      </article>
    </div>
  );
}
