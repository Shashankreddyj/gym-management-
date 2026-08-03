import { useState } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, Clock, Phone, MessageSquare, Mail, Send, XCircle, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import { mockChurnAlerts, mockMembers, ChurnAlert } from '../../data/mockData';

export default function Retention() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [showOutreach, setShowOutreach] = useState(false);
  const [outreachStep, setOutreachStep] = useState(0);
  const [approvalFilter, setApprovalFilter] = useState<'all' | 'Pending' | 'Approved'>('all');
  const [alertStatuses, setAlertStatuses] = useState<Record<string, { autoActionTaken: boolean; staffApproval: string; declinedReason?: string }>>({});

  const filteredAlerts = mockChurnAlerts.filter(a => {
    const overridden = alertStatuses[a.id];
    const actualApproval = overridden?.staffApproval || a.staffApproval;
    return approvalFilter === 'all' || actualApproval === approvalFilter;
  });

  const getAlertStatus = (alert: ChurnAlert) => {
    return alertStatuses[alert.id] || { autoActionTaken: alert.autoActionTaken, staffApproval: alert.staffApproval };
  };

  const approveOutreach = (alertId: string) => {
    simulateOutreach();
    setAlertStatuses(prev => ({ ...prev, [alertId]: { autoActionTaken: true, staffApproval: 'Approved' } }));
  };

  const declineOutreach = (alertId: string) => {
    setAlertStatuses(prev => ({ ...prev, [alertId]: { autoActionTaken: false, staffApproval: 'Declined' } }));
  };

  const churnData = [
    { name: 'No visits 14d+', value: 18, color: '#C62828' },
    { name: 'Missed payment', value: 7, color: '#E00026' },
    { name: 'Low engagement', value: 22, color: '#F9A825' },
    { name: 'Class dropout', value: 12, color: '#6E625D' },
  ];

  const simulateOutreach = () => {
    setShowOutreach(true);
    setOutreachStep(0);
    [1, 2, 3].forEach((step, i) => {
      setTimeout(() => setOutreachStep(step), (i + 1) * 1200);
    });
  };

  const riskLevelColors: Record<string, string> = {
    High: 'border-l-[#C62828] bg-[#C62828]/5',
    Medium: 'border-l-[#F9A825] bg-[#F9A825]/5',
    Low: 'border-l-[#2E7D32] bg-[#2E7D32]/5',
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">AI Retention Engine</h2>
          <p className="text-sm text-[#6E625D] mt-1">
            Closed-loop churn prediction → auto-outreach → staff approval → measure outcome
          </p>
        </div>
        <AIBadge text="95.5% Prediction Accuracy" />
      </div>

      {/* Churn Stats Banner */}
      <div className="card p-5 bg-gradient-to-r from-[#231815] to-[#3D2C28] text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E00026] rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-extrabold">AI Retention Active</p>
              <p className="text-sm text-white/70">
                <strong>36% churn reduction</strong> possible with proactive outreach. 
                <strong className="text-[#E00026]"> 47 members</strong> at risk today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-extrabold">84%</p>
              <p className="text-[10px] text-white/60">Retention Rate</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold">3</p>
              <p className="text-[10px] text-white/60">Auto-Triggered Today</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-extrabold">-36%</p>
              <p className="text-[10px] text-white/60">Potential Churn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Churn Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Churn Signal Analysis</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={churnData} layout="vertical" margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6E625D' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6E625D' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                {churnData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">How It Works</h3>
          <div className="space-y-3">
            {[
              { icon: Sparkles, step: '1. Predict', text: 'ML models analyze attendance gaps, billing patterns, and engagement to predict churn with 95.5% accuracy.' },
              { icon: Zap, step: '2. Auto-Act', text: 'System auto-triggers personalized outreach via SMS, email, WhatsApp, or AI voice call based on member preference.' },
              { icon: ShieldAlert, step: '3. Staff Review', text: 'Outreach is queued for staff approval. Managers can approve, modify message, or override with one tap.' },
              { icon: TrendingUp, step: '4. Measure', text: 'Track reopen rates, conversion back to active, and churn prevented — all measured in real time.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#F5F0EA] rounded-xl">
                <div className="w-8 h-8 bg-[#E00026] rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#E00026]">{item.step}</p>
                  <p className="text-[11px] text-[#6E625D] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Churn Alerts with Closed-Loop Actions */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#DDD3CB]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C62828]" />
            <h3 className="text-sm font-bold text-[#231815]">Active Churn Alerts</h3>
            <span className="text-[10px] font-bold text-[#C62828] bg-[#C62828]/10 px-2 py-0.5 rounded-md">
              {mockChurnAlerts.filter(a => a.riskLevel === 'High').length} HIGH
            </span>
          </div>
          <div className="flex gap-1 bg-[#F5F0EA] rounded-lg p-1">
            {['all', 'Pending', 'Approved'].map(f => (
              <button key={f} onClick={() => setApprovalFilter(f as any)}
                className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${
                  approvalFilter === f ? 'bg-[#E00026] text-white' : 'text-[#6E625D]'
                }`}
              >{f === 'all' ? 'All' : f}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-[#DDD3CB]">
          {filteredAlerts.map(alert => (
            <div key={alert.id} className={`p-5 border-l-[3px] ${riskLevelColors[alert.riskLevel]} hover:bg-[#F5F0EA]/30 transition-colors`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: alert.riskLevel === 'High' ? '#C62828' : alert.riskLevel === 'Medium' ? '#F9A825' : '#2E7D32' }}>
                    {alert.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#231815]">{alert.member}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        alert.riskLevel === 'High' ? 'bg-[#C62828]/10 text-[#C62828]' : 
                        alert.riskLevel === 'Medium' ? 'bg-[#F9A825]/10 text-[#F9A825]' : 
                        'bg-[#2E7D32]/10 text-[#2E7D32]'
                      }`}>{alert.riskLevel} Risk — {alert.churnScore}%</span>
                    </div>
                    <p className="text-xs text-[#6E625D] mt-0.5">{alert.reason}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-[52px]">
                <span className="text-[10px] text-[#6E625D] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {alert.daysSinceLastVisit}d no visit
                </span>
                <span className="text-[10px] text-[#6E625D]">{alert.outreachChannel}</span>
                {getAlertStatus(alert).autoActionTaken ? (
                  <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Acted
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#6E625D] bg-[#6E625D]/10 px-2 py-0.5 rounded-md">Pending</span>
                )}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  getAlertStatus(alert).staffApproval === 'Approved' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 
                  getAlertStatus(alert).staffApproval === 'Declined' ? 'bg-[#C62828]/10 text-[#C62828]' : 'bg-[#F9A825]/10 text-[#F9A825]'
                }`}>Staff: {getAlertStatus(alert).staffApproval}</span>
              </div>

              <div className="flex items-center gap-2 mt-3 ml-[52px]">
                <p className="text-[11px] font-medium text-[#E00026] flex-1">💡 {alert.recommendedAction}</p>
                {getAlertStatus(alert).staffApproval === 'Pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => approveOutreach(alert.id)} className="px-3 py-1.5 bg-[#E00026] text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Approve
                    </button>
                    <button onClick={() => declineOutreach(alert.id)} className="px-3 py-1.5 bg-white border border-[#DDD3CB] rounded-lg text-[10px] font-bold text-[#6E625D] flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Decline
                    </button>
                  </div>
                )}
                {getAlertStatus(alert).staffApproval === 'Declined' && (
                  <span className="text-[10px] font-semibold text-[#C62828] bg-[#C62828]/10 px-2 py-0.5 rounded-md">Outreach declined — member moved to watchlist</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outreach Simulation Modal */}
      <Modal isOpen={showOutreach} onClose={() => setShowOutreach(false)} title="🔄 Closed-Loop Outreach — Live Demo" size="md">
        <div className="space-y-4">
          <div className="p-4 bg-[#F5F0EA] rounded-xl">
            <p className="text-xs font-semibold text-[#231815] mb-2">Member: Sneha Reddy (85% churn risk)</p>
            <p className="text-[11px] text-[#6E625D]">Prediction: 22 days no visit, declining engagement → Auto-trigger: SMS + Email</p>
          </div>
          {outreachStep >= 1 && (
            <div className="p-4 bg-[#2E7D32]/5 rounded-xl border border-[#2E7D32]/10 animate-slideIn">
              <p className="text-[11px] font-semibold text-[#2E7D32]">✅ Step 1: Staff Approved</p>
              <p className="text-[10px] text-[#6E625D]">Outreach approved with personal note: "We miss you at IronForge!"</p>
            </div>
          )}
          {outreachStep >= 2 && (
            <div className="p-4 bg-[#F7E9D8] rounded-xl animate-slideIn">
              <p className="text-[11px] font-semibold text-[#E00026]">📤 Step 2: Outreach Sent</p>
              <p className="text-[10px] text-[#6E625D]">SMS sent: "Hey Sneha! We've missed you at IronForge 💪 Come back for a free PT session on us. Book here: [link]"</p>
              <p className="text-[10px] text-[#6E625D] mt-1">Email sent: Personalized comeback offer with 3 class suggestions</p>
            </div>
          )}
          {outreachStep >= 3 && (
            <div className="p-4 bg-[#2E7D32]/5 rounded-xl border border-[#2E7D32]/20 animate-fadeIn text-center">
              <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2E7D32]">Outreach Complete!</p>
              <p className="text-xs text-[#6E625D] mt-1">Member will receive SMS and Email instantly. 68% of members re-engage within 48 hours.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
