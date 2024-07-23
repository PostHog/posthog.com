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

It's useful to send survey responses from your users to Slack. This way you're notified as soon as they respond to a survey. This tutorial shows you how to set this up in PostHog and Slack.

## Step 1: Create your survey

The first step is to create a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).


## Step 2: Create an app in Slack

The next step is configure an app in Slack that will send messages with the survey responses.

Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1), click **Create New App**, and then click **From scratch**. Name your app "PostHog", connect it to the workspace of your choice, and click **Create App**.

Optional: Feel free to use an image from [here](/media) as the app's logo.

![How to create a new Slack app](https://res.cloudinary.com/dmukukwp6/image/upload/v1719297218/posthog.com/contents/Screenshot_2024-06-25_at_8.32.52_AM.png)

## Step 3: Create a webhook in Slack

Go to the **Incoming Webhooks** page for your newly-created app and toggle **Activate Incoming Webhooks** to turn it on. Then click **Add New Webhook to Workspace** and select the channel that the you want to send survey responses to.

Once created, copy the URL for your new webhook.

![Select a channel to send survey responses to](https://res.cloudinary.com/dmukukwp6/image/upload/v1719298010/posthog.com/contents/Screenshot_2024-06-25_at_8.46.36_AM.png)

## Step 4: Connect your webhook to PostHog

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

## Step 5: Create an action for your survey responses

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

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)
