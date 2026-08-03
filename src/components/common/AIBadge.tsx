import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  text?: string;
  className?: string;
}

export default function AIBadge({ text = 'AI-Powered', className = '' }: AIBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-[#F7E9D8] text-[#E00026] rounded-lg text-[10px] font-bold ${className}`}>
      <Sparkles className="w-2.5 h-2.5" />
      {text}
    </span>
  );
}
