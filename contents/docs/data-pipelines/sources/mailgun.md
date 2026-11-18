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

| Table                           | Description                                                                                                          | Sync method  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ |
| `allowlist`                     | Allowlisted email addresses or domains that Mailgun never adds to the bounce list, per domain                        | Full refresh |
| `bounce_classification_metrics` | Daily bounce and delay counts per sending domain, recipient provider, and bounce category                            | Incremental  |
| `bounces`                       | Bounced email addresses per domain                                                                                   | Full refresh |
| `complaints`                    | Spam complaint addresses per domain                                                                                  | Full refresh |
| `country_metrics`               | Daily engagement metrics per recipient country                                                                       | Incremental  |
| `domain_metrics`                | Daily sending, delivery, and engagement metrics per sending domain                                                   | Incremental  |
| `domains`                       | Sending domains configured in your Mailgun account                                                                   | Full refresh |
| `events`                        | Email events such as deliveries, opens, clicks, and bounces                                                          | Incremental  |
| `ip_pools`                      | Dedicated IP pools that group dedicated IPs for a sending stream                                                     | Full refresh |
| `ips`                           | Sending IP addresses on the Mailgun account                                                                          | Full refresh |
| `logs`                          | Account-wide message events from the Logs API (accepted, delivered, failed, opened, clicked)                         | Incremental  |
| `mailing_list_members`          | Members of mailing lists                                                                                             | Full refresh |
| `mailing_lists`                 | Mailing lists                                                                                                        | Full refresh |
| `metrics`                       | Daily sending, delivery, and engagement metrics for the whole account                                                | Incremental  |
| `recipient_provider_metrics`    | Daily sending, delivery, and engagement metrics per recipient mailbox provider                                       | Incremental  |
| `subaccounts`                   | Subaccounts under the Mailgun account                                                                                | Full refresh |
| `tag_metrics`                   | Daily sending, delivery, and engagement metrics per message tag                                                      | Incremental  |
| `tags`                          | Tags per domain                                                                                                      | Full refresh |
| `template_versions`             | Stored versions of each email template per domain                                                                    | Full refresh |
| `templates`                     | Email templates per domain                                                                                           | Full refresh |
| `unsubscribes`                  | Unsubscribed addresses per domain                                                                                    | Full refresh |
| `usage_metrics`                 | Daily account usage counts, such as processed messages, email validations, previews, and blocklist monitoring checks | Incremental  |

**Incremental** tables sync only new records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- **Incremental sync for events, logs, and metrics** – The `events`, `logs`, and `bounce_classification_metrics` tables support incremental syncing using the `timestamp` field. The daily metrics tables (`metrics`, `domain_metrics`, `tag_metrics`, `country_metrics`, `recipient_provider_metrics`, and `usage_metrics`) support incremental syncing using the `time` field. All other tables use full refresh because those Mailgun API endpoints don't expose a server-side time filter.

- **Daily metrics lookback** – The daily metrics tables read up to 365 days of history on the first sync, and the `bounce_classification_metrics` table reads up to 30 days. Because a day's counts can change until Mailgun's event store settles, incremental syncs read the days just before the last synced day again and update them.

- **Event retention limits** – Mailgun retains events for a limited period depending on your plan (1 day on free plans, up to 30 days on paid plans). The initial events sync is bounded by your plan's retention window.

- **30-minute event lag** – Events sync with a 30-minute lag to account for Mailgun's eventual consistency. Recent events within this window appear on the next sync.

- **30-day lookback for logs** – The `logs` table reads from the account-wide Logs API with a 30-day lookback window. Like the `events` table, it syncs with a 30-minute lag for consistency.

- **Domain-scoped data** – Most tables (`events`, `bounces`, `complaints`, `unsubscribes`, `allowlist`, `tags`, `templates`, `template_versions`) are scoped per sending domain. The source automatically enumerates all your domains and syncs data for each one. A `domain` column is added to these tables so records stay unique across domains.

- **List-scoped data** – The `mailing_list_members` table is scoped per mailing list. A `list_address` column identifies which list each member belongs to.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
