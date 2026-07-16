---
title: Linking Brevo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Brevo
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Brevo connector syncs your Brevo (formerly Sendinblue) marketing data – contacts, lists, folders, segments, email and SMS campaigns, templates, and senders – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Brevo.
3. Next, you need an API key from Brevo. In your [Brevo account settings](https://app.brevo.com/settings/keys/api), create a new API key (it starts with `xkeysib-`) and copy its value.
4. Back in PostHog, paste the key in the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Brevo data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `contacts` | Contacts in your Brevo account | Incremental |
| `contact_lists` | Contact lists | Full refresh |
| `contact_folders` | Folders that organize contact lists | Full refresh |
| `contact_segments` | Contact segments | Full refresh |
| `email_campaigns` | Email campaigns | Full refresh |
| `sms_campaigns` | SMS campaigns | Full refresh |
| `email_templates` | Transactional email templates | Full refresh |
| `senders` | Configured sending identities | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
