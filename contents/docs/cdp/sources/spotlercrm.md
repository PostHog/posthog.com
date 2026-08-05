---
title: Linking Spotler CRM as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SpotlerCRM
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Spotler CRM (formerly Really Simple Systems) connector syncs your CRM data – accounts, contacts, opportunities, activities, and more – into PostHog, so you can analyze your sales pipeline alongside your product data.

## Prerequisites

You need a Spotler CRM account on a plan with API access (Professional or Enterprise). Some record types need paid add-ons: campaigns require the Marketing tool, and cases require the Service & Support tool.

## Adding a data source

<SourceSetupIntro />

When linking Spotler CRM, you'll need:

- **API access token** – in Spotler CRM, go to **Settings**, then **Integrations**, then **API V4**, and click **Generate new key**. The token is shown only once, so copy it right away.

## Sync modes

<SyncModes />

The Spotler CRM API doesn't support server-side incremental filtering, so all tables sync as a full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

If a table fails to sync with a permission error, check that your plan includes that record type: campaigns need the Marketing tool add-on, and cases need the Service & Support tool add-on.

<TroubleshootingLink />
