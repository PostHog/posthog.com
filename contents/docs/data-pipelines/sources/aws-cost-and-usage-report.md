---
title: Linking AWS Cost and Usage Report as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsCostAndUsageReport
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The AWS Cost and Usage Report connector syncs line items from an AWS Data Exports export into the [PostHog Data Warehouse](/docs/data-warehouse). Connect a Cost and Usage Report 2.0 (CUR 2.0) or FOCUS export to analyze cloud costs alongside your product data.

## Prerequisites

You need:

- An AWS Data Exports export delivered to an S3 bucket as Parquet or compressed CSV (`.csv.gz`).
- The bucket name and region, the export name, and the S3 path prefix configured on the export.
- AWS credentials with `s3:ListBucket` on the bucket and `s3:GetObject` on the export's prefix, including both its `data/` and `metadata/` directories.
- The first billing month you want to sync, in `YYYY-MM` format.

PostHog reads the export files directly from S3. For IAM user credentials, see AWS's [access key guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). Temporary credentials also require a session token, and you must replace them when they expire.

## Adding a data source

If you don't already have an export, follow AWS's [standard export setup guide](https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-standard.html):

1. Open the AWS **Billing and Cost Management** console and go to **Data Exports**.
2. Click **Create export**, select **Standard data export**, and enter an **Export name**.
3. Under **Data table configurations**, select CUR 2.0 or FOCUS with AWS columns. Choose the columns you need. For CUR 2.0, also choose the time granularity and whether to include resource IDs.
4. Under the delivery options, choose **Parquet** or compressed CSV (`gzip – text/csv`). Both **Overwrite existing data export file** and **Create new data export file** are supported.
5. Under **Data export storage settings**, configure the destination S3 bucket and path prefix. Record the bucket's region, the prefix, and the export name separately.
6. Click **Create** and wait for the first delivery. AWS can take up to 24 hours to deliver the first export.

Grant your IAM user or role the S3 read permissions listed in [Prerequisites](#prerequisites), then connect the export in PostHog:

<SourceSetupIntro />

Select **AWS Cost and Usage Report** when choosing the source. Use **Full refresh** as the sync method.

## Sync modes

This source supports **Full refresh** only. Each sync rebuilds the table using the latest complete delivery of every billing period from your configured first month onward.

AWS can update the current billing period and restate the previous month for up to two weeks after it ends. Line item IDs are only unique within a delivery and can change between deliveries, so the connector has no stable primary key for incremental or append-only syncs.

Every sync reads all months in range again, and those rows count toward your synced rows each time. Choose the earliest billing month you need and a sync frequency that fits your reporting needs. Keeping older deliveries with AWS's **Create new data export file** option does not import every version: PostHog uses the latest delivery for each month. See AWS's [export delivery documentation](https://docs.aws.amazon.com/cur/latest/userguide/dataexports-export-delivery.html) for the directory layout and refresh behavior.

## Configuration

<SourceParameters />

When entering the configuration:

- **AWS access key ID** and **AWS secret access key**: Enter the credentials for the IAM user or role that can read the export.
- **AWS session token**: Required for temporary credentials. Leave it empty for long-lived access keys.
- **Bucket region**: Enter the AWS region code for the bucket, for example `us-east-1`.
- **S3 bucket**: Enter only the bucket name, without `s3://` or a path.
- **S3 path prefix**: Enter the prefix set on the export, without the export name or the `data/` directory. Leave it empty if the export has no prefix.
- **Export name**: Enter the name set in AWS Data Exports.
- **First billing period to sync**: Enter the earliest month to include, for example `2026-01`. Older billing periods are excluded.

For example, if AWS writes data to `s3://my-billing-exports/billing/cur/my-cur-export/data/BILLING_PERIOD=2026-01/`, enter `my-billing-exports` as the bucket, `billing/cur` as the prefix, and `my-cur-export` as the export name.

## Supported tables

<SourceTables />

Columns follow your export's query, so CUR 2.0 and FOCUS exports have different columns. The connector adds a `billing_period` column with the first day of the month from the export's billing-period partition. Parquet preserves the export's column types. Compressed CSV uses the types declared in the manifest. Nested Parquet values, such as resource tags and product attributes, are stored as JSON strings.

## Troubleshooting

- **Access denied (`AccessDenied` or `HTTP 403`)**: Grant `s3:ListBucket` on the bucket and `s3:GetObject` on the export prefix to the IAM user or role. Include both data files and manifests in the permitted prefix.
- **Invalid credentials**: For `InvalidAccessKeyId` or `HTTP 401`, check that the access key is active and the ID and secret match. For `SignatureDoesNotMatch`, re-enter the secret access key. For `ExpiredToken`, `TokenRefreshRequired`, or `InvalidToken`, replace temporary credentials and their session token, or leave the token empty for long-lived keys.
- **Wrong bucket or region**: For `NoSuchBucket`, check the bucket name. For `PermanentRedirect`, `AuthorizationHeaderMalformed`, or `IllegalLocationConstraintException`, set **Bucket region** to the region where the bucket was created.
- **No billing periods found**: Check the bucket, prefix, and export name. For a `NoBillingPeriods` sync error, also check that **First billing period to sync** does not exclude all delivered months. A new export can take up to 24 hours to arrive.
- **No manifest (`NoManifest`) or missing months**: AWS only delivers a manifest after all data files for that billing period arrive. PostHog skips periods without a manifest. Check the export's delivery in S3 and retry after it completes.
- **`DeliveryInProgress` or `ManifestUnreadable`**: PostHog retries these errors. AWS may be rewriting a billing period, or its manifest cannot be read or lists no supported data files. The next attempt reads the completed delivery. If the error persists, check that the export delivers Parquet or compressed CSV (`.csv.gz`) and that only AWS writes to its prefix.
- **`UnsupportedCompression`**: A Parquet file uses Brotli compression, which this connector cannot read. Check that only AWS writes to the export prefix, then retry.
- **CSV values become null**: The connector sets cells to null when they do not match the type declared in the manifest and reports a warning. Compare the affected file with its manifest's column types.

<TroubleshootingLink />
