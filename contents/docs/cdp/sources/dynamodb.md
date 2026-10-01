---
title: Linking DynamoDB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DynamoDB
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The DynamoDB connector syncs your database data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter an AWS access key with read access to DynamoDB to import your tables.

Create an IAM user whose policy allows `dynamodb:ListTables`, `dynamodb:DescribeTable` and `dynamodb:Scan`, then paste its access key below. Tables are read with a full table scan, so every sync uses read capacity on the table.

You'll be asked for:

- **AWS access key ID**: for example `AKIA...`.
- **AWS secret access key**
- **AWS region**: for example `us-east-1`.

## Sync modes

<SyncModes />

All DynamoDB tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
