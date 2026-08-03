export const aiQueries = {
  churn: {
    question: "Which members are about to churn?",
    type: 'table',
    data: [
      { member: 'Sneha Reddy', risk: '85%', daysAway: 22, reason: 'No visits, declining engagement', recommendedAction: 'Free PT session' },
      { member: 'Neha Gupta', risk: '92%', daysAway: 29, reason: 'Payment failed + no visits', recommendedAction: 'Call + extend payment' },
      { member: 'Amit Patel', risk: '78%', daysAway: 16, reason: 'Never booked a class', recommendedAction: 'Invite to group class' },
    ],
    insight: '3 high-risk members identified. Proactive outreach can recover 68% of at-risk members within 48 hours. Estimated revenue at stake: ₹6,497/month.',
  },
  revenue: {
    question: "How is revenue trending?",
    type: 'kpi',
    data: {
      current: '₹18.35L',
      growth: '+12.5%',
      projection: '₹19.81L (projected next month)',
      topPlan: 'Elite (45% of revenue)',
      arpu: '₹2,143/member',
      cashflow: '₹7.15L net (revenue - expenses)',
    },
    insight: 'Revenue is on a 6-month growth streak. Elite members contribute 45% of revenue despite being 28% of members. Opportunity: convert 10 Premium members to Elite = +₹15,000/month.',
  },
  attendance: {
    question: "What's the attendance situation?",
    type: 'chart',
    data: {
      peakDay: 'Wednesday (168 check-ins)',
      lowDay: 'Sunday (64 check-ins)',
      peakHour: '5-7 PM',
      occupancy: '82% average',
      trend: 'Up 5% vs last month',
      noShows: '12 predicted for tomorrow 6AM',
    },
    insight: 'Sunday is severely underutilized at 38% of peak. Consider launching a "Weekend Warrior" program. Studio A is at 92% during peak — adding 7AM slot could capture 4 waitlisted members.',
  },
  leads: {
    question: "How are our leads performing?",
    type: 'table',
    data: {
      conversionRate: '34% (industry avg: 18%)',
      avgResponseTime: '31 seconds',
      topSource: 'Instagram (40% of leads)',
      costPerLead: '₹0 (organic + AI)',
      pipelineValue: '12 new leads this month',
    },
    insight: 'AI lead response at 31 seconds is crushing industry benchmarks. 40-60% of leads convert when contacted within 1 minute. Instagram is your best channel — consider boosting content there.',
  },
  classes: {
    question: "Which classes need help?",
    type: 'table',
    data: [
      { class: 'Evening Flow', occupancy: '40%', recommendation: 'Send push to yoga members', potentialRevenue: '+₹2,400/mo' },
      { class: 'Zumba Party', occupancy: '60%', recommendation: 'Dynamic off-peak pricing', potentialRevenue: '+₹3,600/mo' },
      { class: 'Power Yoga', occupancy: '60%', recommendation: 'Promote to beginners', potentialRevenue: '+₹2,100/mo' },
    ],
    insight: '3 classes are below 60% occupancy, leaving ₹8,100/month on the table. AI recommendations can recover 70% of this within 2 weeks.',
  },
  members: {
    question: "Give me the member health overview",
    type: 'kpi',
    data: {
      total: 856,
      active: 724,
      atRisk: 47,
      newThisMonth: 28,
      churnedThisMonth: 8,
      retentionRate: '84%',
      avgLifetime: '8.2 months',
      avgEngagementScore: 78,
    },
    insight: 'Member health is strong at 84% retention. The 47 at-risk members represent ₹70,500/month in potential lost revenue. AI has already auto-triggered outreach for 3 high-risk members today.',
  },
};

export const quickQueries = [
  { icon: '🔴', label: 'Churn Risk', query: 'churn' },
  { icon: '💰', label: 'Revenue', query: 'revenue' },
  { icon: '📊', label: 'Attendance', query: 'attendance' },
  { icon: '🎯', label: 'Leads', query: 'leads' },
  { icon: '🏋️', label: 'Classes', query: 'classes' },
  { icon: '👥', label: 'Members', query: 'members' },
];
