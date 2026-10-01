---
title: Linking Skio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Skio
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Skio connector syncs your Shopify subscription data into PostHog: subscriptions, subscription lines, orders, customers, products, and more. Use it to analyze subscription revenue and churn alongside your product data.

Skio's data model mirrors Shopify's GraphQL objects: a Skio subscription is a Shopify `SubscriptionContract`, a Skio customer is a Shopify `Customer`, and each record's `platformId` column holds the Shopify GID (for example `gid://shopify/SubscriptionContract/123`), so you can join synced tables against Shopify data.

## Prerequisites

You need a Skio account and an API token. In your [Skio dashboard](https://dashboard.skio.com), click **API** in the left navigation bar, set a name for the token, and generate it.

## Adding a data source

<SourceSetupIntro />

When linking Skio, you'll need:

- **API token**: the token you generated under **API** in your Skio dashboard.

## Sync modes

<SyncModes />

All Skio tables support incremental sync on `updatedAt` (recommended) or `createdAt`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If syncs fail with `Invalid response from authorization hook`, the API token is invalid or has been revoked. Generate a new token under **API** in your Skio dashboard and update the source credentials.

<TroubleshootingLink />
