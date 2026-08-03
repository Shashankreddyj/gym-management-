import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Mail, Phone, Calendar, CreditCard, TrendingUp, Activity, ShieldAlert, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { mockMembers } from '../../data/mockData';

const engagementTrend = [
  { week: 'W1', score: 85, attendance: 7, engagement: 90 },
  { week: 'W2', score: 88, attendance: 6, engagement: 87 },
  { week: 'W3', score: 82, attendance: 5, engagement: 85 },
  { week: 'W4', score: 90, attendance: 7, engagement: 92 },
  { week: 'W5', score: 87, attendance: 6, engagement: 88 },
  { week: 'W6', score: 92, attendance: 7, engagement: 94 },
  { week: 'W7', score: 96, attendance: 7, engagement: 96 },
  { week: 'W8', score: 87, attendance: 5, engagement: 76 },
];

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = mockMembers.find(m => m.id === id);
  const [outreachSent, setOutreachSent] = useState(false);
  const [clickedActions, setClickedActions] = useState<Record<number, string>>({});

  if (!member) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[#6E625D]">Member not found</p>
        <button onClick={() => navigate('/members')} className="btn-primary mt-4">Back to Members</button>
      </div>
    );
  }

  const isAtRisk = member.status === 'At-Risk' || member.churnScore > 50;

  return (
    <div className="animate-fadeIn space-y-6">
      <button onClick={() => navigate('/members')} className="flex items-center gap-2 text-sm text-[#6E625D] hover:text-[#231815] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Members
      </button>

      {/* Member Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold ${
              member.status === 'Active' ? 'bg-gradient-to-br from-[#E00026] to-[#C50020]' : 'bg-[#F9A825]'
            }`}>{member.avatar}</div>
            <div>
              <h2 className="text-xl font-extrabold text-[#231815]">{member.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-[#6E625D]">{member.membershipType} • Since {member.joinDate}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                  member.status === 'Active' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' :
                  member.status === 'At-Risk' ? 'bg-[#F9A825]/10 text-[#F9A825]' : 'bg-[#C62828]/10 text-[#C62828]'
                }`}>{member.status}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {[Mail, Phone].map((Icon, i) => (
                  <button key={i} className="flex items-center gap-1.5 text-[11px] text-[#E00026] font-semibold hover:underline">
                    <Icon className="w-3 h-3" />
                    {i === 0 ? member.email : member.phone}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {isAtRisk && (
            <div className="card p-4 bg-[#F7E9D8] border-[#F9A825] animate-pulse-glow">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-[#C62828]" />
                <span className="text-sm font-bold text-[#C62828]">At Risk Member</span>
              </div>
              <p className="text-[11px] text-[#6E625D] mb-3">No visits in {22} days. AI recommends immediate outreach.</p>
              <button 
                onClick={() => setOutreachSent(true)}
                className="btn-primary text-xs w-full"
              >
                {outreachSent ? '✓ Outreach Sent!' : 'Trigger AI Outreach'}
              </button>
              {outreachSent && (
                <p className="text-[10px] text-[#2E7D32] mt-2 animate-fadeIn">
                  WhatsApp + Email sent. Member typically re-engages within 48 hours.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Member 360 Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Member Score', value: `${member.engagementScore}/100`, color: '#E00026', icon: Activity },
          { label: 'Churn Risk', value: `${member.churnScore}%`, color: member.churnScore > 60 ? '#C62828' : '#2E7D32', icon: ShieldAlert },
          { label: 'Attendance Streak', value: `${member.attendanceStreak} days`, color: '#2E7D32', icon: Calendar },
          { label: 'Lifetime Value', value: `₹${(member.lifetimeValue / 1000).toFixed(1)}K`, color: '#F9A825', icon: CreditCard },
        ].map((kpi, i) => (
          <div key={i} className="card p-4">
            <kpi.icon className="w-4 h-4 mb-2" style={{ color: kpi.color }} />
            <p className="text-lg font-extrabold text-[#231815]">{kpi.value}</p>
            <p className="text-[11px] text-[#6E625D]">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Engagement Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#231815]">Engagement Trend</h3>
            <AIBadge text="AI Analyzed" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementTrend}>
              <defs>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E00026" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E00026" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
              <Area type="monotone" dataKey="engagement" stroke="#E00026" fill="url(#engGrad)" strokeWidth={2} name="Engagement" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Recommendations</h3>
            <AIBadge />
          </div>
          <div className="space-y-3">
            {[
              { icon: Zap, text: `${member.name} is 60+ days gym-only — offer free PT session to boost engagement and upsell potential.`, action: 'Send Offer' },
              { icon: Calendar, text: `${member.attendanceStreak < 5 ? 'Attendance has dropped. Send a motivational check-in and class recommendation.' : `${member.attendanceStreak}-day streak! Celebrate with a milestone badge and social share prompt.`}`, action: 'Take Action' },
              { icon: TrendingUp, text: 'Based on workout patterns, recommend 2 classes this week: Power Yoga and Spin Cycle.', action: 'Recommend' },
            ].map((rec, i) => (
              <div key={i} className="p-3 bg-[#F5F0EA] rounded-xl">
                <div className="flex items-start gap-3">
                  <rec.icon className="w-4 h-4 text-[#E00026] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#6E625D] leading-relaxed">{rec.text}</p>
                </div>
                <button 
                  onClick={() => setClickedActions({...clickedActions, [i]: `Action "${rec.action}" dispatched`})}
                  className="mt-2 text-[11px] font-semibold text-[#E00026] hover:underline">{rec.action} →</button>
                {clickedActions[i] && <p className="text-[10px] text-[#2E7D32] mt-1 animate-fadeIn">✓ {clickedActions[i]}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {[
              ['Total Visits', member.totalVisits],
              ['Classes Attended', member.classes],
              ['Recent Workouts', `${member.recentWorkouts}/7 this week`],
              ['Monthly Spend', `₹${member.monthlySpend}`],
              ['Next Billing', member.nextBilling],
            ].map(([label, val], i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#DDD3CB] last:border-0">
                <span className="text-xs text-[#6E625D]">{label}</span>
                <span className="text-xs font-semibold text-[#231815]">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Goals</h3>
          <div className="space-y-2">
            {member.goals.map((goal, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-[#F5F0EA] rounded-lg">
                <div className="w-6 h-6 bg-[#E00026] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">{i + 1}</div>
                <span className="text-xs font-medium text-[#231815]">{goal}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Communication Log</h3>
          <div className="space-y-3">
            {[
              { type: 'AI WhatsApp', text: "Hey! We noticed you haven't been in for a while. Want a free PT session this week?", time: '2 hours ago', ai: true },
              { type: 'Email', text: 'Monthly statement sent — your August billing is ₹2,499', time: '3 days ago', ai: false },
              { type: 'AI SMS', text: 'Your 24-day streak is impressive! Keep going 💪', time: '5 days ago', ai: true },
            ].map((log, i) => (
              <div key={i} className="text-xs pb-3 border-b border-[#DDD3CB] last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#231815]">{log.type}</span>
                  {log.ai && <AIBadge />}
                  <span className="text-[10px] text-[#6E625D] ml-auto">{log.time}</span>
                </div>
                <p className="text-[#6E625D]">{log.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
