---
title: How to create unsubscribe surveys
date: 2025-12-16
author:
  - faisal
showTitle: true
sidebar: Docs
tags:
  - surveys
  - feedback
  - product-analytics
---

If users unsubscribe from your newsletter or stop using your product, it's important to understand **why**.  

With [surveys](/docs/surveys), you can create a quick, automated **unsubscribe survey** to capture feedback right when users decide to leave — helping your team reduce churn and improve user experience.

In this tutorial, we’ll create an unsubscribe survey that automatically appears when a user clicks an unsubscribe link or completes a “cancel” action in your app.

## Step 1: Create an unsubscribe survey

1. Go to [Surveys in PostHog](https://app.posthog.com/surveys).
2. Click **New survey**.
3. Choose the **Open feedback** type.
4. Set your **Title** to `Unsubscribe feedback survey`.
5. Under **Steps**, add a few free form questions like:
   - “What made you decide to unsubscribe?”
   - “How could we improve your experience?”
6. For the response type, select **Short text** or **Long text** depending on your use case.
7. Click **Next** to continue.

![Creating survey](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/unsubscribe_survey_create_ac7b6b7a19.png)

## Step 2: Set a trigger for the unsubscribe event

Next, configure PostHog to automatically trigger the survey when a user performs an unsubscribe or cancel action.

1. Open your site using the [toolbar](https://app.posthog.com/toolbar), navigate to your unsubscribe page, and click the unsubscribe button.
2. In the toolbar, select **Matches this element**, and save the action as `user_unsubscribed` (or a name you prefer).
3. Back in your survey, scroll to the **Display conditions** section.
4. Under **Users who match all of the following…**, add a **User sends events** filter for your `user_unsubscribed` action.
5. Add a **URL contains** filter, such as `/unsubscribe`.
6. Adjust any additional filters if needed (for example, only specific plans or countries).

You can further customize the appearance, placement, and behavior of your survey in the Customization and Display conditions sections.

![Setting unsubscribe event trigger](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/unsubscribe_survey_targeting_344e6ed34d.png)

## Step 3: Publish and test

1. Click **Launch survey** (this may appear as **Publish** in older versions).
2. In your app or test page, perform the **unsubscribe action**.
3. The survey should appear automatically.
   If it doesn’t, check that your **event name matches exactly** in both your code and PostHog.

![Results](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/unsubscribe_survey_results_78f32f5e6a.png)

### Step 4: Analyze unsubscribe feedback

1. After users start unsubscribing, responses will appear under **Surveys → Results**.
2. View text responses to understand common reasons for churn.
3. Analyze behavior: Go to **Insights → Trends** and filter by the `user_unsubscribed` event to compare behavior before and after unsubscribing.
4. Add user properties: In **Persons**, open an unsubscribed user and check properties such as activity frequency or session count.

You can also visualize this data in **Insights**:

1. Go to **Insights**.
2. Create a new insight using the `user_unsubscribed` event.

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)
