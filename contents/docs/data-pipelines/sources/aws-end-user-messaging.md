---
title: Linking AWS End User Messaging as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsEndUserMessaging
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The AWS End User Messaging connector syncs the SMS and voice resources of AWS End User Messaging (formerly Amazon Pinpoint SMS) into the PostHog Data Warehouse. You can analyze phone numbers, pools, sender IDs, configuration sets, opt-outs, keywords, registrations, spend limits, and account quotas alongside your product data.

The AWS End User Messaging API does not return sent or received messages, so this source does not include them. To analyze message events, send them from a configuration set to an event destination such as Amazon S3, then link that bucket as an [Amazon S3 source](/docs/data-pipelines/sources/s3).

## Prerequisites

- An AWS account with AWS End User Messaging SMS enabled in the region that you sync.
- An IAM user or role that can read your SMS and voice resources.

AWS End User Messaging data is regional. Connect one source for each AWS region that you use.

## Adding a data source

<SourceSetupIntro />

When you link AWS End User Messaging, you need:

- **AWS access key ID**: the access key ID of your IAM user, for example `AKIA...`.
- **AWS secret access key**: the secret for that access key.
- **AWS region**: the region of your resources, for example `us-east-1`.
- **AWS session token** (optional): only for temporary credentials. Temporary credentials expire. Update them before the next scheduled sync, or use a permanent access key for recurring imports.

### Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a user.
2. Attach a policy that allows `sms-voice:Describe*`, or only the actions for the tables that you select:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sms-voice:DescribePhoneNumbers",
        "sms-voice:DescribePools",
        "sms-voice:DescribeSenderIds",
        "sms-voice:DescribeConfigurationSets",
        "sms-voice:DescribeOptOutLists",
        "sms-voice:DescribeOptedOutNumbers",
        "sms-voice:DescribeKeywords",
        "sms-voice:DescribeRegistrations",
        "sms-voice:DescribeVerifiedDestinationNumbers",
        "sms-voice:DescribeProtectConfigurations",
        "sms-voice:DescribeSpendLimits",
        "sms-voice:DescribeAccountAttributes",
        "sms-voice:DescribeAccountLimits"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Open the new IAM user. Under **Security credentials** > **Access keys**, create an access key.
4. Copy the **Access key ID** and **Secret access key**. You need both when you link the source in PostHog.

The `opted_out_numbers` table also reads your opt-out lists, and the `keywords` table also reads your phone numbers and pools. Grant the `Describe` actions for those parent tables too.

## Sync modes

<SyncModes />

All tables use full refresh, because the AWS End User Messaging API has no time filter. Each sync reads every resource again and replaces the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **AWS denied access**: the IAM user or role does not have the `sms-voice` `Describe` action for a table that you selected. Add the action from the policy above, or deselect the table.
- **AWS rejected the credentials, the access key ID, or the signature**: check that the access key ID and the secret access key are correct, and that the key is still active in IAM. If you use temporary credentials, check the session token.
- **The AWS session token expired**: connect again with current credentials.
- **Enable AWS End User Messaging SMS in this account and region**: turn on AWS End User Messaging SMS in the AWS Console for the region that you entered, then try again.
- **Could not reach AWS End User Messaging in this region**: check that the region code is correct, for example `us-east-1`, and that AWS End User Messaging SMS is available in that region.

<TroubleshootingLink />
