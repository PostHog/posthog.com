---
title: Linking RudderStack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: RudderStack
---

import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The RudderStack connector syncs your customer data platform configuration into PostHog, including sources, destinations, connections, transformations, tracking plans, catalog data, audit logs, and Reverse ETL syncs. Use it to analyze your RudderStack workspace alongside your product data.

## Prerequisites

You need:

- A RudderStack account
- A workspace **Service Access Token** or **Personal Access Token** with read access to the resources you want to sync
- _Optional:_ An organization **Service Access Token** for audit logs (requires the RudderStack Enterprise plan)

You can create tokens in the RudderStack dashboard under **Settings → Access Management**.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to RudderStack.
3. Enter your **Workspace access token** – a workspace Service Access Token or Personal Access Token with read access to the selected resources.
4. _Optional:_ Enter an **Organization access token** if you want to sync audit logs. This requires an organization Service Access Token and the RudderStack Enterprise plan.
5. Select your **Region** – US or EU – to match where your RudderStack account is hosted.
6. Click **Next**.
7. Select the tables you want to sync and configure sync frequency as needed.
8. Click **Import**.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **sources** – Event sources configured in your RudderStack workspace.
- **destinations** – Destinations configured to receive RudderStack events.
- **connections** – Connections between event sources and destinations.
- **transformations** – Published transformations that modify events before delivery.
- **libraries** – Published code libraries used in RudderStack transformations.
- **tracking_plans** – Tracking plans that define expected event schemas.
- **catalog_events** – Event definitions in the RudderStack data catalog.
- **catalog_properties** – Property definitions and validation rules in the data catalog.
- **catalog_categories** – Categories used to organize catalog events.
- **audit_logs** – Organization audit logs. Requires an organization Service Access Token and the Enterprise plan. Not synced by default.
- **retl_connections** – Reverse ETL connections that send warehouse data to destinations. Not synced by default.
- **retl_syncs** – Reverse ETL sync history, status, and delivery metrics for each connection. Not synced by default.

## Token requirements

Most tables use the workspace access token. The audit_logs table requires a separate organization access token.

| Tables                                                                                                                                                               | Token                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| sources, destinations, connections, transformations, libraries, tracking_plans, catalog_events, catalog_properties, catalog_categories, retl_connections, retl_syncs | Workspace access token    |
| audit_logs                                                                                                                                                           | Organization access token |

If you don't provide an organization access token, audit logs show a permission error but all other tables sync normally.

## Sync modes

<SyncModes />

All RudderStack tables currently use **full refresh** sync only. Each sync reloads the entire table from the RudderStack API.

## Troubleshooting

<TroubleshootingLink />
