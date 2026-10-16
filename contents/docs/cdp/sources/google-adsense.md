---
title: Linking Google AdSense as a source
sidebar: Docs
showTitle: true
availability: { free: full, selfServe: full, enterprise: full }
sourceId: GoogleAdSense
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Connect a Google AdSense account to sync daily earnings and performance data into PostHog, so you can join AdSense revenue with your PostHog traffic and page views. Read-only, via the AdSense Management API v2.

## Prerequisites

- A Google account with access to the AdSense account you want to sync, either as the owner or as an invited Standard/Admin user.
- The AdSense account must be active (in the `READY` state), not still pending sign-up.
- Read access is enough. PostHog only reads data, and requests the `https://www.googleapis.com/auth/adsense.readonly` scope when you connect your Google account.


## Adding a data source

<SourceSetupIntro />

Pull daily earnings and performance from the AdSense Management API v2 (page views, ad requests, impressions, clicks, estimated earnings, RPM, CTR, and viewability), broken out by ad unit, country, domain, platform, ad format, page URL, and channel, alongside your account's ad clients, sites, alerts, policy issues, and payments.

Connect the Google account that has access to your AdSense account, then pick the AdSense account to sync. PostHog asks for read-only access to your AdSense reports.

You'll be asked for:

- **Google AdSense account**: sign in with a Google account that has access to the AdSense account you want to sync, as the owner or as an invited Standard/Admin user.

- **AdSense account**: choose the account to pull data from (format `accounts/pub-XXXXXXXXXXXXXXXX`). Only accounts your signed-in Google user can access are listed.

- **Start date (optional)**: the earliest date to pull data from, in `YYYY-MM-DD` format. Leave blank to default to 2 years of history.

## Sync modes

<SyncModes />

Most AdSense tables sync incrementally, so later runs only fetch new or updated rows. The account and inventory tables (ad clients, ad units, custom channels, URL channels, sites, alerts, policy issues, and payments) are full refresh.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Sync limitations

Google's AdSense Reports API caps a single JSON report at 100,000 rows. The source requests the whole date range in one call and, when the API reports more matching rows than it returned, splits the window in half and retries. Most tables still sync a full history in a handful of requests. If a single day still exceeds the cap, the returned rows are kept and the truncation is logged. High-cardinality tables such as `page_url_stats` hit this cap fastest, which is why it's off by default.

Estimated earnings are final through yesterday; today's figure is an estimate and will be restated on later syncs.

## Troubleshooting

- If the connection fails with an authorization error, the Google account is wrong, expired, or has been revoked. Reconnect the source and sign in again.

- If no AdSense accounts show up after signing in, the Google account can't read any AdSense account. Sign in with the account that owns the AdSense account, or one an admin has invited, and allow AdSense access when prompted.

- If a sync fails with a rate-limit or quota error, Google is throttling requests. PostHog backs off and retries automatically, so wait and let the next scheduled sync run. Large backfills, especially `page_url_stats`, are the most likely to hit this.

<TroubleshootingLink />
