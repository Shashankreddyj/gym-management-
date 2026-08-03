import { CheckCircle2, Sparkles, Target } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';

export default function DailyQuestsCard() {
  const { quests, completeQuest } = useGamification();

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-[#E00026]" />
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Daily Quests</span>
        <Sparkles className="w-3 h-3 text-[#F9A825] ml-auto" />
      </div>
      <div className="space-y-2">
        {quests.map(q => (
          <div key={q.id} className={`p-2 rounded-lg transition-colors ${q.completed ? 'opacity-60' : 'cursor-pointer'}`}
            style={{ background: q.completed ? '#2E7D32' + '10' : 'var(--muted-bg)' }}
            onClick={() => !q.completed && completeQuest(q.id)}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{q.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>{q.title}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{q.description}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#F9A825]">+{q.reward.xp}XP</p>
                <p className="text-[9px] font-semibold text-[#E00026]">+{q.reward.coins}🪙</p>
              </div>
              {q.completed && <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
