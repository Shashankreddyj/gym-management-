import { useState } from 'react';
import { Sparkles, Dumbbell, Target, Zap, ChevronRight, Clock, AlertCircle, CheckCircle2, Download, RotateCcw, Flame } from 'lucide-react';
import AIBadge from '../../components/common/AIBadge';
import { presets, WorkoutWeek, Exercise } from '../../data/workoutPlans';

const goals = [
  { key: 'weightLoss', label: 'Weight Loss & Toning', icon: '🔥', desc: 'Burn fat, build lean muscle' },
  { key: 'muscleGain', label: 'Muscle Building', icon: '💪', desc: 'Hypertrophy & strength gains' },
  { key: 'generalFitness', label: 'General Fitness', icon: '🏃', desc: 'Balanced all-round program' },
  { key: 'endurance', label: 'Endurance & Cardio', icon: '🏊', desc: 'Stamina & conditioning' },
];

export default function WorkoutPlanner() {
  const [step, setStep] = useState<'select' | 'generating' | 'preview'>('select');
  const [selectedGoal, setSelectedGoal] = useState<keyof typeof presets | null>(null);
  const [plan, setPlan] = useState<typeof presets[keyof typeof presets] | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [memberName, setMemberName] = useState('');
  const [saved, setSaved] = useState(false);

  const generatePlan = () => {
    if (!selectedGoal) return;
    setStep('generating');
    setTimeout(() => {
      setPlan(presets[selectedGoal]);
      setStep('preview');
      setActiveWeek(0);
    }, 2000);
  };

  const getDayExercises = (weekIdx: number, dayIdx: number): Exercise[] => {
    if (!plan) return [];
    const base = [...plan.baseExercises];
    const progression = weekIdx * 0.25;
    return base.map(e => ({
      ...e,
      reps: e.reps.includes('-') ? e.reps : `${Math.floor(Number(e.reps) + progression * 2)}-${Math.floor(Number(e.reps.split('-')[1] || e.reps) + progression * 3)}`,
      sets: Math.min(e.sets + Math.floor(progression), 5),
    }));
  };

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>AI Workout Plan Generator</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select your goal → AI generates a 4-week progressive overload plan</p>
        </div>
        <AIBadge text="Personalized Plans" />
      </div>

      {step === 'select' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="card p-6">
            <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>Your Name (optional)</label>
            <input type="text" value={memberName} onChange={e => setMemberName(e.target.value)}
              placeholder="Enter your name for personalization..." className="input-field max-w-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map(g => (
              <div key={g.key} onClick={() => setSelectedGoal(g.key as keyof typeof presets)}
                className={`card p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedGoal === g.key ? 'ring-2 ring-[#E00026] border-[#E00026]' : ''
                }`}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{g.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{g.label}</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>
                  </div>
                  {selectedGoal === g.key && <CheckCircle2 className="w-5 h-5 text-[#E00026]" />}
                </div>
              </div>
            ))}
          </div>

          <button onClick={generatePlan} disabled={!selectedGoal}
            className="btn-primary text-sm flex items-center gap-2 mx-auto disabled:opacity-50">
            <Sparkles className="w-4 h-4" /> Generate My 4-Week Plan
          </button>
        </div>
      )}

      {step === 'generating' && (
        <div className="card p-12 flex flex-col items-center justify-center text-center animate-fadeIn">
          <div className="w-16 h-16 border-4 border-[#E00026] border-t-transparent rounded-full animate-spin mb-6" />
          <Sparkles className="w-8 h-8 text-[#E00026] mb-3" />
          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>AI is crafting your plan...</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Analyzing {memberName || 'your'} profile • Setting progressive overload • Optimizing for {presets[selectedGoal!]?.goal}
          </p>
        </div>
      )}

      {step === 'preview' && plan && (
        <div className="space-y-6 animate-fadeIn">
          {/* Plan Header */}
          <div className="card p-6 bg-gradient-to-r from-[#E00026] to-[#C50020] text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><Sparkles className="w-5 h-5" /> <span className="text-xs font-bold uppercase tracking-widest">4-Week Plan</span></div>
                <p className="text-xl font-extrabold">{memberName || 'Your'} {plan.goal} Program</p>
                <p className="text-sm text-white/70 mt-1">{plan.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setStep('select'); setPlan(null); }} className="px-4 py-2 bg-white/20 rounded-xl text-xs font-semibold flex items-center gap-1"><RotateCcw className="w-3 h-3" /> New Plan</button>
                <button onClick={() => setSaved(true)} className="px-4 py-2 bg-white rounded-xl text-[#E00026] text-xs font-bold flex items-center gap-1">
                  {saved ? <CheckCircle2 className="w-3 h-3" /> : <Download className="w-3 h-3" />} {saved ? 'Saved!' : 'Save Plan'}
                </button>
              </div>
            </div>
          </div>

          {/* Week Tabs */}
          <div className="flex gap-1 bg-white rounded-xl border p-1 w-fit" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
            {plan.weeklyFocus.map((focus, i) => (
              <button key={i} onClick={() => setActiveWeek(i)}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWeek === i ? 'bg-[#E00026] text-white' : ''
                }`}
                style={activeWeek !== i ? { color: 'var(--text-secondary)' } : {}}>
                Week {i + 1}: {focus}
              </button>
            ))}
          </div>

          {/* Week Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dayNames.map((day, di) => {
              const isRest = di >= 5;
              const exercises = !isRest ? getDayExercises(activeWeek, di) : [];
              return (
                <div key={di} className={`card p-5 ${isRest ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{day}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isRest ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#E00026]/10 text-[#E00026]'
                    }`}>{isRest ? 'Rest Day' : 'Training Day'}</span>
                  </div>
                  {isRest ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <AlertCircle className="w-3 h-3" /> Active recovery: Light walk, foam rolling, stretching
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {exercises.map((ex, i) => (
                        <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--muted-bg)' }}>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{ex.name}</p>
                            <span className="text-[10px] font-semibold text-[#E00026]">{ex.progression}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                            <span>{ex.sets} sets × {ex.reps}</span>
                            <span>Rest: {ex.rest}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cardio & AI Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-3"><Flame className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Cardio Schedule</h3></div>
              <ul className="space-y-2">
                {plan.cardio.map((c, i) => <li key={i} className="text-xs flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><ChevronRight className="w-3 h-3 text-[#E00026]" />{c}</li>)}
              </ul>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Coach Notes</h3></div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{plan.aiNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
