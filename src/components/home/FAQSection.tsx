'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is Insta Glan free to use?',
    answer: 'Yes! Insta Glan is completely free to use. There are no hidden charges, premium tiers, or subscription fees. You can download unlimited Instagram content without paying anything.',
  },
  {
    question: 'Do I need an Instagram account to download content?',
    answer: 'No, you do not need an Instagram account or login. Simply paste the public URL of the Instagram content you want to download, and our tool will handle the rest.',
  },
  {
    question: 'What types of Instagram content can I download?',
    answer: 'You can download public Instagram Reels, Videos, Photos, Stories, Carousel posts (multiple images/videos), and Profile Pictures. All public content types are supported.',
  },
  {
    question: 'Can I download content from private Instagram accounts?',
    answer: 'No. Insta Glan only supports publicly accessible Instagram content. We do not and cannot access private accounts, as we respect Instagram\'s privacy settings and user privacy.',
  },
  {
    question: 'What quality are the downloads?',
    answer: 'We provide the highest available quality for all downloads. Videos are typically available in HD (1080p), and photos are saved in their original resolution without any compression.',
  },
  {
    question: 'Is it safe to use Insta Glan?',
    answer: 'Absolutely. Insta Glan is 100% safe to use. We don\'t store your personal data, downloaded content, or browsing history. All downloads are processed securely on our servers.',
  },
  {
    question: 'Does Insta Glan store the downloaded content?',
    answer: 'No. We do not store any content on our servers. Downloads are processed in real-time and delivered directly to your device. Once the download is complete, no data is retained.',
  },
  {
    question: 'How do I download Instagram Stories?',
    answer: 'To download a story, you need the direct URL of the public story. Paste the Instagram story URL into the input field and click Download. Note that stories must be from public accounts.',
  },
  {
    question: 'Can I download multiple items from a carousel post?',
    answer: 'Yes! When you paste a carousel post URL, Insta Glan will detect all items in the carousel. You can download them individually or use the "Download All" button to save everything at once.',
  },
  {
    question: 'Is downloading Instagram content legal?',
    answer: 'Downloading publicly available content for personal use is generally acceptable. However, you are responsible for respecting copyright laws and Instagram\'s terms of service. Do not use downloaded content for commercial purposes without the creator\'s permission.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            Everything you need to know about Insta Glan
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-light-tertiary/50 dark:hover:bg-surface-dark-tertiary/50 transition-colors cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-text-light-primary dark:text-text-dark-primary pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-text-light-tertiary dark:text-text-dark-tertiary" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed border-t border-border-light/50 dark:border-border-dark/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
