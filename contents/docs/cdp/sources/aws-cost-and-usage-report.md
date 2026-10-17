---
title: Linking AWS Cost and Usage Report as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: AwsCostAndUsageReport
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The AWS Cost and Usage Report connector syncs the line items of an AWS Data Exports export from your S3 bucket into the PostHog data warehouse, so you can analyze detailed cloud spend alongside your product data. It reads Cost and Usage Report 2.0 (CUR 2.0) and FOCUS exports.

## Prerequisites

You need a Data Exports export that AWS delivers to an S3 bucket you own:

1. In the AWS Billing console, go to **Data Exports** and create an export.
2. Choose CUR 2.0 or FOCUS as the export type.
3. Deliver it to an S3 bucket as **Parquet** or **gzip CSV**. Parquet keeps the column types of the export. For gzip CSV, PostHog reads the column types from the export's manifest.
4. Note the bucket name, the bucket region, the S3 path prefix (if you set one), and the export name.

AWS can take up to 24 hours to deliver the first export after you create it.

You also need an IAM user or role with:

- `s3:ListBucket` on the bucket
- `s3:GetObject` on the export's prefix

## Adding a data source

<SourceSetupIntro />

When linking AWS Cost and Usage Report, you'll need:

- **AWS access key ID** and **AWS secret access key** for the IAM user or role.
- **AWS session token** (optional). Only needed if you use temporary credentials.
- **Bucket region**: the region the bucket was created in, for example `us-east-1`.
- **S3 bucket**: the bucket name only, without `s3://` or a path.
- **S3 path prefix** (optional): the prefix set on the export. Leave it empty if the export has none.
- **Export name**: the name of the export in Data Exports.
- **First billing period to sync**: the earliest billing period to read, in `YYYY-MM` format.

### Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy like the one below. Replace `my-billing-exports` with your bucket name and `billing/cur` with your export's prefix:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-billing-exports"
    },
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-billing-exports/billing/cur/*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key**. You need both when you link the source in PostHog.

## Sync modes

<SyncModes />

The `cost_and_usage` table only supports full refresh.

AWS rewrites a whole billing period on each delivery, and keeps restating the previous month for up to two weeks after it ends. Line item IDs also change between deliveries, so there is no stable key to merge on. Because of this, every sync rebuilds the table from the latest delivery of each billing period. The table is partitioned by month on the `billing_period` column.

Each sync reads every billing period from the **First billing period to sync** onward, and each read counts toward your synced rows. Start at the earliest month you need.

PostHog only reads a billing period once AWS has written its manifest. AWS writes the manifest after every data file of a delivery has landed, so a billing period without one is still being delivered and is skipped until the next sync. If AWS is rewriting a billing period while PostHog reads it, the sync retries and reads the finished delivery.

## Data format

The columns of `cost_and_usage` follow the export's query, so a CUR 2.0 export and a FOCUS export have different columns.

PostHog adds a `billing_period` column with the first day of the billing period each row belongs to.

Nested columns, such as `product`, `resource_tags`, `cost_category`, and `discount`, are stored as JSON strings.

Columns from a gzip CSV export get the same names as the Parquet columns, so if you change an export's format, each measure keeps one column.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **AWS rejected the access key**: check that the access key ID and secret access key are correct, and that the key is still active in IAM.
- **AWS rejected the request signature**: re-enter the secret access key.
- **The AWS session token has expired** or **AWS rejected the session token**: reconnect with fresh temporary credentials, or leave the session token empty if you use long-lived keys.
- **These AWS credentials cannot read the export**: grant `s3:ListBucket` on the bucket and `s3:GetObject` on the export prefix to the IAM user or role.
- **The bucket does not exist**: check the bucket name. Enter the name only, without `s3://` or a path.
- **The bucket is in a different AWS region**: set **Bucket region** to the region the bucket was created in. When AWS reports the bucket's region, PostHog shows it in the error.
- **No billing periods were found for this export**: check the bucket, S3 path prefix, and export name. If you just created the export, wait for AWS to deliver it. This can take up to 24 hours.
- **No billing period under the export's `metadata/` folder has a manifest**: AWS hasn't finished delivering any billing period yet. Wait for the delivery to complete, then retry the sync.
- **The first billing period is not in YYYY-MM form**: enter it as a year and month, for example `2024-01`.

<TroubleshootingLink />
