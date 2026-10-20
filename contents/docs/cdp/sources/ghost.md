---
title: Linking Ghost as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ghost
---

Enter your Ghost Admin API credentials to pull your Ghost publication data – members, posts, pages, newsletters, tiers, offers, tags, and users – into the PostHog data warehouse. Join membership and subscription data with Stripe payments and site analytics.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Ghost.
3. In Ghost, go to **Settings → Integrations → Custom integrations** and create a new custom integration. Copy the **Admin API key** and **API URL**.
4. Back in PostHog, enter the **Admin domain or API URL** (e.g., `https://example.ghost.io`) and **Admin API key** (in `id:secret` format), then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

> **Note:** Requires Ghost 6 or later.

Once the syncs are complete, you can start using Ghost data in PostHog.

## Available tables

| Table         | Description                                                                                      | Sync method  |
| ------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| `members`     | Members with subscription details, labels, newsletter subscriptions, and email engagement totals | Full refresh |
| `posts`       | Published, draft, and scheduled posts with authors, tags, and newsletter delivery statistics     | Full refresh |
| `pages`       | Static pages with content, authors, and tags                                                     | Full refresh |
| `tiers`       | Membership tiers with monthly prices, yearly prices, and benefits                                | Full refresh |
| `offers`      | Subscription discounts and redemption totals                                                     | Full refresh |
| `newsletters` | Newsletter settings and sender details                                                           | Full refresh |
| `tags`        | Content tags, including internal tags                                                            | Full refresh |
| `users`       | Staff users and author profiles                                                                  | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All Ghost tables are full refresh only. Incremental sync is unavailable until timestamp filters are verified against live Ghost accounts.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
