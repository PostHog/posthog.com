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

When linking AWS GuardDuty, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you're using temporary STS credentials. Temporary credentials expire, so you'll need to reconnect when they do.
- **AWS region** – the region where GuardDuty is enabled (for example, `us-east-1`).

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
- If the `members` table syncs no rows, your account may not be a GuardDuty administrator. Only administrator accounts can list member accounts.

<TroubleshootingLink />
