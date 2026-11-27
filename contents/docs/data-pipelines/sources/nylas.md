---
title: Linking Nylas as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Nylas
---

The Nylas connector syncs email, calendar, and contact data from connected accounts and Agent Accounts into the PostHog Data Warehouse.

## Prerequisites

You need a Nylas application, its API key, and accounts that contain the data you want to sync. A Nylas **grant** represents an account in your application. Connected accounts use an external provider, such as Google or Microsoft. [Agent Accounts](https://developer.nylas.com/docs/v3/agent-accounts/) are hosted by Nylas.

For connected accounts, complete [Nylas authentication](https://developer.nylas.com/docs/v3/auth/) first. Each account must authorize access to the email, calendar, or contact data you select. The PostHog connection does not add provider permissions to an existing grant.

## Adding a data source

1. In the [Nylas dashboard](https://dashboard-v3.nylas.com), select your application and create an API key under **API keys**. Use the application API key, rather than a grant access token or OAuth client secret.
2. In PostHog, go to the [Sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section.
3. Click **+ New source**, then click **Link** next to Nylas.
4. Enter your **API key** and select the **Data residency region** that matches your Nylas application: **United States** or **Europe**. This is your Nylas region, regardless of your PostHog region.
5. Choose **Grants to sync** and, optionally, enter **Grant IDs** to limit the accounts you import. See [Select accounts to sync](#select-accounts-to-sync).
6. Choose whether to sync message bodies and set **Calendar event history (days)** if you need a different history window.
7. Click **Next**, select your tables, choose their sync methods and frequency, then click **Import**.

Once the syncs complete, you can query your Nylas data in PostHog.

## Select accounts to sync

The API key can access every grant in its Nylas application. **Grants to sync** defaults to **All grants**. Choose **Agent Accounts only** or **Connected accounts only** to restrict the account type.

To select individual accounts, enter a comma-separated list of grant IDs in **Grant IDs**. Find these IDs in your Nylas application's grants. This list further restricts **Grants to sync**. For example, an Agent Account ID with **Connected accounts only** selected does not sync any data for that account.

These settings also filter which accounts' webhook notifications become table rows. They do not reduce the API key's permissions in Nylas.

## Sync behavior

See [sync methods](/docs/data-pipelines/sources#sync-methods) for how each mode works. The [supported tables](#supported-tables) below show the modes available for each table.

### Messages and threads

`messages` supports incremental sync using the message's `date`, rather than its last update time. Later edits to older messages, such as changes to read status, can be missed by incremental sync. Use webhooks to capture message updates or run a full refresh to reload existing messages.

`threads` uses full refresh. Each run reloads the threads in the selected accounts, including threads that contain only sent messages.

**Sync message bodies?** defaults to **Yes**. Choose **No** to remove the full body from message rows and the latest message embedded in thread rows. Message metadata, including sender, recipients, subject, snippet, and dates, remains available.

### Calendar events

Scheduled syncs read events from every calendar in the selected accounts. By default, each run covers 365 days in the past and 365 days ahead. Change **Calendar event history (days)** to import more or less past data. The future window remains 365 days.

`events` supports incremental sync using `updated_at`. For Google, Microsoft, and Exchange accounts, PostHog requests changes since the last sync when that timestamp is within the past 21 days. For other providers, older timestamps, or a rejected update filter, PostHog reads the whole configured time window again and merges the results. These runs can take longer.

Recurring events sync as a series plus any changed occurrences. PostHog does not expand every occurrence into its own row, so counting rows does not give the total number of meetings in a recurring series.

### Webhooks

`messages`, `events`, and `contacts` support webhook sync. PostHog creates the Nylas webhook and saves its signing secret automatically.

If automatic setup fails, create a webhook under **Notifications** in the Nylas dashboard. Use the URL shown in PostHog and select `message.created`, `message.updated`, `event.created`, `event.updated`, `event.deleted`, and `contact.updated`. Copy its **Webhook secret** into PostHog.

In webhook mode, deleted calendar events remain as rows with `status` set to `cancelled`. Filter out this status when you query active events. Deleted messages and contacts remain in PostHog; their deletion does not remove the stored rows.

PostHog rejects webhook notifications larger than 512 KB (512,000 bytes). Nylas does not retry this rejection. Its message truncation threshold is 1 MB, so some large messages can be missing from webhook sync until you run a full resync. Set **Sync message bodies?** to **No** to exclude bodies from storage, but this does not reduce the size of incoming notifications.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If PostHog rejects your credentials, check that the API key belongs to the selected Nylas region and has not been revoked.

If tables are empty or accounts are missing, check **Grants to sync**, **Grant IDs**, and the grants' authorization in Nylas. PostHog skips invalid grants when it reads account data. A provider that does not support a resource cannot supply that table's data.
