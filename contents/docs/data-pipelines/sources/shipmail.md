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

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Shipmail connector syncs message analytics, mailboxes, domains, suppressions, threads, inbox threads, newsletters, audiences, audience subscribers, and organization members into the PostHog Data warehouse, so you can analyze email activity alongside your product data.

## Prerequisites

You need a Shipmail account and an API key. Grant the key the read scopes for the tables you want to sync:

- `messages:read` for message analytics
- `mailboxes:read` for mailboxes
- `domains:read` for domains
- `suppressions:read` for suppressions
- `threads:read` and `mailboxes:read` for threads
- `newsletters:read` for newsletters
- `audiences:read` for audiences and audience subscribers
- `messages:read` and `mailboxes:read` for inbox threads
- `members:read` for organization members

## Adding a data source

<SourceSetupIntro />

When linking Shipmail, create an **API key** in your [Shipmail API settings](https://shipmail.to/settings/api-keys) and grant it the required read scopes.

## Sync modes

<SyncModes />

The `messages` table supports incremental syncs using `updated_at`. Incremental sync is recommended because it captures new messages and status updates without reloading the full table.

The `mailboxes`, `domains`, `suppressions`, `threads`, `inbox_threads`, `newsletters`, `audiences`, `audience_subscribers`, and `members` tables use full refresh because their API endpoints don't support filtering by update time.

## Configuration

<SourceParameters />

## Supported tables

The `messages` table contains an analytics-safe projection. It excludes message bodies, subjects, BCC addresses, headers, attachment filenames, and free-form metadata. The `contact_addresses` and `client_reference` fields can still contain personal data.

The `threads` table requires both `threads:read` and `mailboxes:read` scopes because thread data is scoped to the mailboxes your API key can access.

The `audience_subscribers` table contains subscriber email addresses and display names. The `members` table contains organization member email addresses.

The `audiences` table contains newsletter audiences with their subscriber counts, consent source, and list cleanup settings. It requires the `audiences:read` scope.

The `inbox_threads` table contains inbox conversations for each mailbox with their attention state (such as `needs_reply`, `waiting_on_them`, `done`, `follow_up_due`, `delivery_failed`, or `no_action`), assignment, follow-up date, and reply target. It requires both `messages:read` and `mailboxes:read` scopes because inbox data is scoped to the mailboxes your API key can access.

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key in Shipmail, then reconnect.
- If a table is unavailable or returns a permission error, add its required read scope to the API key, then try the sync again.

<TroubleshootingLink />
