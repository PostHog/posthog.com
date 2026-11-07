---
title: Linking Amazon CloudWatch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AmazonCloudWatch
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Amazon CloudWatch connector syncs CloudWatch logs, alarms, and metrics into the PostHog data warehouse, so you can analyze AWS monitoring and observability data alongside your product data. This includes log events, metric alarms, alarm history, and custom metric queries.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

The IAM permissions you need depend on which tables you select:

| Table           | Required permissions                             |
| --------------- | ------------------------------------------------ |
| `log_groups`    | `logs:DescribeLogGroups`                         |
| `log_events`    | `logs:DescribeLogGroups`, `logs:FilterLogEvents` |
| `alarms`        | `cloudwatch:DescribeAlarms`                      |
| `alarm_history` | `cloudwatch:DescribeAlarmHistory`                |
| `metric_data`   | `cloudwatch:GetMetricData`                       |

## Adding a data source

<SourceSetupIntro />

When linking Amazon CloudWatch, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you are using temporary STS credentials. Temporary credentials expire, so update them before scheduled syncs run.
- **AWS region** – the AWS region to sync data from (e.g., `us-east-1`). CloudWatch data is regional, so you'll need separate sources for each region.
- **Log group names** (optional) – specific log groups to sync, one per line. If left empty, PostHog discovers up to 50 log groups automatically. Delivery-class log groups are excluded because `FilterLogEvents` cannot read them.
- **Metric queries** (optional) – JSON array of metric queries for the `metric_data` table. Accepts the CloudWatch `GetMetricData` API format or a simplified format. See [Metric queries](#metric-queries) below.
- **Start date** (optional) – how far back to sync data on the first run.

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the permissions for the tables you want. To enable all tables, use:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:FilterLogEvents",
        "cloudwatch:DescribeAlarms",
        "cloudwatch:DescribeAlarmHistory",
        "cloudwatch:GetMetricData"
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

| Table           | Sync mode    | Notes                                                                                                                                                                      |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `log_groups`    | Full refresh | All log groups with retention and stored bytes.                                                                                                                            |
| `log_events`    | Incremental  | Log events from the past 7 days by default. Uses descending timestamp order, with watermark committed at run completion.                                                   |
| `alarms`        | Full refresh | All metric and composite alarms with their current state.                                                                                                                  |
| `alarm_history` | Incremental  | Alarm state changes and configuration updates from the past 30 days. Uses ascending timestamp order.                                                                       |
| `metric_data`   | Incremental  | Metric datapoints from the past 14 days by default. Requires metric queries to be configured. Uses descending timestamp order, with watermark committed at run completion. |

Log events and metric data are read per log group or per query, not in global timestamp order. The incremental watermark is committed only when the run completes successfully.

## Metric queries

The `metric_data` table requires metric queries to be configured. You can write them in the full AWS API format or a simplified format.

**AWS API format:**

```json
[
  {
    "Id": "cpu_average",
    "MetricStat": {
      "Metric": {
        "Namespace": "AWS/EC2",
        "MetricName": "CPUUtilization",
        "Dimensions": [{ "Name": "InstanceId", "Value": "i-0123456789abcdef0" }]
      },
      "Period": 300,
      "Stat": "Average"
    }
  }
]
```

**Simplified format:**

```json
[
  {
    "id": "cpu_average",
    "namespace": "AWS/EC2",
    "metric_name": "CPUUtilization",
    "dimensions": { "InstanceId": "i-0123456789abcdef0" },
    "period": 300,
    "stat": "Average"
  }
]
```

CloudWatch keeps data at different resolutions as it ages: 1-minute data for 15 days, 5-minute data for 63 days, and 1-hour data for 455 days. PostHog automatically adjusts query periods for older data windows so datapoints are returned at the coarsest resolution CloudWatch still stores.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If `log_events` syncs no rows and you didn't specify log groups, check that your account has Standard-class log groups. Delivery-class log groups are excluded because `FilterLogEvents` cannot read them.
- If `metric_data` syncs no rows, verify that metric queries are configured on the source and that the queries match metrics that have data in the selected time range.
- If a sync fails with a permission error, check that the IAM user has the required permissions for that specific table.
- China regions use `amazonaws.com.cn` endpoints and are supported.

<TroubleshootingLink />
