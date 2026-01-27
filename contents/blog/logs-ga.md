---
title: "Your logs' final destination is in GA. You always end up here anyway"
date: 2026-01-30
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/workflows_terminator_blog_3853c8567f.jpg
featuredImageType: full
category: Product
tags:
    - Logs
seo:
    {
        metaTitle: "Your logs' final destination is in GA. You always end up here anyway",
        metaDescription: 'Logs is now generally available. Debug from the same place where you identify your errors. Watch replays directly tied to the logs.',
    }
---
**[Logs](https://app.posthog.com/logs)** is where debugging actually ends. You might start with an alert, an error, or a user report. You might open a session replay or trace a request across services. But when you need to understand what really happened, what the system did, in what order, and why, you end up going through your logs. 

PostHog is now the final destination for your logs. Logs is generally available, and it lives in the same place as your errors, session replays, and product data. The place where an investigation begins is now also where it ends.

## We built it by tripping over our own logs

A lot has changed since **[we released Logs in beta](/blog/logs-beta)**, largely driven by how we use it ourselves.

In fact, we recently wrote about how PostHog engineers debug PostHog using Logs, including cases where our previous logging setup quietly hid serious problems instead of surfacing them.

In one example, a platform engineer tracked down repeated out-of-memory crashes that “looked fine” everywhere else. Only after filtering aggressively did something odd remain: huge compressed payloads being logged where they shouldn’t have been. The old internal pipeline tried to process everything, crashed repeatedly, and sometimes took other services with it.

This internal feedback shaped these improvements: better filtering, clearer visibility, and faster ways to rule out options. If you’re curious, you can **[read the full story of how we use Logs ourselves and what we’ve learned from it](/blog/how-posthog-uses-logs)**.

## When “what happened?” becomes clear

Logs is designed for the part of debugging where you already know something is wrong and need to understand why. Instead of scrolling through raw text, logs are treated as structured data you can filter and pivot around by:

- Service
- Severity
- IDs
- Users
- Any other attribute

The view updates as you filter, making it easier to scope an issue first and only read individual log lines once something stands out.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_01_21_at_16_53_37_2x_1_84e0ab03b8.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_01_21_at_16_53_57_2x_1_1afd0b3948.png"
    alt="log filters"
    classes="rounded"
/>

Frontend and backend logs live together. Browser logs captured via PostHog JS are ingested alongside backend logs and automatically linked to users and sessions, so you can move from a frontend exception to the session replay where it happened and then to the backend logs that explain what the system was doing at that moment.

Under the hood, Logs is built on standard OpenTelemetry ingestion (OTLP). There are no proprietary SDKs and no new instrumentation model to learn. If you’re already emitting logs via OpenTelemetry, you can send them to PostHog with minimal configuration and keep using the same tooling you already have.

When investigations get noisy or time is tight, you can also summarize what’s happening and highlight patterns using PostHog AI. It’s not a replacement for reading logs, but it can be a useful way to sanity-check assumptions or get oriented more quickly when there’s a lot going on.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_01_21_at_16_03_53_2x_1_b4ae4d71e8.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_01_22_at_14_53_40_2x_1_38ac84670a.png"
    alt="logs AI insights"
    classes="rounded"
/>

## How Logs fits into PostHog

All of this works because Logs lives in the same place as [error tracking](/error-tracking), [session replay](/session-replay), and [product analytics](/product-analytics). Debugging shouldn’t be a sequence of separate tools so much as a single flow that moves from signal to explanation. 

Logs is now generally available. All beta users get one month free. The free tier includes 50 GB, then costs $0.25 per GiB ingested (or $0.15 per GiB at 300 GB+), with 7-day retention and no per-seat or query fees.

If you’re already using PostHog for errors or replays, Logs fits into the workflow you already have, rather than adding a new one. [Try it out.](https://app.posthog.com/logs)


