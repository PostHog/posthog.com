---
title: Linking AWS Budgets as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsBudgets
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Budgets connector syncs budgets, budget performance history, notifications, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

An IAM user or role with the `budgets:ViewBudget` permission. PostHog only reads data, so read access is enough. You can authenticate with access keys or with an IAM role that trusts PostHog.

## Adding a data source

<SourceSetupIntro />

PostHog gives you two ways to connect:

- **Access keys** – create an IAM user with the `budgets:ViewBudget` permission, then paste its access key ID and secret access key. Add a session token too if you are using temporary credentials.
- **IAM role** – create an IAM role with the `budgets:ViewBudget` permission and a trust policy that allows PostHog to assume it. Then select **IAM role** in the source setup and choose your role connection.

With an IAM role, PostHog reads with short-lived credentials and stores no key.

AWS Budgets is a global service, so there is no region to pick. PostHog looks up which account the credentials belong to and reads that account's budgets.

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** (for access keys) or **IAM** > **Roles** (for an IAM role) and create a new user or role.
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["budgets:ViewBudget"],
      "Resource": "*"
    }
  ]
}
```

3. For access keys, create an access key for the user under **Security credentials** > **Access keys** and copy the **Access key ID** and **Secret access key**.
4. For an IAM role, add a trust policy that allows PostHog's AWS account to assume the role with an external ID. Then create a role connection in PostHog under **Data pipeline** > **Sources**.

## Sync modes

<SyncModes />

All AWS Budgets tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, check that the access key or IAM role credentials are valid. For access keys, verify the key ID and secret are correct and still active. For IAM roles, check the trust policy and that the role has the required permissions.
- If a table syncs no rows, the credential may not have access to that data. Check that `budgets:ViewBudget` is granted to the IAM user or role, then reconnect the source.

<TroubleshootingLink />
