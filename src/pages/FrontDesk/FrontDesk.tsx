import { useState, useEffect, useRef } from 'react';
import { MessageSquareHeart, Phone, MessageCircle, Bot, Sparkles, Send, Mic, Paperclip, CheckCircle2, PhoneCall, Zap, ArrowRight, UserCheck, Volume2 } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import { mockConversations, Conversation as MockConv } from '../../data/mockData';

interface ChatMessage { role: 'ai' | 'user' | 'lead' | 'system'; text: string; time: string; }
interface Conv extends MockConv { status: 'Active' | 'Resolved' | 'Escalated'; }

export default function FrontDesk() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [allConvos, setAllConvos] = useState<Conv[]>(mockConversations.map(c => ({ ...c, status: 'Active' as const })));
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const channelIcons: Record<string, any> = { Voice: Phone, Chat: MessageCircle, WhatsApp: MessageCircle, SMS: MessageSquareHeart };
  const channelColors: Record<string, string> = { Voice: '#E00026', Chat: '#2E7D32', WhatsApp: '#2E7D32', SMS: '#F9A825' };

  const [convStepCounts, setConvStepCounts] = useState<Record<string, number>>({});

  const conversationScripts: Record<string, { ai: string; lead?: string }[]> = {
    'Pricing Inquiry': [
      { ai: "Welcome to IronForge! Our Premium plan is ₹2,499/month — that includes unlimited classes, full equipment access, and 2 personal training sessions per month. Our Elite plan at ₹3,999 adds priority booking, nutrition consultations, and 4 guest passes. Would you like more details on either plan?" },
      { ai: "The key differences: Elite gives you priority class booking (never get waitlisted), monthly nutritionist consultations, and 4 free guest passes so friends can join. Premium covers all the essentials — classes, equipment, 2 PT sessions. If you plan to come 4+ times a week, Elite is the better value. Which feels right for your goals?" },
      { ai: "For sure! Here's a quick comparison: If you come 4x/week, Elite is ₹250/visit with all the perks. Premium at 4x/week is ₹156/visit but fewer extras. Most members start with Premium and 30% upgrade to Elite within 3 months because of the priority booking for peak classes. Want me to set you up with a 7-day free trial so you can test both?" },
      { ai: "Awesome! I've set you up with a 7-day Elite trial — no credit card needed. You'll get: full gym access, 1 complimentary PT session with our head trainer, access to all classes including priority booking, and 2 guest passes. Your trial is confirmed — you'll receive a WhatsApp with a QR code for check-in. When would you like to start — tomorrow morning or evening?" },
      { ai: "Perfect! Your trial starts tomorrow at 8 AM. I've also booked you for a complimentary PT session at 9 AM with Raj Malhotra, our senior trainer. He'll do a fitness assessment and design a starter program for you. Just scan the QR code at the kiosk when you arrive. Welcome to IronForge! 💪🔥" },
      { ai: "Is there anything else I can help with? You can always reach me here 24/7 for bookings, questions, or class recommendations." },
    ],
    'Churn Recovery': [
      { ai: "Hey! 👋 We noticed you haven't been in for a little while — and honestly, the gym doesn't feel the same without you! We'd really love to welcome you back. As a thank you for your loyalty, I'd like to offer you a complimentary personal training session — completely free. I have slots tomorrow at 10 AM, 4 PM, or 7 PM. Which works for you?" },
      { ai: "Fantastic choice! Priya Sharma — our senior trainer specializing in functional training and flexibility — will be waiting for you at 4 PM tomorrow. She's reviewed your workout history and has prepared a custom session to get you back into your rhythm. You'll also get a complimentary protein shake from our café after the session! 🥤💪" },
      { ai: "Absolutely! Priya noted that you were making great progress on your squats and core strength before the break. She's designed the session to ease you back in — 30 minutes of guided strength work followed by 15 minutes of mobility and stretching. No pressure, just good vibes. Bring your usual gym gear and water bottle. We've got everything else covered!" },
      { ai: "You're all set! Here's a summary: 📅 Tomorrow, 4:00 PM • 👤 Priya Sharma (Studio A) • 🎁 Free PT session + protein shake • 📲 Reminder will be sent 2 hours before. And hey — we also added 3 extra days to your membership to make up for the missed time. Looking forward to seeing you back! 💪" },
      { ai: "That's the spirit! Remember — consistency beats intensity. Even 30 minutes, 3 times a week is enough to maintain and build. We're here to support you every step of the way. See you tomorrow at 4 PM! 🚀" },
      { ai: "Is there anything else you'd like to know? I can also recommend group classes that match your interests — or just leave you with the excitement for tomorrow's session!" },
    ],
    'Trial Booking': [
      { ai: "Welcome to IronForge! 🎉 I'm excited to have you try us out. Your 7-day free trial starts whenever you're ready — no credit card, no commitments. You get full access: all equipment, unlimited classes, and even 1 complimentary PT session. When would you like to come in? I have availability tomorrow at 7 AM, 10 AM, 2 PM, or 6 PM." },
      { ai: "10 AM is perfect! The gym is usually calm at that hour — you'll have plenty of space and equipment. Your orientation will take about 15 minutes: I'll show you the layout, explain the equipment zones, and set you up with our member app. Then you're free to work out and even join the 11 AM Power Yoga class if you're interested. Sound good?" },
      { ai: "Done! Here's your confirmation: 📅 Tomorrow, Aug 4, 10:00 AM • 📍 IronForge Main, Studio A entrance • 👤 Orientation by our team • 🧘 Optional: Power Yoga at 11 AM • 📲 QR check-in code sent to your phone. Just scan at the kiosk when you arrive and we'll take care of everything! Anything else you'd like to know?" },
      { ai: "Great question! Wear comfortable workout clothes and bring a water bottle. We provide towels, lockers (free), and toiletries. If you want to try the Power Yoga class, you don't need a mat — we have premium ones. And yes, we have a smoothie bar if you want a post-workout treat! 🥤" },
      { ai: "You're all set! I've also pre-loaded 3 class recommendations based on general fitness goals: Power Yoga (11 AM daily), HIIT Blast (6 AM), and Spin Cycle (8 AM). You can book these through the app once you're checked in. Welcome aboard — see you tomorrow at 10 AM! 🔥" },
      { ai: "One last thing — if you love your trial (and I think you will!), we have a special offer for trial members: 20% off your first 3 months on any plan. No pressure at all — just mention this when you're ready. Have a great evening and see you tomorrow! 👋"},
    ],
    'Payment Recovery': [
      { ai: "Hi! I noticed your last payment of ₹1,499 didn't go through — this happens sometimes with bank processing. No worries at all! I'm here to help you sort it out. Would you like to update your payment method now, or would a few extra days help? We can offer a 7-day extension with no late fees." },
      { ai: "Absolutely, I completely understand! I've applied a 7-day extension — your new due date is Aug 12. No late fees, no penalties, just breathing room. In the meantime, you can update your payment method anytime through the member app under Billing → Payment Methods. It takes about 30 seconds." },
      { ai: "Of course! Here's exactly how: Open the IronForge app → tap 'Profile' → 'Billing' → 'Update Payment Method'. You can add a new card, UPI, or net banking. It's encrypted and secure. If you prefer, I can also send you a payment link via WhatsApp right now — just say 'send link' and I'll do it instantly." },
      { ai: "Payment link sent! 📲 Check your WhatsApp. It's a one-click secure payment page — enter your UPI or card details and you're done. The link is valid for 48 hours. And just so you know, your membership and all benefits remain active during the extension period. We appreciate you being a member! 🙏" },
      { ai: "You're all caught up! ✅ Payment confirmed. Your membership is active until Sep 12. Thank you for being part of IronForge — we value you as a member. Is there anything else I can help with today? Maybe book a class or check your attendance streak?" },
      { ai: "Always happy to help! Remember, I'm here 24/7 for anything — bookings, questions, or just a quick chat. Have a great day! 💪" },
    ],
    'Corporate Inquiry': [
      { ai: "Thank you for considering IronForge for your corporate wellness program! Our plans start at ₹1,999/member/month for groups of 10 or more. This includes: dedicated onboarding sessions, quarterly wellness reports, a branded member portal, and priority class booking. How many employees are you looking to enroll, and what's your primary wellness goal?" },
      { ai: "For 25 members, I can offer a discounted rate of ₹1,799/member/month. Here's what the package includes: 2 dedicated onboarding sessions (one for employees, one for HR), monthly wellness workshops (topics like desk ergonomics, stress management, nutrition), quarterly utilization and engagement reports, priority booking for up to 5 classes/week, and a co-branded welcome kit for each employee. Would you like me to break down the ROI?" },
      { ai: "Happy to! At ₹1,799/member for 25 people = ₹44,975/month. Studies show corporate wellness programs reduce sick days by 25% and improve productivity by 12%. For a team of 25, that's roughly 150 fewer sick days per year — which at an average salary of ₹50K/month translates to ₹3.12L in recovered productivity. The program literally pays for itself 7x over. Plus, it's a powerful retention tool — 87% of employees say wellness benefits influence their decision to stay." },
      { ai: "Absolutely — flexibility is key for corporate programs. We can customize: choose which locations (Mumbai, Pune, Bangalore, Kolkata), select class types (mix of yoga, HIIT, strength for different preferences), set usage caps (unlimited or tiered), and add optional quarterly health camps at your office. Everything is manageable through a corporate dashboard your HR team will have access to." },
      { ai: "Perfect! I've prepared a formal proposal for your review. It includes: detailed pricing for 25 members, program timeline (onboarding → launch → monthly check-ins), sample quarterly report, and testimonials from our existing corporate clients. Should I email it to you or would you prefer a 15-minute call with our corporate team to walk through it?" },
      { ai: "Great! The proposal has been sent to your email. Our corporate team lead, Ananya, will follow up within 24 hours to schedule a brief call. In the meantime, feel free to browse our facility virtually — I can send you a video tour link if you'd like. Welcome to IronForge Corporate! 🤝" },
      { ai: "You're all set! I've noted your preference for a call. Ananya will reach out tomorrow between 10 AM-12 PM. If you have any questions before then, just reply here. Looking forward to welcoming your team to IronForge! 💼💪" },
    ],
  };

  const getResponse = (topic: string, step: number): string => {
    const script = conversationScripts[topic];
    if (!script) return "I'm IronForge AI assistant, your 24/7 front desk. I can help with memberships, trial bookings, class schedules, payments, and more. What can I do for you today?";
    const idx = Math.min(step, script.length - 1);
    return script[idx].ai;
  };

  const getUserIntent = (text: string, topic: string): string => {
    const lower = text.toLowerCase();
    if (topic === 'Pricing Inquiry') {
      if (lower.includes('trial') || lower.includes('try')) return 'trial';
      if (lower.includes('elite') || lower.includes('premium')) return 'compare';
      if (lower.includes('compare') || lower.includes('difference')) return 'compare';
      if (lower.includes('start') || lower.includes('join') || lower.includes('begin')) return 'start';
      if (lower.includes('yes') || lower.includes('sure') || lower.includes('okay') || lower.includes('ok')) return 'yes';
      return 'general';
    }
    if (topic === 'Churn Recovery') {
      if (lower.includes('book') || lower.includes('10') || lower.includes('4') || lower.includes('7')) return 'book';
      if (lower.includes('what') || lower.includes('details') || lower.includes('tell')) return 'details';
      if (lower.includes('yes') || lower.includes('sure') || lower.includes('great') || lower.includes('awesome')) return 'yes';
      return 'general';
    }
    if (topic === 'Trial Booking') {
      if (lower.includes('tomorrow') || lower.includes('time') || lower.includes('10') || lower.includes('6')) return 'time';
      if (lower.includes('what') || lower.includes('bring') || lower.includes('wear') || lower.includes('need')) return 'prep';
      if (lower.includes('yes') || lower.includes('great') || lower.includes('perfect') || lower.includes('sounds')) return 'yes';
      return 'general';
    }
    if (topic === 'Payment Recovery') {
      if (lower.includes('extend') || lower.includes('extension') || lower.includes('more time')) return 'extend';
      if (lower.includes('update') || lower.includes('change') || lower.includes('method') || lower.includes('how')) return 'update';
      if (lower.includes('send') || lower.includes('link') || lower.includes('whatsapp')) return 'link';
      if (lower.includes('yes') || lower.includes('done') || lower.includes('paid')) return 'yes';
      return 'general';
    }
    if (topic === 'Corporate Inquiry') {
      if (lower.includes('roi') || lower.includes('cost') || lower.includes('benefit') || lower.includes('value')) return 'roi';
      if (lower.includes('custom') || lower.includes('flexible') || lower.includes('location')) return 'custom';
      if (lower.includes('proposal') || lower.includes('email') || lower.includes('send')) return 'proposal';
      if (lower.includes('yes') || lower.includes('great') || lower.includes('interested')) return 'yes';
      if (lower.match(/\d+/)) return 'numbers';
      return 'general';
    }
    if (lower.includes('no') || lower.includes('stop') || lower.includes('thanks') || lower.includes('bye')) return 'close';
    return 'general';
  };

  const startChat = (conv: Conv) => {
    setActiveChat(conv.id);
    const currentStep = convStepCounts[conv.id] || 0;
    setMessages([
      { role: 'lead', text: conv.lastMessage, time: conv.time },
      { role: 'ai', text: getResponse(conv.topic, currentStep), time: 'Just now' },
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || !activeChat) return;
    const conv = allConvos.find(c => c.id === activeChat);
    if (!conv) return;

    setMessages(prev => [...prev, { role: 'user', text: input, time: 'Now' }]);
    const userText = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const currentStep = (convStepCounts[conv.id] || 0) + 1;
      const newCounts = { ...convStepCounts, [conv.id]: currentStep };
      setConvStepCounts(newCounts);

      const intent = getUserIntent(userText, conv.topic);
      let aiText: string;

      if (intent === 'close' || currentStep >= (conversationScripts[conv.topic]?.length || 6) - 1) {
        aiText = conversationScripts[conv.topic]?.[conversationScripts[conv.topic].length - 1]?.ai ||
          "Thank you for chatting! I'm here 24/7 if you need anything else. Have a great day! 👋";
        setAllConvos(prev => prev.map(c => c.id === activeChat ? { ...c, status: 'Resolved' as const, lastMessage: userText, time: 'Just now', unread: 0, sentiment: 'Positive' as const } : c));
      } else if (intent === 'yes' && currentStep < 3) {
        // Skip ahead when user agrees
        aiText = conversationScripts[conv.topic]?.[3]?.ai || getResponse(conv.topic, currentStep);
        setConvStepCounts({ ...newCounts, [conv.id]: 3 });
      } else {
        aiText = getResponse(conv.topic, currentStep);
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText, time: 'Just now' }]);
      setAllConvos(prev => prev.map(c => c.id === activeChat ? { ...c, lastMessage: userText, time: 'Just now', unread: 0 } : c));

      if (currentStep >= (conversationScripts[conv.topic]?.length || 6) - 1) {
        setTimeout(() => {
          setAllConvos(prev => prev.map(c => c.id === activeChat ? { ...c, status: 'Resolved' as const } : c));
        }, 2000);
      }
    }, 1200);
  };

  const toggleListening = () => {
    setIsListening(true);
    setTimeout(() => { setIsListening(false); setInput("I'd like to book a trial session for tomorrow morning"); }, 2000);
  };

  const simulateIncomingCall = () => {
    setIncomingCall(true);
    setTimeout(() => {
      setIncomingCall(false);
      const newId = `CONV_NEW_${Date.now()}`;
      const newConv: Conv = {
        id: newId, member: 'Rahul Sharma (New Lead)', avatar: 'RS', channel: 'Voice',
        lastMessage: '📞 Incoming call answered by AI in 2.3s', time: 'Just now', unread: 1,
        aiHandled: true, sentiment: 'Neutral', topic: 'Trial Booking', status: 'Active',
      } as Conv;
      setAllConvos(prev => [newConv, ...prev]);
      setActiveChat(newId);
      setMessages([
        { role: 'system', text: '📞 Incoming call from +91 98765 12345 • AI answered in 2.3s', time: 'Just now' },
        { role: 'lead', text: "Hi, I'm interested in joining your gym. Do you have a trial?", time: 'Just now' },
        { role: 'ai', text: "Welcome to IronForge! Yes — 7-day free trial, no credit card needed. When works for you? Slots tomorrow: 7 AM, 10 AM, or 6 PM.", time: 'Just now' },
      ]);
    }, 2500);
  };

  const resolveChat = (id: string) => setAllConvos(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' as const, unread: 0 } : c));

  const n = allConvos.length + (incomingCall ? 1 : 0);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>AI Front Desk</h2><p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Native AI receptionist — voice, chat, WhatsApp, SMS — 24/7, shared memory</p></div>
        <div className="flex items-center gap-3">
          <button onClick={simulateIncomingCall} disabled={incomingCall} className="btn-primary text-xs flex items-center gap-2 disabled:opacity-50"><PhoneCall className="w-3.5 h-3.5" /> Simulate Incoming Call</button>
          <AIBadge text="24/7 Active" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Conversations Today', value: n, icon: MessageSquareHeart, color: '#E00026' },
          { label: 'AI-Handled', value: `${allConvos.filter(c => c.aiHandled).length}/${n}`, icon: Bot, color: '#2E7D32' },
          { label: 'Avg Response', value: '2.3s', icon: Zap, color: '#F9A825' },
          { label: 'Resolved', value: allConvos.filter(c => c.status === 'Resolved').length, icon: CheckCircle2, color: '#2E7D32' },
        ].map((s, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}><s.icon className="w-5 h-5" style={{ color: s.color }} /></div>
            <div><p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{s.value}</p><p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{s.label}</p></div>
          </div>
        ))}
      </div>

      {incomingCall && (
        <div className="card p-5 border-l-[3px] border-l-[#E00026] animate-pulse-glow bg-[#F7E9D8]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E00026] rounded-2xl flex items-center justify-center animate-bounce"><PhoneCall className="w-6 h-6 text-white" /></div>
              <div><p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>📞 Incoming Call</p><p className="text-xs" style={{ color: 'var(--text-secondary)' }}>+91 98765 12345 • Mumbai • New Lead • AI answering in 2.3s...</p></div>
            </div>
            <Volume2 className="w-5 h-5 text-[#E00026] animate-pulse" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 380px)' }}>
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}><div className="flex items-center gap-2"><Bot className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Active Conversations</h3></div><AIBadge /></div>
          <div className="divide-y overflow-y-auto flex-1" style={{ borderColor: 'var(--border)' }}>
            {allConvos.map(conv => {
              const Icon = channelIcons[conv.channel] || MessageCircle;
              const statusMap: Record<string, string> = { Active: 'bg-[#E00026]/10 text-[#E00026]', Resolved: 'bg-[#2E7D32]/10 text-[#2E7D32]', Escalated: 'bg-[#F9A825]/10 text-[#F9A825]' };
              return (
                <div key={conv.id} onClick={() => startChat(conv)}
                  className={`p-4 cursor-pointer transition-colors ${activeChat === conv.id ? 'border-l-[3px] border-l-[#E00026]' : ''}`}
                  style={{ background: activeChat === conv.id ? 'var(--highlight)' : 'transparent' }}
                  onMouseEnter={e => { if (activeChat !== conv.id) (e.currentTarget as HTMLElement).style.background = 'var(--hover-bg)' }}
                  onMouseLeave={e => { if (activeChat !== conv.id) (e.currentTarget as HTMLElement).style.background = '' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: channelColors[conv.channel] }}>{conv.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{conv.member}</p><span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{conv.time}</span></div>
                      <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{conv.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Icon className="w-3 h-3" style={{ color: channelColors[conv.channel] }} /><span className="text-[9px]" style={{ color: 'var(--text-secondary)' }}>{conv.channel}</span>
                        {conv.aiHandled && <AIBadge text="AI" />}
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${statusMap[conv.status]}`}>{conv.status}</span>
                        {conv.unread > 0 && <span className="ml-auto w-5 h-5 bg-[#E00026] text-white rounded-full flex items-center justify-center text-[9px] font-bold">{conv.unread}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card lg:col-span-2 flex flex-col" style={{ maxHeight: 'calc(100vh - 380px)' }}>
          {activeChat ? (
            <>
              <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#E00026] rounded-xl flex items-center justify-center text-white text-xs font-bold">{allConvos.find(c => c.id === activeChat)?.avatar || '?'}</div>
                  <div><p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{allConvos.find(c => c.id === activeChat)?.member}</p>
                    <div className="flex items-center gap-2"><span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{allConvos.find(c => c.id === activeChat)?.channel}</span><AIBadge text="AI Handling" />{allConvos.find(c => c.id === activeChat)?.status === 'Resolved' && <span className="text-[10px] font-semibold text-[#2E7D32] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Resolved</span>}</div>
                  </div>
                </div>
                {allConvos.find(c => c.id === activeChat)?.status !== 'Resolved' && (
                  <button onClick={() => resolveChat(activeChat!)} className="btn-ghost text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#2E7D32]" /> Mark Resolved</button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'lead' || msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl ${msg.role === 'ai' ? 'rounded-bl-none' : msg.role === 'lead' ? 'rounded-br-none' : msg.role === 'system' ? 'rounded-lg' : 'bg-[#E00026] text-white rounded-br-none'}`}
                      style={msg.role === 'ai' ? { background: 'var(--muted-bg)', color: 'var(--text-primary)' } : msg.role === 'lead' ? { background: 'var(--border)', color: 'var(--text-primary)' } : msg.role === 'system' ? { background: '#F7E9D8', color: '#E00026' } : {}}>
                      <p className="text-xs leading-relaxed">{msg.text}</p><p className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-white/60' : ''}`} style={msg.role !== 'user' ? { color: 'var(--text-secondary)' } : {}}>{msg.time}</p>
                    </div>
                  </div>
                ))}
                {isTyping && <div className="flex justify-start animate-fadeIn"><div className="p-4 rounded-2xl rounded-bl-none" style={{ background: 'var(--muted-bg)' }}><div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-secondary)', animationDelay: `${i*0.15}s` }} />)}</div></div></div>}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl" style={{ color: 'var(--text-secondary)' }}><Paperclip className="w-4 h-4" /></button>
                  <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message or use voice..." className="input-field flex-1 text-sm" />
                  <button onClick={toggleListening} className={`p-2 rounded-xl transition-all ${isListening ? 'bg-[#E00026] text-white animate-pulse-glow' : ''}`} style={!isListening ? { color: 'var(--text-secondary)' } : {}}><Mic className="w-4 h-4" /></button>
                  <button onClick={handleSend} className="p-2 rounded-xl bg-[#E00026] text-white"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--muted-bg)' }}><Bot className="w-10 h-10 text-[#E00026]" /></div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>AI Front Desk</h3>
              <p className="text-sm max-w-md mb-2" style={{ color: 'var(--text-secondary)' }}>AI handles calls, chats, WhatsApp, and SMS — 24/7 with shared memory.</p>
              <button onClick={simulateIncomingCall} disabled={incomingCall} className="btn-primary text-sm flex items-center gap-2 mb-2"><PhoneCall className="w-4 h-4" /> Simulate Incoming Call</button>
              <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Or select a conversation from the list →</p>
              <div className="flex items-center gap-3 mt-6">
                {[{ icon: Phone, label: 'Voice', color: '#E00026' },{ icon: MessageCircle, label: 'WhatsApp', color: '#2E7D32' },{ icon: MessageSquareHeart, label: 'SMS', color: '#F9A825' },{ icon: MessageCircle, label: 'Chat', color: '#6E625D' }].map((ch,i) => (
                  <div key={i} className="flex flex-col items-center gap-1"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--muted-bg)' }}><ch.icon className="w-5 h-5" style={{ color: ch.color }} /></div><span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{ch.label}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4"><Sparkles className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Receptionist — Demo Guide</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { icon: PhoneCall, title: '1. Answer Calls', desc: 'AI picks up in under 3 sec, 24/7. No missed leads ever.' },
            { icon: Bot, title: '2. Understand Intent', desc: 'Identifies pricing, trial, complaint, corporate queries.' },
            { icon: ArrowRight, title: '3. Take Action', desc: 'Books trials, answers FAQs, sends confirmations autonomously.' },
            { icon: UserCheck, title: '4. Escalate if Needed', desc: 'Routes complex issues to human staff with full context.' },
            { icon: CheckCircle2, title: '5. Close & Log', desc: 'Marks resolved. Shared memory across all channels.' },
          ].map((s,i) => (
            <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'var(--muted-bg)' }}><s.icon className="w-6 h-6 text-[#E00026] mx-auto mb-2" /><p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{s.title}</p><p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
