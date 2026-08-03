import { useState } from 'react';
import { Building2, TrendingUp, TrendingDown, Users, CreditCard, Calendar, MapPin, ChevronDown, Sparkles, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AIBadge from '../../components/common/AIBadge';

const locations = [
  { id: 'L001', name: 'IronForge Main', city: 'Mumbai', members: 856, revenue: 1834500, occupancy: 82, growth: 12.5, staff: 12, rating: 4.8, status: 'Top Performer' },
  { id: 'L002', name: 'IronForge West', city: 'Pune', members: 520, revenue: 980000, occupancy: 76, growth: 8.3, staff: 8, rating: 4.5, status: 'Growing' },
  { id: 'L003', name: 'IronForge South', city: 'Bangalore', members: 680, revenue: 1450000, occupancy: 79, growth: 15.2, staff: 10, rating: 4.7, status: 'Top Performer' },
  { id: 'L004', name: 'IronForge East', city: 'Kolkata', members: 340, revenue: 610000, occupancy: 65, growth: -2.1, staff: 6, rating: 4.1, status: 'Needs Attention' },
];

const compareData = locations.map(l => ({ name: l.city, revenue: l.revenue / 100000, members: l.members, occupancy: l.occupancy }));

export default function MultiLocation() {
  const [selectedLoc, setSelectedLoc] = useState(locations[0]);
  const [compareMetric, setCompareMetric] = useState<'revenue' | 'members' | 'occupancy'>('revenue');

  const colors = ['#E00026', '#2E7D32', '#F9A825', '#C62828'];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Multi-Location Dashboard</h2>
          <p className="text-sm text-[#6E625D] mt-1">Per-site benchmarking — scale from 1 studio to a franchise without switching platforms</p>
        </div>
        <AIBadge text="4 Locations" />
      </div>

      {/* Location Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {locations.map(loc => (
          <button key={loc.id} onClick={() => setSelectedLoc(loc)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all whitespace-nowrap ${
              selectedLoc.id === loc.id ? 'bg-[#E00026] text-white shadow-md' : 'bg-white border border-[#DDD3CB] text-[#231815] hover:bg-[#F5F0EA]'
            }`}>
            <Building2 className="w-4 h-4" />
            <div className="text-left">
              <p className="text-xs font-bold">{loc.name}</p>
              <p className={`text-[10px] ${selectedLoc.id === loc.id ? 'text-white/70' : 'text-[#6E625D]'}`}>{loc.city}</p>
            </div>
            {loc.status === 'Needs Attention' && <span className="w-2 h-2 bg-[#C62828] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Selected Location KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Members', value: selectedLoc.members, icon: Users, trend: 'up' as const, change: `+${Math.floor(selectedLoc.growth)}%` },
          { label: 'Revenue', value: `₹${(selectedLoc.revenue / 100000).toFixed(2)}L`, icon: CreditCard, trend: selectedLoc.growth > 0 ? 'up' as const : 'down' as const, change: `${selectedLoc.growth > 0 ? '+' : ''}${selectedLoc.growth}%` },
          { label: 'Occupancy', value: `${selectedLoc.occupancy}%`, icon: Calendar, trend: selectedLoc.occupancy > 75 ? 'up' as const : 'down' as const, change: 'vs all locations' },
          { label: 'Rating', value: `${selectedLoc.rating}/5.0`, icon: Sparkles, trend: 'neutral' as const, change: `${selectedLoc.staff} staff` },
        ].map((kpi, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider">{kpi.label}</p>
              <kpi.icon className="w-3.5 h-3.5 text-[#E00026]" />
            </div>
            <p className="text-xl font-extrabold text-[#231815]">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3 text-[#2E7D32]" /> : kpi.trend === 'down' ? <ArrowDown className="w-3 h-3 text-[#C62828]" /> : <Minus className="w-3 h-3 text-[#6E625D]" />}
              <span className={`text-[10px] font-semibold ${kpi.trend === 'up' ? 'text-[#2E7D32]' : kpi.trend === 'down' ? 'text-[#C62828]' : 'text-[#6E625D]'}`}>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#231815]">Location Comparison</h3>
            <div className="flex gap-1 bg-[#F5F0EA] rounded-lg p-1">
              {(['revenue', 'members', 'occupancy'] as const).map(m => (
                <button key={m} onClick={() => setCompareMetric(m)}
                  className={`px-3 py-1 rounded-md text-[10px] font-semibold ${compareMetric === m ? 'bg-[#E00026] text-white' : 'text-[#6E625D]'}`}>
                  {m === 'revenue' ? 'Revenue' : m === 'members' ? 'Members' : 'Occupancy'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={compareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
              <Bar dataKey={compareMetric} radius={[8, 8, 0, 0]} barSize={40}>
                {compareData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Location Ranking */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Performance Ranking</h3>
          <div className="space-y-2">
            {[...locations].sort((a, b) => b.revenue - a.revenue).map((loc, i) => (
              <div key={loc.id} className={`flex items-center gap-3 p-3 rounded-xl ${loc.id === selectedLoc.id ? 'bg-[#F7E9D8]' : 'bg-[#F5F0EA]'}`}>
                <span className="text-lg font-extrabold text-[#6E625D]">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#231815]">{loc.name}</p>
                  <p className="text-[10px] text-[#6E625D]">{loc.city} • {loc.members} members</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-[#E00026]">₹{(loc.revenue / 100000).toFixed(2)}L</p>
                  <span className={`text-[10px] font-semibold ${loc.growth > 0 ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>{loc.growth > 0 ? '+' : ''}{loc.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
