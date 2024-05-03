---
date: 2024-05-03
title: 'Product metrics to track for LLM apps'
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
category: Engineering
tags:
  - Guides
  - Product metrics
crosspost:
  - Blog
---

import { ProductScreenshot } from 'components/ProductScreenshot'

LLM-powered apps differ in three key ways when compared to regular SaaS apps:

1. Costs are closely tied to app usage. 
2. Request latency spikes and errors are more common.
3. LLM output is unpredictable and can lead to a negative user experience.

This means that in addition to [regular product metrics](https://posthog.com/product-engineers/product-health-metrics), you need to monitor LLM-specific ones too. To understand which ones to track, we've put together a list of useful metrics to track.

The metrics are grouped into three categories: [cost](#cost-related-metrics), [usage](#usage-metrics), and [debugging](#debug-metrics).

>  **💡 PostHog tip: Use our [Langfuse](/docs/llm-analytics/langfuse-posthog) and [Helicone](/docs/llm-analytics/helicone-posthog) integrations to bring your LLM data into PostHog. Alternatively, we have tutorials on how to capture events from [OpenAI](/tutorials/chatgpt-analytics), [Anthropic](/tutorials/anthropic-analytics), and [Cohere](/tutorials/cohere-analytics).

## Cost-related metrics

### Average cost per user

**What is it?** Your total LLM costs divided by the number of active users.

**Why it's useful:** Gives you an idea of how your costs will grow with your product. You can also compare this to revenue per user to understand if your profit margin is viable.

**Questions to ask:**
- Are average costs going up or down over time? 
- If they're increasing over time, is it because of increased product usage or increased generation costs?
- What specific features or types of interactions contribute the most to the cost per user?

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1714744519/posthog.com/contents/average-cost-light.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1714744520/posthog.com/contents/average-cost-dark.png"
  alt="Line chart showing average LLM cost per user over time"
/>

### P95 cost per user

**What is it?** The top 5% of users who are consuming the most LLM costs.

**Why it's useful:** Determines if specific users disproportionately affect overall costs. You can then investigate whether these costs are justified by their usage, or if there are inefficiencies to address.

**Questions to ask:**
- What common characteristics or usage patterns do the top 5% of users have?
- Are there specific feature interactions that result in higher costs for these users?
- Is the high cost associated with these users sustainable, or does it suggest a need for pricing adjustments?

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1714744211/posthog.com/contents/Screenshot_2024-05-03_at_2.49.39_PM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1714744214/posthog.com/contents/Screenshot_2024-05-03_at_2.50.01_PM.png"
  alt="Table showing P95 of users who consume the most LLM costs"
/>

### Average cost per interaction

**What is it?** The cost associated with each request in your LLM features.

**Why it's useful**: Enables you to pinpoint exactly which interactions are the most expensive.

**Questions to ask:**
- How does this number compare for each LLM model?
- Which specific requests are the most costly, and are there ways to reduce these costs?
- Are there noticeable spikes in cost per interaction, and what triggers them?

## Usage metrics

### Average usage per user

**What is it?** How frequently the average user interacts with your LLM features.

**Why it's useful:** Indicates if your features provide value to your users if they are interacting with them multiple times per day.

**Questions to ask**
- How does usage vary among different [cohorts](/docs/data/cohorts) or [user personas](https://posthog.com/product-engineers/how-to-create-user-personas)?
- What are the most engaged users doing that the least engaged are not?
- Are there specific features that drive more interactions? Why?

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1714743804/posthog.com/contents/llm-interaction-light.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1714743740/posthog.com/contents/llm-average-interaction-dark.png"
  alt="Line chart showing average cost pper LLM interaction over time"
/>

### Generation count

**What is it** The total number of times your LLM generates outputs per day, week, or month.

**Why it's useful** Helps assess the workload and demand placed on your LLMs, which directly impacts costs and performance.

**Questions to ask**
- How has the generation count changed over time, and does this correlate with user growth or engagement?
- Are there specific times of day or days of the week when generation counts spike?
- How do different app features contribute to the generation count?

### User feedback score

**What is it?** The quality of the LLM's output, as rated by your users.

**Why is it useful:** Strongly correlated with important product-health metrics such as [growth](/product-engineers/b2b-saas-product-metrics), [churn](/product-engineers/churn-rate-vs-retention-rate), and [NPS score](/product-engineers/nps-vs-csat-vs-ces).

**Questions to ask**
- Are there specific user segments that are more satisfied or dissatisfied with the LLM outputs?
- What are the specific input and output tokens of the best and worst scores?
- How likely are users to churn from your product following a bad LLM response?

## Debug metrics

### Average number of tokens per request

**What is it?** The sum of input and output tokens consumed in each request. Also known as request size.

**Why it's useful:** Essential for optimizing performance and cost. Larger requests lead to higher costs and longer processing times, while smaller requests may lead to more frequent requests.

**Questions to ask**
- How has the average changed over time?
- Are there specific features or types of interactions that typically involve larger or smaller requests?
- How do variations in request size impact the latency and costs of responses?

### Generation latency

**What is it?** The time it takes for the LLM to generate a response.

**Why it's useful:** Helps identify performance bottlenecks and ensures your UX meets user expectations for speed.

**Questions to ask**

- Are there specific types of requests that have higher latency, and what can be done to address them?
- Are there latency spikes, and what causes them?
- How does latency correlate with user satisfaction and retention rates?

### Error rate

**What is it?** The percentage of requests that result in errors.

**Why is it useful:** Enables you to pinpoint problematic LLM requests and API calls.

**Questions to ask**
- What is the overall error rate, and how does it break down into user-facing versus backend errors?
- What percentage of errors are caused by timeouts?
- Are there specific features or scenarios that are more prone to errors?
  

## Further reading

- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to set up LLM analytics for Anthropic's Claude](/tutorials/anthropic-analytics) 
- [How to analyze surveys with ChatGPT](/tutorials/analyze-surveys-with-chatgpt)