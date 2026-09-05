---
title: Linking Google Play Console as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: GooglePlayConsole
---

import SourceSetupIntro from "../_snippets/source-setup-intro.mdx"
import SyncModes from "../_snippets/sync-modes.mdx"
import TroubleshootingLink from "../_snippets/dw-troubleshooting-link.mdx"
import AlphaRelease from "../_snippets/alpha-release.mdx"

<AlphaRelease />

Connect your Google Play developer account to sync Android vitals and error reporting into the PostHog data warehouse: crash and ANR rates, excessive wakeups and stuck wakelocks, slow starts and slow rendering, low-memory kills, plus clustered error issues, individual error reports, and the anomalies Play detects. This lets you track release quality next to product analytics, for example comparing the crash rate of a version to the retention of the users on it.

## Prerequisites

- A Google Cloud project. Any project works, and it doesn't have to be related to your app.
- A Google Cloud service account with a JSON key. The connector authenticates as this service account, so no one has to share a personal Google login.
- Permission to invite users in Play Console. Only account owners and admins can do this.

## Creating the service account key

The connector reads the [Play Developer Reporting API](https://developers.google.com/play/developer/reporting), which needs two separate grants: the API enabled in a Google Cloud project, and the service account invited to your developer account in Play Console. Enabling one without the other returns a permission error, so do both.

Start in the [Google Cloud console](https://console.cloud.google.com/):

1. **Select or create a project.** Use the project picker in the top bar. The project only holds the service account and the API setting, so a small dedicated project is fine.

2. **Enable the Google Play Developer Reporting API.** Go to **APIs & Services** > **Library**, search for "Google Play Developer Reporting API", and click **Enable**. You can also open the [API's page](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com) directly.

3. **Create a service account.** Go to **IAM & Admin** > **Service Accounts** and click **Create service account**. Give it a name you'll recognize later, such as `posthog-play-console`. You can skip the optional steps that grant it project roles and user access – Play Console controls what it can read, not Google Cloud IAM.

4. **Copy the service account's email address.** It looks like `posthog-play-console@your-project.iam.gserviceaccount.com`. You need it for the Play Console step below.

5. **Create a JSON key.** Open the service account, go to its **Keys** tab, and click **Add key** > **Create new key**. Choose **JSON** and click **Create** to download the file. Google doesn't let you download the same key again, so store it securely.

> Upload the file exactly as Google generated it. PostHog reads the `client_email`, `private_key`, `private_key_id`, and `token_uri` fields from it. Editing the file by hand usually breaks the `private_key` value, and a key file created for another provider (a `.p12` file, or a key from an OAuth client rather than a service account) won't work.

## Granting access in Play Console

Now give the service account read access to your apps. In [Play Console](https://play.google.com/console):

1. Go to **Users and permissions**.
2. Click **Invite new users**.
3. Paste the service account's email address into the **Email address** field.
4. Grant read access to the apps you want to sync:
    - To cover every app in the developer account, open the **Account permissions** tab and select **View app information and download bulk reports (read-only)**.
    - To cover specific apps only, open the **App permissions** tab, click **Add app**, choose the apps, and select **View app information (read-only)** for each.
5. Click **Invite user**.

> Play can take up to 48 hours to apply a permission change. If PostHog rejects the credentials right after you invite the service account, wait and try again before you assume the key is wrong.

## Adding a data source

<SourceSetupIntro />

When linking Google Play Console, you'll need:

1. The **Google service account JSON key** you downloaded above. Drag and drop the file to upload it.
2. Optionally, the **app package names** to sync, as a comma-separated list (for example `com.example.app, com.example.other`). Leave this blank to sync every app the service account can see.

> Changing the package names later requires you to upload the key file again. Clearing the field widens the import to every app the service account can read, so PostHog asks whoever makes that change to hold the credentials.

## Sync modes

<SyncModes />

The first sync fetches about 180 days of vitals and about 30 days of error reports, which is roughly what the Reporting API retains for each. After that:

- **Vitals metric sets** (crash rate, ANR rate, slow starts, and the rest) re-read a trailing week on every sync and merge the corrected rows, because Play keeps revising the most recent days.
- **Error reports** sync incrementally on their `eventTime`.
- **Apps, error issues, and anomalies** are small tables that refresh in full.

Play also drops rows whose user counts fall below its privacy threshold, so vitals for a small app – or for a version with few installs – can have gaps that aren't a sync failure.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Troubleshooting

- **The service account cannot read Play Console reporting data**: one of the two grants is missing. Check that the Google Play Developer Reporting API is enabled in the service account's Google Cloud project, and that the service account's email address appears under **Users and permissions** in Play Console with read access to the apps you're syncing.
- **Google rejected the service account credentials**: the key is no longer valid. This happens when the key was deleted or rotated, or when the service account itself was deleted. Create a new JSON key and reconnect.
- **The uploaded file is not a usable Google service account key**: the file isn't the JSON key Google generated, or its contents were modified. Download a fresh key from **IAM & Admin** > **Service Accounts** > your account > **Keys** and upload it unchanged.
- **A package name syncs no rows**: the service account can authenticate but has no permission for that specific app. Add the app under **App permissions** in Play Console, or grant account-level access instead.

<TroubleshootingLink />
