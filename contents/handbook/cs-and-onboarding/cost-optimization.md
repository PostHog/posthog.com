---
title: Cost optimization
sidebar: Handbook
showTitle: true
---

Sometimes the most helpful thing we can do for a customer makes their bill smaller. We do it anyway.

This page covers how we work on cost optimizations, how we record them with the `cost optimizing` tag in PostHog Customer Analytics, and how we share them with the rest of the team.

## The principle

One of our [customer success principles](/handbook/cs-and-onboarding/customer-success#principles) is to help customers save money, even when it costs us in the short term. A customer who overpays because of a bad implementation isn't revenue – they're a churn risk who hasn't churned yet. Doing what's right for them is the job.

You are **not** expected to justify a revenue decline that comes from a cost optimization. You _are_ expected to add context to it, so anyone reading the number later can tell the difference between a customer we helped and a customer we're losing. The tag and a Slack message are how you add that context.

This is also why inherited accounts come with a [3 month grace period](/handbook/cs-and-onboarding/how-we-work#how-contractual-bonus-works---technical-csms). We want you to right-size customers, not to leave a bad implementation in place because it happens to pay well.

## Two ways a cost optimization starts

**The customer asks.** They tell you they want to spend less on PostHog. [Risk mitigation and churn prevention](/handbook/growth/sales/risk-mitigation-and-churn-prevention#implementation-health) covers how to run this – act on the request first, gather context after, and pause expansion work until they're back at a stable spend.

**We offer.** You spot something the customer hasn't noticed and tell them how to fix it. This one matters more, because they didn't ask and they'll remember that you did it anyway.

Both get the tag.

## The `cost optimizing` tag

Add the `cost optimizing` tag to the account in PostHog Customer Analytics as soon as you start work on the optimization. Don't wait for the spend to drop – by then the number needs explaining and you're on the back foot.

The tag means: **I'm aware of this cost optimization, and I'm supporting the customer through it.**

Add it when:

- A customer asks for help reducing spend and you're working on it.
- You've offered an optimization, whether or not they've acted on it yet.
- You've told a customer to drop an add-on, a product, or a plan they don't need.

Don't add it when:

- Usage dropped and you don't know why. Find out first – an unexplained drop is a churn signal, so see [when to flag an account as at risk](/handbook/growth/sales/risk-mitigation-and-churn-prevention#when-to-flag-an-account-as-at-risk).
- The spend fell for a reason that isn't us: seasonality, a campaign that ended, or volume moving to another vendor.

Leave the tag on the account afterwards. It's a record of what happened, not a status to clear. When we look at a book's revenue later, filtering the account list by `cost optimizing` separates the movements we chose from the ones we didn't.

## Share it in #team-customer-success

When you add the tag, post a short message in #team-customer-success. The tag is the marker, the message is the story behind it.

Cover:

- The account, and what they spend on today.
- What the optimization is, in a line or two.
- Whether they asked or you offered.
- What you expect to happen to their spend, and roughly when.
- **How you found it.**

The last point is the one people skip and the one worth the most. A cost optimization on one account is usually a pattern across several. If you found a customer calling `identify()` on every page load, someone else on the team has a customer doing the same thing and doesn't know it yet.

For example:

> **[Customer]** – ~$Xk ARR, mostly product analytics.
>
> They're calling `identify()` on every page load, so a large share of their events are `$identify` and they're paying identified rates for all of it. I showed them the split on their usage dashboard and they're shipping a fix this week. They didn't ask – I found it running a health check after picking the account up.
>
> Tagged `cost optimizing`. Expect their event volume to drop noticeably from next month's invoice. Worth a look if you've inherited an account recently and haven't reviewed the implementation.

## Common cost optimizations

Most of the money sits in a handful of patterns. This isn't the full list, and it isn't the diagnostic guide – [checking the health of a customer's deployment](/handbook/cs-and-onboarding/health-checks) has the complete checklist and the queries to run.

| Pattern | Why it costs them | Where to point them |
|---|---|---|
| **Identified events by default** | Every event creates a [person profile](/docs/data/persons), and identified events can be up to 4x the cost of anonymous ones. Common on marketing and content sites, where person profiles buy them nothing. | [Anonymous vs identified events](/docs/data/anonymous-vs-identified-events) |
| **`identify()` called too often** | Called on every page or in a loop, it inflates event volume for no analytical gain. Their ["refused to merge an already identified user" ingestion warnings](/docs/data/ingestion-warnings#refused-to-merge-an-already-identified-user) are a good confirmation. | [Call it once per session](/docs/product-analytics/identify#best-practices-when-using-identify) |
| **`group()` called too often** | The same problem, in `$groupidentify` events. | [Call it once per group per session](/docs/product-analytics/group-analytics#link-events-to-groups) |
| **Group analytics paid for, not implemented** | They pay for the add-on and can't use it. | Help them implement it if they're B2B, or tell them to remove the add-on |
| **Autocapture noise** | Most of their events are autocapture and they've defined no autocapture actions, so they're paying for events nobody looks at. | [Tune or turn off autocapture](/docs/product-analytics/autocapture) |
| **Session replay recording everything** | Short, low-value recordings bill the same as useful ones. | [Control which sessions you record](/docs/session-replay/how-to-control-which-sessions-you-record) |
| **Test data in a production project** | They pay production rates for staging and localhost traffic. | Move it to a separate project |

For customers with significant LLM spend, [LLM cost optimization](/handbook/cs-and-onboarding/shareable-guides/llm-cost-optimization) is a field guide you can work from and share with them.

## How to spot them

Cost optimizations are much easier to handle before the customer finds them:

- **Run a [health check](/handbook/cs-and-onboarding/health-checks)** on accounts you've just inherited, and on anyone who hasn't had a technical review in a year. Most of the patterns above come straight out of that checklist.
- **Read event composition, not just totals.** Use the usage tab on the account in PostHog Customer Analytics and their Metabase usage dashboard. A large `$identify`, `$groupidentify`, or autocapture share is the tell.
- **Watch #spike-detector.** A spike with no launch behind it is usually a bug or a loop, not growth. These are the most urgent optimizations, and they may [qualify for credits](/handbook/growth/sales/refunds#eligibility-criteria).
- **Listen for cost on calls and in Slack.** A customer who mentions their bill once will mention it again to their finance team.

When you find one, work through the fix with them rather than handing them a list of what's wrong. The optimization is the easy part – being the person who found it is what keeps the account.
