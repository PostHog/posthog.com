---
date: 2026-05-13
title: How autoresearch found a 3-year-old bug in our query engine
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - robbie-coomber
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/lw-queries.png
featuredImageType: full
category: Engineering
tags:
  - Engineering
  - AI
  - Inside PostHog
---

A few weeks ago at our company offsite in Lisbon,
we pointed an AI agent at our query engine,
fed it slow queries from production, and let it run.

By Friday afternoon it had found something embarrassing:
every timestamp filter in PostHog had been silently disabling ClickHouse's primary key for almost three years.
[The fix](https://github.com/PostHog/posthog/pull/54819) made 7-day funnels 22–37% faster
and cut the number of granules ClickHouse had to scan by 62%.

This post is about the setup we used,
the bug itself,
and what we're building now so this kind of thing happens automatically.

## What's autoresearch?

The general idea isn't ours.
Andrej Karpathy [packaged it up](https://github.com/karpathy/autoresearch) and gave it a name in March 2026:
give an AI agent a small but real system, a benchmark, and a budget,
and let it loop — propose a change, run the benchmark, keep what helps, throw away what doesn't.

Karpathy ran it for two days against a depth-12 nanochat training run and found
[about twenty changes that improved validation loss](https://x.com/karpathy/status/2031135152349524125),
some of which transferred to a bigger model.
The idea is older than the name (people have been doing variations of this since at least 2024)
but the framing is clean and the implementation is small enough that you can build your own version in an afternoon.

The interesting part for us is the second-order effect:
once you've automated "propose, benchmark, evaluate, decide,"
the agent is no longer assisting an engineer —
it's running an experiment that an engineer wouldn't have had time to run.
A long tail of "we should look into that one day" turns into things you actually look into.

## The hackathon

Every year we run a company-wide [hackathon](/newsletter/hackathons) at our offsite.
A lot of what's now PostHog — [session replay](/session-replay), the [data warehouse](/data-warehouse), [logs](/logs) — started this way.
This year we were in Lisbon, and the Query Performance team's hackathon project was: do Karpathy's thing, but for ClickHouse.

The stack we used:

- **[pi](https://pi.dev/)** — a small terminal coding agent built by [Mario Zechner](https://github.com/badlogic) at Earendil. It speaks to whatever LLM you point it at, exposes a clean SDK, and is small enough that you can read the entire codebase.
- **[pi-autoresearch](https://github.com/davebcn87/pi-autoresearch)** — a community extension by `davebcn87` that wires Karpathy's loop into pi. You give it an objective, a baseline, a benchmark command, and a target metric. It iterates, commits each candidate, runs the benchmark, and keeps a journal so the run survives context resets.
- **A campaign orchestration contract** that we wrote on top of pi-autoresearch. The basic loop "try something, measure, keep or discard" is too loose for a ClickHouse query that has ten different things wrong with it. We structured each investigation into a **campaign** (one slow query, one git branch), broken into **lanes** (one optimization direction tied to a suspected bottleneck — predicate ordering, JSON parsing, timezone handling, primary key usage, and so on), with **hypotheses** inside each lane (concrete testable ideas) and **experiments** inside each hypothesis (one run, one benchmark, one verdict). Lanes can be paused when they stop yielding signal, split when they turn out to be two ideas, or merged when wins from different lanes turn out to combine — and the agent has to do an explicit reflection pass after every experiment instead of letting the loop just hill-climb. Without the structure, you get an agent that fiddles with one corner of the query until it gives up; with it, you get something closer to how a careful human would actually run an investigation.
- **A throwaway ClickHouse test cluster** — same data shape as production, anonymized, way more compute than was reasonable. We wanted the agent to be able to "go crazy" on benchmark runs without anyone caring about the cost.

The test cluster is the part most people skip and shouldn't.
Karpathy could iterate on nanochat on a single GPU because the inner loop was minutes.
Our inner loop is a ClickHouse query against tens of billions of rows.
If the benchmark takes 90 seconds, an agent that tries 50 things has spent over an hour just waiting,
and the human babysitting it has long since gone for lunch.
So we threw money at it: a fat, dedicated cluster the agent could hammer.

During the hackathon we hand-fed it slow queries that we'd grumbled about in the past
and ones we found by hand in `system.query_log`.
That's the part we're now automating — more on that below.

## The bug: how we silently broke our own primary key

ClickHouse is fast because it can skip work.
The events table is `PARTITION BY toYYYYMM(timestamp)` and the primary key is `(team_id, toDate(timestamp), event, …)`.
A well-formed query with a timestamp bound should make ClickHouse drop entire months of data
and then jump straight to the right week within the months it does have to look at.

That's not what was happening.

When we added per-team timezone support to HogQL [in April 2023](https://github.com/PostHog/posthog/pull/14968),
we did the sensible thing and wrapped every reference to `timestamp` in `toTimeZone(timestamp, team_tz)` so display dates were correct.
What we didn't realize is that the ClickHouse query planner can't see through `toTimeZone()`:

- It can't derive bounds on `toYYYYMM(timestamp)` from `toTimeZone(timestamp, tz) >= '2024-03-01'`, so partition pruning was off.
- It can't derive bounds on `toDate(timestamp)` either, so the primary key was being used for `team_id` and `event` but stopping there.

The reason this hadn't already paged us is that ClickHouse also has a [MinMax skip index](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#available-types-of-indices) on `timestamp`.
A MinMax index stores the smallest and largest value of a column per "granule" (8,192 rows by default).
When you compare `toTimeZone(timestamp, tz)` against a constant,
ClickHouse can still evaluate that against each granule's min/max
and skip the ones whose range doesn't overlap.
This is much weaker than partition pruning, but it works
— so queries weren't catastrophically slow, just somewhere between two and four times slower than they should have been.

That's the kind of bug that hides forever.
It's slow, but not "page someone" slow.
Every query is affected, so nobody can A/B compare against a "good" version.
And the smoking gun lives in the output of `EXPLAIN PLAN indexes=1, json=1`, which nobody runs unless they already suspect something.

In one of the lanes, the autoresearch loop ran the EXPLAIN.
It noticed `Partition: Condition='true'` (i.e. no pruning).
It tried adding `indexHint()` with bare-timestamp bounds.
It tried rewriting the comparison so the field side was bare and the constant carried the timezone.
That second approach won — by a lot — and that's what we [shipped](https://github.com/PostHog/posthog/pull/54819):

```sql
-- Before: planner can't see through toTimeZone
toTimeZone(timestamp, 'US/Pacific') >= '2024-03-01'

-- After: bare field on the left, timezone-annotated constant on the right
timestamp >= toDateTime64('2024-03-01', 6, 'US/Pacific')
```

The semantics are identical because `toTimeZone()` only changes display metadata — the underlying epoch is unchanged.
The planner now sees a bare `timestamp` and can do its job.

On a 7-day funnel against a real team in production
(`load_balancing='in_order'` so each variant hits the same shard, five runs each, trimmed mean of the middle three):

| Metric                | Baseline     | This fix     | Change |
|-----------------------|--------------|--------------|--------|
| Best run              | 2,824 ms     | 2,192 ms     | **−22%** |
| Trimmed mean (mid 3)  | 4,694 ms     | 2,954 ms     | **−37%** |
| Skip-index granules   | 60,683       | 23,291       | **−62%** |

The bug had been there since the timezone change landed.
About three years.

## What's next: doing this without the hackathon

We were hand-feeding slow queries to the agent during the offsite.
That doesn't scale.
The pipeline we're now building is closer to what you'd actually want:

1. **Fetch slow queries from `system.query_log`** — filtered to queries we have permission to replay (we tag every ClickHouse query with the originating product, team, and consent flags). The orchestrator that does this lives at [`products/query_performance_ai/orchestrator/slow_queries.py`](https://github.com/PostHog/posthog/blob/master/products/query_performance_ai/orchestrator/slow_queries.py).
2. **Spin up a sandbox per candidate query** — the same sandboxes we use to run [PostHog Code](/code), our internal coding agent.
3. **Run pi-autoresearch in each sandbox**, each with its own benchmark target and budget.
4. **Aggregate the suggestions** across sandboxes — many of them will rediscover the same idea; we'd rather a human review the deduped set than the raw output.
5. **For each promising idea, spawn a cloud PostHog Code session** that drafts an actual PR against the real codebase, with tests and benchmarks.
6. **Post the resulting PRs into our team Slack channel** so a human reviews and merges.

The interesting design choice is the consent layer.
We don't want the agent to replay arbitrary customer queries —
so every query in the log carries a consent tag,
and the orchestrator filters out anything without it.
The autoresearch ClickHouse user is also separate from any user a human or product touches,
which means we get clean audit trails and the ability to revoke the whole thing instantly if something goes wrong.

If this works,
"some queries in our codebase don't use the primary key correctly"
becomes a thing the system finds on a Wednesday afternoon while everyone's at lunch,
not a thing that takes a company offsite to uncover.
We'll write up the second-order results once they're real.

In the meantime — if you're sitting on a workload that's been "just a bit slow" for years,
spin up a test cluster you don't mind being mean to,
give an agent a benchmark,
and look at what comes back.
