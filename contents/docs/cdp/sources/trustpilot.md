---
title: Linking Trustpilot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TrustPilot
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Trustpilot connector syncs your reviews data from [Trustpilot](https://www.trustpilot.com/) into PostHog's data warehouse: your business profile with its TrustScore, service reviews, and product reviews. Once synced, you can query and join this data alongside your product analytics and other warehouse sources.

## Prerequisites

You need a Trustpilot Business account with API access and an API application. Service and product reviews come from Trustpilot's private APIs, so the connector needs both the application's key and its secret.

## Adding a data source

<SourceSetupIntro />

When linking Trustpilot, you'll need:

- **API key** and **API secret**: create an API application in your Trustpilot Business account, then copy its key (client ID) and secret (client secret). See [Trustpilot's developer documentation](https://developers.trustpilot.com/) for how to create an application.
- **Business unit domain or ID**: your website domain exactly as it appears on your Trustpilot profile (for example `example.com`), or your business unit ID. Pasting your Trustpilot review page URL also works.

## Sync modes

<SyncModes />

Service reviews support incremental syncs based on when a review was created. Edits to already synced reviews, such as an updated star rating or a new company reply, are only picked up by a full refresh. Product reviews and the business profile always sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Business unit not found**: enter your domain exactly as it appears on your Trustpilot profile. If your profile uses a different domain than your website, use your business unit ID instead.
- **Credentials rejected**: check the API key and secret in your Trustpilot Business account, and confirm your Trustpilot plan includes API access.

<TroubleshootingLink />
