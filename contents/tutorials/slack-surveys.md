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

> This tutorial requires you to first create a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

It's useful receive Slack notifications as soon as users respond to your surveys. You can do this in PostHog using our [realtime destinations](/docs/cdp/destinations).

After you've created your survey, go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations), search for the **Slack** destination and click **+ Create**. Then on the creation screen:

1. Follow the steps to integrate with your Slack workspace if you haven't already and then select it.

2. Make sure the PostHog integration is added to the channel you want to send messages to and select it.

3. Under **Match event and actions**, select **survey sent**.

4. Under **Blocks**, modify the text to include the survey name and response. For example:

```json
{
  "text": {
    "text": "*{person.name}* sent a response to {event.properties.$survey_name}: {event.properties['$survey_response_a3071551-d599-4eeb-9ffe-69e93dc647b6']}",
    "type": "mrkdwn"
  },
  "type": "section"
},
```

5. Customize the name and description, and press **Create & enable**.

> **Note:** If you're using partial responses, you'll need to add the `$survey_completed = true` property to the event filters. Otherwise, the destination will trigger for every question answered, and not only when the survey is completed. [See more details here](/docs/surveys/troubleshooting#handling-partial-responses).

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_08_at_16_17_17_2x_c8235c0413.jpg"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_08_at_16_18_54_2x_e1cee82eaf.jpg"
    alt="Create Slack destination"
    classes="rounded"
/>

You can then test the destination and it will start sending survey responses to Slack.

![Slack message](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_11_21_34_2x_d12f7509fb.png)

## Survey properties

You can extract the following properties from surveys:

| Property | Description |
|----------|-------------|
| `event.properties.$survey_name` | The name of the survey |
| `event.properties.$survey_questions` | An array of objects containing the following survey question properties: `id`, `question`, and `response` |
| `event.properties.$survey_response_{response_key}` | The response to a specific question. To find `response_key`, go to your survey page and click on the button **Copy survey response key**. There's one for each question in your survey. `response_key` is identical to the corresponding survey question ID |
| `event.properties.$survey_completed` | Whether the survey was completed. Relevant if you're using partial responses. |
| `person.name` or other person properties | The name of the person who responded or other properties |

## Further reading

- [How to set up surveys in Next.js](/tutorials/nextjs-surveys)
- [How to show a survey after a delay](/tutorials/delayed-survey)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)

<NewsletterForm />
