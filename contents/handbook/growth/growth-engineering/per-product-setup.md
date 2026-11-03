---
title: Per-product setup
sidebar: Handbook
showTitle: true
---

Because PostHog offers so many products, and people sign up with all sorts of different needs, we track setup separately for each product.

**Setup is when an organization has completed the minimum configuration a product needs to start delivering value.** It is the first milestone after someone shows [intent](/handbook/growth/growth-engineering/product-intents) for a product, and the step right before [activation](/handbook/growth/growth-engineering/per-product-activation).

We use setup to:

- Trigger onboarding flows. If an organization hasn't set up a product yet, we help them get there. Once they have, we encourage them to learn more about the product and move towards activation.
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

## Why setup is defined at the organization level

People now use PostHog through many surfaces: the app UI, MCP, the API, SDKs, Slack, and more. If we measured setup by what a person clicked in the UI, we would miss everyone who set a product up through an agent or in code, and our numbers would depend on which surface someone happened to choose.

Defining setup for the organization fixes that:

- A product counts as set up whether the first step happened in the UI, through MCP, or through an SDK.
- Setup doesn't depend on one person. If a teammate configures a product, the whole organization is set up.
- It lines up with how we think about customers and billing, which are also organization-level.

For this reason, where we can, we prefer signals that don't depend on the surface, such as the organization's daily usage report or a server-side event, over events captured by the UI.

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

## How we track setup

We track setup in two ways, both on <PrivateLink url="https://us.posthog.com/project/2/dashboard/2297976">the Setup metrics by product dashboard</PrivateLink>:

1. **New organizations reaching setup.** For each product, the number of unique organizations that met the setup definition for the first time in a given week.
2. **Setup rates.** Of the organizations that signed up in a given week, the percentage that set up each product within 14 days of signing up. We use the same 14-day window as our overall setup rate, and only show weeks where every organization has had the full 14 days. Every chart uses the same 0-100% scale so products are easy to compare.

The two views answer different questions. The first tells us how many organizations are getting set up. The second tells us how good our onboarding is at getting new organizations there.

Setup is not the same as activation. For the activation criteria, see <PrivateLink url="https://us.posthog.com/project/2/dashboard/130345">the per-product activation dashboard</PrivateLink> and the [per-product activation](/handbook/growth/growth-engineering/per-product-activation) page.

## Picking the setup definition for a new product

Ask: _what is the least an organization has to do before this product can start working for them?_ Then check the answer against these guidelines:

1. **It's the minimum, not the aha moment.** If your definition needs several actions, or repeated use, it's probably activation.

2. **It's observable at the organization level.** Pick something that happens regardless of which surface was used. Usage report fields are usually the most reliable option for products that ingest data. For products where someone creates an object (a flag, an experiment, a survey), use a server-side event.

3. **It's a one-time milestone.** "Has ever done X" is easier to reason about than "did X recently".

4. **It's not true by default.** Some fields are non-zero for every organization because of defaults, which makes everyone look set up. Check the numbers before you commit to a field.

5. **It's not trivially met.** If a test or a single stray event would count, add a small threshold (like the row threshold for Data Warehouse).

Once you've picked a definition:

1. Add a tile for it to <PrivateLink url="https://us.posthog.com/project/2/dashboard/2297976">the Setup metrics by product dashboard</PrivateLink>, in both sections, using an existing tile as a template.
2. Add the product to the table on this page.
3. Make sure PostHog-owned organizations are excluded if they could skew the numbers.

## Why does this matter?

Setup is the first point where we can tell whether someone who wants to use a product has actually started to. If lots of organizations show intent but never set up, the problem is in getting started, and the fix is usually in onboarding, docs, or the product itself. If they set up but never activate, the problem is further along, and the activation work takes over.

Because setup is defined per organization and doesn't depend on the surface used, it stays a reliable number as more people use PostHog through agents, MCP, and APIs rather than the UI.
