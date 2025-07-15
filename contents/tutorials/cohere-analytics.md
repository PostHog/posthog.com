---
title: How to set up LLM analytics for Cohere
date: 2025-02-18
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

Tracking your Cohere usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM-powered features. In this tutorial, we show you how to monitor important metrics such as:

- Total cost
- Average cost per user
- Average API response time

We'll build a basic Next.js app, implement the Cohere API via the Vercel AI SDK, and capture these events automatically using PostHog's LLM observability.

## 1. Creating a Next.js app

To showcase how to track important metrics, we create a simple one-page Next.js app with the following:

- A form with a textfield and button for user input
- A label to show Cohere output
- A dropdown to select different [Cohere models](https://docs.cohere.com/docs/command-r)
- An API route to call Cohere and generate a response

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following script to create a new Next.js app. Say **no** to TypeScript, **yes** to app router, and the defaults for all the other options.

```bash
npx create-next-app@latest cohere-analytics
```

After creating your app, go into the newly created `cohere-analytics` directory and install the PostHog [Node SDK](/docs/libraries/node) as well as the Vercel AI SDK and Cohere provider:

```bash
cd cohere-analytics
npm install --save posthog-node @posthog/ai ai @ai-sdk/cohere
```

Next, we'll create our frontend by replacing the placeholder code in `app/page.js`. Our frontend will be a simple form with an input, model selector, and response label. Each of these will need a state. We'll also set up an API call to `/api/generate` with the user's input and model.

```js
// app/page.js
'use client'
import React, { useState } from 'react';

const models = [
  'command-r-plus',
  'command-r',
  'command'
];

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [cohereResponse, setCohereResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const fetchCohereResponse = async () => {
    try {
      setCohereResponse('Generating...');

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput, model: selectedModel }),
      })
      const response = await res.json();
      setCohereResponse(response.content);
    } catch (error) {
      setCohereResponse(error.message);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCohereResponse();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
      <select value={selectedModel} onChange={handleModelChange}>
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
      <label>Cohere Response:</label>
      <label>{cohereResponse}</label>
    </div>
  );
};

```

Run `npm run dev` to see our app in action:

![App in action](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_10_11_2x_9a50df887d.png)

## 2. Adding and tracking the generate API route

In the `app` folder, create an `api` folder, a `generate` folder inside it, and then a `route.js` file in that. This is our `/api/generate` API route that calls the Cohere API and returns the response.

Next, set up:

1. The PostHog Node client using our project API key and instance address which you can get from [your project settings](https://us.posthog.com/settings/project).
2. The Cohere client which requires an API key from your [Cohere dashboard](https://dashboard.cohere.com/api-keys).

```js
// app/api/generate/route.js
import { NextResponse } from 'next/server';
import { createCohere } from '@ai-sdk/cohere';
import { generateText } from 'ai';
import { PostHog } from 'posthog-node';
import { withTracing } from '@posthog/ai';

const phClient = new PostHog(
  '<ph_project_api_key>',
  { host: '<ph_api_client_host>' }
);

const cohere = createCohere({
  apiKey: '<cohere_api_key>'
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { input, model } = body;

    // Wrap the Cohere model with PostHog tracing
    const tracedModel = withTracing(cohere(model), phClient, {
      posthogDistinctId: '<your_distinct_id>', // optional
      posthogProperties: { // optional
        conversation_id: 'abc123',
        user_type: 'paid'
      }
    });

    const { text } = await generateText({
      model: tracedModel,
      prompt: input
    });

    return NextResponse.json({
      content: text
    });

  } catch (error) {
    console.error('Cohere API error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request' },
      { status: 500 }
    );
  }
}

```

Now, when we run `npm run dev` again and submit an input, we should see a response as well as the generation autocaptured into PostHog as an `$ai_generation` event.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_24_01_2x_da3bf2b39b.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_23_45_2x_458ccaffa1.png"
  alt="PostHog autocaptured generation events"
  classes="rounded"
/>

## 3. Viewing generations in PostHog

Once you generate a few responses, go to PostHog and enable the [LLM observability feature preview](https://app.posthog.com/settings/user-feature-previews#llm-observability). Once enabled, go to the LLM observability tab to get an overview of traces, users, costs, and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_28_10_2x_242d0e7bf5.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_28_24_2x_1f8f41ec2d.png"
  alt="PostHog LLM observability dashboard"
  classes="rounded"
/>

You can also go into more detail by clicking on the [generations tab](https://us.posthog.com/llm-observability/generations). This shows each generation as well as model, cost, token usage, latency, and more. You can even see the conversation input and output.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_33_38_2x_a185b712f0.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_14_at_18_33_22_2x_2fecd0ec22.png"
  alt="PostHog LLM observability generations tab"
  classes="rounded"
/>

From here, you can go further by filtering your LLM observability dashboard, use the `$ai_generation` event to [create insights](/docs/product-analytics/insights), [A/B test models](/tutorials/llm-ab-tests), and more.

## Further reading

- [How to set up OpenAI observability](/tutorials/openai-observability)
- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics)
- [Product metrics to track for LLM apps](/product-engineers/llm-product-metrics)
