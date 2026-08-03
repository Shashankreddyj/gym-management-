interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md';
  label?: string;
}

export default function ProgressBar({ value, max = 100, color = '#E00026', size = 'md', label }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {(label || true) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-[11px] font-medium text-[#6E625D]">{label}</span>}
          <span className="text-[11px] font-semibold text-[#231815]">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full bg-[#F5F0EA] rounded-full ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
