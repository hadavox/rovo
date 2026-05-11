import { useState, Component, ReactNode } from 'react';
import { Workout, WorkoutCategory } from './data/workouts';
import { BaseChallenge } from './data/challenges';
import { useChallenges, todayStr } from './hooks/useChallenges';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutListScreen } from './screens/WorkoutListScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { ChallengesScreen } from './screens/ChallengesScreen';
import { ChallengeConfigScreen } from './screens/ChallengeConfigScreen';
import { ChallengeDetailScreen } from './screens/ChallengeDetailScreen';

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
  | { id: 'workout'; workout: Workout }
  | { id: 'challenges' }
  | { id: 'challenge-config'; challenge: BaseChallenge }
  | { id: 'challenge-detail'; instanceId: string }
  | { id: 'challenge-workout'; workout: Workout; instanceId: string };

function AppScreens() {
  const [screen, setScreen] = useState<Screen>({ id: 'home' });
  const { activeChallenges, startChallenge, markDone, abandon } = useChallenges();

  if (screen.id === 'home') {
    return (
      <HomeScreen
        onSelect={(category) => setScreen({ id: 'list', category })}
        onChallenges={() => setScreen({ id: 'challenges' })}
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

  if (screen.id === 'workout') {
    return (
      <WorkoutScreen
        workout={screen.workout}
        onDone={() => setScreen({ id: 'home' })}
      />
    );
  }

  if (screen.id === 'challenges') {
    return (
      <ChallengesScreen
        activeChallenges={activeChallenges}
        onBack={() => setScreen({ id: 'home' })}
        onViewActive={(instanceId) => setScreen({ id: 'challenge-detail', instanceId })}
        onConfigure={(challenge) => setScreen({ id: 'challenge-config', challenge })}
      />
    );
  }

  if (screen.id === 'challenge-config') {
    return (
      <ChallengeConfigScreen
        challenge={screen.challenge}
        onBack={() => setScreen({ id: 'challenges' })}
        onStart={(reps, cycle) => {
          const instanceId = startChallenge(screen.challenge, reps, cycle);
          setScreen({ id: 'challenge-detail', instanceId });
        }}
      />
    );
  }

  if (screen.id === 'challenge-detail') {
    const active = activeChallenges.find((ac) => ac.instanceId === screen.instanceId);
    if (!active) return <HomeScreen onSelect={(c) => setScreen({ id: 'list', category: c })} onChallenges={() => setScreen({ id: 'challenges' })} />;
    return (
      <ChallengeDetailScreen
        active={active}
        onBack={() => setScreen({ id: 'challenges' })}
        onAbandon={() => {
          abandon(screen.instanceId);
          setScreen({ id: 'challenges' });
        }}
        onMarkDone={(dateStr) => markDone(screen.instanceId, dateStr)}
        onStartWorkout={(workout) => setScreen({ id: 'challenge-workout', workout, instanceId: screen.instanceId })}
      />
    );
  }

  if (screen.id === 'challenge-workout') {
    return (
      <WorkoutScreen
        workout={screen.workout}
        onDone={() => {
          markDone(screen.instanceId, todayStr());
          setScreen({ id: 'challenge-detail', instanceId: screen.instanceId });
        }}
      />
    );
  }

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppScreens />
    </ErrorBoundary>
  );
}
