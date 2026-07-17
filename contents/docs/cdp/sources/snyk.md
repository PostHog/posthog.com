---
title: Linking Snyk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Snyk
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Snyk connector pulls your organizations, projects, targets, and vulnerability issues into the PostHog Data warehouse, so you can track your security backlog, severity mix, and remediation trends alongside your product data.

## Prerequisites

You need a Snyk account with REST API access so you can generate an API token. The token can read every organization it has access to, so a service account token scoped to the organizations you want to sync works well.

## Adding a data source

<SourceSetupIntro />

When linking Snyk, you'll need:

- **API token** – generate a personal token in your [Snyk account settings](https://app.snyk.io/account), or create a service account token in your organization or group settings.
- **Region** – the region your Snyk account is hosted on (US, EU, or AU). Snyk's regional stacks are independent, and a token only works on its own region.
- **Organization ID** (optional) – limit the sync to a single organization. Leave it blank to sync every organization the token can access. You can find the ID in your organization's settings page.

## Sync modes

<SyncModes />

The issues table supports incremental syncs on `updated_at` (recommended) or `created_at`. The other tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Tables scoped to an organization (projects, targets, and issues) include an `organization_id` column, so you can join them back to the organizations table.

## Troubleshooting

- If you see an authentication error, your Snyk API token may be invalid or revoked. Generate a new token in your Snyk account settings, then reconnect.
- If the connection fails with a valid token, check that the selected region matches where your Snyk account is hosted.
- If an organization is missing from the sync, check that the token has access to it, or clear the organization ID field to sync everything the token can see.

<TroubleshootingLink />
