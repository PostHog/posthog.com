---
title: Linking Lemon Squeezy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: LemonSqueezy
beta: true
---

import AlphaRelease from "../_snippets/alpha-release.mdx"
import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Lemon Squeezy connector syncs your merchant-of-record data – stores, orders, subscriptions, customers, license keys, discounts, and more – into PostHog, so you can analyze revenue alongside your product data.

## Prerequisites

You need a Lemon Squeezy account and an API key. Note that Lemon Squeezy API keys expire after one year, and test-mode keys only return test-mode data.

## Adding a data source

<SourceSetupIntro />

When linking Lemon Squeezy, you'll need:

- **API key** – in your Lemon Squeezy dashboard, go to [Settings > API](https://app.lemonsqueezy.com/settings/api) and click **+** to create a new API key. Use a live-mode key to sync your production data.

## Sync modes

<SyncModes />

Lemon Squeezy's API doesn't expose an "updated since" filter, so full refresh is the default for mutable tables (subscriptions, customers, license keys). Append-mostly tables (orders, order items, subscription invoices, discount redemptions, usage records) support incremental sync on `created_at`. For real-time updates to orders, subscriptions, subscription invoices, and license keys, enable webhook syncing.

## Setting up webhooks for real-time syncing

Orders, subscriptions, subscription invoices, and license keys can also sync via webhooks: Lemon Squeezy pushes each event to PostHog the moment it happens, which is the only mode that captures updates to existing rows (like a subscription changing status) without a full refresh.

To enable it, open your source and go to the **Webhook** tab, then click **Create webhook**. PostHog registers a webhook on each of your Lemon Squeezy stores using your API key, with a generated signing secret used to verify every delivery.

If automatic creation fails, you can create the webhook manually in [Settings > Webhooks](https://app.lemonsqueezy.com/settings/webhooks): paste the webhook URL PostHog shows you, set a signing secret (6-40 characters), select the order, subscription, subscription payment, and license key events, and save. Then paste the same signing secret into PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If syncs start failing with an authorization error, your API key has likely expired – Lemon Squeezy keys are valid for one year. Create a new key under [Settings > API](https://app.lemonsqueezy.com/settings/api) and update the source.

<TroubleshootingLink />
