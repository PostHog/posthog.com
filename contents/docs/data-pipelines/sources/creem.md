---
title: Linking Creem as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Creem
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Creem connector syncs products, customers, subscriptions, transactions, discounts, licenses, affiliates, affiliate invites, splits, meters, usage events, and credit accounts into the PostHog data warehouse, so you can analyze your billing and payment data alongside your product data.

## Prerequisites

An API key that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Connect your Creem account to sync your billing data. You can find your API key in the Creem dashboard under **Developers** > **API Keys**.

You'll be asked for:

- **API key** – your Creem API key.

- **Environment** – choose between Production (api.creem.io) and Test (test-api.creem.io). Make sure to use a key that matches your environment: live keys only work with Production, and test keys only work with Test.

## Sync modes

<SyncModes />

All Creem tables sync as full refresh. Each sync replaces the contents of the table. Creem's API doesn't expose an updated-since filter, so incremental sync isn't available.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `licenses` table fans out over the `customers` table because Creem has no store-wide license listing. Each customer's licenses are fetched individually.

## Troubleshooting

- If the connection fails with an authorization error, check that you copied the whole key and that you chose the environment it belongs to. A test mode key works only with Test, and a live key only with Production.

- If a table syncs no rows, the credential may not have access to that data. Check your API key permissions.

<TroubleshootingLink />
