---
title: Linking Sanity as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Sanity
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Sanity connector imports content documents and asset metadata from a [Sanity](https://www.sanity.io) dataset into the PostHog data warehouse. Sanity is a headless CMS that stores structured content as typed documents. This connector creates one table per document type in your schema, plus tables for image and file asset metadata.

Drafts and release versions are included in every sync.

## Prerequisites

You need a Sanity project with a dataset and an API token that has read access. Robot tokens are recommended, but personal tokens also work.

## Adding a data source

<SourceSetupIntro />

When linking Sanity, you'll need:

- **Project ID** — found in your Sanity project settings.
- **Dataset** — the name of the dataset to import (e.g., `production`).
- **API token** — a robot token or personal token with read (Viewer) permissions.

To get these:

1. Log in to [Sanity](https://www.sanity.io) and go to [sanity.io/manage](https://www.sanity.io/manage).
2. Select your project. The **Project ID** is shown at the top of the project page.
3. Note the **Dataset** name you want to import (visible under the **Datasets** tab).
4. Go to the **API** tab → **Tokens**.
5. Click **Add API token**, give it a name, and select **Viewer** permissions.
6. Copy the token value — you won't be able to see it again.
7. Paste the Project ID, Dataset, and API token into PostHog.

## Sync modes

<SyncModes />

All Sanity tables support incremental sync on the `_updatedAt` field. How deleted documents are handled depends on the sync mode:

- **Full refresh** removes deleted documents. Each sync replaces the table contents.
- **Incremental sync** imports new and updated documents but does **not** remove deleted documents. Deleted documents remain until the next full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Tables are created dynamically based on the document types in your Sanity schema. For example, if your schema has `post`, `author`, and `category` types, a table is created for each.

Two built-in tables are always available:

- `sanity.imageAsset` — image metadata (dimensions, URLs, format, etc.)
- `sanity.fileAsset` — file metadata (URLs, size, format, etc.)

Asset binaries are not imported — only metadata.

## Troubleshooting

- **401 — Invalid API token**: Sanity rejected the API token. Replace the token and reconnect the source.
- **403 — Insufficient permissions**: The Sanity token cannot read this dataset. Give the token read access (Viewer role) and reconnect.
- **404 — Project or dataset not found**: The Sanity project or dataset does not exist. Check the Project ID and Dataset in the source settings.
- **410 — API version no longer supported**: Sanity no longer supports this API version. Update the source API version.

<TroubleshootingLink />
