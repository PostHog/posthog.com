---
title: Linking Slack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Slack
beta: true
---

The Slack connector syncs channels, users, and messages from your Slack workspace into PostHog's data warehouse.

You connect it using your own Slack app: you create an app in your workspace, install it, and paste its bot token into PostHog. Using your own app keeps message syncing within [Slack's API terms](https://slack.com/terms-of-service/api), which restrict third-party apps from bulk-exporting message data.

<CalloutBox icon="IconWarning" title="Messages aren't backfilled" type="caution">

Channel message tables are **webhook-only**. Only messages sent **after** you set up the source and configure the webhook are synced. Historical messages aren't backfilled. Make sure you complete the webhook setup before you need to start capturing messages.

</CalloutBox>

## Available tables

| Table                      | Description                                                                                           | Sync method  |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| `$channels`                | All public and private channels the bot can access                                                    | Full refresh |
| `$users`                   | All users in the workspace                                                                            | Full refresh |
| Per-channel message tables | One table per channel, named by the channel's Slack ID (e.g. `C01ABC123`) with a human-readable label | Webhook only |

## Prerequisites

You need permission to create and install a Slack app in your workspace. If your workspace requires admin approval for new apps, ask an admin to approve it.

## Adding a data source

### 1. Create your Slack app

1. Open [Slack apps](https://api.slack.com/apps?new_app=1) and click **From a manifest**.
2. Pick your workspace and click **Next**.
3. Paste the manifest below into the editor, click **Next**, then **Create**:

```json
{
  "display_information": {
    "name": "PostHog data warehouse",
    "description": "Sync Slack channels, users, and messages to PostHog data warehouse"
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "channels:read",
        "channels:join",
        "groups:read",
        "channels:history",
        "groups:history",
        "users:read",
        "users:read.email",
        "reactions:read"
      ]
    }
  },
  "settings": {
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": false
  }
}
```

These bot scopes let the app list channels and users (`channels:read`, `groups:read`, `users:read`, `users:read.email`), read messages and reactions in channels the bot joins (`channels:history`, `groups:history`, `reactions:read`), and join public channels on your behalf for the "Automatically join public channels" option (`channels:join`).

### 2. Install the app and copy the token

1. In the left sidebar, click **Install App**, then **Install to Workspace**, and authorize.
2. Copy the **Bot User OAuth Token** — it starts with `xoxb-`.

### 3. Connect the source in PostHog

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Slack by clicking the **Link** button.
3. Paste the **Bot User OAuth Token** into the **Bot User OAuth Token** field.
4. Leave **Automatically join public channels** on (the default) to have the bot join every public channel for you, so their messages sync without inviting it to each one. Turn it off to pick channels manually.
5. _Optional:_ Add a prefix to your table names.
6. Select the tables you want to sync. Each channel appears as its own table you can enable or disable individually.
7. Click **Import**.

### 4. Make sure the bot is in your channels

The bot only sees channels it belongs to.

- **Public channels:** with **Automatically join public channels** on (the default), the bot joins them for you (including channels created later, on the next sync). If you turned it off, invite it to each one.
- **Private channels:** always invite the bot manually — it can't add itself.

To invite the bot, run `/invite @PostHog data warehouse` in the channel, or add it from the channel's **Integrations** settings.

## Setting up the webhook for message syncing

Because channel message tables rely entirely on webhooks, your Slack app needs to forward message events to PostHog. Without this step, your channel tables stay empty. You add these events to the **same app** you created above.

1. Go to your Slack source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources) and click the **Webhook** tab.
2. Copy the **webhook URL** shown.
3. Open your app in [Slack apps](https://api.slack.com/apps), go to **Event Subscriptions**, and toggle it on.
4. Paste the webhook URL into the **Request URL** field. Slack sends a verification challenge — wait for the green **Verified** check.
5. Under **Subscribe to bot events**, add `message.channels` and `message.groups`.
6. Click **Save Changes**. Reinstall the app if Slack prompts you to.
7. Go to **Basic Information** > **App Credentials**, copy the **Signing Secret**.
8. Back in PostHog, paste the signing secret into the **Signing secret** field on the **Webhook** tab and save.

PostHog uses the signing secret to verify that incoming events actually came from Slack. Once the webhook is active, new messages in the channels the bot has joined start appearing in their tables.

## Migrating from the legacy connection

Slack sources created before bring-your-own-app used a shared PostHog Slack app. To move an existing source onto your own app:

1. Create and install your own Slack app using the [manifest above](#1-create-your-slack-app).
2. Open your existing Slack source, paste the new **Bot User OAuth Token** into the token field, and save.
3. Re-add the webhook Event Subscriptions to your new app (see [webhook setup](#setting-up-the-webhook-for-message-syncing)) and update the signing secret.

The source switches to your app as soon as the token is saved. If you'd rather start fresh, delete the old source and add a new one instead.

## Common issues

### Bot not in the channel

The bot only receives events and reads history for channels it has joined. If a channel table stays empty or a sync reports `not_in_channel`, invite the bot to that channel with `/invite @PostHog data warehouse`. Private channels must be joined manually.

### Webhook shows "Doesn't respond"

When you enable Event Subscriptions, Slack sends a verification challenge to your webhook URL. If this initial handshake fails, the status stays stuck on **Doesn't respond**.

To fix this:

1. Go to your [Slack app settings](https://api.slack.com/apps) and select your app.
2. Click **Features** > **Event Subscriptions** in the left sidebar.
3. Re-enter or re-paste the Request URL from PostHog's webhook tab.
4. Slack should show a green **Verified** checkmark.

If verification keeps failing:

- Confirm the webhook URL is correct (copy it fresh from PostHog).
- Check that your PostHog source is still active and hasn't been deleted.
- Confirm you set the signing secret on the webhook tab, or the handshake is rejected once a secret is expected.

See Slack's [Events API](https://api.slack.com/apis/events-api) documentation for more on how URL verification works.

### Invalid or revoked token

If a sync reports `invalid_auth` or `token_revoked`, the bot token is no longer valid — for example the app was reinstalled or removed. Copy a fresh **Bot User OAuth Token** from **Settings > Install App** in your Slack app and update it on the source.

## Configuration

<SourceParameters />
