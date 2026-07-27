---
title: Linking npm registry as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NpmRegistry
---

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Pull daily download counts and published-version metadata for npm packages into the PostHog data warehouse. This lets you join npm analytics with your product data in queries, insights, and dashboards.

npm's read APIs are public, so no credentials are required.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to npm registry.
3. Enter the **package names** you want to track – one per line or comma-separated. Scoped packages like `@scope/name` are supported.
4. Click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using npm data in PostHog.

## Available tables

| Table       | Description                                                                                                                                                                                       | Sync method  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `Downloads` | Daily download counts per configured package, from the npm [downloads-counts API](https://github.com/npm/registry/blob/master/docs/download-counts.md).                                           | Incremental  |
| `Versions`  | Published version metadata (publish time, dist-tags, license, tarball URL) per configured package, from the npm [registry API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md). | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

The `Versions` table is always full refresh because the npm registry API has no server-side "changed since" filter.

## Sync limitations

- **Maximum 100 packages** per source.
- Download data only goes back to **2015-01-10** (the earliest date the npm downloads API supports). Downloads are fetched in 540-day windows, so the first sync of a long-lived package can take a while.
- The `Versions` table re-fetches the full registry document for each package on every sync. Packages with a large number of published versions may produce large responses.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
