---
title: Linking Spacelift as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Spacelift
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Spacelift connector syncs your infrastructure-as-code data into PostHog, including stacks, runs, policies, and managed resources. Use it to analyze deployment frequency, run durations, drift detection, and policy activity across your Terraform, OpenTofu, and Pulumi stacks.

## Prerequisites

You need a Spacelift account and permission to create API keys (found under **Organization settings** in Spacelift). The API key needs read access to the spaces containing the data you want to sync.

## Adding a data source

<SourceSetupIntro />

To connect Spacelift, you need three values:

1. **Account name**: the subdomain you use to access Spacelift. For example, if your Spacelift URL is `my-company.app.spacelift.io`, the account name is `my-company`.
2. **API key ID** and **API key secret**: in Spacelift, go to **Organization settings** → **API keys** and create a new API key with read access to the spaces you want to sync. Spacelift shows the key ID in the UI and provides the secret in a downloadable file when the key is created.

PostHog exchanges the key ID and secret for a short-lived token on each sync, so the secret is only ever sent to your own Spacelift account's API endpoint.

## Sync modes

<SyncModes />

The `runs` table supports incremental syncs on the `createdAt` field (a Unix timestamp in seconds). Because runs can change state after they're created, each incremental sync re-pulls the last 7 days of runs and merges them, so recent runs converge on their final state. All other tables are small configuration catalogs and sync as full refreshes.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Invalid Spacelift API key"**: the key ID or secret is wrong, or the key was deleted. Create a new API key in your Spacelift organization settings and reconnect.
- **"Spacelift API returned unauthorized"**: the key is valid but lacks access to the requested data. Grant the key read access to the relevant spaces in Spacelift.
- **"Invalid Spacelift account name"**: enter only the subdomain of your Spacelift URL (e.g. `my-company`, not `my-company.app.spacelift.io` or a full URL).

<TroubleshootingLink />
