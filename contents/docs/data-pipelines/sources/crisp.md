---
title: Linking Crisp as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Crisp
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Crisp connector syncs your customer messaging data from [Crisp](https://crisp.chat) into the PostHog data warehouse. Import conversations, contact profiles, operator details, and helpdesk content so you can join support data with your product analytics.

## Prerequisites

You need a Crisp workspace with a website-tier API token. The connector authenticates with HTTP Basic using a website token – user-tier tokens aren't required.

## Adding a data source

<SourceSetupIntro />

When linking Crisp, you need:

- **Website ID** – your Crisp website identifier
- **Token identifier** – the identifier from a Crisp website token (used as the HTTP Basic username)
- **Token key** – the key from a Crisp website token (used as the HTTP Basic password)

To get these:

1. Log in to your [Crisp dashboard](https://app.crisp.chat).
2. Go to **Settings** > **Website Settings** > **Tokens**.
3. Create a new website token following the [Crisp website token guide](https://docs.crisp.chat/guides/rest-api/authentication/website-token/).
4. Copy the website ID, token identifier, and token key into PostHog.

## Sync modes

<SyncModes />

All Crisp tables use full refresh. Each sync replaces the contents of the table. The Crisp API doesn't expose reliable timestamp filters for incremental sync on any table.

Conversations, people, and operators sync by default. Enable the other tables during setup or in the source settings.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **Invalid credentials** – check that your token identifier and token key belong to a website-tier token, not a user-tier token. Recreate the token if needed, then reconnect the source.
- **Missing campaigns** – the Crisp API restricts campaign listing to user-tier tokens, so campaigns aren't available through this connector.
- **Empty visitors table** – the visitors table only contains visitors on the website at the time of the sync. It doesn't include historical visitor data.

<TroubleshootingLink />
