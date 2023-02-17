---
title: Quantiles
sidebar: Docs
showTitle: true
---

ClickHouse Docs [does contain a mention to this](https://clickhouse.com/docs/en/sql-reference/aggregate-functions/reference/quantile/), but it's important to note that the `quantile` function is non-deterministic and rather uses sampling to produce a result. You may miss this if you were introduced to this function through seeing a query in the wild or by reading the docs for the corresponding `quantiles` function instead, where this isn't super clear.

To compute exact quantiles, you should use `quantileExactExclusive` and `quantilesExactExclusive`.

