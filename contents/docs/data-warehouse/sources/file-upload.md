---
title: Uploading files to the data warehouse
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

You can upload CSV, JSON, or Parquet files directly to the data warehouse without setting up your own S3 or GCS bucket. PostHog stores the file and reads it in place on every query — there's no sync pipeline or recurring import.

This is ideal for one-off data like spreadsheet exports, lookup tables, or static datasets. For files larger than 50MB or data that updates regularly, [link an S3](/docs/cdp/sources/s3) or [GCS](/docs/cdp/sources/gcs) bucket instead.

## Supported file formats

### CSV

- The first row is treated as the header (column names).
- Columns should not contain spaces.
- Avoid commas inside cell values unless properly quoted.

### JSON

Three shapes are accepted:

- **JSON array** — a top-level array of objects (e.g. `[{"name": "Alice"}, {"name": "Bob"}]`).
- **Single JSON object** — one object becomes one row.
- **Newline-delimited JSON (NDJSON)** — one JSON object per line.

### Parquet

Standard Apache Parquet files are supported.

## How to upload a file

### Step 1: Choose your file type

1. Go to the [Data pipeline sources tab](https://app.posthog.com/data-management/sources).
2. Click **New source**.
3. Under self managed, select **CSV**, **JSON**, or **Parquet** depending on your file format.

### Step 2: Upload and create the table

1. Select the file from your computer. The maximum file size is **50MB**.
2. Enter a **table name** — this is the name you'll use in SQL queries.
3. Click **Create**.

PostHog uploads the file, detects the columns, and creates a table you can query immediately.

### Step 3: Query your data

Your table appears under **self-managed sources** on the sources page. Query it with SQL like any other table:

```sql
SELECT * FROM your_table_name
```

See [querying the data warehouse](/docs/data-warehouse/query) for more on writing SQL queries.

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

- **50MB maximum file size.** For larger files, upload them to your own bucket and [link it as a source](/docs/cdp/sources/s3).
- **Static data.** Uploaded files are not synced or updated automatically. To update the data, delete the table and upload a new file.
- **No recurring sync.** Unlike managed sources, there is no sync schedule — the file is read directly from storage on each query.

## Troubleshooting

- **Table creation failed — could not detect columns:** Check that your file is valid. For CSV files, ensure the first row contains column headers and columns don't have spaces in their names. For JSON, ensure the file contains valid JSON objects.

- **File too large:** The upload limit is 50MB. For larger datasets, upload the file to [S3](/docs/cdp/sources/s3), [GCS](/docs/cdp/sources/gcs), or [Cloudflare R2](/docs/cdp/sources/r2) and link the bucket instead.

- **Uploaded file not found:** If you see this error when creating a table, the upload may have expired. Try uploading the file again.
