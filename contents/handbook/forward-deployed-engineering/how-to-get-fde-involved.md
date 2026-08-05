---
title: How to get an FDE involved
sidebar: Handbook
showTitle: true
---

This page is for customer success managers, technical account managers (TAM), and anyone sitting on a customer who needs hands-on help setting up PostHog. It covers how to pull in a forward deployed engineer (FDE), and, just as often, how to sort the problem out without us. 

New to FDE? Start with the [overview](/handbook/forward-deployed-engineering/overview).

## First, try to self-serve

Most "we need help setting up PostHog" requests don't actually need an engagement. FDE work is often paid, so solving it yourself saves the customer both time and money.

Before anything else, point the customer at the **PostHog wizard audit**:

```
npx @posthog/wizard audit all
```

It runs the same checks our FDE team would do by hand. It's read-only, takes a few minutes, and produces a report (a markdown file plus a shareable PostHog notebook) that names exactly what's wrong and what to fix first. Plenty of teams find their own engineers can take it from there.

We also have a growing library of **[PostHog skills](https://github.com/PostHog/skills)** you can point an agent at to do a lot of this yourself. They cover far more than audits: migrations, config cleanup, spotting what's misconfigured, and plenty else. Most work directly against a customer's instance through the MCP tools, so you don't always need their codebase to dig in. To run them against the customer's own data, do it on their behalf by [impersonating their account](/handbook/company/security#impersonating-users).

For the smaller questions that come up along the way, **PostHog AI** and the **PostHog Slack app** handle most of them without needing to pull in a person.

## If they still need hands-on help

Before you route anything to us, gather the data we need to get started. It saves you a round-trip and saves us the context-switch:

1. **Gather what we need to scope it.** Two things make discovery quick: the **wizard audit reports**, so we start from real evidence instead of a blank page, and a read on **what's actually blocking them**: engineering bandwidth, trust in the implementation, internal coordination, or "we want someone to do it for us." That's the signal that decides what kind of engagement this becomes. Alongside those, name the customer, the product area, a one-sentence description of the problem, what would exist at the end that future customers could reuse, what codebase or data access is available, and a rough size (a week, a month, longer).
2. **Set rough expectations on price.** Use the shape, not an exact number; see [what it costs](/handbook/forward-deployed-engineering/how-we-work#what-it-costs). If the customer wants an exact figure, tell them you'll get a quote within a day and route it through the AE.

With that in hand, you can run intake yourself using the **FDE vault skills** (intake, scoping, and quoting). Anyone at PostHog can run them, and they'll produce a calibrated scope, an hour estimate, and a proposal without needing an FDE in the loop. See the <PrivateLink url="https://github.com/PostHog/fde-vault/blob/main/teams/fde/operational/knowledge/skills/README.md">skills README</PrivateLink> in the <PrivateLink url="https://github.com/PostHog/fde-vault">fde-vault repo</PrivateLink>.

Or bring it straight to the <SmallTeam slug="forward-deployed-engineering" /> team.