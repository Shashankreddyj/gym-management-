import { useState } from 'react';
import { MessageSquareHeart, Phone, MessageCircle, Bot, Sparkles, Send, Mic, Smile, Paperclip, Clock, CheckCircle2 } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import { mockConversations } from '../../data/mockData';

export default function FrontDesk() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<{role: 'ai' | 'user' | 'lead'; text: string; time: string}[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const channelIcons: Record<string, any> = {
    Voice: Phone, Chat: MessageCircle, WhatsApp: MessageCircle, SMS: MessageSquareHeart,
  };

  const channelColors: Record<string, string> = {
    Voice: '#E00026', Chat: '#2E7D32', WhatsApp: '#2E7D32', SMS: '#F9A825',
  };

  const startChat = (conv: typeof mockConversations[0]) => {
    setActiveChat(conv.id);
    setMessages([
      { role: 'lead' as const, text: conv.lastMessage, time: conv.time },
      { role: 'ai' as const, text: getAIResponse(conv.topic), time: 'Just now' },
    ]);
  };

  const getAIResponse = (topic: string): string => {
    const responses: Record<string, string> = {
      'Pricing Inquiry': "Our Premium membership is ₹2,499/month and includes unlimited classes, access to all equipment, and 2 personal training sessions. Would you like to schedule a free trial?",
      'Churn Recovery': "I'd be happy to help you book that free PT session! We have availability tomorrow at 10 AM or 4 PM. Which works better?",
      'Trial Booking': "Your trial is confirmed for Aug 5 at 10 AM. Please arrive 10 minutes early. You'll receive a confirmation SMS shortly.",
      'Payment Recovery': "I tried reaching out about your pending payment. We can offer a 7-day extension if needed. Please reply to this message or call us back.",
      'Corporate Inquiry': "We offer corporate plans starting at ₹1,999/member for groups of 10+. Includes dedicated onboarding and quarterly wellness reports. Would you like a custom quote?",
    };
    return responses[topic] || "I'm IronForge AI assistant. How can I help you today?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input, time: 'Now' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I understand! Let me help with that. As an AI receptionist, I can handle bookings, answer pricing questions, and route complex queries to staff. What else can I assist with?", 
        time: 'Just now' 
      }]);
    }, 800);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInput("I'd like to book a trial session for tomorrow morning");
      }, 2000);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">AI Front Desk</h2>
          <p className="text-sm text-[#6E625D] mt-1">
            Native AI receptionist — voice, chat, WhatsApp, SMS — 24/7, shared memory across channels
          </p>
        </div>
        <AIBadge text="24/7 Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-[#DDD3CB]">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#E00026]" />
              <h3 className="text-sm font-bold text-[#231815]">Active Conversations</h3>
              <AIBadge />
            </div>
          </div>
          <div className="divide-y divide-[#DDD3CB] max-h-[600px] overflow-y-auto">
            {mockConversations.map(conv => {
              const Icon = channelIcons[conv.channel] || MessageCircle;
              return (
                <div key={conv.id}
                  onClick={() => startChat(conv)}
                  className={`p-4 cursor-pointer hover:bg-[#F5F0EA] transition-colors ${activeChat === conv.id ? 'bg-[#F7E9D8] border-l-[3px] border-l-[#E00026]' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" 
                      style={{ backgroundColor: channelColors[conv.channel] }}>
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#231815]">{conv.member}</p>
                        <span className="text-[10px] text-[#6E625D]">{conv.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6E625D] truncate mt-0.5">{conv.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1">
                          <Icon className="w-3 h-3" style={{ color: channelColors[conv.channel] }} />
                          <span className="text-[9px] text-[#6E625D]">{conv.channel}</span>
                        </div>
                        {conv.aiHandled && <AIBadge text="AI" />}
                        {conv.unread > 0 && (
                          <span className="ml-auto w-5 h-5 bg-[#E00026] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="card lg:col-span-2 flex flex-col h-[600px]">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-[#DDD3CB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#E00026] rounded-xl flex items-center justify-center text-white text-xs font-bold">
                    {mockConversations.find(c => c.id === activeChat)?.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#231815]">
                      {mockConversations.find(c => c.id === activeChat)?.member}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#6E625D]">
                        {mockConversations.find(c => c.id === activeChat)?.channel}
                      </span>
                      <AIBadge text="AI Handling" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'lead' || msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.role === 'ai'
                        ? 'bg-[#F5F0EA] text-[#231815] rounded-bl-none'
                        : msg.role === 'lead'
                        ? 'bg-[#DDD3CB] text-[#231815] rounded-br-none'
                        : 'bg-[#E00026] text-white rounded-br-none'
                    }`}>
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      <p className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-[#6E625D]'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-[#DDD3CB]">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl hover:bg-[#F5F0EA] text-[#6E625D]">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text" value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type or use voice..."
                    className="input-field flex-1 text-sm"
                  />
                  <button onClick={toggleListening}
                    className={`p-2 rounded-xl transition-all ${isListening ? 'bg-[#E00026] text-white animate-pulse-glow' : 'hover:bg-[#F5F0EA] text-[#6E625D]'}`}>
                    <Mic className="w-4 h-4" />
                  </button>
                  <button onClick={handleSend} className="p-2 rounded-xl bg-[#E00026] text-white">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-[#F5F0EA] rounded-2xl flex items-center justify-center mb-4">
                <Bot className="w-10 h-10 text-[#E00026]" />
              </div>
              <h3 className="text-lg font-bold text-[#231815] mb-2">AI Front Desk</h3>
              <p className="text-sm text-[#6E625D] max-w-md">
                Native AI receptionist handles calls, chats, WhatsApp, and SMS — 24/7. Select a conversation to start.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[
                  { icon: Phone, label: 'Voice', color: '#E00026' },
                  { icon: MessageCircle, label: 'WhatsApp', color: '#2E7D32' },
                  { icon: MessageSquareHeart, label: 'SMS', color: '#F9A825' },
                  { icon: MessageCircle, label: 'Chat', color: '#6E625D' },
                ].map((ch, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F5F0EA]">
                      <ch.icon className="w-5 h-5" style={{ color: ch.color }} />
                    </div>
                    <span className="text-[10px] text-[#6E625D]">{ch.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#E00026]" />
          <h3 className="text-sm font-bold text-[#231815]">AI Receptionist Capabilities</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Book Trials', desc: 'Schedules trial sessions, checks availability, sends confirmations' },
            { title: 'Answer Pricing', desc: 'Explains membership plans, handles objections, offers promos' },
            { title: 'Route Complex Queries', desc: 'Identifies when to escalate to human staff with full context' },
            { title: 'Shared Memory', desc: 'Remembers across channels — call Tuesday, text Friday = same person' },
          ].map((cap, i) => (
            <div key={i} className="p-4 bg-[#F5F0EA] rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-[#E00026] mb-2" />
              <p className="text-sm font-bold text-[#231815]">{cap.title}</p>
              <p className="text-[11px] text-[#6E625D] mt-1">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
