import { WorkoutCategory } from '../data/workouts';
import './HomeScreen.css';

interface Props {
  onSelect: (category: WorkoutCategory | 'all') => void;
}

const FOCUS_OPTIONS: { key: WorkoutCategory; label: string; sub: string }[] = [
  { key: 'strength', label: 'Strength',  sub: 'Push, squat, brace' },
  { key: 'mobility', label: 'Mobility',  sub: 'Stretch, open, loosen' },
  { key: 'mixed',    label: 'Both',      sub: 'Strength + mobility' },
];

export function HomeScreen({ onSelect }: Props) {
  return (
    <div className="home">
      <header className="home-header">
        <span className="home-logo">ROVO</span>
        <span className="home-tagline">No gym. No noise.</span>
      </header>

      <main className="home-main">
        <p className="home-question">What's the focus today?</p>
        <div className="home-options">
          {FOCUS_OPTIONS.map(({ key, label, sub }) => (
            <button
              key={key}
              className={`focus-card focus-card--${key}`}
              onClick={() => onSelect(key)}
            >
              <span className="focus-card__label">{label}</span>
              <span className="focus-card__sub">{sub}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="home-footer">
        <button className="all-workouts-btn" onClick={() => onSelect('all')}>
          Browse all workouts
        </button>
      </footer>
    </div>
  );
}
