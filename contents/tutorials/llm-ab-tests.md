---
title: How to A/B test LLM models and prompts
date: 2024-07-01
author:
  - lior-neu-ner
tags:
  - experimentation
---

A/B tests enable you to compare how changes to LLM models and prompts affect your app. In this tutorial, we'll show you how to set one up to effectively evaluate your LLM improvements.

We set up a basic Next.js app, add PostHog, create A/B tests, and implement the code for them.

> While this tutorial focuses on [Next.js](/docs/libraries/next-js) and [Node](/docs/libraries/node), PostHog supports many different [SDKs](/docs/libraries) and [frameworks](/docs/frameworks). The concepts in this tutorial apply to all our supported SDKs and frameworks. 

## 1. Download the sample app

We've created a basic recipe builder app for this tutorial. You can download it from [Github](https://github.com/PostHog/llm-ab-tests-sample-app). 

```bash
git clone https://github.com/PostHog/llm-ab-tests-sample-app
/```

To set your app up, first ensure [Node](https://nodejs.dev/en/learn/how-to-install-nodejs/) is install. Then run `npm install` to install all dependencies. 

You must also replace `YOUR_API_KEY` in `src/app/api/generate-recipe/route.js` with your Open AI api key:

```js file=src/app/api/generate-recipe/route.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});
```

Run `npm run dev` and go to `http://localhost:3000` to everything in action. The app works as follows:

- Users first log in by entering in their email. The code for this page is in `src/app/page.js`.

- After login, they are navigated to `recipe-builder/page.js`. Here they can type in a few ingredients and receive a recipe created by an LLM.

- Once they've received the recipe, they can rate the response.

- API calls to the LLM are made in `src/app/api/generate-recipe/route.js`. We're using ChatGPT for this tutorial, but you can use any LLM you like.

![Recipe builder LLM app](https://res.cloudinary.com/dmukukwp6/video/upload/v1719491832/posthog.com/contents/smaple-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. We install both the [JavaScript Web](/docs/libraries/js) and [Node](/docs/libraries/node) SDKs:

- The **JavaScript Web SDK** runs client-side. We use this to capture user evaluations for the helpfulness of the recipes.
- The **Node SDK** runs server-side. We use this to implement our A/B test code since our LLM requests run in the backend.

Run the following commands in your root directory:

```bash
# in the root directory
npm install posthog-node
npm install posthog-js
touch src/app/providers.js
```

This installs the SDKs as well as creates a `providers.js` file. We use this to set up a PostHog provider for our client-side code. Add the following code to the file:

```js file=app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
    })
  }, []);
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Add your PostHog API key and host to the above code. You can find them in your [project settings](https://us.posthog.com/settings/project).

Next, we import the `PHProvider` component into our `app/layout.js` and wrap our app with it:

```js file=app/layout.js
import "./globals.css";
import { PHProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  );
}
```

To test everything has been set up correctly, restart your app and click on a few buttons. You should start seeing events in your [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1719499628/posthog.com/contents/Screenshot_2024-06-27_at_2.40.14_PM.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1719499628/posthog.com/contents/Screenshot_2024-06-27_at_2.40.26_PM.png"
    alt="Events in the PostHog activity tab" 
    classes="rounded"
/>

Lastly, to set PostHog up in our server-side API route, import `posthog-node` and initialize it at the top of the `src/app/api/generate-recipe/route.js` file using your API key and host:

```js file=src/app/api/generate-recipe/route.js
import OpenAI from 'openai';
import { PostHog } from 'posthog-node'

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

export async function POST(request) {
  const posthog = new PostHog("<ph_project_api_key>", {
    api_host:  "<ph_client_api_host>",
  })
  
// rest of your existing code
```

## 3. Capture events for your A/B test

Now that we have PostHog set up, the next step is to capture events to use as our goal metric in our A/B test. In our case, we want to use a user feedback score as the goal metric.

To do this, we capture an event every time clicks the **Yes** or **No** buttons when asked if the LLM response was helpful. We assign a score of **+1** if they click Yes and **-1** if No.

Update the code in `recipe-builder/page.js` to import the [`usePostHog()`](/docs/libraries/react#using-posthog-js-functions) hook and capture events in the `handleYesClick` and `handleNoClick` functions:

```js file=recipe-builder/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

export default function RecipeBuilder() {
    // existing code...

  const posthog = usePostHog()

  const handleYesClick = () => {
    posthog.capture('user_recipe_feedback',
      {
        score: 1
      }
    )
  };

  const handleNoClick = () => {
    posthog.capture('user_recipe_feedback',
      {
        score: -1
      }
    )
  };

  // rest of your existing code
```

Next, we want to make sure we attribute these events to the user who submitted them. This ensures our A/B test results are accurate. 

To do this, we call [`posthog.identify()`](/docs/product-analytics/identify) with the user's email. This links any captured events to the user.

Update the code `src/app/page.js` to import the `usePostHog` hook and call `identify` inside the `handleLogin` function:

```js  file=src/app/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

export default function Home() {
  // existing code

  const posthog = usePostHog()

  const handleLogin = () => {
    if (email) {
      posthog.identify(email);
      localStorage.setItem('email', email);
      router.push('/recipe-builder');
    }
  };

  // rest of your existing code
```

Lastly, when a user log outs we call [`posthog.reset()`](/docs/libraries/js#reset-after-logout) to unlink any future events. Update the `handleLogout` function in `recipe-builder/page.js` to do this:

```js file=recipe-builder/page.js
  // existing code...
  
  const handleLogout = () => {
    posthog.reset();
    localStorage.removeItem('email');
    router.push('/');
  };

  // existing code...
```

Restart your app and test everything is working by clicking the **Yes** and **No** buttons a few times in your app. You should see `user_recipe_feedback` events with the user's email in your [activity tab](https://us.posthog.com/project/48886/activity/explore).

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1719568497/posthog.com/contents/Screenshot_2024-06-28_at_10.54.11_AM.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1719568497/posthog.com/contents/Screenshot_2024-06-28_at_10.54.18_AM.png"
    alt="User feedback events in PostHog" 
    classes="rounded"
/>

## 4. Create an A/B test in PostHog

We're going to create a [multivariate experiment](/product-engineers/what-is-multivariate-testing-examples) that tests both the model and prompt. It will have the following variants:

- **Control:** uses the model `gpt-3.5-turbo` and the prompt `Generate a recipe using these ingredients`.
- **Model change**: Same prompt as control but uses the `gpt-4o` model.
- **Prompt change**: Same model as control but uses the prompt `Generate a healthy and delicious high protein recipe using these ingredients`

To do this, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "LLM experiment".
2. Set "Feature flag key" to `llm-experiment`.
3. Click **+ Add test variant**. Name the first test variant to `model-change` and the second one `prompt-change`.
4. Click **Continue**.
5. Change the goal type to **Trend**.
6. Under goal criteria, select the `user_recipe_feedback` event. Click on the **total count** dropdown and select **Property value - average**. Select `score` as the property.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1719569827/posthog.com/contents/Screenshot_2024-06-28_at_11.16.20_AM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1719569827/posthog.com/contents/Screenshot_2024-06-28_at_11.16.28_AM.png" 
  alt="Goal setup in PostHog" 
  classes="rounded"
/>

7. Click **Save as draft** and then **Launch**

## 5. Implement the A/B test code

To implement the A/B test, we:

1. Fetch the `llm-experiment` flag in `api/generate-recipe/route.js` using [`posthog.getFeatureFlag()`](/docs/libraries/node#feature-flags)
2. Update the model or prompt depending on the flag value.
3. Call `await posthog.shutdown()` at the end of our request to flush and send all pending events.

```js file=api/generate-recipe/route.js
// your existing imports and code

export async function POST(request) {
  const posthog = new PostHog("<ph_project_api_key>", {
    api_host:  "<ph_client_api_host>",
  })
  
  const { ingredients, email } = await request.json();

  try {
    let model = "gpt-3.5-turbo";
    let prompt = "Generate a recipe using these ingredients";

    // Fetch the experiment variant and update the model or prompt if needed
    const enabledVariant = await posthog.getFeatureFlag('llm-experiment', email);
    if (enabledVariant === 'model-change') {
      model = 'gpt-4o';
    } else if (enabledVariant === 'prompt-change') {
      prompt = 'Generate a healthy and delicious high protein recipe using these ingredients';
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant that generates recipes." },
        { role: "user", content: `${prompt}: ${ingredients}` }
      ],
    });

    // Flush and send all pending events before the end of the request
    await posthog.shutdown()

    return new Response(JSON.stringify({ recipe: completion.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

```

And we're done setting up our A/B test! Open your app, log in with a few different emails, and click the **Yes** and **No** buttons a few times. You should now see results in your experiment page.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1719581678/posthog.com/contents/Screenshot_2024-06-28_at_2.34.04_PM.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1719581678/posthog.com/contents/Screenshot_2024-06-28_at_2.34.21_PM.png"
    alt="Experiment results" 
    classes="rounded"
/>

## Further reading

- [Product metrics to track for LLM apps](/product-engineers/llm-product-metrics)
- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics)
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 

<NewsletterForm />