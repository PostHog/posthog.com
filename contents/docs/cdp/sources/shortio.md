---
title: Linking Short.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Shortio
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Short.io API key to pull your branded-link domains into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Short.io.
3. Create an API key under **Integrations & API** in your [Short.io dashboard](https://app.short.io/settings/integrations/api-key). Copy the secret key value.
4. Back in PostHog, enter the API key, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Short.io data in PostHog.

## Available tables

| Table     | Description                                                    | Sync method  |
| --------- | -------------------------------------------------------------- | ------------ |
| `domains` | Branded short-link domains configured in your Short.io account | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

- The `domains` table syncs via full refresh only. Short.io's domain list API does not expose a reliable server-side timestamp filter for incremental syncing.
- Per-domain links and click statistics are not synced yet.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
