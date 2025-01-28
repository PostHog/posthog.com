---
title: How to set up LLM analytics for ChatGPT
date: 2025-01-24
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---


Tracking your ChatGPT or OpenAI API usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM-powered features. 

In this tutorial, we show you how to monitor important metrics such as:

- Total cost
- Average cost per user
- Average API response time

We'll build a basic Next.js app, implement the ChatGPT API, and capture these events automatically using PostHog. 

## 1. Creating a Next.js app

To showcase how to track important metrics, we create a simple one-page React app with the following:

- A form with a textfield and button for user input.
- A label to show ChatGPT output.
- A dropdown to select different [OpenAI models](https://platform.openai.com/docs/models).
- An API route to call the ChatGPT API and generate a response.

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following script to create a new Next.js app. Say **no** to TypeScript, **yes** to app router, and the defaults for all the other options.

```bash
npx create-next-app@latest chatgpt-analytics
```

After creating your app, go into the newly created `chatgpt-analytics` directory and install the PostHog [Node SDK](/docs/libraries/node) and `ai` [package](/docs/ai-engineering/observability) as well as OpenAI's [JavaScript SDK](https://platform.openai.com/docs/libraries/typescript-javascript-library).

```bash
cd chatgpt-analytics
npm install --save posthog-node @posthog/ai openai
```

Next, we'll create our frontend by replacing the placeholder code in `app/page.js`. Our frontend will be a simple form with an input, model selector, and response label. Each of these will need a state. We'll also set up an API call to `/api/generate` with the user's input and model.

```js file=app/page.js
'use client'
import React, { useState } from 'react';

const models = ['gpt-4o', 'chatgpt-4o-latest', 'gpt-4o-mini'];

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatGPTResponse, setChatGPTResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const fetchChatGPTResponse = async () => {
    try {

      setChatGPTResponse('Generating...');

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput, model: selectedModel }),
      })
      const response = await res.json();
      setChatGPTResponse(response.content);
    } catch (error) {
      setChatGPTResponse(error.message);
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
    fetchChatGPTResponse();
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
      <label>ChatGPT Response:</label>
      <label>{chatGPTResponse}</label>
    </div>
  );
};
```

Run `npm run dev` to see our app in action:

![Basic Next.js app with ChatGPT](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_10_50_12_2x_482fd1852c.png)

## 2. Adding and tracking the generate API route

In the `app` folder, create an `api` folder, a `generate` folder inside it, and then a `route.js` file in that. This is our `/api/generate` API route that calls the ChatGPT API and returns the response. 

Next, set up:

1. The PostHog Node client using our project API key and instance address which you can get from [your project settings](https://us.posthog.com/settings/project). 
2. The OpenAI client which requires an API key.

With both of these set up, we simply call the `openai.chat.completions.create` method with the input and model then return the response.

```js file=app/api/generate.js
import { NextResponse } from 'next/server';
import { OpenAI } from '@posthog/ai'
import { PostHog } from 'posthog-node'

const phClient = new PostHog(
  '<ph_project_api_key>',
  { host: '<ph_api_client_host>' }
)

const openai = new OpenAI({
  apiKey: '<openai_api_key>',
  posthog: phClient,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { input, model } = body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: model,
    });

    return NextResponse.json({ 
      content: completion.choices[0].message.content 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request' },
      { status: 500 }
    );
  }
}
```

Now, when we run `npm run dev` again and submit an input, we should see a response as well as the generation autocaptured into PostHog as a `$ai_generation` event.

![Generated](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_10_50_43_2x_9cb0149c7e.png)

## 3. Viewing generations in PostHog

Once you generate a few responses, go to PostHog and enable the [LLM observability feature preview](https://us.posthog.com/settings/project#panel=feature-previews). Once enabled, go to the LLM observability tab to get an overview of traces, users, costs, and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_10_58_04_2x_a87f97d692.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_10_57_32_2x_f8d6385951.png"
  alt="LLM observability dashboard" 
  classes="rounded"
/>

You can also go into more detail by clicking on the [generations tab](https://us.posthog.com/llm-observability/generations). This shows each generation as well as model, cost, token usage, latency, and more. You can even see the conversation input and output.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_11_05_47_2x_31ac89084d.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_11_04_38_2x_4029e378cb.png"
  alt="LLM observability dashboard" 
  classes="rounded"
/>

From here, you can go further by filtering your LLM observability dashboard, use the `$ai_generation` event to [create insights](/docs/product-analytics/insights), [A/B test models](/tutorials/llm-ab-tests), and more.

## Further reading

- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics) 
- [How to set up LLM analytics for Cohere](/tutorials/cohere-analytics)
- [How to monitor LlamaIndex apps with Langfuse and PostHog](/tutorials/monitor-llama-index-with-langfuse)

<NewsletterForm />
