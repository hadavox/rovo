import { useEffect, useRef, useState, useCallback } from 'react';
import { Workout } from '../data/workouts';
import { useAudio } from './useAudio';

export type Phase = 'intro' | 'work' | 'rest' | 'complete';

export interface TimerState {
  phase: Phase;
  stepIndex: number;       // index into workout.steps
  timeLeft: number;        // seconds remaining in current phase
  totalTime: number;       // total seconds in current phase
  isPaused: boolean;
  elapsedSeconds: number;  // total workout time elapsed
}

export function useWorkoutTimer(workout: Workout) {
  const { countdownTick, workTransition, restTransition, workoutComplete } = useAudio();

  const [state, setState] = useState<TimerState>({
    phase: 'intro',
    stepIndex: 0,
    timeLeft: 5,
    totalTime: 5,
    isPaused: false,
    elapsedSeconds: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function haptic(pattern: number | number[]) {
    try { navigator.vibrate(pattern); } catch (_) {}
  }

  function clearTick() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const advance = useCallback(() => {
    setState((prev) => {
      const { phase, stepIndex, timeLeft } = prev;
      const nextElapsed = prev.elapsedSeconds + 1;

      if (timeLeft > 1) {
        // Still counting down
        const newLeft = timeLeft - 1;
        // Countdown beep + haptic for last 5 seconds (but not on 'intro')
        if (newLeft <= 5 && phase !== 'intro') {
          countdownTick();
          haptic(30);
        }
        return { ...prev, timeLeft: newLeft, elapsedSeconds: nextElapsed };
      }

      // Time's up — transition to next phase
      if (phase === 'intro') {
        // Start first exercise work phase
        const step = workout.steps[0];
        workTransition();
        haptic([100, 50, 100]);
        return {
          ...prev,
          phase: 'work',
          stepIndex: 0,
          timeLeft: step.duration,
          totalTime: step.duration,
          elapsedSeconds: nextElapsed,
        };
      }

      if (phase === 'work') {
        const step = workout.steps[stepIndex];
        if (step.rest > 0) {
          restTransition();
          haptic([60]);
          return {
            ...prev,
            phase: 'rest',
            timeLeft: step.rest,
            totalTime: step.rest,
            elapsedSeconds: nextElapsed,
          };
        }
        // No rest — check if last step
        const nextIndex = stepIndex + 1;
        if (nextIndex >= workout.steps.length) {
          workoutComplete();
          haptic([200, 100, 200, 100, 300]);
          return { ...prev, phase: 'complete', timeLeft: 0, totalTime: 0, elapsedSeconds: nextElapsed };
        }
        // Advance to next step
        const nextStep = workout.steps[nextIndex];
        workTransition();
        haptic([100, 50, 100]);
        return {
          ...prev,
          phase: 'work',
          stepIndex: nextIndex,
          timeLeft: nextStep.duration,
          totalTime: nextStep.duration,
          elapsedSeconds: nextElapsed,
        };
      }

      if (phase === 'rest') {
        const nextIndex = stepIndex + 1;
        if (nextIndex >= workout.steps.length) {
          workoutComplete();
          haptic([200, 100, 200, 100, 300]);
          return { ...prev, phase: 'complete', timeLeft: 0, totalTime: 0, elapsedSeconds: nextElapsed };
        }
        const nextStep = workout.steps[nextIndex];
        workTransition();
        haptic([100, 50, 100]);
        return {
          ...prev,
          phase: 'work',
          stepIndex: nextIndex,
          timeLeft: nextStep.duration,
          totalTime: nextStep.duration,
          elapsedSeconds: nextElapsed,
        };
      }

      return prev; // complete — no-op
    });
  }, [workout, countdownTick, workTransition, restTransition, workoutComplete]);

  useEffect(() => {
    if (state.isPaused || state.phase === 'complete') {
      clearTick();
      return;
    }
    clearTick();
    intervalRef.current = setInterval(advance, 1000);
    return clearTick;
  }, [state.isPaused, state.phase, advance]);

  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const skip = useCallback(() => {
    setState((prev) => {
      const { phase, stepIndex } = prev;

      if (phase === 'intro') {
        const step = workout.steps[0];
        workTransition();
        haptic([100, 50, 100]);
        return { ...prev, phase: 'work', stepIndex: 0, timeLeft: step.duration, totalTime: step.duration };
      }

      if (phase === 'work') {
        const step = workout.steps[stepIndex];
        if (step.rest > 0) {
          restTransition();
          return { ...prev, phase: 'rest', timeLeft: step.rest, totalTime: step.rest };
        }
        const nextIndex = stepIndex + 1;
        if (nextIndex >= workout.steps.length) {
          workoutComplete();
          return { ...prev, phase: 'complete', timeLeft: 0, totalTime: 0 };
        }
        const nextStep = workout.steps[nextIndex];
        workTransition();
        haptic([100, 50, 100]);
        return { ...prev, phase: 'work', stepIndex: nextIndex, timeLeft: nextStep.duration, totalTime: nextStep.duration };
      }

      if (phase === 'rest') {
        const nextIndex = stepIndex + 1;
        if (nextIndex >= workout.steps.length) {
          workoutComplete();
          return { ...prev, phase: 'complete', timeLeft: 0, totalTime: 0 };
        }
        const nextStep = workout.steps[nextIndex];
        workTransition();
        haptic([100, 50, 100]);
        return { ...prev, phase: 'work', stepIndex: nextIndex, timeLeft: nextStep.duration, totalTime: nextStep.duration };
      }

      return prev;
    });
  }, [workout, workTransition, restTransition, workoutComplete]);

  return { state, toggle, skip };
}
