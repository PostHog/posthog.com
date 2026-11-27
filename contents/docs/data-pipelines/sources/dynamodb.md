---
title: Linking DynamoDB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: DynamoDB
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The DynamoDB connector syncs your database data into the PostHog data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need an IAM role or IAM user with read access to DynamoDB. PostHog only reads data, so read access is enough.

The required permissions are:

- `dynamodb:ListTables`
- `dynamodb:DescribeTable`
- `dynamodb:Scan`

## Adding a data source

<SourceSetupIntro />

Connect an IAM role or an access key with read access to DynamoDB to import your tables. Tables are read with a full table scan, so every sync uses read capacity on the table.

You can authenticate with either:

- **IAM role** (recommended) — provide the ARN of a role in your AWS account. PostHog assumes it with short-lived credentials.
- **Access keys** — provide an access key ID and secret access key for an IAM user.

You'll also be asked for:

- **AWS region**: the region your DynamoDB tables are in, for example `us-east-1`.

## Authentication

### IAM role (recommended)

With IAM role assumption, PostHog uses AWS STS to assume a role in your AWS account and obtain short-lived credentials. This avoids storing long-lived access keys.

To set up IAM role authentication:

1. In the source setup form, select the **Assume IAM role** tab.
2. Create an IAM role in your AWS account with a trust policy that allows PostHog's role to assume it. The PostHog role ARN depends on your cloud region:
   - **US Cloud** — `arn:aws:iam::309986977637:role/posthog-external-batch-exports`
   - **EU Cloud** — `arn:aws:iam::623789312881:role/posthog-external-batch-exports`
3. Add an `sts:ExternalId` condition to the trust policy. Set the value to `posthog-<your_organization_id>` (your organization ID is shown in the setup form). PostHog verifies this condition is enforced.
4. Attach a permissions policy to the role that grants the DynamoDB read permissions listed above.
5. Paste the role ARN (e.g., `arn:aws:iam::123456789012:role/posthog-dynamodb`) into the **IAM role ARN** field.

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
      "Action": ["dynamodb:ListTables", "dynamodb:DescribeTable", "dynamodb:Scan"],
      "Resource": "*"
    }
  ]
}
```

If any of your tables use a customer managed KMS key, also grant `kms:Decrypt` on that key.

> **Note:** Self-hosted users should check with their instance administrator for the correct PostHog role ARN to trust.

### Access keys

With access keys, you provide an AWS access key ID and secret access key that PostHog stores encrypted. This method works but uses long-lived credentials. Prefer IAM role assumption when possible.

To set up access key authentication:

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:ListTables", "dynamodb:DescribeTable", "dynamodb:Scan"],
      "Resource": "*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** — you'll need both when linking the source in PostHog.

## Sync modes

<SyncModes />

All DynamoDB tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, check that your credentials are correct. For access keys, verify the key ID and secret. For IAM roles, verify the role ARN and that the trust policy includes the correct PostHog principal and external ID.
- If you see "These AWS credentials can't read DynamoDB", grant `dynamodb:ListTables`, `dynamodb:DescribeTable`, and `dynamodb:Scan` to the IAM user or role.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
