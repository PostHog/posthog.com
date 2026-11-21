---
title: Per-product setup
sidebar: Handbook
showTitle: true
---

Because PostHog offers so many products, and people sign up with all sorts of different needs, we track setup separately for each product.

**Setup is when an organization has completed the minimum configuration a product needs to start delivering value.** It typically comes after someone shows [intent](/handbook/growth/growth-engineering/product-intents) for a product, and before [activation](/handbook/growth/growth-engineering/per-product-activation).

We use setup to:

- Trigger onboarding flows. Once an organization completes setup, we trigger an onboarding email flow that attempts to move users toward activation.
- See where onboarding leaks. Comparing how many new organizations set up each product tells us which products are hard to get started with.
- Give every product team a reliable, comparable starting line, regardless of how people use PostHog.

You can find the setup metrics for every product on <PrivateLink url="https://us.posthog.com/project/2/dashboard/2297976">this dashboard</PrivateLink>.

## Setup vs. product intent vs. activation

These three metrics are easy to mix up, so here is how they differ:

| Milestone | Question it answers | Example (Session Replay) |
| --- | --- | --- |
| [Product intent](/handbook/growth/growth-engineering/product-intents) | Is this organization interested in the product? | Opened the replay page |
| **Setup** | Has this organization configured the product so it can work? | Recordings are being ingested |
| [Activation](/handbook/growth/growth-engineering/per-product-activation) | Has this organization got real value out of it (the "aha moment")? | Analyzed several recordings and set a filter |

Setup is deliberately a low bar. It says the product _can_ deliver value, not that it _has_. An organization can be set up without being activated, and that gap is exactly what our onboarding should close.

## Setup metrics by product

Each product has one definition of setup. The "Signal" column says where we read it from: the organization's **usage report** (a daily report of what an organization sent to PostHog), or a **product event**. You can see how many organizations meet each definition on <PrivateLink url="https://us.posthog.com/project/2/dashboard/2297976">the Setup metrics by product dashboard</PrivateLink>.

| Product | What counts as set up | Signal |
| --- | --- | --- |
| Product Analytics | Ingested at least one event | Usage report |
| Web Analytics | A user viewed a web analytics page in the app | Product event (pageview on the web analytics path) |
| Session Replay | Ingested at least one recording | Usage report |
| Feature Flags | A user created a feature flag | Product event |
| Experiments | A user created an experiment | Product event |
| Surveys | A user launched a survey | Product event |
| Error Tracking | Captured at least one exception | Usage report |
| Logs | Ingested at least one log record | Usage report |
| Traces | Ingested at least one trace span | Usage report |
| Metrics | Ingested at least one metrics record | Usage report |
| Data Warehouse | A user created a source, or more than 5 rows were synced | Product event or usage report |
| Data Pipelines | Billable destination invocations, or an active batch export | Usage report |
| AI Observability | Ingested at least one AI event | Usage report |
| Replay Vision | Used Replay Vision credits | Usage report |
| Inbox (self-driving) | Used signals credits | Usage report |
| Workflows | A user activated a workflow, or workflow invocations were billed | Product event or usage report |
| MCP Analytics | The organization reported MCP tool calls or initializations (PostHog-owned organizations excluded) | Usage report |
| Slack app | Slack app activity: a mention received, a link unfurled, or an unprompted question classified | Product event |

**PostHog AI** has no setup metric. Anyone can use it right after signing up, so there is nothing to configure.

Setup is a one-time milestone. We count an organization the first time it meets the definition, and don't un-count it if it later stops using the product.

## Picking the setup definition for a new product

Ask: _what is the least an organization has to do before this product can start working for them?_ Then check the answer against these guidelines:

1. **It's the minimum, not the aha moment.** If your definition needs several actions, or repeated use, it's probably activation.

2. **It's observable at the organization level.** Pick something that happens regardless of which surface was used. Usage report fields are usually the most reliable option for products that ingest data. For products where someone creates an object (a flag, an experiment, a survey), use a server-side event.

3. **It's a one-time milestone.** "Has ever done X" is easier to reason about than "did X recently".

4. **It's not true by default.** Some fields are non-zero for every organization because of defaults, which makes everyone look set up. Check the numbers before you commit to a field.

Once you've picked a definition:

1. Add a tile for it to <PrivateLink url="https://us.posthog.com/project/2/dashboard/2297976">the Setup metrics by product dashboard</PrivateLink>, in both sections, using an existing tile as a template.
2. Add the product to the table on this page.
3. Make sure PostHog-owned organizations are excluded if they could skew the numbers.
