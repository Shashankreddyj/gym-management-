import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${className}`}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--border)',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(224,0,38,0.1), 0 4px 12px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}
