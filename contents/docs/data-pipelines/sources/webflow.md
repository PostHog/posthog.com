---
title: Linking Webflow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Webflow
---

The Webflow connector pulls your Webflow site data – pages, CMS collections, ecommerce products and orders, users, form submissions, and Analyze reports – into the PostHog data warehouse.

The Analyze tables require the Webflow Analyze add-on on your workspace and the `sites:read` scope on your API token. Without the add-on, leave these tables disabled. Forms and form submissions require `forms:read`.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Webflow.
3. Next, you need a Webflow v2 API token and your Site ID. In Webflow, go to **Site settings** → **Apps & integrations** → **API access** and create a **Site API token**. Grant the read scopes for the resources you want to sync: `sites:read`, `cms:read` (collections and collection items), `ecommerce:read` (products and orders), `pages:read`, `users:read`, and `forms:read`. Copy the **Site ID** from the same page (or from your site's URL in the Designer).
4. Back in PostHog, enter the token in the `API token` field and the site identifier in the `Site ID` field, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Webflow data in PostHog.

## Sync behavior

Webflow's resource tables, including `form_submissions`, support full refresh only. Each sync reloads all records because Webflow's list endpoints do not support timestamp range filters. Form submissions contain the data visitors entered, while `forms` contains form definitions.

Each CMS collection on your site is discovered automatically and exposed as its own table (named `collection_<slug>`) containing that collection's items. These tables also use full refresh.

The `analyze_traffic`, `analyze_top_pages`, and `analyze_time_on_page` tables support incremental sync using `timestamp`. The initial sync starts on April 9, 2025, the earliest supported date. Subsequent incremental syncs fetch the last synced day again to capture late changes, then continue through the remaining complete UTC days. There is no wider automatic lookback for corrections to earlier days. Use a full refresh to reload earlier history.

### Analyze report limitations

- Reports include complete UTC days only. The current UTC day's data is excluded until that day ends.
- `analyze_top_pages` fetches up to 250 pages per day, ranked by sessions. It is not a complete list of every page visited.
- `analyze_time_on_page` contains daily averages across the whole site, not averages for individual pages. The averages are measured in seconds per session, user, and page view.
- `analyze_traffic` contains daily session, user, and page view counts. These are aggregated reports, not individual visitor events.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### 403 Forbidden error

Check that your API token has the read scope for the table you selected. For Analyze tables, also check that your Webflow workspace has the Analyze add-on. Grant the required scope and reconnect, or disable tables you cannot access.

### 409 Conflict error

Webflow returns a `409 Conflict` error in two scenarios:

- **Products and Orders tables** – The connected site doesn't have ecommerce enabled. Enable ecommerce in Webflow or remove the `products` and `orders` tables from the sync.
- **Other resources** – The site has unpublished changes. Publish your Webflow site, then try the sync again.

Fix the underlying issue in Webflow and re-run the sync.
