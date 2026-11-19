---
title: Linking AWS IAM Access Analyzer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsIamAccessAnalyzer
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS IAM Access Analyzer connector syncs access analyzers, findings, archive rules, analyzed resources, finding details, and remediation recommendations into the PostHog data warehouse, so you can analyze security findings alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your access analyzers, security findings, and remediation recommendations from one AWS region.

Create an IAM user or role with the following permissions, then paste its access key ID and secret access key. Add a session token too if you are using temporary credentials.

- `access-analyzer:ListAnalyzers`
- `access-analyzer:ListFindings`
- `access-analyzer:ListArchiveRules`
- `access-analyzer:ListAnalyzedResources`
- `access-analyzer:GetFinding`
- `access-analyzer:GetFindingRecommendation`

You'll be asked for:

- **AWS access key ID** - for example `AKIA...`.
- **AWS secret access key**
- **AWS session token** (optional) - only needed for temporary credentials. Temporary credentials expire, so update them before later syncs.
- **AWS region** (optional) - the region where your analyzers are configured. Defaults to `us-east-1`.

## Sync modes

<SyncModes />

All AWS IAM Access Analyzer tables are full refresh. Each sync replaces the contents of the table. The API does not support a date-range filter for findings.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Analyzer type filtering

Some tables only work with specific analyzer types:

- **analyzed_resources** - Only syncs from external access analyzers (`ACCOUNT` or `ORGANIZATION` type). Unused access and internal access analyzers do not support resource enumeration.

- **finding_recommendations** - Only syncs from unused access analyzers (`ACCOUNT_UNUSED_ACCESS` or `ORGANIZATION_UNUSED_ACCESS` type) and only for `UnusedPermission` findings that already have a generated recommendation.

> **Note:** The sync only reads existing recommendations. It never generates new ones because data warehouse syncs are read-only. If a finding doesn't have a recommendation yet, generate one in the AWS console first.

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID may be wrong, expired, or revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If `analyzed_resources` returns no data, check that you have at least one external access analyzer (not an unused access analyzer).
- If `finding_recommendations` returns no data, check that you have unused access analyzers and that recommendations have been generated in AWS.

<TroubleshootingLink />
