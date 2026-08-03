export interface WorkoutPlan {
  id: string;
  memberName: string;
  goal: string;
  weeks: WorkoutWeek[];
  generatedAt: string;
  aiNotes: string;
}

export interface WorkoutWeek {
  week: number;
  focus: string;
  days: WorkoutDay[];
}

export interface WorkoutDay {
  day: number;
  name: string;
  exercises: Exercise[];
  cardio?: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  progression: string;
  videoRef?: string;
}

export const presets = {
  weightLoss: {
    goal: 'Weight Loss & Toning',
    description: 'Full-body fat burning program with progressive cardio overload',
    weeklyFocus: ['Foundation & Form', 'Volume Increase', 'Intensity Spike', 'Peak Week'],
    baseExercises: [
      { name: 'Goblet Squats', sets: 3, reps: '12-15', rest: '45s', progression: '+2.5kg/week' },
      { name: 'Dumbbell Rows', sets: 3, reps: '12-15', rest: '45s', progression: '+2.5kg/week' },
      { name: 'Push-Ups', sets: 3, reps: '15-20', rest: '45s', progression: '+5 reps/week' },
      { name: 'Walking Lunges', sets: 3, reps: '12/leg', rest: '45s', progression: '+2 reps/week' },
      { name: 'Plank Hold', sets: 3, reps: '30-45s', rest: '30s', progression: '+10s/week' },
      { name: 'Mountain Climbers', sets: 3, reps: '20/leg', rest: '30s', progression: '+5/leg/week' },
    ],
    cardio: ['Brisk Walk → Jog (20 min W1 → 30 min W4)', 'HIIT: 20s on/40s off x 8 rounds'],
    aiNotes: 'Focus on form first 2 weeks. Caloric deficit of 300-500/day recommended. Weigh yourself every Monday morning. Stay hydrated — 3L water/day minimum.',
  },
  muscleGain: {
    goal: 'Muscle Building & Strength',
    description: 'Progressive overload hypertrophy program split by muscle groups',
    weeklyFocus: ['Hypertrophy Base', 'Volume Increase', 'Strength Peak', 'Deload & Test'],
    baseExercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', progression: '+2.5kg/week' },
      { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '90s', progression: '+5kg/week' },
      { name: 'Deadlifts', sets: 3, reps: '6-8', rest: '120s', progression: '+5kg/week' },
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', progression: '+2.5kg/week' },
      { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s', progression: '+2.5kg/week' },
      { name: 'Pull-Ups', sets: 3, reps: '8-12', rest: '90s', progression: 'Weighted +2.5kg/week' },
    ],
    cardio: ['Light jog 15 min post-workout', 'Active recovery walk on rest days'],
    aiNotes: 'Eat in a 300-500 calorie surplus. Target 1.6-2.2g protein per kg bodyweight. Train each muscle group 2x/week. Sleep 7-9 hours for optimal recovery. Track lifts in a notebook.',
  },
  generalFitness: {
    goal: 'General Fitness & Wellness',
    description: 'Balanced full-body program mixing strength, cardio, and mobility',
    weeklyFocus: ['Movement Patterns', 'Build Consistency', 'Challenge Yourself', 'Celebrate Progress'],
    baseExercises: [
      { name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: '45s', progression: 'Add goblet hold' },
      { name: 'Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', progression: '+2.5kg/week' },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s', progression: '+5kg/week' },
      { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '45s', progression: '+2kg/week' },
      { name: 'Plank to Downward Dog', sets: 3, reps: '8', rest: '30s', progression: '+2 reps/week' },
      { name: 'Box Step-Ups', sets: 3, reps: '10/leg', rest: '45s', progression: 'Add height' },
    ],
    cardio: ['Cycling/Crosstrainer 25 min', 'Weekend walk or swim'],
    aiNotes: 'Consistency over intensity. Aim for 4 sessions/week. Mix in yoga or stretching on off days. This program builds habits — the real transformation happens after week 4.',
  },
  endurance: {
    goal: 'Endurance & Cardio',
    description: 'Stamina-building program with running, cycling, and bodyweight conditioning',
    weeklyFocus: ['Build Base', 'Add Distance', 'Speed Work', 'Race Simulation'],
    baseExercises: [
      { name: 'Bodyweight Circuit', sets: 4, reps: 'Circuit x 3', rest: '60s between rounds', progression: 'Reduce rest by 5s/week' },
      { name: 'Burpees', sets: 3, reps: '10-15', rest: '30s', progression: '+3 reps/week' },
      { name: 'Jump Squats', sets: 3, reps: '12-15', rest: '30s', progression: '+3 reps/week' },
      { name: 'Box Jumps', sets: 3, reps: '8-10', rest: '45s', progression: 'Add height' },
      { name: 'Battle Ropes', sets: 3, reps: '30s work', rest: '30s', progression: '+5s work/week' },
      { name: 'Core Circuit (V-ups, Russian twists, leg raises)', sets: 3, reps: '15 each', rest: '30s', progression: '+3 reps' },
    ],
    cardio: ['Run: W1 3km → W4 8km', 'Swim: 20 laps W1 → 40 laps W4', 'HIIT Sprints: 30s/30s x 10'],
    aiNotes: 'Build mileage gradually — no more than 10% increase per week. Hydrate with electrolytes for runs >45 min. Active recovery is crucial: foam roll, stretch, walk on rest days. Target HR zone 2 for base runs.',
  },
};
