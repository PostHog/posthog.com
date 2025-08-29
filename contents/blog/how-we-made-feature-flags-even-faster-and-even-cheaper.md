---
date: 2023-09-08
title: How we made feature flags even faster, even more reliable, and much cheaper
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - dylan-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
hideLastUpdated: false
---

Feature flag infrastructure occupies a unique position in the stack. Unlike analytics pipelines or product telemetry, flags can't afford to be "eventually consistent" or "best effort." When your flags are slow, your customer's entire application slows down. When they're unreliable, it's not just your customers who notice—it's their customers too.

We've [written before](/blog/how-we-improved-feature-flags-resiliency) about making PostHog's feature flags more resilient through local evaluation, caching strategies, and architectural improvements. This post is about the next chapter: rewriting our `/flags` endpoint from scratch to make it faster, cheaper, and more reliable.

The goal was simple: better performance, better reliability, and lower cost. The result exceeded our expectations on all three fronts.

## Why rewrite?

Our [previous work on flag reliability](/blog/how-we-improved-feature-flags-resiliency) focused on architectural patterns like local evaluation, caching, and graceful degradation. Those improvements worked well, but the core `/flags` endpoint still had fundamental performance bottlenecks.

The previous implementation had accumulated technical debt over time. Database queries were doing heavy lifting that belonged in application code. Cohort evaluations required expensive joins. The service relied on PgBouncer, which introduced connection pooling complexity and additional failure modes.

Most critically, we were evaluating flag conditions inside database queries rather than in memory. This meant every flag evaluation required parsing conditions in SQL, joining across multiple tables, and transferring more data than necessary.

## What we changed

### Rust for the runtime

We rewrote the service in Rust, which immediately gave us a more efficient concurrency model, better memory management, and predictable performance characteristics. Rust's zero-cost abstractions meant we could write expressive code without sacrificing speed.

### In-memory condition evaluation

Instead of evaluating flag conditions in the database, we now:

1. Fetch all relevant person properties at the start of each request
2. Evaluate all flag conditions in memory, in parallel
3. Return results without additional database round-trips

This approach front-loads the database work while moving the CPU-intensive evaluation logic to where it belongs—in application code that can leverage multiple cores effectively.

### Application-level cohort caching

Cohort membership is now cached at the application level rather than computed on-demand. This eliminates expensive database joins for cohort-based flags, which were previously some of our slowest queries.

### Simplified deployment architecture

We removed PgBouncer from the equation entirely and consolidated our deployment footprint. Fewer moving parts means fewer things that can break, and simpler debugging when they do.

## Results

The improvements were immediate and substantial:

**Performance gains:**

- p99 latency: 400ms → 71ms (82% improvement)
- p95 latency: 138ms → 37ms (73% improvement)  
- p90 latency: 81ms → 22ms (73% improvement)
- p50 latency: 16ms → 4.4ms (72% improvement)

**Cost reduction:**
The new service uses just 17% of the compute resources compared to the previous implementation while serving the same traffic volume. These infrastructure savings translate directly into cost reductions for our customers.

**Reliability improvements:**
By decoupling flag evaluation from database performance, we've eliminated a major source of cascading failures. Even during periods of database pressure or maintenance, the flags service remains responsive. Cohort-based flags, which previously required complex joins, now resolve from cache.

## The bigger picture

This rewrite exemplifies a principle we've learned repeatedly: sometimes the best optimization is doing less. Fewer database queries, fewer service dependencies, and fewer opportunities for things to go wrong.

The performance gains are significant, but the reliability improvements matter more. Feature flags are infrastructure that needs to be boring—predictable, fast, and invisible when working correctly. By simplifying the architecture and reducing external dependencies, we've built a system that's easier to reason about and harder to break.

## What's next

If you're using PostHog's `/flags` endpoint, you're already benefiting from these improvements. No configuration changes or migration steps are required—the performance and reliability gains are automatic.

For even faster flag evaluation on the server-side, consider enabling [local evaluation](/docs/feature-flags/local-evaluation). While this rewrite dramatically improved the `/flags` endpoint, local evaluation eliminates network hops entirely by computing flags directly on your server. It's the fastest way to evaluate flags, especially for high-traffic applications.

As we continue evolving our feature flag infrastructure, our focus remains on the fundamentals: making flags fast, reliable, and cost-effective. Because at the end of the day, the best feature flag service is one you never have to think about.
