---
title: 'Juggling CPU-intensive and I/O bound operations with Rust: from 2s latency spikes to a near-flat 90ms line'
date: 2026-04-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - matheus-batista
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/flags_c5beffa331.png
featuredImageType: full
category: Engineering
tags:
  - Inside PostHog
  - Engineering
seo: {
  metaTitle: "Juggling CPU intensive and I/O bound operations with Rust: from 2s latency spikes to a flat 90ms line",
  metaDescription: "Learn how we discovered a big performance bottleneck in the Feature Flags service and made Tokio and Rayon play nice with each other."
}

---

Tokio, Rayon, and a Kubernetes pod walk into a bar. Nobody gets served.

Feature Flags sits in a uniquely latency-sensitive spot compared to most PostHog products. It **needs** to be as close to real time as possible, all the time. A slow flag evaluation means a customer's application is stuck waiting for a response before it can proceed. That’s a tough requirement for a service that also needs to scale well while doing a lot of compute-intensive work.

## The problem

The [Rust rewrite](/blog/even-faster-more-reliable-flags) resulted in a 10.6x faster p99 latency, together with a bunch of other performance gains. However, when we started needing to serve twice the traffic, things started to get rough again. This is how our latency looked a couple months ago:

![Image1](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Screenshot_2026_03_27_at_16_51_46_f3263bd8f6.png)

Steady request rate and CPU utilization, no external DB pressure, and no significant differences between requests (number of flags, properties, etc.). The application was "randomly" freezing up. We had to dig a little deeper into the hot path to understand what was going on.

## Tokio and Rayon

Tokio and Rayon are two very popular Rust crates (or libs). They may seem kind of similar at first, but serve very different purposes, with different structure and functionalities.

> TL;DR: Tokio allows you to **wait** for a bunch of things at the same time, and Rayon allows you to **do** a bunch of things at the same time

### Tokio

[Tokio](https://docs.rs/tokio/latest/tokio/) is the go-to Rust solution for async operations. It creates a Runtime that manages all your application's async tasks. By default, it will create a Runtime with the same number of worker threads (actual OS level threads) as the number of CPU cores available.

The management and coordination of tasks and worker threads is abstracted away from users. Tokio does it for us. Think of it as the multi-threaded Rust version of JavaScript's event loop. Tokio's tasks and whole structure is designed around the async model: waiting for a lot of operations at the same time.

### Rayon

[Rayon](https://docs.rs/rayon/latest/rayon/) is a data-processing crate. Its main purpose is to "make it drop-dead simple to convert sequential computations into parallel ones.". It can split data, process it in different threads, and glue the pieces back together. Naturally, there is overhead in coordinating this process, making it ideal for big datasets, where the overhead pays off.

By default, Rayon will also create a `ThreadPool` with, as you might have guessed it, the same number of OS-level threads as the number of CPU cores available.

## Our setup

Our initial setup used a combination of Tokio and Rayon, in an uncoordinated way. Both crates spawned the same number as the number of cores they thought were available (K8s CPU limit). That meant 100% thread oversubscription. We created twice the number of threads we should have, and Linux's CFS (the CPU scheduler that caps how much time a container actually gets to run) had to constantly juggle them.

This is where we got the initial scent of the problem, but it wasn't the main issue. It made things worse (the Linux CPU scheduler throttled harder with more threads fighting for time), but the real culprit was how we were calling Rayon in the first place.

### The culprit

```rust
let results: Vec<_> = flags_to_evaluate
  .par_iter()
  ...
```

Rayon's `par_iter()` was being called directly in the request handler, managed by Tokio, for every flag evaluation request. This means that the worker thread, which was supposed to be dealing with I/O, parked idle waiting for Rayon to process the flag payload. Not only that, but since every request tried to use Rayon's thread pool, with no backpressure, the parallel processing was being rendered useless.

Blocking the I/O worker threads is one of the single worst things that can happen to an I/O bound application. While the workers are blocked, the application won't poll futures. This means no HTTP requests being answered, no DB or cache interaction, so effectively an app-level freeze. When we got unlucky and most workers blocked simultaneously, our p99 and p95 response times would spike up to 2.5 seconds, with a big number of gateway 504 timeouts as well.

## The solution

When dealing with scenarios where you want to block the thread, like the CPU-bound computation work we need to do, we should offload it from the I/O workers. There are a few ways to do this (Alice Ryhl's [Async: What is blocking?](https://ryhl.io/blog/async-what-is-blocking/) is a great deep dive), but the core idea is: your application should not spend too much time stuck between `.await` calls.

### The dispatcher

Our chosen solution was to dispatch the work to a separate thread pool using Rayon. After setting up a proper thread budget (Tokio gets half the cores for I/O, Rayon gets the full count for compute, accepting mild oversubscription since Tokio threads are mostly parked in `.await`), we call `rayon::spawn` to dispatch the work to Rayon's thread pool, and wait for it to finish up with a `tokio::sync::oneshot` channel. This allows for us to use Rayon while leveraging the async model. The workers don't wait anymore, they effectively run free to deal with I/O.

A semaphore also gates the Rayon thread pool, working as a pressure valve. Without any backpressure, Rayon's internal work queue could grow without limit during traffic bursts, causing queueing delays to snowball. At most N batches are in-flight at once. If the pool is full, the request waits asynchronously.

On the infrastructure side, we also bumped the Kubernetes CPU limit to give the combined pools burst headroom, and pinned the thread count to the CPU _request_ rather than the _limit_. This matters because Rust's `available_parallelism()` reads the cgroup limit, not the request, so without the override the pools would silently create more threads than they had guaranteed CPU for.

We also noticed not every request benefits from Rayon. If 10 flags are going to be evaluated, the overhead is not worth it. By default, requests with under 200 flags in US (and 100 in EU) will be evaluated sequentially. This gives the parallel pool more breathing room and makes it more effective.

### The cherry on top

Feature flags can depend on other flags. If flag B depends on flag A, you need to evaluate A first. This forms a dependency graph, and how you build and traverse it matters. The old implementation was doing two wasteful things:

1. Building the graph from every flag in the system: if a request needs to evaluate 20 flags, but the team has 500 defined, the old code would still walk all 500 to build the graph. Most of that work was thrown away.

2. Using a slow algorithm to figure out evaluation order: flags need to be evaluated in stages, first the ones with no dependencies, then the ones that depend on those, and so on. The old approach repeatedly scanned the entire graph looking for "ready" nodes, which is O(n²). Fine for small graphs, painful when they grow.

The fix was straightforward. For (1), we switched to a BFS closure: start from the flags you actually need, follow their dependencies, and stop. You only touch what's reachable. For (2), we replaced the repeated scans with [Kahn's algorithm](https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm), which computes the evaluation order in a single pass, so O(V+E) instead of O(V²).

The impact was noticeable: lower memory usage (fewer flags cloned into the graph) and more stable response times. This was directly responsible for smoothing out the remaining rough edges and made the latency line even flatter.

## Results

![Image2](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Screenshot_2026_04_02_at_16_02_40_7275f7e999.png)

Please notice the differences in the Y-axis scale! The first graph shows 0 to 2.8 seconds, while the second one shows 0 to 650ms. This represents a dramatic change: the mean p99 dropped from ~460ms to ~94ms. The latency spikes are rare throughout the week, and get to at most 200ms.

The HPA scaling effects are also worth mentioning. Our previous HPA behavior was acting reactively and fighting the symptoms, short CPU usage spikes would trigger HPA scale events, but the problems were already inside the pods. We frequently went to the maximum replica count (100 pods), and that made no difference in our performance. We were effectively wasting resources. Now, we never need to get past the minimum replica count (currently, 50 pods), even during peak traffic. The service doesn't respond to the 2x diurnal traffic swing at all, the p99 is the same at 3am as it is at peak.

The DB connection pool story is also an interesting one, with a satisfying payoff. The initial symptoms pointed towards a database issue (pool utilization maxing at 100% multiple times a day, connection times spiking), but they were only a side effect of runtime starvation. Now pool utilization sits at ~10%, and connection acquire time p99 is steady at ~4ms.

## What we learned from the process

One of the most useful lessons from the whole process was the importance of iterative test cycles, incremental changes and precise instrumentation. 

When dealing with services that need to balance intensive compute and IO (and a _lot_ of other software engineering problems, really), there is no silver bullet or definitive solution. To get to a good solution that solved our issues, we had to come up with hypotheses with the information we had in hand, place the correct metrics and test them out, comparing results of different approaches.

The symptoms told us it was a database problem. It wasn't. The maxed-out connection pools, the spiking acquire times and the timeouts were all a downstream effect of the I/O runtime being starved. If we had just thrown more pods at it (which we did, at first), we'd still be firefighting today.

A few concrete takeaways:
- Defaults assume they own the machine, and won't take into account your specific usage patterns. Both Tokio and Rayon default to "use all available cores" because they assume they're the only thing running. In a container with a capped CPU budget, that assumption breaks immediately. If you run more than one thread pool, it's important to budget.

- Don't parallelize what doesn't need it (premature optimizations being the root of all evil and all that). 85–90% of our requests were paying the overhead of parallel dispatch for no benefit. Adding a threshold so that only large batches use Rayon was one of the simplest changes we made, and one of the most impactful.

- This isn't a Rust-specific problem. The same class of bug (CPU-heavy work blocking an async I/O runtime) shows up in Node.js event loops, Go goroutine schedulers, and anywhere else cooperative scheduling meets capped compute. If you're running async services in Kubernetes, check whether your runtime is actually getting to run before blaming your database.

Feature Flags now serves ~13,000 requests per second with a p99 under 100ms, on a flat fleet of 50 pods that doesn't flinch during traffic spikes. That's where we wanted to be: fast enough that flag evaluations are close to invisible to the applications relying on them.

## Further reading

If you want to go deeper on any of the topics covered here:

- [Async: What is blocking?](https://ryhl.io/blog/async-what-is-blocking/) by Alice Ryhl (Tokio maintainer). The definitive guide on why you shouldn't block async worker threads, with the exact `rayon::spawn` + oneshot pattern we adopted.
- [Mixing rayon and tokio for fun and (hair) loss](https://blog.dureuill.net/articles/dont-mix-rayon-tokio/) by Louis Dureuil (Meilisearch). A production war story about what goes wrong when Tokio and Rayon share threads. Different problem, same lesson: keep the runtimes separate and communicate via channels.
- [CPU limits and aggressive throttling in Kubernetes](https://engineering.omio.com/cpu-limits-and-aggressive-throttling-in-kubernetes-c5b20bd8a718) by Omio Engineering. Six months of random stalls traced to CFS throttling. Great explainer on how Linux's CPU scheduler works inside containers.
- [Reducing tail latencies with automatic cooperative task yielding](https://tokio.rs/blog/2020-04-preemption) by the Tokio team. Explains how Tokio's cooperative scheduler works and why long-running tasks cause tail latency spikes.
- [Using Rustlang's async Tokio runtime for CPU-bound tasks](https://www.influxdata.com/blog/using-rustlangs-async-tokio-runtime-for-cpu-bound-tasks/) by Andrew Lamb (InfluxDB/DataFusion). An alternative approach to the same problem: a dedicated Tokio runtime on a separate OS thread instead of Rayon.
- [Even faster, more reliable feature flags](/blog/even-faster-more-reliable-flags). Our earlier post on the Rust rewrite that preceded this work.

If you want to see the actual code changes:

- [Decouple large flag processing with Rayon](https://github.com/PostHog/posthog/pull/47457). The dispatcher, semaphore, thread pool tuning, and the `rayon::spawn` + oneshot pattern.
- [Optimize dependency graph with Kahn's queue and BFS closure](https://github.com/PostHog/posthog/pull/50430). The graph algorithm improvements.