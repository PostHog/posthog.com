---
title: Linking Zonka Feedback as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ZonkaFeedback
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Zonka Feedback connector syncs your survey and feedback data into the PostHog data warehouse, so you can analyze customer feedback alongside your product data.

## Prerequisites

You need a Zonka Feedback account with admin access to generate an API auth token.

## Adding a data source

<SourceSetupIntro />

When linking Zonka Feedback, you'll need:

- **Auth token** – generate an auth token under **Company Settings → Developers → API** in Zonka Feedback.
- **Data center** – select the region that matches your Zonka Feedback account:
  - **US** (us1.apis.zonkafeedback.com)
  - **EU** (e.apis.zonkafeedback.com)
  - **India** (in.apis.zonkafeedback.com)

  You can find your data center in the same **Company Settings → Developers** area.

## Sync modes

<SyncModes />

This source is full-refresh only. Zonka Feedback's API has no server-side timestamp filter, so every table is fully re-synced on each run.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your auth token is invalid or has been revoked. Generate a new token under **Company Settings → Developers → API**, then reconnect.
- If you see a permissions error, your auth token does not have access to the required data. Check your token's permissions and reconnect.
- If data is missing, verify you selected the correct data center for your account.

<TroubleshootingLink />
