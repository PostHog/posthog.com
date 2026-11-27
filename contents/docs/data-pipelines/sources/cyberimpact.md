---
title: Linking Cyberimpact as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cyberimpact
---

The Cyberimpact connector syncs your Cyberimpact email marketing data – members, groups, unsubscribes, bounces, mailings, mailing statistics, opens, clicks, deliveries, mailing unsubscribes, mailing bounces, stopped recipients, and templates – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Cyberimpact.
3. Next, you need an API token from Cyberimpact. An account administrator creates the token in Cyberimpact under **Settings > API tokens**. Copy the token value.
4. Back in PostHog, paste the token in the `API token` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Cyberimpact data in PostHog.

## Available tables

| Table                  | Description                                                                           | Sync method  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------ |
| `members`              | Subscribed members (contacts) of the account, both in groups and in no group          | Incremental  |
| `unsubscribed_members` | Members who unsubscribed from the account's mailings                                  | Full refresh |
| `bounced_members`      | Members for whom the last mailing sent to them returned a hard bounce                 | Full refresh |
| `groups`               | Groups (mailing lists) of the account                                                 | Full refresh |
| `group_members`        | Members of each group, one row per group and member                                   | Full refresh |
| `custom_fields`        | Custom member fields defined in the account                                           | Full refresh |
| `sent_mailings`        | Sent mailings, without archived mailings                                              | Full refresh |
| `scheduled_mailings`   | Mailings scheduled to be sent                                                         | Full refresh |
| `archived_mailings`    | Archived mailings                                                                     | Full refresh |
| `mailing_stats`        | Details and delivery, open and click statistics of each sent mailing                  | Full refresh |
| `mailing_opens`        | Recipients who opened each sent mailing, one row per mailing and recipient            | Full refresh |
| `mailing_clicks`       | Recipients who clicked a link in each sent mailing, one row per mailing and recipient | Full refresh |
| `templates`            | Email templates of the account                                                        | Full refresh |
| `mailing_deliveries`   | Recipients to whom each sent mailing was delivered, one row per mailing and recipient | Full refresh |
| `mailing_unsubscribes` | Recipients who unsubscribed through the link in each sent mailing, one row per mailing and recipient | Full refresh |
| `mailing_hard_bounces` | Recipients of each sent mailing whose email hard bounced, one row per mailing and recipient | Full refresh |
| `mailing_soft_bounces` | Recipients of each sent mailing whose email soft bounced, one row per mailing and recipient | Full refresh |
| `mailing_stopped_recipients` | Recipients who did not get a mailing because its sending was stopped, one row per mailing and recipient | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

### Sync limitations

Unsubscribed and bounced member tables only filter on their event date (unsubscribe or bounce), but a profile edit can change the row afterward, so they must use full refresh. The child tables (`group_members`, `mailing_stats`, `mailing_opens`, `mailing_clicks`, `mailing_deliveries`, `mailing_unsubscribes`, `mailing_hard_bounces`, `mailing_soft_bounces`, `mailing_stopped_recipients`) make one request per parent record, so they also sync as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
