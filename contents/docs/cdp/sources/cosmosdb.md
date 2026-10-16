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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import InboundIpAddresses from "../\_snippets/inbound-ip-addresses.mdx"

<CalloutBox icon="IconInfo" title="Alpha" type="fyi">

The Azure Cosmos DB source is in alpha. [Tell us](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue) how it works for you, and report anything that looks wrong.

</CalloutBox>

The Azure Cosmos DB connector syncs the containers of one Cosmos DB for NoSQL database into PostHog. Each container becomes a table, so you can join your application documents with your product data.

## Prerequisites

- An Azure Cosmos DB account that uses the **NoSQL** API. The MongoDB, Cassandra, Gremlin, and Table APIs are not supported.
- Access to the account's **Keys** page in the Azure portal.
- Key-based authentication turned on. Accounts that allow only Microsoft Entra ID sign-in can't connect.
- Public network access turned on. Accounts reachable only through private endpoints aren't supported. If the account uses a firewall, allow the IP addresses listed below.

## Adding a data source

<SourceSetupIntro />

When linking Azure Cosmos DB, you'll need:

- **Account endpoint** – the URI on the account's **Overview** or **Keys** page, for example `https://<account>.documents.azure.com`.
- **Account key** – the primary or secondary key from the **Keys** page. A read-only key is enough.
- **Database** – the name of the database whose containers you want to sync.

PostHog lists every container in the database. Pick the ones you want to sync.

## Sync modes

<SyncModes />

Every container supports incremental sync on `_ts`, the system property Cosmos DB updates each time a document is written. Each incremental run reads the documents written since five minutes before the previous run started, so a document written during a sync is read by the next one. Append only isn't available: each run reads a short overlap again, and only merge removes the duplicates.

Rows are keyed on the document `id` together with `_partition_key`, a column PostHog adds with the document's partition key value. Cosmos DB only guarantees that `id` is unique within one logical partition, so the pair keeps rows from different partitions apart. `_partition_key` holds the value as JSON, so a string key appears in quotes, and it's empty when a document has no partition key value. For hierarchical partition keys, it holds a JSON list with one entry per level.

Deleted documents stay in PostHog after an incremental sync, because Cosmos DB does not report deletes through the query API. Run a full refresh to remove them.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **The account key is rejected** – the key was regenerated or copied incompletely. Copy it again from the **Keys** page and update the source.
- **No database with that name** – database names are case-sensitive. Check the name in Data Explorer.
- **Azure Cosmos DB refused the request** – the account's firewall blocks PostHog, public network access is off, or key-based authentication is turned off. Allow the IP addresses below, or change the account's network and key settings.
- **Throttling** – syncs use the account's request units. Large first syncs can hit request unit limits. PostHog waits and retries, but a heavily loaded account can make a sync slow or fail. Raise throughput during the first sync, or sync large containers one at a time.

<TroubleshootingLink />

<InboundIpAddresses />
