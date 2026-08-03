export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  membershipType: 'Basic' | 'Premium' | 'Elite' | 'Family' | 'Corporate';
  status: 'Active' | 'At-Risk' | 'Inactive' | 'PastDue';
  joinDate: string;
  lastVisit: string;
  churnScore: number;
  attendanceStreak: number;
  totalVisits: number;
  nextBilling: string;
  monthlySpend: number;
  lifetimeValue: number;
  goals: string[];
  recentWorkouts: number;
  engagementScore: number;
  classes: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Website' | 'Referral' | 'Instagram' | 'Google' | 'Walk-in';
  interest: string;
  status: 'New' | 'Contacted' | 'Trial Scheduled' | 'Converted' | 'Lost';
  score: number;
  createdAt: string;
  lastContact: string;
  responseTime: string;
  notes: string;
  aiFollowUps: number;
}

export interface Class {
  id: string;
  name: string;
  trainer: string;
  trainerAvatar: string;
  time: string;
  duration: number;
  capacity: number;
  booked: number;
  waitlisted: number;
  room: string;
  type: string;
  fillRate: number;
  aiRecommendation?: string;
}

export interface ChurnAlert {
  id: string;
  memberId: string;
  member: string;
  avatar: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  churnScore: number;
  reason: string;
  daysSinceLastVisit: number;
  missedPayments: number;
  recommendedAction: string;
  autoActionTaken: boolean;
  staffApproval: 'Pending' | 'Approved' | 'Declined';
  outreachChannel: string;
}

export interface BillingRecord {
  id: string;
  member: string;
  avatar: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  plan: string;
  method: string;
}

export interface Conversation {
  id: string;
  member: string;
  avatar: string;
  channel: 'Voice' | 'Chat' | 'WhatsApp' | 'SMS';
  lastMessage: string;
  time: string;
  unread: number;
  aiHandled: boolean;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  topic: string;
}

export const mockMembers: Member[] = [
  { id: 'M001', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 98765 43210', avatar: 'RK', membershipType: 'Premium', status: 'Active', joinDate: '2025-03-15', lastVisit: '2026-08-03', churnScore: 12, attendanceStreak: 24, totalVisits: 298, nextBilling: '2026-08-15', monthlySpend: 2499, lifetimeValue: 37485, goals: ['Weight Loss', 'Muscle Building'], recentWorkouts: 5, engagementScore: 87, classes: 45 },
  { id: 'M002', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', avatar: 'PS', membershipType: 'Elite', status: 'Active', joinDate: '2024-11-01', lastVisit: '2026-08-02', churnScore: 8, attendanceStreak: 18, totalVisits: 412, nextBilling: '2026-08-10', monthlySpend: 3999, lifetimeValue: 79980, goals: ['Endurance', 'Yoga'], recentWorkouts: 6, engagementScore: 92, classes: 82 },
  { id: 'M003', name: 'Amit Patel', email: 'amit@email.com', phone: '+91 76543 21098', avatar: 'AP', membershipType: 'Basic', status: 'At-Risk', joinDate: '2025-06-20', lastVisit: '2026-07-18', churnScore: 78, attendanceStreak: 0, totalVisits: 67, nextBilling: '2026-08-05', monthlySpend: 1499, lifetimeValue: 19487, goals: ['General Fitness'], recentWorkouts: 1, engagementScore: 28, classes: 8 },
  { id: 'M004', name: 'Sneha Reddy', email: 'sneha@email.com', phone: '+91 65432 10987', avatar: 'SR', membershipType: 'Premium', status: 'At-Risk', joinDate: '2025-01-10', lastVisit: '2026-07-12', churnScore: 85, attendanceStreak: 0, totalVisits: 178, nextBilling: '2026-08-08', monthlySpend: 2499, lifetimeValue: 44982, goals: ['Weight Loss', 'Cardio'], recentWorkouts: 0, engagementScore: 19, classes: 15 },
  { id: 'M005', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', avatar: 'VS', membershipType: 'Elite', status: 'Active', joinDate: '2024-05-01', lastVisit: '2026-08-03', churnScore: 5, attendanceStreak: 45, totalVisits: 620, nextBilling: '2026-08-20', monthlySpend: 3999, lifetimeValue: 107973, goals: ['Muscle Building', 'Strength'], recentWorkouts: 7, engagementScore: 96, classes: 110 },
  { id: 'M006', name: 'Neha Gupta', email: 'neha@email.com', phone: '+91 43210 98765', avatar: 'NG', membershipType: 'Basic', status: 'PastDue', joinDate: '2025-09-01', lastVisit: '2026-07-05', churnScore: 92, attendanceStreak: 0, totalVisits: 42, nextBilling: '2026-06-25', monthlySpend: 1499, lifetimeValue: 13491, goals: ['Yoga', 'Flexibility'], recentWorkouts: 0, engagementScore: 11, classes: 4 },
  { id: 'M007', name: 'Rohan Desai', email: 'rohan@email.com', phone: '+91 32109 87654', avatar: 'RD', membershipType: 'Premium', status: 'Active', joinDate: '2025-07-15', lastVisit: '2026-08-02', churnScore: 18, attendanceStreak: 12, totalVisits: 215, nextBilling: '2026-08-18', monthlySpend: 2499, lifetimeValue: 32487, goals: ['Weight Loss', 'HIIT'], recentWorkouts: 4, engagementScore: 76, classes: 32 },
  { id: 'M008', name: 'Ananya Iyer', email: 'ananya@email.com', phone: '+91 21098 76543', avatar: 'AI', membershipType: 'Family', status: 'Active', joinDate: '2025-02-01', lastVisit: '2026-08-01', churnScore: 22, attendanceStreak: 8, totalVisits: 340, nextBilling: '2026-08-12', monthlySpend: 5499, lifetimeValue: 98982, goals: ['Pilates', 'Strength'], recentWorkouts: 3, engagementScore: 81, classes: 55 },
];

export const mockLeads: Lead[] = [
  { id: 'L001', name: 'Karan Mehta', email: 'karan@email.com', phone: '+91 99887 76655', source: 'Instagram', interest: 'Weight Loss Program', status: 'New', score: 85, createdAt: '2026-08-03T09:15:00', lastContact: '2026-08-03T09:15:23', responseTime: '23s', notes: 'Interested in personal training', aiFollowUps: 1 },
  { id: 'L002', name: 'Divya Kapoor', email: 'divya@email.com', phone: '+91 88776 65544', source: 'Google', interest: 'Premium Membership', status: 'Trial Scheduled', score: 92, createdAt: '2026-08-02T14:30:00', lastContact: '2026-08-02T14:30:45', responseTime: '45s', notes: 'Trial confirmed for Aug 5', aiFollowUps: 3 },
  { id: 'L003', name: 'Arjun Nair', email: 'arjun@email.com', phone: '+91 77665 54433', source: 'Referral', interest: 'Corporate Plan', status: 'Contacted', score: 78, createdAt: '2026-08-02T11:00:00', lastContact: '2026-08-02T11:01:12', responseTime: '72s', notes: 'Referred by Vikram Singh', aiFollowUps: 2 },
  { id: 'L004', name: 'Meera Joshi', email: 'meera@email.com', phone: '+91 66554 43322', source: 'Website', interest: 'Yoga Classes', status: 'New', score: 65, createdAt: '2026-08-03T08:00:00', lastContact: '2026-08-03T08:00:38', responseTime: '38s', notes: 'Looking for morning batch', aiFollowUps: 1 },
  { id: 'L005', name: 'Sahil Verma', email: 'sahil@email.com', phone: '+91 55443 32211', source: 'Walk-in', interest: 'Free Trial', status: 'Converted', score: 95, createdAt: '2026-08-01T16:00:00', lastContact: '2026-08-01T16:00:50', responseTime: '50s', notes: 'Signed up Elite membership', aiFollowUps: 4 },
];

export const mockClasses: Class[] = [
  { id: 'C001', name: 'HIIT Blast', trainer: 'Mike Chen', trainerAvatar: 'MC', time: '06:00 AM', duration: 45, capacity: 25, booked: 23, waitlisted: 4, room: 'Studio A', type: 'HIIT', fillRate: 92, aiRecommendation: 'Add second 7AM slot — 4 waitlisted, 92% fill' },
  { id: 'C002', name: 'Power Yoga', trainer: 'Ananya Iyer', trainerAvatar: 'AI', time: '07:00 AM', duration: 60, capacity: 20, booked: 12, waitlisted: 0, room: 'Studio B', type: 'Yoga', fillRate: 60, aiRecommendation: 'Promote to beginners — 40% capacity open' },
  { id: 'C003', name: 'Spin Cycle', trainer: 'Raj Malhotra', trainerAvatar: 'RM', time: '08:00 AM', duration: 45, capacity: 30, booked: 30, waitlisted: 6, room: 'Cycle Studio', type: 'Cardio', fillRate: 100, aiRecommendation: 'Over capacity — consider adding bikes' },
  { id: 'C004', name: 'Strength Foundations', trainer: 'Vikram Singh', trainerAvatar: 'VS', time: '09:00 AM', duration: 60, capacity: 20, booked: 15, waitlisted: 0, room: 'Weight Room', type: 'Strength', fillRate: 75 },
  { id: 'C005', name: 'Zumba Party', trainer: 'Priya Sharma', trainerAvatar: 'PS', time: '10:00 AM', duration: 55, capacity: 30, booked: 18, waitlisted: 0, room: 'Studio A', type: 'Dance', fillRate: 60, aiRecommendation: 'Offer dynamic pricing for off-peak slots' },
  { id: 'C006', name: 'CrossFit WOD', trainer: 'Jake Williams', trainerAvatar: 'JW', time: '05:00 PM', duration: 60, capacity: 25, booked: 25, waitlisted: 3, room: 'Functional Zone', type: 'CrossFit', fillRate: 100 },
  { id: 'C007', name: 'Evening Flow', trainer: 'Sneha Reddy', trainerAvatar: 'SR', time: '06:00 PM', duration: 50, capacity: 20, booked: 8, waitlisted: 0, room: 'Studio B', type: 'Yoga', fillRate: 40, aiRecommendation: 'Send push notification to yoga-interested members' },
  { id: 'C008', name: 'Boxing Circuit', trainer: 'Arjun Nair', trainerAvatar: 'AN', time: '07:00 PM', duration: 45, capacity: 20, booked: 20, waitlisted: 5, room: 'Boxing Ring', type: 'Combat', fillRate: 100 },
];

export const mockChurnAlerts: ChurnAlert[] = [
  { id: 'CA001', memberId: 'M004', member: 'Sneha Reddy', avatar: 'SR', riskLevel: 'High', churnScore: 85, reason: 'No visits in 22 days, declining engagement', daysSinceLastVisit: 22, missedPayments: 0, recommendedAction: 'Send personalized comeback offer — 1 free PT session', autoActionTaken: true, staffApproval: 'Pending', outreachChannel: 'SMS + Email' },
  { id: 'CA002', memberId: 'M006', member: 'Neha Gupta', avatar: 'NG', riskLevel: 'High', churnScore: 92, reason: 'Payment failed + 29 days no visit', daysSinceLastVisit: 29, missedPayments: 1, recommendedAction: 'Call member + offer payment extension', autoActionTaken: true, staffApproval: 'Pending', outreachChannel: 'AI Voice Call' },
  { id: 'CA003', memberId: 'M003', member: 'Amit Patel', avatar: 'AP', riskLevel: 'High', churnScore: 78, reason: '16 days no visit, never booked a class', daysSinceLastVisit: 16, missedPayments: 0, recommendedAction: 'Invite to complimentary group class', autoActionTaken: true, staffApproval: 'Approved', outreachChannel: 'WhatsApp' },
  { id: 'CA004', memberId: 'M008', member: 'Ananya Iyer', avatar: 'AI', riskLevel: 'Medium', churnScore: 22, reason: 'Slight drop in weekly attendance', daysSinceLastVisit: 2, missedPayments: 0, recommendedAction: 'Send motivational check-in message', autoActionTaken: false, staffApproval: 'Pending', outreachChannel: 'SMS' },
  { id: 'CA005', memberId: 'M001', member: 'Rajesh Kumar', avatar: 'RK', riskLevel: 'Low', churnScore: 12, reason: 'Minor engagement dip detected', daysSinceLastVisit: 0, missedPayments: 0, recommendedAction: 'Celebrate 24-day streak milestone', autoActionTaken: false, staffApproval: 'Pending', outreachChannel: 'In-App' },
];

export const mockBilling: BillingRecord[] = [
  { id: 'B001', member: 'Rajesh Kumar', avatar: 'RK', amount: 2499, status: 'Paid', date: '2026-08-01', plan: 'Premium Monthly', method: 'UPI' },
  { id: 'B002', member: 'Priya Sharma', avatar: 'PS', amount: 3999, status: 'Paid', date: '2026-08-01', plan: 'Elite Monthly', method: 'Credit Card' },
  { id: 'B003', member: 'Amit Patel', avatar: 'AP', amount: 1499, status: 'Pending', date: '2026-08-05', plan: 'Basic Monthly', method: 'UPI' },
  { id: 'B004', member: 'Sneha Reddy', avatar: 'SR', amount: 2499, status: 'Pending', date: '2026-08-08', plan: 'Premium Monthly', method: 'Credit Card' },
  { id: 'B005', member: 'Neha Gupta', avatar: 'NG', amount: 1499, status: 'Failed', date: '2026-07-25', plan: 'Basic Monthly', method: 'UPI' },
  { id: 'B006', member: 'Vikram Singh', avatar: 'VS', amount: 3999, status: 'Paid', date: '2026-08-02', plan: 'Elite Annual', method: 'Bank Transfer' },
  { id: 'B007', member: 'Rohan Desai', avatar: 'RD', amount: 2499, status: 'Pending', date: '2026-08-18', plan: 'Premium Monthly', method: 'UPI' },
  { id: 'B008', member: 'Ananya Iyer', avatar: 'AI', amount: 5499, status: 'Paid', date: '2026-08-01', plan: 'Family Monthly', method: 'Credit Card' },
];

export const mockConversations: Conversation[] = [
  { id: 'CONV001', member: 'Karan Mehta (Lead)', avatar: 'KM', channel: 'Chat', lastMessage: 'What are your personal training rates?', time: '2m ago', unread: 2, aiHandled: true, sentiment: 'Positive', topic: 'Pricing Inquiry' },
  { id: 'CONV002', member: 'Sneha Reddy', avatar: 'SR', channel: 'WhatsApp', lastMessage: 'I got the free PT session offer. Can I book for...', time: '15m ago', unread: 1, aiHandled: true, sentiment: 'Positive', topic: 'Churn Recovery' },
  { id: 'CONV003', member: 'Divya Kapoor (Lead)', avatar: 'DK', channel: 'Voice', lastMessage: 'AI called and confirmed trial for Aug 5 at 10AM', time: '1h ago', unread: 0, aiHandled: true, sentiment: 'Positive', topic: 'Trial Booking' },
  { id: 'CONV004', member: 'Neha Gupta', avatar: 'NG', channel: 'Voice', lastMessage: 'AI attempted outreach call — no answer', time: '2h ago', unread: 0, aiHandled: true, sentiment: 'Neutral', topic: 'Payment Recovery' },
  { id: 'CONV005', member: 'Arjun Nair (Lead)', avatar: 'AN', channel: 'SMS', lastMessage: 'Yes, I\'d like to know about corporate pricing', time: '3h ago', unread: 1, aiHandled: true, sentiment: 'Positive', topic: 'Corporate Inquiry' },
];

export const kpiData = {
  totalMembers: 856,
  activeMembers: 724,
  atRiskMembers: 47,
  monthlyRevenue: 1834500,
  revenueGrowth: 12.5,
  avgChurnScore: 18,
  newLeadsToday: 12,
  leadConversionRate: 34,
  classOccupancy: 82,
  avgResponseTime: '31s',
  memberRetention: 84,
};

export const attendanceTrend = [
  { day: 'Mon', checkins: 142, projected: 145 },
  { day: 'Tue', checkins: 156, projected: 160 },
  { day: 'Wed', checkins: 168, projected: 170 },
  { day: 'Thu', checkins: 148, projected: 155 },
  { day: 'Fri', checkins: 132, projected: 140 },
  { day: 'Sat', checkins: 98, projected: 105 },
  { day: 'Sun', checkins: 64, projected: 70 },
];

export const revenueData = [
  { month: 'Jan', revenue: 1550000, expenses: 980000 },
  { month: 'Feb', revenue: 1620000, expenses: 1020000 },
  { month: 'Mar', revenue: 1580000, expenses: 990000 },
  { month: 'Apr', revenue: 1710000, expenses: 1050000 },
  { month: 'May', revenue: 1690000, expenses: 1030000 },
  { month: 'Jun', revenue: 1780000, expenses: 1080000 },
  { month: 'Jul', revenue: 1800000, expenses: 1100000 },
  { month: 'Aug', revenue: 1834500, expenses: 1120000 },
];

export const churnRiskDistribution = [
  { level: 'Low (0-25)', count: 580, color: '#2E7D32' },
  { level: 'Medium (26-60)', count: 185, color: '#F9A825' },
  { level: 'High (61-100)', count: 47, color: '#C62828' },
];

export const memberGrowth = [
  { month: 'Jan', total: 720, new: 45, churned: 18 },
  { month: 'Feb', total: 738, new: 52, churned: 16 },
  { month: 'Mar', total: 758, new: 48, churned: 14 },
  { month: 'Apr', total: 790, new: 55, churned: 12 },
  { month: 'May', total: 810, new: 42, churned: 15 },
  { month: 'Jun', total: 835, new: 50, churned: 13 },
  { month: 'Jul', total: 848, new: 38, churned: 11 },
  { month: 'Aug', total: 856, new: 28, churned: 8 },
];
