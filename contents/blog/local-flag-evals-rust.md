---
title: 'From 270GB RAM to 5GB: Moving local flag evaluation from Django to Rust'
date: 2026-05-25
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - patricio-tarantino
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10092_Cropped_186c3c9455.png
featuredImageType: full
category: Engineering
tags:
  - Inside PostHog
  - Engineering
  - Feature flags
seo: {
  metaTitle: "From 270GB RAM to 5GB: Moving local flag evaluation from Django to Rust",
  metaDescription: "How we moved PostHog's feature flags local evaluation endpoint from Django to Rust and dropped CPU usage by 24x and memory by 56x."
}

---

I reloaded Grafana three times before I trusted the numbers. p50 latency: 40ms to 4ms. CPU usage: a fraction of before. Memory: barely there. We'd just moved the feature flags [local evaluation](/docs/feature-flags/local-evaluation) endpoint from Django to Rust. I knew it would be better. But I wasn't ready for this.

## Local evaluation explained

Local evaluation is a configurable endpoint that server-side SDKs hit to fetch [feature flag](/feature-flags) definitions. SDKs poll it every 30 seconds by default, so it gets a lot of traffic. Until recently it had its own Django deployment, sized for that traffic: about 30 pods on average in US, with autoscaling configured up to 250. Each pod requested 2 CPU cores and 9 GB of memory, so at baseline we were running 60 cores and 270 GB of RAM.

The endpoint reads cached flag definitions out of Redis, checks auth, and returns JSON. There is no flag evaluation logic, and no database queries on the hot path. The Rust feature flags service next door was already serving around 13,000 requests per second on `/flags` and `/decide`, doing the actual compute, so moving the cache read over to live in the same codebase felt overdue.

## Porting the endpoint

Porting the endpoint itself was maybe the easy part, because most of the time went into matching Django's behavior around the edges.

**Auth** was trickiest. The endpoint's Django view declared one authentication method, but a shared mixin added more behind the scenes. I noticed when Rust rejected requests that Django accepted. A related quirk: Django returned 403 (authenticated but not permitted) for some requests where Rust returned 401 (not authenticated). Same outcome for the client, but the codes mean different things, and our dashboards disagreed about what was happening. Matching Django's behavior took a few small changes on the Rust side.

**ETags** were less painful. Instead of computing our own on the Rust side (which would have required byte-identical serialization with Django), Rust reads Django's stored ETag from Redis. That side-steps the serialization problem while the two services coexist. 54% of requests return 304 Not Modified. Over half of all SDK polls move zero bytes of flag data.

**Billing and rate limiting** were the boring half: same Redis counters, same allowlist, same quota response codes, just reimplemented on the Rust side so we could match Django's outputs request-for-request.

## Splitting the fleet

SDK polling is bursty and predictable. Flag evaluation is spiky and latency-sensitive. Putting both kinds of workload on the same pods felt wrong, so we split the Rust service into two fleets using a `SERVICE_MODE` environment variable. One fleet runs in `flags` mode and serves `/flags` and `/decide`. The other runs in `definitions` mode and serves `/flags/definitions`. Both share the same secret and the same codebase, with the mode just controlling which routes get registered.

## The rollout

The rollout went in three stages. We pointed our own internal SDKs at the Rust endpoint first, diffed responses with curl, then used Contour's weighted routing to shift external traffic: 10%, then 50%, then 100% over two days. Then we updated all seven server-side SDKs to poll `/flags/definitions` directly, one PR per SDK, with the old URL still working through a route alias for older customers.

Three small bugs surfaced during the weighted rollout:

1. A missing token parameter that Django had been accepting silently.
2. The 401-vs-403 mismatch from the auth quirk above, which I caught by lining up the two services' status code rates side by side in Grafana.
3. A bug in the mixed targeting beta: the Python SDK was reading `aggregation_group_type_index` only at the flag level, so flags that mixed user and group conditions were treated as person-only. Group conditions failed locally and fell back to a server-side call. We fixed it in the Python SDK and left the others for follow-up.

## The numbers

The Rust definitions fleet now handles around 282 requests per second in US on 5 pods. Each pod requests 500m CPU and a bit under 1 GB of memory – 2.5 cores and around 5 GB total, against the 60 cores and 270 GB we used to spend. That's a 24x reduction in CPU and 56x in memory.

| | Django (before) | Rust (after) |
|---|---|---|
| Pods (US, average) | ~30 (peak 43) | 5 |
| CPU request per pod | 2,000m | 500m |
| Memory request per pod | 9,000 MB | 954 MB |
| Total CPU (at avg scale) | 60 cores | 2.5 cores |
| Total memory (at avg scale) | 270 GB | 4.8 GB |
| PGBouncer sidecars | Yes | No |
| Dedicated node pool | Yes (memory-optimized) | No (shared pool) |

Latency improved too. These are Envoy-layer measurements: pod response time, no client network. A customer's SDK sees this plus its own round-trip. Same Prometheus metric (`envoy_cluster_upstream_rq_time`) for both services, so it's apples to apples.

| | Django | Rust | Improvement |
|---|---|---|---|
| p50 | 40 ms | 4 ms | **10x faster** |
| p95 | 95 ms | 20 ms | **4.7x faster** |
| p99 | 170 ms | 37 ms | **4.6x faster** |

The cache hit rate sits at 99.98%, which means almost every request is served from Redis with zero Postgres on the hot path. The dedicated Karpenter pool of memory-optimized instances is gone.

I keep coming back to the rollout. We could shift 10% of traffic, sit with the metrics for a day, and roll back instantly if something looked off. That's what made this safe to ship fast. Cut over in one step and customer support tickets would have done the testing. I'd have been firefighting instead of writing this.

_If you want to read more about this topic, check out our blog on [Untangling Tokio and Rayon in production](/blog/untangling-rayon-and-tokio) which covers an earlier optimization on the same service, or [How we made feature flags even faster and more reliable](/blog/even-faster-more-reliable-flags) for the original migration that this one builds on._
