---
title: Join algorithms
sidebar: Docs
showTitle: true
---

JOINs are expensive in ClickHouse, so any opportunities to speed them up are welcome.

One of the quickest possible wins on that front is by benchmarking different join algorithms.

Newer ClickHouse versions have added more algorithms, and it's worth keeping an eye on the ones that come out and check if they help improve query performance.

In our case, we have moved away from the `default` algorithm (alias for `direct,hash`) in favor of `direct,parallel_hash`. `parallel_hash` is effectively the same as `hash`, but it does the computation in multiple buckets. It aims to be faster by consuming a bit more resources.

In our extensive benchmarking (including in our production environment), we've found that across the board using `parallel_hash` over `hash` provided us with the following speed improvements:

- *Average*: parallel_hash was 1.23x faster
- *p95*: parallel_hash was 1.49x faster
- *p99*: parallel_hash was 1.37x faster

This came at a cost of up to 1.5x more memory usage, as well as a bit more CPU usage, which were acceptable tradeoffs in our case. 