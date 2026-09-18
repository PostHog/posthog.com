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

The Cloudflare connector syncs your Cloudflare configuration, security, and usage data into PostHog.

<CalloutBox icon="IconFlask" title="Beta release" type="action">

The Cloudflare source is currently in **beta**. It syncs configuration data from Cloudflare's v4 REST API. High-volume analytics data from Cloudflare's GraphQL API is not yet supported.

</CalloutBox>

## Creating a Cloudflare API token

Before linking Cloudflare, create an API token with the required permissions:

1. Go to the [Cloudflare dashboard API tokens page](https://dash.cloudflare.com/profile/api-tokens).
2. Click **Create Token**.
3. Click **Create Custom Token** > **Get started**.
4. Give your token a descriptive name (e.g. "PostHog Data Warehouse").
5. Under **Permissions**, add the following with **Read** access:

| Resource                  | Permission | Description                                                                                     |
| ------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| Account Settings          | Read       | Required for accounts, billing, and audit data                                                  |
| Zone                      | Read       | Required for zones and zone-scoped configuration                                                |
| DNS                       | Read       | Required for dns_records and dns_analytics_report                                               |
| Firewall Services         | Read       | Required for firewall_rules, filters, rulesets, rate_limits, bot_management, page_shield tables |
| Logs                      | Read       | Required for audit_logs and logpush_jobs                                                        |
| Workers Routes            | Read       | Required for workers_routes and workers_scripts                                                 |
| Access: Apps and Policies | Read       | Required for access_apps, access_policies, access_groups, access_users                          |

Grant only the permissions for the tables you want to sync. Zones and accounts the token can't access are skipped.

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

PostHog validates your token against Cloudflare's `/user/tokens/verify` endpoint before starting the sync.

The data warehouse then starts syncing your Cloudflare data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Troubleshooting

If token validation fails when linking Cloudflare, you'll see one of the following messages:

- **"Couldn't reach Cloudflare to verify your API token. Please try again in a moment."** – Cloudflare's API is unreachable due to a network error, timeout, rate limiting (429), or a server error (5xx). Your token may be fine – wait a moment and try again.

- **"Invalid Cloudflare API token. Please check the token has read permissions and hasn't been revoked."** – Cloudflare rejected the token (401, 403, or the verification endpoint returned `success: false`). Verify your token has the [required permissions](#creating-a-cloudflare-api-token) and hasn't been revoked.

## Available tables

| Table         | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `accounts`    | Cloudflare accounts accessible by the API token                                           |
| `zones`       | Zones (domains) managed in those accounts                                                 |
| `dns_records` | DNS records for each zone, with a `_zone_id` field linking each record to its parent zone |

DNS records are synced from every zone the token can access. Each DNS record row includes a `_zone_id` field so you can join it back to the `zones` table.

## Sync modes

Most Cloudflare tables use **full refresh** syncing, re-importing all records on each sync.

The `audit_logs` table supports **incremental** syncing using the `when` timestamp field. On incremental syncs, only new audit events are fetched.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
