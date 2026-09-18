---
title: Linking Chameleon as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Chameleon
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Chameleon connector syncs your in-product onboarding and adoption data, such as tours and Microsurvey responses, into the PostHog Data warehouse, so you can analyze it alongside your product data.

## Prerequisites

You need a Chameleon account so you can generate an account-specific API secret.

## Adding a data source

<SourceSetupIntro />

When linking Chameleon, you'll need:

- **Account secret** – generate an account-specific API secret in your [Chameleon account settings](https://app.chameleon.io/settings/tokens). The secret is only shown once, so copy it when you create it.

## Sync modes

<SyncModes />

This source is full refresh only.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- If you see a permission error, your Chameleon account secret may be invalid or revoked. Generate a new secret in your Chameleon account settings, then reconnect.

<TroubleshootingLink />
