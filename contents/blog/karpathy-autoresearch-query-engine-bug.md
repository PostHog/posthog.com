---
date: 2026-06-01
title: Karpathy's Autoresearch found a 3-year-old bug in our query engine (and improved performance by 11%)
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - robbie-coomber
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/hog_ql.png
featuredImageType: full
category: Engineering
tags:
  - Engineering
  - AI
  - Inside PostHog
  - Research
---

A few weeks ago at a team offsite in Lisbon, we pointed an AI agent at our query engine, fed it slow queries from production, and let it run overnight.

By the next morning it had found something embarrassing: for almost three years, every query with a timestamp filter had not been using ClickHouse's primary key correctly. [The fix](https://github.com/PostHog/posthog/pull/54819) cut the number of granules ClickHouse had to scan by 62% on the benchmark query, and made the query itself meaningfully faster. 

This post is about the setup we used, the bug itself, and what we're building now so this kind of analysis happens automatically.

## What's autoresearch?

The general idea isn't ours. Andrej Karpathy [packaged it up](https://github.com/karpathy/autoresearch) and gave it a name in March 2026: give an AI agent a small but real system, a benchmark, and a budget, and [let it loop](/newsletter/loops); propose a change, run the benchmark, keep what helps, throw away what doesn't.

Karpathy ran it for two days against a depth-12 nanochat training run and found [about 20 changes that improved validation loss](https://x.com/karpathy/status/2031135152349524125), some of which transferred to a bigger model. The shape isn't new (DeepMind's [FunSearch](https://www.nature.com/articles/s41586-023-06924-6) (2023) and [Sakana's AI Scientist](https://sakana.ai/ai-scientist/) (2024) are earlier examples), but Karpathy's repo is small and concrete enough to inspire you to build your own version in an afternoon.

The interesting part for us is the second-order effect: the agent doesn't carry the bias that comes from living in a codebase. To us, the `toTimeZone()` wrap had just always been there. The kind of code you stop seeing. The agent has no priors. It runs every diagnostic, reads the surrounding ClickHouse and PostHog source for context, and treats a three-year-old expression with the same suspicion as the line you wrote yesterday.

## Setting up autoresearch for ClickHouse in a hackathon

Every year, we run [hackathons](/newsletter/hackathons) at company offsites. A lot of what's now PostHog ([session replay](/session-replay), the [data warehouse](/data-warehouse), [logs](/logs), and more) started this way. At a smaller joint team offsite for the [Analytics Platform](/teams/analytics-platform) and [Query Performance](/teams/query-performance) teams in Lisbon, our hackathon project was to do Karpathy's thing, but for ClickHouse query performance.

The stack we used:

- **[pi](https://pi.dev/)**: a small terminal coding agent built by [Mario Zechner](https://github.com/badlogic). It speaks to whatever LLM you point it at, exposes a small SDK, and is small enough that you can read the entire codebase.

- **[`pi-autoresearch`](https://github.com/davebcn87/pi-autoresearch)**: a community extension by `davebcn87` that wires Karpathy's loop into pi. You give it an objective, a baseline, a benchmark command, and a target metric. It iterates, commits each candidate, runs the benchmark, and keeps a journal so the run survives context resets.

- **A campaign orchestration contract** that we wrote on top of `pi-autoresearch`. The basic loop "try something, measure, keep or discard" is too loose when a single ClickHouse query has hundreds of plausible rewrites. Without a structure, an agent can fiddle with a corner of the query until it gives up; with it, you get something closer to how someone would actually run an investigation. We structured each investigation into four parts:
  1.  A **campaign** with one slow query and one git branch.
  2. This is broken into **lanes**, optimization directions tied to a suspected bottleneck: predicate ordering, [JSON parsing](/blog/clickhouse-materialized-columns), timezone handling, primary key usage, and so on. Lanes can be paused when they stop yielding signal, split when they turn out to be two ideas, or merged when wins from different lanes turn out to combine.
  3. A concrete, testable **hypothesis** inside each lane.
  4. An **experiment** inside each hypothesis with one run, benchmark, and verdict. The agent has to do an explicit reflection pass after every experiment instead of letting the loop just hill-climb. 

- **A throwaway ClickHouse test cluster**: this kept iteration speed high and benchmark numbers predictable. The same data shape as production but anonymized and running on cheaper hardware dedicated to the agent. Running on a developer laptop would have been too slow for a useful inner loop; running on production would have meant fighting noisy neighbors and risking interference with customer queries.

Range-narrowing also helped. When a target query times out, the agent halves the range (30 days, 14, 7, 3, 1) until it completes in one to ten seconds, then optimizes against that narrowed version. That window is short enough for fast iteration but long enough that index and partition effects still matter. The current best candidate is periodically retested at the full range; once it completes there, the campaign "graduates" back and continues from the original query.

During the hackathon, we hand-fed it slow queries that we'd grumbled about in the past and ones we found by hand in `system.query_log` (we're now automating this now).

## Discovering our silently broken primary key

ClickHouse is fast because it can skip work. Our `events` table is `PARTITION BY toYYYYMM(timestamp)` and the primary key is `(team_id, toDate(timestamp), event, …)`. A well-formed query with a timestamp bound should make ClickHouse drop entire months of data and then jump straight to the right week within the months it does have to look at.

That's not what was happening.

When we added per-team timezone support to HogQL [in April 2023](https://github.com/PostHog/posthog/pull/14968), we did the sensible thing and wrapped every reference to `timestamp` in `toTimeZone(timestamp, team_tz)` so display dates were correct. What we didn't realize is that the ClickHouse query planner can't see through `toTimeZone()`. This meant it couldn't derive bounds on:

- `toYYYYMM(timestamp)` from `toTimeZone(timestamp, tz) >= '2024-03-01'`, so partition pruning was off.
- `toDate(timestamp)` so the primary key was being used for `team_id` and `event` but stopping there.

The reason this hadn't already paged us is that ClickHouse also has a [MinMax skip index](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#available-types-of-indices) on `timestamp`. A MinMax index stores the smallest and largest value of a column per "granule" (8,192 rows by default). When you compare `toTimeZone(timestamp, tz)` against a constant, ClickHouse can still evaluate that against each granule's min/max and skip the ones whose range doesn't overlap. This is much weaker than partition pruning, but it works, so queries weren't catastrophically slow, just measurably slower than they should have been.

That's the kind of bug that hides forever. It's slow, but not "page someone" slow. Every query is affected, so nobody can A/B compare against a "good" version. And the smoking gun lives in the output of `EXPLAIN PLAN indexes=1, json=1`, which nobody runs unless they already suspect something.

In one of the lanes, the autoresearch loop ran the `EXPLAIN`. It noticed `Partition: Condition='true'` (i.e. no pruning) so tried two things: 

1. Adding `indexHint()` with bare-timestamp bounds.
2. Rewriting the comparison so the field side was bare and the constant carried the timezone. 

The second approach won, by a lot, and that's what we [shipped](https://github.com/PostHog/posthog/pull/54819):

```sql
-- Before: planner can't see through toTimeZone
toTimeZone(timestamp, 'US/Pacific') >= '2024-03-01'

-- After: bare field on the left, timezone-annotated constant on the right
timestamp >= toDateTime64('2024-03-01', 6, 'US/Pacific')
```

The semantics are identical because `toTimeZone()` only changes display metadata: the underlying epoch is unchanged. The planner now sees a bare `timestamp` and can do its job.

On a 7-day funnel against a real team in production (`load_balancing='in_order'` so each variant hits the same shard, five runs each, trimmed mean of the middle three):

| Metric                | Baseline     | This fix     | Change |
|-----------------------|--------------|--------------|--------|
| Best run              | 2,824 ms     | 2,192 ms     | **−22%** |
| Trimmed mean (mid 3)  | 4,694 ms     | 2,954 ms     | **−37%** |
| Skip-index granules   | 60,683       | 23,291       | **−62%** |

The speedup is biggest on queries with short date ranges, because that's where partition pruning matters most. At a 7-day range, you can drop most of the partitions if the planner cooperates. Wider ranges have to look at more partitions regardless, so the relative win shrinks: a 90-day query is still faster, just not by 37%. The granule reduction is real on every range; it just translates into a smaller wall-clock improvement when there are more granules to scan in absolute terms.

The bug had been there since the timezone change landed. About three years.

## What's next: doing this without the hackathon

We were hand-feeding slow queries to the agent during the offsite. That doesn't scale. The pipeline we're now building is closer to what you'd actually want:

1. **Fetch slow queries from `system.query_log`.** The orchestrator that does this lives at [`products/query_performance_ai/orchestrator/slow_queries.py`](https://github.com/PostHog/posthog/blob/master/products/query_performance_ai/orchestrator/slow_queries.py).

2. **Spin up a sandbox per candidate query**, the same sandboxes we use to run [PostHog Code](/code), our coding agent and product editor (currently in beta).

3. **Run `pi-autoresearch` in each sandbox**, each with its own benchmark target and budget.

4. **Have an LLM dedup the suggestions and spawn a PostHog Code session for each surviving idea.** Different sandboxes often land on the same idea, so the LLM collapses those before dispatching. PostHog Code writes the actual change against the real codebase, with tests and benchmarks.

5. **Post the resulting PRs into our team Slack channel** so a human reviews and merges.

If this works, "some queries in our codebase don't use the primary key correctly" becomes a thing the system finds overnight while we're all asleep, not a thing that takes three years and a team offsite to uncover. We'll write up the second-order results once they're real.

In the meantime, the recipe isn't specific to slow queries. If there's a metric in your system you've been quietly tolerating (speed, memory, cost, accuracy, error rate, anything you can put a number on), build a harness you can run cheaply and don't mind being mean to, point an agent at it, and look at what comes back.
