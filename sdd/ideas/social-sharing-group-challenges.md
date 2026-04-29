# Social Sharing & Group Challenges

*Logged: 2026-04-29*

**Problem:** Fitness challenges are more motivating when shared with friends or family. Users have no way to involve others or create accountability. Also a growth vector — invite links bring new users to the app.
**Audience:** Everyone
**Scope:** large
**Rough approach:** Three phases: (1) Basic share button — after completing an exercise/challenge day, user can share a summary to any messenger via the native Web Share API. (2) Connected messenger — user configures a preferred messenger (e.g. WhatsApp) and a target chat; completed exercises are auto-posted there. (3) Group challenges — user creates a challenge and shares an invite link via their messenger; a dedicated group chat is created for the challenge, invited friends join (they need Rovo installed), and all participants' completions are posted to the shared chat automatically.
**Dependencies:** Basic app (already exists); Challenge Mode recommended before phase 2/3
