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

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Mailjet API key and secret key to pull your Mailjet data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Mailjet.
3. Find your **API key** and **Secret key** on your [Mailjet API key management page](https://app.mailjet.com/account/apikeys).
4. Back in PostHog, enter the API key and secret key, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Mailjet data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `contact` | Contacts | Full refresh |
| `contactslist` | Contact lists | Full refresh |
| `listrecipient` | Contact-to-list membership records | Full refresh |
| `campaign` | Campaigns | Full refresh |
| `campaigndraft` | Campaign drafts | Full refresh |
| `message` | Messages | Full refresh |
| `contactmetadata` | Contact metadata definitions | Full refresh |
| `template` | Templates | Full refresh |
| `openinformation` | Email open statistics | Incremental |
| `clickstatistics` | Email click statistics | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the statistics tables (`openinformation` and `clickstatistics`) support incremental syncing, using Mailjet's `FromTS` time-window filter. The list resources have no reliable server-side time filter and are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
