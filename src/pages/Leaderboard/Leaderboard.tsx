import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Flame, Award, Crown, Medal, Users, Calendar, Gift } from 'lucide-react';
import { challenges, badges, Challenge } from '../../data/challengesData';
import AIBadge from '../../components/common/AIBadge';

export default function Leaderboard() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(challenges[0]);
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  const handleJoin = (id: string) => setJoined(prev => ({ ...prev, [id]: true }));

  const rankEmojis = ['🥇', '🥈', '🥉'];
  const rankBg = ['bg-[#F9A825]/20', 'bg-[#6E625D]/15', 'bg-[#C62828]/10'];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Leaderboard & Challenges</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Monthly challenges with live leaderboard — compete, earn badges, win prizes</p>
        </div>
        <AIBadge text="4 Active Challenges" />
      </div>

      {/* Challenge Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {challenges.map(ch => (
          <div key={ch.id} onClick={() => setActiveChallenge(ch)}
            className={`card p-4 cursor-pointer transition-all ${
              activeChallenge.id === ch.id ? 'ring-2 ring-[#E00026]' : 'hover:shadow-md'
            }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase" style={{
                background: ch.status === 'Active' ? '#2E7D32' + '20' : ch.status === 'Upcoming' ? '#F9A825' + '20' : '#6E625D' + '20',
                color: ch.status === 'Active' ? '#2E7D32' : ch.status === 'Upcoming' ? '#F9A825' : '#6E625D',
              }}>{ch.status}</span>
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}><Users className="w-3 h-3 inline mr-1" />{ch.participants}</span>
            </div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{ch.title}</p>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{ch.description}</p>
          </div>
        ))}
      </div>

      {/* Active Challenge Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F9A825]" />
              <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{activeChallenge.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
              <Calendar className="w-3 h-3" /> {activeChallenge.startDate} → {activeChallenge.endDate}
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-4 mb-6 py-4">
            {activeChallenge.leaderboard.slice(0, 3).map((entry, i) => {
              const order = i === 0 ? [1, 0, 2] : []; // 2nd, 1st, 3rd
              const idx = order.length ? order[i] : i;
              const heights = ['h-20', 'h-28', 'h-16'];
              return (
                <div key={entry.rank} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E00026] to-[#C50020] flex items-center justify-center text-white text-xs font-bold mb-2">{entry.avatar}</div>
                  <div className={`${heights[idx]} w-20 rounded-t-xl flex flex-col items-center justify-center text-white text-center`}
                    style={{ background: idx === 1 ? '#F9A825' : idx === 0 ? '#6E625D' : '#C62828' }}>
                    <span className="text-2xl">{rankEmojis[idx]}</span>
                    <span className="text-lg font-extrabold">{entry.value}</span>
                    <span className="text-[9px]">{entry.unit}</span>
                  </div>
                  <p className="text-[10px] font-semibold mt-1 text-center" style={{ color: 'var(--text-primary)' }}>{entry.member}</p>
                </div>
              );
            })}
          </div>

          {/* Full Leaderboard */}
          <div className="space-y-1">
            {activeChallenge.leaderboard.map(entry => (
              <div key={entry.rank} className="flex items-center gap-3 p-3 rounded-xl hover:bg-opacity-50 transition-colors"
                style={{ background: entry.rank <= 3 ? rankBg[entry.rank - 1] : 'var(--muted-bg)' }}>
                <span className="w-7 text-center text-sm font-extrabold" style={{ color: 'var(--text-secondary)' }}>
                  {entry.rank <= 3 ? rankEmojis[entry.rank - 1] : `#${entry.rank}`}
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: entry.rank <= 3 ? '#E00026' : 'var(--text-secondary)' }}>{entry.avatar}</div>
                <span className="flex-1 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.member}</span>
                <span className="text-sm font-extrabold text-[#E00026]">{entry.value}</span>
                <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{entry.unit}</span>
                {entry.trend === 'up' ? <TrendingUp className="w-3 h-3 text-[#2E7D32]" /> : entry.trend === 'down' ? <TrendingDown className="w-3 h-3 text-[#C62828]" /> : <Minus className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Prize & Join */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Gift className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Prize Pool</h3></div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{activeChallenge.prize}</p>
            {joined[activeChallenge.id] ? (
              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#2E7D32]"><Award className="w-4 h-4" /> You're in! Good luck 🎉</div>
            ) : (
              <button onClick={() => handleJoin(activeChallenge.id)} className="btn-primary text-xs w-full mt-3 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Join Challenge
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Star className="w-4 h-4 text-[#F9A825]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Achievement Badges</h3></div>
            <div className="grid grid-cols-2 gap-2">
              {badges.map((b, i) => (
                <div key={i} className="p-2 rounded-xl text-center" style={{ background: 'var(--muted-bg)' }}>
                  <span className="text-xl">{b.icon}</span>
                  <p className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>{b.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3"><Crown className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Your Stats</h3></div>
            <div className="space-y-2 text-xs">
              {[['Current Rank', '#12'], ['Challenges Won', '3'], ['Badges Earned', '6/10'], ['Best Streak', '24 days']].map(([l, v], i) => (
                <div key={i} className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>{l}</span><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
