---
title: Linking SurveySparrow as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SurveySparrow
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The SurveySparrow connector syncs your survey and feedback data into the PostHog Data warehouse, so you can analyze surveys, responses, questions, and contacts alongside your product data.

## Prerequisites

You need a SurveySparrow account that can create a private app, which is how SurveySparrow issues API access tokens.

## Adding a data source

<SourceSetupIntro />

When linking SurveySparrow, you'll need:

- **Access token** – create a private app under **Settings → Apps & Integrations** in SurveySparrow and generate an access token. The token is displayed only once, so copy it when it's created.
- **Data center** – the region your SurveySparrow account is hosted in. Tokens are only valid against their own region's API host:

| Region       | API host                       |
| ------------ | ------------------------------ |
| US           | `api.surveysparrow.com`        |
| EU           | `eu-api.surveysparrow.com`     |
| Asia-Pacific | `ap-api.surveysparrow.com`     |
| Middle East  | `me-api.surveysparrow.com`     |
| UK           | `eu-ln-api.surveysparrow.com`  |
| Sydney       | `ap-sy-app.surveysparrow.com`  |
| Canada       | `ca-api.surveysparrow.com`     |

If you're unsure which data center your account uses, check your SurveySparrow account settings or contact SurveySparrow support.

## Sync modes

<SyncModes />

The `responses` table supports incremental sync on `completed_time`, using SurveySparrow's server-side submission date filter. Only completed responses are synced – partial (in-progress) submissions are not imported. All other tables are full refresh only, since their API endpoints expose no reliable incremental cursor.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you get an authorization error, your access token is invalid or revoked, or it's being sent to the wrong region. Check the data center matches your account, or generate a new token under **Settings → Apps & Integrations**, then reconnect.
- If you get a permission error, your access token is missing scopes for the resources you're syncing. Grant read access for those resources when creating the private app, then reconnect.

<TroubleshootingLink />
