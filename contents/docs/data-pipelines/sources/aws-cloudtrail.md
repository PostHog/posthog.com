---
title: Linking AWS CloudTrail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsCloudTrail
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS CloudTrail connector syncs CloudTrail events, trail settings, Insights data, and Lake query history into the PostHog data warehouse, so you can analyze AWS audit logs alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

The IAM permissions you need depend on which tables you select:

| Table                  | Required permissions                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `events`               | `cloudtrail:LookupEvents`                                                              |
| `insight_events`       | `cloudtrail:LookupEvents`                                                              |
| `trails`               | `cloudtrail:DescribeTrails`                                                            |
| `event_data_stores`    | `cloudtrail:ListEventDataStores`                                                       |
| `insights_data`        | `cloudtrail:DescribeTrails`, `cloudtrail:ListInsightsData`                             |
| `insights_metric_data` | `cloudtrail:LookupEvents`, `cloudtrail:DescribeTrails`, `cloudtrail:ListInsightsData`  |
| `lake_queries`         | `cloudtrail:ListEventDataStores`, `cloudtrail:ListQueries`, `cloudtrail:DescribeQuery` |

## Adding a data source

<SourceSetupIntro />

When linking AWS CloudTrail, you'll need:

- **AWS access key ID** – the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** – the corresponding secret access key.
- **AWS session token** (optional) – only required if you are using temporary STS credentials. Temporary credentials expire, so update them before scheduled syncs run.
- **AWS region** – the AWS region to sync data from (e.g., `us-east-1`).

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
        "cloudtrail:LookupEvents",
        "cloudtrail:DescribeTrails",
        "cloudtrail:ListEventDataStores",
        "cloudtrail:ListInsightsData",
        "cloudtrail:ListQueries",
        "cloudtrail:DescribeQuery"
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

| Table                  | Sync mode    | Notes                                                                                                     |
| ---------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `events`               | Incremental  | Past 90 days of management events. Data events are excluded.                                              |
| `insight_events`       | Incremental  | Past 90 days of Insights events from trails with Insights enabled.                                        |
| `trails`               | Full refresh | Trail settings including shadow trails.                                                                   |
| `event_data_stores`    | Full refresh | CloudTrail Lake event store settings. Stored events are excluded.                                         |
| `insights_data`        | Incremental  | Past 90 days of Insights events from trails with data event Insights enabled.                             |
| `insights_metric_data` | Full refresh | Hourly API call and error rates for each activity that triggered an Insights event over the past 90 days. |
| `lake_queries`         | Incremental  | Past 7 days of Lake query history with a 1-day lookback. Does not include query results.                  |

Duplicate rows are merged by primary key, so re-read periods don't create duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If a table syncs no rows, the credential may not have access to that data or the feature may not be enabled. Check that Insights is enabled on your trails for the Insights tables, and that CloudTrail Lake is set up for the Lake tables.
- If a trail or event store is skipped during sync, PostHog logs it and continues with the remaining trails or stores. Common reasons include organization trails viewed from a member account or inactive event stores.
- CloudTrail Lake is only available to existing customers after May 31, 2026.

<TroubleshootingLink />
