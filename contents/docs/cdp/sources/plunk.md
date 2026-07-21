---
title: Linking Plunk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Plunk
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Sync your Plunk contacts, campaigns, templates, and segments into the PostHog data warehouse, so you can join email engagement with product analytics, for example to compare campaign performance against activation or retention.

## Prerequisites

You need the secret API key for your Plunk project. It starts with `sk_` and is shown in your Plunk project settings. The public key (`pk_`) only works for event tracking and cannot read data.

## Adding a data source

<SourceSetupIntro />

1. In Plunk, open **Project Settings** and go to the **API Keys** section, then copy the secret key (`sk_...`).
2. Back in PostHog, enter the secret API key.
3. If you self-host Plunk, set the API URL to your Plunk API host (for example `https://plunk-api.example.com`). Leave it blank to use the hosted Plunk at `https://next-api.useplunk.com`.
4. Click **Next**, select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Sync modes

<SyncModes />

Plunk's API exposes no server-side timestamp filter on its list endpoints, so every table is full refresh only and reloads all records on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a sync fails with an authentication error, check that you are using the secret key (`sk_`), not the public key (`pk_`), and that the key was not regenerated in Plunk. Copy the current secret key from your Plunk project settings and reconnect the source.

If Plunk rejects requests with a permission error, check that your Plunk project is active and that your account email is verified.

<TroubleshootingLink />
