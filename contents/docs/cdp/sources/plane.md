---
title: Linking Plane as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: Plane
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The Plane connector syncs projects, work items, cycles, modules, labels, states, and members from a Plane workspace, so you can report on delivery next to product usage.

## Prerequisites

- A Plane Cloud workspace, or a self-hosted Plane instance on a release with the v2 API, reachable from the public internet over https.
- A member account in that workspace.

## Adding a data source

<SourceSetupIntro />

You need:

1. **API key**: in Plane, go to **Profile settings** > **Personal access tokens** and click **Add personal access token**. The token reads everything its owner can see in the workspace.
2. **Workspace slug**: the part after the domain in your Plane URL, for example `my-team` in `app.plane.so/my-team/projects`.
3. **Instance URL** (self-hosted only): the https address of your Plane instance, for example `https://plane.example.com`. Leave it blank for Plane Cloud.

## Sync modes

<SyncModes />

The `work_items` table supports incremental and append syncs on `updated_at` or `created_at`.
Plane does not change `updated_at` when a work item is archived or restored, so an incremental sync does not pick up those two changes.
Run a full refresh to catch them.
The other tables are small and sync with a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `work_items`, `projects`, `cycles`, and `modules` tables include archived records.
Draft work items are left out.

## Troubleshooting

- **"Plane rejected your API key"**: the token is wrong, expired, or deleted. Create a new one.
- **"Plane couldn't find that workspace"**: check the workspace slug, the part after the domain in your Plane URL.
- **"Enter the workspace slug only"**: paste only the slug, for example `my-team`, not the full URL.
- **"Your Plane API key can't read this workspace"**: use a key from a member of the workspace.
- **"This Plane workspace's plan doesn't include the feature this table reads"**: turn that table off, or upgrade the Plane plan.

<TroubleshootingLink />
