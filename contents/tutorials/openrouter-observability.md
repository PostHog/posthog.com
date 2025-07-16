---
title: How to set up OpenRouter LLM observability
date: 2025-02-20
author:
 - ian-vanagas
tags:
 - LLM observability
---

OpenRouter makes it easy to use a range of different LLMs. No matter which you use, understanding API usage, costs, and latency is crucial for understanding how users interact with your AI features. In this tutorial, we'll show you how to monitor important metrics such as:

- Total cost across different models
- Average cost per user
- Average API response time
- Model performance comparisons

We'll build a basic Next.js app, implement the OpenRouter API, and capture these events automatically using PostHog.

## 1. Creating a Next.js app

To make requests to OpenRouter and display the responses, we’ll create a basic Next.js app. To do this, start by ensuring [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following command. Say **no** to TypeScript, **yes** to app router, and the defaults for other options.

```bash
npx create-next-app@latest openrouter-observability
```

After creating your app, go into the newly created folder and install the required dependencies:

```bash
cd openrouter-observability
npm install --save posthog-node @posthog/ai openai
```

Now, we can create our frontend. It will be:

- A form with a textfield and button for user input
- A label to show the AI output
- A dropdown to select different OpenRouter models
- An API call to our backend to generate a response

We can do this all in `app/page.js` like this:

```js
'use client'
import React, { useState } from 'react';

const models = ['openai/gpt-4o', 'anthropic/claude-3-haiku', 'meta-llama/llama-2-70b-chat'];

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const fetchAIResponse = async () => {
    try {
      setAiResponse('Generating...');

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput, model: selectedModel }),
      })
      const response = await res.json();
      setAiResponse(response.content);
    } catch (error) {
      setAiResponse(error.message);
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
    fetchAIResponse();
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
      <label>AI Response:</label>
      <label>{aiResponse}</label>
    </div>
  );
};

```

Once saved, run `npm run dev` to see your new frontend in action.

![]()

## 2. Adding and tracking the generate API route

Next in the `app` directory, create an `api` directory, a `generate` directory inside it, and a `route.js` file inside that. In `app/api/generate/route.js`, create your API route to call OpenRouter through the OpenAPI client and generate a response. We’ll use PostHog’s OpenAI provider to capture all the details of the call.

Altogether, this looks like this:

```js
import { NextResponse } from 'next/server';
import { OpenAI } from '@posthog/ai'
import { PostHog } from 'posthog-node'

const phClient = new PostHog(
  '<ph_project_api_key>',
  { host: '<ph_api_client_host>' }
)

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '<openrouter_api_key>',
  posthog: phClient,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { input, model } = body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: model
    });

    return NextResponse.json({
      content: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request' },
      { status: 500 }
    );
  }
}
```

Now, when you run `npm run dev` again, you can choose your model, enter your message, and press **send** to get a response. This also captures an `$ai_generation` event in PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_38_43_2x_ad1da3c171.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_39_10_2x_68549e274d.png"
  alt="PostHog"
  classes="rounded"
/>

## 3. Viewing generations in PostHog

After generating a few responses with different models, go to PostHog and enable the [LLM observability feature preview](https://app.posthog.com/settings/user-feature-previews#llm-observability). Once enabled, you can access the [LLM observability dashboard](https://us.posthog.com/llm-observability) to see:

- Overview of all AI interactions
- Cost breakdowns by model
- Response latency comparisons
- Token usage across different providers
- Full conversation traces

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_42_37_2x_7498348cf0.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_42_23_2x_c65197a963.png"
  alt="PostHog"
  classes="rounded"
/>

Head to the [generations tab](https://us.posthog.com/llm-observability/generations) to get details on each generation as well as model, cost, token usage, latency, and more. You can even see the conversation input and output.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_47_59_2x_d4196d55f8.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_20_at_14_48_10_2x_70d634cef9.png"
  alt="PostHog"
  classes="rounded"
/>

## Further reading

- [How to set up OpenAI observability](/tutorials/openai-observability)
- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics)
- [Product metrics to track for LLM apps](/product-engineers/llm-product-metrics)
