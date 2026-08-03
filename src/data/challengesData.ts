export interface LeaderboardEntry {
  rank: number;
  member: string;
  avatar: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'same';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  metric: 'visits' | 'classes' | 'weightloss' | 'streak' | 'workouts';
  unit: string;
  startDate: string;
  endDate: string;
  participants: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  prize: string;
  leaderboard: LeaderboardEntry[];
}

export const challenges: Challenge[] = [
  {
    id: 'CH001', title: 'August Iron Warrior', description: 'Most gym visits this month. Top 3 win prizes!', metric: 'visits', unit: 'visits',
    startDate: '2026-08-01', endDate: '2026-08-31', participants: 156, status: 'Active', prize: '1st: ₹5,000 + Trophy, 2nd: ₹3,000, 3rd: ₹1,000',
    leaderboard: [
      { rank: 1, member: 'Vikram Singh', avatar: 'VS', value: 28, unit: 'visits', trend: 'up' },
      { rank: 2, member: 'Priya Sharma', avatar: 'PS', value: 25, unit: 'visits', trend: 'up' },
      { rank: 3, member: 'Rajesh Kumar', avatar: 'RK', value: 23, unit: 'visits', trend: 'up' },
      { rank: 4, member: 'Ananya Iyer', avatar: 'AI', value: 21, unit: 'visits', trend: 'down' },
      { rank: 5, member: 'Rohan Desai', avatar: 'RD', value: 19, unit: 'visits', trend: 'up' },
      { rank: 6, member: 'Sahil Verma', avatar: 'SV', value: 17, unit: 'visits', trend: 'same' },
      { rank: 7, member: 'Arjun Nair', avatar: 'AN', value: 15, unit: 'visits', trend: 'up' },
      { rank: 8, member: 'Divya Kapoor', avatar: 'DK', value: 14, unit: 'visits', trend: 'down' },
      { rank: 9, member: 'Karan Mehta', avatar: 'KM', value: 12, unit: 'visits', trend: 'up' },
      { rank: 10, member: 'Meera Joshi', avatar: 'MJ', value: 10, unit: 'visits', trend: 'same' },
    ],
  },
  {
    id: 'CH002', title: 'Transformation Challenge', description: 'Highest % body weight lost. Verified weigh-ins every Monday.', metric: 'weightloss', unit: 'kg lost',
    startDate: '2026-08-01', endDate: '2026-09-15', participants: 89, status: 'Active', prize: '1st: ₹10,000 + Free 6mo Elite, 2nd: ₹5,000 + Free 3mo',
    leaderboard: [
      { rank: 1, member: 'Amit Patel', avatar: 'AP', value: 4.2, unit: 'kg', trend: 'up' },
      { rank: 2, member: 'Neha Gupta', avatar: 'NG', value: 3.8, unit: 'kg', trend: 'up' },
      { rank: 3, member: 'Sneha Reddy', avatar: 'SR', value: 3.1, unit: 'kg', trend: 'up' },
      { rank: 4, member: 'Rohan Desai', avatar: 'RD', value: 2.7, unit: 'kg', trend: 'same' },
      { rank: 5, member: 'Karan Mehta', avatar: 'KM', value: 2.3, unit: 'kg', trend: 'up' },
    ],
  },
  {
    id: 'CH003', title: 'Class Champion', description: 'Attend the most classes in August. All class types count!', metric: 'classes', unit: 'classes',
    startDate: '2026-08-01', endDate: '2026-08-31', participants: 203, status: 'Active', prize: '1st: Free month Elite + Merch Pack, 2nd: Free month Premium',
    leaderboard: [
      { rank: 1, member: 'Ananya Iyer', avatar: 'AI', value: 32, unit: 'classes', trend: 'up' },
      { rank: 2, member: 'Vikram Singh', avatar: 'VS', value: 29, unit: 'classes', trend: 'up' },
      { rank: 3, member: 'Priya Sharma', avatar: 'PS', value: 27, unit: 'classes', trend: 'up' },
      { rank: 4, member: 'Rajesh Kumar', avatar: 'RK', value: 24, unit: 'classes', trend: 'down' },
      { rank: 5, member: 'Divya Kapoor', avatar: 'DK', value: 21, unit: 'classes', trend: 'up' },
    ],
  },
  {
    id: 'CH004', title: 'Streak King', description: 'Longest consecutive day check-in streak. No breaks allowed!', metric: 'streak', unit: 'days',
    startDate: '2026-08-01', endDate: '2026-09-30', participants: 312, status: 'Active', prize: 'Winner: "Streak King" Trophy + VIP parking spot for 3 months',
    leaderboard: [
      { rank: 1, member: 'Vikram Singh', avatar: 'VS', value: 45, unit: 'days', trend: 'up' },
      { rank: 2, member: 'Rajesh Kumar', avatar: 'RK', value: 24, unit: 'days', trend: 'up' },
      { rank: 3, member: 'Priya Sharma', avatar: 'PS', value: 18, unit: 'days', trend: 'up' },
      { rank: 4, member: 'Rohan Desai', avatar: 'RD', value: 12, unit: 'days', trend: 'up' },
      { rank: 5, member: 'Ananya Iyer', avatar: 'AI', value: 8, unit: 'days', trend: 'down' },
    ],
  },
];

export const badges = [
  { name: 'First Visit', icon: '🏆', description: 'Completed first gym session' },
  { name: '7-Day Streak', icon: '🔥', description: '7 consecutive days at the gym' },
  { name: '30-Day Streak', icon: '💎', description: '30 consecutive days — Elite!' },
  { name: '100 Visits', icon: '🥇', description: '100 total gym visits' },
  { name: '10 Classes', icon: '🎯', description: 'Attended 10 classes' },
  { name: 'Weight Warrior', icon: '💪', description: 'Lost 5kg since joining' },
  { name: 'Early Bird', icon: '🌅', description: '10 check-ins before 6:30 AM' },
  { name: 'Social Butterfly', icon: '🦋', description: 'Referred 3 friends' },
  { name: 'Iron Elite', icon: '👑', description: 'Elite member for 6+ months' },
  { name: 'Challenge Winner', icon: '⭐', description: 'Won a monthly challenge' },
];
