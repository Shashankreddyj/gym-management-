import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';
import MemberProfile from './pages/Members/MemberProfile';
import Schedule from './pages/Schedule/Schedule';
import Billing from './pages/Billing/Billing';
import CheckIn from './pages/CheckIn/CheckIn';
import Leads from './pages/Leads/Leads';
import Retention from './pages/Retention/Retention';
import FrontDesk from './pages/FrontDesk/FrontDesk';
import Member360 from './pages/Member360/Member360';
import Settings from './pages/Settings/Settings';
import AIInsights from './pages/AIInsights/AIInsights';
import RevenueOptimizer from './pages/RevenueOptimizer/RevenueOptimizer';
import Dunning from './pages/Dunning/Dunning';
import StaffManagement from './pages/StaffManagement/StaffManagement';
import POS from './pages/POS/POS';
import MultiLocation from './pages/MultiLocation/MultiLocation';
import NoShowPrediction from './pages/NoShowPrediction/NoShowPrediction';
import MarketingCampaigns from './pages/MarketingCampaigns/MarketingCampaigns';
import WorkoutPlanner from './pages/WorkoutPlanner/WorkoutPlanner';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import EquipmentHeatmap from './pages/EquipmentHeatmap/EquipmentHeatmap';
import Nutrition from './pages/Nutrition/Nutrition';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<MemberProfile />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="billing" element={<Billing />} />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="leads" element={<Leads />} />
        <Route path="retention" element={<Retention />} />
        <Route path="frontdesk" element={<FrontDesk />} />
        <Route path="member360" element={<Member360 />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="revenue-optimizer" element={<RevenueOptimizer />} />
        <Route path="dunning" element={<Dunning />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="pos" element={<POS />} />
        <Route path="locations" element={<MultiLocation />} />
        <Route path="no-show" element={<NoShowPrediction />} />
        <Route path="campaigns" element={<MarketingCampaigns />} />
        <Route path="workout-planner" element={<WorkoutPlanner />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="equipment" element={<EquipmentHeatmap />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
