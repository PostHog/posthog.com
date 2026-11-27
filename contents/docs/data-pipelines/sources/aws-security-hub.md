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

> **Note:** The `software_v2`, `products_v2`, `findings_trends_v2`, and `resources_trends_v2` tables require full AWS Security Hub (not just Security Hub CSPM) to be enabled in the selected region.

You also need an IAM user or role with the following permissions:

- `securityhub:GetFindings`
- `securityhub:DescribeStandards`
- `securityhub:GetEnabledStandards`
- `securityhub:GetInsights`
- `securityhub:DescribeStandardsControls`
- `securityhub:ListSecurityControlDefinitions`
- `securityhub:DescribeProducts`
- `securityhub:ListMembers`
- `securityhub:DescribeProductsV2`
- `securityhub:GetSoftwareV2`
- `securityhub:GetFindingsTrendsV2`
- `securityhub:GetResourcesTrendsV2`

## Adding a data source

<SourceSetupIntro />

When linking AWS Security Hub, you choose between two authentication methods: **access keys** or **IAM role**.

Both methods require:

- **AWS region** – the region where Security Hub is enabled (for example, `us-east-1`).

For **access keys**, you also need:

- **AWS access key ID** – the access key ID for your IAM user (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you're using temporary STS credentials. Temporary credentials expire, so you'll need to reconnect when they do.

For **IAM role**, you need:

- **IAM role ARN** – the ARN of a role in your AWS account that PostHog assumes to obtain short-lived credentials.

## AWS authentication

### IAM role (recommended)

With IAM role assumption, PostHog uses AWS STS to assume a role in your AWS account and obtain short-lived credentials. This avoids storing long-lived access keys.

To set up IAM role authentication:

1. In the Security Hub source setup, select **Assume IAM role**.
2. Create an IAM role in your AWS account with a trust policy that allows PostHog's role to assume it. The PostHog role ARN depends on your cloud region:
   - **US Cloud** – `arn:aws:iam::309986977637:role/posthog-external-batch-exports`
   - **EU Cloud** – `arn:aws:iam::623789312881:role/posthog-external-batch-exports`
3. Add an `sts:ExternalId` condition to the trust policy. Set the value to `posthog-<your_organization_id>` (your organization ID is shown in the setup modal).
4. Attach a permissions policy to the role that grants the required Security Hub read permissions (see the [permissions policy example](#permissions-policy) below).
5. Paste the role ARN (for example, `arn:aws:iam::123456789012:role/posthog-securityhub-source`) into the **IAM role ARN** field.

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

> **Note:** Self-hosted users should check with their instance administrator for the correct PostHog role ARN to trust.

### Access keys

With access keys, you provide an AWS access key ID and secret access key that PostHog stores encrypted. This method uses long-lived credentials. Prefer IAM role assumption when possible.

To set up access key authentication:

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the required permissions (see the [permissions policy example](#permissions-policy) below).
3. Create an access key for your IAM user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

### Permissions policy

Whichever authentication method you choose, the IAM role or user needs the following permissions:

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
        "securityhub:ListMembers",
        "securityhub:DescribeProductsV2",
        "securityhub:GetSoftwareV2",
        "securityhub:GetFindingsTrendsV2",
        "securityhub:GetResourcesTrendsV2"
      ],
      "Resource": "*"
    }
  ]
}
```

## Sync modes

<SyncModes />

The `findings` table supports incremental sync using `updated_at` as the cursor. All other tables use full refresh, replacing the entire table contents on each sync. The `findings_trends_v2` and `resources_trends_v2` tables sync trend data from the last 90 days.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS rejected the credentials", check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you're using temporary credentials, the session token may have expired.
- If you see "Grant the required securityhub read permissions", ensure all the `securityhub:*` permissions listed in the [permissions policy](#permissions-policy) are attached to the IAM user or role.
- If you see "The role cannot be assumed", check that the trust policy includes PostHog's role ARN and the correct external ID condition.
- If you see "Enable AWS Security Hub CSPM in the configured region", enable Security Hub in the AWS region you specified. If you're trying to sync the software, trend, or V2 product tables, you need to enable full AWS Security Hub (not just Security Hub CSPM) in that region.
- If the `standards_controls` table syncs no rows, your account may not have any enabled standards. Enable a security standard in Security Hub first.

<TroubleshootingLink />
