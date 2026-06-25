---
title: Linking Personio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Personio
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The Personio connector is currently in alpha. If you encounter any issues, please [report them on GitHub](https://github.com/PostHog/posthog/issues/new?labels=bug&template=bug_report.md).

</CalloutBox>

The Personio connector syncs your HR data from Personio to PostHog. The following tables are supported:

| Table              | Description                            | Sync mode                    |
| ------------------ | -------------------------------------- | ---------------------------- |
| persons            | Employee profiles and HR data          | Full refresh and incremental |
| absence_periods    | Employee absences and time-off records | Full refresh and incremental |
| attendance_periods | Employee attendance records            | Full refresh and incremental |

## Prerequisites

Before linking Personio, create API credentials in your Personio account:

1. In Personio, go to **Settings** > **Integrations** > **API credentials** (requires admin access)
2. Create new API credentials with the following read scopes:
   - `personio:persons:read`
   - `personio:absences:read`
   - `personio:attendances:read`
3. Note down your **Client ID** and **Client secret**

<CalloutBox icon="IconWarning" title="Whitelist employee attributes" type="caution">

You must whitelist the employee attributes you want to sync in your Personio API credential configuration. Attributes that aren't explicitly whitelisted are silently omitted from API responses.

</CalloutBox>

## Linking Personio

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog
2. Click **New source** and select Personio
3. Enter your **Client ID** and **Client secret**
4. _Optional:_ Add a prefix to your table names
5. Select the tables you want to import
6. Click **Import**

The data warehouse then starts syncing your Personio data. You can see details, progress, and rows synced in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Sync modes

Personio tables support both full refresh and incremental syncing:

- **Full refresh** – Re-imports all records from Personio on every sync
- **Incremental** – Only imports records modified since the last sync using `updated_at` filtering

When you enable incremental sync for a table:

1. The first sync performs a full import to establish a baseline.
2. Subsequent syncs only fetch records modified since the last sync.

Incremental syncing is more efficient for large Personio accounts, reducing sync time and API usage. If a sync is interrupted, it resumes from where it left off.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
