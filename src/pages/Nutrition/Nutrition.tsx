import { useState } from 'react';
import { Apple, Sparkles, Utensils, Clock, Zap, CheckCircle2, ChevronRight, Download, Flame, Droplets } from 'lucide-react';
import { mealPlans, supplementRecommendations, MealPlan, Meal } from '../../data/nutritionData';
import AIBadge from '../../components/common/AIBadge';

export default function Nutrition() {
  const [selectedGoal, setSelectedGoal] = useState<MealPlan>(mealPlans[0]);
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [savedPlan, setSavedPlan] = useState(false);
  const [waterTracker, setWaterTracker] = useState(6);
  const maxWater = 8;

  const goalEmojis: Record<string, string> = { 'Weight Loss': '🔥', 'Muscle Gain': '💪', 'General Fitness': '🏃' };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Nutrition & Meal Plans</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>AI-generated meal plans synced with your workout schedule</p>
        </div>
        <AIBadge text="Personalized Nutrition" />
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Daily Calories', value: `${selectedGoal.calories}`, icon: Flame, color: '#E00026', unit: 'kcal' },
          { label: 'Protein Target', value: `${selectedGoal.protein}g`, icon: Zap, color: '#2E7D32', unit: 'per day' },
          { label: 'Meals', value: selectedGoal.meals.length, icon: Utensils, color: '#F9A825', unit: 'per day' },
          { label: 'Pre-Workout', value: selectedGoal.preWorkout.split('(')[0].trim(), icon: Clock, color: '#E00026', unit: 'before session' },
          { label: 'Post-Workout', value: selectedGoal.postWorkout.split('(')[0].trim(), icon: Sparkles, color: '#2E7D32', unit: 'after session' },
        ].map((kpi, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center gap-2 mb-2"><kpi.icon className="w-4 h-4" style={{ color: kpi.color }} /><span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{kpi.label}</span></div>
            <p className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
            <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{kpi.unit}</p>
          </div>
        ))}
      </div>

      {/* Water Tracker */}
      <div className="card p-5 flex items-center gap-4">
        <div className="text-3xl">💧</div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Water Intake Tracker</p>
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: maxWater }).map((_, i) => (
              <button key={i} onClick={() => setWaterTracker(i + 1)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${i < waterTracker ? 'bg-[#E00026] text-white' : ''}`}
                style={i >= waterTracker ? { background: 'var(--muted-bg)', color: 'var(--text-secondary)' } : {}}>
                <Droplets className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{waterTracker}/{maxWater} glasses (250ml each) — {waterTracker >= 6 ? '✅ On track!' : 'Drink more water!'}</p>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mealPlans.map(mp => (
          <div key={mp.id} onClick={() => setSelectedGoal(mp)}
            className={`card p-5 cursor-pointer transition-all ${
              selectedGoal.id === mp.id ? 'ring-2 ring-[#E00026]' : 'hover:shadow-md'
            }`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">{goalEmojis[mp.goal] || '🍎'}</span>
                <p className="text-sm font-bold mt-2" style={{ color: 'var(--text-primary)' }}>{mp.goal}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{mp.calories} cal • {mp.protein}g protein</p>
              </div>
              {selectedGoal.id === mp.id && <CheckCircle2 className="w-5 h-5 text-[#E00026]" />}
            </div>
          </div>
        ))}
      </div>

      {/* Meal Plan */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Daily Meal Schedule</h3>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{selectedGoal.calories} calories • {selectedGoal.protein}g protein • 6 meals</p>
          </div>
          <button onClick={() => setSavedPlan(true)} className="btn-secondary text-xs flex items-center gap-1">
            {savedPlan ? <><CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" /> Saved</> : <><Download className="w-3.5 h-3.5" /> Save Plan</>}
          </button>
        </div>

        <div className="space-y-2">
          {selectedGoal.meals.map((meal, i) => (
            <div key={i}>
              <div onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors hover:bg-opacity-70"
                style={{ background: 'var(--muted-bg)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs bg-[#E00026]">{meal.time}</div>
                <div className="flex-1">
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{meal.name}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{meal.macros}</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedMeal === i ? 'rotate-90' : ''}`} style={{ color: 'var(--text-secondary)' }} />
              </div>
              {expandedMeal === i && (
                <div className="p-4 rounded-b-xl animate-fadeIn" style={{ background: 'var(--muted-bg)', borderTop: '1px solid var(--border)' }}>
                  <div className="space-y-1">
                    {meal.foods.map((food, j) => (
                      <div key={j} className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E00026]" />{food}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Supplement Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recommended Supplements</h3></div>
          <div className="flex flex-wrap gap-2">
            {(supplementRecommendations as any)[selectedGoal.goal.toLowerCase().replace(/ /g, '')]?.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#E00026]/10 text-[#E00026]">{s}</span>
            )) || supplementRecommendations.generalFitness.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#E00026]/10 text-[#E00026]">{s}</span>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-[#E00026]" /><h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Nutrition Tips</h3></div>
          <ul className="space-y-2">
            {selectedGoal.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <ChevronRight className="w-3 h-3 text-[#E00026] mt-0.5 flex-shrink-0" />{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
