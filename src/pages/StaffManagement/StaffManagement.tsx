import { useState } from 'react';
import { Users, Star, TrendingUp, Clock, Calendar, Award, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';

const staff = [
  { id: 'S001', name: 'Mike Chen', avatar: 'MC', role: 'Head Trainer', speciality: 'HIIT & Strength', classesPerWeek: 12, rating: 4.9, utilization: 92, commission: 4200, memberNPS: 94, status: 'Active' },
  { id: 'S002', name: 'Priya Sharma', avatar: 'PS', role: 'Senior Trainer', speciality: 'Yoga & Dance', classesPerWeek: 10, rating: 4.8, utilization: 85, commission: 3800, memberNPS: 91, status: 'Active' },
  { id: 'S003', name: 'Raj Malhotra', avatar: 'RM', role: 'Trainer', speciality: 'Spin & Cardio', classesPerWeek: 8, rating: 4.6, utilization: 76, commission: 2900, memberNPS: 85, status: 'Active' },
  { id: 'S004', name: 'Jake Williams', avatar: 'JW', role: 'Trainer', speciality: 'CrossFit & Combat', classesPerWeek: 9, rating: 4.7, utilization: 82, commission: 3200, memberNPS: 88, status: 'Active' },
  { id: 'S005', name: 'Arjun Nair', avatar: 'AN', role: 'Junior Trainer', speciality: 'Boxing', classesPerWeek: 6, rating: 4.3, utilization: 60, commission: 1800, memberNPS: 78, status: 'Probation' },
];

const conflicts = [
  { trainer: 'Mike Chen', issue: 'Double-booked: HIIT Blast + Spin Cycle at 6AM Mon', severity: 'High' },
  { trainer: 'Priya Sharma', issue: 'Consecutive classes with no break: Zumba (10AM) + Evening Flow (6PM)', severity: 'Low' },
];

export default function StaffManagement() {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [approveIds, setApproveIds] = useState<Record<string, string>>({});

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Staff & Trainers</h2>
          <p className="text-sm text-[#6E625D] mt-1">Performance tracking, commission calculator, and conflict detection</p>
        </div>
        <AIBadge text="AI Conflict Detection" />
      </div>

      {/* Staff KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Trainers', value: 5, icon: Users, color: '#E00026' },
          { label: 'Avg Rating', value: '4.7/5.0', icon: Star, color: '#F9A825' },
          { label: 'Avg Utilization', value: '79%', icon: TrendingUp, color: '#2E7D32' },
          { label: 'Total Commission', value: '₹15.9K', icon: Award, color: '#E00026' },
        ].map((kpi, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
              <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#231815]">{kpi.value}</p>
              <p className="text-[11px] text-[#6E625D]">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Conflicts */}
      {conflicts.length > 0 && (
        <div className="card p-4 border-l-[3px] border-l-[#C62828] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#C62828]" />
            <div>
              <p className="text-sm font-bold text-[#231815]">Schedule Conflicts Detected</p>
              <p className="text-xs text-[#6E625D]">2 scheduling issues need attention</p>
            </div>
          </div>
          <button className="btn-primary text-xs">Resolve All</button>
        </div>
      )}

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map(s => (
          <div key={s.id} className={`card p-5 hover:shadow-md transition-shadow cursor-pointer ${selectedStaff === s.id ? 'ring-2 ring-[#E00026]' : ''}`}
            onClick={() => setSelectedStaff(selectedStaff === s.id ? null : s.id)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E00026] to-[#C50020] rounded-2xl flex items-center justify-center text-white font-bold text-lg">{s.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-[#231815]">{s.name}</p>
                  <p className="text-[11px] text-[#6E625D]">{s.role}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${s.status === 'Active' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#F9A825]/10 text-[#F9A825]'}`}>{s.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6E625D]">Rating</span>
                <span className="font-semibold text-[#231815] flex items-center gap-1"><Star className="w-3 h-3 text-[#F9A825] fill-[#F9A825]" /> {s.rating}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6E625D]">Utilization</span>
                <span className="font-semibold text-[#231815]">{s.utilization}%</span>
              </div>
              <ProgressBar value={s.utilization} size="sm" color={s.utilization >= 80 ? '#2E7D32' : '#F9A825'} />
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6E625D]">Classes/Week</span>
                <span className="font-semibold text-[#231815]">{s.classesPerWeek}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6E625D]">Commission</span>
                <span className="font-semibold text-[#2E7D32]">₹{s.commission.toLocaleString()}</span>
              </div>
            </div>
            {selectedStaff === s.id && (
              <div className="mt-4 pt-4 border-t border-[#DDD3CB] animate-fadeIn">
                {approveIds[s.id] ? (
                  <p className="text-[10px] text-[#2E7D32]">✓ Commission approved for {s.name}</p>
                ) : (
                  <button onClick={() => setApproveIds({...approveIds, [s.id]: 'approved'})} className="btn-primary text-xs w-full">
                    Approve Commission (₹{s.commission.toLocaleString()})
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Conflict Details */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#E00026]" />
          <h3 className="text-sm font-bold text-[#231815]">AI Conflict Detection</h3>
          <AIBadge />
        </div>
        <div className="space-y-3">
          {conflicts.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#F5F0EA] rounded-xl">
              <div>
                <p className="text-xs font-semibold text-[#231815]">{c.trainer}</p>
                <p className="text-[10px] text-[#6E625D]">{c.issue}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${c.severity === 'High' ? 'bg-[#C62828]/10 text-[#C62828]' : 'bg-[#F9A825]/10 text-[#F9A825]'}`}>{c.severity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
