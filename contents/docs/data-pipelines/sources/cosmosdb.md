---
title: Linking Azure Cosmos DB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CosmosDB
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Azure Cosmos DB connector syncs containers from a Cosmos DB for NoSQL database into the PostHog [Data Warehouse](/docs/data-warehouse). Each container becomes a table, so you can query your documents alongside your product data.

## Prerequisites

You need an Azure Cosmos DB for NoSQL account, its account endpoint and account key, and the name of the database you want to sync. Only the NoSQL API is supported.

The connector uses key-based authentication. A read-only or read-write account key works. To find your keys, open your account in the Azure portal and select **Keys** from the navigation menu. See Microsoft's [account key guide](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-rotate-keys) for details.

PostHog must be able to reach the account over HTTPS. Keep public network access and key-based authentication enabled. If you restrict network access, add [PostHog's IP addresses](/docs/data-pipelines/sources#inbound-ip-addresses) to the account's firewall rules. Microsoft's [IP firewall guide](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-configure-firewall) explains how to configure these rules under **Networking** in the Azure portal.

## Adding a data source

<SourceSetupIntro />

When linking Azure Cosmos DB, enter:

- **Account endpoint**: The account's HTTPS URL, for example `https://<account>.documents.azure.com`. Don't include a database path or query string.
- **Account key**: A current primary or secondary account key from the account's **Keys** page. Copy the key itself, rather than a connection string.
- **Database**: The name of the database containing the containers you want to sync. Match the name's capitalization.

PostHog checks the connection by listing the database's containers. Select the containers you want to import, then choose the sync method and frequency for each table.

## Sync modes

Each container supports incremental and full refresh syncs. Append only is unavailable because incremental syncs read overlapping data and need to merge repeated rows.

- **Incremental**: The first sync reads all documents. Later syncs use `_ts`, the timestamp in epoch seconds that Cosmos DB updates on each document write. Each completed run sets the next run's starting point to its own start time minus five minutes. The next run reads documents with `_ts` greater than or equal to that point, then merges repeated rows using the primary key.
- **Full refresh**: Each sync reads the whole container. Use this mode when you need deletions reflected in PostHog; incremental syncs don't capture deleted documents.

See [sync methods](/docs/data-pipelines/sources#sync-methods) for more information.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Each selected container becomes a table with its document fields and an added `_partition_key` column. The primary key combines `id` and `_partition_key`, so documents with the same `id` in different logical partitions remain distinct.

## Troubleshooting

- **Invalid account endpoint**: Use an HTTPS account URL without a database path, query string, or fragment, for example `https://<account>.documents.azure.com`.
- **401 or rejected account key**: Copy a current primary or secondary key from the account's **Keys** page and reconnect. A rotated key no longer works.
- **Account key is not valid base64**: Copy the full account key, rather than a connection string, and reconnect.
- **403 or blocked by firewall settings**: Check that public network access is enabled, the firewall permits PostHog's IP addresses, and key-based authentication is enabled. After changing firewall rules, Microsoft notes that changes can take up to 15 minutes to apply.
- **404 or database not found**: Check the database name and its capitalization in the source settings. For a failing table sync, also check that the container still exists in that account and database.
- **Deleted documents still appear**: Incremental syncs read existing documents by `_ts` and don't capture deletions. Use a full refresh to reload the container's current contents.

<TroubleshootingLink />
