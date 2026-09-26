---
title: How to get an FDE involved
sidebar: Handbook
showTitle: true
---

This page is for customer success managers, technical account managers (TAM), and anyone sitting on a customer who needs hands-on help setting up PostHog. It covers how to pull in a forward deployed engineer (FDE), and, just as often, how to sort the problem out without us. 

New to FDE? Start with the [overview](/handbook/forward-deployed-engineering/overview). For our engagement lifecycle, see [how we work](/handbook/forward-deployed-engineering/how-we-work).

## First, try to self-serve

Most "we need help setting up PostHog" requests don't actually need an engagement. FDE work is often paid, so solving it yourself saves the customer both time and money.

Before anything else, point the customer at the **PostHog wizard audit**:

```
npx @posthog/wizard audit all
```

It runs the same checks our FDE team would do by hand. It's read-only, takes a few minutes, and produces a report (a markdown file plus a shareable PostHog notebook) that names exactly what's wrong and what to fix first. Plenty of teams find their own engineers can take it from there.

We also have a growing library of **[PostHog skills](https://github.com/PostHog/skills)** you can point an agent at to do a lot of this yourself. They cover far more than audits: migrations, config cleanup, spotting what's misconfigured, and plenty else. Most work directly against a customer's instance through the MCP tools, so you don't always need their codebase to dig in. To run them against the customer's own data, do it on their behalf by [impersonating their account](/handbook/company/security#impersonating-users).

For the smaller questions that come up along the way, **PostHog AI** and the **PostHog Slack app** handle most of them without needing to pull in a person.

## If the customer still needs hands-on help

Before you route anything to us, gather the context we need to get started. It saves you a round-trip:

1. **Start with the gap or pain point.** What problem does the customer have today, and what's the business and operational context around it? It also helps to know the dynamic between the business side and their engineers.
   - **If it's to implement a new use case, share your discovery.** Tell us which [use cases](/handbook/growth/use-case-selling/use-case-selling) are in play now, how they could lead into others later, and one layer deeper on each: if they say they want Growth & Marketing, what do they actually mean, and why? The discovery questions in the library cover where the customer is today, what happens if they don't solve it, and what outcomes they want. Agreeing on a set number of use cases up front also helps us keep the scope of the technical work contained.
2. **Add the technical evidence.** Share the **wizard audit reports**, so we start from real evidence instead of a blank page, and a read on **what's actually blocking them**: engineering bandwidth, trust in the implementation, internal coordination, or "we want someone to do it for us."
3. **Set rough expectations on price.** Use the shape, not an exact number; see [what it costs](/handbook/forward-deployed-engineering/how-we-work#what-it-costs). If the customer wants an exact figure, tell them you'll get a quote within a day and route it through the account owner.
4. **Confirm access and expected timelines.** Let us know what codebase or data access is available, and give us a rough expected timeline (a week, a month, longer).

Once you have that, bring it straight to the <SmallTeam slug="forward-deployed-engineering" /> team in [#team-fde](https://posthog.slack.com/archives/C0ADE38DEFN) on Slack. We'll review it and come back to you with any questions. From there, an FDE picks it up and scopes it properly from the technical side.

If you're unsure whether it's a FDE fit, ask anyway, even before you've gathered everything, and we'll let you know.
