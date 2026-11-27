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

You need an AWS account with IAM Access Analyzer enabled in the region you want to sync. You also need an IAM user or role with the following permissions:

- `access-analyzer:ListAnalyzers`
- `access-analyzer:ListFindingsV2`
- `access-analyzer:ListArchiveRules`
- `access-analyzer:ListAnalyzedResources`
- `access-analyzer:GetFindingV2`
- `access-analyzer:GetFindingRecommendation`

## Adding a data source

<SourceSetupIntro />

When linking AWS IAM Access Analyzer, you choose between two authentication methods: **access keys** or **IAM role**.

Both methods require you to specify:

- **AWS region** (optional) – the region where your analyzers are configured. Defaults to `us-east-1`.

For **access keys**, you also need:

- **AWS access key ID** – for example `AKIA...`.
- **AWS secret access key**
- **AWS session token** (optional) – only needed for temporary credentials. Temporary credentials expire, so update them before later syncs.

For **IAM role**, you need:

- **IAM role ARN** – the ARN of a role in your AWS account that PostHog assumes.

## AWS authentication

### IAM role (recommended)

With IAM role assumption, PostHog uses AWS STS to assume a role in your AWS account and obtain short-lived credentials. This avoids storing long-lived access keys.

To set up IAM role authentication:

1. In the IAM Access Analyzer source setup, select **Assume IAM role**.
2. Create an IAM role in your AWS account with a trust policy that allows PostHog's role to assume it. The PostHog role ARN depends on your cloud region:
   - **US Cloud** – `arn:aws:iam::309986977637:role/posthog-external-batch-exports`
   - **EU Cloud** – `arn:aws:iam::623789312881:role/posthog-external-batch-exports`
3. Add an `sts:ExternalId` condition to the trust policy. Set the value to `posthog-<your_organization_id>` (your organization ID is shown in the setup modal).
4. Attach a permissions policy to the role that grants the required IAM Access Analyzer read permissions.
5. Paste the role ARN (for example, `arn:aws:iam::123456789012:role/posthog-access-analyzer-source`) into the **IAM role ARN** field.

Here's an example trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::309986977637:role/posthog-external-batch-exports"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "posthog-<your_organization_id>"
        }
      }
    }
  ]
}
```

And an example permissions policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "access-analyzer:ListAnalyzers",
        "access-analyzer:ListFindingsV2",
        "access-analyzer:ListArchiveRules",
        "access-analyzer:ListAnalyzedResources",
        "access-analyzer:GetFindingV2",
        "access-analyzer:GetFindingRecommendation"
      ],
      "Resource": "*"
    }
  ]
}
```

### Access keys

With access keys, you provide an AWS access key ID and secret access key. This method uses long-lived credentials. Prefer IAM role assumption when possible.

To set up access key authentication:

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the required permissions (see the permissions policy example above).
3. Create an access key for your IAM user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

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
- If you see "The role cannot be assumed", check that the trust policy includes PostHog's role ARN and the correct external ID condition.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.
- If `analyzed_resources` returns no data, check that you have at least one external access analyzer (not an unused access analyzer).
- If `finding_recommendations` returns no data, check that you have unused access analyzers and that recommendations have been generated in AWS.

<TroubleshootingLink />
