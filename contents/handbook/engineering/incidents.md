---
title: Handling an incident
sidebar: Handbook
showTitle: true
---

Incidents are going to happen.

## When to raise an incident

**When in doubt, raise an incident.** We'd much rather have declared an incident which turned out not to be an incident. Many incidents take too long to get called, or are missed completely because someone didn't ring the alarm when they had a suspicion something was wrong.

To declare an incident, type `/incident` in the #incidents channel. This will create a new channel and send updates.

Anyone can declare an incident, including non-engineers. If in doubt, check with your nearest engineer.

Some things that should definitely be an incident
- app.posthog.com being completely unavailable (not just for you)
- No insights can be created
- Feature flags are not being returned at all, or /decide is down
- Various alerts defined as critical, such as disk space full, OOM or >5 minute ingestion lag

Things that _shouldn’t_ be an incident
- Insights returning incorrect data
- Events being < 5 minutes behind
- Unable to save insights, create feature flags

## What happens during an incident

The person who raised the incident is the incident lead. It’s their responsibility to:
- Make sure the right people join the zoom. This includes the current on call person (https://posthog.pagerduty.com/service-directory/P43Y0E8), people from Infra and the feature owner if relevant (https://posthog.com/handbook/engineering/feature-ownership)
- take notes in the incident channel. This should include time stamps, and is a brain dump of everything that we know, and everything that we are or have tried. This will give us much more opportunity to learn from the incident afterwards.

If the person who raised the incident is the best person to debug the issue, they should hand over the incident lead role to someone else on the call.

## When does an incident end?

When we’re confident whatever was broken before is not broken anymore. This is sometimes hard to tell when the problem is intermittent. In that case, tell people to drop off the zoom, but to stay near their computer. Check the relevant metrics every 15 minutes or so, until you’re confident the problem is fully resolved. 

Don't forget to type `/inc close` in the incident channel.

## What happens after an incident? (Incident analysis)

24-48 hours after an incident, we should have a quick sync meeting with a small group of people involved in the incident, plus Tim. If you raised the incident, you can schedule this. If you don’t want to or can’t, Tim is happy to take over at this point, just let him know.

Incident.io will automatically create an incident analysis doc that you can paste into a word doc. It'll have a timeline of everything that happened.

During the incident analysis session, we’ll walk through the entire timeline as it happened. While doing that, we want to answer the following types of questions:
- In what ways did our systems surprise us?
- How did it make sense for someone to do what they did?

We'll collect learnings through this process.

During a process like this, trying to come up with action items means losing focus on the learnings. That's why it’s up to the individuals in the meeting to figure out whether they need to action any of the learnings from the session.

If an incident was pretty uneventful we can skip this step.


_Thanks to (this article)[Incident Review and Postmortem Best Practices] from Pragmatic Engineer_