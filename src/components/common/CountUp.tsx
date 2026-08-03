import { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function CountUp({ end, duration = 1500, prefix = '', suffix = '', decimals = 0, className = '' }: CountUpProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCurrent(eased * end);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();

  return <span className={className}>{prefix}{formatted}{suffix}</span>;
}
