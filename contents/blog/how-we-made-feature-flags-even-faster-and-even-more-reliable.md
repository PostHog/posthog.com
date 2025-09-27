---
date: 2025-10-03
title: How we made feature flags even faster and even more reliable
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

Feature-flags-as-a-service is an interesting space. If your service stops working, it affects both your customers _and_ your customer's customers, since they rely on you to make sure their app works. When your flags are slow, your customer's entire application slows down. When they're unreliable, it's not just your customers who notice—it's their customers too.

We've [written before](/blog/how-we-improved-feature-flags-resiliency) about making PostHog's feature flags more resilient through local evaluation, caching strategies, and architectural improvements. Those improvements worked well, but as we've grown significantly over the past two years since that post, we hit new scaling challenges that required a more fundamental approach.

This post is about the next chapter: we completely rewrote our feature flag evaluation service from scratch in Rust to make it faster, more reliable, and dramatically cheaper to operate.

The goals were straightforward – better performance, better reliability, and lower operational costs. What we achieved exceeded our expectations on all fronts.

## Why rewrite?

Our previous work focused on architectural patterns like local evaluation, caching, and graceful degradation. Those improvements worked well, but the core Django-based service still had fundamental bottlenecks that no amount of optimization could fix.

The problems fell into a few categories:

**Technical debt had accumulated over time.** Database queries were doing heavy lifting that belonged in application code. Cohort evaluations required expensive joins across multiple tables. Most critically, we were evaluating flag conditions inside database queries rather than in memory, which meant every flag evaluation required parsing conditions in SQL and transferring more data than necessary.

**We were hitting hard efficiency limits.** The Django service was handling ~500k requests per minute but required 300 pods to do so, costing around $8k per month just for compute resources. For context, that's a lot of money for what should be a relatively simple operation.

**Reliability was still fragile.** The service relied heavily on PgBouncer for connection pooling, which introduced complexity and additional failure modes. We lacked proper code-level timeout primitives and were relying on PgBouncer settings that were clunky and often failed during database slowdowns, leading to cascading failures.

When we looked at projections for 5x-ing our current load, the math didn't work. We needed a fundamentally different approach.

## What we changed

### Rewriting in Rust

Moving from Django to Rust was a significant decision that we didn't take lightly. We evaluated several options:

- **FastAPI with async Python** would have been the easiest migration path, reusing business logic, but offered limited performance gains and still lacked good timeout primitives.
- **Node.js with HyperExpress** showed promising benchmarks but locked us into a C++ binding with a small community (1.3k GitHub stars), creating future maintenance risk.
- **Rust with axum** required starting from scratch but offered the best long-term characteristics.

The benchmark differences were stark: Rust's axum framework was achieving ~32k requests per second compared to Django's ~1.5k—a 21x throughput improvement. But beyond raw performance, Rust offered several advantages crucial for flag infrastructure:

The language's type system makes it much harder to write buggy code, which matters when you're building infrastructure that thousands of applications depend on. We also had confidence from our capture service rewrite, where Rust had already demonstrated massive efficiency gains.

Most importantly, Rust gave us proper code-level timeout primitives, eliminating our problematic dependency on PgBouncer-level settings. No more relying on external connection pooling for reliability.

### Moving evaluation logic out of the database

The biggest architectural change was moving flag condition evaluation from SQL to application code. Previously, we were doing complex property matching inside database queries, which required expensive joins and data transfers.

Now we:

1. Fetch all relevant person properties in a single query at the start of each request
2. Evaluate all flag conditions in memory, in parallel
3. Return results without additional database round-trips

This front-loads the database work while moving CPU-intensive evaluation logic to where it belongs—in application code that can leverage multiple cores effectively. It also means we're transferring less data and can cache person properties more effectively.

### Cohort caching

Cohort-based flags were some of our slowest queries because they required complex joins to determine membership. We now cache cohort membership at the application level rather than computing it on-demand for every flag evaluation.

This eliminated one of our biggest performance bottlenecks and made cohort-based flags just as fast as simple property-based flags.

### Simplified architecture

We removed PgBouncer from the deployment entirely. Fewer moving parts means fewer things that can break, and much simpler debugging when they do.

The new service connects directly to the database with proper connection pooling built into the Rust application itself, giving us much better control over timeouts and error handling.

## Results

The improvements were immediate and substantial:

**Performance gains:**

- p99 latency: 400ms → 71ms (82% improvement)
- p95 latency: 138ms → 37ms (73% improvement)  
- p90 latency: 81ms → 22ms (73% improvement)
- p50 latency: 16ms → 4.4ms (72% improvement)

These aren't just synthetic benchmarks—these are real-world improvements under production load with the same traffic patterns.

**Cost reduction:**

The efficiency gains were similarly ridiculous. Our Django service required ~300 pods to handle ~500k requests per minute at a cost of ~$8k/month. The new Rust service handles the same ~500k req/min using only 60 pods, costing around ~$1k/month.

That's an 87% reduction in compute costs while serving identical traffic. The new service uses just 13% of the compute resources compared to the previous implementation.

**Reliability improvements:**

By decoupling flag evaluation from database performance, we've eliminated a major source of cascading failures. Even during periods of database pressure or maintenance, the flags service remains responsive.

Cohort-based flags, which were previously our achilles heel requiring complex joins, now resolve instantly from cache. The proper timeout handling means we fail fast and gracefully instead of hanging indefinitely when things go wrong.

Since fully migrating to this new service, we've had zero feature flag outages. *Knocks on wood* — feel free to link back to this post if that streak ever ends.

## The bigger picture

This rewrite reinforces a principle we've learned repeatedly at PostHog: sometimes the best optimization is doing less. Fewer database queries, fewer service dependencies, fewer opportunities for things to go wrong.

The performance gains are impressive, but the reliability improvements matter more. Feature flags are infrastructure that needs to be boring—predictable, fast, and invisible when working correctly. When flags start having issues, they don't just affect your monitoring dashboards; they affect your customers' actual applications.

By simplifying the architecture and eliminating external dependencies like PgBouncer, we've built a system that's much easier to reason about and significantly harder to break. It's one of those rewrites where everything just works better.

## What's next

If you're using PostHog's feature flags, you're already benefiting from these improvements automatically. No configuration changes, no migration steps—just better performance and reliability.

For even faster flag evaluation, consider enabling [local evaluation](/docs/feature-flags/local-evaluation) for your server-side applications. While this rewrite dramatically improved our `/flags` endpoint, local evaluation eliminates network round-trips entirely by evaluating flags directly on your server. It's the fastest possible way to evaluate flags, especially for high-traffic applications.

As we continue evolving our feature flag infrastructure, our focus remains on the fundamentals: making flags fast, reliable, and cost-effective. Because the best feature flag service is one you never have to think about.
