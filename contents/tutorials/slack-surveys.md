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

It's useful to send survey responses from your users to Slack. This way you're notified as soon as they respond to a survey. There are two options for setting this up: PostHog webhooks or our new realtime destinations.

The requirement for both is that you created a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

## Option 1: Using PostHog webhooks

### Step 1: Create an app in Slack

To use PostHog webhooks, the first step is configure an app in Slack that will send messages with the survey responses.

Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1), click **Create New App**, and then click **From scratch**. Name your app "PostHog", connect it to the workspace of your choice, and click **Create App**.

Optional: Feel free to use an image from [here](/media) as the app's logo.

![How to create a new Slack app](https://res.cloudinary.com/dmukukwp6/image/upload/v1719297218/posthog.com/contents/Screenshot_2024-06-25_at_8.32.52_AM.png)

### Step 2: Create a webhook in Slack

Go to the **Incoming Webhooks** page for your newly-created app and toggle **Activate Incoming Webhooks** to turn it on. Then click **Add New Webhook to Workspace** and select the channel that the you want to send survey responses to.

Once created, copy the URL for your new webhook.

![Select a channel to send survey responses to](https://res.cloudinary.com/dmukukwp6/image/upload/v1719298010/posthog.com/contents/Screenshot_2024-06-25_at_8.46.36_AM.png)

### Step 3: Connect your webhook to PostHog

Go to **Integration** section in your [PostHog project settings](https://us.posthog.com/settings/project#integration-webhooks) and paste the URL from the previous step in the **Webhook integration** field.

Click **Test & Save** and you should receive a message in Slack from your app.

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1719298455/posthog.com/contents/Screenshot_2024-06-25_at_8.52.58_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1719298455/posthog.com/contents/Screenshot_2024-06-25_at_8.53.10_AM.png"
    alt="Connect your Slack webhook to PostHog" 
    classes="rounded"
/>

> **Note:** In your project settings, you'll also see a "Slack integration" section. You can ignore this as it is not required for setting up the Slack webhook. It's only required for setting up [subscriptions](/docs/data/subscriptions) to receive regular reports for any insight or dashboard.
> 
> ![Screenshot of Slack integration](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/webhooks/slack-integration-for-subscriptions.png) 

### Step 4: Create an action for your survey responses

In PostHog, navigate to [actions](https://us.posthog.com/data-management/actions) in the **Data management** tab. Click the **New action** button in the top right and then **From event or pageview**. 

Then under **Match Group #1**, click on the **Other events** tab and set the **Event name** to `survey sent`.

Lastly, check the box for **Post to webhook when this action is triggered** and set the **Slack message format** to `New response for [event.properties.$survey_name] from [person]: "[event.properties.$survey_response]"`.

Altogether it should look like this:

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1719301544/posthog.com/contents/Screenshot_2024-06-25_at_9.36.43_AM.png"
    imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1719301545/posthog.com/contents/Screenshot_2024-06-25_at_9.36.53_AM.png"
    alt="Setting up a survey action" 
    classes="rounded"
/>

And we're done! Now whenever a user responds to your surveys, you'll receive a message in Slack

![Survey response in Slack](https://res.cloudinary.com/dmukukwp6/image/upload/v1719301538/posthog.com/contents/Screenshot_2024-06-25_at_9.43.26_AM.png)

## Option 2: Using realtime destinations

Our new [realtime destinations](/docs/cdp/destinations) are currently in preview. These provide customizable destinations, more formatting options, a revamped configuration UI. We can use them to send survey responses to Slack or any other destination that supports webhooks.

To do this, start by enabling the **Pipeline destinations 3000** feature preview.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_10_43_50_2x_3dfeeef497.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_10_41_53_2x_6d5fb3686c.png"
    alt="Enable Pipeline destinations 3000 feature preview"
    classes="rounded"
/>

Next, go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and search for the **Slack** destination and click **+ Create**. On the creation screen:

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
