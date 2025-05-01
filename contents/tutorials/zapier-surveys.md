---
title: How to send survey responses to Zapier
date: 2025-05-01
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
tags:
  - surveys
---

> This tutorial requires you to first create a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

It's useful to send survey responses from your users to [Zapier](https://zapier.com/). This way you can automatically trigger workflows in thousands of other apps, such as creating tickets in your help desk, or updating your CRM with customer feedback.

Once your survey is created, you have two options for creating your Zap:

### Option 1: Via PostHog's Data pipelines

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations) tab.
3. Search for **Zapier** and click **+ Create**.
4. In the **Match events and actions** section, search for `survey sent`.
5. Then in your Zapier dashboard, create a new Zap with a [webhook trigger](https://zapier.com/apps/webhook/integrations) and then add your webhook URL in PostHog under **Zapier hook path**.
6. Press **Create & Enable** and watch your Zaps get triggered in Zapier!

### Option 2: Via the PostHog app in Zapier

1. In PostHog, go to the [actions tab](https://us.posthog.com/project/data-management/actions).
2. Click **New action** and then **From event or pageview**.
3. Select the **Other events** tab and select for the `survey sent` event.
4. Name your action `Survey sent action` and click **Save**.
5. Then in your Zapier dashboard, go to your [zaps](https://zapier.com/app/assets/zaps) and create a new zap.
6. Add the [PostHog app](https://zapier.com/apps/posthog/integrations/webhook) as a trigger.
7. Configure the PostHog app by setting the **Trigger event** to `Action Performed`. 
8. Click **Continue** and select the relevant organization and project. In the Action section, select the **Survey sent** action you created in the previous steps.
9. Click  **Continue** and test your trigger.

## Available properties

You can extract the following properties from surveys to your zaps:

| Property | Description |
|----------|-------------|
| `event.properties.$survey_name` | The name of the survey |
| `event.properties.$survey_questions` | An array of objects containing the following survey question properties: `id`, `index`, and `question` |
| `event.properties.$survey_response_{response_key}` | The response to a specific question. To find `response_key`, go to your survey page and click on the button **Copy survey response key**. There's one for each question in your survey. `response_key` is identical to the corresponding survey question ID |
| `person.name` or other person properties | The name of the person who responded or other properties |

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)

<NewsletterForm />
