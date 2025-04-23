---
title: How to show customer-facing analytics data from LLM backed applications
date: 2025-04-22
author:
 - perry-eising
tags:
  - product analytics
  - LLM observability
---

Posthog’s goal is to be the comprehensive platform you need to understand and evaluate the performance of your apps and sites. And while were stoked on the capabilities of our dashboards, we also want you to be able to surface analytics data in the UI of your apps to enhance customer insight and trust.

But what about surfacing data reported from LLM backed applications to your own products that run Posthog? As applications increasingly integrate LLM capabilities into their own offerings, transparent data can make a notable difference when it comes to understanding factors such as cost. We want to show you how you can surface vital data aggregated from our analytics and LLM services into the apps and sites. 

For this tutorial, we’ll build a simple feedback app that sends a request to an LLM, and allows the user to rate the response. After we've captured that user sentiment, we'll show the cost of the LLM query to give the data more context.


Let’s jump right in.


## Creating a new Next.js app

First,  let’s work on creating an application that captures user feedback on the quality of an LLM response, and shows that data along with the cost of the LLM query. Because there are many different LLMs, we have created a tutorial that works with many of them! [This tutorial](https://posthog.com/tutorials/openrouter-observability) will get you started in creating a basic app.

After you’ve completed that tutorial, let’s work on getting access to the data in the frontend of our app.

## Step 1. Collecting user feedback
Let’s add a way to indicate whether the API response we received was helpful, or not.

We can do this by creating a dropdown we can add to our form, like so:

[
code with two buttons or images to vote on the response being good or bad
]

in order to capture the selection the user has made that indicates their sentiment, we will need to add code to handle their responses as well, When we select whether the answer was a good response or not, this response is stored along with the actual content of the LLM query in posthog.

[
code snippet that contains the event handler to process the user selection for posthog
]

Great. After you have added your code, run `npm run dev` and check out your changes. You should see something a bit like this:

[screenshot of the UI]

try asking the LLM a question, and rating the answer depending on what you receive back. After a few minutes, you should also see your data collected in the Activity tab of the Posthog dashboard.

## Step 2: Bringing things together
Now that we have the ability to link and show connections between LLM responses and user sentiment, it is a nice idea for us to show the customer how well these answers are rated. We can query Posthog to find out what people think about this response. It’s helpful to also add a timespan to our results, so that customers can place the data in context.

[create an output that shows text that reads: 62% of users since $date rated this answer positively. 38% rated it negatively]

## Step 3: The final pieces
Finally, let’s get Posthog to report back how much the LLM query cost. We can do so by targeting the `$ai_generation` event the same way we did for customer sentiment, and show that data in our front end. If we want to, we can also show the total cost of all of these queries over time, or break down positively received queries to negatively received ones by cost factor. Cool! 

[create an output that shows the above]

This data creates a much more complete picture of how much value our app is generating. Users are much more likely to feel like their LLM spend is justified if they can see how this correlates to positive user sentiment! Hopefully this gets you thinking about how you can use the Posthog platform to make your apps and sites more informative and performant for your customers. 


## Further reading

- [Customer Facing Analytics](tutorials/customer-facing-analytics)
- [How to set up LLM analytics for Cohere](/tutorials/cohere-analytics)
- [How to A/B test LLM models and prompts](/tutorials/llm-ab-tests)
