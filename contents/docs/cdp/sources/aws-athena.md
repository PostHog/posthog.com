---
title: Linking Amazon Athena as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: AwsAthena
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Amazon Athena connector syncs the tables of an AWS Glue database into the PostHog data warehouse by running queries through Amazon Athena, so you can query your data lake alongside your product data.

## Prerequisites

You need:

- A Glue database in the default `AwsDataCatalog` catalog. Federated catalogs aren't supported.
- An Athena workgroup that is enabled. PostHog uses the `primary` workgroup unless you name another one.
- A query result location. Either the workgroup has one, or you enter an S3 output location when you link the source.
- An IAM user or role with these permissions:
  - `glue:GetDatabase`
  - `glue:GetTables`
  - `glue:GetTable`
  - `athena:GetWorkGroup`
  - `athena:StartQueryExecution`
  - `athena:GetQueryExecution`
  - `athena:GetQueryResults`
  - `athena:StopQueryExecution`

  The IAM user or role also needs read access to the S3 data behind the tables, and read and write access to the query result location.

Each sync runs one Athena query per table. Athena bills you for the data each query scans.

## Adding a data source

<SourceSetupIntro />

When linking Amazon Athena, you'll need:

- **AWS access key ID** and **AWS secret access key** for the IAM user or role.
- **AWS session token** (optional). Only needed if you use temporary credentials.
- **AWS region**, for example `us-east-1`.
- **Glue database**: the database to sync tables from.
- **Athena workgroup** (optional). Defaults to `primary`.
- **S3 output location** (optional): where Athena writes query results, in the form `s3://bucket/path/`. Only needed when the workgroup has no query result location.

PostHog lists the tables in the Glue database. Partition key columns are included with each table's other columns.

### Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabase",
        "glue:GetTables",
        "glue:GetTable",
        "athena:GetWorkGroup",
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults",
        "athena:StopQueryExecution"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Grant the same user read access to the S3 data behind the tables you want to sync, and read and write access to the query result location.
4. Create an access key for the user under **Security credentials** > **Access keys**.
5. Copy the **Access key ID** and **Secret access key**. You need both when you link the source in PostHog.

## Sync modes

<SyncModes />

Tables support incremental and append-only sync on a column you choose. The column must be a timestamp, date, integer, or decimal column.

An incremental sync filters the Athena query on that column, so a table partitioned on the same column scans less data.

Athena doesn't expose primary keys. For incremental syncs, PostHog matches rows on the primary key chosen for the table, or on a column named `id` if the table has one.

You can also pick which columns to sync and add row filters. Both are applied to the Athena query.

## Query time limit

PostHog waits up to 1 hour for each Athena query to finish. If a query is still running after that, the sync fails. If a sync stops or fails while a query is running, PostHog stops the query in Athena.

## Data types

Columns of type `array`, `map`, or `struct` are stored as JSON.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **AWS rejected the access key**: check that the access key ID and secret access key are correct, and that the key is still active in IAM.
- **AWS rejected the request signature**: re-enter the secret access key.
- **The AWS session token has expired**: reconnect with fresh credentials.
- **These AWS credentials cannot read the catalog or run queries**: grant the permissions listed in [Prerequisites](#prerequisites), plus read access to the tables' S3 data and read and write access to the query result location.
- **The Glue database does not exist in this region**: check the database name and the region.
- **The Athena workgroup does not exist in this region**: check the workgroup name.
- **This Athena workgroup is disabled**: enable it in Athena, or use another workgroup.
- **This workgroup has no query result location**: set one on the workgroup, or enter an **S3 output location** on the source.
- **Athena could not run the query for this table**: a column may have been renamed or dropped, or the credentials can't read the table's S3 data. Fix that, then retry the sync.
- **The query is still running after 1 hour**: use incremental sync or row filters so each query reads fewer rows.

<TroubleshootingLink />
