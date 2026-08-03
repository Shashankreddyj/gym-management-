export interface MealPlan {
  id: string;
  goal: string;
  calories: number;
  protein: number;
  meals: Meal[];
  preWorkout: string;
  postWorkout: string;
  tips: string[];
}

export interface Meal {
  time: string;
  name: string;
  foods: string[];
  macros: string;
}

export const mealPlans: MealPlan[] = [
  {
    id: 'MP001', goal: 'Weight Loss', calories: 1800, protein: 140,
    meals: [
      { time: '7:00 AM', name: 'Breakfast', foods: ['Oats (40g) with skimmed milk (200ml)', '1 banana', '4 egg whites scrambled'], macros: 'P: 28g | C: 55g | F: 8g | 380 cal' },
      { time: '10:30 AM', name: 'Mid-Morning Snack', foods: ['Greek yogurt (150g)', 'Handful of almonds (15g)', 'Green tea'], macros: 'P: 18g | C: 12g | F: 10g | 210 cal' },
      { time: '1:00 PM', name: 'Lunch', foods: ['Grilled chicken breast (150g)', 'Brown rice (80g cooked)', 'Steamed broccoli + carrots', '1 tsp olive oil'], macros: 'P: 42g | C: 45g | F: 12g | 480 cal' },
      { time: '4:30 PM', name: 'Pre-Workout Snack', foods: ['1 apple', 'Black coffee', 'Rice cake with peanut butter (1 tbsp)'], macros: 'P: 5g | C: 30g | F: 8g | 190 cal' },
      { time: '7:00 PM', name: 'Post-Workout Dinner', foods: ['Grilled fish / Paneer (150g)', 'Quinoa (60g cooked)', 'Mixed salad with lemon dressing'], macros: 'P: 40g | C: 35g | F: 10g | 420 cal' },
      { time: '9:30 PM', name: 'Evening', foods: ['Casein protein shake or warm milk with turmeric'], macros: 'P: 25g | C: 5g | F: 3g | 120 cal' },
    ],
    preWorkout: 'Black coffee + 1 apple (30 min before)', postWorkout: 'Whey protein (1 scoop) within 30 min + dinner within 90 min', tips: ['Drink 3-4L water daily', 'No eating 2 hours before bed', 'Swap rice for cauliflower rice 2x/week', 'Weigh food raw for accuracy'],
  },
  {
    id: 'MP002', goal: 'Muscle Gain', calories: 2800, protein: 190,
    meals: [
      { time: '6:30 AM', name: 'Breakfast', foods: ['4 whole eggs + 2 egg whites', 'Whole wheat toast (2 slices)', '1 avocado (half)', 'Whole milk (300ml)'], macros: 'P: 35g | C: 40g | F: 28g | 550 cal' },
      { time: '9:30 AM', name: 'Mid-Morning', foods: ['Whey protein shake (1.5 scoops)', 'Banana', 'Oats (50g) blended'], macros: 'P: 40g | C: 50g | F: 5g | 420 cal' },
      { time: '12:30 PM', name: 'Lunch', foods: ['Chicken breast (200g)', 'White rice (150g cooked)', 'Mixed vegetables', '1 tbsp ghee'], macros: 'P: 50g | C: 60g | F: 15g | 620 cal' },
      { time: '3:30 PM', name: 'Pre-Workout', foods: ['Peanut butter sandwich (whole wheat)', '1 banana', 'Black coffee'], macros: 'P: 15g | C: 45g | F: 12g | 350 cal' },
      { time: '6:30 PM', name: 'Post-Workout', foods: ['Whey protein (2 scoops)', 'Dextrose or banana (fast carbs)'], macros: 'P: 50g | C: 30g | F: 2g | 340 cal' },
      { time: '8:00 PM', name: 'Dinner', foods: ['Salmon / Paneer (200g)', 'Sweet potato (200g)', 'Green beans + broccoli'], macros: 'P: 45g | C: 40g | F: 15g | 520 cal' },
    ],
    preWorkout: 'Peanut butter sandwich + banana + black coffee (45 min before)', postWorkout: 'Whey (2 scoops) + fast carbs immediately, dinner within 2 hours', tips: ['Eat every 3 hours — never skip meals', 'Target 1.8-2.2g protein per kg bodyweight', 'Creatine 5g daily', 'Sleep 8+ hours for recovery'],
  },
  {
    id: 'MP003', goal: 'General Fitness', calories: 2200, protein: 130,
    meals: [
      { time: '7:30 AM', name: 'Breakfast', foods: ['Muesli with yogurt and berries', '2 boiled eggs', 'Fresh orange juice'], macros: 'P: 22g | C: 50g | F: 12g | 400 cal' },
      { time: '11:00 AM', name: 'Mid-Morning', foods: ['Fruit bowl (papaya, pomegranate)', 'Coconut water'], macros: 'P: 3g | C: 35g | F: 2g | 160 cal' },
      { time: '1:30 PM', name: 'Lunch', foods: ['Dal (1 bowl)', 'Roti (2)', 'Grilled vegetables', 'Raita (1 cup)'], macros: 'P: 20g | C: 55g | F: 10g | 450 cal' },
      { time: '4:30 PM', name: 'Snack', foods: ['Sprouts chaat', 'Green tea with lemon'], macros: 'P: 15g | C: 25g | F: 5g | 200 cal' },
      { time: '7:30 PM', name: 'Dinner', foods: ['Grilled fish / Tofu (150g)', 'Brown rice / Millet (80g)', 'Stir-fried vegetables'], macros: 'P: 35g | C: 40g | F: 8g | 420 cal' },
      { time: '9:30 PM', name: 'Evening', foods: ['Warm turmeric milk', '5 soaked almonds'], macros: 'P: 8g | C: 10g | F: 8g | 150 cal' },
    ],
    preWorkout: 'Banana or fruit 30 min before', postWorkout: 'Protein-rich dinner within 2 hours', tips: ['Eat seasonal and local', 'Chew food well — 20+ chews per bite', 'Limit processed food', '1 cheat meal per week is fine'],
  },
];

export const supplementRecommendations = {
  weightLoss: ['Whey Protein Isolate', 'Green Tea Extract', 'L-Carnitine', 'Multivitamin', 'Omega-3'],
  muscleGain: ['Whey Protein Concentrate', 'Creatine Monohydrate (5g/day)', 'BCAA (intra-workout)', 'ZMA (before bed)', 'Vitamin D3'],
  generalFitness: ['Whey Protein (optional)', 'Multivitamin', 'Omega-3', 'Vitamin D3'],
};
