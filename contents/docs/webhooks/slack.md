---
title: How to setup the Slack webhook
sidebar: Docs
showTitle: true
---

You can receive messages in Slack whenever your [actions](/docs/user-guides/actions) trigger. 

> **Note:** Currently it's only possible to receive messages in a single Slack channel. If you'd like to receive messages in more than one channel, you can use the [Zapier integration](/apps/zapier-connector).

## 1. Create an app in Slack
Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1) and create a new app. Call it "PostHog" and connect it to the workspace of your choice.

Optional: Feel free to use an image from [here](/media) as the app's logo.

![image](https://user-images.githubusercontent.com/53387/78574619-86939580-782a-11ea-8617-caf1ffe2783a.png)

## 2. Create a webhook in Slack
Go to the 'Incoming Webhooks' page for your newly-created app and toggle 'Activate Incoming Webhooks' to turn it on. Then click on 'Add New Webhook to Workspace' and select the channel that the action posts to.

![image](https://user-images.githubusercontent.com/53387/78574881-ec801d00-782a-11ea-9b87-8a40e49dd912.png)

## 3. Connect your webhook to PostHog
Copy the Webhook URL from Slack, navigate to [project settings](https://app.posthog.com/project/settings) in PostHog, and paste the URL into the "Webhook integration section".

![Add webhook integration](../../images/docs/webhooks/webhook-integration.png)

Click "Test & Save" and you should receive a message on Slack. 

> **Note:** In your project settings, you'll also see a "Slack integration" section. You can ignore this as this is not required for setting up the Slack webhook. It's only required for setting up [Subscriptions](/docs/data/subscriptions) to receive regular reports for any insight or dashboard.
> 
> ![Screenshot of Slack integration](../../images/docs/webhooks/slack-integration-for-subscriptions.png) 

## 4. Post actions to the webhook

In PostHog, navigate to the [action](https://app.posthog.com/data-management/actions) that you'd like to receive webhooks for. Then select "Post to webhook when this action is triggered". You can also modify the [message format](/docs/webhooks#message-formatting).

![PostHog Edit Action](../../images/post-action-slack.png)

## 5. Celebrate!

![Slack Message](../../images/slack-message.png)

