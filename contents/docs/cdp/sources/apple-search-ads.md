---
title: Linking Apple Ads as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppleSearchAds
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../\_snippets/alpha-release.mdx"

<AlphaRelease />

The Apple Ads connector syncs your campaigns, ad groups, keywords, and daily performance reporting into PostHog, so you can analyze ad spend next to your product data. Apple Ads was called Apple Search Ads until Apple renamed it, and it now covers ads on both the App Store and Apple Maps.

PostHog reads version 1.0 of the [Apple Ads Platform API](https://developer.apple.com/documentation/apple-ads-platform-api).

## Prerequisites

Neither PostHog nor Apple generates an API key for you. You generate a key pair yourself, an account administrator uploads the public half to Apple, and Apple then shows you the identifiers to paste into PostHog. Work through the four steps below before you link the source.

### 1. Create an API user

An Apple Ads account administrator signs in to [Apple Ads](https://ads.apple.com), goes to **Account Settings** > **User Management**, and invites or edits a user with one of these roles:

- **API Account Read Only** – read access to the account. This is all PostHog needs.
- **API Account Manager** – read and write access. This works, but it grants more than PostHog uses.

Apple revokes API access if the user later moves to a non-API role, which makes syncs start to fail. Use a user whose role you don't expect to change.

### 2. Generate a key pair

The API user generates an EC P-256 key pair. OpenSSL is already installed on macOS and Linux:

```bash
openssl ecparam -genkey -name prime256v1 -noout -out private-key.pem
openssl ec -in private-key.pem -pubout -out public-key.pem
```

Keep `private-key.pem` secret. If it leaks, generate a new pair and upload the new public key to Apple.

### 3. Upload the public key

The API user signs in to Apple Ads, goes to **Account Settings** > **API**, pastes the contents of `public-key.pem` into the **Public Key** field, and clicks **Save**.

Apple then shows three identifiers above that field. PostHog needs all three:

```
clientId SEARCHADS.aeb3ef5f-0c5a-4f2a-99c8-fca83f25a9
teamId   SEARCHADS.hgw3ef3p-0w7a-8a2n-77c8-scv83f25a7
keyId    a273d0d3-4d9e-458c-a173-0db8619ca7d7
```

### 4. Find your ad account ID

The Platform API scopes every request to one ad account, so PostHog needs your ad account ID. This is **not** your organization ID, because one organization can hold several ad accounts.

Apple only serves this value from the API. Follow [Apple's OAuth guide](https://developer.apple.com/documentation/apple-ads-platform-api/implementing-oauth-for-the-apple-ads-platform-api) to sign a client secret with `private-key.pem` and exchange it for an access token, then call the [Get User ACL](https://developer.apple.com/documentation/apple-ads-platform-api/get-user-acls) endpoint:

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" https://api.ads.apple.com/v1/acls
```

Each entry in the response holds an `adAccount.id`. That value is your ad account ID.

## Adding a data source

<SourceSetupIntro />

## Sync modes

<SyncModes />

The `campaigns`, `ad_groups`, `keywords`, and `acls` tables use full refresh, because Apple's query endpoints expose no updated-since cursor.

The three reporting tables sync incrementally by `date`. Each run re-reads a trailing window of recent days, because Apple restates recent reporting as attribution settles. Rows are merged away by primary key, so restatements replace earlier values instead of duplicating them.

Apple serves daily reporting for the **last 90 days only**. PostHog starts a couple of days inside that boundary, because Apple applies it in the ad account's own reporting time zone. If you set a report start date older than the window, PostHog starts from the oldest day Apple still serves rather than failing the sync. To build a longer history, connect the source and let it sync regularly — PostHog keeps the rows it has already imported after they age out of Apple's window.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **401 errors** mean Apple rejected the access token. Check that the API client still exists under **Account Settings** > **API**, and that the private key in PostHog matches the public key uploaded there.
- **403 errors** mean the API user can reach Apple but not this ad account. Check the user's role and the ad account ID.
- **404 errors** mean Apple can't find the ad account. Re-read the ID from `adAccount.id` rather than using your organization ID.
- **"The private key isn't a valid unencrypted EC (P-256) PEM"** means the key was pasted in the wrong format. Paste the whole contents of `private-key.pem`, including the `-----BEGIN EC PRIVATE KEY-----` and `-----END EC PRIVATE KEY-----` lines, and make sure the key isn't passphrase-protected.
- **Reporting tables are empty for older dates** because of the 90-day daily reporting window described above. This is an Apple limit, not a sync failure.

<TroubleshootingLink />
