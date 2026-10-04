---
title: Linking Amazon SES as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsSes
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Amazon SES connector syncs your SES account data into PostHog, so you can monitor sending health, quota, verified identities, and suppressed recipients alongside your product data.

This source syncs account-level data from the SES API. Per-message send, bounce, and complaint events are only available through [SES event destinations](https://docs.aws.amazon.com/ses/latest/dg/monitor-using-event-publishing.html), not the SES API, so they are not included.

## Prerequisites

You need an AWS account that sends email through Amazon SES.

You also need an IAM user or role with the following permissions:

- `ses:GetAccount`
- `ses:ListConfigurationSets`
- `ses:GetConfigurationSet`
- `ses:ListEmailIdentities`
- `ses:GetEmailIdentity`
- `ses:ListSuppressedDestinations`
- `ses:ListEmailTemplates`
- `ses:GetEmailTemplate`
- `ses:ListContactLists`
- `ses:GetContactList`
- `ses:ListDedicatedIpPools`
- `ses:GetDedicatedIpPool`
- `ses:GetDedicatedIps`
- `ses:ListCustomVerificationEmailTemplates`
- `ses:GetCustomVerificationEmailTemplate`
- `ses:ListMultiRegionEndpoints`

SES data is regional. Connect one source per AWS region you send email from.

## Adding a data source

<SourceSetupIntro />

When linking Amazon SES, you'll need:

- **AWS access key ID**: the access key ID for your IAM user or role (starts with `AKIA...`).
- **AWS secret access key**: the corresponding secret access key.
- **AWS region**: the region your SES account sends from, like `us-east-1`.
- **AWS session token** (optional): only required if you are using temporary STS credentials.

## Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a new user (or use an existing one).
2. Attach a policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:GetAccount",
        "ses:ListConfigurationSets",
        "ses:GetConfigurationSet",
        "ses:ListEmailIdentities",
        "ses:GetEmailIdentity",
        "ses:ListSuppressedDestinations",
        "ses:ListEmailTemplates",
        "ses:GetEmailTemplate",
        "ses:ListContactLists",
        "ses:GetContactList",
        "ses:ListDedicatedIpPools",
        "ses:GetDedicatedIpPool",
        "ses:GetDedicatedIps",
        "ses:ListCustomVerificationEmailTemplates",
        "ses:GetCustomVerificationEmailTemplate",
        "ses:ListMultiRegionEndpoints"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Create an access key for the user under **Security credentials** > **Access keys**.
4. Copy the **Access key ID** and **Secret access key**. You'll need both when linking the source in PostHog.

If you grant only some of these permissions, the tables you can't read are flagged in the table picker so you can deselect them.

## Sync modes

<SyncModes />

The `suppressed_destinations` table supports incremental sync using `last_update_time` as the cursor, so each sync only fetches addresses added or updated since the last one. Addresses removed from the suppression list in AWS are not deleted from the synced table.

The other tables are small and sync as a full refresh. The `account` table is a snapshot: it holds one row describing the account at the time of the latest sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see "AWS rejected the access key", check that the access key ID and secret access key are correct and that the key is still active in IAM.
- If you see a signature error, re-enter the secret access key. If you are using temporary credentials, the session token may have expired.
- If you see "missing SES read permissions", grant the `ses:` permissions listed above to the IAM user or role.
- If a sync fails with a region error, check that the region is a valid AWS region code like `us-east-1` and that your SES account sends from that region.

<TroubleshootingLink />
