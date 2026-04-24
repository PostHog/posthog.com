---
title: Customer comms as an engineer
sidebar: Handbook
showTitle: true
---

Sometimes as an engineer you need to tell a specific set of customers about a change you're shipping — deprecating an API, enforcing a new quota limit, a breaking SDK change, or a migration deadline. This page describes how to get that email out without rolling your own process.

The short version: you don't send it yourself. You provide the targeting and a draft, then hand off to Joe and the <SmallTeam slug="marketing" /> team, who own the copy and send it via Customer.io.

## When to use this

Use this process for proactive, engineering-driven service updates, for example:

- Deprecating an API or endpoint
- Rolling out quota limits or new enforcement on an existing product
- Breaking changes to an SDK or integration
- Migration deadlines, required customer action

Use a different process for:

- Incidents and outages — see [engineering incidents](/handbook/engineering/operations/incidents), the Marketing team handles comms there too
- Product launches and betas — see [product announcements](/handbook/marketing/product-announcements)
- Regular product updates — these flow through the [monthly changelog email](/handbook/brand/email-comms#changelog)

## The process

1. **Open an issue with a draft.** In [`PostHog/product-internal`](https://github.com/PostHog/product-internal) (or [`PostHog/meta`](https://github.com/PostHog/meta) if no sensitive customer info is involved), write up what you want to say, why, and when you want it sent. This follows the same pattern as other [email broadcasts](/handbook/brand/email-comms#other-broadcasts).
2. **Tag Joe and the <SmallTeam slug="marketing" /> team.** Joe owns the final copy and the send. Treat his edits as authoritative — that's the whole reason this process exists.
3. **Provide the audience.** Hand over one of:
   - A PostHog cohort, or
   - A list of `org_id`s, with a short note on how you derived the list (which query, which filters) so it's auditable.
4. **Double-check targeting.** These emails are usually tagged `Service updates` in Customer.io, which means they're delivered even to unsubscribed users. Wrong targeting is more costly here than for a normal marketing email — cross-reference against spend, plan tier, and the feature you're actually changing before handing the list over.
5. **Approve and send.** Joe will circulate the polished draft for final approval on the issue, then send.

## Lead time

Aim for about a week between opening the issue and when you want the email to land. Joe batches this work around onboarding and other comms, so last-minute sends are hard to accommodate.

## Pointers

- [Email comms handbook page](/handbook/brand/email-comms) — the underlying Customer.io setup, tags, and categories.
- Prior art worth mirroring: the feature-flags quota-limit rollout RFC in [`product-internal#720`](https://github.com/PostHog/product-internal/pull/720).
