---
title: Linking Mailosaur as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mailosaur
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Mailosaur connector syncs your email and SMS testing data – servers, messages, and usage transactions – into PostHog, so you can analyze it alongside your product data.

## Prerequisites

You need a Mailosaur account and an account-level API key. A server-scoped key cannot list servers, so it can't enumerate the mail to sync.

## Adding a data source

<SourceSetupIntro />

When linking Mailosaur, you'll need:

- **API key** – find it in your [Mailosaur account settings](https://mailosaur.com/app/keys). Use an **account-level** key, since a server-scoped key cannot list servers and can't enumerate the mail to sync.

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
