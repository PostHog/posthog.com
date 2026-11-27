---
title: Linking Appbot as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Appbot
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

[Appbot](https://appbot.co) aggregates app store ratings and reviews from iOS App Store, Google Play, and other stores into a single platform. It adds sentiment analysis, topic detection, and translations on top. This connector pulls your tracked apps, their written reviews, and their star-rating history into the PostHog data warehouse, where you can join them with product analytics and build insights.

## Prerequisites

You need an Appbot account on a plan that includes the **API add-on** (available on Large and Premium plans). The API add-on gives you an API username and password, which you can find on the [API page](https://app.appbot.co/api) in Appbot.

Appbot rate-limits to 20 API requests per minute, so the first sync of an account with many apps or a long review history can take a while.

## Adding a data source

<SourceSetupIntro />

Enter the credentials from the API page in your Appbot account:

- **API username** - your Appbot API username
- **API password** - your Appbot API password

## Sync modes

<SyncModes />

The `reviews` table syncs incrementally on `published_at`. Each sync re-reads the last seven days because reviews can arrive in Appbot a few days after the store publishes them, and replies or sentiment can change after publication.

The `ratings` table syncs incrementally on `created_at`. Each sync re-reads the last two days because Appbot collects rating snapshots for different apps at different times.

The `apps` table syncs as full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

- **apps** - the apps your Appbot team tracks, one row per app and store. Includes the app name, store, identifier, and icon.

- **reviews** - written reviews collected from the app stores, with Appbot sentiment and topics. Includes the star rating, review body, translated text, developer reply, country, device, and detected language.

- **ratings** - star-rating count snapshots over time for each app, broken down by country plus an all-country summary row. Includes counts for each star level (1–5), total ratings, and average rating.

## Troubleshooting

- **Invalid credentials** - Appbot didn't accept the API username and password. Check them on the [API page](https://app.appbot.co/api) in Appbot and reconnect the source.

- **API add-on not enabled** - Appbot refused access with a 403 error. Verify that your Appbot plan includes the API add-on (Large or Premium), then reconnect the source.

- **Slow first sync** - Appbot allows 20 requests per minute. Accounts with many apps or years of review history take longer on the initial backfill. Subsequent incremental syncs are faster.

<TroubleshootingLink />
