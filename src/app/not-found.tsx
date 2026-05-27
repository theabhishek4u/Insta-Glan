'use client';

import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
          className="text-[140px] md:text-[180px] font-bold font-display leading-none gradient-text mb-2"
        >
          404
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold font-display mb-4">
          Page Not Found
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button icon={<Home className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline" icon={<Search className="w-4 h-4" />}>
              Browse FAQ
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
