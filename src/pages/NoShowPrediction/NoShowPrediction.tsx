import { useState } from 'react';
import { AlertTriangle, Bell, Clock, Sparkles, ShieldAlert, CheckCircle2, XCircle, Send, Users } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import Modal from '../../components/common/Modal';

const noShowPredictions = [
  { id: 'NS001', member: 'Amit Patel', avatar: 'AP', class: 'HIIT Blast', time: 'Tomorrow 6:00 AM', probability: 85, reason: 'Habitual no-show pattern (3 of last 5), 16 days no visit', autoAction: true },
  { id: 'NS002', member: 'Meera Joshi', avatar: 'MJ', class: 'Power Yoga', time: 'Tomorrow 7:00 AM', probability: 72, reason: 'First-time class attendance, 40% first-timers no-show', autoAction: true },
  { id: 'NS003', member: 'Neha Gupta', avatar: 'NG', class: 'Evening Flow', time: 'Tomorrow 6:00 PM', probability: 68, reason: '29 days no visit, low engagement (11 score)', autoAction: false },
  { id: 'NS004', member: 'Sahil Verma', avatar: 'SV', class: 'Spin Cycle', time: 'Tomorrow 8:00 AM', probability: 45, reason: 'Moderate risk — 2 prior no-shows this month', autoAction: false },
  { id: 'NS005', member: 'Rajesh Kumar', avatar: 'RK', class: 'Strength Foundations', time: 'Tomorrow 9:00 AM', probability: 8, reason: 'Very low risk — 24-day streak, high engagement', autoAction: false },
];

const waitlistBackfill = [
  { id: 'WL001', className: 'HIIT Blast', waitlisted: 4, predictedNoShows: 3, autoBackfill: true, slotsFilled: 3 },
  { id: 'WL002', className: 'Spin Cycle', waitlisted: 6, predictedNoShows: 2, autoBackfill: true, slotsFilled: 2 },
  { id: 'WL003', className: 'Boxing Circuit', waitlisted: 5, predictedNoShows: 1, autoBackfill: false, slotsFilled: 0 },
];

export default function NoShowPrediction() {
  const [sentReminders, setSentReminders] = useState<Record<string, boolean>>({});
  const [showAISim, setShowAISim] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [backfilledIds, setBackfilledIds] = useState<Record<string, boolean>>({});

  const handleSendReminder = (id: string) => {
    setSentReminders(prev => ({...prev, [id]: true}));
  };

  const handleBackfill = (id: string) => {
    setBackfilledIds(prev => ({...prev, [id]: true}));
  };

  const simSteps = () => {
    setShowAISim(true);
    setSimStep(0);
    [1,2,3].forEach((s, i) => setTimeout(() => setSimStep(s), (i+1)*1200));
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">No-Show Prediction</h2>
          <p className="text-sm text-[#6E625D] mt-1">ML-powered predictions + preemptive reminders + smart waitlist backfill</p>
        </div>
        <div className="flex items-center gap-3">
          <AIBadge text="85% Accuracy" />
          <button onClick={simSteps} className="btn-primary text-xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Simulate AI Prevention
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Predicted No-Shows', value: '12 tomorrow', color: '#C62828', icon: AlertTriangle },
          { label: 'Reminders Sent', value: '8 auto-sent', color: '#2E7D32', icon: Bell },
          { label: 'Waitlist Backfill', value: '5 slots filled', color: '#E00026', icon: Users },
          { label: 'Prevention Rate', value: '62%', color: '#2E7D32', icon: ShieldAlert },
        ].map((stat, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#231815]">{stat.value}</p>
              <p className="text-[11px] text-[#6E625D]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Tomorrow's No-Show Predictions</h3>
          <div className="space-y-3">
            {noShowPredictions.map(pred => (
              <div key={pred.id} className={`p-4 rounded-xl border-l-[3px] ${
                pred.probability >= 70 ? 'border-l-[#C62828] bg-[#C62828]/3' : pred.probability >= 40 ? 'border-l-[#F9A825] bg-[#F9A825]/3' : 'border-l-[#2E7D32] bg-[#2E7D32]/3'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: pred.probability >= 70 ? '#C62828' : pred.probability >= 40 ? '#F9A825' : '#2E7D32' }}>
                      {pred.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#231815]">{pred.member}</p>
                      <p className="text-[11px] text-[#6E625D]">{pred.class} • {pred.time}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-extrabold ${pred.probability >= 70 ? 'text-[#C62828]' : pred.probability >= 40 ? 'text-[#F9A825]' : 'text-[#2E7D32]'}`}>{pred.probability}%</span>
                </div>
                <p className="text-[10px] text-[#6E625D] mt-2">{pred.reason}</p>
                <div className="flex items-center gap-2 mt-2">
                  {pred.autoAction && <span className="text-[9px] font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-full">🤖 Auto-reminded</span>}
                  {sentReminders[pred.id] ? (
                    <span className="text-[9px] font-semibold text-[#2E7D32] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Reminder Sent</span>
                  ) : !pred.autoAction && (
                    <button onClick={() => handleSendReminder(pred.id)} className="text-[10px] font-semibold text-[#E00026] hover:underline flex items-center gap-1">
                      <Send className="w-3 h-3" /> Send Reminder Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist Backfill */}
        <div className="card p-6">
          <h3 className="text-sm font-bold text-[#231815] mb-4">Smart Waitlist Backfill</h3>
          <div className="space-y-4">
            {waitlistBackfill.map(wl => (
              <div key={wl.id} className="p-4 bg-[#F5F0EA] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-[#231815]">{wl.className}</p>
                  <span className="text-[10px] text-[#E00026] font-semibold">{wl.waitlisted} waitlisted</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-[#6E625D]">
                  <span>📊 {wl.predictedNoShows} predicted no-shows</span>
                  <span>{wl.autoBackfill ? '🤖 Auto-backfill ON' : '⏸ Manual'}</span>
                </div>
                {backfilledIds[wl.id] ? (
                  <p className="text-[10px] text-[#2E7D32] mt-2 animate-fadeIn">✓ {wl.predictedNoShows} waitlisted members auto-confirmed</p>
                ) : (
                  <button onClick={() => handleBackfill(wl.id)} className="mt-2 text-[10px] font-semibold text-[#E00026] hover:underline">
                    Trigger Backfill →
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Deposit Simulation */}
          <div className="mt-6 p-4 bg-[#F7E9D8] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E00026]" />
              <p className="text-xs font-bold text-[#231815]">AI Recommendation</p>
            </div>
            <p className="text-[11px] text-[#6E625D] leading-relaxed">
              Implementing a ₹99 refundable deposit for peak classes (6AM-8AM) could reduce no-shows by 45%. 
              Estimated impact: +₹8,400/month from recovered class slots.
            </p>
            <button className="mt-2 text-[11px] font-semibold text-[#E00026] hover:underline">Enable Deposit System →</button>
          </div>
        </div>
      </div>

      {/* AI Sim Modal */}
      <Modal isOpen={showAISim} onClose={() => setShowAISim(false)} title="🤖 AI No-Show Prevention Simulation" size="md">
        <div className="space-y-3">
          {simStep >= 1 && <div className="p-3 bg-[#F5F0EA] rounded-xl animate-slideIn"><p className="text-xs font-semibold">Step 1: ML Prediction</p><p className="text-[10px] text-[#6E625D]">Model analyzed 5 factors: attendance, time since last visit, class history, day of week, weather. Predicted 12 no-shows tomorrow.</p></div>}
          {simStep >= 2 && <div className="p-3 bg-[#E00026]/5 rounded-xl animate-slideIn"><p className="text-xs font-semibold text-[#E00026]">Step 2: Auto-Reminders Sent</p><p className="text-[10px] text-[#6E625D]">8 AI reminders dispatched via WhatsApp/SMS. "Hey! We're excited to see you at 6AM HIIT tomorrow. Reply YES to confirm!"</p></div>}
          {simStep >= 3 && (
            <div className="text-center py-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2E7D32]">62% Prevention Rate!</p>
              <p className="text-xs text-[#6E625D] mt-1">5 waitlisted members auto-backfilled. 3 slots recovered → +₹1,047 revenue.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
