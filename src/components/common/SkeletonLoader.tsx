interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function SkeletonLoader({ className = 'h-24 rounded-2xl', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`animate-pulse ${className}`}
          style={{
            background: 'linear-gradient(90deg, var(--muted-bg) 25%, var(--hover-bg) 50%, var(--muted-bg) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      ))}
    </>
  );
}
