---
title: Linking ConvertKit as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ConvertKit
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Kit (formerly ConvertKit) connector syncs your email marketing data – subscribers, broadcasts, forms, sequences, tags, custom fields, purchases, and email templates – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ConvertKit.
3. Next, you need a v4 API key from Kit. You can create one in your [Kit account settings](https://app.kit.com/account_settings/developer_settings) under developer settings. Copy the API key value (it starts with `kit_`).
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Kit data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `subscribers` | Subscribers in your Kit account, synced incrementally on `created_at` or `updated_at` | Incremental |
| `broadcasts` | Broadcasts (one-off email sends) | Full refresh |
| `forms` | Forms used to collect subscribers | Full refresh |
| `sequences` | Email sequences | Full refresh |
| `tags` | Subscriber tags | Full refresh |
| `custom_fields` | Custom subscriber fields | Full refresh |
| `purchases` | Purchases recorded in Kit | Full refresh |
| `email_templates` | Email templates | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
