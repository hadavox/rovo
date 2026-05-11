# User-Controlled Data Storage & Sync

*Logged: 2026-04-29*

**Problem:** Browser cache is ephemeral and can be cleared, losing workout history. Users should be able to persist their data without handing it over to an unknown third-party cloud — they stay in control by connecting their own storage (Google Drive, local folder, etc.).
**Audience:** Everyone
**Scope:** large
**Rough approach:** During onboarding or settings, the user picks a storage provider (local folder via File System Access API, or a cloud provider like Google Drive). They authenticate, pick a folder, and the app writes data there. Initial format is plain JSON/text; a later phase adds encryption so data is only readable within Rovo. Multi-device sync works by pointing multiple devices at the same folder/provider.
**Dependencies:** Workout history logging must exist first (nothing to sync without it)
