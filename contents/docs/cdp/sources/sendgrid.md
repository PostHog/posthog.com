---
title: Linking SendGrid as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SendGrid
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your SendGrid API key to pull your SendGrid data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to SendGrid.
3. You need an API key from SendGrid. Create one in your [SendGrid account settings](https://app.sendgrid.com/settings/api_keys) under **Settings → API Keys**. Grant the following read access (Restricted Access) so the key can reach the data you want to sync:
   - **Suppressions** — bounces, blocks, invalid emails, spam reports, global unsubscribes, unsubscribe groups
   - **Marketing** — marketing lists
   - **Template Engine** — templates
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using SendGrid data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `bounces` | Suppressed addresses that hard or soft bounced | Incremental |
| `blocks` | Addresses blocked from receiving mail | Incremental |
| `invalid_emails` | Addresses rejected as invalid | Incremental |
| `spam_reports` | Recipients who marked your mail as spam | Incremental |
| `global_unsubscribes` | Globally unsubscribed addresses | Incremental |
| `unsubscribe_groups` | Unsubscribe (suppression) groups | Full refresh |
| `marketing_lists` | Marketing contact lists | Full refresh |
| `templates` | Email templates (legacy and dynamic) | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
