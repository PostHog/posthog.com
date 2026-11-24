---
title: Linking Svix as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Svix
---

The Svix connector syncs your webhook infrastructure data — applications, event types, endpoints, messages, message attempts, and delivery statistics — into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Svix.
3. You need an API key from Svix. In your [Svix dashboard](https://dashboard.svix.com), go to **Settings** > **API Access** and create or copy an API key (starts with `sk_...`).
4. Back in PostHog, enter your API key and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Svix data in PostHog.

## Available tables

| Table              | Description                                                                                          | Sync method  |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------ |
| `applications`     | Applications in your Svix account — isolated tenants that own endpoints and receive webhook messages | Full refresh |
| `event_types`      | Event types — the schema and metadata for categories of webhook messages                             | Full refresh |
| `endpoints`        | Endpoints configured to receive webhook messages for a specific application                          | Full refresh |
| `messages`         | Webhook messages sent by your applications, including their payloads                                 | Incremental  |
| `message_attempts` | Delivery attempts for messages to endpoints, with response details                                   | Incremental  |
| `endpoint_stats`   | Delivery attempt counts per endpoint for the last 28 days                                            | Full refresh |

**Full refresh** tables reload all data on each sync. **Incremental** tables sync only new or updated data based on the `timestamp` field.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
