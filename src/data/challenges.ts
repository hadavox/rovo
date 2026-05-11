import { EXERCISES } from './exercises';
import { WORKOUTS } from './workouts';

export type ChallengeType = 'exercise' | 'workout';

export interface BaseChallenge {
  id: string;
  name: string;
  description: string;
  type: ChallengeType;
  durationDays: number;
  exerciseId?: string;
  defaultReps?: number;
  workoutId?: string;
}

export const BASE_CHALLENGES: BaseChallenge[] = [
  {
    id: 'pushup-challenge',
    name: 'Push-up Challenge',
    description: 'Build upper body strength one day at a time. Hit your daily rep target consistently.',
    type: 'exercise',
    durationDays: 30,
    exerciseId: 'pushup',
    defaultReps: 20,
  },
  {
    id: 'squat-challenge',
    name: 'Squat Challenge',
    description: 'Strengthen your legs and glutes with a daily squat goal. Simple, effective.',
    type: 'exercise',
    durationDays: 30,
    exerciseId: 'squat',
    defaultReps: 30,
  },
  {
    id: 'lunge-challenge',
    name: 'Lunge Challenge',
    description: 'Two weeks of lunges to build balance, strength, and stability.',
    type: 'exercise',
    durationDays: 14,
    exerciseId: 'reverse_lunge',
    defaultReps: 20,
  },
  {
    id: 'morning-flow-challenge',
    name: '7-Day Morning Flow',
    description: 'Start every morning with mobility. Seven days to build the habit.',
    type: 'workout',
    durationDays: 7,
    workoutId: 'morning-flow',
  },
  {
    id: 'daily-driver-challenge',
    name: '21-Day Daily Driver',
    description: 'Three weeks of the daily driver. Mobility + strength, every day.',
    type: 'workout',
    durationDays: 21,
    workoutId: 'daily-driver',
  },
  {
    id: 'dad-strength-challenge',
    name: '30-Day Dad Strength',
    description: 'A month of functional strength. Real-life strong, one workout at a time.',
    type: 'workout',
    durationDays: 30,
    workoutId: 'dad-strength',
  },
];

if (import.meta.env.DEV) {
  for (const c of BASE_CHALLENGES) {
    if (c.type === 'exercise' && c.exerciseId && !EXERCISES[c.exerciseId]) {
      throw new Error(`Challenge "${c.name}" references unknown exerciseId: "${c.exerciseId}"`);
    }
    if (c.type === 'workout' && c.workoutId && !WORKOUTS.find((w) => w.id === c.workoutId)) {
      throw new Error(`Challenge "${c.name}" references unknown workoutId: "${c.workoutId}"`);
    }
  }
}
