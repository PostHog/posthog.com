---
date: "2026-07-10"
title: "Our session replays are opening their own pull requests"
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Frame_144166_ae3d5191ba.png
author:
  - sara-miteva
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Session replay
  - Engineering
---

Errors are the easiest data to act on in our [product improvement pipeline](/blog/what-if-your-product-built-itself). They arrive with a stack trace that's groupable and says exactly what broke and where. This makes it easy for agents to research each one, and if it's actionable, open a PR to fix it. 

[Session replays](/session-play) are a lot trickier. Someone clicks a button that doesn't respond, clicks it three more times, and leaves. Typically, nothing lands in your logs for this type of error. The only evidence is a recording nobody has time to watch. That's the most common kind of bug, and it's almost invisible to everything except a human watching the replay.

[Replay Vision](/docs/replay-vision) is our solution to this. It is our AI layer over session replay. You set up a scanner, aim it at the sessions you care about, and it reads them for you – all of them, not a sample. Scanners come in a few shapes: summarizers write up what happened in a session, scorers put a number on something like frustration, and classifiers sort sessions into buckets. 

When a scanner spots something worth acting on, it raises a signal. These flow into the Inbox, the queue at the center of PostHog's [self-driving loop](/blog/self-driving-product), where signals from across your product are grouped into reports, researched by background agents, and turned into work. 

To show you how this works, here's the details on three pull requests opened from replays. 

## The struggle scanner

The one doing the work here is a success/struggle classifier. It reads real user sessions across projects, works out whether the person actually did the thing they came to do, and tags each session `success` or `struggled`. When it tags a struggle, it drops a signal into the same pipeline our errors flow through.

![scanner behavior description](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_09_at_14_19_03_2x_7d96b9b4f4.png)

In the first two weeks, the scanner has read ~3,400 sessions and emitted ~1,850 signals. Whether half is the right number is an open question, and we'll come back to it.

Once a signal is in, it stops being a session replay problem and becomes a normal pipeline problem: cluster the related signals into a report, promote the report once it's heavy enough, hand it to a research agent, decide if it's actionable, and if so, write the fix.

![success or struggled scan](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_09_at_14_18_33_2x_114e2abcdc.png)

## Following one struggle to a PR

On July 1, at 11:30 and 11:47 UTC, two people on two different EU projects rageclicked the "Add filter" popover while trying to set up a feature flag. One of them gave up on configuring the flag entirely.

The scanner tagged both sessions as struggles and sent two signals into the pipeline. Those got grouped into one report and, a little after noon, handed to a research agent. Within a few minutes it had found the bug: the filter popover was closing itself the instant it opened, so every click landed on nothing. Dead clicks, then rage, then abandonment.

The agent wrote the fix and, at 12:53, opened a draft PR: [#67394](https://github.com/PostHog/posthog/pull/67394). About an hour and twenty minutes from the first rageclick to a pull request with the diagnosis already attached.

![PR report in PostHog Inbox](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_10_at_12_03_50_2x_933b3c7b5f.png)

## Two more, same corner of the app

Both of the other PRs landed on the same surface – the taxonomic filter and property picker – which tells you something on its own about how fiddly that little popover is.

[#67486](https://github.com/PostHog/posthog/pull/67486) – **the operator dropdown ignored your first click**. The "= equals" selector wouldn't respond until you clicked it two or three times, and it had been quietly doing this since June 23. The interesting part: the same struggle showed up in two different places in the app, so instead of fixing one and leaving the other broken, the agent fixed the shared piece both of them use. About 30 minutes from research to draft PR.

[#66686](https://github.com/PostHog/posthog/pull/66686) – **"No results" when the result was one tab over**. Someone building a cohort searched for a property, got "No results," and gave up – even though the match was sitting right there under a different tab. What makes this one worth reading: the agent didn't take a single recording at face value. It checked our own product data and found thousands of people hitting the exact same dead end (673 of them searching "email" on the wrong tab alone). That was enough to bump the priority, and the fix was caught and merged the same afternoon – under three hours, start to finish.

## You still decide what ships

To be clear about what "opens a PR on its own" means: the pipeline opens drafts, not merges. A human reviews before anything ships – at the time of writing, one of these three PRs is already merged, the other two are waiting. But everything up to that point, like noticing the struggle, grouping it across sessions, finding the exact line of code, and writing the fix, happened without a human interfering.

Replay Vision is currently in closed beta. Point a scanner at a flow you care about, and let it read the sessions you'd never have time to watch. Join the [Replay Vision waitlist](/replay-vision) and be among the first to know when it's out.
