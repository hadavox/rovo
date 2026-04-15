# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # tsc type-check + Vite production build (outputs to dist/)
npm run preview    # serve the production build locally
npx tsc --noEmit   # type-check only, no build
```

No test suite exists yet.

## Architecture

**Navigation model** — `App.tsx` holds a single `Screen` discriminated union (`home | list | workout`) and renders one of three screens based on it. There is no router library. All navigation is prop callbacks.

**Data layer** — `src/data/exercises.ts` is a static `Record<string, Exercise>` keyed by exercise ID. `src/data/workouts.ts` exports `WORKOUTS: Workout[]`, built from a raw array so `durationMinutes` is computed automatically from step durations. Workout steps reference exercises by string ID. There is no runtime validation — if an `exerciseId` in a step doesn't exist in `EXERCISES`, the workout screen silently renders nothing for that step.

**Timer** — `useWorkoutTimer` in `src/hooks/useWorkoutTimer.ts` owns all workout execution state. It uses a single `setInterval` (1 Hz) that calls `advance`, which uses the `setState` functional-update form so it never closes over stale state. The interval is controlled by a `useEffect` that depends on `state.isPaused`, `state.phase`, and the stable `advance` callback. Phase sequence: `intro (5s) → work → rest → work → … → complete`. A step with `rest: 0` skips the rest phase entirely; the last step of every workout should have `rest: 0`.

**Audio** — `useAudio` in `src/hooks/useAudio.ts` synthesizes all sounds via Web Audio API (no audio files). `AudioContext` is lazily initialised on first use to satisfy browser autoplay policy. Audio errors are silently swallowed.

**Exercise demos** — `ExerciseDemo.tsx` maps an `AnimationKey` to an inline SVG component with embedded `<style>` tags containing CSS keyframe animations. Eight animation types cover all 20 exercises. Adding a new animation type requires: adding the key to the `AnimationKey` union in `exercises.ts`, adding the SVG component to the `ANIMATIONS` map in `ExerciseDemo.tsx`, and assigning the key to the relevant exercises.

**Styling** — dark-mode-only CSS custom properties are defined in `src/index.css` (`--bg`, `--surface`, `--surface-2`, `--border`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--strength`, `--mobility`). Each screen and component has a co-located `.css` file. No CSS-in-JS, no utility framework.

**PWA** — `vite-plugin-pwa` generates the service worker and manifest at build time. PWA icons (`icon-192.png`, `icon-512.png`) are referenced in `vite.config.ts` but not yet present in `public/` — add them before shipping.
