import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight, Sparkles, Users, TrendingUp, CheckCircle2, Mail, Phone, X } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import { mockMembers, Member } from '../../data/mockData';

const plans = ['Basic', 'Premium', 'Elite', 'Family', 'Corporate'] as const;

export default function Members() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'Active' | 'At-Risk' | 'Inactive' | 'PastDue'>('all');
  const [showAIInsight, setShowAIInsight] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedMembers, setAddedMembers] = useState<Member[]>([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: 'Premium' as Member['membershipType'] });
  const navigate = useNavigate();

  const allMembers = [...mockMembers, ...addedMembers];
  const filtered = allMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddMember = () => {
    if (!form.name || !form.email) return;
    const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newMember: Member = {
      id: `M${String(allMembers.length + 1).padStart(3, '0')}`,
      name: form.name, email: form.email, phone: form.phone || '+91 XXXXXXXXXX',
      avatar: initials, membershipType: form.plan,
      status: 'Active', joinDate: new Date().toISOString().split('T')[0],
      lastVisit: 'Today', churnScore: 5, attendanceStreak: 1, totalVisits: 1,
      nextBilling: new Date(Date.now() + 30*86400000).toISOString().split('T')[0],
      monthlySpend: form.plan === 'Basic' ? 1499 : form.plan === 'Premium' ? 2499 : form.plan === 'Elite' ? 3999 : form.plan === 'Family' ? 5499 : 1999,
      lifetimeValue: 0, goals: ['Getting Started'], recentWorkouts: 1, engagementScore: 95, classes: 0,
    };
    setAddedMembers(prev => [newMember, ...prev]);
    setAddSuccess(true);
    setTimeout(() => { setShowAddModal(false); setAddSuccess(false); setForm({ name: '', email: '', phone: '', plan: 'Premium' }); }, 1500);
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-[#2E7D32]/10 text-[#2E7D32]',
    'At-Risk': 'bg-[#F9A825]/10 text-[#F9A825]',
    Inactive: 'bg-[#6E625D]/10 text-[#6E625D]',
    PastDue: 'bg-[#C62828]/10 text-[#C62828]',
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Members</h2>
          <p className="text-sm text-[#6E625D] mt-1">{allMembers.length} members • AI-powered insights</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {showAIInsight && (
        <div className="card p-4 border-l-[3px] border-l-[#E00026] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#E00026]" />
            <div>
              <p className="text-sm font-semibold text-[#231815]">AI Member Insight</p>
              <p className="text-xs text-[#6E625D]">4 members showing early churn signals. 3 haven&apos;t visited in 2+ weeks. Consider proactive outreach.</p>
            </div>
          </div>
          <button onClick={() => setShowAIInsight(false)} className="btn-secondary text-xs">Dismiss</button>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E625D]" />
          <input
            type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-1 bg-white rounded-xl border border-[#DDD3CB] p-1">
          {['all', 'Active', 'At-Risk', 'PastDue'].map(f => (
            <button key={f} onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f ? 'bg-[#E00026] text-white' : 'text-[#6E625D] hover:text-[#231815]'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F5F0EA] border-b border-[#DDD3CB] text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider">
          <div className="col-span-4">Member</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Churn Risk</div>
          <div className="col-span-2 text-right">Last Visit</div>
        </div>
        {filtered.map(m => (
          <div
            key={m.id}
            onClick={() => navigate(`/members/${m.id}`)}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#DDD3CB] hover:bg-[#F5F0EA]/50 cursor-pointer transition-colors items-center"
          >
            <div className="col-span-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
                m.status === 'Active' ? 'bg-gradient-to-br from-[#E00026] to-[#C50020]' :
                m.status === 'At-Risk' ? 'bg-[#F9A825]' : 'bg-[#6E625D]'
              }`}>{m.avatar}</div>
              <div>
                <p className="text-sm font-semibold text-[#231815]">{m.name}</p>
                <p className="text-[11px] text-[#6E625D]">{m.email}</p>
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-xs font-semibold text-[#231815]">{m.membershipType}</span>
            </div>
            <div className="col-span-2">
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${statusColors[m.status]}`}>{m.status}</span>
            </div>
            <div className="col-span-2">
              <ProgressBar value={m.churnScore} size="sm" color={m.churnScore > 60 ? '#C62828' : m.churnScore > 30 ? '#F9A825' : '#2E7D32'} />
            </div>
            <div className="col-span-2 text-right text-xs text-[#6E625D]">{m.lastVisit}</div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setAddSuccess(false); }} title="Add New Member">
        {addSuccess ? (
          <div className="text-center py-8 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-[#2E7D32] mx-auto mb-3" />
            <p className="text-lg font-bold text-[#2E7D32]">Member Added!</p>
            <p className="text-sm text-[#6E625D] mt-1">{form.name} has been registered with {form.plan} plan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Full Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Enter full name" className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="email@example.com" className="input-field" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="+91 XXXXXXXXXX" className="input-field" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Membership Plan</label>
              <div className="grid grid-cols-5 gap-2">
                {plans.map(p => (
                  <button key={p} onClick={() => setForm({...form, plan: p})}
                    className={`p-2 rounded-xl text-xs font-semibold transition-all ${
                      form.plan === p ? 'bg-[#E00026] text-white' : 'bg-[#F5F0EA] text-[#6E625D] hover:bg-[#F7E9D8]'
                    }`}
                  >{p}</button>
                ))}
              </div>
            </div>
            <button onClick={handleAddMember} disabled={!form.name || !form.email}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Add Member
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
