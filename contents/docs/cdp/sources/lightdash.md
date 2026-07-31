---
title: Linking Lightdash as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lightdash
beta: true
---

import AlphaRelease from "../\_snippets/alpha-release.mdx"
import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Lightdash connector syncs your BI and analytics data – projects, spaces, dashboards, charts, metrics catalog entries, and organization users – into PostHog's data warehouse. This lets you join Lightdash metadata with the rest of your PostHog data in queries and insights.

## Prerequisites

- A Lightdash account (Lightdash Cloud or self-hosted) with at least one project.
- A Lightdash personal access token. Generate one under **Settings** → **Personal access tokens** in Lightdash. The token inherits its owner's project access, so use a token from a user who has access to every project you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Lightdash, you need:

- **Instance URL** – the URL of your Lightdash instance, e.g. `https://app.lightdash.cloud` for Lightdash Cloud or your self-hosted domain. Non-loopback hosts are forced to HTTPS so your token is never sent in cleartext.
- **Personal access token** – the token you generated from **Settings** → **Personal access tokens** in Lightdash.

The connector validates your credentials by calling the Lightdash API with the token you provide. If your Lightdash instance is self-hosted, make sure it's reachable from the public internet.

## Sync modes

All Lightdash tables sync as **full refresh only**. Lightdash's API doesn't expose server-side timestamp filters, so incremental sync isn't available. Each sync re-downloads every row for the enabled tables.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **"Lightdash rejected your personal access token"** – the token is wrong, expired, or was revoked. Generate a new token under **Settings** → **Personal access tokens** in Lightdash and reconnect.
- **"Your Lightdash personal access token does not have permission to read this data"** – the token's owner doesn't have access to one or more projects. Check the user's project access in Lightdash and reconnect with a token from a user who has the required permissions.
- **"The Lightdash instance URL is not allowed"** – the instance URL resolves to an internal or private address. Use your instance's public URL instead.

<TroubleshootingLink />
