---
title: Why we built our own status page
date: 2026-10-21
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - ben-white # TODO: confirm author slug
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Engineering
  - Inside PostHog
seo:
  metaTitle: Why we built our own status page
  metaDescription: How (and why) PostHog built a custom status page on top of incident.io, and the rules we follow for declaring incidents early and labeling them honestly.
---

<!--
  DRAFT SCAFFOLD. The headings and bullets are the key points to hit.
  The short prose paragraphs are a first pass at tone. Rewrite them freely.
  "TODO" notes mark places that need a real example, screenshot, or fact check.
-->

A status page has one job: when something you rely on breaks, it tells you quickly and honestly.

For a long time, ours was a hosted [incident.io](https://incident.io) page, and it did that job well. But PostHog has grown a lot since then, and a single list of components no longer told customers what they actually wanted to know.

So we built our own [status page](https://www.posthogstatus.com). This post covers why we did it, what we kept, and the rules we try to follow when things go wrong. We haven't got all of this figured out, but we'd rather share our reasoning than pretend we have.

## Lots of products, two regions, one status dot

- PostHog is now a lot of products (analytics, replay, flags, experiments, error tracking, data warehouse, and more) running in two cloud regions, US and EU.
- Customers mostly care about the parts they use. An EU customer who relies on feature flags wants to know about flags in EU, not about "PostHog Cloud" in general.
- A generic component list flattens all of this into one view, so customers had to guess whether an incident affected them.

> **TODO:** A short real example where the old page was technically correct but not useful.

## What we built

- A page for each region, with components grouped by product, so you can find your part of PostHog fast.
- Uptime history for each component (up to 90 days), so you can see if a problem is a one-off or a pattern.
- Subscriptions by email, Slack and RSS, for people who don't want to keep refreshing the page.
- **Coming soon:** live system metrics on the page, so you can see how a system is behaving yourself and not only read our summary of it. This isn't live yet. We want to get it right before we ship it.

> **TODO:** Screenshot of the region / product view. Maybe a mockup of the metrics section, clearly labeled as a preview.

## Why incident.io still runs the important part

We didn't rebuild incident management, and we don't plan to.

- incident.io is still the source of truth. Declaring incidents, posting updates, scheduling maintenance and notifying subscribers all happen there.
- Our page reads from incident.io's API, caches it at the edge, and adds the PostHog-specific context on top.
- Our reasoning: the value we can add is context about PostHog. incident.io's value is a proven workflow for running incidents and talking to customers. If we built our own version of that, it would probably be worse.

> **TODO:** One or two sentences on how the team uses incident.io day to day (on-call, Slack channels, status updates), if useful.

## Declare early, label honestly

This is the part we care about most, and it has nothing to do with code. It's about *when* we say something is wrong, and *how loudly*.

**We declare incidents early.** We often declare before we know the cause or the full impact. If an incident turns out to be small, we lose a little pride. If we wait too long, a customer can lose hours debugging their own code for a problem that was ours.

**We mark small degradation as degradation.** If something is slower or less reliable than normal for some customers, we say so, even if most people won't notice.

**The goal is accurate, not loud.** A severity label should tell you how worried to be. "Degraded performance" and "full outage" mean very different things, and we try to use them carefully:

- If we over-communicate, people learn to ignore us.
- If we under-communicate, people learn not to trust us.
- We'd like customers to be able to look at the page and get a correct feeling for what is going on.

**This means you'll see more yellow.** Our page will probably show more incidents than some others. We don't think that means we break more things. It means we tell you about more of them.

> **TODO:** How we decide between severity levels, in plain words. One example of a "barely noticeable" incident we still declared, and why.

> **TODO:** One honest example where we got it wrong (too slow or too loud) and what we changed after.

## Letting PostHog watch PostHog

- We use PostHog's self-driving framework to watch for spikes (errors, latency, ingestion lag, etc.) and start automations when it finds one. **TODO:** link to docs and confirm which signals we watch.
- **TODO:** Describe the flow briefly, e.g. spike detected → on-call alerted → incident opened in incident.io.
- This directly supports "declare early": the sooner a person sees the signal, the sooner we can tell customers.
- A person still decides what we say publicly. **TODO:** confirm.

## What's next

- Live metrics on the status page (see above).
- **TODO:** Anything else on the roadmap that's OK to mention publicly.

If something on the [status page](https://www.posthogstatus.com) is confusing, or you think we got the severity wrong, tell us. We want this to be useful, and the people who use it are the best judges of that.

> **TODO:** Add the link or channel where people should send feedback.
