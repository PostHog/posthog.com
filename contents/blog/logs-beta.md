---
title: Meet Logs (beta) – more debugging context, all in PostHog
date: 2025-12-23
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/hogs_logs_675386f4fe.jpg
featuredImageType: full
category: Product
tags:
    - Logs
seo:
    {
        metaTitle: 'Meet Logs (beta) – logs with all the tools you’re already using',
        metaDescription: 'PostHog Logs brings backend logs into the same place as error tracking, session replay, and product analytics, so debugging keeps its context instead of losing it.',
    }
---

Every developer's debugging journey ends at the same destination. You can start with an [error](/error-tracking) and get context with a [session replay](/session-replay), but eventually, you'll need logs to see what's actually happening in your system. This progression is so familiar, we barely think of it anymore.

We built [Logs (now in beta)](/docs/logs) for this debugging journey. Not as a new tool to adopt, but as the part of the investigation you were doing anyway. Now you can get the backend context behind your errors and session replays next to your favorite tools in PostHog, without having to leave the platform and open another tab. 

## Where context gets messy

When logs live outside the rest of your debugging workflow, they lose their most important attribute: context. You leave the error view, open another tool, recreate the timeframe, match request IDs, and hope you’re looking at the same execution path you were just investigating.

The logs are still accurate and the system is still observable. But the story you’re trying to piece together fragments, and understanding takes longer than it should. At PostHog, we don’t think logs should be something you switch to. They should be already there when you need them.

## Debug faster with Logs next to Session Replays and Error Tracking

With Logs, the debugging journey is continuous. 

- When you’re looking at an exception, the logs surrounding that failure are immediately available. 
- When you’re watching a session replay, you can see what the backend was doing during that exact interaction. 
- When you’re investigating a specific user or event, the relevant logs are part of the same view, not a separate search problem.

You're no longer reconstructing the timeline manually. The frontend behavior, backend activity, and failure point stay connected, making understanding faster and less error-prone.

Logs is built on OpenTelemetry, which means you don’t have to change how you log or adopt a proprietary SDK. If you’re already sending logs via OTLP, they work with PostHog out of the box.

![Logs integration](https://res.cloudinary.com/dmukukwp6/image/upload/Group_2_06b7915c26.png)

## What's next for Logs and the debugging journey

[Logs is in beta today](https://app.posthog.com/logs), free to use, and focused on tight integration with the rest of the PostHog debugging experience. 

Over the coming months, we’re working on deeper connections with Error Tracking and Session Replay, better defaults for viewing logs tied to users and events, and early AI-powered investigation so you can ask questions instead of reading through lines.

The long-term goal is straightforward, even if it’s ambitious: build a logging product where you don’t need to read log lines to understand your system. 

[Try it out](https://app.posthog.com/logs) with your existing OpenTelemetry setup and let us know what you think, we’d love to have you help us shape this product. 
