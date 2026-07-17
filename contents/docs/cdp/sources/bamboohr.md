---
title: Linking BambooHR as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BambooHR
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The BambooHR connector syncs your HR data – employees, time off requests and types, and account metadata – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to BambooHR.
3. Next, you need your company subdomain and an API key from BambooHR. Your **company subdomain** is the first part of your BambooHR URL (for example `yourcompany` in `yourcompany.bamboohr.com`). To generate an **API key**, go to **Account Settings → API Keys** (this requires admin permissions) and make sure the key has access to the data you want to sync.
4. Back in PostHog, enter the credentials in the `Company subdomain` and `API key` fields and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using BambooHR data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `employees` | Employee directory | Full refresh |
| `time_off_requests` | Time off requests | Full refresh |
| `time_off_types` | Time off type definitions | Full refresh |
| `meta_fields` | Field definitions in your account | Full refresh |
| `meta_lists` | List field options | Full refresh |
| `meta_users` | Users with account access | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All BambooHR tables are full refresh only – the BambooHR API does not expose a verified "modified since" filter that returns complete records, so each sync reloads all data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
