---
title: Linking Postmark as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Postmark
---

The Postmark connector syncs your transactional email data into PostHog, including outbound messages, inbound messages, bounces, templates, and message streams.

## Schemas

| Schema              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `messages_outbound` | Outbound email messages sent through Postmark      |
| `messages_inbound`  | Inbound email messages received through Postmark   |
| `bounces`           | Email bounces and delivery failures                |
| `templates`         | Email templates configured in your Postmark server |
| `message_streams`   | Message streams for organizing email types         |

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **New source** and select Postmark.
3. Enter your Postmark Server API token. You can find this in your Postmark dashboard under **Servers** > select your server > **API Tokens**.
4. _Optional:_ Add a prefix to your table names.
5. Click **Next**.

The data warehouse then starts syncing your Postmark data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Sync limitations

- **Full refresh only** – Postmark syncs use full refresh mode. Incremental syncing is not currently supported.
- **10,000 row limit** – The Postmark API caps each paginated endpoint at 10,000 rows. If you have more than 10,000 messages, bounces, or other records, only the most recent 10,000 are synced.
- **Message retention** – Postmark expires messages after a retention window (45 days by default), so historical data beyond that window is unavailable from the API.

## Configuration

<SourceParameters />
