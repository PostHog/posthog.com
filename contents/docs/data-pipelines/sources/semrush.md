---
title: Linking Semrush as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Semrush
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Semrush connector syncs Site Audit data from your Semrush projects into the PostHog data warehouse, so you can analyze SEO health alongside your product data.

## Prerequisites

You need:

- A Semrush account with an **SEO Business subscription**
- A **project with Site Audit enabled**
- A **v3 API key** from your Semrush profile
- Sufficient **API units** (100 units per table request, plus 100 units for connection validation)

## Adding a data source

<SourceSetupIntro />

When linking Semrush, you'll need:

- **API key (v3)** – find it under [API keys](https://www.semrush.com/accounts/api-keys/active) in your Semrush profile.
- **Project ID** – the numeric project ID from your Semrush project URL. For example, if your project URL is `https://www.semrush.com/projects/123456/site-audit/`, the project ID is `123456`.

## API units

Semrush syncs consume your account's API units:

- **100 units** per table request during syncing
- **100 units** for connection validation
- Retries (up to 3 attempts) can consume additional units

## Sync modes

<SyncModes />

All Semrush tables use full refresh syncing. The Semrush API doesn't expose pagination or server-side time filters, so each sync re-downloads all data.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

### Authentication failed

If you see "Semrush authentication failed," your API key is invalid or expired. Verify your v3 API key under [API keys](https://www.semrush.com/accounts/api-keys/active) in your Semrush profile.

### API access disabled

If you see "Semrush API access is disabled," check that:

- Your Semrush account has an active SEO Business subscription
- You have access to the configured project

### API units exhausted

If you see "Semrush API units or request limits are exhausted," you need to add more API units to your Semrush account or wait for your limits to reset. Contact Semrush support for help.

### Project not found

If you see "Semrush could not find this project," verify:

- The project ID is correct (numeric only, from your project URL)
- You have access to the project
- Site Audit is enabled for the project

<TroubleshootingLink />
