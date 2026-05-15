---
date: 2026-05-13
title: Recent query performance work at PostHog
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
  - Inside PostHog
seo:
  metaTitle: "Recent query performance work at PostHog"
  metaDescription: "A technical accounting of what PostHog's Query Performance, Analytics Platform, and ClickHouse teams have shipped recently: a new production ClickHouse cluster, lazy computation, query result caching and coalescing, HogQL parser optimizations, AI-driven query rewriting, and observability tooling."
---

Customers ask us about query performance, and it is a fair question.
At scale (billions of events, hundreds of dashboards, teams across regions) query latency is the difference between analytics that get used and analytics that get ignored.

This post is a substantive accounting of what the [Query Performance](/teams/query-performance), [Analytics Platform](/teams/analytics-platform), and [ClickHouse](/teams/clickhouse) teams have shipped recently to make PostHog queries faster, why each piece matters, and what we are working on next.
It covers infrastructure, query-time optimizations, precomputation and caching, AI-driven query rewriting, and the observability tooling that makes all of it possible.

If you are running PostHog at scale, or evaluating it, this document is for you.

We last published a roundup like this [in 2022](/blog/secrets-of-posthog-query-performance).
A great deal has changed.

## Measured impact

The honest way to answer "are PostHog queries actually faster?" is to look at production latency.
The numbers below compare two weeks of customer-facing queries on our US Cloud cluster, roughly three months apart: one in late February 2026, one in early May 2026.
The table covers the ten highest-volume HogQL query types from the May window.

| Query type | p50 (Feb / May) | p90 (Feb / May) | p99 (Feb / May) | p99.9 (Feb / May) |
|---|---|---|---|---|
| HogQLQuery | 158 / 155 ms (-2%) | 1.15 / 0.87 s (-24%) | 10.8 / 6.7 s (-38%) | 47.1 / 52.5 s (+11%) |
| TrendsQuery | 336 / 319 ms (-5%) | 2.09 / 1.46 s (-30%) | 15.7 / 7.8 s (-50%) | 47.7 / 37.5 s (-21%) |
| FunnelsQuery | 545 / 514 ms (-6%) | 2.63 / 2.18 s (-17%) | 17.9 / 13.5 s (-25%) | 61.8 / 55.0 s (-11%) |
| WebStatsTableQuery | 602 / 599 ms (-0%) | 2.58 / 1.70 s (-34%) | 20.3 / 8.6 s (-58%) | 48.2 / 24.0 s (-50%) |
| RetentionQuery | 507 / 905 ms (+78%) | 2.14 / 2.84 s (+33%) | 16.4 / 18.2 s (+11%) | 110.3 / 64.9 s (-41%) |
| ErrorTrackingQuery | 310 / 272 ms (-12%) | 1.72 / 0.97 s (-43%) | 15.1 / 4.6 s (-69%) | 38.2 / 18.7 s (-51%) |
| ExperimentQuery | 868 / 562 ms (-35%) | 6.4 / 2.8 s (-56%) | 34.1 / 30.0 s (-12%) | 109.4 / 139.5 s (+27%) |
| InsightActorsQuery | 174 / 190 ms (+9%) | 1.10 / 0.88 s (-20%) | 10.4 / 4.9 s (-53%) | 34.2 / 28.9 s (-16%) |
| LifecycleQuery | 564 / 604 ms (+7%) | 2.44 / 2.03 s (-17%) | 21.1 / 12.0 s (-43%) | 59.5 / 44.5 s (-25%) |
| WebOverviewQuery | 533 / 507 ms (-5%) | 2.84 / 1.54 s (-46%) | 23.6 / 7.4 s (-69%) | 47.8 / 25.1 s (-47%) |

Note that production traffic moved to a new ClickHouse cluster in mid-January 2026, before this comparison window starts: both the February and the May samples are already running on the new cluster. The hardware change itself was substantial, roughly 3× peak read throughput compared to the old cluster, and that improvement is **not** captured in the latency numbers above. The improvements shown are a separate set of software wins that landed on top of the new cluster, not a measurement of it.
Earlier optimization work that predates the comparison window is similarly not captured here.

Not everything improved.
RetentionQuery regressed at p50, p90, and p99, though it improved at p99.9.
ExperimentQuery and HogQLQuery improved across the body of the distribution but regressed at p99.9 (+27% and +11% respectively).
LifecycleQuery and InsightActorsQuery show a small p50 regression.
Marketing-analytics queries (not in the top ten by volume above) also regressed across most percentiles.
The regressions are mostly consistent with workstreams that are in progress but not yet shipped (marketing-analytics preaggregation and lazy computation, both listed under "What is in flight" below, and active improvements to retention).
Where we have a clear regression we are working on it; we are not going to claim universal wins.

## How we approach query performance

Most PostHog queries are answered by [ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion).
We store one row per event, partitioned by month, ordered by `(team_id, toDate(timestamp), event, …)`.
Performance work falls into five categories:

- **Scan less data.** Better indexes, smarter query rewrites, more aggressive partition pruning, and materialized columns that turn JSON property reads into dense column reads.

- **Move less data around.** Scanning less is not the whole story. In a sharded, distributed setup, joins and shuffles can be expensive even when the final result set is small, because rows have to be fetched and brought together across nodes before the join can resolve. We reduce join cost through better planning, denormalization (persons-on-events), and structural changes to how data is laid out across shards.

- **Avoid asking ClickHouse the same question twice.** Precomputation, caching, intermediate-result reuse, and query coalescing.

- **Speed up the parts that are not ClickHouse.** HogQL parser, query planner, framework code.

- **Run on better hardware.**

The rest of this post is what we shipped in each category, with links to the PRs.

---

## 1. ClickHouse infrastructure

[Team ClickHouse](/teams/clickhouse) owns everything beneath HogQL: cluster topology, version management, schema migrations, and the operational maintenance that keeps queries fast. The biggest items:

- **A new production ClickHouse cluster.** Production traffic in the US region moved to a new cluster in mid-January 2026. Across both regions and including the satellite clusters described below, the ClickHouse fleet now totals 9,248 vCPUs and 71.6 TiB of RAM. The most important change at the storage layer is moving from EBS-backed storage to mostly local NVMe (with EBS kept as overflow for older data): data is read directly off local disk rather than over the network from an EBS volume. Peak measured read throughput on the new cluster is roughly 3× that of the old one. This change alone is the single largest query-performance win in the period covered by this post.

- **ClickHouse 26.3 upgrade.** The production cluster moved from 25.x to ClickHouse 26.3 in April 2026 ([#54222](https://github.com/PostHog/posthog/pull/54222), [#54696](https://github.com/PostHog/posthog/pull/54696)). The upgrade unlocks performance and correctness fixes that were not backported to 25.12. We are also rolling out ClickHouse's new query analyzer to selected teams ([#51340](https://github.com/PostHog/posthog/pull/51340)).

- **Heavy workloads offloaded onto satellite clusters.** Rather than running everything on a single shared cluster, we have moved several specialised workloads onto dedicated satellite ClickHouse clusters in early 2026: a sessions cluster, an AI-events cluster, an ops cluster, and an auxiliary cluster ([#52869](https://github.com/PostHog/posthog/pull/52869), [#58175](https://github.com/PostHog/posthog/pull/58175), [#52045](https://github.com/PostHog/posthog/pull/52045)). The main multi-shard DATA cluster now handles only customer-facing analytical queries. The biggest single win here is moving sessions and `raw_sessions` onto their own cluster: those tables were a significant source of competing load on the main cluster, and isolating them improves latency on every other query that runs there.

- **Continuous part-size management.** Large ClickHouse parts (above ~300 GiB) degrade query performance and increase merge pressure. A scheduled "part-breaker" job splits oversized parts across the fleet ([#52030](https://github.com/PostHog/posthog/pull/52030), plus a series of follow-up hardenings).

The rest of this post is the software work that sits on top of this foundation.

## 2. Lazy computation for arbitrary queries

Some PostHog query patterns are predictable enough that the result can be precomputed: web analytics tiles, experiment exposure calculations, marketing attribution.
For those, we maintain dedicated pre-aggregated tables and compute on a schedule.
Ad-hoc queries (a Trends insight a customer just built, a one-off HogQL query against arbitrary filters) do not fit that pattern.

To handle the long tail, we built a more general precomputation layer.

It is an AST-level transformer (with a backing executor) that detects when a query matches a known optimizable pattern, hashes it, checks whether we have already computed the result for the time range it needs, fills in any missing date ranges lazily on demand, and rewrites the query to read from the cached intermediate result instead of the raw events table.

The original PRs called this "preaggregation." We have since renamed it "lazy computation" ([#48110](https://github.com/PostHog/posthog/pull/48110)) because it is also useful for non-aggregate intermediate work.

Notable design choices:

- **Variable TTL by data age.** Today's data refreshes every 15 minutes. Yesterday's data refreshes every hour. Data from last week refreshes once a day. Data from last month is good for a week. The TTL configuration is a dictionary and the executor picks the right value per range ([#47942](https://github.com/PostHog/posthog/pull/47942)).

- **Redis pubsub for waiters.** If query A and query B want the same intermediate result, B subscribes to a Redis channel for A's job rather than computing the same thing twice ([#47707](https://github.com/PostHog/posthog/pull/47707)).

- **Partial unique constraint in Postgres.** Two concurrent waiters racing to create a replacement job cannot both succeed; the partial unique index ensures one wins and the other waits on the winner.

- **Insert quorum for correctness.** Writing intermediate results without an insert quorum risks partial replication under multi-replica writes, which is a subtle correctness bug we addressed in [#49549](https://github.com/PostHog/posthog/pull/49549).

The first production user of this layer is experiments.
Every exposure calculation for [experiments](/experiments) precomputes the population using lazy computation, with team-level toggles and a 12-hour minimum experiment runtime gate to control compute cost ([#50498](https://github.com/PostHog/posthog/pull/50498), [#53895](https://github.com/PostHog/posthog/pull/53895), [#55442](https://github.com/PostHog/posthog/pull/55442), [#57095](https://github.com/PostHog/posthog/pull/57095)).
Web analytics and marketing analytics are next.

The full design, including the consistency story under concurrent writes and stale-job recovery, is documented in our [engineering handbook](/handbook/engineering/clickhouse/preaggregation).

## 3. Query result caching and coalescing

Most analytics workloads have a lot of repetition: the same dashboard tile rendered for many viewers on auto-refresh, the same exposure calculation across several metric tiles in an experiment, the same Trends insight pinned to multiple dashboards.
When the inputs and time range are identical, the second answer should not require any work on the cluster.

Three lines of work shipped this year:

- **A unified query result cache.** All HogQL queries route through a single cache layer keyed on the query hash, time range, and team. Legacy trend and funnel endpoints that previously bypassed this are now on the unified path ([#52369](https://github.com/PostHog/posthog/pull/52369)). Per-team cache size limits keep one customer's results from evicting another's ([#52492](https://github.com/PostHog/posthog/pull/52492)).

- **Query coalescing.** Two concurrent requests for the same query no longer run twice; the second waits on the first via a middleware layer in Django ([#49295](https://github.com/PostHog/posthog/pull/49295), [#51049](https://github.com/PostHog/posthog/pull/51049), [#51713](https://github.com/PostHog/posthog/pull/51713), [#52511](https://github.com/PostHog/posthog/pull/52511)). On dashboards with many concurrent viewers, or with many tiles that share an underlying query, cache-miss work is done once instead of N times.

- **The cache on its own infrastructure.** The query result cache moved to a dedicated cluster ([#47936](https://github.com/PostHog/posthog/pull/47936)) so cache reads and writes do not contend with the main query workload.

The combined effect is that dashboard refreshes after the first one are served from cache, concurrent users share the work rather than duplicate it, and the cache itself is isolated from the rest of the cluster.

## 4. Better use of skip indexes and materialized columns

ClickHouse has two features that are underused by the queries most analytics products produce:

- **Skip indexes** (bloom filters, ngram filters, min/max) allow ClickHouse to skip granules without scanning them, at the cost of a small amount of disk space.

- **Materialized columns** pull a JSON property out into its own column so queries against that property read a dense column rather than parsing JSON on every event.

Most queries were not using them.

Not because the indexes were missing, but because the queries were almost in the right shape and ClickHouse's planner is strict about that.
Wrap a column in `nullIf()` and the materialized column becomes invisible.
Use `ilike` instead of `=` and the ngram skip index becomes invisible.
Use `JSONHas()` to check whether a property is set and the property map skip indexes become useless.

We addressed this with a series of HogQL-level rewrites that normalize the AST into shapes the planner can optimize ([#44542](https://github.com/PostHog/posthog/pull/44542), [#44626](https://github.com/PostHog/posthog/pull/44626), [#44513](https://github.com/PostHog/posthog/pull/44513), [#45035](https://github.com/PostHog/posthog/pull/45035), [#44346](https://github.com/PostHog/posthog/pull/44346)).
The most impactful one, auto-rewriting `ilike(properties.email, '%@gmail.com')`-shaped queries to use a hidden ngram skip index, is in [#44820](https://github.com/PostHog/posthog/pull/44820).
We also added a MinMax skip index on `$session_id_uuid` so session-scoped queries can skip parts that do not overlap ([#52170](https://github.com/PostHog/posthog/pull/52170)).

The pattern is consistent: a customer query may be semantically correct but not in a shape ClickHouse can optimize. The rewriter normalizes it without changing semantics.

## 5. HogQL parser caching and AST speedups

Every HogQL query is parsed into an AST, walked by a chain of visitors (the resolver, the property-type swapper, the printer, and so on), and turned into ClickHouse SQL.
For small queries the parse is dwarfed by the ClickHouse scan time.
For complex queries, and for any workload that repeats the same query shape (dashboards, insights, alerts, anything on a refresh loop), the parse and AST traversal add up.

Two recent improvements:

- **A bounded LRU cache for parsed ASTs** ([#58269](https://github.com/PostHog/posthog/pull/58269)). Separate buckets for trusted in-code template strings and user input, each with its own size limit, plus hit-rate metrics so we can tune the cache sizes per workload. In production, the cache hit rate on `parse_select` is around 70%. On the workloads where queries repeat (dashboards, insights, and most customer-facing traffic), the p50 of `parse_statement_to_node` dropped from 12.5 ms to 3.7 ms, roughly a 3.4× speedup, and 46% of parses now complete in under one millisecond. The tail of unique, never-cached queries is unchanged, as designed.

- **A 2.7 to 4.4× speedup on every AST visitor** ([#58255](https://github.com/PostHog/posthog/pull/58255)). AST node classes now use `__slots__` and the `accept()` method-name dispatch is cached. Visitors are pervasive, so this affects every code path that touches HogQL.

Neither change affects what ClickHouse sees; both are pure Python-side optimizations.
But every HogQL query goes through this code path, so the aggregate CPU savings across the cluster are significant.

## 6. Autonomous query optimization

At a recent team offsite, we evaluated [autoresearch](https://github.com/karpathy/autoresearch) (Andrej Karpathy's pattern of giving an AI agent a benchmark and letting it iterate) against our slow ClickHouse queries.
Within the first day, the agent identified a bug that had been in the codebase for three years: HogQL's per-team timezone support was stopping ClickHouse from fully using its primary key on every query that filtered by `timestamp`.

The fix ([#54819](https://github.com/PostHog/posthog/pull/54819)) restored partition and primary-key pruning.
On the benchmark query, ClickHouse scanned 62 percent fewer granules.
Wall-clock time on a 7-day funnel improved by 22 to 37 percent; on wider date ranges the relative improvement is smaller, but the granule reduction holds.

We are now building a continuous version of this pipeline.
It pulls slow queries from `system.query_log`, spins up an isolated sandbox per query, runs the autoresearch loop, and posts the most promising candidates as draft PRs for engineer review.
The full writeup of the initial result is in our [companion post](/blog/autoresearch-found-a-3-year-old-clickhouse-bug).

The substantive value here is that the system optimizes the queries customers actually run, not the synthetic ones a benchmark suite might cover.

## 7. Tooling and observability

Performance optimization at scale requires good attribution (knowing which product, code path, or customer action issued each query) and the right investigation tooling so that any engineer at PostHog can diagnose a slow query without escalating to a specialist.
A substantial portion of the past year went into both.

- **Query attribution.** Every ClickHouse query is tagged with the product that issued it, the source file, the cache key, the execution mode, and, for queries coming from our MCP server, the specific MCP tool ([#52328 et seq.](https://github.com/PostHog/posthog/pull/52328), [#51654](https://github.com/PostHog/posthog/pull/51654), [#52349](https://github.com/PostHog/posthog/pull/52349), [#49088](https://github.com/PostHog/posthog/pull/49088), [#49946](https://github.com/PostHog/posthog/pull/49946), [#57120](https://github.com/PostHog/posthog/pull/57120)). Local development fails untagged queries so new code paths cannot accidentally bypass the tagging ([#55901](https://github.com/PostHog/posthog/pull/55901)).

- **Query profiling.** A flamegraph view in our internal debug panel lets engineers see exactly where time is spent in a slow query, with `trace_log` data aggregated across cluster nodes ([#52210](https://github.com/PostHog/posthog/pull/52210), [#52286](https://github.com/PostHog/posthog/pull/52286)).

- **Investigation surface.** A CLI for running ad-hoc queries against `system.query_log` from any engineer's terminal ([#56800](https://github.com/PostHog/posthog/pull/56800)), so per-team and per-product investigations take minutes rather than being a specialist task. The "Measured impact" tables at the top of this post were produced through that CLI.

With per-product labels and a low-friction investigation path, we can rank queries by total CPU cost across the cluster and target optimization work at the highest-spend paths rather than guessing.
The same data feeds the AI-driven query optimization described in section 6.

## What is in flight

Several initiatives are landing or in progress:

- **A redesigned sessions table.** Sessions queries (web analytics, session replay search, anything that asks "how many sessions did X this week") currently read raw events and group by session ID at query time. We are rolling out **sessions v3**, an `AggregatingMergeTree` table populated by a ClickHouse materialized view that fires on every event insert. Each event partially updates a row keyed on session ID, so by the time a query runs most of the aggregation work has already happened. v3 is a redesign of the existing sessions table with a partition and primary key optimized for the actual access pattern, a property map for low-volume ad-network click IDs (so adding a new one is no longer a schema migration), presence bits stored separately from values (so channel-type queries read one bit per row instead of a 100-character string), and a single JSON parse per event rather than one per column ([#38245](https://github.com/PostHog/posthog/pull/38245), [#39092](https://github.com/PostHog/posthog/pull/39092), [#39959](https://github.com/PostHog/posthog/pull/39959)). The cutover is the largest backfill operation we have run; substantial pipeline work has gone into handling the `TOO_MANY_PARTS`, `MEMORY_LIMIT_EXCEEDED`, and `TOO_MANY_SIMULTANEOUS_QUERIES` conditions ClickHouse surfaces under pressure ([#56608](https://github.com/PostHog/posthog/pull/56608), [#41374](https://github.com/PostHog/posthog/pull/41374)).

- **Dynamic materialized columns.** Today, materialized columns require a per-property migration on the events table. This is operationally heavy and means we materialize only a small handful of properties globally. The dynamic materialized column ("dmat") work introduces a per-team slot pool, currently up to 100 string columns on the events table, mapped per team to whichever JSON properties that team actually queries. A weekly batched workflow runs a single ClickHouse mutation that services every team at once, so the cost is constant in the number of teams ([#58079](https://github.com/PostHog/posthog/pull/58079), [#58251](https://github.com/PostHog/posthog/pull/58251), [#58080](https://github.com/PostHog/posthog/pull/58080), [#58081](https://github.com/PostHog/posthog/pull/58081), [#58082](https://github.com/PostHog/posthog/pull/58082)). Once it lands, each customer's most-queried properties are transparently materialized without per-property engineering work. The HogQL companion that auto-rewrites raw `JSONExtractString` calls onto materialized columns is already merged ([#55408](https://github.com/PostHog/posthog/pull/55408)), so the moment a property gets materialized, existing queries against it become cheaper without anyone editing a dashboard.

- **Evaluating ClickHouse's native JSON type.** ClickHouse recently introduced a first-class JSON column type that stores properties as typed subcolumns under the hood, rather than parsing a string blob on every query. [Team ClickHouse](/teams/clickhouse) has set up an experimental table on the test cluster; on an initial 20-query benchmark, the new type runs roughly 30% faster than the existing properties-string-plus-materialized-columns approach, with substantial storage savings from collapsing the materialized columns into typed paths within the JSON column. The new type also requires ClickHouse's new query analyzer to perform well, which is the same analyzer we are rolling out in section 1. The remaining work is to understand backfill cost, query-semantics edge cases, and how the new type composes with the dynamic-materialized-column work above before we decide whether to migrate the production schema.

- **Lazy computation in web analytics and marketing analytics.** Pre-aggregated tables address the common queries; lazy computation addresses the long tail. Combining them gives fast results on the queries customers actually run, not just the ones the team predicted in advance.

- **Predictive cache warming.** Lazy computation is currently reactive: it computes when asked. If we can predict which conversion events a customer is about to look at in web analytics, or which experiment metric an owner is about to expand, we can warm the cache ahead of the click. The architecture is intentionally separate from the executor itself; it is a service that calls `ensure_precomputed` on its best guess.

- **Continuous autoresearch.** Beyond the initial hackathon result, the pipeline described in section 6 will run autoresearch on a steady stream of slow queries from production and surface candidate optimizations for human review.

## Summary

PostHog queries are meaningfully faster across every product surface than they were a few months ago, and we expect to make them meaningfully faster again over the coming months.
Query performance is staffed and prioritized as a long-term commitment, not as a periodic project.

If you have specific performance concerns about your workload, our engineering team is happy to dig into your query patterns directly; reach out to your account contact or open a [support ticket](https://us.posthog.com/home#supportModal).
The teams contributing to this work include [Query Performance](/teams/query-performance), [Analytics Platform](/teams/analytics-platform), and [ClickHouse](/teams/clickhouse), and all of it ships in the open at [PostHog/posthog](https://github.com/PostHog/posthog).
