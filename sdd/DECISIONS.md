# Decisions Log

Dated entries for architectural choices, design rules, and rejected approaches. Helps avoid re-litigating past decisions.

---

## 2026-04-15 — No router library

**Decision:** Use a single `Screen` discriminated union in `App.tsx` instead of React Router or similar.
**Rationale:** The app has exactly three screens. A router library adds bundle weight and conceptual overhead that isn't justified. If the app grows beyond ~5 screens, revisit.

---

## 2026-04-15 — No audio files

**Decision:** Synthesize all sounds via Web Audio API rather than shipping `.mp3` / `.ogg` files.
**Rationale:** Eliminates asset loading, works offline without caching audio files, and avoids browser autoplay restrictions (context is lazily initialized on first user interaction).

---

## 2026-04-15 — Dark-mode only

**Decision:** Ship dark-mode only; no light mode toggle.
**Rationale:** Fitness apps are used in low-light environments (early morning, evening). Maintaining two themes adds CSS complexity. Revisit if user feedback demands it.

---

## 2026-04-15 — Static data, no backend

**Decision:** All workouts and exercises are static TypeScript files. No API, no database.
**Rationale:** Keeps the app fully offline-capable and eliminates infrastructure complexity for a solo project. If user-created workouts become a goal, this will need to change.

---

## 2026-04-17 — Comic-style animated WebPs for exercise demos

**Decision:** Replace SVG stick figures with AI-generated comic-style animated WebPs via Replicate text-to-video.
**Rationale:** SVG animations are functional but too simple to convey proper exercise form. Comic style chosen for visual consistency and appeal. Replicate chosen over HuggingFace (free tier doesn't support video generation).
**Prompt template:** `A comic style athletic person performs [exercise]. [Motion description]. Bold outlines, vibrant colors, comic book art style. Side view, smooth motion, plain white background, seamless loop.`

---

## 2026-04-22 — Lightweight SDD workflow over full spec-kit

**Decision:** Build a custom lightweight spec-driven workflow (`sdd/` folder + `/spec` skill) instead of adopting spec-kit or OpenSpec.
**Rationale:** spec-kit is well-suited for medium-to-large greenfield features but adds overhead for a solo project. Core needs are: idea capture, orientation after days off, and decision logging. A bespoke lightweight version fits better.
