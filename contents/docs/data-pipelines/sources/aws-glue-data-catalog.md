---
title: Linking AWS Glue Data Catalog as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsGlueDataCatalog
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Glue Data Catalog connector syncs your Glue metadata, jobs, crawlers, and workflow history into PostHog, so you can analyze your data catalog alongside your product data.

## Prerequisites

You need an AWS account with Glue enabled in the region you want to sync from.

You also need an IAM user or role with the required Glue read permissions. The exact permissions depend on which tables you want to sync – see [Creating IAM credentials](#creating-iam-credentials) below.

Lake Formation permissions can also restrict catalog access. If you use Lake Formation, make sure the IAM principal has read access to the databases and tables you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking AWS Glue Data Catalog, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you are using temporary STS credentials. Temporary credentials expire, so replace them before the next scheduled sync.
- **AWS region** – the region to sync from (for example, `us-east-1`). Each source connection syncs from one region.

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the permissions for the tables you want to sync:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetDatabases",
        "glue:GetTables",
        "glue:GetPartitions",
        "glue:GetTableVersions",
        "glue:GetJobs",
        "glue:GetJobRuns",
        "glue:GetCrawlers",
        "glue:ListCrawls",
        "glue:ListWorkflows",
        "glue:GetWorkflowRuns",
        "glue:ListDataQualityResults"
      ],
      "Resource": "*"
    }
  ]
}
```

You can scope this down to only the permissions you need:

| Tables                                                | Required permissions                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `databases`, `tables`, `partitions`, `table_versions` | `glue:GetDatabases`, `glue:GetTables`, `glue:GetPartitions`, `glue:GetTableVersions` |
| `jobs`, `job_runs`                                    | `glue:GetJobs`, `glue:GetJobRuns`                                                    |
| `crawlers`, `crawls`                                  | `glue:GetCrawlers`, `glue:ListCrawls`                                                |
| `workflow_runs`                                       | `glue:ListWorkflows`, `glue:GetWorkflowRuns`                                         |
| `data_quality_results`                                | `glue:ListDataQualityResults`                                                        |

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

## Sync modes

<SyncModes />

All AWS Glue Data Catalog tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an access denied error, check that the IAM user or role has the required Glue read permissions. If you use Lake Formation, also check that the IAM principal has access to the catalog resources.
- If you see a credential error, check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If the session token has expired, create new temporary credentials and reconnect the source.
- If you see an error about Glue not being enabled, enable AWS Glue for the account and region, then reconnect.
- If a table syncs no rows, the credential may not have permission to read that data. Check the IAM policy and any Lake Formation restrictions.

<TroubleshootingLink />
