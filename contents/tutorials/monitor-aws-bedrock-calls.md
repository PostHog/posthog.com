---
title: How to monitor generative AI calls to AWS Bedrock
date: 2024-08-27
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

Tracking your AWS Bedrock usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM powered features. In this tutorial, we show you how to monitor important metrics such as:

- Generation count
- Average cost per API call
- Average cost per user
- Average API response time
- Error rate

We set up a basic Next.js app, implement the Bedrock API, and capture these events using PostHog.

> While this tutorial focuses on [Next.js](/docs/libraries/next-js) and [Node](/docs/libraries/node), PostHog supports many different [SDKs](/docs/libraries) and [frameworks](/docs/frameworks). The concepts in this tutorial apply to all our supported SDKs and frameworks. 

## 1. Download the sample app

We've created a basic recipe builder app for this tutorial. You can download it from [Github](https://github.com/PostHog/aws-bedrock-sample-app). 

```bash
git clone https://github.com/PostHog/aws-bedrock-sample-app.git
```

To set your app up, first ensure [Node](https://nodejs.dev/en/learn/how-to-install-nodejs/) is install. Then run `npm install` to install all dependencies. 

You must also ensure that you have properly configured your AWS credentials and region to use the AWS SDK for JavaScript. You can do this by calling `aws configure` using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Once done, update the `BedrockRuntimeClient` initializer in `src/app/api/generate-recipe/route.js` to use your preferred AWS region:

```js file=src/app/api/generate-recipe/route.js
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "<YOUR_AWS_REGION>" }); // e.g. us-west-2

// rest of the code
```

You'll also notice that we're using Meta's Llama 3.1 8B Instruct model. Make sure you have access to this model, or [request access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) if you don't (you may need to change regions in AWS if it's not available. Alternatively, you can use a different LLama model). 

Note that while this tutorial uses the Llama model, the concepts in this tutorial apply to all of Bedrock's [supported models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html#model-ids-arns).

![Requesting access to AWS Bedrock models](https://res.cloudinary.com/dmukukwp6/image/upload/v1723015919/posthog.com/contents/Screenshot_2024-08-07_at_8.31.28_AM.png)

Run `npm run dev` and go to `http://localhost:3000` to everything in action.

![Recipe builder LLM app](https://res.cloudinary.com/dmukukwp6/video/upload/v1723039836/posthog.com/contents/bedrock-sample-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. To do this, we install the [PostHog Node](/docs/libraries/node) SDK to capture events in our API route by running the following command in our terminal:

```bash
npm install posthog-node
```

Next, we initialize PostHog using our API key and host (you can find these in [your project settings](https://us.posthog.com/settings/project)). We also call `posthog.shutdown()` in a `finally` block to send any pending events before the serverless function shuts down. Add the below code to `src/app/api/generate-recipe/route.js`:

```js file=src/app/api/generate-recipe/route.js
// your existing imports

import { PostHog } from 'posthog-node'; // import PostHog

export async function POST(request) {
  const posthog = new PostHog(
    '<ph_project_api_key>',
    {
      host: '<ph_client_api_host>',
    },
  );

  // rest of your code

  try {
    // existing code
  } catch (error) {
    // existing code
  } finally {
    // Call posthog.shutdown() to flush and send all pending events before the serverless function shuts down.
    await posthog.shutdown();
  }
}
```

## 3. Capture events

With our app set up, we can begin [capturing events](/docs/product-analytics/capture-events) with PostHog.

### Successful requests

To start, we capture a `bedrock_completion` event with properties related to the API request like:

- `prompt`
- `generation`
- `prompt_token_count`
- `generation_token_count`

To do this, add a `posthog.capture()` call after receiving a response from Bedrock:

```js file=src/app/api/generate-recipe/route.js
// your existing code
  try { 
    // ... existing code

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const rawRes = response.body;
    const jsonString = new TextDecoder().decode(rawRes);
    const parsedJSON = JSON.parse(jsonString);

    // Add this
    const { generation, prompt_token_count, generation_token_count} = parsedJSON;
    posthog.capture({
      distinctId: email,
      event: 'bedrock_completion',
      properties: {
        prompt,
        model_id: modelId,
        generation: generation,
        prompt_token_count: prompt_token_count,
        generation_token_count: generation_token_count,
      }
    });

    // rest of your code
  }
```

Refresh your app and submit a few prompts. You should then see your events captured in the [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723020434/posthog.com/contents/Screenshot_2024-08-07_at_9.46.52_AM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723020434/posthog.com/contents/Screenshot_2024-08-07_at_9.47.04_AM.png" 
  alt="AWS Bedrock events in PostHog" 
  classes="rounded"
/>

### Costs

To keep track of your generative AI costs, you can include additional properties to your event capture, namely:

- `input_cost_in_dollars` i.e. `prompt_token_count` * `token_input_cost`
- `output_cost_in_dollars` i.e. `generation_token_count` * `token_output_cost`
- `total_cost_in_dollars` i.e. `input_cost_in_dollars + output_cost_in_dollars`

You can view the token costs for your model in the [Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) page. Since we're using **Llama 3.1 8B Instruct** in this tutorial, we set the `token_input_cost` and `token_output_cost` to the values for this model:

```js file=src/app/api/generate-recipe/route.js
// your existing code
  try { 
    // ... existing code

    const { generation, prompt_token_count, generation_token_count} = parsedJSON;
    
    const token_input_cost = 0.0003/1000; // divide by 1,000 since price on AWS website is listed as price per 1k tokens.
    const token_output_cost =  0.0006/1000; // divide by 1,000 since price on AWS website is listed as price per 1k tokens.
    const input_cost_in_dollars = prompt_token_count * token_input_cost;
    const output_cost_in_dollars = generation_token_count * token_output_cost;
    const total_cost_in_dollars = input_cost_in_dollars + output_cost_in_dollars;

    posthog.capture({
      distinctId: email,
      event: 'bedrock_completion',
      properties: {
        // ...existing properties
        input_cost_in_dollars,
        output_cost_in_dollars,
        total_cost_in_dollars,
      }
    })
  }
```

### API response time

API responses can take a long time, especially for longer outputs, so it's useful to monitor this. To do this, we track the request start and end times and calculate the total time. Then, we include the response time in the event properties:

```js file=src/app/api/generate-recipe/route.js
// your existing code

  try { 
    // ... existing code

    const startTime = performance.now(); // add just before the API request

    const response = await client.send(command);
    
    const endTime = performance.now(); // add just after the API request
    const responseTime = endTime - startTime;

    // ... existing code

    posthog.capture({
      distinctId: email,
      event: 'bedrock_completion',
      properties: {
        response_time_in_ms: responseTime
        // ...any other properties you're capturing
      }
    })
  }
```

### Errors

It's not uncommon for generative AI requests to fail and it's important to track these errors. To do this, we capture a `bedrock_error` event in the `catch` block of our code:

```js file=src/app/api/generate-recipe/route.js
// your existing code
  } catch (error) {
    console.error('Error:', error);

    posthog.capture({
      distinctId: email,
      event: 'bedrock_error',
      properties: {
        error_message: error.message,
        error_name: error.name,
        error_code: error.$metadata?.httpStatusCode,
        error_type: error.__type,
        error_requestId: error.$metadata?.requestId,
        error_stack: error.stack,
        model_id: modelId,
        prompt,
      }
    });

    return new Response(JSON.stringify({ error: 'Failed to generate recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    // rest of your code
  }
```

## 4. Create insights

Now that we're capturing events, we can create [insights](/docs/product-analytics/insights) in PostHog to visualize our data. Below are five examples of useful metrics to track. Each of these starts by going to the [Product analytics tab](https://us.posthog.com/insights) and clicking **+ New insight**.

### Generation count

**What it is:** The total number of successful requests to your model.

**Why it's useful:** Helps assess the workload and demand placed on your models, which directly impacts costs and performance.

**How to set it up:** 

1. Set the event to `bedrock_completion`
2. Ensure the second dropdown shows **Total count**
3. Press **Save**

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723035517/posthog.com/contents/Screenshot_2024-08-07_at_1.58.12_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723035517/posthog.com/contents/Screenshot_2024-08-07_at_1.58.21_PM.png"
  alt="Total Bedrock generation count" 
  classes="rounded"
/>

### Average cost per API call

**What it is:** How much each model evaluation costs on average.

**Why it's useful:** Gives you an idea of how much your costs will scale with usage.

**How to set it up:** 
1. Set the event to `bedrock_completion`.
2. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
3. Select the `total_cost_in_dollars` property.

> **Note:** Insights may show 0 if the amount is less than 0.01. If this is the case, click on **Enable formula mode** and then type `A * 100` in the formula box to multiply the value by 100. This shows you the average cost per 100 API calls.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723036493/posthog.com/contents/Screenshot_2024-08-07_at_2.10.27_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723036493/posthog.com/contents/Screenshot_2024-08-07_at_2.10.37_PM.png"
  alt="Bedrock average cost per API call" 
  classes="rounded"
/>

### Average cost per user

**What it is:** Your total costs divided by the number of active users.

**Why it's useful:** Shows how your costs will grow with user growth. You can also compare this to revenue per user to understand if your profit margin is viable.

**How to set it up:** 
1. Set the event to `bedrock_completion`.
2. Click on **Total count** to show a dropdown. Click on **Property value (sum)**.
3. Select the `total_cost_in_dollars` property.
4. Click **+ Add graph series** (if your visual is set to `number`, switch it back to `trend` first).
5. Change the event name to `bedrock_completion`. Then change the value from **Total count** to **Unique users**.
6. Click **Enable formula mode**.
7. In the formula box, enter `A/B`.

> **Note:** Insights may show 0 if the amount is less than 0.01.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723037477/posthog.com/contents/Screenshot_2024-08-07_at_2.30.39_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723037477/posthog.com/contents/Screenshot_2024-08-07_at_2.30.54_PM.png"
  alt="Bedrock average cost per user" 
  classes="rounded"
/>

### Average API response time

**What it is:** The average time it takes for the model to generate a response.

**Why it's useful:** Helps identify performance bottlenecks and ensures your UX meets user expectations for speed.

**How to set it up:** 
1. Set the event to `bedrock_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
3. Select the `response_time_in_ms` property.
4. For nice formatting, press **Options** and under `Y-axis unit` select **Duration (ms)**

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723037947/posthog.com/contents/Screenshot_2024-08-07_at_2.38.38_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723037948/posthog.com/contents/Screenshot_2024-08-07_at_2.38.52_PM.png"
  alt="Bedrock average API response time" 
  classes="rounded"
/>

### Error rate

**What it is:** The percentage of API requests that result in an error.

**Why it's useful:** Enables you to pinpoint problematic generative AI requests and API calls.

**How to set it up:** 
1. Set the event to `bedrock_completion`. Ensure it's set to **Total count** 
2. Click **+ Add graph series** (if your visual is set to `number`, switch it back to `trend` first).
3. Change the event name to `bedrock_error`. Ensure it's set to **Total count** .
4. Click **Enable formula mode**.
5. In the formula box, enter `B/(A+B)` i.e. the number of errors divided by the total number of requests.
6. For nice formatting, press **Options** and under `Y-axis unit` select **Percent (0-100)**

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723038590/posthog.com/contents/Screenshot_2024-08-07_at_2.49.00_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723038589/posthog.com/contents/Screenshot_2024-08-07_at_2.49.20_PM.png"
  alt="Bedrock error rate" 
  classes="rounded"
/>

## Further reading

- [How to compare AWS Bedrock prompts](/tutorials/compare-aws-bedrock-prompts)
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to compare AWS Bedrock foundational models](/tutorials/compare-aws-bedrock-foundational-models)

<NewsletterForm />
