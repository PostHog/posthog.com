---
title: How we use Logs at PostHog
date: 2025-23-01
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/milk_meme_1_049755a42a.jpg
featuredImageType: full
category: Product
tags:
    - Logs
seo:
    {
        metaTitle: 'How PostHog uses PostHog Logs for PostHog',
        metaDescription: 'We asked our engineers how they use Logs in their every day work and this is what they told us.',
    }
---

If there’s something we do a lot here at PostHog (well, there’s many things but this one is top three), it’s [dogfooding](/product-engineers/dogfooding) our own product.

This is a crucial part of how we build better products. We're building tools for engineers, so having our own engineers using them helps us get feedback, feature requests, and even haikus.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_01_22_at_15_53_53_2x_362b2ecaf8.png"
    alt="engineer giving logs feedback"
    classes="rounded"
/>

Our team loves using Logs to debug PostHog. Here's the most important things they've learned about doing this effectively so far.

## When “everything looks fine” isn’t true

For [Sven, Platform Engineer in the Infrastructure Team](/community/profiles/35250), opening Logs usually means something already feels off. It might start with an alert, a bug report, or a suspicious anomaly. Lately, that often means checking whether reported SQL injection attempts actually went anywhere.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Logs_screen_light_109f882754.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Logs_screen_dark_fb1c06937f.png"
    alt="Logs user details"
    classes="rounded"
/>

One case stood out: repeated out-of-Memory crashes on a node, with no obvious explanation. Sven opened Logs, filtered down to everything running on that node, and then started ruling things out. Normal-looking logs went first, then more normal-looking logs, until only something odd remained - gzipped noise showing up where it really shouldn’t.

That “noise” turned out to be an application logging huge compressed payloads. The old log shipping infrastructure dutifully tried to read all of it, but the logs were far too large and it kept crashing, sometimes taking other applications with it.

This was exactly the kind of problem the previous logging setup was good at hiding. That system discarded the problematic data, so everything looked mostly fine… apart for the unexplained crashes.

Today, Sven can get from “there are way too many logs” to “ah, that’s it” pretty quickly. Include and exclude filters make it easy to carve down large datasets without guessing. Tracking slow HTTP requests, for example, is as simple as filtering for requests over 600 ms and seeing the results update immediately.

Sven still checks Grafana/Loki when he needs older history, but for day-to-day investigations PostHog Logs has become the default. It’s faster, more flexible, and easier to reason about,  especially when the problem isn’t obvious yet.

## Logs, but with the full picture

[Rory (ClickHouse Engineer)](/community/profiles/36766) and his team used to query built-in ClickHouse tables directly to inspect logs. The data was there, but correlating with other systems and getting a high-level overview was painful. Until we built PostHog Logs.

Their setup now is intentionally simple. ClickHouse runs on EC2 as a systemd service. systemd writes logs to journald, Vector reads from journald, and sends everything to PostHog via OpenTelemetry. As a bonus, this doesn’t just include ClickHouse logs; it brings in system logs too.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/log_person_details_7948949dbb.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/log_person_details_dark_f2d3cbd9b4.png"
    alt="Logs screen"
    classes="rounded"
/>

Configuration is minimal, maintenance is basically zero, and anything that supports OTel “just works.”

Most of Rory’s questions are straightforward but time-sensitive:
- When did this error start?
- How widespread is it?
- Can I quickly share this log with someone else?

The signals were technically available before, but Logs makes it much faster to see patterns, understand impact, and collaborate. Errors are easier to scope, links are easy to share, and everything loads fast, noticeably faster than heavier setups like Elasticsearch.

## Debugging without the tab circus

[Jon, Product Engineer in the Logs team](/community/profiles/38376), spends a lot of time inside Logs. Which actually makes total sense, because he’s one of the people working on it. 

Jon rarely starts by staring at log lines and hoping for enlightenment (at least he says so). Instead, he narrows the blast radius first, a specific surface, service, or severity, until the noise drops enough for a pattern to show itself. As he tweaks the filters, the sparkline responds instantly, which is usually faster than his own intuition and much more honest.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Logs_details_light_42368d34a6.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Logs_details_dark_8b34015a7d.png"
    alt="Logs details"
    classes="rounded"
/>

Once something stands out, he digs into the details. Because logs are ingested as structured data, whether they come from OpenTelemetry or PostHog’s own SDKs, the metadata isn’t just there for reference. A trace ID or request ID becomes the fastest way to reframe the investigation. 

If he needs a quick reality check, Jon lets PostHog explain what the error is trying (and failing) to do, in human language. And when things are actively on fire, Live Tail is there to stream logs in real time.

> “The real superpower is how this connects to the front end, because we capture browser logs via PostHog JS. They’re automatically linked to the session and the user IDs. I can search for a front-end exception and jump directly into the session replay to watch the exact moment the bug happened,” he says. 

This means that logs are now part of the same space as [replays](/session-replay), [errors](/error-tracking), and [analytics](/product-analytics), which removes a lot of back-and-forth and makes debugging feel noticeably quicker.

—

Logs shows up in the same way across teams, making it easier to debug, especially because all the user context is already in PostHog and we don’t have to switch tools.

We use Logs because it fits into how we already debug, not because we have to (well, except for Jon because he’s working on it). And that’s still the bar we hold it to.

[Try it out](https://app.posthog.com/logs) and start debugging where your data already is.

