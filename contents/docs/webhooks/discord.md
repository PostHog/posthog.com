---
title: Discord
sidebar: Docs
showTitle: true
---

You can receive messages in Discord whenever any of your specified [actions](/docs/user-guides/actions) are triggered. 

## How to setup the Discord webhook

### 1. Create an incoming webhook in Discord 

1. Navigate to the channel where you want to add the webhook and select the 'Edit Channel' option from left navigation pane. 
1. Select the 'Integrations' option from the left navigation pane. 
1. If you are creating a webhook for the first time, click the "Create Webhook" button. If you have other webhooks, click "View Webhooks" and then "New Webhook". 
2. Give the webhook any name you prefer. 
3. Select the channel where the message should be posted from the drop-down.
4. Click the "Copy Webhook URL" button to copy the webhook URL into the clipboard.  

It should look something like this. 

![Discord Webhook setup](../../images/discord-webhook.png)

For more information, see the [Discord webhook docs](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

### 2. Setup the webhook in PostHog

Copy the Webhook URL from Discord, navigate to project settings in PostHog paste the url into the "Webhook integration section".

![Add webhook integration](../../images/docs/webhooks/webhook-integration.png)

Click "Test & Save" and you should receive a message on Discord. 

### 3. Post actions to the webhook

For each action that should be posted to Discord, select "Post to webhook when this action is triggered". You can also modify the [message format](/docs/integrate/webhooks#message-formatting).

![PostHog edit action](../../images/post-action-slack.png)

### 4. Celebrate
![](../../images/discord-message.png)

