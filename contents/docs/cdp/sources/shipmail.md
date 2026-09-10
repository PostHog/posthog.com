---
title: Linking Shipmail as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Shipmail
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Shipmail connector syncs message analytics, mailboxes, domains, and suppressions into the PostHog Data warehouse, so you can analyze email activity alongside your product data.

## Prerequisites

You need a Shipmail account and an API key. Grant the key the read scopes for the tables you want to sync:

- `messages:read` for message analytics
- `mailboxes:read` for mailboxes
- `domains:read` for domains
- `suppressions:read` for suppressions

## Adding a data source

<SourceSetupIntro />

When linking Shipmail, create an **API key** in your [Shipmail API settings](https://shipmail.to/settings/api-keys) and grant it the required read scopes.

## Sync modes

<SyncModes />

The `messages` table supports incremental syncs using `updated_at`. Incremental sync is recommended because it captures new messages and status updates without reloading the full table.

The `mailboxes`, `domains`, and `suppressions` tables use full refresh because their API endpoints don't support filtering by update time.

## Configuration

<SourceParameters />

## Supported tables

The `messages` table contains an analytics-safe projection. It excludes message bodies, subjects, BCC addresses, headers, attachment filenames, and free-form metadata. The `contact_addresses` and `client_reference` fields can still contain personal data.

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in Shipmail, then reconnect.
- If a table is unavailable or returns a permission error, add its required read scope to the API key, then try the sync again.

<TroubleshootingLink />
