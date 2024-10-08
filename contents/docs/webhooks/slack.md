---
title: How to setup the Slack webhook
sidebar: Docs
showTitle: true
---

You can receive messages in Slack whenever your [actions](/docs/user-guides/actions) trigger. 
# TODO

> Our new [realtime Slack destinations](/docs/cdp/destinations/slack) is currently in preview. It provides more formatting options, a revamped configuration UI, and the ability to send events *or* actions. Go to [its listing in the data pipeline docs](/docs/cdp/destinations/slack) to learn more.

## 1. Create an app in Slack

Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1) and create a new app. Call it "PostHog" and connect it to the workspace of your choice.

Optional: Feel free to use an image from [here](/media) as the app's logo.

![image](https://user-images.githubusercontent.com/53387/78574619-86939580-782a-11ea-8617-caf1ffe2783a.png)

## 2. Create a webhook in Slack

Go to the 'Incoming Webhooks' page for your newly-created app and toggle 'Activate Incoming Webhooks' to turn it on. Then click on 'Add New Webhook to Workspace' and select the channel that the action posts to.

![image](https://user-images.githubusercontent.com/53387/78574881-ec801d00-782a-11ea-9b87-8a40e49dd912.png)

[//]: # (## 3. Connect your webhook to PostHog)

[//]: # ()
[//]: # (Copy the Webhook URL from Slack, navigate to [project settings]&#40;https://app.posthog.com/project/settings&#41; in PostHog, and paste the URL into the "Webhook integration section".)

[//]: # ()
[//]: # (![Add webhook integration]&#40;https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/webhooks/webhook-integration.png&#41;)

[//]: # ()
[//]: # (Click "Test & Save" and you should receive a message on Slack. Using this method, it's only possible to receive messages in a single Slack channel. If you'd like to receive messages in more than one channel, you can use our new [realtime Slack destination]&#40;/docs/cdp/destinations/slack&#41;.)

[//]: # ()
[//]: # (> **Note:** In your project settings, you'll also see a "Slack integration" section. You can ignore this as this is not required for setting up the Slack webhook. It's only required for setting up [Subscriptions]&#40;/docs/data/subscriptions&#41; to receive regular reports for any insight or dashboard.)

[//]: # (> )

[//]: # (> ![Screenshot of Slack integration]&#40;https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/webhooks/slack-integration-for-subscriptions.png&#41; )

[//]: # ()
[//]: # (## 4. Post actions to the webhook)

[//]: # ()
[//]: # (In PostHog, navigate to the [action]&#40;https://app.posthog.com/data-management/actions&#41; that you'd like to receive webhooks for. Then select "Post to webhook when this action is triggered". You can also modify the [message format]&#40;/docs/webhooks#message-formatting&#41;.)

[//]: # ()
[//]: # (![PostHog Edit Action]&#40;https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/post-action-slack.png&#41;)

## 5. Celebrate!

![Slack Message](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/slack-message.png)

