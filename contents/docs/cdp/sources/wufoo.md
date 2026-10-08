---
title: Linking Wufoo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Wufoo
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Wufoo connector syncs your form data – forms, reports, and users – into PostHog, letting you analyze form activity alongside your product data.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Wufoo.
3. Gather your Wufoo credentials:
   - **Subdomain** – your Wufoo subdomain. For `https://acme.wufoo.com/`, the subdomain is `acme`.
   - **API key** – find this in your Wufoo account under **API Information**.
4. Back in PostHog, enter your credentials and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Wufoo data in PostHog.

## Available tables

| Table     | Description                                              | Sync method  |
| --------- | -------------------------------------------------------- | ------------ |
| `forms`   | Form definitions including URL, status, and settings     | Full refresh |
| `reports` | Saved visualizations and summaries built on form entries | Full refresh |
| `users`   | Users on your Wufoo account with their roles and access  | Full refresh |

All tables sync using **full refresh**, which reloads all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
