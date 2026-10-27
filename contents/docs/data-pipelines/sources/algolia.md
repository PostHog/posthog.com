---
title: Linking Algolia as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Algolia
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Algolia connector syncs your Algolia search and operational data – index records, synonyms, query rules, indices, API logs, connector runs, and Query Suggestions configurations – into PostHog, so you can analyze your search configuration and operations alongside your product data.

## Prerequisites

You need an Algolia account with access to your Application ID and the ability to create an API key with the ACLs for the data you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Algolia, you'll need:

- **Application ID** – found in your [Algolia dashboard](https://dashboard.algolia.com/account/api-keys/all) under your account API keys.
- **API key** – create one in the same [Algolia dashboard](https://dashboard.algolia.com/account/api-keys/all). Grant the ACLs for the data you want to sync: `browse` for index records, `settings` for synonyms and query rules, `listIndexes` for the list of indices, `logs` for API logs, and `addObject`, `deleteIndex`, and `editSettings` together for Ingestion API tables (connector runs and events).
- **Index name** – the name of the Algolia index you want to sync.

## Sync modes

<SyncModes />

Most Algolia tables are full refresh because their endpoints do not expose an updated-since filter. However, some tables support incremental sync:

- **Analytics time series tables** (`conversion_rate`, `add_to_cart_rate`, `purchase_rate`, `revenue`, `click_through_rate`, `average_click_position`, `users_count`) – Incremental on `date`
- **ingestion_runs** – Incremental on `createdAt`
- **ingestion_run_events** – Incremental on `publishedAt`

Algolia retains API logs for only seven days and Query Suggestions logs only for the latest build of each index, so those tables always reflect recent data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, check that your Application ID and API key are correct in the Algolia dashboard.
- If a table fails to sync, make sure your API key has the ACL required for it: `browse` for records, `settings` for synonyms and query rules, `listIndexes` for indices, `logs` for API logs, and `addObject`, `deleteIndex`, and `editSettings` together for Ingestion API tables.

<TroubleshootingLink />
