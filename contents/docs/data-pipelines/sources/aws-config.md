---
title: Linking AWS Config as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsConfig
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS Config connector syncs resource configurations, compliance status, evaluation results, conformance packs, remediation executions, and aggregated resources into the PostHog data warehouse. You can query AWS Config data alongside your product data to understand how infrastructure changes affect your users.

## Prerequisites

- An AWS account with AWS Config enabled and a configuration recorder set up in the region you want to sync.
- Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough. You can connect with an [IAM role](#iam-role-recommended) or with [access keys](#access-keys).

## Adding a data source

<SourceSetupIntro />

When linking AWS Config, you need:

- **AWS region** – the AWS region to sync data from (e.g. `us-east-1`). Defaults to `us-east-1`. Only the selected region is synced.
- An authentication method – either an [IAM role](#iam-role-recommended) or [access keys](#access-keys).

## AWS authentication

### IAM role (recommended)

With IAM role assumption, PostHog uses AWS STS to assume a role in your AWS account and obtain short-lived credentials. This avoids storing long-lived access keys. Credentials refresh hourly, and the role session is scoped to only the IAM actions AWS Config needs.

To set up IAM role authentication:

1. In the AWS Config setup form, select the **IAM role** tab.
2. Create an IAM role in your AWS account with a trust policy that allows PostHog's warehouse sources role to assume it. The PostHog role ARN depends on your cloud region:
   - **US Cloud** – `arn:aws:iam::309986977637:role/posthog-external-warehouse-sources`
   - **EU Cloud** – `arn:aws:iam::623789312881:role/posthog-external-warehouse-sources`
3. Add an `sts:ExternalId` condition to the trust policy. Set the value to `posthog-<your_organization_id>` (your organization ID is shown in the setup modal). PostHog verifies this condition is enforced – syncs fail without it.
4. Attach a [permissions policy](#required-iam-permissions) to the role that grants the AWS Config read actions for the tables you want to sync.
5. Paste the role ARN (e.g. `arn:aws:iam::123456789012:role/posthog-warehouse-config`) into the **IAM role ARN** field in the setup form.

Here's an example trust policy for US Cloud:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::309986977637:role/posthog-external-warehouse-sources"
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

For EU Cloud, replace the principal ARN with `arn:aws:iam::623789312881:role/posthog-external-warehouse-sources`.

### Access keys

With access keys, you provide an AWS access key ID and secret access key that PostHog stores encrypted. This method works but uses long-lived credentials. Prefer IAM role assumption when possible.

To set up access key authentication:

1. In the AWS Config setup form, select the **Access keys** tab.
2. Enter your **AWS access key ID** (starts with `AKIA...`) and **AWS secret access key**.
3. If you're using temporary STS credentials, also enter the **AWS session token**. Temporary credentials expire, so update them before scheduled syncs run.

### Required IAM permissions

The IAM permissions you need depend on which tables you select. To enable all tables, attach this policy to your IAM role or user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "config:DescribeComplianceByConfigRule",
        "config:DescribeConfigRules",
        "config:DescribeConfigurationAggregators",
        "config:DescribeConformancePacks",
        "config:DescribeRemediationExecutionStatus",
        "config:GetComplianceDetailsByConfigRule",
        "config:GetConformancePackComplianceDetails",
        "config:GetResourceConfigHistory",
        "config:ListConformancePackComplianceScores",
        "config:ListResourceEvaluations",
        "config:SelectAggregateResourceConfig",
        "config:SelectResourceConfig"
      ],
      "Resource": "*"
    }
  ]
}
```

If you only need specific tables, grant just the permissions for those tables:

| Table                                 | Required permissions                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `resources`                           | `config:SelectResourceConfig`                                                     |
| `config_rules`                        | `config:DescribeConfigRules`                                                      |
| `rule_compliance`                     | `config:DescribeComplianceByConfigRule`                                           |
| `conformance_packs`                   | `config:DescribeConformancePacks`                                                 |
| `conformance_pack_compliance_scores`  | `config:ListConformancePackComplianceScores`                                      |
| `rule_evaluation_results`             | `config:DescribeConfigRules`, `config:GetComplianceDetailsByConfigRule`           |
| `aggregated_resources`                | `config:DescribeConfigurationAggregators`, `config:SelectAggregateResourceConfig` |
| `resource_config_history`             | `config:SelectResourceConfig`, `config:GetResourceConfigHistory`                  |
| `conformance_pack_evaluation_results` | `config:DescribeConformancePacks`, `config:GetConformancePackComplianceDetails`   |
| `remediation_execution_statuses`      | `config:DescribeConfigRules`, `config:DescribeRemediationExecutionStatus`         |
| `resource_evaluations`                | `config:ListResourceEvaluations`                                                  |

### Creating an IAM user (access keys)

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the permissions for the tables you want.
3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key** – you need both when linking the source in PostHog.

## Sync modes

<SyncModes />

| Table                                 | Sync mode    | Notes                                                                                                              |
| ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `resources`                           | Full refresh | Current configurations of recorded resources in the selected region. Excludes deleted resources.                   |
| `config_rules`                        | Full refresh | AWS Config rules, their evaluation settings, and resource scopes.                                                  |
| `rule_compliance`                     | Full refresh | Current compliance status and counts of noncompliant resources for each rule.                                      |
| `conformance_packs`                   | Full refresh | Conformance packs and their deployment settings in the selected region.                                            |
| `conformance_pack_compliance_scores`  | Full refresh | Percentage of compliant rule and resource combinations in each conformance pack.                                   |
| `rule_evaluation_results`             | Full refresh | Latest evaluation result for each resource that each AWS Config rule evaluated.                                    |
| `aggregated_resources`                | Full refresh | Current configurations of resources across the accounts and regions of each configuration aggregator.              |
| `resource_config_history`             | Incremental  | Configuration items recorded for each current resource. Without a saved incremental value, reads the last 90 days. |
| `conformance_pack_evaluation_results` | Full refresh | Latest evaluation result for each rule and resource in each conformance pack.                                      |
| `remediation_execution_statuses`      | Full refresh | State and step details of the latest remediation execution for each resource and rule.                             |
| `resource_evaluations`                | Incremental  | Proactive evaluations of resource configurations, usually run before deployment.                                   |

Duplicate rows are merged by primary key, so re-read periods don't create duplicates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Authorization or access denied error** – the IAM role or user doesn't have the required permissions for the selected tables. Check the [permissions table](#required-iam-permissions) and update the policy.
- **Signature or credential error** – re-enter the secret access key. If you're using temporary credentials, the session token may have expired.
- **"Enable AWS Config" or "Set up a recorder" error** – AWS Config isn't enabled in the selected region, or no configuration recorder is set up. Enable AWS Config and create a recorder in the AWS Console.
- **No rows synced for a table** – the credential may not have access to that data, or the feature may not be configured. For example, the `aggregated_resources` table requires at least one configuration aggregator, and `conformance_packs` requires conformance packs to be deployed.
- **IAM role assumption fails** – verify the trust policy includes the correct PostHog role ARN for your cloud region and that the external ID matches `posthog-<your_organization_id>`. PostHog checks that the external ID condition is enforced.

<TroubleshootingLink />
