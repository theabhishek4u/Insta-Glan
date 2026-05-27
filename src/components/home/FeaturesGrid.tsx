'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Download, MonitorSmartphone, Lock, Infinity } from 'lucide-react';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Download content in seconds. Our optimized servers ensure the fastest possible download speeds.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Infinity className="w-6 h-6" />,
    title: '100% Free',
    description: 'Completely free to use with no hidden charges, subscriptions, or premium tiers required.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'HD Quality',
    description: 'Download videos and photos in the highest available quality. No compression, no quality loss.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Private',
    description: 'We don\'t store your data or downloaded content. Your privacy is our top priority.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'No Login Required',
    description: 'No need to create an account or log in to your Instagram. Just paste the URL and download.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: 'All Formats',
    description: 'Support for reels, videos, photos, stories, carousels, and profile pictures — all in one tool.',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4 bg-surface-light-secondary/50 dark:bg-surface-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Why Choose <span className="gradient-text">Insta Glan</span>?
          </h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary max-w-xl mx-auto">
            The most reliable and feature-rich Instagram downloader built with you in mind.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card hover={true} className="p-7 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 shadow-glow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
