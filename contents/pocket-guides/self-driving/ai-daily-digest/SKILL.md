---
name: signals-scout-ai-observability-daily-digest
description: >
  Creates a concise, low-noise daily digest from the AI observability dashboard, errors, costly
  users, and online evaluations.
allowed_tools:
  - emit_report
  - edit_report
---

# AI observability daily digest

One report a day covering usage, cost, errors, costly users, and evaluations for the previous
complete 24 hours.

This is the standing daily read on the whole AI observability surface. The narrower scouts in
this volume each watch one lens and stay silent until it moves: `signals-scout-ai-cost` for unit
economics, `signals-scout-ai-observability-costly-users` for user-level spend, and
`signals-scout-ai-observability-error-patterns` for failure modes. Run this one instead of them
when you want a daily summary rather than an alert, or alongside them when you want both.

Compare against the preceding 24 hours, the recent 7-day baseline, and the same weekday when
traffic is seasonal. Never compare a complete period with a partial one.

## Discriminator

This scout is the deliberate exception to the fleet's quiet-by-default rule: **every successful
run leaves exactly one report for the date**, because a digest that skips quiet days makes
silence ambiguous.

The discriminator therefore governs the *bullets*, not the report. Include a finding only when it
is extraordinary against a relevant baseline, material and recent, validated by direct evidence,
and actionable through code, prompts, model choice, caching, limits, or configuration. When
nothing clears that bar, still write the report with the verdict `No material regressions` and a
coverage summary.

### The bar

- **At most three bullets**, ordered by impact, and a summary under 180 words.
- A recurring issue returns only when it **materially worsened, recovered, relapsed, gained new
  evidence, or now needs a different action**.
- Never include routine metrics, unchanged leaderboards, raw query output, or filler.

## Explore

Work these four surfaces, then write once. Use the project's real dimensions, and validate every
aggregate against representative traces, evaluation runs, or direct evidence.

1. **Read your own history first.** Pull this scout's last 14 days of run summaries, filtered by
   its exact `skill_name` and current `skill_version`. Search the scratchpad for prior baselines
   and known noise. Do not repeat an unchanged issue.
2. **Cost and usage.** Review the canonical AI observability measures for usage, cost, latency,
   errors, and performance. Never substitute a saved dashboard matched by name or tag; if a
   canonical measure can't be reproduced, mark that surface incomplete rather than using a
   lookalike.
3. **Errors and traces.** Inspect errors for new or changed patterns, and open at least one
   representative trace before drawing a conclusion.
4. **Costly users.** Inspect costly users and their workflows, not only model-level spend. A user
   ranking highly is not a finding. Minimize personal data.
5. **Evaluations.** Inspect enabled evaluation configs and recent `$ai_evaluation` results for
   pass-rate regressions, failure or N/A surges, missing expected results, or broken
   configuration. Localize the cause before including it.
6. **Code, when available.** Use read-only repository access to validate a likely cause and cite
   the path or commit. Never block the digest when code access is unavailable.

Title the report `AI observability daily digest: YYYY-MM-DD`. Before writing, search the inbox for
today's title and compare exactly: update the existing report if it matches, create one if it does
not. Never create two digests for the same date. End with the surfaces checked, and name any
surface that was incomplete and why.

## Disqualifiers

These never become bullets, though they may still be worth a scratchpad note:

- An issue that is unchanged since the last run.
- A user who is merely expensive, with normal cost per trace and no controllable cause.
- Expected cancellations, test or synthetic traffic, and known provider incidents.
- An aggregate that moved without a trace, evaluation run, or other direct evidence behind it.
- A feature too new to have a stable baseline.
