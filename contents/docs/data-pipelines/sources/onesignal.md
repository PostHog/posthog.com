---
title: Linking OneSignal as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OneSignal
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The OneSignal connector pulls your push notification, email, and SMS message data along with audience segments into the PostHog data warehouse.

> **Note:** OneSignal retains API messages for 30 days, so the first sync backfills at most the last 30 days of message history.

## Prerequisites

You need a OneSignal account with access to an app's **Settings > Keys & IDs** page, where you can find the App ID and App API key.

## Adding a data source

<SourceSetupIntro />

This source needs two credentials from your OneSignal app:

1. **App ID** – The UUID shown at the top of **Settings > Keys & IDs** in your OneSignal dashboard.
2. **App API key** – The REST API key from the same page. Enter the key value without the `Key` prefix or any spaces.

Paste both values into the corresponding fields in PostHog and click **Next**. Select the tables you want to sync, set the sync frequency, then click **Import**.

## Sync modes

<SyncModes />

Both tables use **full refresh** on every sync:

- **notifications** – Delivery and engagement totals change over time, so a full refresh captures the latest counts.
- **segments** – The OneSignal segments API has no timestamp filter, so a full refresh is the only option.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table           | Description                                                                                                    | Sync method  |
| --------------- | -------------------------------------------------------------------------------------------------------------- | ------------ |
| `notifications` | Push, email, and SMS messages with delivery and engagement totals. Journey messages are excluded.              | Full refresh |
| `segments`      | Audience segment metadata, including names, creation times, and status. Excludes filters and audience members. | Full refresh |

## Troubleshooting

### The source fails with a 401 error

OneSignal rejected the App API key. The key may be invalid, expired, or belong to a different app. Generate a new key in **Settings > Keys & IDs** and reconnect the source.

### The source fails with a 403 error

The App API key doesn't have permission to read the requested data. Check that the key has the correct permissions and isn't restricted by IP address in your OneSignal app settings.

### The source fails with a 400 error

OneSignal rejected the request, which usually means the App ID is wrong or doesn't match the App API key. Verify both values in **Settings > Keys & IDs** and update them in PostHog.

<TroubleshootingLink />
