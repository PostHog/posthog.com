---
title: Linking AWS Inspector as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsInspector
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Inspector connector syncs vulnerability findings, scan coverage, CIS benchmark results, member accounts, and cluster data into the PostHog data warehouse, so you can analyze your security posture alongside your product data.

## Prerequisites

You need an AWS account with Amazon Inspector enabled in the region you want to sync. You also need an IAM user or role with permissions for the tables you select:

- `findings` – `inspector2:ListFindings`
- `coverage` – `inspector2:ListCoverage`
- `coverage_statistics` – `inspector2:ListCoverageStatistics`
- `members` – `inspector2:ListMembers` (delegated administrator account only)
- `cis_scans` – `inspector2:ListCisScans`
- `cis_scan_result_details` – `inspector2:ListCisScans`, `inspector2:ListCisScanResultsAggregatedByTargetResource`, and `inspector2:GetCisScanResultDetails`
- `clusters_for_image` – `inspector2:ListCoverage` and `inspector2:GetClustersForImage`

The `members` table requires a delegated administrator account. If your account isn't an administrator, the table syncs no rows.

## Adding a data source

<SourceSetupIntro />

When linking AWS Inspector, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you're using temporary STS credentials. Temporary credentials expire, so you'll need to reconnect when they do.
- **AWS region** – the region where Inspector is enabled (for example, `us-east-1`).

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the permissions for the tables you want to sync. The following policy grants access to all tables:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "inspector2:ListFindings",
        "inspector2:ListCoverage",
        "inspector2:ListCoverageStatistics",
        "inspector2:ListMembers",
        "inspector2:ListCisScans",
        "inspector2:ListCisScanResultsAggregatedByTargetResource",
        "inspector2:GetCisScanResultDetails",
        "inspector2:GetClustersForImage"
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

The `findings` table supports incremental sync using `updated_at` as the cursor. The `cis_scan_result_details` table supports incremental sync using `scan_date` as the cursor. All other tables – `coverage`, `coverage_statistics`, `members`, `cis_scans`, and `clusters_for_image` – use full refresh, replacing the entire table contents on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS denied access", check that the required `inspector2:*` permissions are attached to the IAM user or role for the tables you selected.
- If you see "AWS rejected the credentials", check that the access key ID, secret access key, and session token are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you're using temporary credentials, the session token may have expired.
- If you see "Enable Amazon Inspector in the selected AWS region", enable Inspector in the region you specified, then reconnect.
- If the `members` table syncs no rows, your account may not be an Inspector delegated administrator. Only delegated administrator accounts can list member accounts.

<TroubleshootingLink />
