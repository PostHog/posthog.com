---
title: Slack
sidebar: Docs
showTitle: true
---

> For message formatting instructions, see [this dedicated page](/docs/integrate/webhooks/message-formatting).

## 1. Create app
Go to the [Slack page to create apps](https://api.slack.com/apps?new_app=1) and create a new app. Call it "PostHog" and connect it to the workspace of your choice.

Feel free to use an image from [here](/media) as the app's logo.

![image](https://user-images.githubusercontent.com/53387/78574619-86939580-782a-11ea-8617-caf1ffe2783a.png)

## 2. Create Webhook
Go to the 'Incoming Webhooks' page for your newly-created app and toggle 'Activate Incoming Webhooks' to turn it on. Then click on 'Add New Webhook to Workspace' and select the channel that the notifications will be posted to:

![image](https://user-images.githubusercontent.com/53387/78574881-ec801d00-782a-11ea-9b87-8a40e49dd912.png)

## 3. Setup webhook in PostHog
Copy the Webhook URL into the PostHog Setup page:

![PostHog Add Webhook](../../../images/add-webhook.png)

## 4. Add to Action

For each action that should be posted to Slack, select "Post to webhook when this action is triggered":

![PostHog Edit Action](../../../images/post-action-slack.png)

## 5. Celebrate!

![Slack Message](../../../images/slack-message.png)

