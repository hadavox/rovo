---
description: Capture a new feature idea via short interview, then save it as its own file under sdd/ideas/
---

You are going to capture a new idea for the Rovo project through a short interview. The seed for this idea is: $ARGUMENTS

Follow these steps exactly:

1. Acknowledge the idea seed (or ask for one if $ARGUMENTS is empty). Tell the user: "Let's capture this properly — I'll ask you a few quick questions."

2. Ask the following questions **one at a time**, waiting for a full answer before asking the next:
   - What problem does this solve, or what experience does it improve?
   - Who benefits most — new users, returning users, or everyone?
   - Rough scope: tiny (hours) / small (1-2 days) / medium (few days) / large (weeks)?
   - Any idea how it might work, or is it still fuzzy?
   - Does it depend on anything else being done first?

3. After all answers, derive a short slug from the idea title (lowercase, words separated by hyphens, no special characters). For example "Custom Workout Builder" → `custom-workout-builder`.

4. Write a new file at `sdd/ideas/<slug>.md` with this exact format:

```
# [Idea title — derived from seed and answers]

*Logged: [today's date as YYYY-MM-DD]*

**Problem:** [what it solves]
**Audience:** [who benefits]
**Scope:** [tiny / small / medium / large]
**Rough approach:** [how it might work, or "still fuzzy"]
**Dependencies:** [blocking items, or "none"]
```

5. Read the current contents of `sdd/IDEAS.md`. Add a bullet entry for this idea in the index under a `## Ideas` heading (create the heading if it doesn't exist). Remove the placeholder line `_No ideas logged yet. Use \`/spec-idea\` to add one._` if it is still present. Each bullet should follow this format:
   `- [Idea title](ideas/<slug>.md) — one-line summary`

6. Confirm: "Saved to sdd/ideas/<slug>.md and indexed in sdd/IDEAS.md."
