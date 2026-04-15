import { useMemo } from 'react';
import { Workout } from '../data/workouts';
import { EXERCISES } from '../data/exercises';
import { useWorkoutTimer, Phase } from '../hooks/useWorkoutTimer';
import { ExerciseDemo } from '../components/ExerciseDemo';
import './WorkoutScreen.css';

interface Props {
  workout: Workout;
  onDone: () => void;
}

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(s: number): string {
  if (s >= 60) return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  return String(s);
}

function formatElapsed(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

const PHASE_LABELS: Record<Phase, string> = {
  intro: 'GET READY',
  work: 'WORK',
  rest: 'REST',
  complete: 'DONE',
};

export function WorkoutScreen({ workout, onDone }: Props) {
  const { state, toggle, skip } = useWorkoutTimer(workout);
  const { phase, stepIndex, timeLeft, totalTime, isPaused, elapsedSeconds } = state;

  const currentStep = workout.steps[stepIndex];
  const currentExercise = currentStep ? EXERCISES[currentStep.exerciseId] : null;

  const nextStep = workout.steps[stepIndex + 1];
  const nextExercise = nextStep ? EXERCISES[nextStep.exerciseId] : null;

  // During rest, show what's coming next
  const upNextExercise = phase === 'rest' ? nextExercise : (phase === 'work' && currentStep?.rest === 0 ? nextExercise : null);

  const progress = useMemo(() => {
    if (totalTime === 0) return 1;
    return (totalTime - timeLeft) / totalTime;
  }, [timeLeft, totalTime]);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const cueIndex = useMemo(() => {
    if (!currentExercise) return 0;
    // rotate cue every 10 seconds
    return Math.floor((totalTime - timeLeft) / 10) % currentExercise.cues.length;
  }, [currentExercise, timeLeft, totalTime]);

  // ─── Complete screen ──────────────────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div className="workout-screen workout-screen--complete">
        <div className="complete-content">
          <div className="complete-check">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="#d4ff3d" strokeWidth="2"/>
              <path d="M16 28l9 9 15-15" stroke="#d4ff3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="complete-title">Done.</h2>
          <p className="complete-workout-name">{workout.name}</p>
          <p className="complete-time">{formatElapsed(elapsedSeconds)}</p>
          <p className="complete-steps">{workout.steps.length} exercises complete</p>
          <button className="complete-btn" onClick={onDone}>Back to home</button>
        </div>
      </div>
    );
  }

  const phaseClass = phase === 'work' ? 'phase--work' : phase === 'rest' ? 'phase--rest' : '';

  return (
    <div className={`workout-screen ${phaseClass}`}>

      {/* ─── Top bar ──────────────────────────────────────────────────────── */}
      <div className="workout-topbar">
        <span className="workout-progress-label">
          {phase === 'intro' ? workout.name : `${stepIndex + 1} / ${workout.steps.length}`}
        </span>
        <div className="workout-progress-track">
          <div
            className="workout-progress-fill"
            style={{
              width: `${phase === 'intro' ? 0 : ((stepIndex + (phase === 'rest' ? 1 : 0)) / workout.steps.length) * 100}%`,
            }}
          />
        </div>
        <button className="quit-btn" onClick={onDone} aria-label="Quit workout">
          ✕
        </button>
      </div>

      {/* ─── Timer ────────────────────────────────────────────────────────── */}
      <div className="timer-section">
        <div className="phase-label">{PHASE_LABELS[phase]}</div>

        <div className="timer-ring-wrap">
          <svg className="timer-ring" viewBox="0 0 200 200" fill="none">
            {/* Track */}
            <circle
              cx="100" cy="100" r={RADIUS}
              stroke="#1e1e1e"
              strokeWidth="6"
            />
            {/* Progress arc */}
            <circle
              cx="100" cy="100" r={RADIUS}
              stroke={phase === 'rest' ? 'var(--mobility)' : 'var(--accent)'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.4s' }}
            />
          </svg>
          <div className="timer-number">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* ─── Exercise info ────────────────────────────────────────────────── */}
      <div className="exercise-section">
        {phase === 'intro' ? (
          <p className="exercise-name exercise-name--intro">Get into position</p>
        ) : phase === 'rest' ? (
          <>
            <p className="exercise-name">Rest</p>
            {upNextExercise && (
              <p className="next-up-label">UP NEXT: {upNextExercise.name}</p>
            )}
          </>
        ) : (
          <>
            <p className="exercise-name">{currentExercise?.name}</p>
            {currentExercise && (
              <p className="exercise-cue">{currentExercise.cues[cueIndex]}</p>
            )}
          </>
        )}
      </div>

      {/* ─── Demo animation ───────────────────────────────────────────────── */}
      {currentExercise && phase === 'work' && (
        <div className="demo-section">
          <ExerciseDemo animationKey={currentExercise.animation} size={148} />
        </div>
      )}

      {/* ─── Next up ──────────────────────────────────────────────────────── */}
      {phase === 'work' && nextExercise && currentStep && currentStep.rest > 0 && (
        <div className="next-section">
          <span className="next-label">NEXT</span>
          <span className="next-name">{nextExercise.name}</span>
        </div>
      )}

      {/* ─── Controls ─────────────────────────────────────────────────────── */}
      <div className="workout-controls">
        <button className="ctrl-btn ctrl-btn--pause" onClick={toggle} aria-label={isPaused ? 'Resume' : 'Pause'}>
          {isPaused ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="4" height="18"/>
              <rect x="15" y="3" width="4" height="18"/>
            </svg>
          )}
        </button>

        <button className="ctrl-btn ctrl-btn--skip" onClick={skip} aria-label="Skip">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 17,12 5,21"/>
            <rect x="18" y="3" width="3" height="18"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
