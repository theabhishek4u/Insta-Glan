interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded-md h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`
        bg-surface-light-tertiary dark:bg-surface-dark-tertiary
        skeleton-shimmer
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

export function PreviewSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-border-light dark:border-border-dark backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-20 h-3" />
        </div>
      </div>
      <Skeleton variant="rectangular" className="w-full h-64 mb-4" />
      <Skeleton variant="text" className="w-full mb-2" />
      <Skeleton variant="text" className="w-2/3 mb-4" />
      <div className="flex gap-3">
        <Skeleton variant="rectangular" className="w-36 h-12" />
        <Skeleton variant="rectangular" className="w-36 h-12" />
      </div>
    </div>
  );
}
