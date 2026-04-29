# Roadmap

Status values: `done` | `in-progress` | `planned` | `on-hold`

## Done

| Feature | Branch/PR | Notes |
|---|---|---|
| Core workout timer | `main` | Intro → work → rest → complete phases |
| Exercise library (20 exercises) | `main` | Strength + mobility, static data |
| Audio cues (synthesized) | `main` | Web Audio API, no files |
| SVG exercise animations | `main` | 8 animation types covering all 20 exercises |
| PWA support | `main` | Service worker, manifest, icons |
| Repeat workout / "one more round" | `feature/repeat-workout` → merged | Tracks total time + rounds |

## In Progress

| Feature | Branch | Notes |
|---|---|---|
| AI-generated exercise demos | `feature/exercise-animations` | Comic-style animated WebPs via Replicate; script infrastructure done, 1 test WebP (pushup.webp) exists; model selection pending |

## Planned

| Feature | Priority | Notes |
|---|---|---|
| Ship exercise animations | High | Finish Replicate integration, generate all 20, update ExerciseDemo.tsx |
| Planning & spec workflow (SDD) | High | This branch — lightweight spec-driven workflow with `sdd/` docs + `/spec` skill |

## On Hold

_Nothing currently on hold._
