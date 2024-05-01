---
title: On-call rotation
sidebar: Handbook
showTitle: true
---

Every week, three engineers are on call in shifts. If you're one of the lucky three, congratulations!

PostHog Cloud doesn't shut down at night (_whose_ night anyway?) nor on Sunday. As a 24/7 service, our goal is to be 100% operational 100% of the time. The universe doesn't always agree and hiccups do occur, which we catch in the form of service alerts. To make sure no alert goes unhandled, there is **always** one engineer on call, tasked with first-line defense.

## When is my turn?

We're very lucky that we have an almost-follow-the-sun rotation for service alerts, so nobody gets woken up in the middle of the night. Every engineer at PostHog is expected to be part of the rotation within one of the three PagerDuty schedules:

- [Europe](https://posthog.pagerduty.com/schedules#PF7ZGBT) (08:00 to 16:00 UTC)
- [Americas East](https://posthog.pagerduty.com/schedules#PW1E9Y4) (16:00 to 00:00 UTC)
- [Americas West](https://posthog.pagerduty.com/schedules#P3J10CZ) (00:00 to 08:00 UTC)

Because the stability of production systems is critical, on-call involves weekends too (unlike Support Hero). More likely than not, nothing will happen over the weekend – but you never know, so the important thing is to keep your laptop at hand.

Before going on call, make sure you have the [PagerDuty mobile app](https://support.pagerduty.com/docs/mobile-app) installed and configured. This way it'll be harder to miss an alert.

To get a calendar with all your on-call shifts from PagerDuty. Go to your profile, select On-Call Shifts, go to Export Calendar and copy the link for the webcal feed. In google calendar, add a new calendar from URL and paste the link in there.

## What if I'm scheduled for a week when I won't be available?

Swap with another engineer in advance! Find a volunteer by asking in Slack, then use PagerDuty schedule overrides. You can trade whole weeks, but also just specific days. Remember not to alter the rotation's core order, as that's an easy way to accidentally shift the schedule for everyone.

## What do I do on call?

You just go about your day, paying no attention to being on call most of the time! But the moment you get paged, it's time to switch gears and start investigating the alert.

To be ready, make sure you have access to:

- PostHog Cloud admin interfaces ([🇺🇸 US](https://us.posthog.com/admin/)  / [🇪🇺 EU](https://eu.posthog.com/admin/)) - post in #ask-posthog-anything to be added
- Our tailnet, which gates our internal services (such as Grafana, Metabase, or runbooks) – follow [this guide](https://github.com/PostHog/posthog-cloud-infra/blob/main/terraform/environments/README.md#connect-to-a-service-hosted-in-our-internal-network) to join
- Metabase ([🇺🇸 US](http://metabase-prod-us/)  / [🇪🇺 EU](http://metabase-eu/)) - post in #ask-posthog-anything to be invited
- EKS over `kubectl` / `k9s`, in case you need to run Kubernetes cluster operations (such as restarting a pod) – follow [this guide](http://runbooks/eks/) to get access

A chunk of our high-frequency alerts have runbooks attached, which live in our internal runbooks site: [http://runbooks/](http://runbooks/) (also accessible as [go/rb](http://go/rb/)). This site is part of our tailnet, as mentioned above.

When an alert fires, find if there's a runbook for it. A runbook tells you what to look at and what fixes exist. Every alert also has a link to the Grafana graph that triggered the alert.
In any case, your first priority will be to understand what's going on, and the right starting point will almost always be Grafana: [🇺🇸 US](http://grafana-prod-us/) / [🇪🇺 EU](http://grafana-prod-eu/).

[If the alert is starting to have any noticeable impact on users, go raise an incident.](/handbook/engineering/incidents) It's that simple.

If you're stumped and no resource is of help, get someone from the relevant team to shadow you while you sort the problem out. The idea is that they can help you understand the issue and where to find how to debug it. The idea is _not_ for them to take over at this point, as otherwise you won't be able to learn from this incident.

## Why is the on-call rotation spread across all engineers?

If you're in a product team, it's tempting to think that service alerts don't apply to you, or that when you're on call you can just hand everything off to the infrastructure team. That's not the case, because it's important that every engineer has a basic understanding of how our software is deployed, where the weak points in our systems are, and what the failure modes look like. This understanding should be all that's needed to follow the runbooks, and if you follow the causes of alerts, ultimately you'll be less likely to ship code that takes PostHog down.

Besides knowledge, being on call requires availability – including weekends. If teams had their own separate rotations, there would be more people on call in total, and each would have to stand by 24/7 as our teams aren't big enough to follow the sun. This would be more stressful because of availability constraints, while being less productive because of the rare alerts being spread across multiple people.
