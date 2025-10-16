---
title: On-call and escalation
sidebar: Handbook
showTitle: true
---

At PostHog, every engineer is responsible for maintaining their team's services and systems. That includes:
* Tracking and visualising key performance metrics
* Configuring automated alerting
* Documenting runbooks for on-call resolution
* First-responder to team-owned services during working hours

In addition, every engineer regardless is part of the global follow-the-sun on-call rotation. 

## Escalation schedules

### Team schedules

Every team has 2 schedules in [incident.io](https://app.incident.io/posthog/on-call/schedules)
* `On call: {team}`
    - This is the working-hours rotation. Each engineer should have their working hours in place here Mon-Fri with a sensible working day
    - For example 8:00-17:00 for EU based engineers is likely preferable as there will be US engineers who can take 17:00 onwards
    - Each member is responsible for ensuring this is up-to-date with PTO. You can create an override 
* `Support: {team}`
    - This is a weekly or bi-weekly rotation (teams can decide) that covers both who is assigned to the customer support rotation 

### Escalator schedules

[Schedule in incident.io](https://app.incident.io/posthog/on-call/schedules/01K6WTVH37A4P75HBBYBJ0TAE6)

Before hitting the global on-call rotation, our escalation policies attempt to find someone from the `escalators` schedule. The `escalators` group consists of a range of engineers across the more infra-heavy teams. These are typically engineers who are frequently working with Kubernetes, AWS and our monitoring infrastructure and as such are well placed to respond quickly to incidents, avoiding the need to escalate further.

This group is best effort and not a requirement to be a part of.

### Global on-call schedule

[Schedule in incident.io](https://app.incident.io/posthog/on-call/schedules/01K71R8Y2HJ67G0BDGFWPZA1Q4)

PostHog Cloud doesn't shut down at night (_whose_ night anyway?) nor on Sunday. As a 24/7 service, our goal is to be 100% operational 100% of the time. The global on-call is the last line of defence and is escalated to:
* if nobody at the `team level` is available
* if nobody at the `escalator level` is available
* if the alert is critical but has no team assignment (for whatever reason)

This schedule has 3 week day layers:
- **Europe** (06:00 to 16:00 UTC) - (10 hours)
- **Americas East** (14:00 to 23:00 UTC) - (8 hours)
- **Americas West** (https://posthog.pagerduty.com/schedules#P3J10CZ) (24:00 to 06:00 UTC) - (6 hours)

And 2 weekend layers:
- **Europe Weekend** (06:00 to 18:00 UTC) - (12 hours)
- **Americas Weekend** (18:00 to 06:00 UTC) - (12 hours)

### Why is the on-call rotation spread across all engineers?

If you're in a product team, it's tempting to think that service alerts don't apply to you, or that when you're on call you can just hand everything off to the infrastructure team. That's not the case, because it's important that every engineer has a basic understanding of how our software is deployed, where the weak points in our systems are, and what the failure modes look like. This understanding should be all that's needed to follow the runbooks, and if you follow the causes of alerts, ultimately you'll be less likely to ship code that takes PostHog down.

Besides knowledge, being on call requires availability – including weekends. If teams had their own separate rotations, there would be more people on call in total, and each would have to stand by 24/7 as our teams aren't big enough to follow the sun. This would be more stressful because of availability constraints, while being less productive because of the rare alerts being spread across multiple people.

## Before going on call

### Be prepared

Because the stability of production systems is critical, on-call involves weekends too (unlike Support Hero). More likely than not, nothing will happen over the weekend – but you never know, so the important thing is to keep your laptop at hand.

Before going on call, make sure you have the **Incident.io mobile app** [Android](https://play.google.com/store/apps/details?id=com.incidentio.incidentio&pli=1) / [iOS](https://apps.apple.com/us/app/incident-io/id6471268530) installed and configured. This way it'll be harder to miss an alert.

To get a calendar with all your on-call shifts from incident.io go to the [schedules section](https://app.incident.io/posthog/on-call/schedules), select `Sync calendar` at the top right and copy the link for the webcal feed. In google calendar, add a new calendar from URL and paste the link in there.


## Make sure your availablity is up-to-date

If you are unavailable for any of your schedules you need to act!

1. For your `On call: {team}` schedule simply click on your name in your layer, click `create an override` and then remove yourself from the list so it shows `No one`
1. For your `Support: {team}` schedule or `On call: {global}` schedules click `Request cover` at the top right. This will notify selected team members automatically to find someone to cover you (you should probably do a shout out in #ask-posthog-anything as well). You can trade whole weeks, but also just specific days. Remember not to alter the rotation's core order, as that's an easy way to accidentally shift the schedule for everyone.

## Make sure you have all the access you might need

To be ready, make sure you have access to:

- PostHog Cloud admin interfaces ([🇺🇸 US](https://us.posthog.com/admin/)  / [🇪🇺 EU](https://eu.posthog.com/admin/)) - post in #ask-posthog-anything to be added
- Grafana ([🇺🇸 US](https://grafana.prod-us.posthog.dev/)  / [🇪🇺 EU](https://grafana.prod-eu.posthog.dev/))
- [ArgoCD](https://argocd-internal.internal.posthog.dev) - this is where 99% of cluster operations take place such as restarting pods, scaling things up and down etc.
- Metabase ([🇺🇸 US](https://metabase.prod-us.posthog.dev/)  / [🇪🇺 EU](https://metabase.prod-eu.posthog.dev/)) - post in #ask-posthog-anything to be invited


### More advanced access

If you are part of a team that looks after more critical infrastructure such as infra, ingestion, workflows, error-tracking etc. then you are expected to dive deeper than the usual on-call engineer.

As well as the above access you should ensure you have access and feel comfortable working with:
- EKS over `kubectl` / `k9s`, in case you need to run Kubernetes cluster operations (such as restarting a pod) – follow [this guide](https://runbooks.posthog.com/EKS/access) to get access
- Our tailnet, which gates our internal services (such as Grafana, Metabase, or runbooks) – follow [this guide](https://github.com/PostHog/posthog-cloud-infra/blob/main/terraform/environments/README.md#connect-to-a-service-hosted-in-our-internal-network) to join


## Responding to alerts when on-call

![alert-example](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/incidentio_alert_343ed2062b.png)

Critical alerts will trigger per-team escalation policies which go like this:
1. If available, a member of the team associated with the alert is paged first
1. If nobody is available or nobody responds within the configured time, the `escalators` group is additionally paged with the same conditions
1. If nobody is available or nobody responds within the configured time then the `On call: global` schedule is paged

> **If at any point you get paged - always respond!** You can mark yourself as unavailable and incident.io will automatically move up the escaltion path. If you are in working hours, or 

By default if you are being paged, especially as the global on-call, the alert is considered critical, meaning it almost definitely requires attention. Your primary job is to:

Every alert should have associated Grafana and Runbook links allowing you to quickly get more visual details of what is going on and how to respond.

When an alert fires, find if there's a runbook for it. A runbook tells you what to look at and what fixes exist. In any case, your first priority will be to understand what's going on, and the right starting point will almost always be Grafana. 

Sometimes alerts are purposefully overly-sensitive and might already be fixing themselves by the time you see them. **Use your best judgement here**. If the linked graph has a spike that is clearly coming down, watch it closely and give it time for the alert to auto-resolve.

[If the alert is starting to have any noticeable impact on users or you are not sure whether to raise an incident - go raise an incident.](/handbook/engineering/operations/incidents) It's that simple.

If you're stumped and no resource is of help, get someone from the relevant team to shadow you while you sort the problem out. The idea is that they can help you understand the issue and where to find how to debug it. The idea is _not_ for them to take over at this point, as otherwise you won't be able to learn from this incident.
