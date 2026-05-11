import { useState, Component, ReactNode } from 'react';
import { Workout, WorkoutCategory } from './data/workouts';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutListScreen } from './screens/WorkoutListScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';

class ErrorBoundary extends Component<{ children: ReactNode }, { crashed: boolean }> {
  state = { crashed: false };
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Something went wrong.</p>
          <button
            style={{ background: 'var(--accent)', color: '#0d0d0d', border: 'none', borderRadius: '100px', padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

type Screen =
  | { id: 'home' }
  | { id: 'list'; category: WorkoutCategory | 'all' }
  | { id: 'workout'; workout: Workout };

function AppScreens() {
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

export default function App() {
  return (
    <ErrorBoundary>
      <AppScreens />
    </ErrorBoundary>
  );
}
