---
title: Linking Amazon Kinesis as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AmazonKinesis
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Amazon Kinesis connector imports the records of your Kinesis data streams into the PostHog Data Warehouse, so you can analyze event streams alongside your product data.
Each stream becomes a table.

## Prerequisites

- An AWS account with at least one Kinesis data stream.
- An IAM user with an access key that can read your streams.

PostHog only reads records.
It does not register a consumer or change a stream.

## Adding a data source

<SourceSetupIntro />

When you link Amazon Kinesis, you need:

- **AWS access key ID**: the access key ID of your IAM user, for example `AKIA...`.
- **AWS secret access key**: the secret for that access key.
- **AWS region**: the region of your streams, for example `us-east-1`.
- **AWS session token** (optional): only for temporary credentials. Temporary credentials expire, and scheduled syncs fail after that. Use a permanent access key for recurring imports.

PostHog lists the streams in the region, and you select the ones to import.

### Creating IAM credentials

1. In the AWS Console, go to **IAM** > **Users** and create a user.
2. Attach a policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "kinesis:ListStreams",
        "kinesis:DescribeStreamSummary",
        "kinesis:ListShards",
        "kinesis:GetShardIterator",
        "kinesis:GetRecords"
      ],
      "Resource": "*"
    }
  ]
}
```

3. If a stream is encrypted with a customer managed KMS key, also allow `kms:Decrypt` on that key.
4. Open the new IAM user. Under **Security credentials** > **Access keys**, create an access key.

## Sync modes

<SyncModes />

Use incremental sync for Kinesis.
Each incremental sync reads the records that arrived since the last sync, from a stored position in each shard.
A full refresh reads every record that the stream still keeps, then replaces the table.

The primary key of each table is `_kinesis_shard_id` plus `_kinesis_sequence_number`.
The incremental field is `_kinesis_arrival_timestamp`.

<CalloutBox icon="IconWarning" title="Sync more often than your stream keeps records" type="caution">

Kinesis keeps records for 24 hours unless you increase the retention period of the stream.
If the time between two syncs is longer than the retention period, Kinesis deletes some records before PostHog reads them.
Set a sync frequency that is shorter than the retention period.

</CalloutBox>

## How records become rows

- A record whose data is a JSON object gets one column for each top-level key.
- A record whose data is other JSON, such as an array or a number, goes to the `value` column as JSON text.
- A record whose data is not JSON goes to `_kinesis_raw_data`. The `_kinesis_raw_data_encoding` column is `utf-8` for text and `base64` for binary data.
- A record that the Kinesis Producer Library (KPL) aggregated goes to `_kinesis_raw_data` as base64. PostHog does not unpack these records.
- Every row also has `_kinesis_shard_id`, `_kinesis_sequence_number`, `_kinesis_partition_key`, and `_kinesis_arrival_timestamp`.
- A JSON key that is not already in lowercase snake case, or that matches one of these column names, gets a prefix and a short hash. For example, `userId` becomes `_kinesis_payload_user_id_6ccb2121`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **The connection fails with an authorization error**: the access key is wrong, expired, or revoked, or the policy does not have the permissions above. Correct the key or the policy, then reconnect the source.
- **PostHog finds no streams**: check the region. Kinesis streams belong to one region.
- **A sync fails with a KMS error**: allow `kms:Decrypt` on the key of the stream, and make sure the key is enabled.
- **Your other consumers get throttled during a sync**: all consumers of a shard share its read limits. PostHog spaces its reads, but the first sync of a large stream still uses read capacity. Run the first sync at a quiet time.
- **The table was rebuilt**: when you delete a stream and create a new one with the same name, PostHog rebuilds the table from the new stream.

<TroubleshootingLink />
