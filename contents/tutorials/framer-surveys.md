---
title: "How to create a survey in Framer with PostHog"
date: 2023-11-28
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
tags: ['surveys']
---

Surveys are a great way to conduct market research and collect qualitative data from your users. This tutorial shows you how to do exactly that by using PostHog on your [Framer](https://framer.com/) website.

We'll show you to add PostHog to your Framer site and then create beautiful surveys in just a few clicks.

## Adding PostHog to your Framer site

First, [sign up to PostHog](https://app.posthog.com/signup). Then, go to your [project settings](https://app.posthog.com/settings/project) and copy your web snippet:

![PostHog web snippet](../images/tutorials/framer-surveys/web-snippet.png)

With the snippet copied, go to your Framer project settings by clicking the gear in the top right. If you haven’t already, sign up for the "Mini" site plan. This enables you to add custom code.

Go to the "General" tab in site settings and scroll down to the "Custom Code" section. Under "End of `<head>` tag", paste your PostHog snippet. Make sure to press "Save" next to custom code.

Finally, publish your site.

![How to add PostHog to Framer](../images/tutorials/framer-surveys/add-posthog-to-framer.mp4)

## Create your survey

Create a survey in PostHog by going to the [surveys tab](https://app.posthog.com/surveys) and clicking "New survey." There are a variety of [survey types](/docs/surveys/creating-surveys#question-type) to choose from, or you can create your own by clicking "Create blank survey".

![PostHog survey templates](../images/tutorials/framer-surveys/survey-templates.png)

Next, customize your survey as needed. You can customize the questions, branding, and targeting. See our [survey docs](/docs/surveys/creating-surveys) for more details on how to do so.

Then, click "Save as draft" and then "Launch". Your survey is now live and you should see it on your website! 

## Viewing survey results

After interacting with your survey, you can view results by selecting the survey from the [surveys tab](https://app.posthog.com/surveys). You'll see data on:

- How many users have seen the survey.
- How many users have dismissed the survey.
- Responses.

You can also filter these results based on [user properties](/docs/product-analytics/user-properties), [cohorts](/docs/data/cohorts), [feature flags](/docs/feature-flags/creating-feature-flags) and more.

![Survey results](../images/tutorials/framer-surveys/survey-results.png)

## Further reading

- [How to set up Framer analytics and session recordings with PostHog](/tutorials/framer-analytics)
- [How to run A/B tests in Framer with PostHog](/tutorials/framer-ab-tests)
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)