import type { ContentType } from '@/types';

interface BadgeProps {
  type: ContentType | string;
  className?: string;
}

const badgeColors: Record<string, string> = {
  reel: 'bg-pink-500/15 text-pink-500 border-pink-500/20',
  video: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
  photo: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
  carousel: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
  story: 'bg-purple-500/15 text-purple-500 border-purple-500/20',
  profile_picture: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/20',
  post: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/20',
};

const badgeLabels: Record<string, string> = {
  reel: 'Reel',
  video: 'Video',
  photo: 'Photo',
  carousel: 'Carousel',
  story: 'Story',
  profile_picture: 'Profile Picture',
  post: 'Post',
};

export default function Badge({ type, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        text-xs font-semibold
        rounded-full border
        ${badgeColors[type] || 'bg-gray-500/15 text-gray-500 border-gray-500/20'}
        ${className}
      `}
    >
      {badgeLabels[type] || type}
    </span>
  );
}
