---
title: Linking Slack as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Slack
---

The Slack connector syncs channels, users, and messages from your Slack workspace into PostHog's data warehouse.

<CalloutBox icon="IconWarning" title="Messages aren't backfilled" type="caution">

Channel message tables are **webhook-only**. Only messages sent **after** you set up the source and configure the webhook are synced. Historical messages aren't backfilled. Make sure you complete the webhook setup before you need to start capturing messages.

</CalloutBox>

## Available tables

| Table                      | Description                                                                                           | Sync method  |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| `$channels`                | All public and private channels accessible to the connected account                                   | Full refresh |
| `$users`                   | All users in the workspace                                                                            | Full refresh |
| Per-channel message tables | One table per channel, named by the channel's Slack ID (e.g. `C01ABC123`) with a human-readable label | Webhook only |

## Adding a data source

1. In PostHog, go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Slack by clicking the **Link** button.
3. Click **Connect** and authorize PostHog to access your Slack workspace.
4. _Optional:_ Add a prefix to your table names.
5. Select the tables you want to sync. Each channel appears as its own table you can enable or disable individually.
6. Click **Import**.

PostHog requests the following OAuth scopes from your Slack workspace:

| Scope              | Purpose                           |
| ------------------ | --------------------------------- |
| `channels:read`    | List public channels              |
| `groups:read`      | List private channels             |
| `channels:history` | Read messages in public channels  |
| `groups:history`   | Read messages in private channels |
| `users:read`       | List workspace users              |
| `users:read.email` | Include user email addresses      |
| `reactions:read`   | Include message reactions         |

## Setting up the webhook for message syncing

Because channel message tables rely entirely on webhooks, you need to create a Slack app that forwards message events to PostHog. Without this step, your channel tables stay empty.

1. Go to your Slack source in the [data pipeline sources tab](https://app.posthog.com/data-management/sources) and click the **Webhook** tab.
2. Copy the **webhook URL** shown – you'll paste it into the manifest below.
3. Open [Slack apps](https://api.slack.com/apps?new_app=1) and click **From a manifest**.
4. Pick your workspace and click **Next**.
5. Paste the following manifest into the editor, replacing `{webhook_url}` with the URL you copied in step 2:

```json
{
  "display_information": {
    "name": "PostHog data warehouse",
    "description": "Sync Slack messages and channels to PostHog data warehouse"
  },
  "oauth_config": {
    "scopes": {
      "user": ["channels:history", "groups:history"]
    }
  },
  "settings": {
    "event_subscriptions": {
      "request_url": "{webhook_url}",
      "user_events": ["message.channels", "message.groups"]
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": false
  }
}
```

6. Click **Next**, then **Create**.
7. In the left sidebar, click **Install App**, then **Install to Workspace**, and authorize.
8. Go to **Basic Information** > **App Credentials**, copy the **Signing secret**.
9. Back in PostHog, paste the signing secret into the **Signing secret** field on the **Webhook** tab and save.

PostHog uses the signing secret to verify that incoming events actually came from Slack. Once the webhook is active, new messages in your enabled channels start appearing in their tables.

## Common issues

### Bot not installed

Events won't be sent to PostHog if the Slack app hasn't been installed to your workspace. Even after creating the app and configuring the webhook, you still need to explicitly install it.

To verify:

1. Go to your [Slack app settings](https://api.slack.com/apps).
2. Select your PostHog data warehouse app.
3. Click **Settings** > **Install App** in the left sidebar.
4. Confirm the app shows as installed. If not, click **Install to Workspace** and authorize it.

See Slack's [Installing with OAuth](https://api.slack.com/authentication/oauth-v2) documentation for more details.

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
- Wait a few seconds and try again – transient network issues can cause failures.

See Slack's [Events API](https://api.slack.com/apis/events-api) documentation for more on how URL verification works.

## Configuration

<SourceParameters />
