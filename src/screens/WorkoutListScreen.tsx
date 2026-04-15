import { useState } from 'react';
import { WORKOUTS, Workout, WorkoutCategory, Difficulty } from '../data/workouts';
import './WorkoutListScreen.css';

interface Props {
  initialCategory: WorkoutCategory | 'all';
  onBack: () => void;
  onStart: (workout: Workout) => void;
}

const CATEGORY_LABELS: Record<WorkoutCategory | 'all', string> = {
  all: 'All Workouts',
  strength: 'Strength',
  mobility: 'Mobility',
  mixed: 'Both',
};

const DIFF_LABEL: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const DIFF_DOTS: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };

export function WorkoutListScreen({ initialCategory, onBack, onStart }: Props) {
  const [category, setCategory] = useState<WorkoutCategory | 'all'>(initialCategory);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const filtered = WORKOUTS.filter((w) => {
    if (category !== 'all' && w.category !== category) return false;
    if (difficulty !== 'all' && w.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <div className="list-screen">
      <header className="list-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="list-title">{CATEGORY_LABELS[category]}</h1>
      </header>

      <div className="list-filters">
        <div className="filter-row">
          {(['all', 'strength', 'mobility', 'mixed'] as const).map((c) => (
            <button
              key={c}
              className={`filter-chip ${category === c ? 'filter-chip--active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <div className="filter-row">
          {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              className={`filter-chip ${difficulty === d ? 'filter-chip--active' : ''}`}
              onClick={() => setDifficulty(d)}
            >
              {d === 'all' ? 'Any level' : DIFF_LABEL[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="list-body">
        {filtered.length === 0 && (
          <p className="list-empty">No workouts match these filters.</p>
        )}
        {filtered.map((w) => (
          <button key={w.id} className={`workout-card workout-card--${w.category}`} onClick={() => onStart(w)}>
            <div className="workout-card__top">
              <span className="workout-card__name">{w.name}</span>
              <span className={`workout-card__badge badge--${w.category}`}>
                {CATEGORY_LABELS[w.category]}
              </span>
            </div>
            <p className="workout-card__desc">{w.description}</p>
            <div className="workout-card__meta">
              <span className="meta-item">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {w.durationMinutes} min
              </span>
              <span className="meta-item difficulty-dots">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`dot ${n <= DIFF_DOTS[w.difficulty] ? 'dot--on' : ''}`}
                  />
                ))}
                <span className="diff-label">{DIFF_LABEL[w.difficulty]}</span>
              </span>
              <span className="meta-item">
                {w.steps.length} exercises
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
