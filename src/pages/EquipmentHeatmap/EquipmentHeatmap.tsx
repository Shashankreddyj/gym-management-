import { useState } from 'react';
import { Map, Activity, Clock, TrendingUp, TrendingDown, AlertTriangle, Wrench, Users, Sparkles, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import { equipment, zoneHeatData, hourlyData, Equipment } from '../../data/equipmentData';

export default function EquipmentHeatmap() {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
  const [search, setSearch] = useState('');

  const zones = ['All', 'Cardio Zone', 'Free Weights', 'Strength Zone', 'Functional Zone'];
  const filtered = equipment.filter(e => {
    const zoneMatch = selectedZone === 'All' || e.zone === selectedZone;
    const searchMatch = !search || e.name.toLowerCase().includes(search.toLowerCase());
    return zoneMatch && searchMatch;
  });

  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    Available: { bg: '#2E7D3215', text: '#2E7D32', icon: '🟢' },
    Busy: { bg: '#F9A82515', text: '#F9A825', icon: '🟡' },
    Full: { bg: '#C6282815', text: '#C62828', icon: '🔴' },
    Maintenance: { bg: '#6E625D15', text: '#6E625D', icon: '🔧' },
  };

  const overallOccupancy = Math.round(filtered.reduce((s, e) => s + e.currentUsage, 0) / Math.max(filtered.length, 1));
  const availableCount = filtered.filter(e => e.status === 'Available').length;
  const totalEquipment = filtered.length;

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Equipment Heatmap</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Real-time equipment utilization. Gym is <strong style={{ color: overallOccupancy > 75 ? '#C62828' : '#2E7D32' }}>{overallOccupancy}% full</strong> — best time: <strong>2 PM</strong>
          </p>
        </div>
        <AIBadge text="Live Tracking" />
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Gym Occupancy', value: `${overallOccupancy}%`, icon: Users, color: overallOccupancy > 75 ? '#C62828' : '#2E7D32' },
          { label: 'Available Equipment', value: `${availableCount}/${totalEquipment}`, icon: Activity, color: '#2E7D32' },
          { label: 'Best Time Today', value: '2 PM - 4 PM', icon: Clock, color: '#E00026' },
          { label: 'Under Maintenance', value: '1 machine', icon: Wrench, color: '#F9A825' },
        ].map((kpi, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
              <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
            </div>
            <div>
              <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hourly Heatmap Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Hourly Zone Utilization</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="cardio" stroke="#E00026" fill="#E00026" fillOpacity={0.1} name="Cardio" strokeWidth={2} />
              <Area type="monotone" dataKey="weights" stroke="#F9A825" fill="#F9A825" fillOpacity={0.1} name="Weights" strokeWidth={2} />
              <Area type="monotone" dataKey="strength" stroke="#2E7D32" fill="#2E7D32" fillOpacity={0.1} name="Strength" strokeWidth={2} />
              <Area type="monotone" dataKey="functional" stroke="#6E625D" fill="#6E625D" fillOpacity={0.1} name="Functional" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Zone Summary */}
        <div className="card p-6">
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Zone Status</h3>
          <div className="space-y-3">
            {zoneHeatData.map(zone => (
              <div key={zone.zone} className="p-3 rounded-xl" style={{ background: 'var(--muted-bg)' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{zone.zone}</p>
                  <span className="text-xs font-extrabold" style={{ color: zone.occupancy > 70 ? '#C62828' : zone.occupancy > 40 ? '#F9A825' : '#2E7D32' }}>{zone.occupancy}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${zone.occupancy}%`, background: zone.occupancy > 70 ? '#C62828' : zone.occupancy > 40 ? '#F9A825' : '#2E7D32' }} />
                </div>
                <p className="text-[10px] mt-2" style={{ color: 'var(--text-secondary)' }}>{zone.trend}</p>
                <p className="text-[10px] font-medium text-[#2E7D32]">🕐 Best time: {zone.bestTime}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input type="text" placeholder="Search equipment..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
        </div>
        <div className="flex gap-1 rounded-xl border p-1" style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          {zones.map(z => (
            <button key={z} onClick={() => setSelectedZone(z)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                selectedZone === z ? 'bg-[#E00026] text-white' : ''
              }`}
              style={selectedZone !== z ? { color: 'var(--text-secondary)' } : {}}>{z}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {filtered.map(eq => (
          <div key={eq.id} onClick={() => setSelectedEquip(selectedEquip?.id === eq.id ? null : eq)}
            className={`card p-3 cursor-pointer transition-all hover:shadow-md ${
              selectedEquip?.id === eq.id ? 'ring-2 ring-[#E00026]' : ''
            }`}>
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{eq.image}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md`} style={{ background: statusColors[eq.status].bg, color: statusColors[eq.status].text }}>
                {statusColors[eq.status].icon} {eq.status}
              </span>
            </div>
            <p className="text-[11px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{eq.name}</p>
            <div className="space-y-1 text-[9px]" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex justify-between"><span>Usage</span><span className="font-semibold" style={{ color: eq.currentUsage > 70 ? '#C62828' : '#2E7D32' }}>{eq.currentUsage}%</span></div>
              <div className="flex justify-between"><span>Wait</span><span className="font-semibold">{eq.avgWaitTime > 0 ? `${eq.avgWaitTime} min` : 'None'}</span></div>
              {selectedEquip?.id === eq.id && (
                <div className="mt-2 pt-2 border-t animate-fadeIn" style={{ borderColor: 'var(--border)' }}>
                  <p>Peak: {eq.peakUsage}:00</p>
                  <p>Trend: {eq.trend === 'rising' ? '📈 Getting busier' : eq.trend === 'falling' ? '📉 Freeing up' : '➡️ Stable'}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
