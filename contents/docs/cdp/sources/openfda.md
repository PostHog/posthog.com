---
title: Linking openFDA as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: OpenFDA
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The openFDA connector syncs U.S. FDA drug, device, and food data – adverse event reports, recalls, drug labeling, 510(k) clearances, and the NDC directory – into PostHog.

## Prerequisites

An API key is optional but recommended. Without one, openFDA limits you to 1,000 requests/day per IP; with one, 120,000 requests/day.

## Adding a data source

<SourceSetupIntro />

When linking openFDA, you'll need:

- **API key (optional)** – get a free key from the [openFDA API basics page](https://open.fda.gov/apis/authentication/). Without a key you're limited to 1,000 requests/day per IP; with one, 120,000 requests/day.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If syncs fail with rate-limit errors, add an API key to raise your daily request limit from 1,000 to 120,000.

<TroubleshootingLink />
