---
title: How to send survey responses to Slack
date: 2024-06-26
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
tags:
  - surveys
---

It's useful to send survey responses from your users to Slack. This way you're notified as soon as they respond to a survey.

The requirement is that you created a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

## Using webhooks

### Step 1: Create an app in Slack

To use PostHog webhooks, the first step is configure an app in Slack that will send messages with the survey responses.

Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1), click **Create New App**, and then click **From scratch**. Name your app "PostHog", connect it to the workspace of your choice, and click **Create App**.

Optional: Feel free to use an image from [here](/media) as the app's logo.

![How to create a new Slack app](https://res.cloudinary.com/dmukukwp6/image/upload/v1719297218/posthog.com/contents/Screenshot_2024-06-25_at_8.32.52_AM.png)

### Step 2: Create a webhook in Slack

Go to the **Incoming Webhooks** page for your newly-created app and toggle **Activate Incoming Webhooks** to turn it on. Then click **Add New Webhook to Workspace** and select the channel that the you want to send survey responses to.

![Select a channel to send survey responses to](https://res.cloudinary.com/dmukukwp6/image/upload/v1719298010/posthog.com/contents/Screenshot_2024-06-25_at_8.46.36_AM.png)

### Step 3: Create a realtime destination

Our new [realtime destinations](/docs/cdp/destinations) provide customizable destinations, more formatting options, a revamped configuration UI. We can use them to send survey responses to Slack or any other destination that supports webhooks.

To start, go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and search for the **Slack** destination and click **+ Create**. On the creation screen:

1. Follow the steps to integrate with your Slack workspace if you haven't already and then select it.

2. Make sure the PostHog integration is added to the channel you want to send messages to and select it.

3. Under **Match event and actions**, select **survey sent**.

4. Under **Blocks**, modify the text to include the survey name and response. For example:

```json
{
  "text": {
    "text": "*{person.name}* sent a response to {event.properties.$survey_name}: {event.properties.$survey_response}",
    "type": "mrkdwn"
  },
  "type": "section"
},
```

5. Customize the name and description, and press **Create & enable**.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_11_13_44_2x_c72ef7d42e.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_11_14_01_2x_abcf087a94.png"
    alt="Create Slack destination"
    classes="rounded"
/>

You can then test the destination and it will start sending survey responses to Slack.

![Slack message](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_11_21_34_2x_d12f7509fb.png)

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)
