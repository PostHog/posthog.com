---
title: Linking AWS Security Hub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsSecurityHub
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Security Hub connector syncs security findings, enabled standards, controls, product integrations, and member accounts into the PostHog data warehouse, so you can analyze your security posture alongside your product data.

## Prerequisites

You need an AWS account with Security Hub CSPM enabled in your region. If you select an aggregation region, AWS can also return findings from linked regions.

You also need an IAM user or role with the following permissions:

- `securityhub:GetFindings`
- `securityhub:DescribeStandards`
- `securityhub:GetEnabledStandards`
- `securityhub:GetInsights`
- `securityhub:DescribeStandardsControls`
- `securityhub:ListSecurityControlDefinitions`
- `securityhub:DescribeProducts`
- `securityhub:ListMembers`

## Adding a data source

<SourceSetupIntro />

When linking AWS Security Hub, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you're using temporary STS credentials. Temporary credentials expire, so you'll need to reconnect when they do.
- **AWS region** – the region where Security Hub is enabled (for example, `us-east-1`).

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "securityhub:GetFindings",
        "securityhub:DescribeStandards",
        "securityhub:GetEnabledStandards",
        "securityhub:GetInsights",
        "securityhub:DescribeStandardsControls",
        "securityhub:ListSecurityControlDefinitions",
        "securityhub:DescribeProducts",
        "securityhub:ListMembers"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

## Sync modes

<SyncModes />

The `findings` table supports incremental sync using `updated_at` as the cursor. All other tables use full refresh, replacing the entire table contents on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS rejected the credentials", check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you're using temporary credentials, the session token may have expired.
- If you see "Grant the required securityhub read permissions", ensure all eight `securityhub:*` permissions are attached to the IAM user or role.
- If you see "Enable AWS Security Hub CSPM in the configured region", enable Security Hub in the AWS region you specified.
- If the `standards_controls` table syncs no rows, your account may not have any enabled standards. Enable a security standard in Security Hub first.

<TroubleshootingLink />
