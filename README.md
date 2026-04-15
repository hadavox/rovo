# Rovo

A minimalist bodyweight fitness app for men 30–45 who want to stay fit without a gym. Built for dads, desk workers, and people with packed schedules — 10–15 minutes in the morning, no equipment, no noise.

---

## Goal

Get people moving with as little friction as possible. Open the app, pick a focus, work out, done. No accounts, no cloud, no gamification. Dark mode only — built for early mornings.

---

## Functional Overview

### Core loop

Launch → pick a focus (Strength / Mobility / Both) → select a workout → first exercise starts. Maximum 2–3 taps from launch to the first rep.

### Workout execution

The execution screen is timer-driven — no tapping through exercises. Each exercise counts down, transitions automatically to a rest period, then to the next exercise. The countdown timer is the dominant element on screen.

- **5-second GET READY** intro before the first exercise
- **Circular countdown ring** shows time remaining in the current phase
- **Phase background** shifts to a deep blue tint during work, deep green during rest
- **Last 5 seconds** of each phase: audible beep + haptic tick on every second
- **Phase transitions**: two-tone audio chime + haptic pulse
- **Coaching cues** rotate every 10 seconds during a work phase
- **Animated exercise demo** (SVG stick figure) plays throughout the work phase
- **"NEXT UP"** preview shown during rest so you can prepare
- **Pause** and **Skip** controls are present but unobtrusive

### Workout library

8 preset workouts across three categories and three difficulty levels:

| Category | Workouts |
|---|---|
| Strength | Quick Burn (Easy), Morning Power (Medium), Upper Body Focus (Hard) |
| Mobility | Morning Flow (Easy), Deep Stretch (Medium) |
| Mixed | Daily Driver (Easy), Full Body Mix (Medium), Dad Strength (Medium) |

All workouts are bodyweight-only and run 10–15 minutes. The library screen supports filtering by category and difficulty.

### Exercise library

20 exercises covering strength and mobility:

**Strength** — Push-ups, Pike Push-ups, Squats, Jump Squats, Reverse Lunges, Glute Bridges, Mountain Climbers, Plank Hold, Side Plank, Superman Hold

**Mobility** — Hip Circles, World's Greatest Stretch, Cat-Cow, Thoracic Rotation, Hip Flexor Stretch, Downward Dog, Shoulder Rolls + Reach, Standing Hamstring Stretch, Pigeon Stretch, Supine Spinal Twist

### Local-first / offline

No login, no account, no cloud sync. All data is bundled with the app. Installable as a PWA and fully functional offline.

---

## Tech

Vite + React + TypeScript. Audio synthesised via Web Audio API (no audio files). Haptics via Vibration API. Service worker via `vite-plugin-pwa`.
