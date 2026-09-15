---
title: Cost optimization
sidebar: Handbook
showTitle: true
---

Sometimes the most helpful thing we can do for a customer makes their bill smaller. 

This page covers how we work on cost optimizations, how we record them with the `cost optimizing` tag in PostHog Customer Analytics, and how we share them with the rest of the team.

## The principle

One of our [customer success principles](/handbook/cs-and-onboarding/customer-success#principles) is to help customers save money, even when it costs us in the short term. A customer who overpays because of a bad implementation isn't revenue, they're a churn risk who hasn't churned yet. Doing what's right for them is the job.

You are not expected to justify a revenue decline that comes from a cost optimization. You are expected to add context to it, so anyone reading the number later can tell the difference between a customer we helped and a customer we aren't fully engaged with. The tag and a Slack message are how you add that context.

This is also why inherited accounts come with a [3 month grace period](/handbook/cs-and-onboarding/how-we-work#how-contractual-bonus-works---technical-csms). We want you to right-size customers, not to leave a bad implementation in place because it happens to pay well.

## Two ways a cost optimization starts

**The customer asks.** They tell you they want to spend less on PostHog. [Risk mitigation and churn prevention](/handbook/growth/sales/risk-mitigation-and-churn-prevention#implementation-health) covers how to run this: act on the request first, gather context after, and pause expansion work until they're back at a stable spend.

**We offer.** You spot something the customer hasn't noticed and tell them how to fix it. This one matters more, because they didn't ask and they'll remember that you did it anyway.

## The `cost optimizing` tag

Add the `cost optimizing` tag to the account in PostHog Customer Analytics when the cost optimization starts and short term billable usage is impacted. There can be some time before the recommendations are acted on, so there is no need to flag this too early. 

The tag means: **I'm aware of this cost optimization, and I'm supporting the customer through it.**

Add it when:

- A customer asks for help reducing spend and you're working on it.
- You've offered an optimization, and they have started to act on it (meaning revenue contraction has started).

Don't add it when:

- Usage dropped and you don't know why. Find out first - an unexplained drop is a churn signal, so see [when to flag an account as at risk](/handbook/growth/sales/risk-mitigation-and-churn-prevention#when-to-flag-an-account-as-at-risk).
- The spend fell for a reason that isn't us: seasonality, a campaign that ended, or volume moving to another vendor.

You don't need to add it when:

- They remove a product they were paying for but didn't need. There is not much to learn beyond "they didn't know they were paying for something they didn't need"

Cost optimization is a process that starts and ends. A customer that is constantly cost optimizing should be handled differently. Therefore, when the cost has stabilized and the optimization plan is completed, remove the tag. It explains a phase (the revenue contraction) but is not a customer trait.


## Share it in #team-customer-success

When you add the tag, post a short message in #team-customer-success. The tag is the marker, the message is the story behind it.

Cover:

- The account, and what they spend on today.
- What the optimization is, in a line or two.
- Whether they asked or you offered.
- What you expect to happen to their spend, and roughly when.
- **How you found it.**

The last point is the one people skip and the one worth the most. A cost optimization on one account is usually a pattern across several. If you found a customer calling `identify()` on every page load, someone else on the team has a customer doing the same thing and doesn't know it yet.


## How to spot them

Cost optimizations are much easier to handle before the customer finds them:

- **Run a [health check](/handbook/cs-and-onboarding/health-checks)** on accounts you've just inherited, and on anyone who hasn't had a technical review in a year. Most of the patterns above come straight out of that checklist.
- **Read event composition, not just totals.** Use the usage tab on the account in PostHog Customer Analytics and their Metabase usage dashboard. A large `$identify`, `$groupidentify`, or autocapture share is the tell.
- **Watch #spike-detector.** A spike with no launch behind it is usually a bug or a loop, not growth. These are the most urgent optimizations, and they may [qualify for credits](/handbook/growth/sales/refunds#eligibility-criteria).
- **Listen for cost on calls and in Slack.** A customer who mentions their bill once will mention it again to their finance team.

When you find one, work through the fix with them rather than handing them a list of what's wrong. The optimization is the easy part – being the person who found it is what keeps the account.


## How to present recommendations

Two or three recommendations, each with a saving attached. A longer list reads like an audit and gets deprioritized as a whole. How you frame them is your call – this is one example, not a template.

> **Your $14k/month:** product analytics $11k, session replay $3k.
>
> **1. Autocapture on your marketing site – $4.2k/month, 30% of your bill.** Autocapture is 78% of your volume, mostly marketing pages, and you have no autocapture actions defined – nothing reads those events. Turning it off there removes most of that $4.2k. One line in your snippet config. You'd lose retroactive click data on those pages. Start here.
>
> **2. `identify()` on every page load – $2.8k/month, 20%.** Called per page rather than once per session, which makes anonymous events identified at up to 4x the cost. Moving it to login should halve this. Small change, but it touches auth, so it needs an engineer. No analytical downside.
>
> **3. Session replay sampling – $3k/month, 21%.** Half your recordings are under 10 seconds. Sampling at 50% with a minimum duration takes roughly $1k off. Config only. But you won't have the replay when a user reports a bug – if support leans on replay, skip this.
>
> 1 and 2 get you to about $9k/month without changing how you use PostHog.

Quantify roughly, keep the saving separate from the tradeoff, and say what the change actually takes – their engineering capacity decides what happens next. Don't invent numbers, and don't assume the biggest saving is the right one. Customers know their business better than we do.


## Common cost optimizations

Most of the money sits in a handful of patterns. This isn't the full list, and it isn't the diagnostic guide – [checking the health of a customer's deployment](/handbook/cs-and-onboarding/health-checks) has a checklist and some queries to run.

| Pattern | Why it costs them | Where to point them |
|---|---|---|
| **Identified events by default** | Every event creates a [person profile](/docs/data/persons), and identified events can be up to 4x the cost of anonymous ones. Common on marketing and content sites, where person profiles buy them nothing. | [Anonymous vs identified events](/docs/data/anonymous-vs-identified-events) |
| **`identify()` called too often** | Called on every page or in a loop, it inflates event volume for no analytical gain. Their ["refused to merge an already identified user" ingestion warnings](/docs/data/ingestion-warnings#refused-to-merge-an-already-identified-user) are a good confirmation. | [Call it once per session](/docs/product-analytics/identify#best-practices-when-using-identify) |
| **`group()` called too often** | The same problem, in `$groupidentify` events. | [Call it once per group per session](/docs/product-analytics/group-analytics#link-events-to-groups) |
| **Group analytics paid for, not implemented** | They pay for the add-on and can't use it. | Help them implement it if they're B2B, or tell them to remove the add-on |
| **Autocapture noise** | Most of their events are autocapture and they've defined no autocapture actions, so they're paying for events nobody looks at. | [Tune or turn off autocapture](/docs/product-analytics/autocapture) |
| **Session replay recording everything** | Short, low-value recordings bill the same as useful ones. | [Control which sessions you record](/docs/session-replay/how-to-control-which-sessions-you-record) |

For customers with significant LLM spend, [LLM cost optimization](/handbook/cs-and-onboarding/shareable-guides/llm-cost-optimization) is a field guide you can work from and share with them.
