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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Cost Anomaly Detection connector syncs anomalies, anomaly monitors, anomaly subscriptions, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

An IAM user or role with read access to Cost Anomaly Detection. PostHog only reads data, so read access is enough. You can authenticate with access keys or by letting PostHog assume an IAM role in your AWS account.

## Adding a data source

<SourceSetupIntro />

Sync the cost anomalies AWS detected on your account.

Create an IAM user or role with the `ce:GetAnomalies`, `ce:GetAnomalyMonitors` and `ce:GetAnomalySubscriptions` permissions. Connect with the IAM role, or paste an access key ID and secret access key. Add a session token too if you are using temporary credentials.

Cost Explorer has to be enabled once in the AWS console, and it can take up to 24 hours before data is ready. AWS keeps anomalies for 90 days, so that is as far back as a first sync reaches. You only see the monitors and subscriptions created by the account you connect, so connect the management (payer) account for organization-wide coverage.

When linking AWS Cost Anomaly Detection, you choose how to authenticate:

- **IAM role** – select **IAM role** and PostHog assumes a role in your AWS account. No keys to rotate.
- **Access keys** – select **Access keys** and enter the access key ID and secret access key for your IAM user. Add a session token if you are using temporary credentials.

## Creating IAM credentials

### Option 1: IAM role (recommended)

1. In the AWS Console, go to **IAM** > **Roles** and create a new role.
2. Select **Custom trust policy** and paste the trust policy shown in PostHog when you select **IAM role**. This lets PostHog's AWS account assume the role.
3. Attach a policy with the permissions below.
4. Copy the **Role ARN** – PostHog fills it in automatically once the role is linked.

### Option 2: IAM user (access keys)

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the permissions below.
3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you'll need both when linking the source in PostHog.

### Required permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ce:GetAnomalies", "ce:GetAnomalyMonitors", "ce:GetAnomalySubscriptions"],
      "Resource": "*"
    }
  ]
}
```

## Sync modes

<SyncModes />

All AWS Cost Anomaly Detection tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, check that the IAM user or role has the required permissions. For access keys, verify the key ID and secret are correct and the key is still active.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
