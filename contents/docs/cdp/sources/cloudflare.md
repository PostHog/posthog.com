---
title: Linking Cloudflare as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Cloudflare
---

The Cloudflare connector syncs your Cloudflare configuration data into PostHog, including accounts, zones, and DNS records.

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

The Cloudflare source is currently in alpha. It syncs configuration data from Cloudflare's v4 REST API. High-volume analytics data from Cloudflare's GraphQL API is not yet supported.

</CalloutBox>

## Creating a Cloudflare API token

Before linking Cloudflare, create an API token with the required permissions:

1. Go to the [Cloudflare dashboard API tokens page](https://dash.cloudflare.com/profile/api-tokens).
2. Click **Create Token**.
3. Click **Create Custom Token** > **Get started**.
4. Give your token a descriptive name (e.g. "PostHog Data Warehouse").
5. Under **Permissions**, add the following with **Read** access:

| Resource         | Permission |
| ---------------- | ---------- |
| Account Settings | Read       |
| Zone             | Read       |
| DNS              | Read       |

6. Under **Account Resources**, select the accounts you want to sync.
7. Under **Zone Resources**, select the zones you want to sync. Choose **All zones** to sync DNS records from every zone.
8. Click **Continue to summary**, then **Create Token**.
9. Copy the token – you won't be able to see it again.

## Linking Cloudflare

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **New source** and select Cloudflare by clicking **Link**.
3. Paste your Cloudflare API token.
4. _Optional:_ Add a prefix to your table names.
5. Click **Next**.
6. Select the tables you want to import.
7. Click **Import**.

PostHog validates your token against Cloudflare's `/user/tokens/verify` endpoint before starting the sync. If validation fails, check that your token has the required permissions listed above.

The data warehouse then starts syncing your Cloudflare data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

| Table         | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `accounts`    | Cloudflare accounts accessible by the API token                                           |
| `zones`       | Zones (domains) managed in those accounts                                                 |
| `dns_records` | DNS records for each zone, with a `_zone_id` field linking each record to its parent zone |

DNS records are synced from every zone the token can access. Each DNS record row includes a `_zone_id` field so you can join it back to the `zones` table.

## Sync modes

Cloudflare tables support **full refresh** syncing only. Each sync re-imports all records from Cloudflare.

Incremental and append-only syncs aren't available because Cloudflare's v4 REST API doesn't expose updated-since filters for these resources. Since these are small configuration tables, full refresh syncs complete quickly.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
