import { useState } from 'react';
import { Workout, WorkoutCategory } from './data/workouts';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutListScreen } from './screens/WorkoutListScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';

type Screen =
  | { id: 'home' }
  | { id: 'list'; category: WorkoutCategory | 'all' }
  | { id: 'workout'; workout: Workout };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ id: 'home' });

  if (screen.id === 'home') {
    return (
      <HomeScreen
        onSelect={(category) => setScreen({ id: 'list', category })}
      />
    );
  }

  if (screen.id === 'list') {
    return (
      <WorkoutListScreen
        initialCategory={screen.category}
        onBack={() => setScreen({ id: 'home' })}
        onStart={(workout) => setScreen({ id: 'workout', workout })}
      />
    );
  }

  return (
    <WorkoutScreen
      workout={screen.workout}
      onDone={() => setScreen({ id: 'home' })}
    />
  );
}
