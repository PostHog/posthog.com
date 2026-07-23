---
title: Linking Teamtailor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Teamtailor
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Teamtailor connector syncs your recruiting data — candidates, jobs, job applications, users, and departments — into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Teamtailor account with access to create an API key that has read access to your recruiting data.

## Adding a data source

<SourceSetupIntro />

When linking Teamtailor, you'll need:

- **API key** – create an API key in your Teamtailor account under **Settings → API keys**. The key grants read access to your candidates, jobs, job applications, users, and departments.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid or revoked key error, generate a new key in your Teamtailor account under **Settings → API keys**, then reconnect.
- If access is denied, check the key's scope and permissions, then reconnect.

<TroubleshootingLink />
