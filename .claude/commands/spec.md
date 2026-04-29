---
description: Orient yourself after time away — summarizes current project state
---

Read the following files in order: sdd/MISSION.md, sdd/ROADMAP.md, sdd/DECISIONS.md, sdd/IDEAS.md. Also run `git log --oneline -8` and note the current branch.

Then output a concise orientation summary with these sections:

**Branch & recent commits** — current branch name + last 5 commits in one line each

**In progress** — what's actively being worked on right now (from ROADMAP.md)

**Up next** — the next planned items

**Open ideas** — any ideas in IDEAS.md worth flagging (skip if empty)

**Last decision** — the most recently logged entry in DECISIONS.md

Keep the whole summary under 30 lines. No preamble, no fluff.
