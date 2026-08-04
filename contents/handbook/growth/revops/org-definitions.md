---
title: Org definitions: intent, setup & engagement
sidebar: Handbook
showTitle: true
---

Intent, setup, and engagement are customer level concepts that Sales, Marketing, Customer Success, and Growth all rely on. If you think a definition should change (which events qualify, which table is the source of truth, etc.), raise it with RevOps before you edit a dashboard tile so we can all work off of same source of truth.

[Growth's self-serve dashboard](https://us.posthog.com/project/2/dashboard/1849743) tracks these definitions against specific time windows and cohorts (e.g. "% of intent orgs that completed setup within 14 days of signup"). 

## Level of aggregation

Every definition below is at the **organization** level (PostHog's `organization` group), not the individual person/user level. An org can have many users. These definitions describe something the org as a whole has done. An org qualifies once *any* of its users has triggered a qualifying action.

**Organization vs. customer/billing account:** the billing tables (`prod_postgres_billing_usagereport`, `prod_postgres_billing_customer`) also have a `customer_id` — an external billing system identifier (`billing_provider` on `prod_postgres_billing_customer`, e.g. Stripe, though the field isn't Stripe-specific), separate from `organization_id`. Today these are the same level: `organization_id` and billing `customer_id` are 1:1 (confirmed by comparing distinct counts), and `prod_postgres_billing_customer` has a single `organization_id` per customer row rather than a join table, so there's no way to attach multiple orgs to one billing customer in the current schema. If a multi-org account structure gets built later (one customer, several organizations), every definition on this page would need to be revisited to specify which level it aggregates at.

## Intent

An org has shown intent if it has an event that is one of:

- `user showed product intent`
- `onboarding started`
- `sdk selected`
- `wizard: started`
- `wizard: agent started`
- `product setup task completed`
- `onboarding_products_confirmed`
- `onboarding step completed`

## Setup

An org has completed setup if it has at least one day of non-zero product usage, per the `has_non_zero_usage` flag on its billing usage report (`prod_postgres_billing_usagereport`, keyed by `organization_id`). This is a billing system usage signal, not an events table signal. It reflects data actually processed for the org.

This is a different concept from per-product **activation** (see [Per-product activation](/handbook/growth/growth-engineering/per-product-activation)), which is a specific, retention-validated behavioral milestone chosen separately for each product. Setup is simpler and unvalidated: it just means the org's data started flowing at all, not that the org has reached a behavior known to predict retention. Use "setup" for this org-level signal and reserve "activation"/"activated" for the per-product, retention-validated definitions.

**Signals that look similar but aren't this definition:** the single event signal `first team event ingested` is sometimes used elsewhere as a setup proxy. This doesn't match the canonical definition.

## Engaged (customer initiated product usage)

An org is showing engagement if any of its users triggers one of the following:

- `insight viewed`
- `viewed dashboard`
- `recording viewed`
- `chat with ai`
- `$mcp_tool_call`
- `query executed`, where `properties.source` is one of `web`, `posthog_ai`, `mcp`, `api`, `cli`

These are customer initiated actions (someone deliberately using the product) vs automatic data ingestion.

## Teammate invited

An org has invited a teammate if it has any of the following events: `team member invited`, `user invited`, `bulk invite executed`.

## Paying / revenue

An org is paying in a given month if its `total_mrr` (from `iwa_summary_customer_month`, keyed by `organization_id`) is greater than 0.

Startup credit orgs are identified separately, via `startup_plan_start_at` in `prod_postgres_billing_customer.metadata` This flags an org that is on startup plan and is covered by credits rather than paying cash. 

**Credit covered conversion:** a startup plan org can still behave like a converted, paying customer even while its cash MRR is $0. We flag this by combining the startup flag above with usage data: an org counts as a credit covered conversion once, in some month, it's on the startup plan (has a non-null `startup_plan_start_at`) *and* its usage in `iwa_summary_customer_month` exceeds the standard free-tier allowance for any product (e.g. `product_analytics_usage`, `session_replay_usage`, `feature_flags_usage`,  `llm_analytics_usage`, `posthog_ai_usage`, `workflows_emails_usage`, `workflows_destinations_usage` thresholds per [posthog.com/pricing](https://posthog.com/pricing), since those change over time). This matters because it's a real conversion signal: the org has grown past what a non credit account would get for free even though it won't show up in cash revenue metrics until the credits run out.

## Why these metrics may look different

The definitions above describe *what qualifies* an org for a state. Any specific tracked metric adds three more choices on top of a definition: a **population** (which orgs count), a **time window**, and whether stages are **chained into one funnel** or measured **independently**. Two metrics that both reference "setup" can give different looking answers even though neither is wrong, because these choices differ.

**Timeframes**: "Setup" itself has no time limit, it's non-zero usage, ever. A tracked metric layers a window on top: "completed setup within 14 days of signup" (a speed-of-onboarding read) is a different number from "completed setup, at any point, no deadline" (a volume read). Both use the same setup definition, but they don't match because the window differs.

**Full funnel vs. independent cutoffs**: A metric can chain stages together end-to-end e.g. "signed up AND showed intent AND completed setup within 14 days AND was still engaged in week 4". In this case only orgs that cleared every gate in sequence count. Or it can measure a later stage independently, anchored to its own clock e.g. "of orgs that completed setup, what % later engaged, counted from THEIR setup date, regardless of how long signup-to-setup took." The chained version gives a strict end-to-end conversion rate vs. the independent version isolates whether a later stage is healthy without conflating it with how fast an earlier stage was. Don't assume two "engagement" numbers are measuring the same thing just because they're both built on the setup/engaged definitions above.

If a metric doesn't match what you expected, check which population, window, and chaining choice it's using before assuming a definition changed.
