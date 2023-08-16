---
title: On-call rotation
sidebar: Handbook
showTitle: true
---

We're very lucky that we mostly have a follow-the-sun rotation for alerts, so no-one gets woken up in the middle of the night.

Every engineer in PostHog is expected to be part on-call. The on-call schedules [live in pagerduty](https://posthog.pagerduty.com/schedules-new).

Make sure you've downloaded the PagerDuty app for your phone, and that you've set high alert priorities.

## What to do when you get paged

A chunk of our high-frequency alerts have runbooks attached, most of which live [in the public runbooks section](https://posthog.com/docs/runbook) of our docs or in [our private runbooks](http://go/runbooks). The runbook should tell you what to look at and easy fixes if there are any. Every alert also has a link to the grafana graph that triggered the alert.

If this looks like the page [should be raised as an incident](https://posthog.com/handbook/engineering/incidents#when-to-raise-an-incident), [go raise an incident](https://posthog.com/handbook/engineering/incidents).

If you are unsure how to proceed, escalate to the [secondary for the relevant team](https://posthog.com/handbook/engineering/support-hero#2-secondary-on-call).

They will either resolve the issue or shadow you while you figure out how to resolve it. The ideal is for them _not_ to take over at this point, as otherwise you won't be able to learn from this page. But, as we grow, we can't all have deep expertise in every part of the system, and sometimes it makes sense to split the work needed to resolve the alert.

Regardless, the person paged is responsible for administration of the page/incident. Tasks like keeping our external status page updated or organising and writing the post incident review.

## Why is everyone responsible for pages?

If you're in a product team, it's tempting to think that being on-call doesn't apply to you, or that when you're on-call you can just hand everything off to the infrastructure team.

*Event though*, as we grow, we can't all have deep expertise in every part of the system, understanding the impacts of alerts and incidents helps us improve the work we do, and how we prioritise reliability and observability. Getting better at avoiding incidents is much more effective than getting better at handling them.

It's important that when you're in a product team you at least have a basic understanding of how our software is deployed, where the weak points in our systems are, and what the various failure modes are. This way you'll be less likely to ship code that accidentally takes down PostHog, and more likely to understand the tradeoffs involved.
