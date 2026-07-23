---
title: Linking UpPromote as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: UpPromote
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The UpPromote connector syncs your affiliate marketing data – programs, affiliates, referrals, coupons, and payments – into the PostHog Data warehouse, so you can analyze affiliate performance and referral revenue alongside your product data.

## Prerequisites

You need an UpPromote account on the Professional plan or above – UpPromote's API is only available from that plan.

## Adding a data source

<SourceSetupIntro />

When linking UpPromote, you'll need:

- **API key** – in the UpPromote app, go to **Settings** > **Integrations**, scroll down to **API Key**, and select **Get API Key**.

## Sync modes

<SyncModes />

Affiliates, coupons, referrals, and paid payments support incremental sync. UpPromote's date filters cover creation time only, so incremental sync picks up newly created records – changes to existing records (like a referral moving from pending to approved) are reconciled by webhooks or a full refresh.

The `payments_unpaid` table is an aggregated snapshot of outstanding commission per affiliate and always syncs via full refresh.

## Webhooks

PostHog automatically subscribes to [UpPromote's webhook events](https://aff-api.uppromote.com/docs/v2/webhook-overview-1623756m0) for you using your API key, so new and updated referrals, affiliates, and paid payments stream into the warehouse in real time between scheduled syncs after the initial backfill completes.

UpPromote allows one subscription per webhook event. If an event is already subscribed to another URL, PostHog leaves it untouched – free up the events you want PostHog to receive, or subscribe the webhook URL PostHog shows manually via UpPromote's `POST /webhook-subscriptions` API endpoint and paste the secret key (from **Settings** > **Integrations** > **Get Secret Key**) into the source configuration.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an `Unauthorized` error, your API key is invalid or has been revoked. Create a new key in the UpPromote app under **Settings** > **Integrations** > **API Key**, then reconnect. Remember that the API requires the Professional plan or above.
- UpPromote rate-limits each store to 120 API requests per minute. PostHog automatically backs off and retries, so large syncs may take a little longer but complete on their own.

<TroubleshootingLink />
