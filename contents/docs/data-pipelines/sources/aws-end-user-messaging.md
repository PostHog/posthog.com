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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The AWS End User Messaging connector syncs SMS and voice resources from AWS End User Messaging (formerly Amazon Pinpoint SMS) into PostHog. It reads from one AWS region, so connect one source per region you use.

This source syncs account-level resource data from the SMS and Voice v2 API. The API does not return sent or received messages. To analyze message events, send them from a configuration set to an event destination such as Amazon S3, then connect that bucket with the [S3 source](/docs/data-pipelines/sources/s3).

## Prerequisites

You need an AWS account with End User Messaging SMS enabled in the region you want to sync.

You also need an IAM user or role with the `sms-voice:Describe*` actions, or only the specific actions for the tables you select:

- `sms-voice:DescribePhoneNumbers`
- `sms-voice:DescribePools`
- `sms-voice:DescribeSenderIds`
- `sms-voice:DescribeConfigurationSets`
- `sms-voice:DescribeOptOutLists`
- `sms-voice:DescribeOptedOutNumbers`
- `sms-voice:DescribeKeywords`
- `sms-voice:DescribeRegistrations`
- `sms-voice:DescribeVerifiedDestinationNumbers`
- `sms-voice:DescribeProtectConfigurations`
- `sms-voice:DescribeSpendLimits`
- `sms-voice:DescribeAccountAttributes`
- `sms-voice:DescribeAccountLimits`

Some tables depend on other tables during sync (fan-out). If you select these tables, grant permissions for their parent tables too:

- **opted_out_numbers** - Also requires `sms-voice:DescribeOptOutLists`, because PostHog first lists opt-out lists and then queries opted-out numbers from each one.

- **keywords** - Also requires `sms-voice:DescribePhoneNumbers` and `sms-voice:DescribePools`, because PostHog first lists phone numbers and pools and then queries keywords from each one.

## Adding a data source

<SourceSetupIntro />

When linking AWS End User Messaging, you need:

- **AWS access key ID** - The access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key** - The corresponding secret access key.
- **AWS region** - The region to sync from, like `us-east-1`.
- **AWS session token** (optional) - Only required if you are using temporary STS credentials. Temporary credentials expire, so update them before the next scheduled sync.

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sms-voice:Describe*",
      "Resource": "*"
    }
  ]
}
```

If you only want to sync specific tables, replace `sms-voice:Describe*` with the individual actions listed in [Prerequisites](#prerequisites).

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key**. You need both when linking the source in PostHog.

## Sync modes

<SyncModes />

All tables use **full refresh** sync because the SMS and Voice v2 API has no time filter parameter that would enable incremental sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Available tables

- **phone_numbers** - Origination phone numbers in the account, with their type, capabilities, and status.
- **pools** - Pools of origination identities, with their two-way and opt-out settings.
- **sender_ids** - Sender IDs in the account, with their country, message types, and registration state.
- **configuration_sets** - Configuration sets, with their event destinations and default sending settings.
- **opt_out_lists** - Opt-out lists in the account.
- **opted_out_numbers** - Destination phone numbers in each opt-out list, with the time they opted out.
- **keywords** - Keywords on each phone number and pool, with the message and action for each keyword.
- **registrations** - Registrations for phone numbers and sender IDs, with their type, status, and versions.
- **verified_destination_numbers** - Destination phone numbers that are verified for sending from a simulator or sandbox account.
- **protect_configurations** - Protect configurations that control which countries messages can go to.
- **spend_limits** - Monthly spend limits for text, voice, and media messages.
- **account_attributes** - Account attributes, such as the account tier and the default protect configuration.
- **account_limits** - Account quotas, with the quantity in use and the maximum for each resource type.

## Troubleshooting

- If you see "AWS rejected the access key ID", check that the access key ID is correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If you see "AWS session token expired", connect again with current credentials.
- If you see "AWS denied access", grant the IAM user or role the `sms-voice:Describe*` actions for the tables you select. For fan-out tables like `opted_out_numbers` and `keywords`, also grant the parent table actions listed in [Prerequisites](#prerequisites).
- If you see "Enable AWS End User Messaging SMS", enable the service in your AWS account and region, then try again.

<TroubleshootingLink />
