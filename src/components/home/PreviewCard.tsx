'use client';

import { motion } from 'framer-motion';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PreviewSkeleton } from '@/components/ui/Skeleton';
import { useDownloadStore } from '@/store/downloadStore';
import { downloadMedia, getProxyUrl, getPreviewUrl } from '@/lib/api';
import toast from 'react-hot-toast';

export default function PreviewCard() {
  const { status, mediaData } = useDownloadStore();
  const [expandedCaption, setExpandedCaption] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <section className="py-8 px-4">
        <PreviewSkeleton />
      </section>
    );
  }

  if (status !== 'success' || !mediaData) return null;

  const handleDownload = async (mediaUrl: string, index: number) => {
    const key = `${index}-${mediaUrl}`;
    setDownloading(key);
    try {
      const ext = mediaData.media[index]?.type === 'video' ? 'mp4' : 'jpg';
      const filename = `instaglan_${mediaData.username}_${Date.now()}_${index}.${ext}`;
      await downloadMedia(mediaUrl, filename);
      toast.success('Download started!');
    } catch {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const caption = mediaData.caption || '';
  const truncatedCaption = caption.length > 150 ? caption.substring(0, 150) + '...' : caption;

  return (
    <section className="py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-xl mx-auto rounded-2xl overflow-hidden bg-white/70 dark:bg-white/3 border border-border-light dark:border-border-dark backdrop-blur-xl shadow-card"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-border-light dark:border-border-dark">
          <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
            {mediaData.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-light-primary dark:text-text-dark-primary truncate">
              @{mediaData.username}
            </p>
            <p className="text-xs text-text-light-tertiary dark:text-text-dark-tertiary">
              {new Date(mediaData.timestamp).toLocaleDateString()}
            </p>
          </div>
          <Badge type={mediaData.type} />
        </div>

        {/* Media Preview */}
        <div className="relative bg-black/5 dark:bg-black/20">
          {mediaData.media[0]?.type === 'video' ? (
            <video
              src={getPreviewUrl(mediaData.media[0].url)}
              poster={mediaData.thumbnail ? getProxyUrl(mediaData.thumbnail) : undefined}
              controls
              playsInline
              className="w-full max-h-96 object-contain"
              preload="metadata"
            />
          ) : (
            <img
              src={getProxyUrl(mediaData.thumbnail || mediaData.media[0]?.url)}
              alt={`${mediaData.username}'s post`}
              className="w-full max-h-96 object-contain"
              loading="lazy"
            />
          )}
          {mediaData.type === 'carousel' && mediaData.media.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {mediaData.media.length} items
            </div>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <div className="px-5 pt-4">
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
              {expandedCaption ? caption : truncatedCaption}
            </p>
            {caption.length > 150 && (
              <button
                onClick={() => setExpandedCaption(!expandedCaption)}
                className="flex items-center gap-1 mt-1 text-xs text-primary-500 hover:text-primary-400 transition-colors cursor-pointer"
              >
                {expandedCaption ? (
                  <>Show less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show more <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>
        )}

        {/* Download Buttons */}
        <div className="p-5 space-y-3">
          {mediaData.media.length === 1 ? (
            <Button
              onClick={() => handleDownload(mediaData.media[0].url, 0)}
              loading={downloading === `0-${mediaData.media[0].url}`}
              icon={<Download className="w-4 h-4" />}
              className="w-full"
              id="download-hd-button"
            >
              HD Download
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  mediaData.media.forEach((item, i) => {
                    setTimeout(() => handleDownload(item.url, i), i * 500);
                  });
                }}
                icon={<Download className="w-4 h-4" />}
                className="w-full"
                id="download-all-button"
              >
                Download All ({mediaData.media.length} items)
              </Button>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {mediaData.media.map((item, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(item.url, index)}
                    loading={downloading === `${index}-${item.url}`}
                    icon={<Download className="w-3 h-3" />}
                  >
                    {item.type === 'video' ? 'Video' : 'Photo'} {index + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
