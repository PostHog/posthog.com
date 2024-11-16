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

It's useful to send survey responses from your users to Slack. This way you're notified as soon as they respond to a survey. You can do this using our realtime destinations.

This requires you to create a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

Once created, go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and search for the **Slack** destination and click **+ Create**. On the creation screen:

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

<NewsletterForm />