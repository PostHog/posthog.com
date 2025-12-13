---
title: How to create unsubscribe surveys
date: 2025-10-15
author:
  - Faisal
showTitle: true
sidebar: Docs
tags:
  - surveys
  - feedback
  - product-analytics
---

If users unsubscribe from your newsletter or stop using your product, it's important to understand **why**.  
With PostHog Surveys, you can create a quick, automated **unsubscribe survey** to capture feedback right when users decide to leave — helping your team reduce churn and improve user experience.

In this tutorial, we’ll create an unsubscribe survey that automatically appears when a user clicks an unsubscribe link or completes a “cancel” action in your app.

## Step 1: Create an unsubscribe survey

1. Go to your [PostHog Surveys dashboard](https://us.posthog.com/surveys).
2. Click **+ New survey**.
3. Choose the **Website survey** type.
4. Set your **title** to `Unsubscribe feedback survey`.
5. Under **Questions**, add something like:
   - “What made you decide to unsubscribe?”
   - “How could we improve your experience?”
6. For the response type, select **Short text** or **Long text** depending on your use case.
7. Click **Next** to continue.

<ProductScreenshot
  imageLight="/static/images/tutorials/unsubscribe-survey-create.png"
  imageDark="/static/images/tutorials/unsubscribe-survey-create.png"
  alt="Creating a new unsubscribe survey in PostHog"
  classes="rounded"
/>

> 💡 **Tip:** Keep your survey short — one or two questions are ideal.  
> The goal is to capture insights without interrupting the user too much.

## Step 2: Set a trigger for the unsubscribe event

Next, we’ll configure PostHog to automatically trigger the survey when a user performs an unsubscribe or cancel action.

### Use an event-based trigger

1. In PostHog, go to **Data management → Actions**.
2. Click **New action** → **From event or pageview**.
3. Open your site using the **PostHog toolbar**, navigate to your unsubscribe page, and click the unsubscribe button.
4. In the toolbar, select **Matches this element**, and save the action as `user_unsubscribed` (or a name you prefer).
5. In your survey, scroll to the **Display conditions** section (this may be called **Targeting** in older versions of PostHog).
6. Under **Users who match all of the following…**, add a **User sends events** filter for your `user_unsubscribed` action.
7. Add a **URL contains** filter, such as `/unsubscribe`.
8. Adjust any additional filters if needed (for example, only specific plans or countries).

You can further customize the appearance, placement, and behavior of your survey in the Customization and Display conditions sections.

<ProductScreenshot
  imageLight="/static/images/tutorials/unsubscribe-survey-targeting.png"
  imageDark="/static/images/tutorials/unsubscribe-survey-targeting.png"
  alt="Setting unsubscribe event trigger in PostHog"
  classes="rounded"
/>

### Step 3: Publish and test

1. 1. Click **Launch survey** (this may appear as **Publish** in older versions).
2. In your app or test page, perform the **unsubscribe action**.
3. The survey should appear automatically.
   If it doesn’t, check that your **event name matches exactly** in both your code and PostHog.

<ProductScreenshot
  imageLight="/static/images/tutorials/unsubscribe-survey-results.png"
  imageDark="/static/images/tutorials/unsubscribe-survey-results.png"
  alt="Testing the unsubscribe survey in PostHog"
  classes="rounded"
/>

### Step 4: Analyze unsubscribe feedback

1. After users start unsubscribing, responses will appear under **Surveys → Results**.
2. View text responses to understand common reasons for churn.
3. Analyze behavior: Go to **Insights → Trends** and filter by the `user_unsubscribed` event to compare behavior before and after unsubscribing.
4. Add user properties: In **Persons**, open an unsubscribed user and check properties such as activity frequency or session count.

You can also visualize this data in **Insights**:

1. Go to **Insights**.
2. Create a new insight using the `user_unsubscribed` event.

### Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)

<NewsletterForm />
