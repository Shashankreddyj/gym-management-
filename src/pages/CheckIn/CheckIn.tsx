import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Camera, CheckCircle2, Clock, Users, Shield, Sparkles, AlertCircle, Gift } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import { useGamification } from '../../contexts/GamificationContext';
import { CoinBadge } from '../../components/gamification/XPBar';

export default function CheckIn() {
  const [scanning, setScanning] = useState(false);
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [checkinCount, setCheckinCount] = useState(142);
  const [showQR, setShowQR] = useState(false);
  const [clickedActions, setClickedActions] = useState<Record<number, string>>({});
  const navigate = useNavigate();
  const { addXP, addCoins, coins } = useGamification();

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setCheckinCount(c => c + 1);
      setLastCheckin(`Rajesh Kumar — Premium Member — ${new Date().toLocaleTimeString()}`);
      addXP(10, 'checkin');
      addCoins(5);
    }, 2000);
  };

  useEffect(() => {
    if (lastCheckin) {
      const timer = setTimeout(() => setLastCheckin(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastCheckin]);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#231815]">Check-In</h2>
          <p className="text-sm text-[#6E625D] mt-1">QR/NFC digital check-in with AI-powered verification</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm text-[#6E625D]">
            <Users className="w-4 h-4" /> Today: {checkinCount}
          </span>
          <button onClick={() => setShowQR(!showQR)} className="btn-secondary text-sm flex items-center gap-2">
            <QrCode className="w-4 h-4" /> {showQR ? 'Hide QR' : 'Show QR'}
          </button>
        </div>
      </div>

      {/* Check-in Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Checked In Today', value: checkinCount, icon: CheckCircle2, color: '#2E7D32' },
          { label: 'Peak Hours', value: '5–7 PM', icon: Clock, color: '#E00026' },
          { label: 'Currently Inside', value: '48', icon: Users, color: '#F9A825' },
          { label: 'AI No-Show Prevention', value: '12 alerted', icon: Sparkles, color: '#E00026' },
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#231815]">{stat.value}</p>
              <p className="text-[11px] text-[#6E625D]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner Simulation */}
        <div className="card p-8 flex flex-col items-center justify-center">
          {!scanning && !lastCheckin && (
            <>
              <div className={`w-48 h-48 border-2 border-dashed rounded-2xl flex items-center justify-center mb-6 transition-all ${showQR ? 'border-[#E00026] bg-[#E00026]/5' : 'border-[#DDD3CB]'}`}>
                {showQR ? (
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-[#E00026] mx-auto mb-2" />
                    <p className="text-[10px] text-[#6E625D]">Scan this QR at the kiosk</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-[#6E625D] mx-auto mb-2" />
                    <p className="text-[10px] text-[#6E625D]">Tap to toggle QR display</p>
                  </div>
                )}
              </div>
              <button onClick={simulateScan} className="btn-primary text-lg flex items-center gap-2 px-8">
                <Camera className="w-5 h-5" /> Simulate Scan
              </button>
            </>
          )}
          {scanning && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-[#E00026] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-[#231815]">Scanning...</p>
              <p className="text-xs text-[#6E625D] mt-1">Hold QR code in front of camera</p>
            </div>
          )}
          {lastCheckin && (
            <div className="text-center py-8 animate-fadeIn">
              <CheckCircle2 className="w-16 h-16 text-[#2E7D32] mx-auto mb-3" />
              <p className="text-lg font-bold text-[#2E7D32]">Check-in Successful!</p>
              <p className="text-sm text-[#6E625D] mt-1">{lastCheckin}</p>
              <button onClick={() => setLastCheckin(null)} className="btn-secondary mt-4 text-sm">Scan Another</button>
            </div>
          )}
        </div>

        {/* AI Check-in Insights */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E00026]" />
            <h3 className="text-sm font-bold text-[#231815]">AI Check-in Intelligence</h3>
            <AIBadge />
          </div>
          <div className="space-y-3">
            {[
              { icon: AlertCircle, color: '#F9A825', text: 'Sneha Reddy hasn\'t checked in for 22 days. AI no-show prevention triggered — sent WhatsApp reminder.', action: 'View Member' },
              { icon: Shield, color: '#2E7D32', text: 'All active members have valid access credentials. Zero unauthorized entry attempts this month.', action: 'Security Log' },
              { icon: Clock, color: '#E00026', text: 'Peak check-in time is 5:30 PM. Consider opening an additional check-in kiosk at Studio B entrance.', action: 'Manage Kiosks' },
              { icon: Sparkles, color: '#E00026', text: '12 members predicted to no-show for tomorrow\'s 6AM class. AI sent preemptive reminders at 9PM tonight.', action: 'View Predictions' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-[#F5F0EA] rounded-xl">
                <div className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                  <p className="text-xs text-[#6E625D] leading-relaxed">{item.text}</p>
                </div>
                <button 
                  onClick={() => {
                    const actions: Record<number, string> = {0: 'Opening member profile...', 1: 'Security log verified — all clear', 2: 'Kiosk management panel opened', 3: 'Showing predictions for tomorrow...'};
                    setClickedActions({...clickedActions, [i]: actions[i] || 'Action completed'});
                    if (i === 0) navigate('/members/M004');
                  }}
                  className="mt-2 text-[11px] font-semibold text-[#E00026] hover:underline">{item.action} →</button>
                {clickedActions[i] && <p className="text-[10px] text-[#2E7D32] mt-1 animate-fadeIn">✓ {clickedActions[i]}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
