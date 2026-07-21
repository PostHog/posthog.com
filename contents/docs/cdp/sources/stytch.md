---
title: Linking Stytch as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Stytch
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Stytch connector syncs your authentication data into the PostHog Data warehouse, so you can analyze signup cohorts, authentication method adoption (MFA, OAuth, passkeys), and account security signals alongside your product data.

## Prerequisites

You need a Stytch project and its API credentials: a project ID and a secret. Consumer (B2C) projects sync the `users` and `sessions` tables; B2B projects also sync `organizations` and `members`.

Stytch's event logs are not available through its API, so they cannot be synced.

## Adding a data source

<SourceSetupIntro />

When linking Stytch, you'll need:

- **Project ID** – find it under [API keys](https://stytch.com/dashboard/api-keys) in your Stytch dashboard.
- **Secret** – from the same API keys page.

Stytch's live and test environments are separate: live credentials (`project-live-...`) sync your live data, while test credentials (`project-test-...`) sync your test environment's data.

## Sync modes

<SyncModes />

The `users` table supports incremental sync on `created_at`. Stytch exposes no updated-at filter, so incremental syncs only pick up newly created users; run a periodic full refresh to capture changes to existing users. All other tables are full refresh only.

The `sessions` table only contains currently active sessions (Stytch's API doesn't return expired ones) and is fetched one request per user, so it's off by default – enable it only if the per-user API cost is acceptable for your project size.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your Stytch project ID or secret is invalid. Create a new secret under API keys in your Stytch dashboard, then reconnect.
- If the `organizations` or `members` tables fail to sync, your project is likely a consumer (B2C) project – those tables are only available for Stytch B2B projects.

<TroubleshootingLink />
