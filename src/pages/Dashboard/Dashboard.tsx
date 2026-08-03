import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, CalendarCheck, CreditCard, 
  AlertTriangle, MessageSquare, Sparkles, ArrowRight,
  UserCheck, Bell, Zap, PhoneCall, Bot
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import KpiCard from '../../components/common/KpiCard';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import DailyQuestsCard from '../../components/gamification/DailyQuestsCard';
import SpinWheel from '../../components/gamification/SpinWheel';
import { useGamification } from '../../contexts/GamificationContext';
import { kpiData, attendanceTrend, revenueData, churnRiskDistribution, mockChurnAlerts, mockLeads, mockClasses } from '../../data/mockData';

const COLORS = ['#2E7D32', '#F9A825', '#C62828'];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'D' | 'W' | 'M'>('M');
  const [showAIAction, setShowAIAction] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Dashboard</h2>
          <p className="text-sm text-[#6E625D] mt-1">
            AI-powered overview of IronForge operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-[#DDD3CB] p-1">
            {['D', 'W', 'M'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeframe === t ? 'bg-[#E00026] text-white' : 'text-[#6E625D] hover:text-[#231815]'
                }`}
              >
                {t === 'D' ? 'Day' : t === 'W' ? 'Week' : 'Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Urgent Alert Banner */}
      {showAIAction && (
        <div className="glass-card p-5 border-l-[3px] border-l-[#E00026] animate-slideIn rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E00026] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Action Required</span>
                  <AIBadge />
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  3 high-risk members need attention. Outreach sequences auto-triggered — awaiting your approval.
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setShowAIAction(false); navigate('/retention'); }}
              className="btn-primary text-xs flex items-center gap-2"
            >
              Review Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Members"
          value={kpiData.activeMembers}
          countUpEnd={kpiData.activeMembers}
          subtitle={`of ${kpiData.totalMembers} total`}
          trend="up"
          trendValue="+12 this month"
          icon={<Users className="w-4 h-4" />}
        />
        <KpiCard
          title="Monthly Revenue"
          value={`₹${(kpiData.monthlyRevenue / 100000).toFixed(1)}L`}
          countUpEnd={kpiData.monthlyRevenue / 100000}
          countUpPrefix="₹"
          countUpSuffix="L"
          trend="up"
          trendValue={`${kpiData.revenueGrowth}%`}
          icon={<CreditCard className="w-4 h-4" />}
          accent
        />
        <KpiCard
          title="Class Occupancy"
          value={`${kpiData.classOccupancy}%`}
          countUpEnd={kpiData.classOccupancy}
          countUpSuffix="%"
          subtitle={`Avg across all classes`}
          trend="up"
          trendValue="+5% vs last month"
          icon={<CalendarCheck className="w-4 h-4" />}
        />
        <KpiCard
          title="At-Risk Members"
          value={kpiData.atRiskMembers}
          countUpEnd={kpiData.atRiskMembers}
          subtitle="Needs attention"
          trend="down"
          trendValue="-8 from last week"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#231815]">Daily Check-ins</h3>
              <p className="text-[11px] text-[#6E625D]">This week vs projected</p>
            </div>
            <AIBadge text="AI Forecast" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB', background: '#fff' }}
              />
              <Line type="monotone" dataKey="checkins" stroke="#E00026" strokeWidth={2.5} dot={{ fill: '#E00026', r: 4 }} name="Actual" />
              <Line type="monotone" dataKey="projected" stroke="#6E625D" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="AI Projected" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Risk Distribution */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Churn Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={churnRiskDistribution} layout="vertical" margin={{ left: -30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="level" tick={{ fontSize: 10, fill: '#6E625D' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
                {churnRiskDistribution.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Alerts, Leads & Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Churn Alerts */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Churn Alerts</h3>
            <AIBadge text="Auto-Acting" />
          </div>
          <div className="space-y-3">
            {mockChurnAlerts.filter(a => a.riskLevel === 'High').slice(0, 3).map(alert => (
              <div key={alert.id} className="p-3 bg-[#F5F0EA] rounded-xl hover:bg-[#F7E9D8] transition-colors cursor-pointer"
                onClick={() => navigate(`/members/${alert.memberId}`)}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold" 
                    style={{ backgroundColor: alert.riskLevel === 'High' ? '#C62828' : '#F9A825', color: 'white' }}>
                    {alert.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#231815]">{alert.member}</p>
                      <span className="text-[10px] font-bold text-[#C62828]">{alert.churnScore}% risk</span>
                    </div>
                    <p className="text-[11px] text-[#6E625D] truncate">{alert.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#DDD3CB]">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    alert.autoActionTaken ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#6E625D]/10 text-[#6E625D]'
                  }`}>
                    {alert.autoActionTaken ? '● Auto-Acted' : '○ Pending'}
                  </span>
                  <span className="text-[10px] text-[#6E625D]">{alert.outreachChannel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Lead Response */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Lead Response</h3>
            <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-md">
              Avg {kpiData.avgResponseTime}
            </span>
          </div>
          <div className="space-y-3">
            {mockLeads.slice(0, 4).map(lead => (
              <div key={lead.id} className="flex items-center gap-3 p-3 bg-[#F5F0EA] rounded-xl cursor-pointer hover:bg-[#F7E9D8] transition-colors"
                onClick={() => navigate('/leads')}>
                <div className="w-9 h-9 bg-gradient-to-br from-[#E00026] to-[#C50020] rounded-xl flex items-center justify-center text-white text-xs font-bold">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#231815]">{lead.name}</p>
                  <p className="text-[11px] text-[#6E625D]">{lead.interest}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-[#2E7D32]">{lead.responseTime}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    lead.status === 'Converted' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' :
                    lead.status === 'New' ? 'bg-[#E00026]/10 text-[#E00026]' :
                    'bg-[#F9A825]/10 text-[#F9A825]'
                  }`}>{lead.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Fill Optimization */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Class Optimization</h3>
          </div>
          <div className="space-y-3">
            {mockClasses.map(cls => (
              <div key={cls.id} className="space-y-1.5 cursor-pointer" onClick={() => navigate('/schedule')}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#231815]">{cls.name}</p>
                    <p className="text-[10px] text-[#6E625D]">{cls.time} • {cls.booked}/{cls.capacity} booked</p>
                  </div>
                  <span className={`text-xs font-bold ${
                    cls.fillRate >= 90 ? 'text-[#2E7D32]' : cls.fillRate >= 70 ? 'text-[#F9A825]' : 'text-[#C62828]'
                  }`}>{cls.fillRate}%</span>
                </div>
                <ProgressBar value={cls.fillRate} size="sm" color={cls.fillRate >= 90 ? '#2E7D32' : cls.fillRate >= 70 ? '#F9A825' : '#C62828'} />
                {cls.aiRecommendation && (
                  <p className="text-[10px] text-[#E00026] flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> {cls.aiRecommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><DailyQuestsCard /></div>
        <div><SpinWheel /></div>
      </div>
    </div>
  );
}
