export type WorkoutCategory = 'strength' | 'mobility' | 'mixed';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface WorkoutStep {
  exerciseId: string;
  duration: number; // seconds of work
  rest: number;     // seconds of rest after (0 on last step)
}

export interface Workout {
  id: string;
  name: string;
  category: WorkoutCategory;
  difficulty: Difficulty;
  durationMinutes: number;
  description: string;
  steps: WorkoutStep[];
}

// Helper to compute display duration from steps
function totalSeconds(steps: WorkoutStep[]): number {
  return steps.reduce((sum, s) => sum + s.duration + s.rest, 0);
}

const WORKOUTS_RAW: Omit<Workout, 'durationMinutes'>[] = [
  // ─── Strength ───────────────────────────────────────────────
  {
    id: 'quick-burn',
    name: 'Quick Burn',
    category: 'strength',
    difficulty: 'easy',
    description: 'A fast, full-body circuit. Perfect when time is tight.',
    steps: [
      { exerciseId: 'squat',           duration: 40, rest: 20 },
      { exerciseId: 'pushup',          duration: 35, rest: 20 },
      { exerciseId: 'glute_bridge',    duration: 40, rest: 20 },
      { exerciseId: 'plank',           duration: 30, rest: 20 },
      { exerciseId: 'reverse_lunge',   duration: 40, rest: 20 },
      { exerciseId: 'superman',        duration: 30, rest: 20 },
      { exerciseId: 'squat',           duration: 40, rest: 20 },
      { exerciseId: 'pushup',          duration: 35, rest: 0  },
    ],
  },
  {
    id: 'morning-power',
    name: 'Morning Power',
    category: 'strength',
    difficulty: 'medium',
    description: 'Two rounds of five classics. Builds from lower to upper.',
    steps: [
      { exerciseId: 'squat',            duration: 45, rest: 15 },
      { exerciseId: 'reverse_lunge',    duration: 45, rest: 15 },
      { exerciseId: 'glute_bridge',     duration: 40, rest: 15 },
      { exerciseId: 'pushup',           duration: 40, rest: 15 },
      { exerciseId: 'plank',            duration: 40, rest: 20 },
      { exerciseId: 'squat',            duration: 45, rest: 15 },
      { exerciseId: 'reverse_lunge',    duration: 45, rest: 15 },
      { exerciseId: 'mountain_climber', duration: 30, rest: 15 },
      { exerciseId: 'pushup',           duration: 40, rest: 15 },
      { exerciseId: 'side_plank',       duration: 40, rest: 0  },
    ],
  },
  {
    id: 'upper-body',
    name: 'Upper Body Focus',
    category: 'strength',
    difficulty: 'hard',
    description: 'Push variations, core, and shoulders. Expect arm burn.',
    steps: [
      { exerciseId: 'pushup',           duration: 45, rest: 15 },
      { exerciseId: 'pike_pushup',      duration: 40, rest: 15 },
      { exerciseId: 'plank',            duration: 45, rest: 15 },
      { exerciseId: 'mountain_climber', duration: 35, rest: 15 },
      { exerciseId: 'pushup',           duration: 40, rest: 15 },
      { exerciseId: 'side_plank',       duration: 40, rest: 15 },
      { exerciseId: 'pike_pushup',      duration: 35, rest: 15 },
      { exerciseId: 'mountain_climber', duration: 35, rest: 15 },
      { exerciseId: 'pushup',           duration: 30, rest: 15 },
      { exerciseId: 'plank',            duration: 45, rest: 0  },
    ],
  },

  // ─── Mobility ───────────────────────────────────────────────
  {
    id: 'morning-flow',
    name: 'Morning Flow',
    category: 'mobility',
    difficulty: 'easy',
    description: 'Wake the body up. No sweat, just movement.',
    steps: [
      { exerciseId: 'shoulder_rolls',     duration: 40, rest: 10 },
      { exerciseId: 'cat_cow',            duration: 45, rest: 10 },
      { exerciseId: 'hip_circles',        duration: 40, rest: 10 },
      { exerciseId: 'thoracic_rotation',  duration: 40, rest: 10 },
      { exerciseId: 'hip_flexor_stretch', duration: 45, rest: 10 },
      { exerciseId: 'hamstring_stretch',  duration: 40, rest: 10 },
      { exerciseId: 'spinal_twist',       duration: 45, rest: 10 },
      { exerciseId: 'downward_dog',       duration: 45, rest: 0  },
    ],
  },
  {
    id: 'deep-stretch',
    name: 'Deep Stretch',
    category: 'mobility',
    difficulty: 'medium',
    description: 'Longer holds, deeper release. Good for evening too.',
    steps: [
      { exerciseId: 'cat_cow',             duration: 50, rest: 10 },
      { exerciseId: 'downward_dog',        duration: 50, rest: 10 },
      { exerciseId: 'worlds_greatest',     duration: 50, rest: 10 },
      { exerciseId: 'hip_flexor_stretch',  duration: 50, rest: 10 },
      { exerciseId: 'pigeon_stretch',      duration: 55, rest: 10 },
      { exerciseId: 'spinal_twist',        duration: 50, rest: 10 },
      { exerciseId: 'thoracic_rotation',   duration: 45, rest: 10 },
      { exerciseId: 'hamstring_stretch',   duration: 50, rest: 10 },
      { exerciseId: 'shoulder_rolls',      duration: 40, rest: 10 },
      { exerciseId: 'hip_circles',         duration: 45, rest: 0  },
    ],
  },

  // ─── Mixed ──────────────────────────────────────────────────
  {
    id: 'daily-driver',
    name: 'Daily Driver',
    category: 'mixed',
    difficulty: 'easy',
    description: 'Mobility warm-up into a light strength circuit. The default.',
    steps: [
      { exerciseId: 'cat_cow',           duration: 40, rest: 10 },
      { exerciseId: 'hip_circles',       duration: 40, rest: 10 },
      { exerciseId: 'squat',             duration: 40, rest: 15 },
      { exerciseId: 'pushup',            duration: 35, rest: 15 },
      { exerciseId: 'glute_bridge',      duration: 40, rest: 15 },
      { exerciseId: 'hamstring_stretch', duration: 40, rest: 10 },
      { exerciseId: 'plank',             duration: 30, rest: 15 },
      { exerciseId: 'spinal_twist',      duration: 40, rest: 0  },
    ],
  },
  {
    id: 'full-body-mix',
    name: 'Full Body Mix',
    category: 'mixed',
    difficulty: 'medium',
    description: 'Strength + mobility balanced. Leaves you loose and worked.',
    steps: [
      { exerciseId: 'worlds_greatest',   duration: 45, rest: 10 },
      { exerciseId: 'squat',             duration: 45, rest: 15 },
      { exerciseId: 'pushup',            duration: 40, rest: 15 },
      { exerciseId: 'hip_flexor_stretch',duration: 45, rest: 10 },
      { exerciseId: 'reverse_lunge',     duration: 45, rest: 15 },
      { exerciseId: 'mountain_climber',  duration: 30, rest: 15 },
      { exerciseId: 'downward_dog',      duration: 45, rest: 10 },
      { exerciseId: 'glute_bridge',      duration: 40, rest: 15 },
      { exerciseId: 'spinal_twist',      duration: 45, rest: 10 },
      { exerciseId: 'plank',             duration: 40, rest: 0  },
    ],
  },
  {
    id: 'dad-strength',
    name: 'Dad Strength',
    category: 'mixed',
    difficulty: 'medium',
    description: 'Functional strength for real life. Squat, push, brace, repeat.',
    steps: [
      { exerciseId: 'hip_circles',       duration: 40, rest: 10 },
      { exerciseId: 'squat',             duration: 45, rest: 15 },
      { exerciseId: 'reverse_lunge',     duration: 45, rest: 15 },
      { exerciseId: 'pushup',            duration: 40, rest: 15 },
      { exerciseId: 'glute_bridge',      duration: 40, rest: 15 },
      { exerciseId: 'superman',          duration: 35, rest: 15 },
      { exerciseId: 'plank',             duration: 40, rest: 15 },
      { exerciseId: 'cat_cow',           duration: 40, rest: 10 },
      { exerciseId: 'squat',             duration: 45, rest: 15 },
      { exerciseId: 'spinal_twist',      duration: 45, rest: 10 },
      { exerciseId: 'pushup',            duration: 35, rest: 15 },
      { exerciseId: 'hamstring_stretch', duration: 45, rest: 0  },
    ],
  },
];

export const WORKOUTS: Workout[] = WORKOUTS_RAW.map((w) => ({
  ...w,
  durationMinutes: Math.round(totalSeconds(w.steps) / 60),
}));
