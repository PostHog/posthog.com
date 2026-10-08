---
title: Linking Flagsmith as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Flagsmith
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Sync your Flagsmith projects, environments, feature flags, flag states, segments, organization members, and audit log into the PostHog data warehouse, so you can correlate rollouts with product metrics and track who changed what, when.

## Prerequisites

You need an organization API key for your Flagsmith organization. Organization API keys grant admin access to every project in the organization, so store them carefully.

## Adding a data source

<SourceSetupIntro />

1. In Flagsmith, go to **Organisation Settings** (as labeled in the Flagsmith dashboard) and open the **API Keys** tab, then create an organization API key and copy it.
2. Back in PostHog, enter the API key.
3. If you self-host Flagsmith, set the API URL to your API host (for example `https://flagsmith.example.com`). Leave it blank to use Flagsmith SaaS.
4. Click **Next**, select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Sync modes

<SyncModes />

Flagsmith's Admin API exposes no server-side timestamp filter on these resources, so every table is full refresh only and reloads all records on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with an authentication error, the organization API key was likely revoked or entered incorrectly. Create a new key under **Organisation Settings > API Keys** and reconnect the source.

Retention of the `audit_logs` table on Flagsmith SaaS depends on your plan, so it reflects the history Flagsmith currently retains for your organization.

<TroubleshootingLink />
