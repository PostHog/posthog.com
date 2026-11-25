---
title: Linking Listmonk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Listmonk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import InboundIpAddresses from "../_snippets/inbound-ip-addresses.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Listmonk connector syncs data from your self-hosted [Listmonk](https://listmonk.app) instance into the PostHog data warehouse. You can then analyze your subscribers, lists, campaigns, templates, bounces, and daily campaign analytics alongside your product data.

## Prerequisites

You need a Listmonk instance that PostHog can reach over the public internet:

- The instance URL must use `https`. PostHog Cloud does not accept an `http` URL, because the API token would cross the internet in clear text.
- The URL must not resolve to an internal or private IP address.

You also need a Listmonk API user. To create one:

1. In Listmonk, go to **Admin > Users** and create a new API user.
2. Give the user a role with these permissions:
   - `subscribers:get_all`
   - `lists:get_all`
   - `campaigns:get_all`
   - `templates:get`
   - `bounces:get`
   - `campaigns:get_analytics`
   - `subscribers:sql_query`, only if you want to sync the `subscribers` table incrementally
3. Copy the API token of the user.

The `lists:get_all` permission is always necessary, because PostHog reads your lists to check the credentials when you link the source. The `campaign_analytics` table also needs `campaigns:get_all`, because PostHog first gets the list of campaigns.

If you do not want to sync a different table, you can leave out its permission. Then deselect that table when you link the source.

<InboundIpAddresses />

## Adding a data source

<SourceSetupIntro />

When you link Listmonk, you need:

- **Instance URL** – the address of your Listmonk instance, such as `https://listmonk.example.com`. Do not add `/api` to the end.
- **API user** – the username of the API user that you created.
- **API token** – the token of that API user.

## Sync modes

<SyncModes />

The `subscribers` table supports incremental sync on the `updated_at` field. Incremental sync sends a SQL filter to the Listmonk API, so the API user needs the `subscribers:sql_query` permission.

All other tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `campaign_analytics` table holds the daily view, click, and bounce counts for each campaign. Each row has a `type` column with the value `views`, `clicks`, or `bounces`.

## Troubleshooting

- **Listmonk rejected the API user or token** – the API user or token is not correct. Create a new token under **Admin > Users** in Listmonk, then reconnect the source.
- **403 Forbidden on a table** – the role of the API user does not have the permission that the table needs. Grant the permission from the [prerequisites](#prerequisites), or deselect the table.
- **The instance URL resolves to an internal or private IP address** – PostHog cannot connect to a private network. Use the public URL of your instance.
- **The instance URL must use https** – change the URL to start with `https://`, then reconnect the source.

<TroubleshootingLink />
