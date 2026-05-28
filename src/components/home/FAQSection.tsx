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
    <section className="relative py-24 px-4 overflow-hidden bg-grid-pattern/30 border-t border-border-light/10 dark:border-border-dark/10" id="faq">
      {/* Premium Background Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[5%] w-[350px] h-[350px] rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] rounded-full bg-pink-500/10 dark:bg-pink-500/5 blur-[80px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base max-w-md mx-auto">
            Everything you need to know about downloading with Insta Glan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                openIndex === index 
                  ? 'border-primary-500/35 dark:border-primary-400/35 bg-white/80 dark:bg-white/[0.06] shadow-glow-sm scale-[1.01] z-10' 
                  : 'border-border-light dark:border-border-dark bg-white/30 dark:bg-white/[0.01] hover:border-primary-500/20 dark:hover:border-primary-400/20 hover:bg-white/50 dark:hover:bg-white/[0.025] hover:scale-[1.005] hover:shadow-card'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors cursor-pointer group"
                aria-expanded={openIndex === index}
              >
                <span className={`text-base font-semibold pr-4 transition-colors duration-300 ${
                  openIndex === index 
                    ? 'text-primary-600 dark:text-primary-400 font-bold' 
                    : 'text-text-light-primary dark:text-text-dark-primary group-hover:text-primary-500 dark:group-hover:text-primary-400'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-primary-500/15 text-primary-500 shadow-glow-sm' 
                      : 'bg-surface-light-tertiary dark:bg-surface-dark-tertiary text-text-light-tertiary dark:text-text-dark-tertiary group-hover:bg-primary-500/10 group-hover:text-primary-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed border-t border-border-light/30 dark:border-border-dark/20 pt-4 bg-white/10 dark:bg-white/[0.005] font-normal">
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
