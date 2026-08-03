import { Sparkles, Coins, Flame, Shield } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';

export default function XPBar() {
  const { xp } = useGamification();
  const pct = Math.round((xp.currentLevelXP / xp.xpToNextLevel) * 100);

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-xl" style={{ background: 'var(--muted-bg)' }}>
      <Sparkles className="w-3.5 h-3.5 text-[#F9A825]" />
      <div className="w-20 h-2 rounded-full" style={{ background: 'var(--border)' }}>
        <div className="h-2 rounded-full bg-gradient-to-r from-[#F9A825] to-[#E00026] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-extrabold" style={{ color: 'var(--text-primary)' }}>Lv.{xp.level}</span>
    </div>
  );
}

export function CoinBadge() {
  const { coins } = useGamification();
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-xl" style={{ background: 'var(--muted-bg)' }}>
      <Coins className="w-3.5 h-3.5 text-[#F9A825]" />
      <span className="text-[10px] font-extrabold" style={{ color: 'var(--text-primary)' }}>{coins}</span>
    </div>
  );
}

export function StreakFreezeBadge() {
  const { streakFreezes } = useGamification();
  if (streakFreezes <= 0) return null;
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-xl animate-pulse" style={{ background: '#E00026' + '15' }}>
      <Shield className="w-3.5 h-3.5 text-[#E00026]" />
      <span className="text-[10px] font-extrabold text-[#E00026]">{streakFreezes} Freeze{streakFreezes > 1 ? 's' : ''}</span>
    </div>
  );
}
