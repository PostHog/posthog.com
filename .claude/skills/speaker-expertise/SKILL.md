---
name: speaker-expertise
description: >
  Turn a person's PostHog PR history into tech-talk prep. Given a GitHub handle,
  produces a brief outline of their work, concrete talk topics with supporting detail,
  and a talk-worthiness score out of 10 for each topic. Use when someone asks "what
  should X give a tech talk on", "what is X an expert in", or wants speaker prep /
  topic ideas grounded in what a person actually shipped.
---

# Speaker expertise

Given a GitHub handle, research the person's merged PRs across the PostHog org over the
**last 6 months** and produce **brief** speaker-prep material: an outline of their work,
candidate tech-talk topics with detail, and a `/10` talk-worthiness score per topic.

**GitHub handle:** $ARGUMENTS

If no handle was passed, ask the user for one before continuing.

## Workflow

### 1. Resolve the handle

Strip a leading `@` from `$ARGUMENTS`. That is the GitHub login to research.

### 2. Pull merged PRs across the PostHog org

Search org-wide (PRs span many repos — `charts`, `posthog`, `posthog-js`, etc. — so use
`gh search prs`, **not** `gh pr list`, which is single-repo). Scope to the **last 6
months** by merge date:

```
CUTOFF=$(date -v-6m +%Y-%m-%d 2>/dev/null || date -d '6 months ago' +%Y-%m-%d)
gh search prs --owner PostHog --author <handle> --merged --merged-at ">=$CUTOFF" \
  --limit 300 --json number,title,repository,url,createdAt,closedAt
```

(The `date` fallback covers both macOS/BSD `-v` and GNU `-d`.) Use a high `--limit`
(300) so a prolific 6 months isn't silently truncated — if results hit the limit, say so
in the output. This is org-wide, not one repo — note the scope for the reader. If a PR
title alone is ambiguous and it looks pivotal to a topic, you may fetch its body with
`gh pr view <number> --repo <repo> --json title,body`, but don't do this for every PR —
keep it cheap.

### 3. Cluster the work into themes

Group the PRs by subject: conventional-commit scope (`fix(duckling)`, `feat(dags)`…),
repository, and recurring keywords. Identify:

- the **dominant project(s)** — where most of the effort went;
- **one-off / side areas**;
- **arcs worth a story**: revert→re-land cycles, or an approach that was tried and then
  abandoned. These are the most talk-worthy material, so flag them.

Keep this a short thematic breakdown — not a PR-by-PR list.

### 4. Propose talk topics

Pick the 2–4 strongest talk angles the work actually supports. For each:

- **Title / thesis** — one line.
- **Supporting evidence** — 2–4 bullets citing specific PRs by number, each hyperlinked
  to its full URL (repo-aware, e.g. `https://github.com/PostHog/charts/pull/13170`).
- **Why it's talk-worthy vs. what weakens it** — war stories, an abandoned approach, or
  a non-obvious architectural decision make it strong; unprovable claims or "we made it
  faster" with no before/after weaken it.
- **Score `/10`** as a tech talk, with a one-line justification.

Scoring principles (be honest — the point is useful prep, not flattery):

- **Score down** any topic that rests on a claim the PRs don't actually support.
- **Prefer the true axis.** If the real win is cost or isolation, don't dress it up as
  "faster." Reward the framing that survives an expert in the room.
- **Reward earned material**: "we tried X and backed out because Y", hard-won
  reliability lessons, and concrete war stories score higher than tidy overviews.

### 5. Output — keep it BRIEF

The user wants a scannable result. Structure:

- **Work at a glance** — 3–6 lines: the 6-month window covered, PR count, dominant
  theme(s), notable arcs.
- **Talk topics (ranked by score)** — each as described in step 4, highest score first.

## Conventions

- Always hyperlink PRs to their full, repo-correct URL rather than bare `#number`.
- Use Sentence casing for PostHog product names (e.g. "Product analytics").
- Favor brevity over completeness — this is a pitch aid, not an audit.
