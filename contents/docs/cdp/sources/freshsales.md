---
title: Linking Freshsales as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Freshsales
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Freshsales domain and API key to pull your Freshsales (Freshworks CRM) data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Freshsales.
3. In Freshsales, go to **Profile settings → API settings** to find both credentials:
   - **Freshsales domain** is your bundle alias — the subdomain of your Freshsales URL (for example `yourcompany` for `yourcompany.myfreshworks.com`).
   - **API key** is sent as `Token token=<key>`. The key only exposes data the associated user can access, so make sure that user can read the objects you want to sync.
4. Back in PostHog, enter your **Freshsales domain** and **API key**, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Freshsales data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `contacts` | Contacts | Full refresh |
| `sales_accounts` | Sales accounts | Full refresh |
| `deals` | Deals | Full refresh |
| `leads` | Leads (not present on all accounts) | Full refresh |
| `sales_activities` | Sales activities | Full refresh |
| `open_tasks` | Open tasks | Full refresh |
| `completed_tasks` | Completed tasks | Full refresh |
| `past_appointments` | Past appointments | Full refresh |
| `upcoming_appointments` | Upcoming appointments | Full refresh |

**Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
