import { useState } from 'react';
import { BASE_CHALLENGES } from '../data/challenges';
import { EXERCISES } from '../data/exercises';
import { WORKOUTS, Workout } from '../data/workouts';
import {
  ActiveChallenge,
  currentStreak,
  expectedSessionDates,
  isComplete,
  isDoneToday,
  isDueToday,
  nextDueDate,
  todayStr,
} from '../hooks/useChallenges';
import './ChallengeDetailScreen.css';

interface Props {
  active: ActiveChallenge;
  onBack: () => void;
  onAbandon: () => void;
  onMarkDone: (dateStr: string) => void;
  onStartWorkout: (workout: Workout) => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export function ChallengeDetailScreen({ active, onBack, onAbandon, onMarkDone, onStartWorkout }: Props) {
  const base = BASE_CHALLENGES.find((c) => c.id === active.challengeId);
  const [repsDone, setRepsDone] = useState(active.reps ?? 10);
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);

  if (!base) {
    return (
      <div className="detail-screen">
        <button className="detail-back-btn" onClick={onBack}>← Back</button>
        <p style={{ color: 'var(--text-muted)', padding: '24px' }}>Challenge not found.</p>
      </div>
    );
  }

  const sessions = expectedSessionDates(active, base.durationDays);
  const done = new Set(active.completedDates);
  const streak = currentStreak(active, base.durationDays);
  const completed = isComplete(active, base.durationDays);
  const dueToday = isDueToday(active, base.durationDays);
  const doneToday = isDoneToday(active);
  const today = todayStr();
  const next = nextDueDate(active, base.durationDays);

  const exercise = base.exerciseId ? EXERCISES[base.exerciseId] : null;
  const workout = base.workoutId ? WORKOUTS.find((w) => w.id === base.workoutId) : null;

  function adjustReps(delta: number) {
    setRepsDone((r) => Math.max(1, r + delta));
  }

  return (
    <div className="detail-screen">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="detail-back-btn" onClick={onBack} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="detail-challenge-name">{base.name}</span>
        {!completed && (
          <button className="detail-abandon-btn" onClick={() => setShowAbandonConfirm(true)}>
            Abandon
          </button>
        )}
      </div>

      <div className="detail-content">
        {/* Progress dots */}
        <div className="detail-dots-wrap">
          <div className="detail-dots">
            {sessions.map((d) => {
              const isDone = done.has(d);
              const isCurrent = d === today && dueToday;
              const isFuture = d > today;
              return (
                <span
                  key={d}
                  className={`detail-dot${isDone ? ' detail-dot--done' : ''}${isCurrent ? ' detail-dot--current' : ''}${isFuture ? ' detail-dot--future' : ''}`}
                  title={formatDate(d)}
                />
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="detail-stats">
          <div className="detail-stat">
            <span className="detail-stat-value">{streak}</span>
            <span className="detail-stat-label">streak</span>
          </div>
          <div className="detail-stat-divider" />
          <div className="detail-stat">
            <span className="detail-stat-value">{active.completedDates.length}</span>
            <span className="detail-stat-label">done</span>
          </div>
          <div className="detail-stat-divider" />
          <div className="detail-stat">
            <span className="detail-stat-value">{sessions.length - active.completedDates.length}</span>
            <span className="detail-stat-label">left</span>
          </div>
        </div>

        {/* Today's action */}
        <div className="detail-action-card">
          {completed ? (
            <div className="detail-complete">
              <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="27" stroke="var(--accent)" strokeWidth="2"/>
                <path d="M16 28l9 9 15-15" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="detail-complete-text">Challenge complete!</p>
            </div>
          ) : !dueToday ? (
            <div className="detail-not-due">
              <p className="detail-not-due-label">Next session</p>
              <p className="detail-not-due-date">{next ? formatDate(next) : '—'}</p>
            </div>
          ) : doneToday ? (
            <div className="detail-done-today">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <p className="detail-done-label">Done for today</p>
            </div>
          ) : base.type === 'exercise' && exercise ? (
            <div className="detail-rep-logger">
              <p className="detail-rep-target-label">Today's {exercise.name.toLowerCase()}s</p>
              <div className="detail-rep-control">
                <button className="detail-rep-btn" onClick={() => adjustReps(-1)} aria-label="Decrease">−</button>
                <span className="detail-rep-value">{repsDone}</span>
                <button className="detail-rep-btn" onClick={() => adjustReps(1)} aria-label="Increase">+</button>
              </div>
              <p className="detail-rep-target">Target: {active.reps}</p>
              <button className="detail-action-btn" onClick={() => onMarkDone(today)}>
                Mark done
              </button>
            </div>
          ) : workout ? (
            <div className="detail-workout-action">
              <p className="detail-workout-label">Today's workout</p>
              <p className="detail-workout-name">{workout.name}</p>
              <button className="detail-action-btn" onClick={() => onStartWorkout(workout)}>
                Start workout →
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Abandon confirmation */}
      {showAbandonConfirm && (
        <div className="detail-abandon-overlay">
          <div className="detail-abandon-dialog">
            <p className="detail-abandon-dialog-text">Abandon this challenge? Your progress will be lost.</p>
            <div className="detail-abandon-dialog-actions">
              <button className="detail-abandon-dialog-cancel" onClick={() => setShowAbandonConfirm(false)}>
                Keep going
              </button>
              <button className="detail-abandon-dialog-confirm" onClick={onAbandon}>
                Abandon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
