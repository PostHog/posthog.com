---
title: Linking AWS Organizations as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AwsOrganizations
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The AWS Organizations connector syncs accounts, organization, organizational units, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync your AWS organization structure, so cost and usage data can be read by account name, organizational unit, and tag.

Create an IAM user or role with the `organizations:DescribeOrganization`, `organizations:ListAccounts`, `organizations:ListRoots`, `organizations:ListOrganizationalUnitsForParent`, `organizations:ListPolicies` and `organizations:ListTagsForResource` permissions, then paste its access key ID and secret access key. Add a session token too if you are using temporary credentials.

Use a key from the management account or from a member account that is a delegated administrator. Keys from other member accounts can only read the organization table.

AWS Organizations is a global service, so there is nothing to pick a region for. This source syncs the accounts, organizational units, and policies in the standard AWS partition.

You'll be asked for:

- **AWS access key ID**: for example `AKIA...`.
- **AWS secret access key**

## Sync modes

<SyncModes />

All AWS Organizations tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the AWS access key ID is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
