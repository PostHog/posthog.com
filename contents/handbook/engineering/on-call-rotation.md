---
title: On-call rotation
sidebar: Handbook
showTitle: true
---

Every week, three engineers are on call in shifts. If you're one of the lucky three, congratulations!

PostHog Cloud doesn't shut down at night (_whose_ night anyway?) nor on Sunday. As a 24/7 service, our goal is to be 100% operational 100% of the time. The universe doesn't always agree and hiccups do occur, which we catch in the form of service alerts. To make sure no alert goes unhandled, there is **always** one engineer on call, tasked with first-line defense.

## When is my turn?

We're very lucky that we have an almost-follow-the-sun rotation for service alerts, so nobody gets woken up in the middle of the night. Every engineer at PostHog is expected to be part of the rotation within one of the three Pagerduty schedules:

- [Europe](https://posthog.pagerduty.com/schedules#PF7ZGBT) (08:00 to 16:00 UTC)
- [Americas East](https://posthog.pagerduty.com/schedules#PW1E9Y4) (16:00 to 00:00 UTC)
- [Americas West](https://posthog.pagerduty.com/schedules#P3J10CZ) (00:00 to 08:00 UTC)

Before going on call, make sure you have the [PagerDuty mobile app](https://support.pagerduty.com/docs/mobile-app) installed and configured. This way it'll be harder to miss an alert.

## What if I'm scheduled for a week when I won't be available?

Swap with another engineer in advance! Find a volunteer by asking in Slack, then use Pagerduty schedule overrides. You can trade whole weeks, but also just specific days. Remember not to alter the rotation's core order, as that's an easy way to accidentally shift the schedule for everyone.

## What do I do on call?

You just go about your day, paying no attention to being on call most of the time! But keep your laptop at hand, because when you do get paged, it's time to switch gears immediately and start investigating the alert.

A chunk of our high-frequency alerts have runbooks attached, most of which live [on the internal runbooks site](http://runbooks/). The runbook should tell you what to look at and easy fixes if there are any. Every alert also has a link to the Grafana graph that triggered the alert.

[If it looks like the alert should be raised as a public incident, go raise an incident.](https://posthog.com/handbook/engineering/incidents)

If you're stumped and no resource is of help, get someone from the relevant team to shadow you while you sort the problem out. The idea is that they can help you understand the issue and where to find how to debug it. The idea is _not_ for them to take over at this point, as otherwise you won't be able to learn from this incident.

## Why is the on-call rotation spread across all engineers?

If you're in a product team, it's tempting to think that service alerts don't apply to you, or that when you're on call you can just hand everything off to the infrastructure team. That's not the case, because it's important that every engineer has a basic understanding of how our software is deployed, where the weak points in our systems are, and what the failure modes look like. This understanding should be all that's needed to follow the runbooks, and if you follow the causes of alerts, ultimately you'll be less likely to ship code that takes PostHog down.

Besides knowledge, being on call requires availability – including weekends. If teams had their own separate rotations, there would be more people on call and each would have to stand by 24/7, simply because our teams aren't that big.
