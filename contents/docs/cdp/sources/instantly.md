---
title: Linking Instantly as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Instantly
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Instantly connector syncs your cold email outreach data – campaigns, leads, emails, sending accounts, lead lists, and campaign analytics – from [Instantly](https://instantly.ai) into PostHog.

## Prerequisites

You need an Instantly workspace on the **Growth plan or above** (the Instantly API v2 is only available from Growth up) and an API key. The optional real-time webhook event stream additionally requires the **Hypergrowth plan or above**.

## Adding a data source

<SourceSetupIntro />

To get an API key, go to **Settings → Integrations → API keys** in Instantly and create a key.

Instantly API keys are scope-gated. The key needs a read scope for every table you sync: `all:read` covers everything, or use narrower scopes like `campaigns:read`, `leads:read`, `emails:read`, and `accounts:read` for just the tables you want. Tables your key can't access are flagged in the table picker so you can deselect them. Automatic webhook creation additionally needs the `webhooks:all` (or `all:all`) scope.

## Sync modes

<SyncModes />

The `emails` table supports **incremental sync** on `timestamp_created`, so scheduled syncs only fetch emails created since the last run. Instantly rate-limits the emails endpoint to 20 requests per minute, so incremental sync is strongly recommended there – a full refresh of a large inbox can take a while.

The other tables have no "updated since" filter in the Instantly API, so they sync as full refreshes. They are typically small (campaigns, accounts, lead lists), with `leads` being the largest.

## Webhooks for real-time events

The `webhook_events` table is fed entirely by Instantly webhooks: it captures the raw event stream (sends, opens, replies, bounces, unsubscribes, lead status changes, and custom labels) as events happen. When you enable the webhook sync method for it, PostHog creates the webhook in your Instantly workspace automatically, subscribed to all events and secured with a generated secret header that PostHog verifies on every delivery.

To set the webhook up manually instead: create a webhook in Instantly targeting the webhook URL shown in PostHog, set the event type to **All events**, and add a custom header named `x-posthog-webhook-secret` whose value matches the webhook secret you configure in PostHog.

Instantly webhooks require the Hypergrowth plan or above. Without webhooks, the `webhook_events` table stays empty – all other tables are unaffected.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Instantly rejected your API key**: check the key is copied correctly and has not been revoked in **Settings → Integrations → API keys**.
- **Workspace does not have an active paid plan**: the Instantly API requires the Growth plan or above; webhooks require Hypergrowth or above.
- **A table shows a permission error**: your API key is missing that table's read scope. Create a key with `all:read`, or add the matching scope (e.g. `emails:read`) and reconnect.
- **The emails table syncs slowly**: Instantly limits the emails endpoint to 20 requests per minute and PostHog throttles to stay under it. Use incremental sync so only new emails are fetched on each run.
- **`webhook_events` is empty**: the table is webhook-only. Check the webhook exists in Instantly, points at the URL shown in PostHog, and that your plan includes webhooks.

<TroubleshootingLink />
