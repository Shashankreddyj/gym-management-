import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function KpiCard({ title, value, subtitle, trend, trendValue, icon, accent, className = '' }: KpiCardProps) {
  return (
    <div className={`card p-5 hover:shadow-md transition-shadow duration-300 ${accent ? 'border-l-[3px] border-l-[#E00026]' : ''} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-[#6E625D] uppercase tracking-wider">{title}</p>
        {icon && <div className="text-[#E00026]">{icon}</div>}
      </div>
      <p className="text-2xl font-extrabold text-[#231815] mb-1">{value}</p>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            trend === 'up' ? 'text-[#2E7D32]' : trend === 'down' ? 'text-[#C62828]' : 'text-[#6E625D]'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
        {subtitle && <p className="text-[11px] text-[#6E625D]">{subtitle}</p>}
      </div>
    </div>
  );
}
