---
title: How to send survey responses to Zapier
date: 2025-05-06
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
tags:
  - surveys
---

It can be useful to send survey responses to [Zapier](https://zapier.com/). This way you can automatically trigger workflows in thousands of other apps, such as creating tickets in your help desk or updating your CRM with customer feedback.

To show you how, in this tutorial we set up an example Zap to add survey responses to a Google Sheet.

## Step 1: Create a survey

First, you'll need to create a survey. Our [docs](/docs/surveys/creating-surveys) cover how to do this, so we won't go into detail here. We also have [framework-specific tutorials](/docs/surveys/tutorials#framework-guides).

Once your survey is created, submit a few sample responses.

## Step 2: Set your Zap trigger

You have two options for creating your Zap and setting its trigger:

### Option 1: Via the PostHog app in Zapier  <span class="bg-accent text-gray font-semibold align-middle text-sm p-1 rounded">recommended</span>

1. In PostHog, go to the [actions tab](https://us.posthog.com/project/data-management/actions).
2. Click **New action** and then **From event or pageview**.
3. Select the **Other events** tab and select for the `survey sent` event.
4. Name your action `Survey sent action` and click **Save**.
5. Then in your Zapier dashboard, go to your [zaps](https://zapier.com/app/assets/zaps) and create a new zap.
6. Add the [PostHog app](https://zapier.com/apps/posthog/integrations/webhook) as a trigger.
7. Configure the PostHog app by setting the **Trigger event** to `Action Performed`.
8. Click **Continue** and select the relevant organization and project. In the Action section, select the **Survey sent action** you created in the previous steps.
9. Click  **Continue** and test your trigger.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_02_at_11_21_35_AM_aaca8d5934.png "
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_02_at_11_21_35_AM_aaca8d5934.png "
  alt="Setting up the PostHog app as a trigger in Zapier"
  classes="rounded"
/>

### Option 2: Via PostHog's Data pipelines

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations) tab.
3. Search for **Zapier** and click **+ Create**.
4. In the **Match events and actions** section, search for and select `survey sent`.

> **Note:** If you're using partial responses, you'll need to add the `$survey_completed = true` property to the event filters. Otherwise, the destination will trigger for every question answered, and not only when the survey is completed. [See more details here](/docs/surveys/troubleshooting#handling-partial-responses).

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_08_at_16_17_17_2x_c8235c0413.jpg"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_08_at_16_18_54_2x_e1cee82eaf.jpg"
    alt="Create Zapier destination"
    classes="rounded"
/>

5. Then in your Zapier dashboard, create a new Zap with a [webhook trigger](https://zapier.com/apps/webhook/integrations)
6. Set the **Trigger event** in the webhook to `Catch Hook` and press **Continue**.
7. Leave **Pick off a Child key** as blank and click **Continue**. Do not test your Zap just yet.
8. Go back to your PostHog app then add your webhook URL in PostHog under **Zapier hook path**.
9. Press **Create & Enable** and then click **Start testing**.
10. In the test JSON, replace the `event` and `person` keys with the below (leave the rest of the JSON as is, as Zapier needs the `project` key):

```js
"event": {
"uuid": "a74ebf50-d3ee-485d-bb71-d18e65712fae",
"distinct_id": "00f04232-7ab2-4b23-b447-06cadeeda53d",
"timestamp": "2025-05-02T10:38:57.964Z",
"elements_chain": "",
"url": "https://us.posthog.com/project/22100/events/",
"event": "survey sent",
"properties": {
  "$current_url": "https://us.posthog.com/project/22100/pipeline/destinations/hog-0196908f-5715-0000-0c61-58b9e9994d38/configuration",
  "$browser": "Chrome",
  "$survey_id": "01968718-2d82-0000-3dbf-8feac9b6fd09",
  "$survey_response_4c3581e0-0131-4c0e-b471-9d70266e565a": 9,
  "$survey_questions": [
  {
    "id": "4c3581e0-0131-4c0e-b471-9d70266e565a",
    "index": 0,
    "question": "How likely are you to recommend us to a friend?"
  }
]
}
},
"person": {
"id": "965a371a-a1a5-4881-8b95-9747d1b0d4ac",
"properties": {
  "email": "max@posthog.com"
},
"name": "Max the hedgehog",
"url": "https://us.posthog.com/person/965a371a-a1a5-4881-8b95-9747d1b0d4ac"
},

// ...rest of the json
```

1.  Click **Test function**. You should see a `Success` banner.
2.  Go back to Zapier and press **Test trigger**. You should see the test request appear.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_02_at_11_55_03_AM_be9092dc5d.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_02_at_11_55_03_AM_be9092dc5d.png"
  alt="Setting up the webhook trigger in Zapier using PostHog CDP"
  classes="rounded"
/>

## Step 3: Add the Google Sheet action

1. Create a new spreadsheet and name it something like `PostHog survey tutorial`.
2. In the first row, add these headers to your columns: `email`, `question`, `response`
3. Go to Zapier and add Google Sheet as an action.
4. Under Action event, select `Create Spreadsheet Row`.
5. Connect your Google account if you haven't already.
6. Fill out the rest of the action as needed.

Note that to select the correct key for the survey responses in Zapier, you'll need to go to your survey page in PostHog and click **Copy survey response key** for each question. Each key has a format of `$survey_response_{response_key}` and you can paste this into Zapier.

Once you've completed this step, you can publish your Zap and survey responses should begin to populate the sheet.

## Available properties

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
