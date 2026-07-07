---
title: Linking Care Quality Commission as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CareQualityCommission
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Care Quality Commission connector syncs UK health and social care provider and location data into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need an account on the CQC developer portal so you can subscribe to the Syndication API and obtain a subscription key.

## Adding a data source

<SourceSetupIntro />

When linking Care Quality Commission, you'll need:

- **Subscription key** – create a subscription key from the [CQC developer portal](https://api-portal.service.cqc.org.uk). Subscribe to the Syndication API product and copy its primary key.
- **Partner code** – optional but recommended. Requests sent with a partner code are allowed up to 2000 requests/minute, while requests without one are throttled harder. Request a partner code from CQC if you don't have one.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an invalid subscription key error, create a new key from the CQC developer portal, then reconnect.
- If access is not authorized, subscribe to the Syndication API product in the CQC developer portal, then reconnect.

<TroubleshootingLink />
