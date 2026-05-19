---
date: 2026-05-13
title: Everything we shipped this year to make PostHog queries faster
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
  metaTitle: "Everything we shipped this year to make PostHog queries faster"
  metaDescription: "An engineering roundup of the work PostHog's query performance team has shipped: sessions table redesign, pre-aggregation, HogQL speedups, autoresearch, and more."
---

"How fast is your product analytics tool" is a slightly ridiculous question to answer in the abstract.
What people actually mean when they ask it is some variant of:
"Will the dashboards I want to build load, with my volume of events, with the filters I want, without me needing a degree in ClickHouse?"

This post is the answer to that question: what the Query Performance and Analytics Platform teams have shipped over the last 12-ish months,
why, and what's next.
It's long.
You can scan headings.

We last published a post like this [back in 2022](/blog/secrets-of-posthog-query-performance).
A lot has changed since then.

## The pieces

If you're new to PostHog: nearly every interesting query you run lands on [ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion).
We store one row per event, partitioned by month, ordered by `(team_id, toDate(timestamp), event, …)`.
Most of what we do for performance is some flavor of:

- Make ClickHouse skip more data (better indexes, smarter query rewrites, more pruning).
- Don't ask ClickHouse the same question twice (precomputation, caching).
- Make the parts that aren't ClickHouse faster too (HogQL parser, planner, framework code).
- Throw better hardware at the thing that remains.

Here's what we did in each bucket.

---

## 1. Faster machines under ClickHouse

The unglamorous one first.
We upgraded the underlying ClickHouse hardware on both PostHog Cloud regions in 2025/2026.
More CPU, more RAM, faster NVMe.
This is a free uplift for every query you run. It doesn't change the algorithms, it just makes each step cheaper.

If all you want from this post is "are PostHog queries faster than they were a year ago," the honest answer is "yes, partly because we worked on it and partly because we're paying for nicer servers."
The rest of this post is the part we actually had to think about.

## 2. A new sessions table

Sessions queries (web analytics, session replay search, anything that asks "how many sessions did X this week") used to read raw events and group by session ID at query time.
That works, but it costs you the same scan over and over.

We've been rolling out **sessions v3**, an `AggregatingMergeTree` table that's populated by a ClickHouse materialized view triggered on every event insert.
Each event partially updates a row keyed on session ID, so by the time a query runs, the work is almost all done.

We did v2 a couple of years ago.
v3 is a redesign on top of what we learned operating v2 at scale ([#38245](https://github.com/PostHog/posthog/pull/38245), [#39092](https://github.com/PostHog/posthog/pull/39092), [#39959](https://github.com/PostHog/posthog/pull/39959)):

- **Partition + primary key optimized for the access pattern we actually have.** v2 used a UUID-derived timestamp in the ORDER BY in a way that fought partition pruning. v3 fixes that.
- **A property map for low-volume ad-network click IDs.** v2 had a column per ad-network click ID (`gclid`, `fbclid`, `msclkid`, `ttclid`, and so on). That meant every new ad network was a schema migration. v3 has a single `Map(String, String)` for the long tail, so we can add a new ad network without touching the table.
- **Presence bits separately from values.** Channel-type calculation only needs to know "was there a gclid", not the actual string. v3 stores those as `Boolean` columns so the channel-type query reads one bit per row instead of a 100-character string.
- **One JSON parse per event, not one per column.** v2 called `JSONExtract*` once per property, per event. v3 does a single tuple-shaped `JSONExtract` into a struct and then dereferences fields off that. The savings show up in our ingestion CPU.

We're in the middle of the cutover.
The interesting bit isn't really the schema. It's that we've spent a lot of dagster wrangling on making the backfill robust against `TOO_MANY_PARTS`, `MEMORY_LIMIT_EXCEEDED`, and `TOO_MANY_SIMULTANEOUS_QUERIES`, all of which are things ClickHouse loves to throw at you mid-backfill if you let it.
We learned the hard way that "just retry the partition" isn't enough; you need to subdivide on memory failures ([#56608](https://github.com/PostHog/posthog/pull/56608)) and you need to lean on insert delays so the cluster self-regulates ([#41374](https://github.com/PostHog/posthog/pull/41374)).

## 3. Pre-aggregated tables for web analytics

Web analytics queries are predictable.
You're almost always asking "uniques / pageviews / bounce rate / etc, by some combination of `host`, `device_type`, `pathname`, UTM source, country, …, over a date range."
That's a small enough space that we can precompute it.

[The web analytics team](/teams/web-analytics) has spent most of 2025 building this out:
hourly pre-aggregated tables for the current day, daily pre-aggregated tables for everything historical, and a query-time union that joins the two together so you get fresh-ish numbers without paying the full price ([#33018](https://github.com/PostHog/posthog/pull/33018), [#33122](https://github.com/PostHog/posthog/pull/33122)).
Filters, path cleaning, marketing attribution, and conversion goals all work against the pre-aggregated tables ([#32677](https://github.com/PostHog/posthog/pull/32677), [#32724](https://github.com/PostHog/posthog/pull/32724), [#32788](https://github.com/PostHog/posthog/pull/32788), [#39677](https://github.com/PostHog/posthog/pull/39677)).
Daily partitions on the pre-aggregated tables let us efficiently swap and re-run the previous day's data if we ever need to ([#33022](https://github.com/PostHog/posthog/pull/33022)).
The biggest customers got this enabled first ([#36014](https://github.com/PostHog/posthog/pull/36014)),
and we have asset checks that compare aggregated numbers against a raw-events ground truth so we'd notice if they ever drifted ([#33572](https://github.com/PostHog/posthog/pull/33572), [#38827](https://github.com/PostHog/posthog/pull/38827)).

For typical web analytics dashboards this is somewhere between "noticeably faster" and "a different category of fast."
We have similar work happening on the marketing analytics side now ([#54527](https://github.com/PostHog/posthog/pull/54527), [#54959](https://github.com/PostHog/posthog/pull/54959)). Same idea, different query shape.

## 4. AST-to-AST optimization, also known as: lazy computation

The pre-aggregation pattern works great if you know the queries up front.
Web analytics tiles are a fixed set; experiments exposure calculations are a fixed set; marketing attribution is mostly a fixed set.
For anything else (a Trends insight a customer just built, an ad-hoc HogQL query), we used to be out of luck.

So we built a more general thing.

It's an AST-level transformer (with a backing executor) that detects when a query matches a "we can precompute this" pattern,
hashes it,
checks if we've already computed the result for the time range it needs,
fills in any missing date ranges (lazily, only on demand),
and rewrites the query to read from the cached intermediate result instead of the raw events table.

The original PRs called it "preaggregation." We've since renamed it "lazy computation" ([#48110](https://github.com/PostHog/posthog/pull/48110)) because it's also useful for non-aggregate intermediate work.

The interesting bits:

- **Variable TTL by data age.** Today's data refreshes every 15 minutes. Yesterday's data refreshes every hour. Data from last week refreshes once a day. Data from last month is good for a week. The TTL config is a dict and the executor picks the right one per range ([#47942](https://github.com/PostHog/posthog/pull/47942)).
- **Redis pubsub for waiters.** If query A and query B want the same intermediate result, B waits on a Redis channel for A to finish, rather than computing the same thing twice ([#47707](https://github.com/PostHog/posthog/pull/47707)).
- **Partial unique constraint in Postgres.** If two waiters realize at the same time that a job has failed and try to create a replacement, one wins the row and the other waits on the winner. Concurrency is hard; the database makes it less hard.
- **Insert quorum for correctness.** When you're writing intermediate results, partial replication is the kind of bug that takes a year to notice ([#49549](https://github.com/PostHog/posthog/pull/49549)).

The first product to ship on this was experiments. Every exposure calculation for [experiments](/experiments) precomputes the population using lazy computation, with team-level toggles and a 12-hour minimum experiment runtime gate to keep costs sensible ([#50498](https://github.com/PostHog/posthog/pull/50498), [#53895](https://github.com/PostHog/posthog/pull/53895), [#55442](https://github.com/PostHog/posthog/pull/55442), [#57095](https://github.com/PostHog/posthog/pull/57095)).
We're working on adding lazy computation to web analytics and marketing analytics next.

If you want the full design, including the consistency story under concurrent writes and stale-job recovery, we've written it up in our [engineering handbook](/handbook/engineering/clickhouse/preaggregation).

## 5. Smarter use of skip indexes and materialized columns

ClickHouse has two underused features for the way most of our queries are shaped:

- **Skip indexes** (bloom filters, ngram filters, min/max) let you skip granules without scanning them, at the cost of a small amount of disk space.
- **Materialized columns** let you pull a JSON property out into its own column, so queries against that property read a small dense column rather than parsing JSON for every event.

Most queries weren't using them.

Not because the indexes weren't there, but because the queries were *almost* in the right shape but not quite, and ClickHouse's planner is strict about that.
Wrap a column in `nullIf()` and the materialized column is invisible.
Use `ilike` instead of `=` and the ngram skip index is invisible.
Use `JSONHas()` to check whether a property is set and the property map skip indexes are useless.

So we did a series of HogQL-level rewrites that normalize the AST into shapes the planner actually understands ([#44542](https://github.com/PostHog/posthog/pull/44542), [#44626](https://github.com/PostHog/posthog/pull/44626), [#44513](https://github.com/PostHog/posthog/pull/44513), [#45035](https://github.com/PostHog/posthog/pull/45035), [#44346](https://github.com/PostHog/posthog/pull/44346)).
The headline one, auto-rewriting `ilike(properties.email, '%@gmail.com')`-shaped queries to use a hidden ngram skip index, is in [#44820](https://github.com/PostHog/posthog/pull/44820).
We also added a MinMax skip index on `$session_id_uuid` so session-scoped queries can skip parts that don't overlap ([#52170](https://github.com/PostHog/posthog/pull/52170)).

Same idea repeated across the codebase: the query the user wrote is probably correct, but it isn't a *shape* ClickHouse can optimize. Rewrite it into one that is.

## 6. Persons-on-events

If you ever look at the SQL we generate, you'll see that most queries used to join events against a persons table to resolve which user did what.
Joins are expensive.
A while back we duplicated the relevant person columns onto the events row, so a "who did what" question can be answered without a join.
This year we built the dagster pipeline to backfill this onto every team that doesn't have it yet, and to keep it correct as people merge ([#58035](https://github.com/PostHog/posthog/pull/58035)).

For most customers this is invisible. Your queries just got faster.

## 7. HogQL parser, AST, and visitor speedups

Every HogQL query you run gets parsed into an AST, walked by a chain of visitors (the resolver, the property-type swapper, the printer, etc.), and then turned into ClickHouse SQL.
For small queries the parse is dwarfed by the ClickHouse scan time.
For complex queries, especially ones that go through caching, the parse and the AST traversal can add up.

A few wins from the last month alone:

- **A 14–20× speedup on AST deserialization.** We have a C++ HogQL parser and serialize ASTs in and out of it. The Python-side reconstruction was using a generic JSON parser; we moved to `orjson` plus precomputed enum field maps ([#58267](https://github.com/PostHog/posthog/pull/58267)). End-to-end `parse_select` is 5–13% faster as a result.
- **A 2.7–4.4× speedup on every AST visitor.** AST node classes now use `__slots__` and the `accept()` method-name dispatch is cached. Visitors are everywhere, so this affects basically every code path that touches HogQL ([#58255](https://github.com/PostHog/posthog/pull/58255)).
- **A 28–120× speedup on cache hits.** We added a bounded LRU cache for parsed ASTs, with separate buckets for "trusted in-code template strings" and "user input." Each bucket has its own size limit; we report hit-rate metrics so we can tune the sizes per workload ([#58269](https://github.com/PostHog/posthog/pull/58269)).

None of these change anything ClickHouse sees.
They're pure Python wins.
But every query goes through them, so the multiplier on total CPU is large.

## 8. Autoresearch

Late in this cycle we ran an experiment at our company offsite in Lisbon:
take Andrej Karpathy's [autoresearch](https://github.com/karpathy/autoresearch) idea and point it at our slow queries.
It found a bug we'd had for [three years](/blog/autoresearch-found-a-3-year-old-clickhouse-bug):
HogQL's per-team timezone support was silently stopping ClickHouse from fully using its primary key on every query that filtered by `timestamp`.

Fixing that ([#54819](https://github.com/PostHog/posthog/pull/54819)) made our test funnel 22–37% faster and cut scanned granules by 62%.

We're now building "auto-autoresearch", a pipeline that pulls slow queries from `system.query_log`, spins up an isolated sandbox per query, runs the autoresearch loop, and posts the most promising candidates as draft PRs into our team Slack.
There's a full writeup [here](/blog/autoresearch-found-a-3-year-old-clickhouse-bug).
The interesting thing about it is that it works against the queries our customers actually run, not the ones we imagined our customers running, which are different.

## 9. Query observability

You can't optimize what you can't see.
A surprising amount of our last year went into making every ClickHouse query attributable:
which product issued it ([#52328 et seq.](https://github.com/PostHog/posthog/pull/52328)),
which source file ([#51654](https://github.com/PostHog/posthog/pull/51654)),
which MCP tool if it came from an MCP server call ([#49946](https://github.com/PostHog/posthog/pull/49946), [#57120](https://github.com/PostHog/posthog/pull/57120)),
and so on.
We even fail untagged queries in local dev now, so new code paths can't accidentally bypass the tagging ([#55901](https://github.com/PostHog/posthog/pull/55901)).

This is the foundation autoresearch sits on top of. Without per-product, per-query attribution you'd be guessing about which queries to optimize.
With it you can sort `system.query_log` by total CPU spend per product and start with the worst offenders.

## What's next

A few things are in flight or about to land:

- **Lazy computation in web analytics and marketing analytics.** Pre-aggregated tables get you the common queries; lazy computation gets you the long tail. Combining them lets us hand customers fast results on the queries they actually run, not just the ones the team predicted in advance.
- **Smarter cache warming.** Right now, lazy computation is reactive: it computes when you ask. But if we can predict which conversion events someone is about to look at in web analytics, or which experiment metric an experiment owner is about to expand, we can warm the cache before they click. This is the same idea as page prefetching, applied to intermediate query results.
- **Auto-autoresearch.** As above.

The honest summary: PostHog queries are meaningfully faster than they were a year ago,
across pretty much every product surface,
and on every type of workload we care about.
We expect to make them meaningfully faster again over the next year.

If you want to follow along,
the [Query Performance team](/teams/query-performance) and the [Analytics Platform team](/teams/analytics-platform) ship most of this work in the open at [PostHog/posthog](https://github.com/PostHog/posthog), so you can just watch the PRs.
