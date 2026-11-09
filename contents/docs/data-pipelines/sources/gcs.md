---
title: Linking Google Cloud Storage as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleCloudStorage
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import ObjectStorageFiles from "../_snippets/object-storage-files.mdx"
import ObjectStorageSyncModes from "../_snippets/object-storage-sync-modes.mdx"
import ObjectStorageTroubleshooting from "../_snippets/object-storage-troubleshooting.mdx"
import SelfManagedMigration from "../_snippets/self-managed-migration.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Google Cloud Storage (GCS) source imports CSV, JSON Lines, and Parquet files, and Delta Lake tables, from a GCS bucket into PostHog. PostHog keeps the tables up to date on the schedule you choose, so you can query your files alongside your product data.

<SelfManagedMigration />

## Prerequisites

You need:

- A GCS bucket that contains your files.
- An HMAC key for a service account that can read the bucket.

### Create a service account

1. Go to the [service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) in the Google Cloud console and click **Create service account**.
2. Enter the account name and ID, then click **Create and continue**.
3. Give the account the **Storage Object Viewer** role.
4. Click **Done**.

### Create an HMAC key

1. Go to the [Cloud Storage settings page](https://console.cloud.google.com/storage/settings) and select the **Interoperability** tab.
2. Click **Create a key for a service account**.
3. Select the service account that you created and click **Create key**.
4. Copy the **Access key** and the **Secret**. Google Cloud shows the secret only once.

![Access keys](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_17_at_12_57_42_2x_ace42b1d0e.png)

## Adding a data source

<SourceSetupIntro />

When you link GCS, enter:

- **Files URL**: The URL of your files. You can use a `gs://` URI, such as `gs://your-bucket/orders/`, or a URL such as `https://storage.googleapis.com/your-bucket/orders/**/*.parquet`.
- **HMAC access key** and **HMAC secret**: The HMAC key that you created.

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
