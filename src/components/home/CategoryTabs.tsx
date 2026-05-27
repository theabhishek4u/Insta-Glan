'use client';

import { useState } from 'react';
import { Film, Video, Image, Eye, Layers, User } from 'lucide-react';
import Tabs from '@/components/ui/Tabs';
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

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState<string>('reel');
  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Tabs
          tabs={categories.map(c => ({ id: c.id, label: c.label, icon: c.icon }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeCategory && (
          <p className="mt-6 text-text-light-secondary dark:text-text-dark-secondary text-base max-w-xl mx-auto animate-fade-in">
            {activeCategory.description}
          </p>
        )}
      </div>
    </section>
  );
}
