import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, CreditCard, QrCode, 
  UserPlus, ShieldAlert, MessageSquareHeart, UserCheck, 
  Settings, Zap, Sparkles, Bell, Bot, TrendingUp,
  ShoppingCart, Building2, Megaphone, AlertTriangle, DollarSign,
  Dumbbell, Trophy, Map, Apple
} from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

const mainItems = [
  { to: '/', icon: LayoutDashboard, labelKey: 'dashboard' },
  { to: '/members', icon: Users, labelKey: 'members' },
  { to: '/schedule', icon: Calendar, labelKey: 'schedule' },
  { to: '/billing', icon: CreditCard, labelKey: 'billing' },
  { to: '/checkin', icon: QrCode, labelKey: 'checkin' },
  { to: '/pos', icon: ShoppingCart, labelKey: 'pos' },
  { to: '/staff', icon: Users, labelKey: 'staff' },
  { to: '/equipment', icon: Map, labelKey: 'equipment' },
];

const aiItems = [
  { to: '/ai-insights', icon: Bot, labelKey: 'aiInsights', ai: true },
  { to: '/leads', icon: UserPlus, labelKey: 'leads', ai: true },
  { to: '/retention', icon: ShieldAlert, labelKey: 'retention', ai: true },
  { to: '/frontdesk', icon: MessageSquareHeart, labelKey: 'frontdesk', ai: true },
  { to: '/no-show', icon: AlertTriangle, labelKey: 'noshow', ai: true },
  { to: '/member360', icon: UserCheck, labelKey: 'member360', ai: true },
];

const memberItems = [
  { to: '/workout-planner', icon: Dumbbell, labelKey: 'workoutPlanner', ai: true },
  { to: '/leaderboard', icon: Trophy, labelKey: 'leaderboard' },
  { to: '/nutrition', icon: Apple, labelKey: 'nutrition' },
];

const growthItems = [
  { to: '/revenue-optimizer', icon: DollarSign, labelKey: 'revenue', ai: true },
  { to: '/dunning', icon: CreditCard, labelKey: 'dunning', ai: true },
  { to: '/campaigns', icon: Megaphone, labelKey: 'campaigns', ai: true },
  { to: '/locations', icon: Building2, labelKey: 'locations' },
];

const bottomItems = [
  { to: '/settings', icon: Settings, labelKey: 'settings' },
];

type NavItem = typeof mainItems[0];

export default function Sidebar() {
  const { t } = useI18n();
  return (
    <aside className="w-64 h-screen flex flex-col fixed left-0 top-0 z-30 transition-colors duration-300" style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)' }}>
      <div className="p-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E00026] rounded-2xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>IronForge</h1>
            <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Gym OS</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <Section label={t('coreOps')} items={mainItems} t={t} />
        <Section label={t('aiAuto')} items={aiItems} t={t} />
        <Section label="Member Experience" items={memberItems} t={t} />
        <Section label={t('growth')} items={growthItems} t={t} />
        <Section label="" items={bottomItems} t={t} />
      </nav>
      <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="rounded-xl p-3" style={{ background: 'var(--muted-bg)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-[#E00026]" />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>AI Insights</span>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            47 members at risk — 3 outreach sequences auto-triggered today.
          </p>
        </div>
      </div>
    </aside>
  );
}

function Section({ label, items, t }: { label: string; items: NavItem[]; t: (k: string) => string }) {
  return (
    <>
      {label && <p className="px-3 mb-2 mt-4 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{label}</p>}
      {items.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
              isActive ? 'bg-[#E00026] text-white shadow-sm' : ''
            }`
          }
          style={({ isActive }) => !isActive ? { color: 'var(--text-secondary)' } : {}}
        >
          {({ isActive }) => (
            <>
              <item.icon className="w-4 h-4" />
              <span className="flex-1 truncate">{t(item.labelKey) || item.labelKey}</span>
              {'ai' in item && (item as any).ai && (
                <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[#F7E9D8] text-[#E00026]'}`}>
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </>
  );
}
