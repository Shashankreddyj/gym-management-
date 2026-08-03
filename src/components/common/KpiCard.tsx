import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import CountUp from './CountUp';

interface KpiCardProps {
  title: string;
  value: string | number;
  countUpEnd?: number;
  countUpPrefix?: string;
  countUpSuffix?: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function KpiCard({ title, value, countUpEnd, countUpPrefix, countUpSuffix, subtitle, trend, trendValue, icon, accent, className = '' }: KpiCardProps) {
  const displayValue = countUpEnd !== undefined
    ? <CountUp end={countUpEnd} duration={1800} prefix={countUpPrefix || ''} suffix={countUpSuffix || ''} />
    : <span>{value}</span>;

  return (
    <div className={`card p-5 transition-shadow duration-300 ${accent ? 'border-l-[3px] border-l-[#E00026]' : ''} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{title}</p>
        {icon && <div className="text-[#E00026]">{icon}</div>}
      </div>
      <p className="text-2xl font-extrabold mb-1 animate-countIn" style={{ color: 'var(--text-primary)' }}>{displayValue}</p>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            trend === 'up' ? 'text-[#2E7D32]' : trend === 'down' ? 'text-[#C62828]' : 'text-[#6E625D]'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
        {subtitle && <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
    </div>
  );
}
