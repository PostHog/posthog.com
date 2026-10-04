---
title: Linking Instagram as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Instagram
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

The Instagram connector syncs an Instagram professional account into PostHog: the profile, its posts, stories and comments, and the insights Meta reports for the account and for each post. You can then analyze social activity alongside your product data.

## Prerequisites

- An Instagram professional account, either Business or Creator. Personal accounts aren't supported.
- A Facebook page linked to that professional account. PostHog reads the account through its page, using [Instagram API with Facebook Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login).
- A Facebook account with access to that page.

## Adding a data source

<SourceSetupIntro />

When linking Instagram, you'll need:

- **Instagram account**: connect your account and sign in with Facebook. Grant access to the page your professional account is linked to, along with Instagram insights and comments. PostHog asks for the `instagram_basic`, `instagram_manage_insights`, `instagram_manage_comments`, `pages_show_list`, and `pages_read_engagement` permissions.
- **Instagram professional account**: pick the account you want to sync. PostHog lists the professional accounts on the pages you granted access to.
- **Start date** (optional): the earliest date to sync posts and account insights from, in `YYYY-MM-DD` format. Leave it empty to sync every post and the last 90 days of account insights.

## Sync modes

<SyncModes />

Two tables sync incrementally:

- `media` uses each post's creation time, so a run fetches only posts created since the previous run.
- `account_insights` uses the metric's date and continues from the last day it synced.

The rest have no time filter on Meta's side, so they do a full refresh on every run.

Instagram deletes stories after 24 hours. The `stories` table only holds stories that were live when a sync ran, so sync at least daily to build up a history.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Limitations

- Meta returns at most the 10,000 most recently created posts, so `media` and the tables built from it cover that window.
- Account insights go back about two years. An earlier start date is clamped to that limit.
- `media_insights` and `account_insights` are in long format: one row per metric, not one column per metric. The metrics Meta returns vary by media type, and Meta retires metrics between Graph API versions.

## Troubleshooting

- **No accounts to pick from**: the Facebook account you connected has no Instagram professional account on the pages you granted. Check that the account is Business or Creator, that it's linked to a page, and that you granted access to that page.
- **"The Instagram connection has expired"**: Meta access tokens expire, and revoking PostHog's access in Facebook ends the connection early. Reconnect the Instagram account in the source's settings, then re-sync.
- **"The Instagram connection is missing permissions this sync needs"**: the grant left out one of the permissions listed above. Reconnect the account and accept access to the page, insights, and comments.
- **Empty insights tables**: Meta reports insights only for professional accounts, and only for days the account was active. Compare the same metrics in the Instagram app before treating this as a sync problem.

<TroubleshootingLink />
