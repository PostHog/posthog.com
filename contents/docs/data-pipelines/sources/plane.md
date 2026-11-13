---
title: Linking Plane as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Plane
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Plane connector syncs your workspace data into the [PostHog Data Warehouse](/docs/data-warehouse), so you can analyze work items and project progress alongside your product data.

## Prerequisites

You need a Plane Cloud workspace or a self-hosted Plane instance with the v2 API. A self-hosted instance must be reachable by PostHog over HTTPS.

Create a personal access token from an account that belongs to the workspace. The token can read everything its owner can see. Follow [Plane's API key instructions](https://developers.plane.so/api-reference/introduction#generating-an-api-key):

1. In Plane, open **Profile settings > Personal access tokens**.
2. Click **Add personal access token**.
3. Enter a title and description for the token. You can also set an expiry date.
4. Copy the token to use as the **API key** in PostHog.

## Adding a data source

<SourceSetupIntro />

When linking Plane, enter:

- **API key**: Your Plane personal access token.
- **Workspace slug**: The part after the domain in your Plane workspace URL. For example, enter `my-team` for `https://app.plane.so/my-team`. Enter only the slug, without a URL or slashes.
- **Instance URL**: Leave this blank for Plane Cloud. For self-hosted Plane, enter your instance URL, for example `https://plane.example.com`. PostHog adds the `/api/v2` path.

## Sync modes

- **Full refresh**: Available for every table. PostHog reloads the whole table on each sync.
- **Incremental**: Available only for `work_items`. PostHog fetches rows from the last synced timestamp onward. The default field, `updated_at`, captures new and updated work items. Choose `created_at` only when you need newly created work items, because changes to older items do not advance that field.

Incremental syncs do not capture deletions. Archiving a work item does not change its `updated_at` timestamp, so use a full refresh to update archive status. See [sync methods](/docs/data-pipelines/sources#sync-methods) for more guidance.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The connector includes archived projects and work items, but excludes draft work items. It also includes archived cycles and modules, and reads workflow states from archived projects, including triage states.

## Troubleshooting

- **API key rejected (401)**: Create a new personal access token in Plane, then reconnect with that token.
- **Workspace access denied (403)**: Use a token from an account that belongs to the workspace and can read the data you want to sync.
- **Workspace not found (404)**: Check the workspace slug. Enter the part after the domain in your Plane URL, without slashes or the rest of the URL.
- **Feature unavailable (402)**: Your Plane plan does not include the feature that the table reads. Turn off that table or upgrade your Plane plan.
- **Invalid instance URL or connection failure**: Leave **Instance URL** blank for Plane Cloud. For self-hosted Plane, check that the URL uses HTTPS, is reachable by PostHog, and serves the v2 API. Enter the instance URL without the `/api/v2` suffix.
- **Missing work items**: Draft work items are excluded. Check that the token owner can see the missing items in Plane. If you use incremental sync with `created_at`, updates to older items require a full refresh or a sync using `updated_at`.

<TroubleshootingLink />
