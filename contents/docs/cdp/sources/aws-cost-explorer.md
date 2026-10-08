---
title: Linking AWS Cost Explorer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsCostExplorer
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The AWS Cost Explorer connector syncs your AWS cost and usage data into PostHog, so you can analyze cloud spend alongside your product data.

## Prerequisites

You need an AWS account with Cost Explorer enabled. Cost Explorer can take up to 24 hours to prepare data after it is first enabled.

You also need an IAM user or role with the following permissions:

- `ce:GetCostAndUsage`
- `ce:GetReservationUtilization`
- `ce:GetSavingsPlansUtilization`

To see spend across every member account, connect the management (payer) account.

## Adding a data source

<SourceSetupIntro />

When linking AWS Cost Explorer, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you are using temporary STS credentials.
- **Start date** (optional) – the earliest date to sync from, in `YYYY-MM-DD` format. Defaults to 12 months ago.

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
        "ce:GetCostAndUsage",
        "ce:GetReservationUtilization",
        "ce:GetSavingsPlansUtilization"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

> **Note:** AWS charges $0.01 per Cost Explorer API request. PostHog uses wide date windows per request to keep costs low.

## Sync modes

<SyncModes />

All four tables support incremental sync using `period_start` as the cursor.

AWS restates recent cost periods until bills finalize (rows come back marked as estimated). To capture these corrections, incremental syncs automatically re-read a trailing window behind the last synced value:

| Table                             | Lookback window |
| --------------------------------- | --------------- |
| `cost_and_usage_daily`            | 7 days          |
| `cost_and_usage_monthly`          | 45 days         |
| `reservation_utilization_daily`   | 7 days          |
| `savings_plans_utilization_daily` | 7 days          |

Duplicate rows are merged by primary key, so re-read periods don't create duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS rejected the access key", check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If you see "missing Cost Explorer permissions", grant `ce:GetCostAndUsage`, `ce:GetReservationUtilization`, and `ce:GetSavingsPlansUtilization` to the IAM user or role.
- If you see "no Cost Explorer data", make sure Cost Explorer is enabled on the AWS account. It can take up to 24 hours after enabling for data to appear.
- If you see "dates are older than the data AWS keeps", move the start date forward and try again.

<TroubleshootingLink />
