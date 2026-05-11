import { useState } from 'react';
import { BaseChallenge } from '../data/challenges';
import { EXERCISES } from '../data/exercises';
import './ChallengeConfigScreen.css';

interface Props {
  challenge: BaseChallenge;
  onBack: () => void;
  onStart: (reps: number | undefined, cycleEveryDays: number) => void;
}

const CYCLE_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: 'Every day' },
  { value: 2, label: 'Every 2 days' },
  { value: 3, label: 'Every 3 days' },
];

export function ChallengeConfigScreen({ challenge, onBack, onStart }: Props) {
  const [reps, setReps] = useState(challenge.defaultReps ?? 10);
  const [cycle, setCycle] = useState(1);

  const exercise = challenge.exerciseId ? EXERCISES[challenge.exerciseId] : null;

  function adjustReps(delta: number) {
    setReps((r) => Math.max(1, r + delta));
  }

  return (
    <div className="config-screen">
      <div className="config-topbar">
        <button className="config-back-btn" onClick={onBack} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="config-topbar-title">Configure</span>
      </div>

      <div className="config-content">
        <div className="config-header">
          <h1 className="config-challenge-name">{challenge.name}</h1>
          <p className="config-challenge-desc">{challenge.description}</p>
          <span className="config-duration-badge">{challenge.durationDays} days</span>
        </div>

        <div className="config-rows">
          {challenge.type === 'exercise' && exercise && (
            <div className="config-row">
              <span className="config-row-label">Daily {exercise.name.toLowerCase()}s</span>
              <div className="config-reps-control">
                <button
                  className="config-reps-btn"
                  onClick={() => adjustReps(-5)}
                  aria-label="Decrease reps"
                >−</button>
                <span className="config-reps-value">{reps}</span>
                <button
                  className="config-reps-btn"
                  onClick={() => adjustReps(5)}
                  aria-label="Increase reps"
                >+</button>
              </div>
            </div>
          )}

          <div className="config-row config-row--cycle">
            <span className="config-row-label">Repeat</span>
            <div className="config-cycle-options">
              {CYCLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`config-cycle-btn${cycle === opt.value ? ' config-cycle-btn--active' : ''}`}
                  onClick={() => setCycle(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="config-summary">
          <p className="config-summary-text">
            {challenge.type === 'exercise' && exercise
              ? `${reps} ${exercise.name.toLowerCase()}s`
              : challenge.name
            }
            {' '}· {CYCLE_OPTIONS.find((o) => o.value === cycle)?.label.toLowerCase()} · {challenge.durationDays} days
          </p>
        </div>
      </div>

      <div className="config-footer">
        <button
          className="config-start-btn"
          onClick={() => onStart(challenge.type === 'exercise' ? reps : undefined, cycle)}
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
}
