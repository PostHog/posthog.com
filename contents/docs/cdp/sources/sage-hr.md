---
title: Linking Sage HR as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SageHR
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

[Sage HR](https://sage.hr) is an HR management platform. This connector syncs your HR data – employees, teams, positions, documents, leave requests and policies, and onboarding and offboarding data – into the PostHog Data Warehouse so you can analyze your people data alongside your product data.

## Prerequisites

A Sage HR account. An admin must enable API access under **Settings → Integrations → API**, which generates the API key used to connect.

## Adding a data source

<SourceSetupIntro />

When linking Sage HR, you'll need:

- **Company subdomain** – requests go to your own subdomain. For `https://yourcompany.sage.hr`, the subdomain is `yourcompany`.
- **API key** – an admin generates this by enabling API access under **Settings → Integrations → API** in Sage HR.

## Sync modes

<SyncModes />

All Sage HR tables are full refresh only. Incremental sync is not available for this connector.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authentication error, confirm API access is still enabled under **Settings → Integrations → API** and that the API key hasn't been regenerated.
- If requests fail to resolve, double-check the company subdomain – enter only the subdomain (`yourcompany`), not the full `https://yourcompany.sage.hr` URL.

<TroubleshootingLink />
