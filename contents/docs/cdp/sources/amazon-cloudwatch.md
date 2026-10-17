---
title: Linking Amazon CloudWatch as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: AmazonCloudWatch
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

> **Alpha:** This source is in alpha. If you run into issues, reach out to [our support team](/docs/support).

The Amazon CloudWatch connector syncs log events, alarms, alarm history, and metric datapoints from one AWS region into the PostHog data warehouse, so you can query your infrastructure logs and metrics alongside your product data.

Any log delivered to CloudWatch Logs can be synced, including Amazon Bedrock model invocation logs and CloudFront standard logs. Any CloudWatch metric can be synced through a metric query, including S3 Storage Lens metrics in the `AWS/S3/Storage-Lens` namespace.

## Prerequisites

You need an IAM user or role with the following permissions:

- `logs:DescribeLogGroups`
- `logs:FilterLogEvents`
- `cloudwatch:DescribeAlarms`
- `cloudwatch:DescribeAlarmHistory`
- `cloudwatch:GetMetricData`

Each source reads one AWS region. To sync data from more than one region, add one source per region.

## Adding a data source

<SourceSetupIntro />

When linking Amazon CloudWatch, you'll need:

- **AWS access key ID** and **AWS secret access key** for the IAM user or role.
- **AWS session token** (optional). Only needed if you use temporary credentials.
- **AWS region**, for example `us-east-1`.
- **Log groups to sync** (optional). One log group name per line, for example `/aws/lambda/my-function`. Leave it empty to sync every log group in the region, up to 50.
- **Metric queries** (optional). A JSON list of the metrics to sync into the `metric_data` table. See [Metric queries](#metric-queries) below.
- **Start date** (optional). The earliest date to sync from, in `YYYY-MM-DD` format.

### Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

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
4. Copy the **Access key ID** and **Secret access key**. You need both when you link the source in PostHog.

### Metric queries

The `metric_data` table only syncs the metrics you list in **Metric queries**. If the field is empty, `metric_data` syncs no rows.

Each query is a JSON object with these keys:

- `id`: a unique name for the query. It appears in the `query_id` column. Defaults to `q1`, `q2`, and so on.
- `namespace` and `metric_name`: the metric to read, for example `AWS/EC2` and `CPUUtilization`.
- `dimensions` (optional): an object of dimension names and values, for example `{"InstanceId": "i-0123456789abcdef0"}`.
- `stat` (optional): the statistic, as CloudWatch names it. Defaults to `Average`.
- `period` (optional): the datapoint period in seconds. Defaults to `300`.
- `unit` and `label` (optional).

For example:

```json
[
  {
    "id": "cpu",
    "namespace": "AWS/EC2",
    "metric_name": "CPUUtilization",
    "dimensions": { "InstanceId": "i-0123456789abcdef0" },
    "stat": "Average",
    "period": 300
  }
]
```

Instead of `namespace` and `metric_name`, a query can have an `expression`, such as a `SEARCH` expression or a Metrics Insights query, with an optional `period`. An expression can return more than one series. The `label` column tells them apart. You can also paste queries in the `MetricDataQueries` format of the CloudWatch `GetMetricData` API, with `Id`, `MetricStat`, or `Expression` keys.

When you link the source, PostHog checks that the queries match the format the CloudWatch API expects.

## Sync modes

<SyncModes />

`log_groups` and `alarms` are full refresh. `log_events`, `alarm_history`, and `metric_data` support incremental and append-only sync on the `timestamp` field.

On the first sync, each time-based table reads back from the start date. If you don't set a start date, it uses these defaults:

| Table           | Default first sync |
| --------------- | ------------------ |
| `log_events`    | Last 7 days        |
| `metric_data`   | Last 14 days       |
| `alarm_history` | Last 30 days       |

CloudWatch keeps alarm history for 30 days, so `alarm_history` can't go further back than that.

Log events can arrive late, and recent metric datapoints are still being aggregated. Incremental syncs of `log_events` and `metric_data` re-read the last hour behind the last synced value by default. Rows that are read twice are merged by primary key, so they don't create duplicates.

### Metric periods for older data

CloudWatch keeps datapoints at a coarser resolution as they age: 1-minute data for 15 days, 5-minute data for 63 days, and 1-hour data for 455 days. A query that asks for a finer period than CloudWatch still keeps returns no data.

To avoid this, PostHog reads metrics in 14-day windows and rounds each query's period up to the resolution CloudWatch keeps for the oldest data in that window:

| Oldest data in the window | Period rounded up to a multiple of |
| ------------------------- | ---------------------------------- |
| Older than 3 hours        | 60 seconds                         |
| Older than 15 days        | 300 seconds                        |
| Older than 63 days        | 3,600 seconds                      |

For example, a query with a 300-second period returns hourly datapoints for windows that start more than 63 days ago.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **AWS rejected the access key**: check that the access key ID and secret access key are correct, and that the key is still active in IAM.
- **AWS rejected the request signature**: re-enter the secret access key. If you use temporary credentials, the session token may have expired.
- **These AWS credentials cannot read CloudWatch**: grant the permissions listed in [Prerequisites](#prerequisites) to the IAM user or role.
- **A configured log group does not exist in this region**: check the log group names on the source, and check that the source uses the region the log groups are in.
- **The metric queries on the source are not valid**: fix the JSON in **Metric queries**. Each query needs a `namespace` and a `metric_name`, or an `expression`, and each `id` must be unique.
- **A metric query returns more datapoints than CloudWatch sends in one response**: use a longer `period`, or fewer metrics in the expression.
- **These AWS credentials cannot read one of the configured metrics**: grant `cloudwatch:GetMetricData` for that metric, or remove the query from the source.
- **Log events are missing from some log groups**: when **Log groups to sync** is empty, PostHog reads at most 50 log groups. List the log groups you want, one per line.

<TroubleshootingLink />
