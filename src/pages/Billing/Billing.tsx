import { useState } from 'react';
import { CreditCard, TrendingUp, TrendingDown, AlertTriangle, Sparkles, Download, Filter, Search, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import { mockBilling, revenueData } from '../../data/mockData';

export default function Billing() {
  const [filter, setFilter] = useState<'all' | 'Paid' | 'Pending' | 'Failed'>('all');
  const [exported, setExported] = useState(false);
  const [activeInsight, setActiveInsight] = useState<number | null>(null);

  const filtered = mockBilling.filter(b => filter === 'all' || b.status === filter);

  const statusColors: Record<string, string> = {
    Paid: 'bg-[#2E7D32]/10 text-[#2E7D32]',
    Pending: 'bg-[#F9A825]/10 text-[#F9A825]',
    Failed: 'bg-[#C62828]/10 text-[#C62828]',
    Refunded: 'bg-[#6E625D]/10 text-[#6E625D]',
  };

  const totalRevenue = revenueData[revenueData.length - 1].revenue;
  const totalPending = mockBilling.filter(b => b.status === 'Pending').reduce((s, b) => s + b.amount, 0);
  const totalFailed = mockBilling.filter(b => b.status === 'Failed').reduce((s, b) => s + b.amount, 0);

  const handleExport = () => {
    const csvContent = "Member,Plan,Amount,Status,Date,Method\n" + 
      mockBilling.map(b => `${b.member},${b.plan},${b.amount},${b.status},${b.date},${b.method}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `ironforge-billing-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Billing & Revenue</h2>
          <p className="text-sm text-[#6E625D] mt-1">AI-powered revenue intelligence and payment tracking</p>
        </div>
        <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
          {exported ? <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" /> : <Download className="w-4 h-4" />}
          {exported ? 'Exported!' : 'Export Report'}
        </button>
      </div>

      {/* Revenue KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: `₹${(totalRevenue / 100000).toFixed(2)}L`, trend: 'up', change: '+12.5%', color: '#2E7D32', icon: TrendingUp },
          { label: 'Collection Rate', value: '94.2%', trend: 'up', change: '+2.1%', color: '#2E7D32', icon: CreditCard },
          { label: 'Pending Payments', value: `₹${(totalPending / 1000).toFixed(1)}K`, trend: 'down', change: '3 invoices', color: '#F9A825', icon: TrendingDown },
          { label: 'Failed Payments', value: `₹${(totalFailed / 1000).toFixed(1)}K`, trend: 'down', change: '-40% vs last month', color: '#C62828', icon: AlertTriangle },
        ].map((kpi, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#6E625D] uppercase tracking-wider">{kpi.label}</p>
              <kpi.icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
            </div>
            <p className="text-xl font-extrabold text-[#231815] mb-1">{kpi.value}</p>
            <span className={`text-[11px] font-semibold ${kpi.trend === 'up' ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#231815]">Revenue vs Expenses</h3>
            <AIBadge text="AI Forecast" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 100000).toFixed(1)}L`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} formatter={(v: number) => `₹${(v / 100000).toFixed(2)}L`} />
              <Line type="monotone" dataKey="revenue" stroke="#E00026" strokeWidth={2.5} dot={{ fill: '#E00026', r: 4 }} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#6E625D" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Revenue Insights</h3>
          </div>
          <div className="space-y-3">
            {[
              { text: '3 members have failed payments this cycle. AI auto-triggered dunning sequences — 2 have already updated payment methods.', action: 'View Details' },
              { text: 'Revenue is projected to grow 8% next month based on current membership pipeline and upsell trajectory.', action: 'See Forecast' },
              { text: 'Elite membership accounts for 45% of revenue but only 28% of members. Recommend targeting Premium members for Elite upgrade.', action: 'Target List' },
              { text: 'Family plan ARPU is highest at ₹5,499/mo. Consider Family referral campaign to boost this segment.', action: 'Create Campaign' },
            ].map((insight, i) => (
              <div key={i} className="p-3 bg-[#F5F0EA] rounded-xl cursor-pointer hover:bg-[#F7E9D8] transition-colors"
                onClick={() => setActiveInsight(activeInsight === i ? null : i)}>
                <p className="text-xs text-[#6E625D] leading-relaxed">{insight.text}</p>
                <button className="mt-2 text-[11px] font-semibold text-[#E00026] hover:underline">{insight.action} →</button>
                {activeInsight === i && (
                  <p className="text-[10px] text-[#2E7D32] mt-2 animate-fadeIn">✓ Action triggered — notification sent to relevant team</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Records */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#DDD3CB]">
          <h3 className="text-sm font-bold text-[#231815]">Recent Transactions</h3>
          <div className="flex gap-1 bg-[#F5F0EA] rounded-lg p-1">
            {['all', 'Paid', 'Pending', 'Failed'].map(f => (
              <button key={f} onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${
                  filter === f ? 'bg-[#E00026] text-white' : 'text-[#6E625D] hover:text-[#231815]'
                }`}
              >{f === 'all' ? 'All' : f}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F5F0EA] text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider">
          <div className="col-span-4">Member</div>
          <div className="col-span-3">Plan</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Date</div>
        </div>
        {filtered.map(b => (
          <div key={b.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#DDD3CB] hover:bg-[#F5F0EA]/30 items-center">
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E00026] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">{b.avatar}</div>
              <span className="text-sm font-semibold text-[#231815]">{b.member}</span>
            </div>
            <div className="col-span-3 text-xs text-[#6E625D]">{b.plan} • {b.method}</div>
            <div className="col-span-2 text-sm font-semibold text-[#231815]">₹{b.amount.toLocaleString()}</div>
            <div className="col-span-2"><span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${statusColors[b.status]}`}>{b.status}</span></div>
            <div className="col-span-1 text-right text-xs text-[#6E625D]">{b.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
