import { useState } from 'react';
import { TrendingUp, DollarSign, Target, ArrowUpRight, Zap, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AIBadge from '../../components/common/AIBadge';
import { upsellOpportunities, dynamicPricing, revenueOpportunityTotal, UpsellOpportunity, DynamicPricing } from '../../data/revenueData';

export default function RevenueOptimizer() {
  const [activeTab, setActiveTab] = useState<'upsell' | 'pricing'>('upsell');
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const stageColors: Record<string, string> = {
    Ready: 'bg-[#2E7D32]/10 text-[#2E7D32]',
    Warming: 'bg-[#F9A825]/10 text-[#F9A825]',
    Nurturing: 'bg-[#6E625D]/10 text-[#6E625D]',
  };

  const upsellChart = [
    { name: 'Ready', value: upsellOpportunities.filter(u => u.stage === 'Ready').length, color: '#2E7D32' },
    { name: 'Warming', value: upsellOpportunities.filter(u => u.stage === 'Warming').length, color: '#F9A825' },
    { name: 'Nurturing', value: upsellOpportunities.filter(u => u.stage === 'Nurturing').length, color: '#6E625D' },
  ];

  const handleAction = (id: string) => {
    setCompletedActions(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Revenue Optimizer</h2>
          <p className="text-sm text-[#6E625D] mt-1">AI-powered upsell engine + dynamic pricing = maximize revenue per member</p>
        </div>
        <AIBadge text="₹12.4K/month potential" />
      </div>

      {/* Revenue Opportunity Banner */}
      <div className="card p-5 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-extrabold">Revenue Opportunities Identified</p>
              <p className="text-sm text-white/70">
                <strong>₹12,399/month</strong> in actionable upsells + <strong>₹12,900/month</strong> through dynamic pricing
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold">₹25,299</p>
            <p className="text-[11px] text-white/60">Total monthly uplift potential</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-[#DDD3CB] p-1 w-fit">
        {[
          { key: 'upsell' as const, label: '📈 Plan Upsells', count: upsellOpportunities.filter(u => u.stage === 'Ready').length },
          { key: 'pricing' as const, label: '💲 Dynamic Pricing', count: dynamicPricing.filter(d => d.currentFill < 70).length },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.key ? 'bg-[#E00026] text-white' : 'text-[#6E625D] hover:text-[#231815]'
            }`}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === 'upsell' ? (
        <div className="space-y-4">
          {/* Upsell Funnel Chart */}
          <div className="card p-6">
            <h3 className="text-sm font-bold text-[#231815] mb-4">Upsell Pipeline</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={upsellChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDD3CB" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6E625D' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDD3CB' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                  {upsellChart.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {upsellOpportunities.map(opp => (
            <div key={opp.id} className={`card p-5 border-l-[3px] ${
              opp.stage === 'Ready' ? 'border-l-[#2E7D32]' : opp.stage === 'Warming' ? 'border-l-[#F9A825]' : 'border-l-[#6E625D]'
            }`}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#E00026] to-[#C50020] rounded-xl flex items-center justify-center text-white text-xs font-bold">{opp.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#231815]">{opp.member}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${stageColors[opp.stage]}`}>{opp.stage}</span>
                    </div>
                    <p className="text-xs text-[#6E625D] mt-0.5">{opp.trigger}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-[#6E625D]">{opp.currentPlan} → <strong className="text-[#E00026]">{opp.recommendedPlan}</strong></span>
                      <span className="text-[10px] font-bold text-[#2E7D32]">+₹{opp.revenueUplift}/mo</span>
                      <span className="text-[10px] text-[#6E625D]">{opp.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
                {completedActions[opp.id] ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#2E7D32]"><CheckCircle2 className="w-3.5 h-3.5" /> Offer Sent</span>
                ) : (
                  <button onClick={() => handleAction(opp.id)} className="btn-primary text-xs">Send Upgrade Offer</button>
                )}
                {completedActions[opp.id] && (
                  <p className="text-[10px] text-[#2E7D32] w-full animate-fadeIn">✓ Personalized upgrade offer sent via WhatsApp. Expected response: 24-48 hours.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {dynamicPricing.map(dp => (
            <div key={dp.id} className="card p-5">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#231815]">{dp.className}</p>
                    <span className="text-[10px] text-[#6E625D]">{dp.slot}</span>
                  </div>
                  <p className="text-xs text-[#6E625D] mt-0.5">{dp.reason}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-[#6E625D]">{dp.currentPrice}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#2E7D32]" />
                      <span className="font-bold text-[#2E7D32]">{dp.suggestedPrice}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#F9A825]">{dp.currentFill}% filled</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-[#2E7D32]">+₹{dp.revenueImpact}/mo</p>
                  <p className="text-[10px] text-[#6E625D]">estimated uplift</p>
                  {completedActions[dp.id] ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#2E7D32] mt-2"><CheckCircle2 className="w-3 h-3" /> Applied</span>
                  ) : (
                    <button onClick={() => handleAction(dp.id)} className="btn-secondary text-[10px] mt-2">Apply Pricing</button>
                  )}
                  {completedActions[dp.id] && (
                    <p className="text-[9px] text-[#2E7D32] mt-1 animate-fadeIn">✓ Dynamic pricing active for next 7 days</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
