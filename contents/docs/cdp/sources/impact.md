---
title: Linking impact.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Impact
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The impact.com connector syncs your brand (advertiser) account's partnership data from [impact.com](https://impact.com): your campaigns, the partners promoting them, the conversions they drive, and partner payout invoices. If your account is a partner (publisher) account, use the [impact.com Partner source](/docs/cdp/sources/impact-partner) instead.

## Prerequisites

You need an impact.com brand account with API access. The connector authenticates with an API access token, which any account user can create from their profile settings.

## Adding a data source

<SourceSetupIntro />

When linking impact.com, you'll need:

- **Account SID** and **Auth token** from an impact.com API access token.

To get these:

1. Log in to [impact.com](https://app.impact.com).
2. Go to your user profile, then **Settings** → **Technical** → **API**.
3. Create an access token with read-only scopes.
4. Copy the token's Account SID and Auth Token into PostHog.

## Sync modes

<SyncModes />

The `Actions` table supports incremental sync on `EventDate`, and `MediaPartners` on `DateLastUpdated`. On the first sync, `Actions` backfills up to 3 years of history per campaign in 44-day chunks, which is a limit of the impact.com API.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid credentials when connecting**: check that the Account SID and Auth Token belong to a brand (advertiser) account. Partner and agency accounts use different APIs, so a partner token won't validate here. For partner accounts, use the [impact.com Partner source](/docs/cdp/sources/impact-partner).
- **Missing older actions**: the impact.com API only returns actions from the last 3 years, so the initial backfill stops there.

<TroubleshootingLink />
