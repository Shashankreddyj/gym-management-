import { useState } from 'react';
import { Gift } from 'lucide-react';
import { useGamification } from '../../contexts/GamificationContext';

const prizes = [
  { label: '50 GymCoins', coins: 50, xp: 0, color: '#F9A825' },
  { label: 'Free Shake 🥤', coins: 0, xp: 20, color: '#2E7D32' },
  { label: 'Guest Pass 🎫', coins: 0, xp: 30, color: '#E00026' },
  { label: '100 GymCoins', coins: 100, xp: 0, color: '#F9A825' },
  { label: 'PT Discount 💪', coins: 0, xp: 40, color: '#C62828' },
  { label: '25 GymCoins', coins: 25, xp: 0, color: '#F9A825' },
  { label: 'Merch 20% Off 👕', coins: 0, xp: 25, color: '#6E625D' },
  { label: '200 GymCoins 💰', coins: 200, xp: 0, color: '#F9A825' },
];

export default function SpinWheel() {
  const { addCoins, addXP } = useGamification();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(1);

  const spin = () => {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setResult(null);
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setTimeout(() => {
      setSpinning(false);
      setResult(prize.label);
      if (prize.coins > 0) addCoins(prize.coins);
      if (prize.xp > 0) addXP(prize.xp, 'spin_wheel');
      setSpinsLeft(0);
    }, 2000);
  };

  return (
    <div className="card p-4 text-center">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-[#E00026]" />
          <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Weekly Spin</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#E00026]/10 text-[#E00026]">
          {spinsLeft} spin{spinsLeft !== 1 ? 's' : ''} left
        </span>
      </div>
      <button onClick={spin} disabled={spinning || spinsLeft <= 0}
        className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl transition-all duration-500 ${
          spinning ? 'animate-spin bg-[#E00026] text-white' : 'bg-[#F5F0EA] hover:scale-110 disabled:opacity-50'
        }`}>
        {spinning ? '🎰' : '🎡'}
      </button>
      {result && (
        <p className="text-xs font-bold mt-2 animate-fadeIn text-[#2E7D32]">🎉 Won: {result}</p>
      )}
    </div>
  );
}
