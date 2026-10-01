---
title: Linking AWS Cost Anomaly Detection as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsCostAnomalyDetection
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AWS Cost Anomaly Detection connector syncs anomalies, anomaly monitors, anomaly subscriptions, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync the cost anomalies AWS detected on your account.

Create an IAM user or role with the `ce:GetAnomalies`, `ce:GetAnomalyMonitors` and `ce:GetAnomalySubscriptions` permissions, then paste its access key ID and secret access key. Add a session token too if you are using temporary credentials.

Cost Explorer has to be enabled once in the AWS console, and it can take up to 24 hours before data is ready. AWS keeps anomalies for 90 days, so that is as far back as a first sync reaches. You only see the monitors and subscriptions created by the account you connect, so connect the management (payer) account for organization-wide coverage.

You'll be asked for:

- **AWS access key ID**: for example `AKIA...`.
- **AWS secret access key**

## Sync modes

<SyncModes />

All AWS Cost Anomaly Detection tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
