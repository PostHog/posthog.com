---
title: Linking Google Search Console as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleSearchConsole
---

Connect a verified Google Search Console property to sync daily Search Analytics performance data (clicks, impressions, CTR, average position). Requires a Google account with read access to the property.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Google Search Console.
3. Connect your `Google Search Console account` by signing in with a Google account that has read access to the property. Then enter the `Property URL` — use the URL prefix format (for example `https://example.com/`) or the `sc-domain:` prefix for domain properties (for example `sc-domain:example.com`). PostHog automatically handles common variations like percent-encoded URLs, missing trailing slashes, and pasted Search Console UI URLs.
4. Back in PostHog, confirm the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Google Search Console data in PostHog.

## Available tables

| Table                                   | Description                                                                                                      | Sync method |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `search_analytics_by_date`              | Daily totals for clicks, impressions, CTR, and average position                                                  | Incremental |
| `search_analytics_by_query`             | Daily performance broken out by search query (keyword)                                                           | Incremental |
| `search_analytics_by_page`              | Daily performance broken out by landing page URL                                                                 | Incremental |
| `search_analytics_by_country`           | Daily performance broken out by country (ISO 3166-1 alpha-3)                                                     | Incremental |
| `search_analytics_by_device`            | Daily performance broken out by device (DESKTOP, MOBILE, TABLET)                                                 | Incremental |
| `search_analytics_by_query_page`        | Daily performance broken out by both query and landing page                                                      | Incremental |
| `search_analytics_by_search_appearance` | Daily performance broken out by Google search result presentation type (e.g. RICH_RESULT, REVIEW_SNIPPET, VIDEO) | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Google's Search Analytics API caps results at roughly 50,000 rows per property, date, and dimension set. When the cap is hit, rows are sorted by clicks descending and the long tail is silently dropped. Tables with more dimensions (such as `search_analytics_by_query_page`) hit this cap fastest, so high-traffic properties may lose long-tail queries and pages. For full-fidelity data, use the per-query and per-page tables together, or rely on Google's BigQuery bulk export.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
