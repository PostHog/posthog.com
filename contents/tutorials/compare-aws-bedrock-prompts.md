---
title: How to compare AWS Bedrock prompts
date: 2024-09-12
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

Evaluating LLM prompts is important for determining whether they are improving your app. In this tutorial, we explore three methods to assess prompts by comparing their LLM outputs. Namely:

1. [Quantitative metrics](#quantitative-metrics)
2. [User feedback](#user-feedback)
3. [Model-based evaluation](#model-based-evaluation)

To show you how, we set up a basic Next.js app, implement the AWS Bedrock API, and capture events using PostHog.

> While this tutorial focuses on [Next.js](/docs/libraries/next-js) and [Node](/docs/libraries/node), PostHog supports many different [SDKs](/docs/libraries) and [frameworks](/docs/frameworks). The concepts in this tutorial apply to all our supported SDKs and frameworks. 

## Download the sample app

We've created a sample app for this tutorial. You can download it from [Github](https://github.com/PostHog/aws-bedrock-compare-prompts-sample-app). 

```bash
git clone https://github.com/PostHog/aws-bedrock-compare-prompts-sample-app
```

To set your app up, first ensure [Node](https://nodejs.dev/en/learn/how-to-install-nodejs/) is install. Then run `npm install` to install all dependencies. 

You must also ensure that you have properly configured your AWS credentials and region to use the AWS SDK for JavaScript. You can do this by calling `aws configure` using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Once done, update the `BedrockRuntimeClient` initializer in `src/app/api/generate-llm-output/route.js` to use your preferred AWS region:

```js file=src/app/api/generate-llm-output/route.js
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "<YOUR_AWS_REGION>" }); // e.g. us-west-2

// rest of the code
```

You'll also notice that we're using Meta's Llama 3 8B Instruct model. Make sure you have access to this model, or [request access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) if you don't. You may need to change regions in AWS if it's not available. Alternatively, you can use a different Llama model. 

> **Note:** While this tutorial uses the Llama model, the concepts in this tutorial apply to all of Bedrock's [supported models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html#model-ids-arns).

![Requesting access to AWS Bedrock models](https://res.cloudinary.com/dmukukwp6/image/upload/v1723015919/posthog.com/contents/Screenshot_2024-08-07_at_8.31.28_AM.png)

Lastly, the sample app already includes PostHog set up. You need to update the `<ph_project_api_key>` and `<ph_client_api_host>` placeholders with your PostHog API key and host (you can find these in [your project settings](https://us.posthog.com/settings/project)).

There are two places to update. First, in `src/app/api/generate-llm-output/route.js`, where PostHog is configured for server-side event capture:

```js file=src/app/api/generate-llm-output/route.js
// existing imports

export async function POST(request) {
  const posthog = new PostHog(
    '<ph_project_api_key>',
    {
      host: '<ph_client_api_host>',
    },
  );  
```

Second, in `src/app/providers.js`, where PostHog is configured for client-side event capture:

```js file=src/app/providers.js
// existing imports

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
  })
}
```

Run `npm run dev` and go to `http://localhost:3000` to everything in action.

![Sample LLM app](https://res.cloudinary.com/dmukukwp6/video/upload/v1724924215/posthog.com/contents/sample-app-aws.mp4)

## Compare prompts

With our app set up, we can begin [capturing events](/docs/product-analytics/capture-events) with PostHog to evaluate and compare prompts. We cover three different ways to do this.

### 1. Quantitative metrics

Quantitative metrics involve measuring specific, quantifiable properties of the LLM outputs like:

- Token output count
- Latency
- Error rate

This is the quickest and simplest way to evaluate outputs, but doesn't provide a clear picture of the output quality.

#### How to capture quantitative metrics

We use [`posthog.capture()`](/docs/product-analytics/capture-events?tab=Node.js) to capture `bedrock_completion` and `bedrock_error` events. In each of these events, we include [properties](/docs/product-analytics/capture-events#setting-event-properties) for data we want to collect.

Update the code in `src/app/api/generate-llm-output/route.js` to capture a `bedrock_completion` event with properties related to the API request like so:

```js file=src/app/api/generate-llm-output/route.js
// your existing code
  try { 
    // ... existing code

    // Add this just before the API request
    const startTime = performance.now(); 

    const response = await client.send(command);
    
    // Add this just after the API request
    const endTime = performance.now(); 
    const responseTime = endTime - startTime;

    // The below 3 lines of code already exist in the sample app
    const rawRes = response.body;
    const jsonString = new TextDecoder().decode(rawRes);
    const parsedJSON = JSON.parse(jsonString);

    // Add the below
    const { generation, prompt_token_count, generation_token_count} = parsedJSON;
    posthog.capture({
      distinctId: email, // unique identifier for the user who performed the action
      event: 'bedrock_completion',
      properties: {
        promptId,
        prompt,
        model_id: modelId,
        generation: generation,
        prompt_token_count: prompt_token_count,
        generation_token_count: generation_token_count,
        response_time_in_ms: responseTime
      }
    });

    // rest of your code
  }
```

Then, to track errors, we capture `bedrock_error` events in the `catch` block of our code:

```js file=src/app/api/generate-llm-output/route.js
// your existing code
  } catch (error) {
    console.error('Error:', error);

    posthog.capture({
      distinctId: email,
      event: 'bedrock_error',
      properties: {
        promptId, // unique identifier for the prompt
        prompt,
        error_message: error.message,
        error_name: error.name,
        error_code: error.$metadata?.httpStatusCode,
        error_type: error.__type,
        error_requestId: error.$metadata?.requestId,
        error_stack: error.stack,
        model_id: modelId,
      }
    });

    return new Response(JSON.stringify({ error: 'Failed to generate prompt' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
```

Refresh your app and submit a few prompts. You should then see your events captured in the [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1723020434/posthog.com/contents/Screenshot_2024-08-07_at_9.46.52_AM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1723020434/posthog.com/contents/Screenshot_2024-08-07_at_9.47.04_AM.png" 
  alt="AWS Bedrock events in PostHog" 
  classes="rounded"
/>

#### How to create insights

Now that we're capturing events, we can create [insights](/docs/product-analytics/insights) in PostHog to visualize our data. Most importantly, we breakdown our data by `promptId` to compare them.

Below is an example of how to create an insight to compare average API response time for each prompt:

1. Go to the [Product analytics tab](https://us.posthog.com/insights) in PostHog and click **+ New insight**.
1. Set the event to `bedrock_completion`
2. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
3. Select the `response_time_in_ms` property.
4. For nice formatting, press **Options** and under `Y-axis unit` select **Duration (ms)**
5. Click **+ Add breakdown** and select `promptId`. 
6. **Save** your insight.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1724925781/posthog.com/contents/Screenshot_2024-08-29_at_12.02.34_PM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1724925781/posthog.com/contents/Screenshot_2024-08-29_at_12.02.49_PM.png" 
  alt="Response time by prompt in PostHog" 
  classes="rounded"
/>

### 2. User feedback

A good way to evaluate LLM outputs is to ask your users to rate them. In our sample app, we do this by asking if the response was helpful. Users can submit their response using the **Yes** and **No** buttons at the bottom of the page. 

The advantage of this method is that it's highly representative of your users' experience and expectations. However, since you need to ask your users to rate responses, you're not able to evaluate your prompts before you ship them into production.

#### How to capture user evaluations

We capture an `llm_feedback_submitted` event with a `score` property (0 or 1). Then, we can create an insight to compare the average score for each prompt.

Add the following code to the `handleFeedback` function in `src/app/page.js`:

```js file=src/app/page.js
// your existing imports

export default function Home() {
  // your existing code...

  const handleFeedback = (isHelpful) => {
    setFeedbackGiven(true);

    posthog.capture('llm_feedback_submitted', {
      score: isHelpful ? 1 : 0,
      promptId,
    });
  };

  // ... rest of your code
};
```

Refresh your app, submit a few prompts, and click on the **Yes** and **No** buttons to generate events in PostHog.

#### How to create insights

1. Go to the [Product analytics tab](https://us.posthog.com/insights) in PostHog and click **+ New insight**.
2. Set the event to `llm_feedback_submitted`
3. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
4. Select the `score` property.
5. Click **+ Add breakdown** and select `promptId`. 
6. **Save** your insight.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1724848567/posthog.com/contents/Screenshot_2024-08-28_at_2.35.00_PM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1724848567/posthog.com/contents/Screenshot_2024-08-28_at_2.35.15_PM.png" 
  alt="LLM feedback by prompt in PostHog" 
  classes="rounded"
/>

### 3. Model-based evaluation

Model-based evaluation, also known as "LLM-as-a-judge", is a powerful tool to assess large amounts of LLM outputs. It involves submitting your LLM outputs to another LLM (called the judge) to rate them based on your criteria. Common use cases include rating accuracy, toxicity, and hallucinations.

The results from the judge LLM can be highly accurate, especially when using a fine-tuned LLM. However, this approach is also the most time-consuming to set up. 

#### How to capture model-based evaluations

In our sample app, we implement a simple judge by submitting our LLM response to the same Llama 3 model. We ask it to rate its toxicity by asking it whether the response contains any curse words. Then, we capture its response with a `bedrock_judge_response` event.

```js file=src/app/api/generate-llm-output/route.js
// your existing imports

export async function POST(request) {
  // your existing code...

    // Add this code after your original LLM request
    const judgeInput = {
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `Does the following text contain any curse words? You MUST ONLY answer with "yes" or "no". \n\n${generation}`,
        max_gen_len: 512,
        temperature: 0,
        top_p: 0.1,
      }),
    }
    
    const judgeCommand = new InvokeModelCommand(judgeInput);
    const judgeResponse = await client.send(judgeCommand);
    const judgeRawRes = judgeResponse.body;
    const judgeJsonString = new TextDecoder().decode(judgeRawRes);
    const judgeParsedJSON = JSON.parse(judgeJsonString);
    const { generation: judgeGeneration } = judgeParsedJSON;

    posthog.capture({
      distinctId: email,
      event: 'bedrock_judge_response',
      properties: {
        promptId,
        model_id: modelId,
        generation: judgeGeneration,
        is_toxic: judgeGeneration.toLowerCase().includes('yes') ? 1 : 0
      }
    });

    return new Response(jsonString, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {

  // rest your existing code...
}
```

Refresh your app and submit a few prompts (and try to get some toxic responses!).

#### How to create insights

1. Go to the [Product analytics tab](https://us.posthog.com/insights) in PostHog and click **+ New insight**.
2. Set the event to `bedrock_judge_response`
3. Click on **Total count** to show a dropdown. Click on **Property value (average)**.
4. Select the `is_toxic` property.
5. Click **+ Add breakdown** and select `promptId`. 
6. For nice formatting, press **Options** and under `Y-axis unit` select **Percentage**
7. **Save** your insight.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1724927515/posthog.com/contents/Screenshot_2024-08-29_at_12.31.27_PM.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1724927516/posthog.com/contents/Screenshot_2024-08-29_at_12.31.42_PM.png" 
  alt="Model-based evaluation by prompt in PostHog" 
  classes="rounded"
/>

## Further reading

- [How to monitor generative AI calls to AWS Bedrock](/tutorials/monitor-aws-bedrock-calls)
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to compare AWS Bedrock foundational models](/tutorials/compare-aws-bedrock-foundational-models)

<NewsletterForm />
