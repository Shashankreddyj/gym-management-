import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useGamification } from '../../contexts/GamificationContext';
import ConfettiOverlay from '../gamification/ConfettiOverlay';

export default function Layout() {
  const { recentMilestone, dismissMilestone } = useGamification();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
      {recentMilestone && <ConfettiOverlay message={recentMilestone} onDismiss={dismissMilestone} />}
    </div>
  );
}
