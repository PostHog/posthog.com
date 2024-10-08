---
title: How to setup the Discord webhook
sidebar: Docs
showTitle: true
---

You can send messages to Discord whenever an [action](/docs/user-guides/actions) triggers.  
# TODO

## 1. Create an incoming webhook in Discord 

1. Navigate to the channel where you want to add the webhook and select the 'Edit Channel' option from left navigation pane. 
1. Select the 'Integrations' option from the left navigation pane. 
1. If you are creating a webhook for the first time, click the "Create Webhook" button. If you have other webhooks, click "View Webhooks" and then "New Webhook". 
2. Give the webhook a name. 
3. Select the channel where the message should be posted from the dropdown.
4. Click the "Copy Webhook URL" button to copy the URL.  

It should look something like this. 

![Discord Webhook setup](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/discord-webhook.png)

For more information, see the [Discord webhook docs](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

# TODO: this is no longer valid

[//]: # (## 2. Setup the webhook in PostHog)

[//]: # ()
[//]: # (Copy the Webhook URL from Discord, navigate to project settings in PostHog, and paste the URL into the "Webhook integration section".)

[//]: # ()
[//]: # (![Add webhook integration]&#40;https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/webhooks/webhook-integration.png&#41;)

[//]: # ()
[//]: # (Click "Test & Save" and you should receive a message on Discord. )

[//]: # ()
[//]: # (## 3. Post actions to the webhook)

[//]: # ()
[//]: # (In PostHog, navigate to the [action]&#40;https://app.posthog.com/data-management/actions&#41; that you'd like to receive webhooks for. Then select "Post to webhook when this action is triggered". You can also modify the [message format]&#40;/docs/webhooks#message-formatting&#41;.)

[//]: # ()
[//]: # (![PostHog edit action]&#40;https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/post-action-slack.png&#41;)

## 4. Celebrate
![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/discord-message.png)

