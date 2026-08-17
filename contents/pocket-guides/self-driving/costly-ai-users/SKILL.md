---
name: signals-scout-ai-observability-costly-users
description: >
  Finds extraordinary user-level AI spend or usage, validates the cause in traces, and reports only
  patterns with a controllable next action.
allowed_tools:
  - emit_report
  - edit_report
---

# AI observability costly or unusual users

Watch unit economics per user, not the spend leaderboard.

Narrower than `signals-scout-ai-observability`, which rotates through cost, latency, errors,
volume and eval lenses and does not run every lens each tick. Distinct from
`signals-scout-ai-cost`, which watches one aggregate number for the whole product: that one
catches regressions that hit everyone, this one catches regressions confined to a few accounts,
one workflow, or one shape of input, which never move the aggregate. Running both is reasonable.

Compare against the preceding 24 hours, the recent 7-day baseline, and the same weekday when
traffic is seasonal. Never compare a complete period with a partial one.

## Discriminator

Emit a report when a user's **cost per trace departs materially from both the population and that
user's own baseline, while their trace volume holds**. Write nothing when a user is merely
expensive: high volume at normal unit cost is healthy usage, and a leaderboard position is not a
finding.

### The bar

A starting threshold, to be tuned against what this project's data actually does:

- **Cost per trace at or above 2× the user's own trailing 7-day median**, sustained across two
  consecutive complete days, or at or above 3× for a single complete day, and
- **a volume floor** of enough traces that the ratio is stable rather than one expensive request.

The volume floor matters more than the multiplier. Use complete days only.

## Explore

Aggregates choose what to read. Traces establish the cause. Never skip step 5.

1. **Rank identified users by generated-call spend.** Include both `$ai_generation` and
   `$ai_embedding` for full cost totals. Exclude rows where `distinct_id` equals
   `properties.$ai_trace_id` when treating `distinct_id` as a user.
2. **Establish the population baseline** for cost share, traces, cost per generation, tokens,
   cache behavior, errors, and retries.
3. **Select at most three candidates** whose behavior differs materially from both the population
   and their own baseline.
4. **Break each candidate down** by model, provider, span, workflow, feature, or another property
   that exists in the project. Read the data schema before grouping by a custom dimension.
5. **Open representative traces before explaining the cause.** The cause is usually a retry loop,
   context growth, output growth, model choice, missing caching, abuse, or a product bug, and only
   the traces tell you which.

Group users sharing a root cause into one report. Create at most two reports per run, and search
the inbox before writing: a matching live report gets edited, never duplicated. Title a new report
`Unusual AI spend: <segment and cause>`.

Minimize personal data. Use the least identifying stable label available, and never include raw
prompts, responses, or full person-property objects.

## Disqualifiers

- The user is a top spender at normal unit economics. That's volume, not a regression.
- An expected launch, batch job, backfill, replay, or eval run.
- Test or synthetic traffic.
- One costly trace with no repeatable pattern behind it.
- A known provider incident already covered elsewhere.
- An account new enough that it has no stable baseline of its own.
