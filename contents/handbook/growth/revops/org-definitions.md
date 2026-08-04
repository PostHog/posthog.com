---
title: Org definitions: intent, activation & engagement
sidebar: Handbook
showTitle: true
---

Intent, activation, and engagement are customer- and revenue-level concepts that Sales, Marketing, Customer Success, and Growth all rely on. If you think a definition should change (which events qualify, which table is the source of truth, etc.), raise it with RevOps before you edit a dashboard tile so we can all work off of same source of truth.

[Growth's self-serve dashboard](https://us.posthog.com/project/2/dashboard/1849743) tracks these definitions against specific time windows and cohorts (e.g. "% of intent orgs activated within 14 days of signup"). 

## Level of aggregation

Every definition below is at the **organization** level (PostHog's `organization` group), not the individual person/user level. An org can have many users. These definitions describe something the org as a whole has done. An org qualifies once *any* of its users has triggered a qualifying action.

## Intent

An org has shown intent if it has a group attributed event that is one of:

- `user showed product intent`
- `onboarding started`
- `sdk selected`
- `wizard: started`
- `wizard: agent started`
- `product setup task completed`
- `onboarding_products_confirmed`
- `onboarding step completed`

This is an existence check: at least one qualifying event, ever.

## Activated

An org has activated if it has at least one day of non-zero product usage, per the `has_non_zero_usage` flag on its billing usage report (`prod_postgres_billing_usagereport`, keyed by `organization_id`). This is a billing system usage signal, not an events-table signal. It reflects data actually processed for the org.

**Signals that look similar but aren't this definition:** the single-event signal `first team event ingested` is sometimes used elsewhere as activation proxies. This doesn't match the canonical definition.

## Engaged (customer-initiated product usage)

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

## What's deliberately not defined here

Any specific tracked metric — "% of intent orgs that activate," "engagement in the 4th week," "conversion by day 120" — combines the baseline definitions above with a specific population, time window, and clock (signup-anchored vs. own-clock). Those metrics, along with their current values and formulas, live on Growth's tracking page so they can change as benchmarks evolve, without anyone needing to touch the definitions here.

