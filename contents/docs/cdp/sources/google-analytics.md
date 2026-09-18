---
title: Linking Google Analytics as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GoogleAnalytics
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Google Analytics connector syncs daily report data from a Google Analytics 4 property – users, sessions, page views, devices, locations, traffic sources, and events – into PostHog.

## Prerequisites

You need a Google account with read access to the GA4 property you want to sync, and the numeric property ID for that property.

## Adding a data source

<SourceSetupIntro />

When linking Google Analytics, you'll need:

- **Google Analytics account** – connect a Google account that has read access to the property. PostHog requests the `analytics.readonly` scope when you authorize.
- **Property ID** – the numeric GA4 property ID, found in Google Analytics under **Admin → Property settings → Property details** (for example, `123456789`).

<CalloutBox icon="IconInfo" title="Finding your Property ID" type="fyi">

The Property ID is a numeric value like `123456789`. Don't confuse it with:

- **Measurement ID** (`G-XXXXXXX`) – this is from your GA4 data stream or website tag and won't work here
- **Universal Analytics ID** (`UA-XXXXXXX`) – this is from legacy Google Analytics (not GA4) and isn't supported

Find the correct Property ID in Google Analytics under **Admin** > **Property settings** > **Property details**.

</CalloutBox>

## Sync modes

<SyncModes />

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

<TroubleshootingLink />
