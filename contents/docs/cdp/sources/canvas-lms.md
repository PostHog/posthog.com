---
title: Linking Instructure Canvas LMS as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CanvasLms
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Instructure Canvas LMS connector syncs courses, users, enrollments, and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your Canvas domain, account ID, and an access token to pull course, enrollment, assignment, and submission data.

Generate a token from **Account → Settings → Approved Integrations → New access token** in Canvas. Use an admin account so the token can list every course in your account.

Find your account ID in the URL when you view **Admin → [your account] → Settings** - it's the number after `/accounts/` (for example, `1` in `https://yourschool.instructure.com/accounts/1`).

You'll be asked for:

- **Canvas domain**: for example `yourschool.instructure.com`.
- **Account ID**: for example `1`.
- **Access token**

## Sync modes

<SyncModes />

All Instructure Canvas LMS tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the access token is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
