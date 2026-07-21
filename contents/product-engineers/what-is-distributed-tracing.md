---
title: 'What is distributed tracing? (A guide for engineers)'
date: 2026-06-05
author:
  - daniel-visca
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/happy-hog.png
featuredImageType: full
tags:
  - Engineering
  - Product engineers
crosspost:
  - Blog
seo:
  metaTitle: 'What is distributed tracing? A guide for engineers'
  metaDescription: >-
    Here's how traces and spans work, what tracing shows you that logs and metrics can't, and how to set it up.
---

Modern apps rarely live in one process. A single user action fans out across a web server, a handful of internal services, a queue or two, a database, and a few third-party APIs. When that request is slow or fails, the hard part isn't fixing the bug, it's finding *which* of those hops caused it.

**Distributed tracing** is how you find it. It follows a single request end to end, across every service it touches, and shows you exactly where the time went and where things broke.

This guide covers what distributed tracing is, how traces and spans work, what it shows you that logs and metrics can't, and how it differs from the other thing people call "tracing" these days, LLM tracing.

## What is distributed tracing?

[Distributed tracing](/docs/distributed-tracing) is a technique for tracking a request as it moves through a distributed system, recording the path it takes and the time it spends at each step. The result, a **trace**, is the complete story of one request: what called what, in what order, and how long each part took.

It's the third pillar of observability, alongside [logs](/docs/logs) (discrete events: "this happened at this time") and **metrics** (aggregates over time: "p99 latency was 800ms"). Logs and metrics tell you *that* something is wrong. Distributed tracing tells you *where*.

The word "distributed" matters. Tracing a request inside a single process is useful, but the real payoff comes when a request crosses service boundaries, queues, and network calls, the exact places where it's hardest to reason about what happened. Distributed tracing stitches those separate hops back into one connected view.

## How distributed tracing works

A trace is made up of **spans**. Each span is a single unit of work, like an incoming HTTP request, a database query, or a call to a payment API.

Spans nest into a tree. The incoming request is the **root span**, and everything it triggers, every downstream call, query, and job, becomes a child span underneath it. Each span records:

- A **name** and **service**, what ran, and where
- A **start time** and **duration**, when it happened, and how long it took
- A **status**, whether it succeeded or failed
- **Attributes**, any context you attach, like a user ID, a query, or a feature flag value

Two ideas make this work across services:

1. **A shared trace ID.** Every span in a single request carries the same `trace_id`. That's what lets you reconstruct the whole request as a waterfall, even when its spans were emitted by five different services on five different machines.

2. **Context propagation.** When one service calls another, it passes the trace context (the trace ID and the current span ID) along with the request, usually in HTTP headers. The receiving service attaches its spans to that same trace. This is the "distributed" part, and it's what separates distributed tracing from simple in-process timing.

The industry standard for all of this is [OpenTelemetry](https://opentelemetry.io/), a vendor-neutral set of APIs, SDKs, and a wire protocol (OTLP) for generating and exporting traces. Instrument with OpenTelemetry once, and you can send your traces to any compatible backend without rewriting your code.

## What distributed tracing shows you that logs and metrics can't

Each observability signal answers a different question:

| Signal | What it tells you | Example |
|--------|-------------------|---------|
| **Metrics** | The aggregate shape of behavior | "p99 checkout latency is 3.1s" |
| [**Logs**](/docs/logs) | What happened at one point | "Inventory service returned 200 with 0 items" |
| [**Errors**](/docs/error-tracking) | What broke | "TypeError: cannot read property 'price' of undefined" |
| [**Distributed tracing**](/docs/distributed-tracing) | How the request flowed and where time went | "Checkout took 3.2s, and 2.8s of it was waiting on the inventory service" |

Metrics tell you something is slow. Logs tell you what happened at individual points, but you have to manually correlate them across services. Errors tell you something threw. Distributed tracing tells you **how the pieces connected, and where the time and failures actually came from**, across every service a request touched.

In a single process, you can often guess. Once a request fans out across services, queues, and third-party APIs, guessing stops working. Tracing replaces the guesswork with a map.

## When you need distributed tracing

### A request is slow, but you don't know which part

"The checkout endpoint is slow" normally sends you back to the code to add timers by hand. With tracing, you open the trace and read the waterfall top to bottom. The handler is fast, the payment call is fast, but one span sits at 2.8 seconds because the inventory service runs a separate query for every item in the cart instead of one query for the whole cart. You found the N+1 in seconds.

### A failure crosses service boundaries

A user hits an error on the frontend, but the root cause is three services deep. With tracing, you follow the `trace_id` from the failed request down through each service it called and land on the span that actually failed: a downstream auth service returning 401 because a token expired mid-request.

### Latency only happens sometimes

Your endpoint is usually fast, but your p99 is terrible and you can't reproduce it. Averages hide the problem. With tracing, you filter to the slow traces and compare them against the fast ones. The slow traces all share one span: a cache miss that falls through to a cold database query.

### Async and background work disappears

A request kicks off a queue job that runs later, and there's no single stack trace spanning the gap. With context propagation, the job's spans attach to the trace that started them, so you see the whole flow even when it crosses processes and time.

## What good distributed tracing looks like

Useful tracing is about instrumenting the right boundaries, not every line of code.

1. **Trace the boundaries.** Wrap incoming requests, outgoing calls, and database queries. These are where time is spent and where things fail.
2. **Give spans descriptive names.** `GET /api/checkout` and `db.query load_cart` tell you what ran at a glance. `handler` and `query` don't.
3. **Add business context as attributes.** Attach the user ID, the plan, and the feature flag variant. When a trace is slow, you want to know *who* it was slow for.
4. **Propagate context across services.** Pass trace context with every outgoing call so spans from different services join the same trace. This is what makes tracing *distributed*.

## Distributed tracing vs LLM tracing

If you've searched for "tracing" recently, you've probably seen the term used in two very different contexts, and it's worth being clear about the difference:

- **Distributed tracing** (the subject of this guide) is an APM technique. It traces a request across the services, databases, and APIs of a backend system to find latency and failures. The unit of work is a span; the standard is OpenTelemetry.

- **LLM tracing** (sometimes called [AI observability](/ai-observability)) traces a single call or conversation through an AI application, the prompts, model generations, tool calls, token usage, and cost. The goal is debugging and evaluating LLM behavior, not backend performance.

They share vocabulary, "trace" and "span", because LLM tracing borrowed the model from distributed tracing. But they answer different questions, for different audiences, with different tooling. When this guide says "tracing," it means distributed tracing for application performance. If you're debugging an AI agent or tracking LLM costs, you want [LLM observability](/docs/ai-observability) instead.

## Distributed tracing with PostHog

PostHog supports [distributed tracing](/docs/distributed-tracing) over OpenTelemetry. Because it's a standard OTLP receiver, there's no proprietary SDK: instrument your app with the OpenTelemetry libraries you already use, point your trace exporter at PostHog, and add your project token.

The advantage of tracing in PostHog is that your traces live in the same project as [Session Replay](/docs/session-replay), [Error Tracking](/docs/error-tracking), [Logs](/docs/logs), and [Product Analytics](/docs/product-analytics). So you don't just see that a request was slow, you can connect it to the user who experienced it and the business impact it had, in one platform instead of another observability vendor to run.

- **[Get started with distributed tracing](/docs/distributed-tracing/start-here)**, install an OpenTelemetry exporter and send your first spans
- **[Why you need distributed tracing](/docs/distributed-tracing/basics)**, a deeper look at what tracing shows you that nothing else does

If you'd rather have an LLM walk you through setup, the PostHog Wizard can install the SDK, drop in your project key, and wire up your first exporter for you:

<WizardCTA />

## FAQ

<details>
  <summary>What's the difference between tracing and distributed tracing?</summary>

In practice the terms are used interchangeably. "Tracing" originally meant in-process instrumentation that times function calls within a single program. "Distributed tracing" is the same idea extended across service boundaries by propagating a shared trace context, so spans emitted by different services join the same trace. Today, when most people say "tracing" in the context of microservices, they mean distributed tracing.

</details>

<details>
  <summary>Do I need distributed tracing if I have logs and metrics?</summary>

Logs and metrics tell you *that* something is wrong, distributed tracing tells you *where*. If your system is a single service and a database, you can usually get by with [logs](/docs/logs) and a few metrics. Once a request fans out across multiple services, queues, or third-party APIs, correlating logs by hand stops scaling and you need traces to see the whole flow.

</details>

<details>
  <summary>How do I set up distributed tracing in PostHog?</summary>

PostHog ingests traces over OpenTelemetry's standard OTLP protocol, so there's no proprietary SDK to install. Instrument your app with the OpenTelemetry libraries for your language, point your trace exporter at PostHog, and add your project token. The [Get started guide](/docs/distributed-tracing/start-here) walks through it end to end.

</details>

<details>
  <summary>What's the difference between distributed tracing and LLM tracing in PostHog?</summary>

[Distributed tracing](/docs/distributed-tracing) traces a request across the services, databases, and APIs of a backend system. [LLM observability](/docs/ai-observability) traces a single call or conversation through an AI application, including prompts, model generations, tool calls, token usage, and cost. They share vocabulary ("trace" and "span") but solve different problems, and PostHog supports both as separate products.

</details>

<details>
  <summary>Can I correlate traces with session replays and error events?</summary>

Yes. Because PostHog traces live in the same project as [Session Replay](/docs/session-replay), [Error Tracking](/docs/error-tracking), [Logs](/docs/logs), and [Product Analytics](/docs/product-analytics), you can link a slow or failed trace to the user who experienced it and the session they were in. That's the main reason to keep tracing in the same platform as the rest of your observability data instead of running a separate APM vendor.

</details>
