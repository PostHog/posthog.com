---
title: Uploading files to the data warehouse
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

You can upload a CSV, JSON, or Parquet file to the data warehouse. You don't need a bucket of your own. Each upload creates a file upload source with one table, which you can query with SQL like any other table.

Use a file upload for one-off data such as spreadsheet exports, lookup tables, or static datasets. For files larger than 50MB, or for data that changes regularly, put the files in a bucket and connect it with the [Amazon S3](/docs/data-pipelines/sources/s3), [Google Cloud Storage](/docs/data-pipelines/sources/gcs), [Azure Blob Storage](/docs/data-pipelines/sources/azure-blob), or [Cloudflare R2](/docs/data-pipelines/sources/r2) source.

Rows that PostHog imports from an uploaded file count toward your data warehouse rows synced.

<CalloutBox icon="IconInfo" title="Tables you uploaded before" type="fyi">

PostHog moved each table that you made from an uploaded file into a file upload source. The table keeps its name, so your queries continue to work. The table continues to read its current file at no charge until you [replace the file](#replace-the-file). When you replace the file, PostHog imports the new file, and the rows count toward your data warehouse rows synced.

</CalloutBox>

## Supported file formats

### CSV

- The first row must contain the column names.
- Put values that contain commas in double quotes.

### JSON

- The file must be newline-delimited JSON (NDJSON), with one JSON object on each line. A single JSON array isn't supported.
- PostHog accepts `.json` and `.ndjson` files.

### Parquet

PostHog supports standard Apache Parquet files.

## Upload a file

1. Go to the [Sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section.
2. Click **+ New source** and select **File upload**.
3. Select the **File format**: **CSV**, **JSON**, or **Parquet**.
4. Select the file from your computer. The maximum file size is **50MB**.
5. Enter a **Table name**. You use this name in SQL queries. Use only letters, numbers, and underscores, and start with a letter or an underscore.
6. Click **Upload and create table**.

PostHog uploads the file, detects the columns, and imports the rows into the table.

## Query your data

When the import is complete, query the table with SQL:

```sql
SELECT * FROM your_table_name
```

See [querying the data warehouse](/docs/data-warehouse/query) for more about SQL queries.

## Replace the file

A file upload source has no sync schedule. To update the data, upload a new file:

1. Go to the [Sources tab](https://app.posthog.com/data-management/sources) and open the file upload source.
2. In the **Schemas** tab, click **Replace file**.
3. Select the new file and confirm.

PostHog replaces all the rows in the table with the rows from the new file. The table keeps its name, so your queries continue to work.

## Joining uploaded data to persons

When your uploaded data relates to people in PostHog, you can [create a join](/docs/data-warehouse/join) to connect it with the `persons` table. This makes your uploaded data act like extended person properties.

For example, if your CSV has an `email` column:

1. Go to the data warehouse tab, find the `persons` table, click the three dots, and click **Add join**.
2. Set **Source Table Key** to `properties.email`.
3. Set **Joining Table** to your uploaded table and **Joining Table Key** to `email`.
4. Click **Save**.

You can then query across both tables:

```sql
SELECT your_table.column_name
FROM persons
WHERE properties.email = 'user@example.com'
```

## Limitations

- **50MB maximum file size.** For larger files, put the files in a bucket and connect it with a storage source, such as [Amazon S3](/docs/data-pipelines/sources/s3).
- **No sync schedule.** PostHog imports the data only when you upload a file. To update the data, [replace the file](#replace-the-file).
- **Spreadsheet files aren't supported.** Export Excel or Numbers files to CSV, JSON, or Parquet before you upload them.

## Troubleshooting

- **The file doesn't parse:** Make sure the file is valid. For CSV files, make sure the first row contains the column names. For JSON files, make sure each line holds one JSON object, not a single JSON array.
- **The file is too large:** The upload limit is 50MB. For larger datasets, put the files in [Amazon S3](/docs/data-pipelines/sources/s3), [Google Cloud Storage](/docs/data-pipelines/sources/gcs), [Azure Blob Storage](/docs/data-pipelines/sources/azure-blob), or [Cloudflare R2](/docs/data-pipelines/sources/r2) and connect the bucket instead.
- **Uploaded file not found:** The upload may have expired. Upload the file again.

<TroubleshootingLink />
