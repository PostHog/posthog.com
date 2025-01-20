---
title: How to set up LLM analytics for Cohere
date: 2024-04-18
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346298/posthog.com/contents/blog/events-light-cohere.png"
export const EventsDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346298/posthog.com/contents/blog/events-dark-cohere.png"
export const TotalCostLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346479/posthog.com/contents/blog/costs-per-model-light.png"
export const TotalCostDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346480/posthog.com/contents/blog/costs-per-model-dark.png"
export const CostPerUserLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346582/posthog.com/contents/blog/cohere-formula-light.png"
export const CostPerUserDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346583/posthog.com/contents/blog/cohere-formula-dark.png"
export const ResponseTimeLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346723/posthog.com/contents/blog/repsonse-time-cohere-light.png"
export const ResponseTimeDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1713346724/posthog.com/contents/blog/repsonse-time-cohere-dark.png"

Tracking your Cohere usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM powered features. In this tutorial, we show you how to monitor important metrics such as:

- Total cost per model
- Average cost per user
- Average API response time

We'll build a basic Next.js app, implement the Cohere API, and capture these events using PostHog. 

## 1. Create the demo app

To showcase how to track important metrics, we create a simple one-page Next.js app with the following:

- A form with textfield and button for user input.
- A label to show Cohere's output.
- A dropdown to select different [Cohere models](https://docs.cohere.com/docs/command-r).

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then run the following script to create a new Next.js app and install both the [Cohere JavaScript](https://github.com/cohere-ai/cohere-typescript?tab=readme-ov-file) and [PostHog Web](/docs/libraries/js) SDKs:

```bash
npx create-next-app@latest cohere-analytics
cd cohere-analytics
npm install --save cohere-ai
npm install --save posthog-js
cd ./src/app
touch providers.js # we set up PostHog in this file below
```

When prompted, select **No** for TypeScript, **Yes** for `use app router`, **No** for Tailwind CSS and the defaults for every other option.

Next, we set up PostHog using our API key and host (You can find these in [your project settings](https://us.posthog.com/settings/project)). Add the below code to `app/providers.js`:

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

Then we import the `PHProvider` component into `app/layout.js` and wrap our app with it:

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

Then replace the code in `page.js` with our basic layout and functionality. You can find your Cohere API key [here](https://dashboard.cohere.com/api-keys).

```js file=app/page.js
'use client'

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react'
import { CohereClient } from "cohere-ai";

const models = [
  {
    name: 'command-r-plus',
    token_input_cost: 0.000003,
    token_output_cost: 0.000015
  },
  {
    name: 'command-r',
    token_input_cost: 0.0000005,
    token_output_cost:  0.0000015
  },
]

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const posthog = usePostHog()

  const fetchResponse = async () => {
    try {
      const cohere = new CohereClient({
        token: '<your_cohere_api_key>',
      });
      
      setResponse('Generating...');
      const chat = await cohere.chat({
        model: selectedModel.name,
        message: userInput,
      });

      const response = chat.text
      setResponse(response);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(models.filter(m => (m.name === event.target.value))[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResponse();
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
      <select value={selectedModel.name} onChange={handleModelChange}>
        {models.map((model, index) => (
          <option key={index} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>     
      <label>API Response:</label>
      <label>{response}</label>
    </div>
  );
};
```

Our basic app is now set up. Run `npm run dev` to see it in app action.

![Basic Next.js app with Cohere](https://res.cloudinary.com/dmukukwp6/video/upload/v1713343598/posthog.com/contents/blog/cohere-app.mp4)

## 2. Capture chat completion events

With our app set up, we can begin [capturing events](/docs/product-analytics/capture-events) with PostHog. To start, we capture a `cohere_chat_completion` event with properties related to the API request like:

- `message`
- `model`
- `billed_input_tokens`
- `billed_output_tokens`
- `input_cost_in_dollars` i.e. `billed_input_tokens` * `token_input_cost`
- `output_cost_in_dollars` i.e. `billed_output_tokens` * `token_output_cost`
- `total_cost_in_dollars` i.e. `input_cost_in_dollars + output_cost_in_dollars`

Update your `fetchResponse()` function in `page.js` to capture this event:

```js file=App.js
const fetchResponse = async () => {
    try {

      // your existing code...

      setResponse('Generating...');
      const chat = await cohere.chat({
        model: selectedModel.name,
        message: userInput,
      });

      const inputCostInDollars = chat.meta.billedUnits.inputTokens * selectedModel.token_input_cost
      const outputCostInDollars = chat.meta.billedUnits.outputTokens * selectedModel.token_output_cost
      posthog.capture('cohere_chat_completion', {
        model: selectedModel.name,
        prompt: userInput,
        input_tokens: chat.meta.billedUnits.inputTokens,
        output_tokens: chat.meta.billedUnits.outputTokens,
        input_cost_in_dollars: inputCostInDollars,
        output_cost_in_dollars: outputCostInDollars,
        total_cost_in_dollars: inputCostInDollars + outputCostInDollars
      })

      // your existing code...
```

Refresh your app and submit a few prompts. You should then see your events captured in the [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsLight} 
  imageDark={EventsDark} 
  alt="Cohere events in PostHog" 
  classes="rounded"
/>

## 3. Create insights

Now that we're capturing events, we can create [insights](/docs/product-analytics/insights). Below are three examples of useful metrics:

### Total cost per model

To create this insight, go the [Product analytics tab](https://us.posthog.com/insights) and click **+ New insight**. Then:

1. Set the event to `cohere_chat_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (sum)**.
3. Select the `total_cost_in_dollars` property.
4. Click **+ Add breakdown** and select `model` from the event properties list.

> **Note:** Insights may show `0` if the total cost is less than `0.01`.

<ProductScreenshot
  imageLight={TotalCostLight} 
  imageDark={TotalCostDark} 
  alt="Total Cohere costs per model in PostHog" 
  classes="rounded"
/>

### Average cost per user

This metric helps give you an idea of how your costs will scale as your product grows. Creating this insight is similar to creating the one above, however we use **formula mode** to divide the total cost by the total number of users:

1. Set the event to `cohere_chat_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (sum)**.
3. Select the `total_cost_in_dollars` property.
4. Click **+ Add graph series** (if your visual is set to `number`, switch it back to `trend` first).
5. Change the event name to `cohere_chat_completion`. Then change the value from **Total count** to **Unique users**.
6. Click **Enable formula mode**.
7. In the formula box, enter `A/B`.


<ProductScreenshot
  imageLight={CostPerUserLight} 
  imageDark={CostPerUserDark} 
  alt="Total Cohere costs per user in PostHog" 
  classes="rounded"
/>

### Average API response time

Cohere's API response time can be slow, especially for longer outputs, so it's useful to keep an eye on this. To track this, we first need to modify our event capture to also include the response time:

```js file=page.js
const fetchResponse = async () => {
    try {

      // your existing code...

      const startTime = performance.now(); 
      const chat = await cohere.chat({
        model: selectedModel.name,
        message: userInput,
      });
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      const inputCostInDollars = chat.meta.billedUnits.inputTokens * selectedModel.token_input_cost
      const outputCostInDollars = chat.meta.billedUnits.outputTokens * selectedModel.token_output_cost
      posthog.capture('cohere_chat_completion', {
        model: selectedModel.name,
        prompt: userInput,
        input_tokens: chat.meta.billedUnits.inputTokens,
        output_tokens: chat.meta.billedUnits.outputTokens,
        input_cost_in_dollars: inputCostInDollars,
        output_cost_in_dollars: outputCostInDollars,
        total_cost_in_dollars: inputCostInDollars + outputCostInDollars,
        response_time_in_ms: responseTime
      })

      // your existing code...
```

Then, after capturing a few events, create a new insight to calculate the average response time:

1. Set the event to `cohere_chat_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
3. Select the `response_time_in_ms` property.

<ProductScreenshot
  imageLight={ResponseTimeLight} 
  imageDark={ResponseTimeDark} 
  alt="Average API response time in PostHog" 
  classes="rounded"
/>

## Next steps

We've shown you the basics of creating insights from your product's Cohere usage.  Below are more examples of product questions you may want to investigate:

- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?
- Does interacting with LLM features correlate with other metrics e.g. retention, usage, or revenue?

## Further reading

- [How to set up LLM analytics for Anthropic](/tutorials/anthropic-analytics) 
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to monitor generative AI calls to AWS Bedrock](/tutorials/monitor-aws-bedrock-calls)

<NewsletterForm />
