---
title: Org definitions: intent, activation & engagement
sidebar: Handbook
showTitle: true
---

RevOps owns the definitions on this page. Intent, activation, and engagement are customer- and revenue-level concepts that Sales, Marketing, Customer Success, and Growth all rely on, so no single team should redefine them unilaterally. If you think a definition should change (which events qualify, which table is the source of truth, etc.), raise it with RevOps — changes need agreement across the teams that depend on them, not just an edit to a dashboard tile.

Growth's self-serve dashboards track these definitions against specific time windows and cohorts (e.g. "% of intent orgs activated within 14 days of signup"). Those tracked metrics, with their specific windows and current values, belong on a separate Growth handbook page. This page only defines the underlying concepts — no timeframes.

## Level of aggregation

Every definition below is at the **organization** level (PostHog's `organization` group), not the individual person/user level. An org can have many users; these definitions describe something the org as a whole has done — an org qualifies once *any* of its users has triggered a qualifying action — not something a specific person did.

## Intent

An org has shown intent if it has a group-attributed event that is one of:

- `user showed product intent`
- `onboarding started`
- `sdk selected`
- `wizard: started`
- `wizard: agent started`
- `product setup task completed`
- `onboarding_products_confirmed`
- `onboarding step completed`

This is an existence check — at least one qualifying event, ever. There's no rate, count, or time condition baked into the definition itself.

## Activated

An org has activated if it has at least one day of non-zero product usage, per the `has_non_zero_usage` flag on its billing usage report (`prod_postgres_billing_usagereport`, keyed by `organization_id`). This is a billing-system usage signal, not an events-table signal — it reflects data actually processed for the org, rather than a specific in-app click.

This is the one and only canonical "activated" condition. What varies between different tracked metrics is which clock it's measured against (signup date vs. the org's own activation date) and what window is applied — those specifics belong on the Growth tracking page, not here.

**Signals that look similar but aren't this definition:** the manually product-tagged event `product intent marked activated` and the single-event signal `first team event ingested` are sometimes used elsewhere as activation proxies. Neither is the canonical definition above — treat them as distinct, narrower signals if you see them on a dashboard.

## Engaged (customer-initiated product usage)

An org is showing engagement on a given day if any of its users triggers one of the following:

- `insight viewed`
- `viewed dashboard`
- `recording viewed`
- `chat with ai`
- `$mcp_tool_call`
- `query executed`, where `properties.source` is one of `web`, `posthog_ai`, `mcp`, `api`, `cli`

These are customer-initiated actions — someone deliberately using the product — as opposed to passive or automatic data ingestion.

## Teammate invited

An org has invited a teammate if it has any of the following events: `team member invited`, `user invited`, `bulk invite executed`.

## Quick-start task completed

An org completes a quick-start task each time a `product setup task completed` event fires; the event's `task` property identifies which task. "Multiple quick-start tasks" means multiple distinct values of that property.

## Paying / revenue

An org is paying in a given month if its `total_mrr` (from `iwa_summary_customer_month`, keyed by `organization_id`) is greater than 0.

Startup-credit orgs are identified separately, via `startup_plan_start_at` in `prod_postgres_billing_customer.metadata` — this flags an org that joined the startup plan and is covered by credits rather than paying cash.

## What's deliberately not defined here

Any specific tracked metric — "% of intent orgs that activate," "engagement in the 4th week," "conversion by day 120" — combines the baseline definitions above with a specific population, time window, and clock (signup-anchored vs. own-clock). Those metrics, along with their current values and formulas, live on Growth's tracking page so they can change as benchmarks evolve, without anyone needing to touch the definitions here.

## Source

These definitions are implemented on PostHog's [Growth self serve funnel health dashboard](https://us.posthog.com/project/2/dashboard/1849743). If the underlying event or property names change, update this page to match.
