---
title: Linking HashiCorp (HCP Terraform / Terraform Cloud) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TerraformCloud
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The HashiCorp (HCP Terraform / Terraform Cloud) connector syncs organizations, projects, teams, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Sync organizations, projects, teams, workspaces, runs, and state versions from HCP Terraform (formerly Terraform Cloud) to analyze infrastructure change frequency, plan/apply durations, and failure rates.

Create an API token in your HCP Terraform organization settings under **API tokens** - an organization token is recommended so every workspace is visible. Team and user tokens also work but only see the workspaces they have access to.

Only the SaaS API at `app.terraform.io` is supported; self-hosted Terraform Enterprise is not currently supported.

You'll be asked for:

- **API token**
- **Organization name**: for example `my-organization`.

## Sync modes

<SyncModes />

All HashiCorp (HCP Terraform / Terraform Cloud) tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
