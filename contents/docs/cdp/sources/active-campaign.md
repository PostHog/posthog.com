---
title: Linking ActiveCampaign as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ActiveCampaign
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The ActiveCampaign connector syncs your CRM and marketing data – contacts, accounts, deals, campaigns, lists, automations, and more – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ActiveCampaign.
3. Next, you need your API URL and API key from ActiveCampaign. In your ActiveCampaign account, go to **Settings → Developer**. Copy the **API URL** (it looks like `https://youraccount.api-us1.com`) and the account-wide **API key**, which grants read access to every endpoint.
4. Back in PostHog, enter the credentials in the `API URL` and `API key` fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using ActiveCampaign data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `contacts` | Contacts in your ActiveCampaign account | Full refresh |
| `accounts` | Accounts (companies) | Full refresh |
| `deals` | Sales deals | Full refresh |
| `deal_stages` | Stages within your deal pipelines | Full refresh |
| `deal_groups` | Deal groups (pipelines) | Full refresh |
| `campaigns` | Email and marketing campaigns | Full refresh |
| `lists` | Contact lists | Full refresh |
| `segments` | Contact segments | Full refresh |
| `forms` | Signup and subscription forms | Full refresh |
| `tags` | Tags used to label contacts | Full refresh |
| `automations` | Marketing automations | Full refresh |
| `custom_fields` | Custom field definitions | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />
