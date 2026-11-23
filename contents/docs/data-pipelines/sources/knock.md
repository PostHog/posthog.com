---
title: Linking Knock as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Knock
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Knock connector syncs your notification data – messages, users, tenants, objects, schedules, workflow recipient runs, message events, delivery attempts, and user feed items – into PostHog, so you can analyze notification delivery and engagement alongside your product data.

## Prerequisites

You need a Knock account with access to the **secret API key** for the environment you want to import from. Knock API keys are scoped to a single environment (like development or production), so pick the key for the environment whose data you want.

## Adding a data source

<SourceSetupIntro />

You need your Knock secret API key (it starts with `sk_`). Find it in the Knock dashboard under **Developers** → **API keys**. Public keys (`pk_`) only support client-side identification and won't work for syncing data.

## Sync modes

<SyncModes />

The `messages` and `workflow_recipient_runs` tables support incremental sync on `inserted_at` using Knock's server-side date filters, so ongoing syncs only fetch new rows. Engagement fields that change on existing messages after delivery (like `read_at`, `seen_at`, and `interacted_at`) are only refreshed by a full refresh, so consider scheduling periodic full refreshes of `messages` if you rely on those fields.

The `users` and `tenants` tables don't have a server-side updated-since filter in Knock's API, so they always sync as a full refresh.

The `objects` table syncs object recipients from the collections you specify in the **Object collections** configuration field. Since Knock has no endpoint to list collections, you must enter your collection names manually. This table only syncs when at least one collection is configured.

The `schedules` table fetches schedules per user and syncs as a full refresh. It is **off by default** because it sends one request per user – enable it in the sync settings if you need schedule data.

The `message_events` and `message_delivery_logs` tables capture what happens to each message after it was sent. `message_events` includes state changes like sent, delivered, read, and link clicked. `message_delivery_logs` includes the provider request and response for each delivery attempt. Both tables use the parent `messages` listing with a backfill window (three days for events, one day for delivery attempts) to pick up events that land after a message is created. These tables are **off by default** because they send one request per message – enable them in the sync settings if you need this data.

The `user_feed_items` table syncs in-app feed items for each user, one request per user for each in-app feed channel you configure in the **In-app feed channel IDs** setting. The table is **off by default** because it sends one request per user per channel – enable it in the sync settings if you need feed item data. Items sync as a full refresh because read, seen, and archived state changes after an item is created, and the only filter Knock supports is on `inserted_at`. Archived items are included by default.

Knock also excludes messages outside your account's retention window from its API, so the `messages` table only backfills as far as your Knock retention allows.

## Configuration

<SourceParameters />

**Object collections:** Knock has no API endpoint to list your collections, so you must manually enter the collection names (comma-separated) you want to sync. You can find your collection names in the Knock dashboard under **Objects**. Leave this field empty if you don't use objects as notification recipients.

**In-app feed channel IDs:** Knock cannot list in-app feed channels with a secret API key, so you must manually enter the channel IDs (comma-separated) you want to sync feed items from. You can find your in-app feed channel IDs in the Knock dashboard under **Settings** → **Channels and sources**. Leave this field empty if you don't need to sync in-app feed data. When at least one channel ID is configured, the `user_feed_items` table is available in your sync settings.

## Supported tables

<SourceTables />

## Troubleshooting

If the source fails to connect or a sync stops with an authorization error, your secret API key is likely invalid or revoked – generate a new key in the Knock dashboard under **Developers** → **API keys** and update the source credentials. If a table is unexpectedly empty, check that you connected the key for the right Knock environment, since each key only sees its own environment's data.

If the `objects` table is empty, check that you have entered your object collection names in the **Object collections** configuration field. If the `user_feed_items` table is empty or missing, check that you have entered your in-app feed channel IDs in the **In-app feed channel IDs** configuration field. If the `message_events`, `message_delivery_logs`, `schedules`, or `user_feed_items` tables are empty, verify they are enabled in your sync settings – these tables are off by default to avoid high API usage. If a sync fails with a 404 error on the `user_feed_items` table, one of your configured channel IDs is incorrect – verify the channel IDs match your in-app feed channels in the Knock dashboard.

<TroubleshootingLink />
