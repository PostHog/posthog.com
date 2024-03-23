---
title: How to setup the Microsoft Teams webhook
sidebar: Docs
showTitle: true
---

You can receive messages in Teams whenever an [action](/docs/user-guides/actions) triggers.

## 1. Create an incoming webhook in Teams

1. Navigate to the channel where you want to add the webhook and select (•••) More Options from the top navigation bar.
1. Choose Connectors from the drop-down menu and search for Incoming Webhook.
1. Select the Configure button, provide a name, and, optionally, upload an image avatar for your webhook.
1. The dialog window will present a unique URL for that channel. Make sure that you copy and save the URL – we will need it in the next step.
1. Select the Done button. The webhook will now be available in the team channel.

For more details, see the [Microsoft Teams documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#add-an-incoming-webhook-to-a-teams-channel).

## 2. Setup the webhook in PostHog

Navigate to [project settings](https://app.posthog.com/project/settings) in PostHog paste the URL you copied from Teams into the "Webhook integration section".

![Add webhook integration](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/webhooks/webhook-integration.png)

Click "Test & Save" and you should receive a message on Teams. 

## 3. Post actions to the webhook

In PostHog, navigate to the [action](https://app.posthog.com/data-management/actions) that you'd like to receive webhooks for. Then select "Post to webhook when this action is triggered". You can also modify the [message format](/docs/webhooks#message-formatting).

![PostHog Edit Action](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/post-action-slack.png)

## 4. Celebrate!

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/mt-message.png)
