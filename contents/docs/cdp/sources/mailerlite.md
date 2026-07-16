---
title: Linking MailerLite as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MailerLite
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The MailerLite connector pulls your MailerLite email marketing data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to MailerLite.
3. You need a MailerLite API key, which you can create in your [MailerLite integrations settings](https://dashboard.mailerlite.com/integrations/api).
4. Back in PostHog, enter the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using MailerLite data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `subscribers` | Subscribers in your account | Full refresh |
| `campaigns` | Email campaigns | Full refresh |
| `groups` | Subscriber groups | Full refresh |
| `segments` | Subscriber segments | Full refresh |
| `fields` | Custom subscriber field definitions | Full refresh |
| `automations` | Automation workflows | Full refresh |
| `forms_popup` | Pop-up forms | Full refresh |
| `forms_embedded` | Embedded forms | Full refresh |
| `forms_promotion` | Promotion forms | Full refresh |
| `webhooks` | Configured webhooks | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The MailerLite API exposes no server-side timestamp filter on any list endpoint, so every table is full-refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
