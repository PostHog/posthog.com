---
title: Engaging unengaged customers
sidebar: Handbook
showTitle: true
---

> This is a living document — we'll keep adding tactics as we learn what works. If you've found something effective, add it here!

## Why this matters

Unengaged customers churn. But "just checking in" rarely works. The tactics below give you concrete, helpful reasons to reach out — so your outreach feels like a favor, not a follow-up.

The common thread: **do your homework first, then lead with something specific and valuable.**

## Pre-outreach research

Before reaching out, spend 10 minutes understanding where the customer is at. This makes all the difference between a generic check-in and a genuinely helpful conversation.

### Review their engagement metrics

Use the customer's PostHog usage data to understand what they're actually doing before you reach out. Look at:

- **What features they're using** — insights, dashboards, recordings, etc.
- **Insight titles they've created** — these reveal what business questions they care about
- **Recent activity** — are they creating new things or just passively viewing?

For example, if a customer is creating and viewing insights with titles around "funnel conversions," they almost certainly care about improving funnel conversion rates. Lead with that.

**Where to look:** Customer engagement dashboard in PostHog — filter by the customer's org/team and check insight creation and viewing activity.

### Walk through their site with debug mode

Visit the customer's website and inspect their PostHog implementation firsthand:

1. Open the browser console and run `posthog.debug()` to enable debug mode
2. Check the config to see how PostHog is configured
3. Walk through key flows (login, onboarding, core product actions)
4. Watch what events fire — are they capturing meaningful actions?
5. Look for issues: missing events, misconfigured properties, no identify calls, etc.

This gives you a firsthand view of what the customer is (or isn't) capturing. You can come to the conversation with specific, concrete observations — "I noticed you're not capturing any events after sign-up" — rather than asking them to self-report.

**Framing matters:** Position it as a proactive health check, not a criticism. Something like: "I took a look at your implementation and spotted a couple of things that might be worth addressing..."

## Outreach tactics

### SDK Doctor — flag outdated SDKs

Use SDK Doctor to check if the customer is running outdated SDKs. This is one of the easiest, most concrete reasons to reach out. We recommend customers update monthly so they don't miss bug fixes and improvements.

**Example message:**

> BTW our SDK Doctor is warning that you are using a three year old version of our Python SDK — I promise we've improved it since then! Also your iOS and Android SDKs are really out of date. Any chance of updating these?

**Why it works:** It's specific, helpful, and low-effort for both sides. The tone is light and friendly, not alarming.

### Spot new product interest and reach out proactively

Keep an eye on customer activity — are they looking at docs for a product they haven't adopted yet? Are their events or page views showing interest in a new area? Use that as a natural conversation starter.

**Example (from Tyler):**

Noticed a customer checking out LLM analytics. Reached out proactively:

> Hey Jason, saw you checking out LLM analytics and wanted to share a few things. It occurred to me that our LLM observability suite might be really helpful for Phia.
>
> Not only do you get evals/traces/generations to track model performance, token usage, etc, you can then also connect those things back to PostHog session/user data. Which means you can actually easily run A/B and multivariate tests on things like prompts, models, and so on, while ALSO seeing how the LLM performance/quality have an impact on conversion and funnel.
>
> You may already have something like that in place but thought it was worth mentioning!

**Key elements:**
- Led with something specific and relevant to what they were already exploring
- Connected it to value they'd care about (not just "here's a feature" but "here's how it helps your workflow")
- Low-pressure framing: "you may already have something like that in place but thought it was worth mentioning"
