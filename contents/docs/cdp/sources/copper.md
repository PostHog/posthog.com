---
title: Linking Copper as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Copper
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync your Copper CRM data – people, companies, leads, opportunities, projects, tasks, and reference data – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Copper.
3. Next, gather your Copper credentials:
   - **API key** – generate one in Copper under **Settings → Integrations → API Keys**.
   - **User email** – the email address of the user the API key belongs to.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Copper data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `people` | Individual contacts in your Copper account | Incremental |
| `companies` | Company records | Incremental |
| `leads` | Sales leads | Incremental |
| `opportunities` | Sales opportunities (deals) | Incremental |
| `projects` | Projects | Incremental |
| `tasks` | Tasks | Incremental |
| `users` | Users in your Copper account | Full refresh |
| `pipelines` | Pipeline definitions | Full refresh |
| `customer_sources` | Customer source reference data | Full refresh |
| `loss_reasons` | Loss reason reference data | Full refresh |
| `contact_types` | Contact type reference data | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Incremental tables sync on the `date_modified` or `date_created` field (both Unix epoch seconds). The `users` table and the reference tables (`pipelines`, `customer_sources`, `loss_reasons`, `contact_types`) have no reliable server-side timestamp filter and are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
