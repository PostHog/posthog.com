---
title: Linking Axiom as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Axiom
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Axiom connector syncs monitoring and configuration data – datasets, monitors, annotations, dashboards, and saved queries – into the PostHog data warehouse, so you can analyze your observability setup alongside product data.

## Prerequisites

You need an Axiom account and an API token with the right permissions:

- Create an **advanced API token** in Axiom Settings > API tokens.
- Grant **read access** to the resources you want to sync (datasets, monitors, annotations, dashboards, saved queries).
- Grant **query access** to the datasets used by your monitors.
- If you're using a **personal access token**, you also need your organization ID (find it in Axiom Settings > General).

> **Note:** API tokens can only read shared dashboards. Saved queries request `who=all`, subject to token permissions.

## Adding a data source

<SourceSetupIntro />

When linking Axiom, you'll need:

- **API token** – an advanced API token with read permissions for the resources you want to sync. Create one in Axiom Settings > API tokens. Tokens start with `xaat-...`.

- **Organization ID** (optional) – required only for personal access tokens. Find this in Axiom Settings > General.

## Sync modes

<SyncModes />

All Axiom tables (`datasets`, `monitors`, `annotations`, `dashboards`, `saved_queries`) use full refresh sync. The Axiom API doesn't expose incremental filtering for these endpoints.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a **401** authentication error, your API token is invalid or has expired. Create a new advanced API token in Axiom Settings > API tokens.

- If you see a **403** access denied error, check that the token has read permissions for the resources you're syncing. For personal access tokens, verify the organization ID is correct.

<TroubleshootingLink />
