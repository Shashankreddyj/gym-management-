interface StatBadgeProps {
  label: string;
  value: string | number;
  color?: string;
}

export default function StatBadge({ label, value, color = '#E00026' }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] text-[#6E625D]">{label}:</span>
      <span className="text-[11px] font-semibold text-[#231815]">{value}</span>
    </div>
  );
}
