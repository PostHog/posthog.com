---
title: ClickHouse query performance optimization
sidebar: Handbook
showTitle: true
---

Making sure PostHog operates fast at scale is key to our success.

This document outlines some tools we have to discover and fix issues.

# Tools of the trade

## 1. Grafana "Clickhouse queries - by endpoint" dashboard

https://metrics.posthog.com/d/vo7oCVZ7z/clickhouse-queries-by-endpoint

This dashboard gives a breakdown of how things are looking reliability and performance-wise.

Highly used and slow/unreliable endpoints often indicate issues with queries.

## 2. Instance status dashboard

Under https://app.posthog.com/instance/status/internal_metrics you will find various metrics and query logs.

Note that if you are a staff user you can also analyze queries by clicking on them (or copying your own queries).

This analysis will output:
- Query runtime
- Number of rows read / Bytes read
- Memory used
- Flamegraphs for CPU, time and memory

These can be useful for figuring out _why_ certain queries are performing slow.

## 3. Metabase - finding slow queries

Need more granular access to queries than these dashboards provide? Take a look at [this metabase query](https://metabase.posthog.net/question/97). Clickhouse `system` tables (e.g. `system.query_log`) provide a lot of useful information for identifying and diagnosing slow queries.

## 4. ClickHouse query benchmarks

If you have a fix, you need to make sure it works and doesn't regress.

Under the main repo, you can find a query performance benchmark suite at `ee/benchmarks`. These are run nightly on master. You can refresh this manually by running the [Benchmark workflow](https://github.com/PostHog/posthog/actions/workflows/benchmark.yml), which might be handy for chained PRs.

After fixing an issue:
1. Make sure there's an appropriate benchmark for the fix
2. Add `performance` label to your PR to get information about the performance changes

Only changes > 20% are reported. Clickhouse queries are run on a private clickhouse node from our clickhouse chart and pre-populated with data.
