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

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Webflow connector pulls your Webflow site data – pages, CMS collections, ecommerce products and orders, users, and form submissions – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Webflow.
3. Next, you need a Webflow v2 API token and your Site ID. In Webflow, go to **Site settings** → **Apps & integrations** → **API access** and create a **Site API token**. Grant the read scopes for the resources you want to sync: `sites:read`, `cms:read` (collections and collection items), `ecommerce:read` (products and orders), `pages:read`, `users:read`, and `forms:read`. Copy the **Site ID** from the same page (or from your site's URL in the Designer).
4. Back in PostHog, enter the token in the `API token` field and the site identifier in the `Site ID` field, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Webflow data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `sites` | Metadata for the configured site | Full refresh |
| `collections` | CMS collection definitions | Full refresh |
| `pages` | Pages on the site | Full refresh |
| `products` | Ecommerce products | Full refresh |
| `orders` | Ecommerce orders | Full refresh |
| `users` | Site members / users | Full refresh |
| `forms` | Forms on the site | Full refresh |

In addition to the static tables above, each CMS collection on your site is discovered automatically and exposed as its own table (named `collection_<slug>`) containing that collection's items.

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Webflow tables are full refresh only. Webflow's v2 list endpoints do not expose a server-side timestamp range filter, so incremental sync is not currently supported.

## Configuration

<SourceParameters />
