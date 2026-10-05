---
title: Linking Systeme.io as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Systeme
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Systeme.io connector syncs contacts, tags, newsletters, courses, enrollments, communities, and memberships into the PostHog data warehouse, so you can analyze your marketing and course data alongside your product data.

## Prerequisites

A [Systeme.io](https://systeme.io/) account with an API key. You can create one in your profile settings under **Public API keys**.

## Adding a data source

<SourceSetupIntro />

Generate an API key in your Systeme.io profile settings under **Public API keys**. The key uses the `X-API-Key` header for authentication.

You'll be asked for:

- **API key**: the public API key from your Systeme.io profile settings.

## Sync modes

<SyncModes />

The `contacts` table supports incremental sync using the `registeredAt` field, so only new registrations are fetched on each run. Use full refresh to also capture changes and deletions of older contacts.

All other tables – tags, newsletters, courses, enrollments, communities, and memberships – are full refresh only because their API endpoints do not support a server-side time filter.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with a **401 error**, your API key is invalid or has been revoked. Create a new key in your Systeme.io profile settings under **Public API keys**, then reconnect the source.

- If a table returns a **403 error**, your API key does not have permission to access that resource. Check your account permissions and reconnect.

- The Systeme.io API shares rate limits across all keys on an account. If syncs are slow or interrupted, reduce the number of concurrent syncs or sources using the same account.

<TroubleshootingLink />
