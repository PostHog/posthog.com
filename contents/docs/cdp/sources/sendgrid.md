---
title: Linking SendGrid as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SendGrid
---

import AlphaRelease from "../_snippets/alpha-release.mdx"
import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The SendGrid connector pulls your SendGrid data into the PostHog data warehouse, covering suppressions, unsubscribe groups, marketing lists, and email templates.

## Prerequisites

You need a SendGrid account with permission to create API keys. Marketing lists additionally require an account with Marketing Campaigns, which is covered under [required scopes](#required-scopes) below.

## Adding a data source

<SourceSetupIntro />

The only credential this source needs is a SendGrid API key. Create one in your [SendGrid API keys settings](https://app.sendgrid.com/settings/api_keys) under **Settings > API Keys**. Give it **Restricted Access** and grant read access to the areas you want to sync:

- **Suppressions** for bounces, blocks, invalid emails, spam reports, global unsubscribes, and unsubscribe groups
- **Marketing** for marketing lists
- **Template Engine** for templates

The key value starts with `SG.` and SendGrid shows it only once, so copy it before closing the dialog.

### Required scopes

SendGrid grants scopes per endpoint, so a key that reads one table often cannot read another. Each table needs the scope below, spelled as SendGrid's `/v3/scopes` endpoint reports it:

| Table                 | SendGrid scope                      |
| --------------------- | ----------------------------------- |
| `bounces`             | `suppression.bounces.read`          |
| `blocks`              | `suppression.blocks.read`           |
| `invalid_emails`      | `suppression.invalid_emails.read`   |
| `spam_reports`        | `suppression.spam_reports.read`     |
| `global_unsubscribes` | `suppression.unsubscribes.read`     |
| `unsubscribe_groups`  | `asm.groups.read`                   |
| `marketing_lists`     | `marketing.read`                    |
| `templates`           | `templates.read`                    |

You don't have to grant every scope. When you paste the key, PostHog checks each table and flags the ones the key can't read, so you can connect with a narrow key and sync only what you need.

<CalloutBox icon="IconWarning" title="Marketing lists need Marketing Campaigns" type="caution">

`marketing_lists` reads SendGrid's Marketing Campaigns API, so `marketing.read` alone isn't always enough. Accounts without Marketing Campaigns, and accounts still on legacy Marketing Campaigns, return a permission error for this table however the key is scoped. If that's your account, leave `marketing_lists` unselected. Every other table still syncs.

</CalloutBox>

## Sync modes

<SyncModes />

The suppression tables filter server side on their immutable `created` timestamp, so they sync incrementally. The remaining tables have no timestamp filter in the SendGrid API and sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### A table is paused with a missing scope error

The key authenticated but isn't allowed to read that table, so adding the scope fixes it. You don't need to generate a new key:

1. In SendGrid, go to **Settings > API Keys** and edit the existing key.
2. Add read access for the table's area, using the [required scopes](#required-scopes) table above.
3. In PostHog, re-enable the sync for that table. A paused table stays paused until you turn it back on.

Allow a few minutes after updating a key before retrying, since SendGrid takes a moment to apply new permissions.

If only `marketing_lists` fails while the other tables sync, check whether your account has Marketing Campaigns before changing scopes. Without it, no scope grant will make that table sync.

### The key is rejected when adding the source

A rejected key is invalid or expired rather than under-scoped. Generate a new key in SendGrid and paste the full value, including the `SG.` prefix.

<TroubleshootingLink />
