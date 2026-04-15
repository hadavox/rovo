import { useRef, useCallback } from 'react';

// All audio is synthesized via Web Audio API — no files needed, works offline.
export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }

  function beep(freq: number, durationMs: number, gainVal = 0.25, type: OscillatorType = 'sine') {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + durationMs / 1000 + 0.05);
    } catch (_) {
      // Silently ignore audio errors (e.g., user hasn't interacted yet)
    }
  }

  const countdownTick = useCallback(() => {
    beep(880, 80, 0.2);
  }, []);

  const workTransition = useCallback(() => {
    // Two-tone: short high then medium
    beep(1047, 120, 0.3); // C6
    setTimeout(() => beep(1319, 200, 0.3), 130); // E6
  }, []);

  const restTransition = useCallback(() => {
    beep(523, 200, 0.2); // C5
  }, []);

  const workoutComplete = useCallback(() => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => beep(freq, 300, 0.3), i * 160);
    });
  }, []);

  return { countdownTick, workTransition, restTransition, workoutComplete };
}
