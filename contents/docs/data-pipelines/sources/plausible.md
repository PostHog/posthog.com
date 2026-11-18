---
title: Linking Plausible as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Plausible
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Plausible connector syncs your web analytics into PostHog, so you can analyze it alongside your product data. It works with both Plausible Cloud and self-hosted instances.

## Prerequisites

You need a Plausible account with access to create an API key, and the domain of the site you want to sync.

## Adding a data source

<SourceSetupIntro />

When linking Plausible, you'll need:

- **API key** – create an API key under **Account settings → API keys** with the `stats read` scope.
- **Site domain** – enter your site's domain (for example `example.com`).
- **Host** – self-hosted only. Set it to your instance URL (for example `https://plausible.example.com`). Leave it blank for Plausible Cloud.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

Some tables are off by default. The `operating_system_versions` table is not synced unless you enable it, since the `operating_systems` table already covers most use cases.

Event-scoped tables – such as `hostnames`, `pages`, and custom property tables – don't include `bounce_rate` or `visit_duration` metrics. Plausible's API rejects these session-level metrics for event-scoped breakdowns.

### Custom property tables

You can sync custom event properties from Plausible by adding a comma-separated list of property keys in the **Custom property keys** sync setting (for example `plan, signup_method`). Each key creates its own table named `custom_property_<key>`.

Plausible's Stats API can't list a site's property keys, so you need to enter them manually. Your Plausible plan must include custom properties for this to work.

## Troubleshooting

- If you see an invalid or revoked key error, create a new key in your Plausible account settings, then reconnect.
- If a table fails with a missing scope error, grant the `stats read` scope in your Plausible account settings, then reconnect.

<TroubleshootingLink />
