export interface DunningRecord {
  id: string;
  member: string;
  avatar: string;
  amount: number;
  daysOverdue: number;
  plan: string;
  failedDate: string;
  attempts: number;
  status: 'Retrying' | 'Contacted' | 'Escalated' | 'Recovered' | 'WrittenOff';
  nextAction: string;
  channel: string;
}

export interface PaymentPlan {
  id: string;
  originalAmount: number;
  installments: number;
  perInstallment: number;
  member: string;
  avatar: string;
  status: 'Offered' | 'Accepted' | 'Active' | 'Completed';
}

export const dunningRecords: DunningRecord[] = [
  { id: 'D001', member: 'Neha Gupta', avatar: 'NG', amount: 1499, daysOverdue: 30, plan: 'Basic Monthly', failedDate: '2026-07-05', attempts: 3, status: 'Escalated', nextAction: 'AI voice call scheduled tomorrow 10AM', channel: 'Voice Call' },
  { id: 'D002', member: 'Sahil Verma', avatar: 'SV', amount: 3999, daysOverdue: 5, plan: 'Elite Monthly', failedDate: '2026-07-29', attempts: 1, status: 'Contacted', nextAction: 'Member responded — updating payment method', channel: 'WhatsApp' },
  { id: 'D003', member: 'Karan Mehta', avatar: 'KM', amount: 1499, daysOverdue: 12, plan: 'Basic Monthly', failedDate: '2026-07-22', attempts: 2, status: 'Retrying', nextAction: 'Auto-retry scheduled for Aug 5', channel: 'Auto-Retry' },
  { id: 'D004', member: 'Arjun Nair', avatar: 'AN', amount: 2499, daysOverdue: 8, plan: 'Premium Monthly', failedDate: '2026-07-26', attempts: 1, status: 'Recovered', nextAction: 'Payment recovered via UPI retry', channel: 'UPI Auto-Debit' },
];

export const paymentPlans: PaymentPlan[] = [
  { id: 'PP001', originalAmount: 1499, installments: 2, perInstallment: 750, member: 'Neha Gupta', avatar: 'NG', status: 'Offered' },
  { id: 'PP002', originalAmount: 3999, installments: 3, perInstallment: 1333, member: 'Sahil Verma', avatar: 'SV', status: 'Accepted' },
];

export const dunningStats = {
  totalFailed: 4498,
  totalRecovered: 2499,
  recoveryRate: '55.5%',
  avgDaysToRecover: 8,
  autoRetrySuccess: '62%',
  aiOutreachSuccess: '71%',
};
