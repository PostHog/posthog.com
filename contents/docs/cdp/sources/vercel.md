---
title: Linking Vercel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Vercel
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Vercel connector syncs your deployments, projects, teams, domains, and aliases into PostHog, so you can analyze your Vercel data alongside your product data.

## Prerequisites

You need a Vercel account with an access token. A read-only token is sufficient. To sync resources owned by a team, you also need the team's ID.

## Adding a data source

<SourceSetupIntro />

When linking Vercel, you'll need:

- **Access token** – create one in your [Vercel account settings](https://vercel.com/account/tokens). A read-only token is sufficient.
- **Team ID (optional)** – to sync resources owned by a team, enter the team's ID, found under **Team Settings**. Leave it blank to sync resources owned by the token's user.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your access token is invalid or has been revoked, create a new token in your Vercel account settings, then reconnect.
- If your token is not authorized for a resource, check the token's scope and team access, then reconnect.

<TroubleshootingLink />
