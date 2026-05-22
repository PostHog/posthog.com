---
title: Basic account review
sidebar: Handbook
showTitle: true
---

Prior to a customer discovery call, review session replays of the user to see how they interact with PostHog, and where improvements can be made. Check historic conversations in Vitally, or calls in BuildBetter, for wider context.

For fundamentals, use this checklist to check for common issues before a customer discovery call. PostHog only shows you some of this — for backend implementation details, you'll need to ask on the call.

## Events and event properties

Check what events the customer is tracking, whether they have custom events, whether autocapture is on, and whether they're collecting event properties (custom or autocapture).

Two places to look:

- **Activity** — recent events.
- **Data management** — custom actions, event definitions, property definitions.

Look for custom actions. Customers without any actions often aren't using PostHog effectively. Common patterns: renaming events into something more meaningful (e.g. `purchase_completed` instead of `clicked_purchase_button`), or bundling events like `user signups` or `purchases`.

If a customer has autocapture enabled but no actions defined, that's worth raising with them on the call.

## Reverse proxy configured

Check whether the customer has a reverse proxy set up:

- **If session replay is on:** open a replay, go to **Activity → Inspector → Doctor**, search "config", expand `api_host`. If you see `us.i.posthog.com` or `eu.i.posthog.com`, no proxy. If you see one of their domains, they have one.
- **If session replay is off:** add `?__posthog_debug=true` to a URL where PostHog is loaded, open the console, type `posthog.config`, and check the `api_host` property.
- **If neither works** (no session replay and the site isn't publicly accessible): ask on the discovery call.

## Person properties, group properties, and cohorts

Check whether the customer is using person properties, whether they might be over-identifying, and whether they're using cohorts.

Worth a look:

- What person properties are being added? Are there obvious ones missing for their business?
- Are they using cohorts? What kind?
- If group analytics is enabled: do their group types and properties make sense? Group types are limited to five, so they need to be set up intentionally.

## Ecommerce events

For ecommerce customers, check whether they've implemented the [ecommerce events specification](/docs/data/event-spec/ecommerce-events) — events like `sku`, `product_id`, `category`. Many customers don't know it exists.

## SDK or library version

Check that the customer is on an up-to-date SDK:

- In **Activity**, click `Configure columns` and add `Library` and `Library Version`.
- Or look up the `Library version audit` table in Metabase.

Compare against the latest versions in our GitHub repos.

## Sign up for an account

If the customer's product offers a free account, sign up and walk through the flow. You'll see which events fire, which don't, and what's likely missing.

## Dashboards

Have they set up custom dashboards or insights for their own goals (sign-ups, retention, free-to-paid), or are they relying on defaults? On the discovery call, you can ask whether what they're tracking matches their priorities.

## Data pipelines for event notifications

Check whether they're using data pipeline destinations (e.g. Slack notifications on specific events). Many customers don't realize this use case exists — it's an easy upsell.
