---
title: Linking Gorgias as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gorgias
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Gorgias credentials to pull your helpdesk data – tickets, messages, customers, users, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Gorgias.
3. Next, gather your Gorgias credentials:
   - **Gorgias domain (subdomain)** – your account subdomain, e.g. `your-company` for `your-company.gorgias.com`.
   - **Account email** – the email of the account that owns the API key.
   - **API key** – create one in your Gorgias account under **Settings → REST API**.

   This source authenticates with HTTP Basic Auth (email plus API key) and requires read access to the endpoints you want to sync.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Gorgias data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `tickets` | Support tickets | Full refresh |
| `messages` | Messages on tickets | Full refresh |
| `customers` | Customers | Full refresh |
| `users` | Helpdesk users (agents) | Full refresh |
| `satisfaction_surveys` | Customer satisfaction surveys | Full refresh |
| `tags` | Tags | Full refresh |
| `views` | Views | Full refresh |
| `teams` | Teams | Full refresh |
| `macros` | Macros | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Gorgias tables are full refresh only. Gorgias list endpoints have no server-side timestamp filter (only client-side ordering), so true incremental sync is not currently possible.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
