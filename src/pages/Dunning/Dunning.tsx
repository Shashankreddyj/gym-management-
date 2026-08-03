import { useState } from 'react';
import { AlertTriangle, CreditCard, TrendingUp, Phone, MessageSquare, CheckCircle2, Clock, Sparkles, XCircle, RefreshCw } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import Modal from '../../components/common/Modal';
import { dunningRecords, paymentPlans, dunningStats } from '../../data/dunningData';

export default function Dunning() {
  const [showRecoverySim, setShowRecoverySim] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(0);
  const [recoveredIds, setRecoveredIds] = useState<Record<string, boolean>>({});
  const [offeredPlanIds, setOfferedPlanIds] = useState<Record<string, boolean>>({});

  const statusColors: Record<string, string> = {
    Retrying: 'bg-[#F9A825]/10 text-[#F9A825]',
    Contacted: 'bg-[#E00026]/10 text-[#E00026]',
    Escalated: 'bg-[#C62828]/10 text-[#C62828]',
    Recovered: 'bg-[#2E7D32]/10 text-[#2E7D32]',
    WrittenOff: 'bg-[#6E625D]/10 text-[#6E625D]',
  };

  const simulateRecovery = () => {
    setShowRecoverySim(true);
    setRecoveryStep(0);
    [1,2,3,4].forEach((s, i) => setTimeout(() => setRecoveryStep(s), (i+1)*1200));
  };

  const handleRecover = (id: string) => {
    setRecoveredIds(prev => ({...prev, [id]: true}));
  };

  const handleOfferPlan = (id: string) => {
    setOfferedPlanIds(prev => ({...prev, [id]: true}));
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Payment Recovery</h2>
          <p className="text-sm text-[#6E625D] mt-1">AI-powered dunning workflow — automatic retry → SMS → Email → Voice call</p>
        </div>
        <div className="flex items-center gap-3">
          <AIBadge text="Auto-Dunning" />
          <button onClick={simulateRecovery} className="btn-primary text-xs flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Simulate Recovery
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Failed', value: `₹${dunningStats.totalFailed.toLocaleString()}`, icon: AlertTriangle, color: '#C62828' },
          { label: 'Recovered', value: `₹${dunningStats.totalRecovered.toLocaleString()}`, icon: CheckCircle2, color: '#2E7D32' },
          { label: 'Recovery Rate', value: dunningStats.recoveryRate, icon: TrendingUp, color: '#E00026' },
          { label: 'AI Outreach Success', value: dunningStats.aiOutreachSuccess, icon: Sparkles, color: '#E00026' },
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

      {/* Dunning Workflow Visual */}
      <div className="card p-6">
        <h3 className="text-sm font-bold text-[#231815] mb-4">AI Dunning Sequence</h3>
        <div className="flex items-center gap-0 flex-wrap">
          {[
            { icon: RefreshCw, label: 'Day 1: Auto-Retry', desc: 'Card/UPI auto-debit', color: '#F9A825' },
            { icon: MessageSquare, label: 'Day 3: AI SMS', desc: 'Friendly reminder', color: '#E00026' },
            { icon: Phone, label: 'Day 7: AI Call', desc: 'Voice outreach', color: '#C62828' },
            { icon: CreditCard, label: 'Day 14: Offer Plan', desc: 'Payment extension', color: '#2E7D32' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-0">
              <div className="flex flex-col items-center p-3 bg-[#F5F0EA] rounded-xl min-w-[130px]">
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
                <p className="text-[10px] font-bold text-[#231815] mt-1">{step.label}</p>
                <p className="text-[9px] text-[#6E625D]">{step.desc}</p>
              </div>
              {i < 3 && <div className="w-8 h-0.5 bg-[#DDD3CB] mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Dunning Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dunningRecords.map(rec => {
          const isRecovered = recoveredIds[rec.id];
          const displayStatus = isRecovered ? 'Recovered' : rec.status;
          return (
            <div key={rec.id} className={`card p-5 border-l-[3px] ${
              displayStatus === 'Recovered' ? 'border-l-[#2E7D32]' : rec.status === 'Escalated' ? 'border-l-[#C62828]' : 'border-l-[#F9A825]'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: displayStatus === 'Recovered' ? '#2E7D32' : rec.status === 'Escalated' ? '#C62828' : '#F9A825' }}>
                    {rec.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#231815]">{rec.member}</p>
                    <p className="text-xs text-[#6E625D]">{rec.plan} • ₹{rec.amount}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${statusColors[displayStatus] || statusColors.Recovered}`}>
                  {displayStatus}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3 text-[10px] text-[#6E625D]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rec.daysOverdue}d overdue</span>
                <span>{rec.attempts} attempts</span>
                <span>• {rec.channel}</span>
              </div>
              <p className="text-[11px] text-[#E00026] mt-2">{rec.nextAction}</p>
              {displayStatus !== 'Recovered' && displayStatus !== 'WrittenOff' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleRecover(rec.id)} className="px-3 py-1.5 bg-[#2E7D32] text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Mark Recovered
                  </button>
                  <button onClick={() => handleOfferPlan(rec.id)} className="px-3 py-1.5 bg-[#F5F0EA] rounded-lg text-[10px] font-bold text-[#231815]">
                    Offer Plan
                  </button>
                </div>
              )}
              {isRecovered && <p className="text-[10px] text-[#2E7D32] mt-2 animate-fadeIn">✓ Payment recovered. Member retained.</p>}
              {offeredPlanIds[rec.id] && <p className="text-[10px] text-[#F9A825] mt-2 animate-fadeIn">✓ Payment plan of ₹{(rec.amount/2).toFixed(0)} x 2 offered</p>}
            </div>
          );
        })}
      </div>

      {/* Active Payment Plans */}
      <div className="card p-6">
        <h3 className="text-sm font-bold text-[#231815] mb-4">Active Payment Plans</h3>
        <div className="space-y-3">
          {paymentPlans.map(plan => (
            <div key={plan.id} className="flex items-center justify-between p-3 bg-[#F5F0EA] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F9A825] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">{plan.avatar}</div>
                <div>
                  <p className="text-xs font-semibold text-[#231815]">{plan.member}</p>
                  <p className="text-[10px] text-[#6E625D]">₹{plan.originalAmount} → {plan.installments} x ₹{plan.perInstallment}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                plan.status === 'Accepted' ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#F9A825]/10 text-[#F9A825]'
              }`}>{plan.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Sim Modal */}
      <Modal isOpen={showRecoverySim} onClose={() => setShowRecoverySim(false)} title="🔄 AI Dunning Recovery Simulation" size="md">
        <div className="space-y-3">
          {recoveryStep >= 1 && <div className="p-3 bg-[#F5F0EA] rounded-xl animate-slideIn"><p className="text-xs font-semibold">Day 1: Auto-Retry</p><p className="text-[10px] text-[#6E625D]">Card/UPI auto-debit attempted — 62% success rate</p></div>}
          {recoveryStep >= 2 && <div className="p-3 bg-[#E00026]/5 rounded-xl animate-slideIn"><p className="text-xs font-semibold text-[#E00026]">Day 3: AI SMS Sent</p><p className="text-[10px] text-[#6E625D]">"Hi, we noticed your payment didn't go through. No worries! Update your method here: [link]"</p></div>}
          {recoveryStep >= 3 && <div className="p-3 bg-[#C62828]/5 rounded-xl animate-slideIn"><p className="text-xs font-semibold text-[#C62828]">Day 7: AI Voice Call</p><p className="text-[10px] text-[#6E625D]">AI called member — 71% recovery rate with voice outreach</p></div>}
          {recoveryStep >= 4 && (
            <div className="text-center py-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2E7D32]">71% Recovery Rate!</p>
              <p className="text-xs text-[#6E625D] mt-1">AI dunning recovers 55-71% of failed payments within 14 days</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
