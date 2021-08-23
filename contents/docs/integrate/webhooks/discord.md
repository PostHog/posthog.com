---
title: Discord
sidebar: Docs
showTitle: true
---

> For message formatting instructions, see [this dedicated page](/docs/integrate/webhooks/message-formatting).

## 1. Create an incoming webhook in Discord 

1. Navigate to the channel where you want to add the webhook and select the 'Edit Channel' option from left navigation pane. 
1. Select the 'Integrations' option from the left navigation pane. 
1. If creating a webhook for the first time, click the "Create Webhook" button. 
1. If you have other webhooks, click "View Webhooks" and now click "New Webhook". 
1. Give the webhook any name you prefer (say PostHog). 
1. Select the channel where the message should be posted from the drop-down.
1. Click the "Copy Webhook URL" button to copy the webhook URL into the clipboard.  

It would look something like this. 

![Discord Webhook Setup](../../../images/discord-webhook.png)

For more information see the [Discord webhook docs](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## 2. Setup webhook in PostHog

1. Copy the Webhook URL into the PostHog Setup page:

    ![PostHog Add Webhook](../../../images/discord-add-webhook.png)

1. Click "Test & Save" and you should receive a message on Discord. 

## 3. Add to Action

For each Action that should be posted to Discord, select "Post to webhook when this action is triggered":

![PostHog Edit Action](../../../images/post-action-slack.png)

## 4. Celebrate
![](../../../images/discord-message.png)

