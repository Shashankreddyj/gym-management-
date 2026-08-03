import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Flame, Award, Crown, Medal, Users, Calendar, Gift, Map, UserPlus, Share2 } from 'lucide-react';
import { challenges, badges, Challenge } from '../../data/challengesData';
import AIBadge from '../../components/common/AIBadge';
import { useGamification, PersonalRecord } from '../../contexts/GamificationContext';

export default function Leaderboard() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(challenges[0]);
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<'challenges' | 'champions' | 'referrals' | 'records'>('challenges');
  const { personalRecords, referralCount, addReferral, checkPR } = useGamification();

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

      {/* Section Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border p-1 w-fit" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        {[
          { key: 'challenges' as const, label: '🏆 Challenges', icon: Trophy },
          { key: 'champions' as const, label: '👑 Zone Champions', icon: Map },
          { key: 'referrals' as const, label: '👥 Referral Race', icon: UserPlus },
          { key: 'records' as const, label: '📊 Personal Records', icon: Award },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveSection(tab.key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeSection === tab.key ? 'bg-[#E00026] text-white' : ''}`}
            style={activeSection !== tab.key ? { color: 'var(--text-secondary)' } : {}}>{tab.label}</button>
        ))}
      </div>

      {/* Zone Champions */}
      {activeSection === 'champions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { zone: 'Cardio Zone', champ: 'Priya Sharma', avatar: 'PS', stat: '42 sessions', emoji: '🏃', badge: 'Treadmill Queen' },
            { zone: 'Free Weights', champ: 'Vikram Singh', avatar: 'VS', stat: '68 sessions', emoji: '🏋️', badge: 'Squat Rack King' },
            { zone: 'Strength Zone', champ: 'Rajesh Kumar', avatar: 'RK', stat: '35 sessions', emoji: '💪', badge: 'Cable Machine Master' },
            { zone: 'Functional Zone', champ: 'Ananya Iyer', avatar: 'AI', stat: '28 sessions', emoji: '🎯', badge: 'TRX Champion' },
          ].map(z => (
            <div key={z.zone} className="card p-5 text-center">
              <span className="text-3xl">{z.emoji}</span>
              <div className="w-12 h-12 bg-[#E00026] rounded-2xl flex items-center justify-center text-white font-bold mx-auto my-2">{z.avatar}</div>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{z.champ}</p>
              <p className="text-[10px] font-semibold text-[#F9A825] flex items-center justify-center gap-1 mt-0.5"><Crown className="w-3 h-3" /> {z.badge}</p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{z.zone} • {z.stat}</p>
              <p className="text-[9px] text-[#2E7D32] mt-2">🏆 Resets every Monday</p>
            </div>
          ))}
        </div>
      )}

      {/* Referral Race */}
      {activeSection === 'referrals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center gap-2 mb-4"><UserPlus className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Referral Race — August 2026</h3></div>
            <div className="space-y-2">
              {[
                { rank: 1, name: 'Vikram Singh', avatar: 'VS', refs: 5, reward: '1 Month Free' },
                { rank: 2, name: 'Priya Sharma', avatar: 'PS', refs: 3, reward: '50% Off Next Month' },
                { rank: 3, name: 'Ananya Iyer', avatar: 'AI', refs: 2, reward: '₹500 GymCoin Bonus' },
                { rank: 4, name: 'Rajesh Kumar', avatar: 'RK', refs: 2, reward: 'Free PT Session' },
                { rank: 5, name: 'Rohan Desai', avatar: 'RD', refs: 1, reward: 'Protein Shake' },
                { rank: 6, name: 'You', avatar: 'GM', refs: referralCount, reward: '—' },
              ].map(r => (
                <div key={r.rank} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: r.name === 'You' ? '#E00026' + '10' : 'var(--muted-bg)' }}>
                  <span className="text-lg font-extrabold" style={{ color: r.rank <= 3 ? '#F9A825' : 'var(--text-secondary)' }}>#{r.rank}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold bg-[#E00026]">{r.avatar}</div>
                  <span className="flex-1 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</span>
                  <span className="text-sm font-extrabold text-[#E00026]">{r.refs} refs</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#2E7D32]/10 text-[#2E7D32]">{r.reward}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5 text-center flex flex-col items-center justify-center">
            <Share2 className="w-10 h-10 text-[#E00026] mb-3" />
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Your Referral Link</p>
            <p className="text-[10px] mt-1 mb-3" style={{ color: 'var(--text-secondary)' }}>Share with friends to climb the leaderboard!</p>
            <div className="w-full p-2 rounded-lg text-[10px] font-mono mb-2" style={{ background: 'var(--muted-bg)', color: 'var(--text-secondary)' }}>ironforge.fit/ref/gym123</div>
            <button onClick={() => addReferral()} className="btn-primary text-xs w-full">+ Simulate Referral (+100 XP, +50🪙)</button>
          </div>
        </div>
      )}

      {/* Personal Records */}
      {activeSection === 'records' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { id: 'pr-visits', title: 'Most Visits/Month', value: '28', date: 'July 2026', type: 'visits' as const },
            { id: 'pr-streak', title: 'Longest Streak', value: '45 days', date: 'July 2026', type: 'streak' as const },
            { id: 'pr-classes', title: 'Most Classes/Week', value: '12', date: 'Aug W1', type: 'classes' as const },
            { id: 'pr-weight', title: 'Weight Lost', value: '8.5 kg', date: 'Since Jan', type: 'weight' as const },
          ] as PersonalRecord[]).concat(personalRecords).slice(0, 8).map(pr => (
            <div key={pr.id} className="card p-4 text-center cursor-pointer hover:shadow-md" onClick={() => checkPR({ ...pr, value: String(parseFloat(pr.value) + 1), date: new Date().toISOString().split('T')[0] })}>
              <Trophy className="w-6 h-6 text-[#F9A825] mx-auto mb-2" />
              <p className="text-lg font-extrabold text-[#E00026]">{pr.value}</p>
              <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{pr.title}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{pr.date}</p>
              <p className="text-[9px] text-[#F9A825] mt-2">Click to update PR →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
