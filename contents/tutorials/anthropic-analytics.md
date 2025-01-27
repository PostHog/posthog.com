---
title: How to set up LLM analytics for Anthropic's Claude
date: 2024-04-09
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712670565/posthog.com/contents/blog/anthropic-events-light.png"
export const EventsDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712670566/posthog.com/contents/blog/anthropic-events-dark.png"
export const TotalCostLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712670918/posthog.com/contents/blog/cost-per-model-light.png"
export const TotalCostDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712670919/posthog.com/contents/blog/cost-per-model-dark.png"
export const CostPerUserLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712671305/posthog.com/contents/blog/anthropic-cost-per-user-light.png"
export const CostPerUserDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712671306/posthog.com/contents/blog/anthropic-cost-per-user-dark.png"
export const ResponseTimeLight = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712672102/posthog.com/contents/blog/anthropic-latency-light.png"
export const ResponseTimeDark = "https://res.cloudinary.com/dmukukwp6/image/upload/v1712672103/posthog.com/contents/blog/anthropic-latency-dark.png"

Tracking your Claude usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM powered features. In this tutorial, we show you how to monitor important metrics such as:

- Total cost per model
- Average cost per user
- Average API response time

We'll build a basic Next.js app, implement the Claude API, and capture these events using PostHog. 

## 1. Create the demo app

To showcase how to track important metrics, we create a simple one-page Next.js app with the following:

- A form with textfield and button for user input.
- A label to show Claude's output.
- A dropdown to select different [Anthropic models](https://docs.anthropic.com/claude/docs/models-overview).

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then run the following script to create a new Next.js app and install both the [Anthropic JavaScript](https://docs.anthropic.com/claude/reference/client-sdks) and [PostHog Web](/docs/libraries/js) SDKs:

```bash
npx create-next-app@latest anthropic-analytics
cd anthropic-analytics
npm install --save @anthropic-ai/sdk
npm install --save posthog-js
cd ./src/app
touch providers.js # we set up PostHog in this file below
```

When prompted, select **No** for TypeScript, **Yes** for `use app router`, **No** for Tailwind CSS and the defaults for every other option.

Next, we set up Posthog using our API key and host (You can find these in [your project settings](https://us.posthog.com/settings/project)). Add the below code to `app/providers.js`:

```js file=app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>'
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

Then replace the code in `page.js` with our basic layout and functionality. You can find your Anthropic API key [here](https://console.anthropic.com/settings/keys).

```js file=app/page.js
'use client'

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react'
import Anthropic from '@anthropic-ai/sdk';

const models = [
  {
    name: 'claude-3-opus-20240229',
    token_input_cost: 0.00001500,
    token_output_cost: 0.00007500
  },
  {
    name: 'claude-3-sonnet-20240229',
    token_input_cost: 0.00000300,
    token_output_cost:  0.00001500
  },
    {
    name: 'claude-3-haiku-20240307',
    token_input_cost: 0.00000025,
    token_output_cost: 0.00000125
  },
]

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const posthog = usePostHog()

  const fetchResponse = async () => {
    try {
      const anthropic = new Anthropic({
        apiKey: '<your_anthropic_api_key>', 
        baseURL: window.location.origin + '/anthropic/',
      });  
      
      setResponse('Generating...');
      const msg = await anthropic.messages.create({
        model: selectedModel.name,
        max_tokens: 4096,
        messages: [{ role: "user", content: userInput }],
      });

      const response = msg.content[0].text
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

Lastly, replace the code in `next.config.mjs` with the following:

```js file=next.config.mjs
const nextConfig = {
  rewrites: async () => [
      {
        source: "/anthropic/:path*",
        destination: "https://api.anthropic.com/:path*"
      },
    ],
  
};
export default nextConfig;
```

Our basic app is now set up. Run `npm run dev` to see it in app action.

![Basic Next.js app with Anthropic Claude](https://res.cloudinary.com/dmukukwp6/video/upload/v1712669231/posthog.com/contents/blog/anthropic-analytocs-demo-app.mp4)

## 2. Capture chat completion events

With our app set up, we can begin [capturing events](/docs/product-analytics/capture-events) with PostHog. To start, we capture a `claude_message_completion` event with properties related to the API request. We find the following properties most useful to capture:

- `prompt`
- `model`
- `input_tokens`
- `output_tokens`
- `input_cost_in_dollars` i.e. `input_tokens` * `token_input_cost`
- `output_cost_in_dollars` i.e. `output_tokens` * `token_output_cost`
- `total_cost_in_dollars` i.e. `input_cost_in_dollars + output_cost_in_dollars`

Update your `fetchResponse()` function in `page.js` to capture this event:

```js file=App.js
const fetchResponse = async () => {
    try {

      // your existing code...

      setResponse('Generating...');
      const msg = await anthropic.messages.create({
        model: selectedModel.name,
        max_tokens: 4096,
        messages: [{ role: "user", content: userInput }],
      });

      const inputCostInDollars = msg.usage.input_tokens * selectedModel.token_input_cost
      const outputCostInDollars = msg.usage.output_tokens * selectedModel.token_output_cost
      posthog.capture('claude_message_completion', {
        model: selectedModel.name,
        prompt: userInput,
        input_tokens: msg.usage.input_tokens,
        output_tokens: msg.usage.output_tokens,
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
  alt="Anthropic events in PostHog" 
  classes="rounded"
/>

## 3. Create insights

Now that we're capturing events, we can create [insights](/docs/product-analytics/insights). Below are three examples of useful metrics you should monitor:

### Total cost per model

To create this insight, go the [Product analytics tab](https://us.posthog.com/insights) and click **+ New insight**. Then:

1. Set the event to `claude_message_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (sum)**.
3. Select the `total_cost_in_dollars` property.
4. Click **+ Add breakdown** and select `model` from the event properties list.

> **Note:** Insights may show `0` if the total cost is less than `0.01`.

<ProductScreenshot
  imageLight={TotalCostLight} 
  imageDark={TotalCostDark} 
  alt="Total Claude costs per model in PostHog" 
  classes="rounded"
/>

### Average cost per user

This metric helps give you an idea of how your costs will scale as your product grows. Creating this insight is similar to creating the one above, however we use **formula mode** to divide the total cost by the total number of users:

1. Set the event to `claude_message_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (sum)**.
3. Select the `total_cost_in_dollars` property.
4. Click **+ Add graph series** (if your visual is set to `number`, switch it back to `trend` first).
5. Change the event name to `claude_message_completion`. Then change the value from **Total count** to **Unique users**.
6. Click **Enable formula mode**.
7. In the formula box, enter `A/B`.


<ProductScreenshot
  imageLight={CostPerUserLight} 
  imageDark={CostPerUserDark} 
  alt="Total Anthropic costs per user in PostHog" 
  classes="rounded"
/>

### Average API response time

Anthropics's API response time can take long, especially for longer outputs, so it's useful to keep an eye on this. To do this, first we need to modify our event capturing to also include the response time:

```js file=page.js
const fetchResponse = async () => {
    try {

      // your existing code...

      const startTime = performance.now(); 
      const msg = await anthropic.messages.create({
        model: selectedModel.name,
        max_tokens: 4096,
        messages: [{ role: "user", content: userInput }],
      });
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      const inputCostInDollars = msg.usage.input_tokens * selectedModel.token_input_cost
      const outputCostInDollars = msg.usage.output_tokens * selectedModel.token_output_cost
      posthog.capture('claude_message_completion', {
        model: selectedModel.name,
        prompt: userInput,
        input_tokens: msg.usage.input_tokens,
        output_tokens: msg.usage.output_tokens,
        input_cost_in_dollars: inputCostInDollars,
        output_cost_in_dollars: outputCostInDollars,
        total_cost_in_dollars: inputCostInDollars + outputCostInDollars,
        response_time_in_ms: responseTime
      });

      // your existing code...
```

Then, after capturing a few events, create a new insight to calculate the average response time:

1. Set the event to `claude_message_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
3. Select the `response_time_in_ms` property.

<ProductScreenshot
  imageLight={ResponseTimeLight} 
  imageDark={ResponseTimeDark} 
  alt="Average API response time in PostHog" 
  classes="rounded"
/>

## Next steps

We've shown you the basics of creating insights from your product's Claude usage.  Below are more examples of product questions you may want to investigate:

- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?
- Does interacting with LLM features correlate with other metrics e.g. retention, usage, or revenue?

## Further reading

- [How to set up LLM analytics for Cohere](/tutorials/cohere-analytics)
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to monitor LlamaIndex apps with Langfuse and PostHog](/tutorials/monitor-llama-index-with-langfuse)

<NewsletterForm />
