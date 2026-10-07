---
title: Linking IP2WHOIS as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: IP2Whois
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The IP2WHOIS connector syncs whois and more into the PostHog data warehouse, so you can analyze them alongside your product data.

## Prerequisites

Credentials that can read the data you want to sync. PostHog only reads data, so read access is enough.

## Adding a data source

<SourceSetupIntro />

Enter your IP2WHOIS API key and the domains you want to look up to pull WHOIS registration data.

IP2WHOIS (by IP2Location) is a domain WHOIS lookup API. Create an API key in your [IP2WHOIS dashboard](https://www.ip2whois.com/) - the free tier includes 500 lookups per month.

There is no list endpoint - every request looks up a single domain - so enter one domain per line (commas and spaces also work). For example:

```
example.com
posthog.com
```

Each sync looks up every configured domain once and replaces the table with the current WHOIS record. Every domain costs one lookup against your monthly quota.

You'll be asked for:

- **API key**: for example `Your IP2WHOIS API key`.
- **Domains**: for example `example.com
posthog.com`.

## Sync modes

<SyncModes />

All IP2WHOIS tables are full refresh. Each sync replaces the contents of the table.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If the connection fails with an authorization error, the API key is wrong, expired, or has been revoked. Create a new one, then reconnect the source.
- If a table syncs no rows, the credential may not have access to that data. Check its permissions, then reconnect the source.

<TroubleshootingLink />
