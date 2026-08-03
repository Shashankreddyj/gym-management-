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
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Based on current data, I'd recommend focusing on the 3 classes below 60% occupancy. Implementing dynamic pricing could recover ~₹8,100/month. Would you like me to generate a detailed action plan?",
        "Your retention rate of 84% is above the 66% industry average. The key risk is 47 members in the red zone — I've auto-triggered outreach for 3 today. Suggest reviewing the Retention page for the full list.",
        "Revenue is trending 12.5% up month-over-month. Elite members are your highest-value segment at ₹3,999/mo. Consider the upsell opportunities I identified — 5 members are ready for plan upgrades totaling ₹12,399/month potential.",
      ];
      setMessages(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }]);
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
