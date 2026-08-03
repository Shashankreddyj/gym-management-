import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, TrendingUp, Users, Calendar, CreditCard, Target, Zap, ArrowRight, BarChart3, ChevronDown } from 'lucide-react';
import { aiQueries, quickQueries } from '../../data/aiInsightsData';
import AIBadge from '../../components/common/AIBadge';

interface Message {
  role: 'user' | 'ai';
  text: string;
  chart?: React.ReactNode;
}

export default function AIInsights() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "👋 I'm your AI Business Analyst. Ask me anything about your gym's performance, or tap a quick query below." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleQuickQuery = (query: string) => {
    const data = aiQueries[query as keyof typeof aiQueries];
    if (!data) return;
    setMessages(prev => [...prev, { role: 'user', text: data.question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (data.type === 'table' && Array.isArray(data.data)) {
        const tableData = data.data as Array<Record<string, any>>;
        setMessages(prev => [...prev, {
          role: 'ai',
          text: data.insight,
          chart: (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-[#DDD3CB]">
                    {Object.keys(tableData[0]).map(k => <th key={k} className="text-left py-2 px-3 text-[#6E625D] font-semibold uppercase">{k.replace(/([A-Z])/g, ' $1').trim()}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b border-[#DDD3CB]/50">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className={`py-2 px-3 ${j === 1 && typeof val === 'string' && val.includes('%') ? (parseInt(val) > 60 ? 'text-[#C62828] font-bold' : 'text-[#2E7D32] font-bold') : 'text-[#231815]'}`}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        }]);
      } else if (data.type === 'kpi' && typeof data.data === 'object' && !Array.isArray(data.data)) {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: data.insight,
          chart: (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Object.entries(data.data).map(([k, v]) => (
                <div key={k} className="p-3 bg-[#F5F0EA] rounded-xl">
                  <p className="text-[10px] text-[#6E625D] uppercase tracking-wider">{k.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm font-bold text-[#231815] mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          ),
        }]);
      }
    }, 1200);
  };

  const handleCustomQuery = () => {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let response = "Based on current data, I'd recommend focusing on the 3 classes below 60% occupancy. Implementing dynamic pricing could recover ~₹8,100/month. Would you like me to generate a detailed action plan?";

      if (q.includes('revenue') && (q.includes('plan') || q.includes('breakdown'))) {
        response = "Here's your revenue breakdown by plan:\n\n• Elite (28% of members): ₹6.88L/month (45% of revenue)\n• Premium (35%): ₹5.24L/month (34%)\n• Basic (25%): ₹2.25L/month (15%)\n• Family/Corporate (12%): ₹0.92L/month (6%)\n\nElite members generate 2.7x more revenue per member than Basic. My recommendation: target the 120 Premium members with 6+ month tenure for Elite upgrade — potential +₹1.8L/month. Want me to generate the target list?";
      } else if (q.includes('churn') || q.includes('risk') || q.includes('leaving')) {
        response = "Currently 47 members flagged at-risk (5.5% of membership). Top churn signals:\n\n• 22 members: Low engagement (score < 30)\n• 18 members: No visits in 14+ days\n• 7 members: Failed/missed payments\n• 12 members: Dropped class attendance\n\nHigh-risk members (score > 70): Sneha Reddy (85%), Neha Gupta (92%), Amit Patel (78%). AI has auto-triggered outreach for all 3 today. At stake: ₹70,500/month in potential lost revenue. Our 84% retention rate is strong but these 47 need immediate attention.";
      } else if (q.includes('class') || q.includes('occupancy') || q.includes('schedule')) {
        response = "Class occupancy analysis:\n\n• Average: 82% across all classes\n• Fully booked (100%): Spin Cycle, CrossFit WOD, Boxing Circuit\n• Underperformers: Evening Flow (40%), Power Yoga (60%), Zumba Party (60%)\n• Peak hours: 6-8 AM and 5-7 PM\n• Waitlist: 18 members across 4 classes\n\nAI recommendation: Add a 7 AM HIIT slot (4 waitlisted + demand) → +₹4,800/month. Promote Power Yoga to beginners → +₹2,100/month. Deep discount Evening Flow → +₹2,100/month. Total opportunity: ₹9,000/month.";
      } else if (q.includes('member') || q.includes('growth') || q.includes('new')) {
        response = "Member growth analysis (Jan-Aug 2026):\n\n• Jan: 720 → Aug: 856 (+136 net, +18.9%)\n• Avg new members/month: 45\n• Avg churned/month: 13\n• Net growth rate: +3.8%/month\n• Largest growth month: April (+43 net)\n\nAugust is tracking at +28 so far. At current trajectory, we'll hit 1,000 members by December 2026. Key driver: Instagram leads (40% of new members). Churn is declining — from 18/month in Jan to 8/month in Aug — AI retention is working.";
      } else if (q.includes('trainer') || q.includes('staff') || q.includes('performance')) {
        response = "Trainer performance analysis:\n\n⭐ Top rated: Mike Chen (4.9/5.0, 92% utilization), Priya Sharma (4.8/5.0, 85% utilization)\n📈 Highest NPS: Mike Chen (94), Priya Sharma (91)\n⚠️ Needs attention: Arjun Nair (4.3/5.0, 60% utilization, 78 NPS)\n\nMike and Priya are your stars — 12 and 10 classes/week respectively. Arjun (junior trainer) needs mentoring or reduced load. Total monthly commission: ₹15,900. Average trainer utilization: 79%. Recommendation: consider promoting Priya to Head Trainer role.";
      } else if (q.includes('compare') || q.includes('month') || q.includes('trend')) {
        response = "Month-over-month comparison (July vs August):\n\n• Revenue: ₹18.0L → ₹18.35L (+1.9%)\n• Members: 848 → 856 (+8 net)\n• Churn: 11 → 8 (-27%)\n• New leads: 38 → 28 (-26%)\n• Class occupancy: 81% → 82% (+1%)\n\nRevenue is growing steadily. Churn is declining significantly thanks to AI retention. Lead volume dropped but conversion rate improved from 32% to 34%. Overall trajectory is positive. Key focus area: maintain churn reduction while increasing lead generation.";
      } else if (q.includes('profit') || q.includes('margin') || q.includes('expense') || q.includes('cost')) {
        response = "Profit & margin analysis:\n\n• August revenue: ₹18.35L\n• August expenses: ₹11.20L\n• Net profit: ₹7.15L (39% margin)\n• Largest expense: Staff salaries (₹4.8L, 43% of expenses)\n• Rent: ₹2.2L (20%)\n• Equipment maintenance: ₹0.8L (7%)\n• Marketing: ₹0.5L (4.5%)\n\n39% margin is healthy for the fitness industry (avg: 25-35%). Biggest optimization lever: class occupancy. Moving from 82% → 90% would add ₹1.2L/month pure profit with zero additional cost.";
      } else if (q.includes('lead') || q.includes('conversion') || q.includes('pipeline')) {
        response = "Lead pipeline analysis:\n\n• New leads today: 12\n• Avg response time: 31 seconds (industry best: 5 minutes)\n• Lead → Trial: 68% conversion\n• Trial → Member: 50% conversion\n• Overall conversion: 34% (industry avg: 18%)\n\nTop sources: Instagram (40%), Google (25%), Referral (20%), Website (10%), Walk-in (5%). AI instant response at 31 seconds is your superpower — 40-60% of leads convert when contacted within 1 minute. Your pipeline value: 12 leads × 34% conversion = ~4 new members this week.";
      } else {
        const variedResponses = [
          "Here's what I can tell you: 856 active members, ₹18.35L monthly revenue, 82% class occupancy, and 84% retention rate. 47 members are at-risk and need attention. Your top-performing trainer is Mike Chen at 4.9/5.0 rating. Revenue is on a 6-month growth streak. What specific area would you like me to dig into? Revenue, churn, members, classes, or leads?",
          "I've analyzed your data. Key highlights: Revenue up 12.5% YoY. Churn down 27% month-over-month thanks to AI outreach. 3 underperforming classes leaving ₹8,100/month on the table. 5 members ready for plan upgrades worth ₹12,399/month. Your AI lead response at 31 seconds is crushing industry benchmarks. Want a deep dive on any of these?",
          "Quick snapshot: IronForge is in great shape. 856 members (84% retention), ₹18.35L revenue (39% margin), 82% class occupancy. Top opportunities: upsell 5 members (+₹12.4K/mo), optimize 3 underbooked classes (+₹8.1K/mo), recover 47 at-risk members (₹70.5K/mo at stake). What would you like to focus on first?",
        ];
        response = variedResponses[Math.floor(Math.random() * variedResponses.length)];
      }
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">AI Business Intelligence</h2>
          <p className="text-sm text-[#6E625D] mt-1">Ask questions in plain English — AI analyzes data and generates insights</p>
        </div>
        <AIBadge text="NL Query Engine" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Chat Panel */}
        <div className="card lg:col-span-2 flex flex-col">
          <div className="p-4 border-b border-[#DDD3CB] flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Analyst Chat</h3>
            <span className="text-[10px] text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-full ml-auto">● Live</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'ai' ? 'bg-[#F5F0EA] rounded-bl-none' : 'bg-[#E00026] text-white rounded-br-none'
                }`}>
                  <p className={`text-xs leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-[#231815]'}`}>{msg.text}</p>
                  {msg.chart}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-slideIn">
                <div className="bg-[#F5F0EA] rounded-2xl rounded-bl-none p-4">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-[#6E625D] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-[#DDD3CB]">
            <div className="flex items-center gap-2">
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCustomQuery()}
                placeholder="Ask anything: 'Show me revenue by plan', 'Which members are at risk?'..."
                className="input-field flex-1 text-sm"
              />
              <button onClick={handleCustomQuery} disabled={!input.trim()} className="p-2.5 rounded-xl bg-[#E00026] text-white disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Queries Panel */}
        <div className="card p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">Quick Queries</h3>
          </div>
          <div className="space-y-2 flex-1">
            {quickQueries.map((q, i) => (
              <button key={i}
                onClick={() => handleQuickQuery(q.query)}
                className="w-full flex items-center gap-3 p-3 bg-[#F5F0EA] rounded-xl hover:bg-[#F7E9D8] transition-colors text-left"
              >
                <span className="text-lg">{q.icon}</span>
                <span className="text-xs font-semibold text-[#231815]">{q.label}</span>
                <ArrowRight className="w-3 h-3 text-[#6E625D] ml-auto" />
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#F7E9D8] rounded-xl">
            <p className="text-[10px] text-[#E00026] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Pro Tip
            </p>
            <p className="text-[10px] text-[#6E625D] mt-1">Try: "Compare this month's revenue to last month" or "Which trainer has the highest class ratings?"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
