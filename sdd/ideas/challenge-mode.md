# Challenge Mode

*Logged: 2026-04-29*

**Problem:** Users are motivated by "30-day challenge" formats (common in fitness marketing) but have no way to subscribe to and track such challenges inside the app. Brings that experience natively into Rovo.
**Audience:** Everyone
**Scope:** large
**Rough approach:** A curated list of challenges (e.g. "50 Push-ups a Day for 30 Days"). User picks a challenge, configures it (target reps/duration, start date — defaults to today), and subscribes. The app sends daily notifications prompting the user to complete the day's exercise. Tapping the notification (or navigating in-app) shows the daily exercise which can be started directly. Completion date/time is tracked per day, building a streak/progress view over the challenge duration.
**Dependencies:** Exercise library (already exists)
