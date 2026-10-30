---
title: Linking OpenAQ as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenAQ
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The OpenAQ connector syncs global air-quality data – locations, sensors, measurements, and reference tables – into PostHog.

## Prerequisites

You need a free OpenAQ API key. The free tier is limited to 60 requests per minute. The measurement tables fetch data per sensor, so syncing them against a broad set of locations makes many requests – they're off by default, so enable only the sensors you need.

## Adding a data source

<SourceSetupIntro />

When linking OpenAQ, you'll need:

- **API key** – create a free key from your [OpenAQ Explorer account](https://explore.openaq.org/account).

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If syncs stall or fail with rate-limit errors, deselect measurement tables or narrow the sensors you sync – the free tier is capped at 60 requests per minute.

<TroubleshootingLink />
