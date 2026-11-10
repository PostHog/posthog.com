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

Enter your Short.io API key to pull your domains, links, and click statistics into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Short.io.
3. Create an API key under **Integrations & API** in your [Short.io dashboard](https://app.short.io/settings/integrations/api-key). Copy the secret key value.
4. Back in PostHog, enter the API key, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Short.io data in PostHog.

## Available tables

| Table              | Description                                                               | Sync method  |
| ------------------ | ------------------------------------------------------------------------- | ------------ |
| `domains`          | Branded short-link domains configured in your Short.io account            | Full refresh |
| `links`            | Short links in a Short.io domain, including changes to existing links     | Full refresh |
| `link_clicks`      | Total click count for each link within the account's available history    | Full refresh |
| `last_clicks`      | Raw click events in the account's available history                       | Full refresh |
| `link_by_interval` | Daily click counts per link in UTC within the account's available history | Full refresh |

**Full refresh** tables reload all data on each sync.

## Sync limitations

- All tables sync via full refresh only. Short.io's APIs do not expose reliable server-side filters for incremental syncing.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
