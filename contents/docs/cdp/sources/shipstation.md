---
title: Linking ShipStation as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ShipStation
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The ShipStation source is currently in **alpha**. The core sync logic is stable, but the connector hasn't been battle-tested at scale yet. If you run into issues, please let us know.

</CalloutBox>

The ShipStation connector syncs your order, shipment, fulfillment, product, customer, store, and warehouse data into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to ShipStation.

3. You need an API key and API secret from ShipStation. In your ShipStation dashboard, go to **Settings** > **Account** > **API Settings** (or go directly to [API Settings](https://ship.shipstation.com/settings/api-settings)). Copy the **API Key** and **API Secret** values.

> **Note:** API access requires a ShipStation plan tier that includes it. If you don't see the API Settings page, your plan may not support API access.

4. Back in PostHog, paste your **API key** and **API secret** into the corresponding fields and click **Next**.

5. Set up the schemas you want to sync and choose the sync method and frequency for each. Click **Import** when done.

Once the syncs complete, you can query your ShipStation data in PostHog.

## Available tables

| Table          | Description           | Sync method  |
| -------------- | --------------------- | ------------ |
| `orders`       | Order data            | Incremental  |
| `shipments`    | Shipment data         | Incremental  |
| `fulfillments` | Fulfillment data      | Incremental  |
| `products`     | Product catalog       | Full refresh |
| `customers`    | Customer data         | Full refresh |
| `stores`       | Store information     | Full refresh |
| `warehouses`   | Warehouse information | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

For incremental tables, you can choose which cursor field to use:

- **orders** - `modifyDate` (recommended, captures updates) or `createDate`
- **shipments** - `createDate`
- **fulfillments** - `createDate`

## Configuration

<SourceParameters />

## Timestamps and timezone

ShipStation's v1 API returns all DateTime values in **US Pacific time**, not UTC. PostHog handles this conversion automatically during sync, but be aware of it when querying raw timestamp fields.

## Troubleshooting

### Authentication errors

If you see an "authentication failed" error, double-check your API key and API secret in [ShipStation API Settings](https://ship.shipstation.com/settings/api-settings). Regenerating the credentials and re-entering them in PostHog can resolve stale key issues.

### Access denied errors

A "denied access" error typically means your ShipStation plan doesn't include API access. Check your plan tier or contact ShipStation support.

### Rate limits

ShipStation enforces a rate limit of 40 requests per minute. PostHog automatically retries rate-limited requests with backoff, so syncs may slow down but should complete without intervention.
