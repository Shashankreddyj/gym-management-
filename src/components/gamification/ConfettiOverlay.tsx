import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ConfettiProps { message: string; onDismiss: () => void; }

export default function ConfettiOverlay({ message, onDismiss }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      color: ['#E00026', '#F9A825', '#2E7D32', '#FFFFFF', '#F5F0EA'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 1.5,
    }));
    setParticles(p);
    const t = setTimeout(() => { setVisible(false); onDismiss(); }, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {particles.map(p => (
        <div key={p.id} className="absolute top-0 w-3 h-3 rounded-sm opacity-80 animate-bounce"
          style={{ left: `${p.x}%`, backgroundColor: p.color, animationDelay: `${p.delay}s`, animationDuration: '2s' }} />
      ))}
      <div className="bg-[#E00026] text-white px-8 py-4 rounded-2xl shadow-2xl animate-fadeIn text-center z-10" style={{ pointerEvents: 'auto' }}>
        <Sparkles className="w-6 h-6 mx-auto mb-2" />
        <p className="text-lg font-extrabold">{message}</p>
      </div>
    </div>
  );
}
