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

IP2WHOIS (by IP2Location) is a domain WHOIS lookup API. The IP2WHOIS connector syncs WHOIS registration data for the domains you configure into PostHog.

## Prerequisites

You need an IP2WHOIS account with an API key. The free tier includes 500 lookups per month, and each configured domain costs one lookup against your monthly quota on every sync.

## Adding a data source

<SourceSetupIntro />

When linking IP2WHOIS, you'll need:

- **API key** – create one in your [IP2WHOIS dashboard](https://www.ip2whois.com/).
- **Domains** – the domains you want to look up. There is no list endpoint (every request looks up a single domain), so enter one domain per line (commas and spaces also work), for example `example.com` and `posthog.com`.

## Sync modes

<SyncModes />

This source is full refresh only. Each sync looks up every configured domain once and replaces the table with the current WHOIS record.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If your API key is invalid, create a new key in your IP2WHOIS dashboard, then reconnect.
- If lookups stop returning data, check whether you have used up your monthly lookup quota.

<TroubleshootingLink />
