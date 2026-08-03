import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Sparkles, Activity, Calendar, CreditCard, TrendingUp, ShieldAlert, Target, Award, Star } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { mockMembers } from '../../data/mockData';

const memberScoreData = [
  { metric: 'Attendance', A: 87, fullMark: 100 },
  { metric: 'Engagement', A: 92, fullMark: 100 },
  { metric: 'Payments', A: 98, fullMark: 100 },
  { metric: 'Classes', A: 75, fullMark: 100 },
  { metric: 'Goals', A: 82, fullMark: 100 },
  { metric: 'Social', A: 65, fullMark: 100 },
];

const scoreTimeline = [
  { month: 'Jan', avg: 72, high: 15, medium: 45, low: 12 },
  { month: 'Feb', avg: 74, high: 13, medium: 42, low: 10 },
  { month: 'Mar', avg: 76, high: 11, medium: 40, low: 9 },
  { month: 'Apr', avg: 78, high: 10, medium: 38, low: 8 },
  { month: 'May', avg: 80, high: 9, medium: 36, low: 7 },
  { month: 'Jun', avg: 81, high: 8, medium: 35, low: 7 },
  { month: 'Jul', avg: 83, high: 8, medium: 32, low: 5 },
  { month: 'Aug', avg: 84, high: 7, medium: 30, low: 4 },
];

export default function Member360() {
  const [selectedMember, setSelectedMember] = useState(mockMembers[0]);
  const navigate = useNavigate();

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Member 360°</h2>
          <p className="text-sm text-[#6E625D] mt-1">
            Unified behavioral score — attendance + performance + payment + engagement in one view
          </p>
        </div>
        <AIBadge text="Real-Time Score" />
      </div>

      {/* Member Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {mockMembers.map(m => (
          <button key={m.id}
            onClick={() => setSelectedMember(m)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
              selectedMember.id === m.id ? 'bg-[#E00026] text-white' : 'bg-white border border-[#DDD3CB] text-[#231815] hover:bg-[#F5F0EA]'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
              selectedMember.id === m.id ? 'bg-white/20' : 'bg-[#F5F0EA]'
            }`}>{m.avatar}</div>
            {m.name}
            <span className={`text-[9px] font-bold ml-1 ${
              m.churnScore > 60 ? 'text-[#C62828]' : m.churnScore > 30 ? 'text-[#F9A825]' : 'text-[#2E7D32]'
            }`}>{m.engagementScore}</span>
          </button>
        ))}
      </div>

      {/* Member 360 View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar / Spider Chart */}
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#231815]">Behavioral Score</h3>
            <AIBadge />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={memberScoreData}>
              <PolarGrid stroke="#DDD3CB" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6E625D' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#6E625D' }} />
              <Radar name="Score" dataKey="A" stroke="#E00026" fill="#E00026" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Member Details */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E00026] to-[#C50020] rounded-2xl flex items-center justify-center text-white font-bold text-lg">
              {selectedMember.avatar}
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#231815]">{selectedMember.name}</p>
              <p className="text-xs text-[#6E625D]">{selectedMember.membershipType} • Since {selectedMember.joinDate}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ['Engagement Score', selectedMember.engagementScore, '/ 100'],
              ['Churn Risk', selectedMember.churnScore, '%'],
              ['Attendance Streak', selectedMember.attendanceStreak, 'days'],
              ['Lifetime Value', `₹${(selectedMember.lifetimeValue / 1000).toFixed(1)}K`, ''],
            ].map(([label, val, suffix], i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] text-[#6E625D]">{label}</span>
                  <span className="text-[11px] font-bold text-[#231815]">{val}{suffix}</span>
                </div>
                <ProgressBar 
                  value={typeof val === 'number' ? val : 0} 
                  size="sm" 
                  color={label === 'Churn Risk' ? (Number(val) > 60 ? '#C62828' : '#2E7D32') : '#E00026'} 
                />
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate(`/members/${selectedMember.id}`)}
            className="btn-primary w-full mt-4 text-sm"
          >
            View Full Profile
          </button>
        </div>

        {/* AI Recommendations */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Health Score</h3>
          </div>
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#E00026] mb-2">
              <span className="text-3xl font-extrabold text-[#E00026]">{selectedMember.engagementScore}</span>
            </div>
            <p className="text-[10px] text-[#6E625D]">out of 100</p>
          </div>
          <div className="space-y-2">
            {[
              { icon: Activity, text: `${selectedMember.recentWorkouts} workouts this week — ${selectedMember.recentWorkouts >= 5 ? 'Excellent' : selectedMember.recentWorkouts >= 3 ? 'Good' : 'Needs improvement'}`, color: '#2E7D32' },
              { icon: Target, text: `${selectedMember.goals.length} active goals — ${selectedMember.goals.join(', ')}`, color: '#E00026' },
              { icon: Award, text: `Milestone: ${selectedMember.totalVisits} total visits — approaching ${Math.ceil(selectedMember.totalVisits / 100) * 100} club!`, color: '#F9A825' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-[#F5F0EA] rounded-lg">
                <item.icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                <p className="text-[11px] text-[#6E625D]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Trend */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#231815]">Member Health Score Trend (All Members)</h3>
          <AIBadge text="Improving" />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={scoreTimeline}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E00026" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#E00026" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
            <Area type="monotone" dataKey="avg" stroke="#E00026" fill="url(#scoreGrad)" strokeWidth={2.5} name="Average Score" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
