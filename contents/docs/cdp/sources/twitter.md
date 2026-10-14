---
title: Linking Twitter (X) as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Twitter
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import { CalloutBox } from 'components/Docs/CalloutBox'

The Twitter (X) connector syncs one X account's profile, posts, mentions, likes, followers, following, and owned lists into PostHog. Use it to join social reach and engagement to your product and revenue data, so you can see which posts bring in signups.

This connector reads organic account data. For ad spend and campaign performance, use the Twitter Ads source instead.

<CalloutBox icon="IconPiggyBank" title="X charges you for this data" type="info">

X bills your own developer project for every post this source reads, at the rate X publishes on its [API pricing page](https://docs.x.com/x-api/getting-started/pricing). PostHog does not resell or mark up that access, and you buy the credits directly from X. A table you sync often, or an account with a large timeline or follower list, costs more. See [Sync modes](#sync-modes) before you pick a sync frequency.

</CalloutBox>

## Prerequisites

You need an app in the [X developer portal](https://developer.x.com/en/portal/dashboard) with:

- A **project** the app is attached to. A standalone app cannot call the v2 API.
- **API credits** on the project. X bills reads per post, so a project with no credits cannot sync anything.
- The app's **Bearer Token**, from the app's **Keys and tokens** tab.

If your app's API access does not cover an endpoint, X returns a permission error for that table, and PostHog marks the table unavailable when you pick your schemas. You can leave those tables unselected and sync the rest.

## Adding a data source

<SourceSetupIntro />

You need two values:

- **Bearer token**: the app's bearer token from the X developer portal.
- **Account handle**: the handle of the account to sync, such as `posthog`. Leave off the `@` and the profile URL.

The handle decides whose data is synced. To sync more than one account, add one source per account and give each a different table prefix.

## Sync modes

<SyncModes />

**Posts** and **Mentions** support incremental syncs on `created_at`, because X lets PostHog ask for posts after a given time. Every other table is a full refresh: X has no time filter on those endpoints, so an "incremental" sync would still read the whole list on every run.

Every post PostHog reads costs you credits, and X caps pay-per-usage projects at 3 million post reads per billing cycle. X charges a repeated read of the same resource once per UTC day, so a sync that runs more than once a day costs little more than one that runs daily.

Reads also count against a rate limit whose windows are 15 minutes wide. On a large account, prefer a daily sync over an hourly one, and only select the tables you query.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

**"X rejected the bearer token"**: the token was revoked or regenerated. Copy the current one from the app's **Keys and tokens** tab and reconnect the source.

**"Your X app's API access doesn't cover this endpoint"**: your app cannot read that table. Check the project's API access and credit balance in the X developer portal, or turn off syncing for that table.

**"X has no account with the handle"**: check the handle for typos. A suspended or deleted account also reports as missing.

**Fewer posts than expected**: X limits how far back a timeline goes, so the first sync may not reach the account's oldest posts.

<TroubleshootingLink />
