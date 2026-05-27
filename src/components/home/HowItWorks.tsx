'use client';

import { motion } from 'framer-motion';
import { Link2, Search, Download } from 'lucide-react';
import Card from '@/components/ui/Card';

const steps = [
  {
    number: '01',
    title: 'Paste URL',
    description: 'Copy the Instagram URL of the content you want to download and paste it in the input field above.',
    icon: <Link2 className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '02',
    title: 'Fetch Media',
    description: 'Click the Download button and we\'ll instantly fetch the media details, preview, and available quality options.',
    icon: <Search className="w-6 h-6" />,
    color: 'from-pink-500 to-blue-500',
  },
  {
    number: '03',
    title: 'Download',
    description: 'Choose your preferred quality and download the content directly to your device. It\'s that simple!',
    icon: <Download className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary max-w-xl mx-auto">
            Download Instagram content in just three simple steps. No registration or login required.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 -translate-y-1/2" />

          {steps.map((step) => (
            <motion.div key={step.number} variants={itemVariants}>
              <Card hover={true} className="p-8 text-center relative">
                {/* Number */}
                <div className="absolute top-4 right-4 text-5xl font-bold text-surface-light-tertiary dark:text-surface-dark-tertiary font-display">
                  {step.number}
                </div>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-6 shadow-glow-sm`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
