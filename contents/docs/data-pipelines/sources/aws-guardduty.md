---
title: Linking AWS GuardDuty as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsGuardduty
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS GuardDuty connector syncs threat findings, detector configuration, member accounts, Runtime Monitoring coverage, malware scans, and usage statistics into the PostHog data warehouse, so you can analyze your AWS security posture alongside your product data.

## Prerequisites

You need an AWS account with GuardDuty enabled in the region you want to sync. You also need an IAM user or role with the following permissions:

- `guardduty:ListDetectors`
- `guardduty:GetDetector`
- `guardduty:ListFindings`
- `guardduty:GetFindings`
- `guardduty:ListMembers`
- `guardduty:ListCoverage`
- `guardduty:DescribeMalwareScans`
- `guardduty:GetUsageStatistics`

The `members` table requires a GuardDuty administrator account. If your account is not an administrator, the table syncs no rows.

## Adding a data source

<SourceSetupIntro />

When linking AWS GuardDuty, you choose between two authentication methods: **access keys** or **IAM role**.

Both methods require:

- **AWS region** – the region where GuardDuty is enabled (for example, `us-east-1`).

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

1. In the GuardDuty source setup, select **Assume IAM role**.
2. Create an IAM role in your AWS account with a trust policy that allows PostHog's role to assume it. The PostHog role ARN depends on your cloud region:
   - **US Cloud** – `arn:aws:iam::309986977637:role/posthog-external-batch-exports`
   - **EU Cloud** – `arn:aws:iam::623789312881:role/posthog-external-batch-exports`
3. Add an `sts:ExternalId` condition to the trust policy. Set the value to `posthog-<your_organization_id>` (your organization ID is shown in the setup modal). PostHog verifies this condition is enforced and syncs fail without it.
4. Attach a permissions policy to the role that grants the required GuardDuty read permissions (see the example below).
5. Paste the role ARN into the **IAM role ARN** field.

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
        "guardduty:ListDetectors",
        "guardduty:GetDetector",
        "guardduty:ListFindings",
        "guardduty:GetFindings",
        "guardduty:ListMembers",
        "guardduty:ListCoverage",
        "guardduty:DescribeMalwareScans",
        "guardduty:GetUsageStatistics"
      ],
      "Resource": "*"
    }
  ]
}
```

> **Note:** Self-hosted users should check with their instance administrator for the correct PostHog role ARN to trust.

### Access keys

With access keys, you provide an AWS access key ID and secret access key. This method uses long-lived credentials. Prefer IAM role assumption when possible.

To set up access key authentication:

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the required GuardDuty permissions (see the permissions policy example above).
3. Create an access key for your IAM user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

## Sync modes

<SyncModes />

The `findings` table supports incremental sync using `updated_at` as the cursor. All other tables – `detectors`, `members`, `coverage`, `malware_scans`, and `usage_statistics` – use full refresh, replacing the entire table contents on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS denied access", check that all eight `guardduty:*` permissions are attached to the IAM user or role.
- If you see "AWS rejected the credentials", check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you're using temporary credentials, the session token may have expired.
- If you see "Enable GuardDuty in the selected AWS region", enable GuardDuty in the region you specified, then reconnect.
- If you see "The role cannot be assumed", check that the trust policy includes PostHog's role ARN and the correct external ID condition.
- If the `members` table syncs no rows, your account may not be a GuardDuty administrator. Only administrator accounts can list member accounts.

<TroubleshootingLink />
