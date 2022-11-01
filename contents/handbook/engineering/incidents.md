---
title: Handling an incident
sidebar: Handbook
showTitle: true
---

Incidents are going to happen.

## When to raise an incident

**When in doubt, raise an incident.** We'd much rather have declared an incident which turned out not to be an incident. Many incidents take too long to get called, or are missed completely because someone didn't ring the alarm when they had a suspicion something was wrong.

To declare an incident, type `/incident` anywhere in Slack. This will create a new channel and send updates.

Anyone can declare an incident, including non-engineers. If in doubt, check with your nearest engineer.

Some things that should definitely be an incident
- `app.posthog.com` (PostHog Cloud US) or `eu.posthog.com` (PostHog Cloud EU) being completely unavailable (not just for you)
- No insights can be created
- Feature flags are not being returned at all, or `/decide` is down
- Various alerts defined as critical, such as disk space full, OOM or >5 minute ingestion lag

Things that _shouldn’t_ be an incident
- Insights returning incorrect data
- Events being < 5 minutes behind
- Unable to save insights, create feature flags

### Incident severity
Please refer to the following guidance when choosing the severity for your incident. If you are unsure, it's usually better to over-estimate than under-estimate!

#### Minor
A minor-severity incident does not usually require paging people, and can be addressed within normal working hours. It is higher priority than any bugs however, and should come before sprint work.

Examples
- Broken non-critical functionality, with no workaround. Not on the critical path for customers
- Performance degradation. Not an outage, but our app is not performing as it should. For instance, growing (but not yet critical) ingestion lag.
- A memory leak in a database or feature. With time, this could cause a major/critical incident, but does not usually require _immediate_ attention

If not dealt with, minor incidents can often become major incidents. Minor incidents are usually OK to have open for a few days, whereas anything more severe we would be trying to resolve asap

#### Major
A major incident usually requires paging people, and should be dealt with _immediately_. They are usually opened when key or critical functionality is not working as expected.

Major incidents often become critical incidents if not resolved in a timely manner

Examples
- Customer signup is broken
- Significantly elevated error rate

#### Critical
An incident with very high impact on customers, and with the potential to existentially effect the company or reduce revenue

Examples
- Posthog Cloud is completely down
- A data breach, or loss of data
- Event ingestion totally failing - we are losing events


## What happens during an incident

The person who raised the incident is the incident lead. It’s their responsibility to:
- Make sure the right people join the zoom. This includes [the current on call person](https://posthog.pagerduty.com/service-directory/P43Y0E8). Optionally, add people from Infra and [the feature owner](https://posthog.com/handbook/engineering/feature-ownership) if relevant. Also ping Tim and James G so they're aware.
- take notes in the incident channel. This should include time stamps, and is a brain dump of everything that we know, and everything that we are or have tried. This will give us much more opportunity to learn from the incident afterwards.
- Update the [status banner on app](https://app.posthog.com/feature_flags/984)
- Update the [status page](https://uptimerobot.com/statuspage.php)
- Update users in [#announcements](https://posthogusers.slack.com/archives/CT7HXDEG3)

If the person who raised the incident is the best person to debug the issue, they should hand over the incident lead role to someone else on the call.

[You can find all of our production runbooks + specific strategies for debugging outages here (internal)](https://github.com/PostHog/product-internal/tree/main/infrastructure/runbooks)

## When does an incident end?

When we’ve identified the root cause of the issue and put a fix in place. Don't forget to type `/inc close` in the incident channel.

## What happens after an incident? (Incident analysis)

24-48 hours after an incident, we should have a quick sync meeting with a small group of people involved in the incident, plus Tim. If you raised the incident, you can schedule this. If you don’t want to or can’t, Tim is happy to take over at this point, just let him know.

Incident.io will automatically create an incident analysis doc that you can paste into a PR against the [incidents analysis repository](https://github.com/PostHog/incidents-analysis). It'll have a timeline of everything that happened.

During the incident analysis session, we’ll walk through the entire timeline as it happened. While doing that, we want to answer the following types of questions:
- In what ways did our systems surprise us?
- How did it make sense for someone to do what they did?

We'll collect learnings through this process.

During a process like this, trying to come up with action items means losing focus on the learnings. That's why it’s up to the individuals in the meeting to figure out whether they need to action any of the learnings from the session.

If an incident was pretty uneventful we can skip this step.


_Thanks to [Incident Review and Postmortem Best Practices](https://blog.pragmaticengineer.com/postmortem-best-practices/) from Pragmatic Engineer_
