import { useState } from 'react';
import { Zap, Sparkles, Phone, MessageSquare, Clock, TrendingUp, UserPlus, Bot, MessageCircle, CheckCircle2 } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import Modal from '../../components/common/Modal';
import { mockLeads, Lead } from '../../data/mockData';

const sources = ['Website', 'Instagram', 'Google', 'Referral', 'Walk-in'] as const;
const interests = ['Weight Loss Program', 'Premium Membership', 'Yoga Classes', 'Free Trial', 'Corporate Plan', 'Personal Training', 'CrossFit'] as const;

export default function Leads() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showAIDemo, setShowAIDemo] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [aiCallStep, setAiCallStep] = useState(0);
  const [allLeads, setAllLeads] = useState<Lead[]>(mockLeads);
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'Website' as Lead['source'], interest: 'Free Trial' as string });

  const statusColors: Record<string, string> = {
    New: 'bg-[#E00026]/10 text-[#E00026]',
    Contacted: 'bg-[#F9A825]/10 text-[#F9A825]',
    'Trial Scheduled': 'bg-[#2E7D32]/10 text-[#2E7D32]',
    Converted: 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30',
    Lost: 'bg-[#6E625D]/10 text-[#6E625D]',
  };

  const channelColors: Record<string, string> = {
    Website: '#E00026',
    Instagram: '#C50020',
    Google: '#2E7D32',
    Referral: '#F9A825',
    'Walk-in': '#6E625D',
  };

  const simulateAICall = () => {
    setShowAIDemo(true);
    setAiCallStep(0);
    [0, 1, 2, 3].forEach((step, i) => {
      setTimeout(() => setAiCallStep(step + 1), (i + 1) * 1500);
    });
  };

  const handleAddLead = () => {
    if (!form.name || !form.email) return;
    const newLead: Lead = {
      id: `L${String(allLeads.length + 1).padStart(3, '0')}`,
      name: form.name, email: form.email, phone: form.phone || '+91 XXXXXXXXXX',
      source: form.source, interest: form.interest,
      status: 'New', score: Math.floor(Math.random() * 30) + 65,
      createdAt: new Date().toISOString(), lastContact: new Date().toISOString(),
      responseTime: `${Math.floor(Math.random() * 50) + 15}s`, notes: '', aiFollowUps: 0,
    };
    setAllLeads(prev => [newLead, ...prev]);
    setAddSuccess(true);
    setTimeout(() => { setShowAddModal(false); setAddSuccess(false); setForm({ name: '', email: '', phone: '', source: 'Website', interest: 'Free Trial' }); }, 1500);
  };

  const aiCallMessages = [
    { role: 'ai', text: '🔔 New lead: Karan Mehta from Instagram. AI initiating instant response...', time: '0s' },
    { role: 'ai', text: '📞 AI calling Karan at +91 99887 76655...', time: '5s' },
    { role: 'ai', text: '✅ Connected! AI receptionist: "Hi Karan! I saw you were interested in our Weight Loss Program. Would you like to schedule a free trial session?"', time: '23s' },
    { role: 'lead', text: 'Karan: "Yes, that sounds great. What times are available?"', time: '35s' },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">AI Lead Response</h2>
          <p className="text-sm text-[#6E625D] mt-1">
            Instant AI outreach — leads contacted in under 60 seconds, 40-60% conversion
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={simulateAICall} className="btn-primary flex items-center gap-2 text-sm">
            <Bot className="w-4 h-4" /> Demo AI Call
          </button>
          <button className="btn-secondary flex items-center gap-2 text-sm" onClick={() => setShowAddModal(true)}>
            <UserPlus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* AI Performance Banner */}
      <div className="card p-5 bg-gradient-to-r from-[#E00026] to-[#C50020] text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-extrabold">AI Lead Engine Active</p>
              <p className="text-sm text-white/80">
                Avg response time: <strong>31 seconds</strong> • Lead-to-trial rate: <strong>68%</strong> • 24/7 autonomous operation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-2xl font-extrabold">12</p>
              <p className="text-[11px] text-white/70">New today</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold">34%</p>
              <p className="text-[11px] text-white/70">Conversion</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold">31s</p>
              <p className="text-[11px] text-white/70">Avg Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['New', 'Contacted', 'Trial Scheduled', 'Converted', 'Lost'].map(stage => {
          const leads = allLeads.filter(l => l.status === stage);
          return (
            <div key={stage} className="card p-4 min-h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-[#6E625D] uppercase tracking-wider">{stage}</span>
                <span className="text-xs font-bold bg-[#F5F0EA] px-2 py-0.5 rounded-lg text-[#231815]">{leads.length}</span>
              </div>
              <div className="space-y-2">
                {leads.map(lead => (
                  <div key={lead.id}
                    onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedLead === lead.id ? 'bg-[#F7E9D8] border border-[#E00026]/20' : 'bg-[#F5F0EA] hover:bg-[#F7E9D8]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" 
                        style={{ backgroundColor: channelColors[lead.source] }}>
                        {lead.name.charAt(0)}
                      </div>
                      <p className="text-xs font-semibold text-[#231815]">{lead.name}</p>
                    </div>
                    <p className="text-[10px] text-[#6E625D] truncate">{lead.interest}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-bold text-[#2E7D32]">⚡ {lead.responseTime}</span>
                      <span className="text-[9px] text-[#6E625D]">Score: {lead.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Demo Modal */}
      <Modal isOpen={showAIDemo} onClose={() => setShowAIDemo(false)} title="🤖 AI Lead Response — Live Demo" size="md">
        <div className="space-y-3">
          {aiCallMessages.slice(0, aiCallStep + 1).map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'lead' ? 'justify-end' : 'justify-start'} animate-slideIn`}>
              <div className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === 'ai' 
                  ? 'bg-[#E00026] text-white rounded-bl-none' 
                  : 'bg-[#F5F0EA] text-[#231815] rounded-br-none'
              }`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-1 ${msg.role === 'ai' ? 'text-white/60' : 'text-[#6E625D]'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          {aiCallStep >= 4 && (
            <div className="text-center py-4 animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-[#2E7D32] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2E7D32]">Lead contacted in 23 seconds!</p>
              <p className="text-xs text-[#6E625D] mt-1">40-60% of leads convert when contacted within 1 minute</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setAddSuccess(false); }} title="Add New Lead">
        {addSuccess ? (
          <div className="text-center py-8 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-[#2E7D32] mx-auto mb-3" />
            <p className="text-lg font-bold text-[#2E7D32]">Lead Added!</p>
            <p className="text-sm text-[#6E625D] mt-1">{form.name} interested in {form.interest}. AI will respond within 60 seconds.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Enter name" className="input-field" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="email@example.com" className="input-field" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+91 XXXXXXXXXX" className="input-field" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Source</label>
              <div className="grid grid-cols-5 gap-2">
                {sources.map(s => (
                  <button key={s} onClick={() => setForm({...form, source: s})}
                    className={`p-2 rounded-xl text-[10px] font-semibold transition-all ${
                      form.source === s ? 'bg-[#E00026] text-white' : 'bg-[#F5F0EA] text-[#6E625D] hover:bg-[#F7E9D8]'
                    }`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E625D] uppercase tracking-wider mb-1 block">Interest</label>
              <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="input-field">
                {interests.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <button onClick={handleAddLead} disabled={!form.name || !form.email}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Add Lead — AI will respond in ~30s
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
