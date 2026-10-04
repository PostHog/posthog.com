---
title: Linking Ubidots as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ubidots
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Ubidots connector syncs your IoT devices, variables, and sensor time-series values into the PostHog Data warehouse, so you can analyze device telemetry alongside your product data.

## Prerequisites

You need a Ubidots account with an API token. Tokens are account-wide, so the connector can read every device and variable the token's owner can see.

## Adding a data source

<SourceSetupIntro />

When linking Ubidots, you'll need:

- **API token** – use a permanent token from **your profile → API Credentials** in Ubidots. Don't use a token minted via the temporary-token endpoint: those expire after a few hours and will break syncs.
- **API base URL** – Industrial and enterprise accounts use the default `https://industrial.api.ubidots.com`. Pick `https://things.ubidots.com` only if you're on a legacy STEM account.

## Sync modes

<SyncModes />

The `values` table supports incremental syncs on the dot `timestamp` (Unix epoch milliseconds), so after the first full sync only new data points are fetched. Device and variable metadata tables are full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

The `values` table contains one row per dot (data point), with the owning variable's ID injected in the `variable` column so you can join it to the `variables` table.

## Troubleshooting

- If you see an authentication error, your API token is invalid or has expired. Temporary tokens expire after a few hours – use the permanent token from your profile's API Credentials page, then reconnect.
- If your account lives on the legacy consumer tier and the connection fails, switch the API base URL to `https://things.ubidots.com`.

<TroubleshootingLink />
