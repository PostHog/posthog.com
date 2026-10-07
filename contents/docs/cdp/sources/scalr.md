---
title: Linking Scalr as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Scalr
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Scalr connector syncs your Terraform and OpenTofu infrastructure data – environments, workspaces, and runs – into PostHog, so you can analyze infrastructure-as-code activity alongside your product data.

> **Note:** This source is in **alpha**. If you run into issues, please [let us know](https://app.posthog.com/home#supportModal).

## Prerequisites

You need a [Scalr](https://www.scalr.com/) account with API access. Create a service account token in Scalr with read access to environments, workspaces, and runs.

To create a token, go to **Account scope > IAM > Service accounts** in Scalr and generate a new token with the required permissions.

## Adding a data source

<SourceSetupIntro />

When linking Scalr, you'll need:

- **Scalr hostname** – the public hostname of your Scalr account (e.g., `example.scalr.io`).

- **Account ID** – your Scalr account ID (e.g., `acc-example`). Find this in your Scalr account settings.

- **API token** – a service account token with read access to environments, workspaces, and runs.

## Sync modes

<SyncModes />

The `workspaces` table supports incremental sync using the `updated_at` field. The `environments` and `runs` tables use full refresh only.

Runs use full refresh because their status changes over time and the Scalr API doesn't expose an update filter for this resource.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
