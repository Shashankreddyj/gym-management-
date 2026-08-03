export interface Equipment {
  id: string;
  name: string;
  zone: string;
  type: 'Cardio' | 'Strength' | 'Free Weights' | 'Functional' | 'Machines';
  currentUsage: number; // 0-100 %
  avgWaitTime: number; // minutes
  peakUsage: number; // hour (24h)
  status: 'Available' | 'Busy' | 'Full' | 'Maintenance';
  trend: 'rising' | 'falling' | 'stable';
  image: string; // icon/emoji
}

export interface ZoneHeatData {
  zone: string;
  occupancy: number;
  capacity: number;
  trend: string;
  bestTime: string;
}

export const equipment: Equipment[] = [
  { id: 'EQ001', name: 'Treadmill 1', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 85, avgWaitTime: 8, peakUsage: 7, status: 'Busy', trend: 'rising', image: '🏃' },
  { id: 'EQ002', name: 'Treadmill 2', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 92, avgWaitTime: 12, peakUsage: 7, status: 'Full', trend: 'rising', image: '🏃' },
  { id: 'EQ003', name: 'Treadmill 3', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 60, avgWaitTime: 2, peakUsage: 18, status: 'Available', trend: 'falling', image: '🏃' },
  { id: 'EQ004', name: 'Spin Bike 1', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 100, avgWaitTime: 15, peakUsage: 8, status: 'Full', trend: 'rising', image: '🚴' },
  { id: 'EQ005', name: 'Spin Bike 2', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 45, avgWaitTime: 0, peakUsage: 17, status: 'Available', trend: 'falling', image: '🚴' },
  { id: 'EQ006', name: 'Rowing Machine', zone: 'Cardio Zone', type: 'Cardio', currentUsage: 30, avgWaitTime: 0, peakUsage: 6, status: 'Available', trend: 'stable', image: '🚣' },
  { id: 'EQ007', name: 'Squat Rack 1', zone: 'Free Weights', type: 'Free Weights', currentUsage: 95, avgWaitTime: 20, peakUsage: 17, status: 'Full', trend: 'rising', image: '🏋️' },
  { id: 'EQ008', name: 'Squat Rack 2', zone: 'Free Weights', type: 'Free Weights', currentUsage: 80, avgWaitTime: 10, peakUsage: 17, status: 'Busy', trend: 'rising', image: '🏋️' },
  { id: 'EQ009', name: 'Bench Press', zone: 'Free Weights', type: 'Free Weights', currentUsage: 75, avgWaitTime: 8, peakUsage: 18, status: 'Busy', trend: 'rising', image: '🛋️' },
  { id: 'EQ010', name: 'Deadlift Platform', zone: 'Free Weights', type: 'Free Weights', currentUsage: 50, avgWaitTime: 3, peakUsage: 6, status: 'Available', trend: 'stable', image: '⚡' },
  { id: 'EQ011', name: 'Dumbbells 5-25kg', zone: 'Free Weights', type: 'Free Weights', currentUsage: 40, avgWaitTime: 0, peakUsage: 18, status: 'Available', trend: 'falling', image: '🏋️' },
  { id: 'EQ012', name: 'Cable Machine', zone: 'Strength Zone', type: 'Strength', currentUsage: 70, avgWaitTime: 5, peakUsage: 17, status: 'Busy', trend: 'stable', image: '🔗' },
  { id: 'EQ013', name: 'Lat Pulldown', zone: 'Strength Zone', type: 'Strength', currentUsage: 35, avgWaitTime: 0, peakUsage: 9, status: 'Available', trend: 'falling', image: '🔽' },
  { id: 'EQ014', name: 'Leg Press', zone: 'Strength Zone', type: 'Strength', currentUsage: 88, avgWaitTime: 12, peakUsage: 17, status: 'Busy', trend: 'rising', image: '🦵' },
  { id: 'EQ015', name: 'Chest Press', zone: 'Strength Zone', type: 'Strength', currentUsage: 55, avgWaitTime: 2, peakUsage: 18, status: 'Available', trend: 'stable', image: '💪' },
  { id: 'EQ016', name: 'Smith Machine', zone: 'Strength Zone', type: 'Strength', currentUsage: 0, avgWaitTime: 0, peakUsage: 10, status: 'Maintenance', trend: 'stable', image: '🔧' },
  { id: 'EQ017', name: 'Kettlebells', zone: 'Functional Zone', type: 'Functional', currentUsage: 20, avgWaitTime: 0, peakUsage: 6, status: 'Available', trend: 'stable', image: '🔔' },
  { id: 'EQ018', name: 'Battle Ropes', zone: 'Functional Zone', type: 'Functional', currentUsage: 15, avgWaitTime: 0, peakUsage: 7, status: 'Available', trend: 'falling', image: '🪢' },
  { id: 'EQ019', name: 'TRX Bands', zone: 'Functional Zone', type: 'Functional', currentUsage: 10, avgWaitTime: 0, peakUsage: 17, status: 'Available', trend: 'stable', image: '🎽' },
  { id: 'EQ020', name: 'Plyo Boxes', zone: 'Functional Zone', type: 'Functional', currentUsage: 25, avgWaitTime: 0, peakUsage: 6, status: 'Available', trend: 'stable', image: '📦' },
];

export const zoneHeatData: ZoneHeatData[] = [
  { zone: 'Cardio Zone', occupancy: 72, capacity: 100, trend: 'Busy now — 2 treadmills full', bestTime: '2 PM - 4 PM' },
  { zone: 'Free Weights', occupancy: 85, capacity: 100, trend: 'Very busy — squat racks have 20min wait', bestTime: '6 AM - 8 AM' },
  { zone: 'Strength Zone', occupancy: 58, capacity: 100, trend: 'Moderate — Smith Machine under maintenance', bestTime: '10 AM - 12 PM' },
  { zone: 'Functional Zone', occupancy: 18, capacity: 100, trend: 'Mostly empty — best time to train!', bestTime: 'Any time before 4 PM' },
];

export const hourlyData = [
  { hour: '6AM', cardio: 45, weights: 60, strength: 30, functional: 10 },
  { hour: '7AM', cardio: 75, weights: 85, strength: 50, functional: 20 },
  { hour: '8AM', cardio: 65, weights: 70, strength: 45, functional: 15 },
  { hour: '9AM', cardio: 40, weights: 55, strength: 40, functional: 10 },
  { hour: '10AM', cardio: 30, weights: 40, strength: 35, functional: 10 },
  { hour: '11AM', cardio: 25, weights: 35, strength: 30, functional: 10 },
  { hour: '12PM', cardio: 30, weights: 30, strength: 25, functional: 10 },
  { hour: '1PM', cardio: 25, weights: 25, strength: 20, functional: 5 },
  { hour: '2PM', cardio: 20, weights: 20, strength: 15, functional: 5 },
  { hour: '3PM', cardio: 25, weights: 25, strength: 20, functional: 10 },
  { hour: '4PM', cardio: 40, weights: 45, strength: 35, functional: 15 },
  { hour: '5PM', cardio: 70, weights: 80, strength: 60, functional: 25 },
  { hour: '6PM', cardio: 85, weights: 90, strength: 75, functional: 35 },
  { hour: '7PM', cardio: 90, weights: 95, strength: 80, functional: 40 },
  { hour: '8PM', cardio: 75, weights: 80, strength: 65, functional: 30 },
  { hour: '9PM', cardio: 50, weights: 55, strength: 40, functional: 15 },
];
