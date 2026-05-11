# Tech Stack & Constraints

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React + TypeScript | Type safety, component model |
| Build | Vite | Fast HMR, simple config |
| PWA | vite-plugin-pwa | Service worker + manifest at build time |
| Styling | Vanilla CSS (co-located `.css` files) | No utility framework, no CSS-in-JS overhead |
| Audio | Web Audio API (synthesized) | No audio files to load; satisfies autoplay policy via lazy init |
| Routing | None (discriminated union in App.tsx) | App is simple enough; no router library needed |
| Testing | None yet | — |

## Architecture Decisions

### Navigation
Single `Screen` discriminated union in `App.tsx` (`home | list | workout`). All navigation via prop callbacks. No React Router.

### Data Layer
Static `Record<string, Exercise>` in `src/data/exercises.ts`. Workouts in `src/data/workouts.ts` — `durationMinutes` computed automatically from step durations. No runtime validation.

### Timer
`useWorkoutTimer` owns all workout execution state. Single `setInterval` at 1 Hz. Phase sequence: `intro (5s) → work → rest → … → complete`. Steps with `rest: 0` skip rest phase; last step of every workout must have `rest: 0`.

### Exercise Demos
Currently: SVG stick figures with inline CSS keyframe animations (`ExerciseDemo.tsx`). Target: comic-style animated WebPs generated via AI (Replicate text-to-video). Transition is in progress on `feature/exercise-animations`.

### Styling Convention
Dark-mode-only CSS custom properties in `src/index.css`. Each screen/component has a co-located `.css` file. Color tokens: `--bg`, `--surface`, `--surface-2`, `--border`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--strength`, `--mobility`.

## Constraints

- Must work offline after first load (service worker caching)
- No backend, no database — everything is static or client-side
- PWA icons (`icon-192.png`, `icon-512.png`) must exist in `public/` before shipping
- Audio must be lazily initialized (browser autoplay policy)
- Never read `.env.local` — contains secret API tokens
