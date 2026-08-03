import { useState } from 'react';
import { Plus, Sparkles, Users, Clock, MapPin, Bot, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import { mockClasses, Class } from '../../data/mockData';

const classTypes = ['HIIT', 'Yoga', 'Cardio', 'Strength', 'Dance', 'CrossFit', 'Combat'];
const rooms = ['Studio A', 'Studio B', 'Cycle Studio', 'Weight Room', 'Functional Zone', 'Boxing Ring'];
const times = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedClasses, setAddedClasses] = useState<Class[]>([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'HIIT', trainer: '', time: '06:00 AM', duration: 45, capacity: 20, room: 'Studio A' });

  const days = ['Today', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const allClasses = [...mockClasses, ...addedClasses];

  const handleAddClass = () => {
    if (!form.name || !form.trainer) return;
    const initials = form.trainer.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newClass: Class = {
      id: `C${String(allClasses.length + 1).padStart(3, '0')}`,
      name: form.name, trainer: form.trainer, trainerAvatar: initials,
      time: form.time, duration: form.duration, capacity: form.capacity,
      booked: 0, waitlisted: 0, room: form.room, type: form.type, fillRate: 0,
    };
    setAddedClasses(prev => [newClass, ...prev]);
    setAddSuccess(true);
    setTimeout(() => { setShowAddModal(false); setAddSuccess(false); setForm({ name: '', type: 'HIIT', trainer: '', time: '06:00 AM', duration: 45, capacity: 20, room: 'Studio A' }); }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Class Schedule</h2>
          <p className="text-sm text-[#6E625D] mt-1">AI-optimized class management with auto-fill recommendations</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      {/* AI Class Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: 'Peak Occupancy', value: '82%', sub: 'Across all classes', color: '#2E7D32' },
          { icon: Bot, label: 'AI Recommendations', value: '4 active', sub: 'Class optimization suggestions', color: '#E00026' },
          { icon: AlertTriangle, label: 'Underbooked', value: '3 classes', sub: 'Below 60% capacity', color: '#F9A825' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#231815]">{stat.value}</p>
              <p className="text-[11px] text-[#6E625D]">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Day Selector */}
      <div className="flex gap-1 bg-white rounded-xl border border-[#DDD3CB] p-1 w-fit">
        {days.map(d => (
          <button key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedDay === d ? 'bg-[#E00026] text-white' : 'text-[#6E625D] hover:text-[#231815]'
            }`}
          >{d}</button>
        ))}
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allClasses.map(cls => (
          <div key={cls.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#231815]">{cls.name}</h3>
                <span className="text-[10px] font-semibold text-[#E00026] bg-[#E00026]/5 px-2 py-0.5 rounded-md">{cls.type}</span>
              </div>
              <span className={`text-xs font-bold ${
                cls.fillRate >= 90 ? 'text-[#2E7D32]' : cls.fillRate >= 70 ? 'text-[#F9A825]' : 'text-[#C62828]'
              }`}>{cls.fillRate}%</span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-[11px] text-[#6E625D]">
                <Clock className="w-3 h-3" /> {cls.time} • {cls.duration} min
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#6E625D]">
                <Users className="w-3 h-3" /> {cls.booked}/{cls.capacity} booked
                {cls.waitlisted > 0 && <span className="text-[#F9A825] font-semibold">({cls.waitlisted} waitlisted)</span>}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#6E625D]">
                <MapPin className="w-3 h-3" /> {cls.room}
              </div>
            </div>

            <ProgressBar value={cls.fillRate} size="sm" color={cls.fillRate >= 90 ? '#2E7D32' : cls.fillRate >= 70 ? '#F9A825' : '#C62828'} />

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#DDD3CB]">
              <div className="w-6 h-6 bg-[#E00026] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                {cls.trainerAvatar}
              </div>
              <span className="text-[11px] font-medium text-[#231815]">{cls.trainer}</span>
            </div>

            {cls.aiRecommendation && (
              <div className="mt-3 p-2 bg-[#F7E9D8] rounded-lg">
                <p className="text-[10px] text-[#E00026] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> {cls.aiRecommendation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setAddSuccess(false); }} title="Add New Class">
        {addSuccess ? (
          <div className="text-center py-8 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-[#2E7D32] mx-auto mb-3" />
            <p className="text-lg font-bold text-[#2E7D32]">Class Added!</p>
            <p className="text-sm text-[#6E625D] mt-1">{form.name} scheduled for {form.time} in {form.room}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Class Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Morning HIIT" className="input-field" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Trainer Name *</label>
                <input type="text" value={form.trainer} onChange={e => setForm({...form, trainer: e.target.value})}
                  placeholder="e.g. Mike Chen" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Time</label>
                <select value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="input-field">
                  {times.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Duration (min)</label>
                <input type="number" value={form.duration} onChange={e => setForm({...form, duration: Number(e.target.value)})}
                  className="input-field" min={15} max={90} step={5} />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Capacity</label>
                <input type="number" value={form.capacity} onChange={e => setForm({...form, capacity: Number(e.target.value)})}
                  className="input-field" min={5} max={50} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Class Type</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {classTypes.map(t => (
                    <button key={t} onClick={() => setForm({...form, type: t})}
                      className={`p-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                        form.type === t ? 'bg-[#E00026] text-white' : 'bg-[#F5F0EA] text-[#6E625D] hover:bg-[#F7E9D8]'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Room</label>
                <select value={form.room} onChange={e => setForm({...form, room: e.target.value})} className="input-field">
                  {rooms.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleAddClass} disabled={!form.name || !form.trainer}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Schedule Class
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
