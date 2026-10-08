---
title: Linking Baserow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Baserow
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

<CalloutBox icon="IconFlask" title="Alpha source" type="action">

The Baserow source is currently in **alpha**. If you run into issues, please let us know.

</CalloutBox>

The Baserow connector syncs the tables from your Baserow databases into the PostHog data warehouse, so you can query your no-code data alongside your product data. Each Baserow table becomes its own warehouse table, with your field names as columns.

It works with both Baserow's hosted service at [baserow.io](https://baserow.io) and self-hosted Baserow instances.

## Prerequisites

You need:

- A Baserow database token. Create one in Baserow under **Settings > Database tokens**, and enable **read** permission for the databases or tables you want to sync.
- For self-hosted Baserow: an instance reachable over HTTPS from the internet. Plain `http://` instance URLs are not supported.

## Adding a data source

<SourceSetupIntro />

When linking Baserow, provide:

1. **Database token**: the token created above.
2. **Instance URL** (optional): your self-hosted Baserow host, e.g. `https://baserow.example.com`. Leave it blank to use Baserow's hosted service.

PostHog then lists every table your token can see, across all databases in its workspace. Tables without read permission on the token are flagged in the picker, so you can either deselect them or enable read access in Baserow's token settings.

## Sync modes

<SyncModes />

Baserow's row listing API has no server-side "updated since" filter, so every table syncs as a full refresh. Rows are fetched with your field names as column names, plus the row's `id` and `order`.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid Baserow database token**: the token doesn't exist or has been revoked. Create a new database token in Baserow and reconnect.
- **A table fails to sync with a permission error**: the token's read toggle is off for that table. In Baserow, open **Settings > Database tokens** and enable read access for the table, then re-run the sync.
- **A table stops syncing after being renamed**: renames are fine for existing syncs (PostHog tracks the underlying table id), but the table appears under its new name when you add new schemas.

<TroubleshootingLink />
