export type ExerciseType = 'strength' | 'mobility';

export type AnimationKey =
  | 'pushup'
  | 'squat'
  | 'lunge'
  | 'plank'
  | 'mountain-climber'
  | 'hip-hinge'
  | 'floor-mobility'
  | 'standing-mobility';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  animation: AnimationKey;
  cues: [string, string, string];
}

export const EXERCISES: Record<string, Exercise> = {
  // ─── Strength ───────────────────────────────────────────────
  pushup: {
    id: 'pushup',
    name: 'Push-ups',
    type: 'strength',
    animation: 'pushup',
    cues: ['Hands shoulder-width apart', 'Chest touches the floor', 'Elbows track at 45°'],
  },
  pike_pushup: {
    id: 'pike_pushup',
    name: 'Pike Push-ups',
    type: 'strength',
    animation: 'pushup',
    cues: ['Hips high, inverted V', 'Lower crown toward floor', 'Press back to start'],
  },
  squat: {
    id: 'squat',
    name: 'Squats',
    type: 'strength',
    animation: 'squat',
    cues: ['Feet shoulder-width, toes out slightly', 'Drive knees out over toes', 'Chest up throughout'],
  },
  jump_squat: {
    id: 'jump_squat',
    name: 'Jump Squats',
    type: 'strength',
    animation: 'squat',
    cues: ['Land with soft knees', 'Full depth on every rep', 'Absorb landing quietly'],
  },
  reverse_lunge: {
    id: 'reverse_lunge',
    name: 'Reverse Lunges',
    type: 'strength',
    animation: 'lunge',
    cues: ['Step straight back', 'Front knee stays over ankle', 'Back knee lightly touches floor'],
  },
  glute_bridge: {
    id: 'glute_bridge',
    name: 'Glute Bridges',
    type: 'strength',
    animation: 'hip-hinge',
    cues: ['Feet flat, hip-width apart', 'Drive hips to ceiling', 'Squeeze hard at the top'],
  },
  mountain_climber: {
    id: 'mountain_climber',
    name: 'Mountain Climbers',
    type: 'strength',
    animation: 'mountain-climber',
    cues: ['Hips level with shoulders', 'Drive knees toward chest', 'Keep pace controlled'],
  },
  plank: {
    id: 'plank',
    name: 'Plank Hold',
    type: 'strength',
    animation: 'plank',
    cues: ['Straight line: head to heel', 'Brace your core hard', 'Breathe steady, stay still'],
  },
  side_plank: {
    id: 'side_plank',
    name: 'Side Plank',
    type: 'strength',
    animation: 'plank',
    cues: ['Stack feet or stagger them', 'Lift hips — no sagging', 'Switch sides halfway through'],
  },
  superman: {
    id: 'superman',
    name: 'Superman Hold',
    type: 'strength',
    animation: 'hip-hinge',
    cues: ['Lie face down, arms forward', 'Lift arms, chest, and legs', 'Hold 2 seconds at the top'],
  },

  // ─── Mobility ───────────────────────────────────────────────
  hip_circles: {
    id: 'hip_circles',
    name: 'Hip Circles',
    type: 'mobility',
    animation: 'standing-mobility',
    cues: ['Wide stance, hands on hips', 'Make big slow circles', 'Reverse direction halfway'],
  },
  worlds_greatest: {
    id: 'worlds_greatest',
    name: "World's Greatest Stretch",
    type: 'mobility',
    animation: 'lunge',
    cues: ['Lunge forward, back knee down', 'Same-side elbow to floor', 'Rotate arm to the sky'],
  },
  cat_cow: {
    id: 'cat_cow',
    name: 'Cat-Cow',
    type: 'mobility',
    animation: 'floor-mobility',
    cues: ['Hands and knees, neutral spine', 'Exhale: arch back up like a cat', 'Inhale: drop belly, lift head'],
  },
  thoracic_rotation: {
    id: 'thoracic_rotation',
    name: 'Thoracic Rotation',
    type: 'mobility',
    animation: 'standing-mobility',
    cues: ['Seated or kneeling', 'Hand behind head, elbow leads', 'Follow with your eyes'],
  },
  hip_flexor_stretch: {
    id: 'hip_flexor_stretch',
    name: 'Hip Flexor Stretch',
    type: 'mobility',
    animation: 'lunge',
    cues: ['Kneeling lunge, back knee down', 'Drive hips forward gently', 'Squeeze the back glute'],
  },
  downward_dog: {
    id: 'downward_dog',
    name: 'Downward Dog',
    type: 'mobility',
    animation: 'floor-mobility',
    cues: ['Push hips to ceiling', 'Pedal the heels alternately', 'Long spine, not rounded'],
  },
  shoulder_rolls: {
    id: 'shoulder_rolls',
    name: 'Shoulder Rolls + Reach',
    type: 'mobility',
    animation: 'standing-mobility',
    cues: ['Big backward circles first', 'Let the arms go loose', 'Finish with overhead reach'],
  },
  hamstring_stretch: {
    id: 'hamstring_stretch',
    name: 'Standing Hamstring Stretch',
    type: 'mobility',
    animation: 'standing-mobility',
    cues: ['Hinge at hips, soft knee', 'Feel the pull, not pain', 'Hold 30s each side'],
  },
  pigeon_stretch: {
    id: 'pigeon_stretch',
    name: 'Pigeon Stretch',
    type: 'mobility',
    animation: 'floor-mobility',
    cues: ['Shin parallel or angled to mat', 'Hips squared to the floor', 'Walk hands forward to deepen'],
  },
  spinal_twist: {
    id: 'spinal_twist',
    name: 'Supine Spinal Twist',
    type: 'mobility',
    animation: 'floor-mobility',
    cues: ['Lie on back, knee across', 'Both shoulders stay down', 'Breathe into the stretch'],
  },
};
