---
title: Linking NewsBreak Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: NewsBreak
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"

The NewsBreak Ads connector syncs your NewsBreak ad accounts, campaigns, ad sets, ads, and daily performance reports into the PostHog data warehouse, so you can analyze ad spend, impressions, clicks, conversions, conversion value, and ROAS alongside your product data.

The NewsBreak Ads source is currently in beta.

## Prerequisites

- A NewsBreak Ads Manager account.
- A NewsBreak API access token. The user who owns the token must be able to view the organizations and ad accounts you want to sync.

## Adding a data source

<SourceSetupIntro />

See the [NewsBreak Ads API documentation](https://advertising-api.newsbreak.com/hc/en-us) for more details on the API.

Generate an access token in NewsBreak Ads Manager under **Tools > Resources > API Access Tokens**.

You'll be asked for:

- **Access token**: Your NewsBreak API access token.
- **Organization IDs** (optional): A comma-separated list of the NewsBreak organization IDs to sync, e.g. `123456, 234567`. Leave it empty to sync every organization where the token's user is an admin.
- **Report time zone** (optional): The IANA time zone that report dates use, such as `America/New_York`. Defaults to `UTC`.

PostHog syncs every ad account in the selected organizations.

## Sync modes

<SyncModes />

The `ad_accounts`, `campaigns`, `ad_sets`, and `ads` tables sync as a full refresh, because the NewsBreak API has no filter on update time.

The daily report tables support incremental sync on the `date` field, with merge only. NewsBreak attributes conversions back to the day of the click, so recent days change after PostHog first reads them. To keep the data accurate, each incremental sync reads the last 14 days again and replaces those rows.

The first sync of a report table reads back to the creation date of each ad account. If NewsBreak doesn't return a creation date, the sync reads back 730 days. An ad account that the token can newly see also gets its full history on the next sync.

If a sync is interrupted, it continues from the ad account and page or date window where it stopped.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### Table details

- **ad_accounts**: The ad accounts in the connected organizations.
- **campaigns**: Your ad campaigns.
- **ad_sets**: Your ad sets, with their budget, bidding, schedule, and targeting.
- **ads**: Your ads and their creatives.
- **ad_account_daily_report**: Daily ad performance for each ad account.
- **campaign_daily_report**: Daily ad performance for each campaign.
- **ad_set_daily_report**: Daily ad performance for each ad set.
- **ad_daily_report**: Daily ad performance for each ad.

In the report tables, money values such as `cost_decimal` and `conversion_value_decimal` are in cents. `ctr` and `cvr` are in basis points (the rate times 10,000). Rate metrics such as `cpc_decimal`, `ctr`, and the ROAS columns are `-1` when NewsBreak has no value for them.

## Troubleshooting

- **NewsBreak rejected the access token**: The token is invalid or was revoked. Generate a new token in NewsBreak Ads Manager under **Tools > Resources > API Access Tokens**, then reconnect the source.
- **NewsBreak denied access**: The user who owns the access token can't view the organizations or ad accounts you want to sync. Check that user's permissions in NewsBreak.
- **No organizations found**: The token's user isn't an admin of any NewsBreak organization. Enter your organization IDs in the source settings.
- **The report time zone is not valid**: Use an IANA time zone name, such as `UTC` or `America/New_York`.

<TroubleshootingLink />
