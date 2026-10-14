---
title: Linking Ticketmaster as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ticketmaster
---

Sync public events, attractions, and venues from the [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) into the PostHog data warehouse.

This source uses the public Discovery API v2. Private data like ticket orders, sales transactions, and attendee information is not available through this source.

## Prerequisites

You need an API key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/). The key must have access to the Discovery API.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Ticketmaster.
3. Enter your **API key** from the Ticketmaster Developer Portal.
4. Enter a **search keyword**. This keyword filters which events, attractions, and venues are synced. It applies independently to all three tables.
5. Click **Next**.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

## Available tables

| Table         | Description                                                  | Sync method  |
| ------------- | ------------------------------------------------------------ | ------------ |
| `events`      | Public events that match the configured search keyword       | Full refresh |
| `attractions` | Artists, teams, and other attractions that match the keyword | Full refresh |
| `venues`      | Event venues that match the keyword                          | Full refresh |

All tables use **full refresh** sync only – the entire dataset is reloaded on every sync.

## Limitations

- **1,000 result limit** – Each table can return a maximum of 1,000 results per sync. If a search keyword returns more than 1,000 results, the sync fails. Use a more specific keyword to narrow results.

- **Public data only** – This source uses the public Discovery API. Private ticket orders, sales transactions, and attendee data are not available.

- **API rate limits** – Ticketmaster's default quota is 5,000 API calls per day and 5 requests per second. PostHog automatically retries throttled requests, but large syncs may be affected.

- **No incremental sync** – All tables use full refresh. There is no incremental sync option.

## Troubleshooting

### "Ticketmaster rejected your API key"

Your API key is invalid. Copy a valid key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/).

### "Ticketmaster denied access"

Your API key doesn't have access to the Discovery API. Check your key permissions in the Ticketmaster Developer Portal.

### "Ticketmaster search exceeds 1,000 results"

Your search keyword is too broad. Use a more specific keyword and start a new sync.

### "Enter a search keyword to limit the Ticketmaster results"

The keyword field is required. Enter a keyword to filter the results from Ticketmaster.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
