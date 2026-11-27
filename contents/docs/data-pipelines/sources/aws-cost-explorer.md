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

The AWS Cost Explorer connector syncs your AWS cost and usage data into PostHog, so you can analyze cloud spend alongside your product data.

## Prerequisites

You need an AWS account with Cost Explorer enabled. Cost Explorer can take up to 24 hours to prepare data after it is first enabled.

You also need an IAM user or role with the following permissions:

- `ce:GetCostAndUsage`
- `ce:GetCostAndUsageWithResources`
- `ce:GetDimensionValues`
- `ce:GetReservationUtilization`
- `ce:GetReservationCoverage`
- `ce:GetSavingsPlansUtilization`
- `ce:GetSavingsPlansCoverage`
- `ce:GetSavingsPlansUtilizationDetails`
- `ce:GetCostForecast`
- `ce:GetRightsizingRecommendation`
- `ce:GetReservationPurchaseRecommendation`

The existing tables work without the four new permissions. Add them only if you want the new tables.

To see spend across every member account, connect the management (payer) account.

## Adding a data source

<SourceSetupIntro />

When linking AWS Cost Explorer, you choose how PostHog authenticates with AWS:

**Option 1: Access keys**

- **AWS access key ID** – the access key ID for your IAM user (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you are using temporary STS credentials.

**Option 2: IAM role**

Select **IAM role** and choose an AWS connection that holds your role ARN. PostHog assumes the role with short-lived credentials and stores no long-lived key. See [Creating IAM credentials](#creating-iam-credentials) for setup steps.

Both options also accept:

- **Start date** (optional) – the earliest date to sync from, in `YYYY-MM-DD` format. Defaults to 12 months ago.

## Creating IAM credentials

### Access keys

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
        "ce:GetCostAndUsageWithResources",
        "ce:GetDimensionValues",
        "ce:GetReservationUtilization",
        "ce:GetReservationCoverage",
        "ce:GetSavingsPlansUtilization",
        "ce:GetSavingsPlansCoverage",
        "ce:GetSavingsPlansUtilizationDetails",
        "ce:GetCostForecast",
        "ce:GetRightsizingRecommendation",
        "ce:GetReservationPurchaseRecommendation"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

### IAM role

1. In the AWS Console, go to **IAM** > **Roles** and create a new role.
2. Under **Trusted entity type**, choose **Custom trust policy** and paste the following. Replace `<POSTHOG_ACCOUNT_ID>` with PostHog's AWS account ID (shown in the PostHog UI when you create the connection) and `<YOUR_EXTERNAL_ID>` with the external ID PostHog displays for your organization:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<POSTHOG_ACCOUNT_ID>:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<YOUR_EXTERNAL_ID>"
        }
      }
    }
  ]
}
```

3. Attach the same permissions policy shown in the [Access keys](#access-keys) section above.
4. Copy the role's ARN.
5. In PostHog, go to **Data pipeline** > **Sources**, create a new **AWS connection**, and paste the role ARN.
6. When linking the AWS Cost Explorer source, choose **IAM role** and select the connection you created.
   > **Note:** AWS charges $0.01 per Cost Explorer API request. PostHog uses wide date windows per request to keep costs low.

## Sync modes

<SyncModes />

Most tables support incremental sync using `period_start` as the cursor. The `dimension_values`, `cost_forecast_daily`, `rightsizing_recommendations`, and `reservation_purchase_recommendations` tables are full refresh only.

AWS restates recent cost periods until bills finalize (rows come back marked as estimated). To capture these corrections, incremental syncs automatically re-read a trailing window behind the last synced value:

| Table                                     | Lookback window | Notes                                                                                         |
| ----------------------------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| `cost_and_usage_daily`                    | 7 days          |                                                                                               |
| `cost_and_usage_monthly`                  | 45 days         |                                                                                               |
| `cost_and_usage_with_resources_daily`     | 7 days          | Only covers last 14 days. Requires resource-level data enabled in Cost Explorer settings.     |
| `dimension_values`                        | –               | Full refresh only (no incremental sync).                                                      |
| `reservation_utilization_daily`           | 7 days          |                                                                                               |
| `reservation_coverage_daily`              | 7 days          | Covers EC2, RDS, ElastiCache, and Redshift.                                                   |
| `savings_plans_utilization_daily`         | 7 days          |                                                                                               |
| `savings_plans_coverage_daily`            | 7 days          |                                                                                               |
| `savings_plans_utilization_details_daily` | 7 days          | Daily utilization per Savings Plan. Uses one billed AWS request per day.                      |
| `cost_forecast_daily`                     | –               | Full refresh only. Provides forecast for the next 89 days.                                    |
| `rightsizing_recommendations`             | –               | Full refresh only. Requires rightsizing recommendations enabled in Cost Explorer preferences. |
| `reservation_purchase_recommendations`    | –               | Full refresh only. Covers EC2, RDS, ElastiCache, and Redshift.                                |

Duplicate rows are merged by primary key, so re-read periods don't create duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS rejected the access key" or a credential error, check that the access key ID and secret access key are correct and that the key is still active in IAM. If you are using an IAM role, check that the role's trust policy allows PostHog and requires the correct external ID.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If you see "missing Cost Explorer permissions", grant `ce:GetCostAndUsage`, `ce:GetCostAndUsageWithResources`, `ce:GetDimensionValues`, `ce:GetReservationUtilization`, `ce:GetReservationCoverage`, `ce:GetSavingsPlansUtilization`, `ce:GetSavingsPlansCoverage`, `ce:GetSavingsPlansUtilizationDetails`, `ce:GetCostForecast`, `ce:GetRightsizingRecommendation`, and `ce:GetReservationPurchaseRecommendation` to the IAM user or role.
- If you see "no Cost Explorer data", make sure Cost Explorer is enabled on the AWS account. It can take up to 24 hours after enabling for data to appear.
- If you see "dates are older than the data AWS keeps", move the start date forward and try again.
- If the `cost_and_usage_with_resources_daily` table has no data, enable resource-level data in your AWS Cost Explorer settings. Go to **AWS Console** > **Cost Explorer** > **Settings** > **Cost Explorer Settings** and turn on resource-level data for EC2, Lambda, and any other services you want to track.
- If the start date is older than 14 days for the resource table, the sync automatically clamps it to 14 days ago. AWS does not serve resource-level data beyond this window.
- If the `rightsizing_recommendations` table is empty, enable rightsizing recommendations in AWS. Go to **AWS Console** > **Cost Explorer** > **Preferences** > **Rightsizing recommendations** and turn it on.

<TroubleshootingLink />
