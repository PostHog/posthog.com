---
title: Linking X Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: TwitterAds
beta: true
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The X Ads connector syncs one X ad account's campaigns, line items, promoted posts and daily performance stats into PostHog. Use it to put ad spend next to the signups and revenue it produced, instead of reading the two in separate tools.

For organic account data such as posts, mentions and followers, use the Twitter (X) source instead.

This source is rolling out gradually. If you do not see X Ads in the source list, [contact support](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue) to be enabled.

## Prerequisites

- An X ad account you can log into.
- An X user with permission on that ad account. PostHog syncs through the account you connect, so it can only read ad accounts that user can already see.

You do not need your own X developer app or API keys. PostHog connects through its own X application, so there is nothing to register and no API credits to buy.

## Adding a data source

<SourceSetupIntro />

Connecting X Ads takes two steps rather than a set of credentials:

1. Click **Connect X account**. X asks you to authorize PostHog, then returns you to the setup form.
2. Pick the **Ad account** to sync. The dropdown lists every ad account the connected X user can access, by name.

To sync more than one ad account, add one source per account and give each a different table prefix.

## Sync modes

<SyncModes />

The two stats tables, `campaign_stats` and `line_item_stats`, sync incrementally on `date`. Each run re-reads the last three days as well as any new ones, because X keeps revising recent figures as it reconciles billing. A row that changes inside that window is corrected in place.

The five entity tables, `campaigns`, `line_items`, `promoted_tweets`, `funding_instruments` and `media_creatives`, are full refresh. They are small, and X offers no reliable change timestamp on them.

The first sync of a stats table walks from the ad account's creation date to today, one week at a time, so a long-running account takes a while to backfill. Later runs only cover new days plus the three-day window.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Reading the stats tables

Three things about `campaign_stats` and `line_item_stats` catch people out:

**One row per entity, per day, per placement.** X reports placements separately, so a single campaign on a single day produces up to three rows: `ALL_ON_TWITTER`, `SPOTLIGHT` and `TREND`. Sum across `placement` for a campaign's daily total, and never join on `entity_id` and `date` alone.

**Spend is in micros.** `billed_charge_local_micro` is one millionth of a currency unit, so divide by 1,000,000 to get an amount. The unit is in the `currency` column, which comes from the campaign's funding instrument.

**Dates follow the ad account's timezone.** The `date` column is a day in whatever timezone the ad account is set to, not UTC. Comparing it to a UTC timestamp from another table shifts the boundary by the account's offset.

## Troubleshooting

**"Your X Ads connection is no longer valid"**: the authorization was revoked, or you changed your X password. Reconnect your X account from the source settings, then re-enable the sync.

**"The connected X account cannot access this ad account"**: the X user you connected lost permission on the ad account. Restore it in X Ads Manager, or reconnect with a user who has it.

**"The connected X Ads integration is missing or disconnected"**: the stored connection was deleted. Reconnect your X account.

**"The PostHog X Ads app is not configured"**: this is on our side, not yours. [Contact support](https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue).

**Stats rows missing for recent days**: X publishes a day's figures after that day closes in the ad account's timezone, so the most recent day is often incomplete until the next sync.

<TroubleshootingLink />
