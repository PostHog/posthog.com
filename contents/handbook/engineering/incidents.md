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
- `us.posthog.com` (PostHog Cloud US) or `eu.posthog.com` (PostHog Cloud EU) being completely unavailable (not just for you)
- No insights can be created
- Feature flags are not being returned at all, or `/decide` is down
- Various alerts defined as critical, such as disk space full, OOM or >5 minute ingestion lag

Things that _shouldn’t_ be an incident
- Insights returning incorrect data
- Events being < 5 minutes behind
- Unable to save insights, create feature flags
- Expected disruption which happens as part of scheduled maintenance

> Planning some maintenance? Check the [announcements](/handbook/growth/marketing/product-announcements) section instead.

### Incident severity
Please refer to the following guidance when choosing the severity for your incident. If you are unsure, it's usually better to over-estimate than under-estimate!

#### Minor
A minor-severity incident does not usually require paging people, and can be addressed within normal working hours. It is higher priority than any bugs however, and should come before sprint work.

Examples
- Broken non-critical functionality, with no workaround. Not on the critical path for customers.
- Performance degradation. Not an outage, but our app is not performing as it should. For instance, growing (but not yet critical) ingestion lag.
- A memory leak in a database or feature. With time, this could cause a major/critical incident, but does not usually require _immediate_ attention.

If not dealt with, minor incidents can often become major incidents. Minor incidents are usually OK to have open for a few days, whereas anything more severe we would be trying to resolve ASAP.

#### Major
A major incident usually requires paging people, and should be dealt with _immediately_. They are usually opened when key or critical functionality is not working as expected.

Major incidents often become critical incidents if not resolved in a timely manner.

Examples
- Customer signup is broken
- Significantly elevated error rate

#### Critical
An incident with very high impact on customers, and with the potential to existentially affect the company or reduce revenue.

Examples
- Posthog Cloud is completely down
- A data breach, or loss of data
- Event ingestion totally failing - we are losing events

## What happens during an incident?

The person who raised the incident is the incident lead. It’s their responsibility to:
- Make sure the right people join the call. This includes [the current on-call person](https://posthog.pagerduty.com/service-directory/P43Y0E8). Optionally, add people from Infra and [the feature owner](/handbook/engineering/feature-ownership) and Marketing if relevant. Marketing can assist in running communications if required.
- Take notes in the incident channel. This should include timestamps, and is a brain dump of everything that we know, and everything that we are or have tried. This will give us much more of an opportunity to learn from the incident afterwards.
- Update the [status page](https://status.posthog.com/). This is best done in the incident Slack channel using `/incident statuspage` (`/inc sp`).

If the person who raised the incident is the best person to debug the issue, they should hand over the incident lead role to someone else on the call.

[You can find all of our production runbooks + specific strategies for debugging outages here (internal)](http://runbooks/)

### Customer communications

Significant incidents such as the app being partially or fully non-operational, as well as ingestion delays of 30 minutes or longer should be clearly communicated to our customers. They should get to know what is going on and what we are doing to resolve it.

Our [status page](https://status.posthog.com/) is the central hub for all incident communication. You can update it easily using the `/incident statuspage` (`/inc sp`) Slack command.

When updating the status page, make sure to mark the affected component appropriately (for example during an ingestion delay, setting `US Cloud 🇺🇸` / `Event and Data Ingestion` to `Degraded Performance`). This allows PostHog's UI to gently surface incidents with a "System status" warning on the right. Only users in the affected region will see the warning:

<img width="223" alt="status" src="https://github.com/PostHog/posthog.com/assets/4550621/55fb053a-83f4-44c5-ac12-0a5409f4033f">

Occasionally it may be desirable to do addditional customer communications, such as sending an email to impacted customers or making updates to [the service page](/service-message). Marketing will organize and write these communications for you, so please let them know if this is needed. Joe is usually the best initial point of contact. 

## When does an incident end?

When we’ve identified the root cause of the issue and put a fix in place. End the incident by typing `/inc close` in the incident channel. Make sure to also mark the incident as resolved on the status page.

## What happens after an incident? (Incident analysis)

1. Schedule a half hour incident review, invite engineering@posthog.com
2. Create a PR against the [incidents analysis repository](https://github.com/PostHog/incidents-analysis) using [this template](https://github.com/PostHog/incidents-analysis/blob/master/yyyy-mm-dd-template.md).
3. Hold the meeting.
4. If a post-mortem had significant impact on customers (like data loss or flags not being available), we should sanitize and copy the post mortem into the public [post-mortems repository](https://github.com/PostHog/post-mortems)

All critical incidents should have a PR in the post-mortem repository + a scheduled meeting. All major incidents should have a PR in the post-mortem repository, and optionally a scheduled meeting.

_Thanks to [Incident Review and Postmortem Best Practices](https://blog.pragmaticengineer.com/postmortem-best-practices/) from Pragmatic Engineer_
