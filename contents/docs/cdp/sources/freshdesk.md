---
title: Linking Freshdesk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Freshdesk
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Freshdesk domain and API key to pull your Freshdesk support data – tickets, contacts, companies, agents, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Freshdesk.
3. Next, gather your Freshdesk credentials:
   - **Freshdesk domain** – the subdomain in your Freshdesk URL, e.g. `acme` for `acme.freshdesk.com`.
   - **API key** – on your Freshdesk profile settings page (click your profile picture → **Profile settings**; the API key is shown in the right sidebar).
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Freshdesk data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `tickets` | Support tickets | Incremental |
| `contacts` | Contacts | Incremental |
| `companies` | Companies | Full refresh |
| `agents` | Support agents | Full refresh |
| `groups` | Agent groups | Full refresh |
| `roles` | Agent roles | Full refresh |
| `products` | Products | Full refresh |
| `skills` | Agent skills | Full refresh |
| `ticket_fields` | Ticket field definitions | Full refresh |
| `time_entries` | Time entries logged on tickets | Full refresh |
| `satisfaction_ratings` | Customer satisfaction survey ratings | Full refresh |
| `sla_policies` | SLA policies | Full refresh |
| `business_hours` | Business hours definitions | Full refresh |
| `canned_response_folders` | Canned response folders | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only `tickets` and `contacts` have a server-side `updated_since` filter, so they support incremental sync on the `updated_at` field. All other tables are full refresh only. Freshdesk caps the tickets list at roughly 300 pages per query; syncing `tickets` incrementally keeps each window small and lets the watermark advance across runs to page beyond that cap.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
