export interface UpsellOpportunity {
  id: string;
  member: string;
  avatar: string;
  currentPlan: string;
  recommendedPlan: string;
  reason: string;
  revenueUplift: number;
  confidence: number;
  stage: 'Ready' | 'Warming' | 'Nurturing';
  trigger: string;
}

export interface DynamicPricing {
  id: string;
  className: string;
  currentPrice: string;
  suggestedPrice: string;
  slot: string;
  currentFill: number;
  reason: string;
  revenueImpact: number;
}

export const upsellOpportunities: UpsellOpportunity[] = [
  { id: 'U001', member: 'Rajesh Kumar', avatar: 'RK', currentPlan: 'Premium', recommendedPlan: 'Elite', reason: '298 visits, high engagement (87), 24-day streak — ready for upgrade', revenueUplift: 1500, confidence: 88, stage: 'Ready', trigger: '60+ days gym-only, high attendance → PT upsell' },
  { id: 'U002', member: 'Rohan Desai', avatar: 'RD', currentPlan: 'Premium', recommendedPlan: 'Elite', reason: '215 visits, consistent 12-day streaks, interested in HIIT', revenueUplift: 1500, confidence: 76, stage: 'Warming', trigger: 'Mid-lifecycle, decent engagement → Elite benefits pitch' },
  { id: 'U003', member: 'Amit Patel', avatar: 'AP', currentPlan: 'Basic', recommendedPlan: 'Premium', reason: 'At-risk but could re-engage with Premium class access', revenueUplift: 1000, confidence: 55, stage: 'Nurturing', trigger: 'At-risk recovery → Premium upgrade as retention' },
  { id: 'U004', member: 'Meera Joshi', avatar: 'MJ', currentPlan: 'Basic', recommendedPlan: 'Premium', reason: 'New lead interested in Yoga — Premium gives unlimited classes', revenueUplift: 1000, confidence: 72, stage: 'Ready', trigger: 'New lead conversion → Premium upsell' },
  { id: 'U005', member: 'Divya Kapoor', avatar: 'DK', currentPlan: 'Lead', recommendedPlan: 'Elite', reason: 'High-intent lead (score 92), trial scheduled — target Elite', revenueUplift: 3999, confidence: 68, stage: 'Ready', trigger: 'Trial conversion → Elite onboarding' },
];

export const dynamicPricing: DynamicPricing[] = [
  { id: 'DP001', className: 'Power Yoga', currentPrice: '₹299/session', suggestedPrice: '₹199 (off-peak)', slot: '7:00 AM', currentFill: 60, reason: '40% empty, promote to beginners at lower rate', revenueImpact: 2400 },
  { id: 'DP002', className: 'Zumba Party', currentPrice: '₹299/session', suggestedPrice: '₹249 (early bird)', slot: '10:00 AM', currentFill: 60, reason: '40% open, offer early bird discount', revenueImpact: 3600 },
  { id: 'DP003', className: 'Evening Flow', currentPrice: '₹349/session', suggestedPrice: '₹199 (evening filler)', slot: '6:00 PM', currentFill: 40, reason: '60% empty — worst performer, deep discount', revenueImpact: 2100 },
  { id: 'DP004', className: 'HIIT Blast', currentPrice: '₹349/session', suggestedPrice: '₹349 (keep)', slot: '6:00 AM', currentFill: 92, reason: 'Near capacity — maintain pricing, add 7AM slot', revenueImpact: 4800 },
];

export const revenueOpportunityTotal = upsellOpportunities.filter(u => u.stage === 'Ready').reduce((s, u) => s + u.revenueUplift, 0) + dynamicPricing.reduce((s, d) => s + d.revenueImpact, 0);
