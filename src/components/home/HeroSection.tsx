'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link2, ClipboardPaste, Download, AlertCircle, Film, Video, Image, Eye, Layers, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import { useDownloadStore } from '@/store/downloadStore';
import toast from 'react-hot-toast';
import type { ContentType } from '@/types';

const categories = [
  {
    id: 'reel' as ContentType,
    label: 'Reels',
    icon: <Film className="w-4 h-4" />,
    description: 'Download Instagram Reels in HD quality. Save your favorite short videos instantly.',
  },
  {
    id: 'video' as ContentType,
    label: 'Video',
    icon: <Video className="w-4 h-4" />,
    description: 'Download Instagram videos in high quality. Works with all public video posts.',
  },
  {
    id: 'photo' as ContentType,
    label: 'Photo',
    icon: <Image className="w-4 h-4" />,
    description: 'Download Instagram photos in full resolution. Save images without compression.',
  },
  {
    id: 'story' as ContentType,
    label: 'Story',
    icon: <Eye className="w-4 h-4" />,
    description: 'Download public Instagram stories before they disappear. Photos and videos supported.',
  },
  {
    id: 'carousel' as ContentType,
    label: 'Carousel',
    icon: <Layers className="w-4 h-4" />,
    description: 'Download all images and videos from carousel posts. Individual or batch download.',
  },
  {
    id: 'profile_picture' as ContentType,
    label: 'Profile Picture',
    icon: <User className="w-4 h-4" />,
    description: 'View and download Instagram profile pictures in full resolution.',
  },
];

export default function HeroSection() {
  const { url, setUrl, status, error, fetchMedia, clearMedia } = useDownloadStore();
  const [inputError, setInputError] = useState('');
  const [activeTab, setActiveTab] = useState<ContentType>('reel');
  const activeCategory = categories.find(c => c.id === activeTab);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setInputError('');
        toast.success('URL pasted from clipboard!');
      }
    } catch {
      toast.error('Unable to access clipboard. Please paste manually.');
    }
  }, [setUrl]);

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) {
      setInputError('Please enter an Instagram URL');
      return;
    }
    setInputError('');
    await fetchMedia();
  }, [url, fetchMedia]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-32 pb-16 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 dark:bg-pink-500/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8 sm:whitespace-nowrap"
        >
          <span className="gradient-text">Videos, Reels, Photos &amp; Stories</span>
        </motion.h1>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 flex flex-col items-center justify-center gap-4"
        >
          <Tabs
            tabs={categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon }))}
            activeTab={activeTab}
            onTabChange={(id) => {
              setActiveTab(id as ContentType);
              setInputError('');
            }}
          />
          {activeCategory && (
            <p className="text-text-light-tertiary dark:text-text-dark-tertiary text-sm max-w-xl mx-auto animate-fade-in transition-all duration-300">
              {activeCategory.description}
            </p>
          )}
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Input
            id="instagram-url-input"
            placeholder={activeCategory ? `Paste Instagram ${activeCategory.label} URL here...` : "Paste Instagram URL here..."}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setInputError('');
            }}
            onKeyDown={handleKeyDown}
            icon={<Link2 className="w-5 h-5" />}
            error={inputError || (status === 'error' ? error : '')}
            rightElement={
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePaste}
                  icon={<ClipboardPaste className="w-4 h-4" />}
                  className="!px-3"
                  aria-label="Paste from clipboard"
                  id="paste-url-button"
                >
                  Paste
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  loading={status === 'loading'}
                  icon={<Download className="w-4 h-4" />}
                  id="download-button"
                >
                  Download
                </Button>
              </div>
            }
          />
        </motion.div>

        {/* Error message with icon */}
        {status === 'error' && error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-4 text-red-400"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Quick stats */}
        {status === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-text-light-tertiary dark:text-text-dark-tertiary"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No Registration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              HD Quality
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              Secure &amp; Private
            </span>
          </motion.div>
        )}

        {/* Clear button when results shown */}
        {(status === 'success' || status === 'error') && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={clearMedia}
            className="mt-4 text-sm text-text-light-tertiary dark:text-text-dark-tertiary hover:text-primary-500 transition-colors cursor-pointer"
          >
            ← Try another URL
          </motion.button>
        )}
      </div>
    </section>
  );
}
