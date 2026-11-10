---
title: Linking Azure Blob Storage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureBlob
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import ObjectStorageFiles from "../_snippets/object-storage-files.mdx"
import ObjectStorageSyncModes from "../_snippets/object-storage-sync-modes.mdx"
import ObjectStorageTroubleshooting from "../_snippets/object-storage-troubleshooting.mdx"
import SelfManagedMigration from "../_snippets/self-managed-migration.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Azure Blob Storage source imports CSV, JSON Lines, and Parquet files, and Delta Lake tables, from an Azure Blob Storage container into PostHog. PostHog keeps the tables up to date on the schedule you choose, so you can query your files alongside your product data.

<SelfManagedMigration />

## Prerequisites

You need:

- An Azure storage account with a blob container that contains your files. See the Azure guides to [create a storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal#create-a-storage-account) and [create a container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).
- The account key of the storage account. In the Azure portal, open the storage account and go to the **Access keys** page. See [view account access keys](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

## Adding a data source

<SourceSetupIntro />

When you link Azure Blob Storage, enter:

- **Files URL**: The URL of your files, such as `https://yourstorageaccount.blob.core.windows.net/your-container/orders/**/*.parquet`. To get the URL of a file, open the file in the storage browser of the Azure portal and copy its **URL** property.
- **Account key**: The account key of the storage account.

## Files and tables

<ObjectStorageFiles />

## Sync modes

<ObjectStorageSyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<ObjectStorageTroubleshooting />

<TroubleshootingLink />
