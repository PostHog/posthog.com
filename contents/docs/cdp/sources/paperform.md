---
title: Linking Paperform as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Paperform
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Paperform connector syncs your forms, fields, submissions, partial submissions, products, coupons, and spaces into the PostHog Data warehouse, so you can analyze form performance and respondent answers alongside your product data.

## Prerequisites

You need a Paperform account on a plan that includes API access (Pro, Business, or Agency). The `spaces` table additionally requires a Business or Agency plan; if your plan doesn't include it, deselect that table when choosing what to sync.

## Adding a data source

<SourceSetupIntro />

When linking Paperform, you'll need:

- **API key** – create one under **Account → Developer** in your [Paperform account](https://paperform.co). The key is account-wide and grants read access to your forms and their data.

## Sync modes

<SyncModes />

The `submissions` table supports incremental syncs on `created_at_utc` – submissions never change once made, so incremental is the recommended mode for it. The other tables are full refresh only: Paperform's API filters by creation time only, and records like forms and partial submissions keep changing after they're created, so a creation-time cursor would miss their updates.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see an authentication error, your API key is invalid or has been revoked. Create a new key under **Account → Developer** in Paperform, then reconnect.
- If you see a permissions error, your Paperform plan doesn't include access to that data. API access requires a Pro, Business, or Agency plan, and the `spaces` table requires a Business or Agency plan.

<TroubleshootingLink />
