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
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. It has not been tested against a live Azure Cosmos DB account. Please [share feedback](https://app.posthog.com/home#panel=support%3Afeedback%3A%3Alow%3Atrue) if you run into issues.

The Azure Cosmos DB connector syncs containers from a Cosmos DB for NoSQL database into PostHog. Each container becomes a table in the data warehouse, and incremental syncs use the `_ts` system property that Cosmos stamps on every document write.

Only the **NoSQL API** is supported. The MongoDB, Cassandra, Gremlin, and Table APIs are not supported.

## Prerequisites

You need:

- An Azure Cosmos DB for NoSQL account.
- The **account endpoint** – find it on the account's **Overview** page in the Azure portal. It looks like `https://<account>.documents.azure.com`.
- An **account key** (primary or secondary, read-only or read-write) – find it on the account's **Keys** page in the Azure portal.
- The **database name** you want to sync.
- The account must allow key-based authentication and PostHog's IP addresses through any configured firewall.

## Adding a data source

<SourceSetupIntro />

When linking Azure Cosmos DB, enter the following:

- **Account endpoint** – The HTTPS endpoint of your Cosmos DB account, e.g. `https://<account>.documents.azure.com`.
- **Account key** – A primary or secondary key from the account's **Keys** page. Both read-only and read-write keys work.
- **Database** – The name of the database to sync.

After connecting, select the containers you want to sync. Each container becomes a table in PostHog.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Each selected container is synced as its own table. The table contains all document fields plus a `_partition_key` column (see [Primary keys](#primary-keys) below).

## Sync behavior

Azure Cosmos DB containers support **incremental** and **full refresh** sync modes. Tables use **merge** mode — append mode is not available because the incremental overlap window would create duplicates.

### Incremental sync

Incremental syncs use the `_ts` field (an epoch-seconds timestamp Cosmos writes on every document create or update) as the cursor. Each run reads documents where `_ts` is greater than or equal to a floor value, which is the previous run's start time minus five minutes. This overlap ensures late-arriving writes are not missed, and merge deduplication removes any repeated rows.

### Full refresh

A full refresh reads every document in the container without a timestamp filter. Use this when you need to reflect deletions or want a clean baseline.

## Primary keys

Cosmos DB only guarantees that `id` is unique within a single logical partition, not across the entire container. To produce a table-wide unique key, PostHog adds a `_partition_key` column to every synced row. The primary key for each table is the combination of `id` and `_partition_key`.

The `_partition_key` value is the JSON encoding of the document's partition key:

| Partition key value  | `_partition_key` column         |
| -------------------- | ------------------------------- |
| String `"us-west"`   | `us-west`                       |
| Number `1`           | `1` (JSON-encoded)              |
| Boolean `true`       | `true` (JSON-encoded)           |
| Missing or undefined | `""` (empty string)             |
| Hierarchical key     | JSON array of the encoded parts |

String `"1"` and number `1` stay distinct because the number is JSON-encoded while the string is stored as-is.

## Troubleshooting

### 401 Unauthorized

The account key is invalid or has been rotated. Copy a current primary or secondary key from the **Keys** page in the Azure portal and update the source connection in PostHog.

### 403 Forbidden

A 403 typically means one of:

- The account's **firewall** is blocking PostHog's IP addresses. Add PostHog's IPs to the account's allowed list, or set **Public network access** to **All networks**.
- **Public network access** is turned off on the account.
- **Key-based authentication** is disabled on the account. Re-enable it in the account's **Keys** settings.

The error message from Cosmos DB is included in the sync failure details and usually points to the specific cause.

### 404 Not Found

The database or container no longer exists in the Cosmos DB account. Check the source settings and the table list in PostHog.

### Invalid account key

If the sync fails with "account key is not valid base64," the key was not copied correctly. Copy the full primary or secondary key from the **Keys** page and update the source.

<TroubleshootingLink />
