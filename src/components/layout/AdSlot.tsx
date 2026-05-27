interface AdSlotProps {
  format?: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

export default function AdSlot({ format = 'banner', className = '' }: AdSlotProps) {
  const sizes = {
    banner: 'h-24 md:h-28',
    sidebar: 'h-64',
    inline: 'h-20',
  };

  return (
    <div
      className={`
        w-full ${sizes[format]}
        rounded-2xl
        border border-dashed border-border-light dark:border-border-dark
        bg-surface-light-tertiary/50 dark:bg-surface-dark-tertiary/50
        flex items-center justify-center
        text-text-light-tertiary dark:text-text-dark-tertiary
        text-sm
        ${className}
      `}
      data-ad-slot={format}
      aria-label="Advertisement"
    >
      {/* AdSense script will be inserted here */}
      <span className="opacity-40">Ad Space</span>
    </div>
  );
}
