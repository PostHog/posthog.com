---
title: Linking Mailjet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mailjet
---

Enter your Mailjet API key and secret key to pull your Mailjet data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Mailjet.
3. Find your **API key** and **Secret key** on your [Mailjet API key management page](https://app.mailjet.com/account/apikeys).
4. Back in PostHog, enter the API key and secret key, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Mailjet data in PostHog.

## Available tables

| Table                | Description                                  | Sync method  |
| -------------------- | -------------------------------------------- | ------------ |
| `contact`            | Contacts                                     | Full refresh |
| `contactslist`       | Contact lists                                | Full refresh |
| `listrecipient`      | Contact-to-list membership records           | Full refresh |
| `campaign`           | Campaigns                                    | Full refresh |
| `campaigndraft`      | Campaign drafts                              | Full refresh |
| `message`            | Messages                                     | Full refresh |
| `contactmetadata`    | Contact metadata definitions                 | Full refresh |
| `contactdata`        | Contact property values per contact          | Full refresh |
| `template`           | Templates                                    | Full refresh |
| `messageinformation` | Message sending, size, and spam information  | Incremental  |
| `openinformation`    | Email open statistics                        | Incremental  |
| `clickstatistics`    | Email click statistics                       | Incremental  |
| `bouncestatistics`   | Email bounce statistics                      | Incremental  |
| `statcounters`       | Daily delivery and engagement counters       | Incremental  |
| `messageevent`       | Delivery and engagement events from webhooks | Webhook only |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync. **Webhook only** tables get rows only from webhook deliveries.

## Sync limitations

The statistics and message information tables support incremental syncing on these fields:

- `messageinformation`: `CreatedAt`
- `openinformation`: `OpenedAt`
- `clickstatistics`: `ClickedAt`
- `bouncestatistics`: `BouncedAt`
- `statcounters`: `Timeslice`

The list resources have no reliable server-side time filter and are full refresh only.

## Webhooks for message events

The `messageevent` table has no list endpoint in Mailjet. Only webhook deliveries add rows to it. When you turn on the webhook sync method for this table, PostHog uses your API key to register Mailjet event callback URLs. It registers one URL for each of these event types: sent, open, click, bounce, blocked, spam, and unsub.

Mailjet does not sign its deliveries. Thus, PostHog puts generated basic-auth credentials in the callback URL. Mailjet sends them back in the `Authorization` header of each delivery, and PostHog rejects deliveries that do not match.

If the API key cannot manage webhooks, PostHog cannot register the callback URLs and the `messageevent` table stays empty. The other tables are not affected. The sent event occurs for each message that you send, so this table can grow quickly on accounts with high volume.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
