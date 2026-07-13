---
title: Your metrics don't belong in Grafana
date: 2026-07-13
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - daniel-visca
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_metrics_hero.png
featuredImageType: full
category: Product
tags:
    - Product updates
    - AI
    - Engineering
seo:
    metaTitle: Your metrics don't belong in Grafana
    metaDescription: "PostHog Metrics is in early access. Send application and infrastructure metrics over OpenTelemetry and get them next to your logs, traces, errors, and product data, so PostHog can alert you early and investigate incidents for you."
---

Last Tuesday, our checkout latency started creeping up.

Nobody noticed. No customer complained, no pager went off, and the graph was still green if you squinted. But PostHog noticed, and it dropped a message in our Slack.

So I did the laziest thing I could think of. I replied in the thread: `@posthog what's going on with checkout?`

A few minutes later it came back with an incident report, a dashboard it had built on the spot, and a short list of suggested fixes ranked by how likely each was to be the cause. I picked one. The whole thing was over before it was ever really an incident.

That workflow is why I'm more excited about Metrics than almost anything I've shipped. Not because PostHog now has metrics. Plenty of tools have metrics. It's because of where they live.

> ## TL;DR
>
> - Metrics is now in early access. Send application and infrastructure metrics to PostHog over OpenTelemetry, or with one line of `posthog.metrics` if you already run our SDK.
>
> - Your metrics sit next to your logs, traces, errors, session replays, and product data. One dataset, one query engine.
>
> - Because of that, PostHog can alert you on the leading indicator, then investigate across everything when you ask.
>
> - Ping `@posthog` in Slack and it writes the incident report, builds the dashboard, and suggests fixes.

## A metric in a silo only tells you half the story

Here is the problem with metrics in a dedicated metrics tool. The metric tells you *that* something is wrong. It never tells you *why*.

CPU is up. Latency is up. Now what? You alt-tab to your logs tool, then your tracing tool, then your error tracker, then you go ask whoever shipped this afternoon if a deploy went out. The dashboard was the easy part. The context lives in four other tabs.

A metric is only as useful as the data sitting next to it. In Grafana, there's nothing next to it. It is a very good smoke alarm with no map of the house.

That is the whole pitch for putting metrics in PostHog, and it is worth being blunt about it: the number is the least interesting part. What matters is that the number is one join away from the logs, the trace, the exception, and the session replay of the person who hit the slow request.

## The premortem

The best incident is the one that never happens.

Metrics are your leading indicators. The queue depth climbing, the p95 drifting, the error rate ticking up, all of it shows up in the numbers long before a customer feels anything. That is the window where an incident is still hypothetical, and it is the cheapest possible time to act.

PostHog watches those trends and pages you on the drift, not the outage. This is the message that started last Tuesday for me:

<!-- TODO: replace with your Slack screenshot of the PostHog metric alert. Upload via the posthog.com "Upload media" tool, paste the Cloudinary URL below. -->
![PostHog posts a metric alert into Slack before it becomes an incident](https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_slack_alert.png)

Call it a premortem. You are looking at the failure while it is still a trend on a chart, which is the only time looking at it is genuinely useful.

## Then you just ask

When you do want to dig in, you don't open six tabs. You ask.

I replied to the alert in Slack, and PostHog did the part I usually dread. It pulled the relevant metric, lined it up against our logs and traces for the same window, checked what errors fired and what changed, and wrote it up.

<!-- TODO: replace with your Slack screenshot of @posthog investigating the incident. -->
![Pinging @posthog in Slack to investigate the checkout latency incident](https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_posthog_investigating.png)

It didn't stop at a paragraph. It built a dashboard for the incident, so I had the metric, the correlated logs, and the affected requests in one place without me touching a query.

<!-- TODO: replace with a screenshot (or short ProductVideo) of the dashboard PostHog created. -->
![The dashboard PostHog built automatically while investigating](https://res.cloudinary.com/dmukukwp6/image/upload/PLACEHOLDER_incident_dashboard.png)

And it gave me suggested actions, ranked, with the reasoning attached. Not "have you tried turning it off and on again," but specific next steps tied to what it actually found in our data.

The postmortem, in other words, wrote itself. Because by the time I'd normally sit down to write one, it was already done.

## Why this only works here

You cannot bolt this onto a standalone metrics tool, and that is not a knock on those tools. It is just architecture.

PostHog can do this because it is one dataset. Metrics, [logs](/docs/logs), [distributed tracing](/docs/distributed-tracing), [error tracking](/docs/error-tracking), [session replay](/session-replay), and [product analytics](/product-analytics) all land in the same warehouse, behind the same [SQL](/docs/sql), readable by the same AI. When you ask `@posthog` what happened, it isn't guessing from a graph. It is querying everything at once.

Grafana can chart a metric beautifully. It cannot pull the session replay of the user who hit the slow request, or the exception that fired at the same second, or the feature flag that flipped in that release. PostHog can, because all of it is already sitting right there next to the number.

That is the difference between a metric that tells you something is wrong and a metric that helps you fix it.

## Get it

Metrics is in early access right now. If you already use PostHog, recording a metric is one line:

```js
// A counter for things that only go up
posthog.metrics.count('checkout.completed')

// A gauge for values that go up and down
posthog.metrics.gauge('queue.depth', 17)

// A histogram for distributions like durations
posthog.metrics.histogram('api.request.duration', 187, { unit: 'ms' })
```

Not on our SDK, or sending from your backend and infrastructure? Point any OpenTelemetry exporter at PostHog's OTLP endpoint. No PostHog-specific packages, no extra agents.

Early access is rolling out now. Read the [Metrics docs](/docs/metrics) to send your first data point, and if you want in, let us know so we can flip it on for you.

<p>
    <CallToAction to="/docs/metrics">
        Read the Metrics docs
    </CallToAction>
</p>
