---
title: Linking Mailgun as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mailgun
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Mailgun connector syncs your transactional and bulk email data into PostHog, including events, bounces, complaints, unsubscribes, templates, and more.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Mailgun.
3. Enter your **Private API key**. You can find this in the [Mailgun dashboard](https://app.mailgun.com/settings/api_security) under **Settings** > **API security**.
4. Select your **Region** — choose **US** (`api.mailgun.net`) or **EU** (`api.eu.mailgun.net`) to match where your Mailgun account is hosted.
5. Click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Mailgun data in PostHog.

## Available tables

| Table           | Description                                                 | Sync method  |
| --------------- | ----------------------------------------------------------- | ------------ |
| `domains`       | Sending domains configured in your Mailgun account          | Full refresh |
| `events`        | Email events such as deliveries, opens, clicks, and bounces | Incremental  |
| `bounces`       | Bounced email addresses per domain                          | Full refresh |
| `complaints`    | Spam complaint addresses per domain                         | Full refresh |
| `unsubscribes`  | Unsubscribed addresses per domain                           | Full refresh |
| `mailing_lists` | Mailing lists                                               | Full refresh |
| `tags`          | Tags per domain                                             | Full refresh |
| `templates`     | Email templates per domain                                  | Full refresh |

**Incremental** tables sync only new records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- **Incremental sync for events only** – Only the `events` table supports incremental syncing using the `timestamp` field. All other tables use full refresh because those Mailgun API endpoints don't expose a server-side time filter.

- **Event retention limits** – Mailgun retains events for a limited period depending on your plan (1 day on free plans, up to 30 days on paid plans). The initial events sync is bounded by your plan's retention window.

- **30-minute event lag** – Events sync with a 30-minute lag to account for Mailgun's eventual consistency. Recent events within this window appear on the next sync.

- **Domain-scoped data** – Most tables (`events`, `bounces`, `complaints`, `unsubscribes`, `tags`, `templates`) are scoped per sending domain. The source automatically enumerates all your domains and syncs data for each one. A `domain` column is added to these tables so records stay unique across domains.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
