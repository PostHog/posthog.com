---
title: How to set up LLM analytics for Anthropic's Claude
date: 2025-02-06
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

Tracking your Claude usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM-powered features.

In this tutorial, we'll build a basic Next.js app, implement the Claude API, and capture these events automatically using PostHog's LLM observability product.

## 1. Creating a Next.js app

To showcase how to track important metrics, we create a simple app with the following:

- A form with a textfield and button for user input
- A dropdown to select different [Anthropic models](https://docs.anthropic.com/claude/docs/models-overview)
- An API route to call Claude and generate a response
- A label to show Claude's output

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following to create a new Next.js app. Say **no** to TypeScript, **yes** to app router, and the defaults for all the other options.

```bash
npx create-next-app@latest claude-analytics
```

After creating your app, go into the newly created `claude-analytics` directory and install the PostHog [Node SDK](/docs/libraries/node) and `ai` package as well as Anthropic's JavaScript SDK.

```bash
cd claude-analytics
npm install --save posthog-node @posthog/ai @anthropic-ai/sdk
```

Next, we'll create our frontend by replacing the placeholder code in `app/page.js`. Our frontend will be a simple form with an input, model selector, and response label. Each of these needs a state. We'll also set up an API call to `/api/generate` with the user's input and model.

```js
// app/page.js
'use client'
import React, { useState } from 'react';

const models = [
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307'
];

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const fetchClaudeResponse = async () => {
    try {
      setClaudeResponse('Generating...');

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput, model: selectedModel }),
      })
      const response = await res.json();
      setClaudeResponse(response.content);
    } catch (error) {
      setClaudeResponse(error.message);
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
    fetchClaudeResponse();
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
      <label>Claude Response:</label>
      <label>{claudeResponse}</label>
    </div>
  );
};

```

Once updated, run `npm run dev` to see our app in action:

![Basic web app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_09_44_502x_bad984900d.png)

## 2. Adding and tracking the generate API route

In the `app` folder, create an `api` folder, a `generate` folder inside it, and then a `route.js` file in that. This is our `/api/generate` API route that calls the Claude API and returns the response.

Next, set up:

1. The PostHog Node client using our project API key and API host which you can get from [your project settings](https://us.posthog.com/settings/project).
2. The Anthropic client which requires an API key from your [Anthropic console](https://console.anthropic.com/settings/keys).

With both of these set up, we simply call the `anthropic.messages.create` method with the input and model then return the response. You can include a `posthogDistinctId` if you want to track specific users. 

```js
// app/api/generate/route.js
import { NextResponse } from 'next/server';
import { Anthropic } from '@posthog/ai';
import { PostHog } from 'posthog-node';

const phClient = new PostHog(
  '<ph_project_api_key>',
  { host: '<ph_api_client_host>' }
);

const anthropic = new Anthropic({
  apiKey: '<anthropic_api_key>',
  posthog: phClient,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { input, model } = body;

    const message = await anthropic.messages.create({
      model: model,
      max_tokens: 4096,
      messages: [{ role: "user", content: input }],
      posthogDistinctId: '<your_distinct_id>'
    });

    return NextResponse.json({
      content: message.content[0].text
    });

  } catch (error) {
    console.error('Anthropic API error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request' },
      { status: 500 }
    );
  }
}

```

Now, when we run `npm run dev` again and submit an input, we should see a response as well as the generation autocaptured into PostHog as a `$ai_generation` event.
<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_09_49_48_2x_f3a541eeee.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_09_49_33_2x_8acd393cac.png"
    alt="Generated response" 
    classes="rounded"
/>

## 3. Viewing generations in PostHog

Once you generate a few responses, go to PostHog and enable the [LLM observability feature preview](https://app.posthog.com/settings/user-feature-previews#llm-observability). Once enabled, go to the LLM observability tab to get an overview of traces, users, costs, and more.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_10_00_08_2x_a4773a9cd5.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_10_00_30_2x_5aa813c995.png"
    alt="LLM observability dashboard"
    classes="rounded"
/>

You can also go into more detail by clicking on the [generations tab](https://us.posthog.com/llm-observability/generations). This shows each generation as well as model, cost, token usage, latency, and more. You can even see the conversation input and output.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_10_04_35_2x_2dbca9be6b.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_05_at_10_04_16_2x_dc42a287a5.png"
    alt="LLM generations list"
    classes="rounded"
/>

From here, you can go further by filtering your LLM observability dashboard, use the `$ai_generation` event to [create insights](/docs/product-analytics/insights), [A/B test models](/tutorials/llm-ab-tests), and more.

## Further reading

- [How to set up OpenAI observability](/tutorials/openai-observability)
- [How to set up LLM analytics for Cohere](/tutorials/cohere-analytics)
- [How to monitor LlamaIndex apps with Langfuse and PostHog](/tutorials/monitor-llama-index-with-langfuse)
