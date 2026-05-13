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
The numbers below compare two weeks of customer-facing queries on our US Cloud cluster: one in late February 2026, one in early May 2026.

The window is shorter than the year-over-year comparison we would prefer.
The archive table that retains the data we need only goes back to late January 2026, so a year-on-year view is not yet possible.
The roughly ten-week window below is the longest reliable comparison we can show today; we will publish the full year-over-year view once the archive depth catches up.

Note that the new ClickHouse cluster described in section 1 was cut over in mid-January 2026, before this comparison window starts: both the February and the May samples are already running on the new cluster. The hardware change itself was substantial, roughly 3× peak read throughput compared to the old cluster, and that improvement is **not** captured in the latency numbers below. The improvements shown are a separate set of software wins that landed on top of the new cluster, not a measurement of it.
Earlier optimization work that predates the comparison window (most of what shipped before January 2026) is similarly not captured here.

**Cluster-wide, across every customer-facing query, latency dropped at every percentile we measure:**

| Metric | Feb 23 to Mar 1 | May 6 to May 12 | Change |
|---|---|---|---|
| p50 query latency | 177 ms | 155 ms | -12% |
| p90 query latency | 1,104 ms | 753 ms | -32% |
| p99 query latency | 10.3 s | 5.8 s | -43% |
| p99.9 query latency | 39.9 s | 25.5 s | -36% |

Over the same window, query volume rose roughly 24% and total data scanned rose roughly 72%, so the latency improvement is set against meaningfully more load on the cluster, not less.
The improvement is largest in the tail, which is the part customers feel the most: the share of queries that took longer than one second fell from 11.1% to 7.6%, and the share that took longer than ten seconds fell from 1.05% to 0.46%.

**By HogQL query type:**

| Query type | p50 (Feb / May) | p90 (Feb / May) | p99 (Feb / May) |
|---|---|---|---|
| TrendsQuery | 338 / 316 ms (-7%) | 2.14 / 1.46 s (-32%) | 15.1 / 7.8 s (-48%) |
| FunnelsQuery | 541 / 513 ms (-5%) | 2.63 / 2.13 s (-19%) | 16.2 / 12.5 s (-23%) |
| HogQLQuery | 159 / 154 ms (-3%) | 1.14 / 0.89 s (-21%) | 11.8 / 6.8 s (-43%) |
| ExperimentQuery | 900 / 568 ms (-37%) | 6.7 / 3.0 s (-56%) | 32.1 / 26.9 s (-16%) |
| ExperimentExposureQuery | 290 / 246 ms (-15%) | 2.58 / 1.06 s (-59%) | 16.0 / 7.0 s (-56%) |
| ErrorTrackingQuery | 312 / 269 ms (-14%) | 1.80 / 0.95 s (-47%) | 14.9 / 4.7 s (-69%) |
| LifecycleQuery | 565 / 604 ms (+7%) | 2.43 / 2.04 s (-16%) | 22.7 / 11.6 s (-49%) |
| RetentionQuery | 510 / 915 ms (+80%) | 2.21 / 2.90 s (+31%) | 15.2 / 18.0 s (+19%) |
| MarketingAnalyticsAggregatedQuery | 2.5 / 3.2 s (+31%) | 7.6 / 9.6 s (+27%) | 39.6 / 47.8 s (+21%) |
| MarketingAnalyticsTableQuery | 2.3 / 3.3 s (+39%) | 6.1 / 10.1 s (+65%) | 30.0 / 44.5 s (+48%) |

Not everything improved.
RetentionQuery and both marketing-analytics query types regressed across all percentiles in the comparison window.
The regressions are mostly consistent with workstreams that are in progress but not yet shipped (marketing-analytics preaggregation and lazy computation, both listed under "What is in flight" below, and active improvements to retention).
Where we have a clear regression we are working on it; we are not going to claim universal wins.

A practical caveat on the cluster-wide table: the way we tag queries from some products expanded significantly in March 2026 (see section 6 on tooling and observability), which shifts the population mix for any individual product's per-product line between the two periods.
The cluster-wide totals and the per-query-type breakdown above are unaffected by that tagging change, because they aggregate over the underlying query, not the tag.

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

- **A new production ClickHouse cluster.** Production traffic in the US region moved to a new cluster in mid-January 2026. The new cluster runs on 20 bare-metal AWS i7ie instances, each with around 120 TB of local NVMe storage and 300 Gbit network bandwidth. The most important change is moving from EBS-backed storage to local NVMe: data is read directly off local disk rather than over the network from an EBS volume. Peak measured read throughput on the new cluster is roughly 3× that of the old one. This change alone is the single largest query-performance win in the period covered by this post.

- **ClickHouse 26.3 upgrade.** The production cluster moved from 25.x to ClickHouse 26.3 in April 2026 ([#54222](https://github.com/PostHog/posthog/pull/54222), [#54696](https://github.com/PostHog/posthog/pull/54696)). The upgrade unlocks performance and correctness fixes that were not backported to 25.12. We are also rolling out ClickHouse's new query analyzer to selected teams ([#51340](https://github.com/PostHog/posthog/pull/51340)).

- **Satellite clusters for specialised workloads.** Rather than running everything on a single shared cluster, we introduced satellite ClickHouse clusters in early 2026 for AI events, sessions, ops, and auxiliary workloads ([#52869](https://github.com/PostHog/posthog/pull/52869), [#58175](https://github.com/PostHog/posthog/pull/58175), [#52045](https://github.com/PostHog/posthog/pull/52045)). The main multi-shard DATA cluster handles customer-facing analytical queries; the satellites isolate workloads that would otherwise compete for the same resources.

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

## 4. HogQL parser caching and AST speedups

Every HogQL query is parsed into an AST, walked by a chain of visitors (the resolver, the property-type swapper, the printer, and so on), and turned into ClickHouse SQL.
For small queries the parse is dwarfed by the ClickHouse scan time.
For complex queries, and for any workload that repeats the same query shape (dashboards, insights, alerts, anything on a refresh loop), the parse and AST traversal add up.

Two recent improvements:

- **A bounded LRU cache for parsed ASTs** ([#58269](https://github.com/PostHog/posthog/pull/58269)). Separate buckets for trusted in-code template strings and user input, each with its own size limit, plus hit-rate metrics so we can tune the cache sizes per workload. In production, the cache hit rate on `parse_select` is around 70%. On the workloads where queries repeat (dashboards, insights, and most customer-facing traffic), the p50 of `parse_statement_to_node` dropped from 12.5 ms to 3.7 ms, roughly a 3.4× speedup, and 46% of parses now complete in under one millisecond. The tail of unique, never-cached queries is unchanged, as designed.

- **A 2.7 to 4.4× speedup on every AST visitor** ([#58255](https://github.com/PostHog/posthog/pull/58255)). AST node classes now use `__slots__` and the `accept()` method-name dispatch is cached. Visitors are pervasive, so this affects every code path that touches HogQL.

Neither change affects what ClickHouse sees; both are pure Python-side optimizations.
But every HogQL query goes through this code path, so the aggregate CPU savings across the cluster are significant.

## 5. Autonomous query optimization

At a recent team offsite, we evaluated [autoresearch](https://github.com/karpathy/autoresearch) (Andrej Karpathy's pattern of giving an AI agent a benchmark and letting it iterate) against our slow ClickHouse queries.
Within the first day, the agent identified a bug that had been in the codebase for three years: HogQL's per-team timezone support was stopping ClickHouse from fully using its primary key on every query that filtered by `timestamp`.

The fix ([#54819](https://github.com/PostHog/posthog/pull/54819)) restored partition and primary-key pruning.
On the benchmark query, ClickHouse scanned 62 percent fewer granules.
Wall-clock time on a 7-day funnel improved by 22 to 37 percent; on wider date ranges the relative improvement is smaller, but the granule reduction holds.

We are now building a continuous version of this pipeline.
It pulls slow queries from `system.query_log`, spins up an isolated sandbox per query, runs the autoresearch loop, and posts the most promising candidates as draft PRs for engineer review.
The full writeup of the initial result is in our [companion post](/blog/autoresearch-found-a-3-year-old-clickhouse-bug).

The substantive value here is that the system optimizes the queries customers actually run, not the synthetic ones a benchmark suite might cover.

## 6. Tooling and observability

Performance optimization at scale requires good attribution (knowing which product, code path, or customer action issued each query) and the right investigation tooling so that any engineer at PostHog can diagnose a slow query without escalating to a specialist.
A substantial portion of the past year went into both.

- **Query attribution.** Every ClickHouse query is tagged with the product that issued it, the source file, the cache key, the execution mode, and, for queries coming from our MCP server, the specific MCP tool ([#52328 et seq.](https://github.com/PostHog/posthog/pull/52328), [#51654](https://github.com/PostHog/posthog/pull/51654), [#52349](https://github.com/PostHog/posthog/pull/52349), [#49088](https://github.com/PostHog/posthog/pull/49088), [#49946](https://github.com/PostHog/posthog/pull/49946), [#57120](https://github.com/PostHog/posthog/pull/57120)). Local development fails untagged queries so new code paths cannot accidentally bypass the tagging ([#55901](https://github.com/PostHog/posthog/pull/55901)).

- **Query profiling.** A flamegraph view in our internal debug panel lets engineers see exactly where time is spent in a slow query, with `trace_log` data aggregated across cluster nodes ([#52210](https://github.com/PostHog/posthog/pull/52210), [#52286](https://github.com/PostHog/posthog/pull/52286)).

- **Investigation surface.** A CLI for running ad-hoc queries against `system.query_log` from any engineer's terminal ([#56800](https://github.com/PostHog/posthog/pull/56800)), so per-team and per-product investigations take minutes rather than being a specialist task. The "Measured impact" tables at the top of this post were produced through that CLI.

With per-product labels and a low-friction investigation path, we can rank queries by total CPU cost across the cluster and target optimization work at the highest-spend paths rather than guessing.
The same data feeds the AI-driven query optimization described in section 5.

## What is in flight

Several initiatives are landing or in progress:

- **A redesigned sessions table.** Sessions queries (web analytics, session replay search, anything that asks "how many sessions did X this week") currently read raw events and group by session ID at query time. We are rolling out **sessions v3**, an `AggregatingMergeTree` table populated by a ClickHouse materialized view that fires on every event insert. Each event partially updates a row keyed on session ID, so by the time a query runs most of the aggregation work has already happened. v3 is a redesign of the existing sessions table with a partition and primary key optimized for the actual access pattern, a property map for low-volume ad-network click IDs (so adding a new one is no longer a schema migration), presence bits stored separately from values (so channel-type queries read one bit per row instead of a 100-character string), and a single JSON parse per event rather than one per column ([#38245](https://github.com/PostHog/posthog/pull/38245), [#39092](https://github.com/PostHog/posthog/pull/39092), [#39959](https://github.com/PostHog/posthog/pull/39959)). The cutover is the largest backfill operation we have run; substantial pipeline work has gone into handling the `TOO_MANY_PARTS`, `MEMORY_LIMIT_EXCEEDED`, and `TOO_MANY_SIMULTANEOUS_QUERIES` conditions ClickHouse surfaces under pressure ([#56608](https://github.com/PostHog/posthog/pull/56608), [#41374](https://github.com/PostHog/posthog/pull/41374)).

- **Dynamic materialized columns.** Today, materialized columns require a per-property migration on the events table. This is operationally heavy and means we materialize only a small handful of properties globally. The dynamic materialized column ("dmat") work introduces a per-team slot pool, currently up to 100 string columns on the events table, mapped per team to whichever JSON properties that team actually queries. A weekly batched workflow runs a single ClickHouse mutation that services every team at once, so the cost is constant in the number of teams ([#58079](https://github.com/PostHog/posthog/pull/58079), [#58251](https://github.com/PostHog/posthog/pull/58251), [#58080](https://github.com/PostHog/posthog/pull/58080), [#58081](https://github.com/PostHog/posthog/pull/58081), [#58082](https://github.com/PostHog/posthog/pull/58082)). Once it lands, each customer's most-queried properties are transparently materialized without per-property engineering work. The HogQL companion that auto-rewrites raw `JSONExtractString` calls onto materialized columns is already merged ([#55408](https://github.com/PostHog/posthog/pull/55408)), so the moment a property gets materialized, existing queries against it become cheaper without anyone editing a dashboard.

- **Evaluating ClickHouse's native JSON type.** ClickHouse recently introduced a first-class JSON column type that stores properties as typed subcolumns under the hood, rather than parsing a string blob on every query. [Team ClickHouse](/teams/clickhouse) has set up an experimental table on the test cluster; on an initial 20-query benchmark, the new type runs roughly 30% faster than the existing properties-string-plus-materialized-columns approach, with substantial storage savings from collapsing the materialized columns into typed paths within the JSON column. The new type also requires ClickHouse's new query analyzer to perform well, which is the same analyzer we are rolling out in section 1. The remaining work is to understand backfill cost, query-semantics edge cases, and how the new type composes with the dynamic-materialized-column work above before we decide whether to migrate the production schema.

- **Lazy computation in web analytics and marketing analytics.** Pre-aggregated tables address the common queries; lazy computation addresses the long tail. Combining them gives fast results on the queries customers actually run, not just the ones the team predicted in advance.

- **Predictive cache warming.** Lazy computation is currently reactive: it computes when asked. If we can predict which conversion events a customer is about to look at in web analytics, or which experiment metric an owner is about to expand, we can warm the cache ahead of the click. The architecture is intentionally separate from the executor itself; it is a service that calls `ensure_precomputed` on its best guess.

- **Continuous autoresearch.** Beyond the initial hackathon result, the pipeline described in section 5 will run autoresearch on a steady stream of slow queries from production and surface candidate optimizations for human review.

## Summary

PostHog queries are meaningfully faster across every product surface than they were a few months ago, and we expect to make them meaningfully faster again over the coming months.
Query performance is staffed and prioritized as a long-term commitment, not as a periodic project.

If you have specific performance concerns about your workload, our engineering team is happy to dig into your query patterns directly; reach out to your account contact or open a [support ticket](https://us.posthog.com/home#supportModal).
The teams contributing to this work include [Query Performance](/teams/query-performance), [Analytics Platform](/teams/analytics-platform), and [ClickHouse](/teams/clickhouse), and all of it ships in the open at [PostHog/posthog](https://github.com/PostHog/posthog).
