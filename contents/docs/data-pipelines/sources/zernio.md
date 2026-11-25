---
title: Linking Zernio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zernio
---

The Zernio connector syncs your social publishing data, inbox conversations, contacts, and ads into the PostHog data warehouse. Zernio (formerly Late) is a social publishing, inbox, and ads API. This source is currently in **beta**.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zernio.
3. Create an API key on the [API keys](https://zernio.com/dashboard/api-keys) page of the Zernio dashboard. The key starts with `sk_`. Restricted keys (`zrk_`) are also accepted.
4. Back in PostHog, paste the key in the **API key** field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Zernio data in PostHog.

## Available tables

| Table                 | Description                                                                                            | Sync method  |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------ |
| `profiles`            | A Zernio profile: a group of connected accounts, usually one brand or one customer                     | Full refresh |
| `accounts`            | A social, ads, messaging, or other account connected to a Zernio profile                               | Full refresh |
| `account_groups`      | A named group of connected accounts that can hold accounts from several profiles                       | Full refresh |
| `users`               | A member of the Zernio team, with their role and profile access                                        | Full refresh |
| `posts`               | A post created through Zernio, with its per-platform publishing targets                                | Incremental  |
| `contacts`            | A contact stored for messaging, with message counts and custom fields                                  | Full refresh |
| `broadcasts`          | A broadcast: one message sent to many contacts, with its delivery counts                               | Full refresh |
| `sequences`           | A message sequence: a series of timed messages that contacts are enrolled in                           | Full refresh |
| `workflows`           | A messaging workflow, with its run counts                                                              | Full refresh |
| `inbox_conversations` | A direct-message conversation from a connected messaging account, as stored in the Zernio inbox        | Incremental  |
| `ads`                 | An ad, created in Zernio or synced from a platform ads manager, with its metrics over the last 90 days | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `posts` and `inbox_conversations` tables use incremental sync on the `updatedAt` field with a 5-minute lookback window to handle late-arriving writes.

The `inbox_conversations` table requires the Zernio Inbox add-on. The `ads` table requires ads access on your Zernio plan. If your plan does not include these, disable the corresponding tables or the sync will fail.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
